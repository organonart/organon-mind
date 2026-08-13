#!/usr/bin/env python3
"""Render a publication's HTML as markdown.

    python3 scripts/render_paper_markdown.py site/om-003.html doc/om-003.md

**This generator runs the safe way round.** `generate_mind_why.py` produces a
page, so hand-editing its output loses the change. This one produces a
*rendering of* a page: the HTML in `site/` stays canonical, and the markdown is
disposable — regenerate it whenever the paper is revised. Nothing here can ever
overwrite a publication.

The point of keeping it is that a rendering nobody can reproduce is a second
copy waiting to drift. This way a divergence is one command to fix rather than a
diff to reconcile by hand.

The eleven figures are hand-drawn inline SVG and do not survive the trip. Each
becomes its `aria-label` — which is written as a description of the diagram, so
it carries the content — followed by its caption.
"""

import html
import re
import sys

BASE = "https://organonmind.org"


def inline(s):
    """Inline HTML to markdown. <br> survives as a real newline."""
    s = re.sub(r"<br\s*/?>", "\x00", s)
    s = re.sub(
        r'<a href="([^"]+)"[^>]*>(.*?)</a>',
        lambda m: "[%s](%s)"
        % (inline(m.group(2)), (BASE + m.group(1)) if m.group(1).startswith("/") else m.group(1)),
        s,
        flags=re.S,
    )
    s = re.sub(r"<strong>(.*?)</strong>", r"**\1**", s, flags=re.S)
    s = re.sub(r"<b>(.*?)</b>", r"**\1**", s, flags=re.S)
    s = re.sub(r"<em>(.*?)</em>", r"*\1*", s, flags=re.S)
    s = re.sub(r"<code>(.*?)</code>", r"`\1`", s, flags=re.S)
    s = re.sub(r"<cite>(.*?)</cite>", r"\n> — \1", s, flags=re.S)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s)
    s = re.sub(r"[ \t]*\n[ \t]*", " ", s)  # unwrap the source's line breaks
    s = re.sub(r"\s{2,}", " ", s).strip()
    return s.replace("\x00 ", "\n").replace("\x00", "\n")


def cells(row, tag):
    return [inline(c) for c in re.findall(r"<%s[^>]*>(.*?)</%s>" % (tag, tag), row, re.S)]


def table_md(tbl):
    rows = re.findall(r"<tr>(.*?)</tr>", tbl, re.S)
    if not rows:
        return ""
    header = cells(rows[0], "th")
    head = header or cells(rows[0], "td")
    body = [cells(r, "td") for r in (rows[1:] if header else rows)]
    width = max([len(head)] + [len(b) for b in body])
    head = (head + [""] * width)[:width]
    out = [
        "| " + " | ".join(c.replace("|", "\\|") for c in head) + " |",
        "|" + "|".join("---" for _ in head) + "|",
    ]
    for b in body:
        b = (b + [""] * width)[:width]
        out.append("| " + " | ".join(c.replace("|", "\\|") for c in b) + " |")
    return "\n".join(out)


BLOCK = re.compile(r"<(h2|h3|figure|table|pre|ul|ol|blockquote|dl|p|div)\b([^>]*)>(.*?)</\1>", re.S)


def quoted(text):
    return "\n".join("> " + line for line in text.split("\n"))


def block_md(chunk):
    """Render the inner HTML of one section's body column."""
    out, pos = [], 0
    for m in BLOCK.finditer(chunk):
        if m.start() < pos:  # already consumed as part of an outer block
            continue
        tag, attrs, inner = m.group(1), m.group(2), m.group(3)
        pos = m.end()
        cls = (re.search(r'class="([^"]*)"', attrs) or [None, ""])[1] if 'class="' in attrs else ""
        if tag == "h2":
            out.append("## " + inline(inner))
        elif tag == "h3":
            out.append("### " + inline(inner))
        elif tag == "p" and ("part" in cls or "revision" in cls):
            out.append("*" + inline(inner) + "*")
        elif tag == "p" and "field" in cls:
            out.append("**" + inline(inner) + "**")
        elif tag == "p" and ("slot" in cls or "aside" in cls):
            out.append(quoted(inline(inner)))
        elif tag == "p":
            out.append(inline(inner))
        elif tag == "blockquote":
            out.append(quoted(inline(re.sub(r"</?p>", "", inner))))
        elif tag == "figure":
            label = re.search(r'aria-label="([^"]*)"', inner)
            cap = re.search(r"<figcaption>(.*?)</figcaption>", inner, re.S)
            fig = ["**[Figure]** " + inline(label.group(1)) if label else "**[Figure]**"]
            if cap:
                fig.append("*" + inline(cap.group(1)) + "*")
            out.append("\n\n".join(fig))
        elif tag == "table":
            out.append(table_md(inner))
        elif tag == "pre":
            out.append("```\n" + html.unescape(re.sub(r"</?code>", "", inner)).strip("\n") + "\n```")
        elif tag in ("ul", "ol"):
            items = re.findall(r"<li[^>]*>(.*?)</li>", inner, re.S)
            out.append("\n".join("- " + inline(t) for t in items))
        elif tag == "dl":
            pairs = re.findall(r"<dt>(.*?)</dt><dd>(.*?)</dd>", inner, re.S)
            out.append("\n".join("**%s** — %s  " % (inline(a), inline(b)) for a, b in pairs))
        elif tag == "div" and "toc" in cls:
            for g in re.finditer(r'<p class="g">(.*?)</p>\s*<ol[^>]*>(.*?)</ol>', inner, re.S):
                out.append("*" + inline(g.group(1)) + "*")
                items = re.findall(r"<li[^>]*>(.*?)</li>", g.group(2), re.S)
                out.append(
                    "\n".join(
                        "%d. %s" % (i + 1, inline(re.sub(r'<span class="n">.*?</span>', "", t, flags=re.S)))
                        for i, t in enumerate(items)
                    )
                )
        elif tag == "div" and "tablewrap" in cls:
            t = re.search(r"<table>(.*?)</table>", inner, re.S)
            if t:
                out.append(table_md(t.group(1)))
    return "\n\n".join(x for x in out if x.strip())


def render(src):
    doc = []
    number = re.search(r'<div class="mark">(OM-\d+)</div>', src).group(1)
    title = inline(re.search(r"<h1>(.*?)</h1>", src, re.S).group(1))
    stand = inline(re.search(r'<p class="standfirst">(.*?)</p>', src, re.S).group(1))
    doc.append("# %s · %s" % (number, title))
    doc.append("**%s**" % stand)
    doc.append(
        "*Rendered from the published HTML, which is canonical — if the two ever differ, the HTML "
        "is right. Regenerate with `scripts/render_paper_markdown.py` rather than editing this file. "
        "The figures are hand-drawn inline SVG in the original; each appears here as its description "
        "and its caption.*"
    )

    mast = re.search(r'<header class="mast">(.*?)</header>', src, re.S).group(1)
    meta = re.search(r'<dl class="meta">(.*?)</dl>', mast, re.S).group(1)
    doc.append(
        "\n".join(
            "**%s** — %s  " % (inline(a), inline(b))
            for a, b in re.findall(r"<dt>(.*?)</dt><dd>(.*?)</dd>", meta, re.S)
        )
    )
    for rev in re.findall(r'<p class="revision">(.*?)</p>', mast, re.S):
        doc.append("*" + inline(rev) + "*")
    doc.append("---")

    for sec in re.finditer(r'<section id="[^"]+"[^>]*>(.*?)</section>', src, re.S):
        body = sec.group(1)
        mark = re.search(r'<div class="mark">([^<]*)</div>', body)
        n = mark.group(1).strip() if mark else ""
        inner = re.search(r'<div class="body">(.*)</div>\s*</div>\s*$', body, re.S).group(1)
        md = block_md(inner)
        if n:
            md = re.sub(r"(?m)^## ", "## %s. " % n, md, count=1)
        doc.append(md)
        doc.append("---")

    colophon = re.search(r'<div class="colophon">(.*?)</div>', src, re.S).group(1)
    doc.append("*" + inline(colophon).replace("\n", " · ") + "*")

    return re.sub(r"\n{3,}", "\n\n", "\n\n".join(doc)) + "\n"


def main(argv):
    src_path = argv[1] if len(argv) > 1 else "site/om-003.html"
    out_path = argv[2] if len(argv) > 2 else "doc/om-003.md"
    text = render(open(src_path).read())
    open(out_path, "w").write(text)
    leaked = re.findall(r"<[a-z/][^>]*>", text)
    print("%s → %s  (%d words%s)" % (src_path, out_path, len(text.split()),
                                     ", %d LEAKED TAGS" % len(leaked) if leaked else ""))


if __name__ == "__main__":
    main(sys.argv)
