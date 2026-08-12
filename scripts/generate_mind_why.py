#!/usr/bin/env python3
"""Render `doc/not_just_what_it_says.md` into the static site-mind/why.html page.

    python3 scripts/generate_mind_why.py

Sibling of `generate_essay.py`, and kept out of the served directory for the same
reason: the generator should not be publicly downloadable. Regenerate whenever
the source essay changes; `why.html` is GENERATED, do not hand-edit it.

Why this is a separate script rather than a flag on `generate_essay.py`: that one
is deliberately bounded to the hyperscope essay's structure (numbered paragraphs,
`##` sections only). This essay uses more of Markdown, so the converter here
handles `##`/`###` headings, blockquotes, unordered lists, tables, and inline
code as well. Neither script is a general Markdown engine, and neither should
grow into one.
"""
import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "doc" / "not_just_what_it_says.md"
OUT = ROOT / "site" / "why.html"


def inline(s: str) -> str:
    """Bold, italic, and inline code. Escaped first, so the source cannot inject."""
    s = html.escape(s, quote=False)
    s = re.sub(r"`(.+?)`", r"<code>\1</code>", s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<em>\1</em>", s)
    return s


def build_article(text: str) -> str:
    lines = text.split("\n")
    body: list[str] = []
    para: list[str] = []
    item: list[str] = []
    mode: str | None = None  # None | "ul" | "table" | "quote"

    def flush_para() -> None:
        joined = " ".join(para).strip()
        if joined:
            body.append(f"    <p>{inline(joined)}</p>")
        para.clear()

    # A list item accumulates across physical lines exactly as a paragraph does,
    # so a bullet wrapped in the source stays one <li>.
    def flush_item() -> None:
        joined = " ".join(item).strip()
        if joined:
            body.append(f"      <li>{inline(joined)}</li>")
        item.clear()

    def close_mode() -> None:
        nonlocal mode
        if mode == "ul":
            flush_item()
            body.append("    </ul>")
        elif mode == "table":
            body.append("    </tbody></table>")
        elif mode == "quote":
            body.append("    </blockquote>")
        mode = None

    def close_all() -> None:
        flush_para()
        close_mode()

    # Skip the H1 masthead; the page template supplies its own title block.
    i = 0
    n = len(lines)
    while i < n and not lines[i].startswith("## "):
        i += 1

    while i < n:
        ln = lines[i].rstrip()
        s = ln.strip()

        if s.startswith("## "):
            close_all()
            body.append(f"    <h2>{inline(s[3:].strip())}</h2>")
        elif s.startswith("### "):
            close_all()
            body.append(f"    <h3>{inline(s[4:].strip())}</h3>")
        elif s.startswith("> "):
            flush_para()
            if mode != "quote":
                close_mode()
                body.append("    <blockquote>")
                mode = "quote"
            body.append(f"      <p>{inline(s[2:].strip())}</p>")
        elif s.startswith("- "):
            flush_para()
            if mode != "ul":
                close_mode()
                body.append("    <ul>")
                mode = "ul"
            else:
                flush_item()  # a new bullet ends the previous one
            item.append(s[2:].strip())
        elif s.startswith("|"):
            cells = [c.strip() for c in s.strip("|").split("|")]
            # The |---|---| separator row carries no content.
            if all(re.fullmatch(r":?-{2,}:?", c) for c in cells if c):
                i += 1
                continue
            flush_para()
            if mode != "table":
                close_mode()
                body.append("    <table><thead>")
                body.append(
                    "      <tr>" + "".join(f"<th>{inline(c)}</th>" for c in cells) + "</tr>"
                )
                body.append("    </thead><tbody>")
                mode = "table"
            else:
                body.append(
                    "      <tr>" + "".join(f"<td>{inline(c)}</td>" for c in cells) + "</tr>"
                )
        elif s == "" or s == "---":
            # A blank line ends a paragraph but not a list or table; a rule ends both.
            if s == "---":
                close_all()
            else:
                flush_para()
                if mode in ("ul", "table", "quote"):
                    close_mode()
        elif s.startswith("*Companion documents:"):
            close_all()  # the colophon is supplied by the template
            break
        elif mode == "ul":
            # An unprefixed line under a list is a wrapped bullet, not a new
            # paragraph. Closing the list here is what split every multi-line
            # bullet into a truncated <li> plus an orphan <p>.
            item.append(s)
        else:
            if mode in ("table", "quote"):
                close_mode()
            para.append(s)
        i += 1

    close_all()
    return "\n".join(body)


TEMPLATE = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Not Just What It Says</title>
  <meta name="description" content="Why Organon Mind exists: output tells you what a model is about to say, never what it is doing. The ability to see inside a model, and to intervene on it, must exist in the open.">

  <link rel="icon" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Organon Mind">
  <meta property="og:title" content="Not Just What It Says">
  <meta property="og:description" content="Because we need to see what it's doing, not just what it says. The ability to look inside a model must be public.">
  <meta property="og:url" content="https://organonmind.org/why">
  <meta name="twitter:card" content="summary">
  <style>
    :root {
      --bg: #0e0d0b; --ink: #ece4d6; --dim: #a99f8d; --faint: #6b6355;
      --rule: #2a2620; --accent: #d9c7a0;
      --serif: "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, "Times New Roman", serif;
      --mono: ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace;
    }
    @media (prefers-color-scheme: light) {
      :root { --bg: #f7f3ea; --ink: #1d1a15; --dim: #554f43; --faint: #8a8172; --rule: #e0d8c8; --accent: #7a6a45; }
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--serif);
      font-size: 19px; line-height: 1.66; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
    main { max-width: 36rem; margin: 0 auto; padding: 8vh 1.5rem 8rem; }
    .back { font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.04em; text-transform: uppercase; }
    .back a { color: var(--faint); text-decoration: none; }
    .back a:hover { color: var(--accent); }
    header { margin: 2.6rem 0 3.4rem; }
    .title { font-size: clamp(2.4rem, 7vw, 3.2rem); line-height: 1.05; font-weight: 600; letter-spacing: -0.01em; margin: 0; }
    .sub { display: block; margin-top: 0.6rem; font-size: clamp(1rem, 3vw, 1.1rem); font-weight: 400; font-style: italic; color: var(--dim); line-height: 1.35; }
    .tagline { margin: 1.6rem 0 0.4rem; font-style: italic; color: var(--dim); font-size: 1rem; }
    .byline { margin: 0; color: var(--faint); font-variant: small-caps; letter-spacing: 0.05em; font-size: 0.9rem; }
    article h2 { font-size: 1.02rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;
      color: var(--accent); margin: 3.2rem 0 1.1rem; }
    article h3 { font-size: 0.95rem; font-weight: 600; letter-spacing: 0.04em; color: var(--dim); margin: 2.4rem 0 0.9rem; }
    article p { margin: 0 0 1.25rem; }
    article strong { font-weight: 600; color: var(--ink); }
    article em { font-style: italic; }
    article code { font-family: var(--mono); font-size: 0.85em; color: var(--dim); }
    article ul { margin: 0 0 1.25rem; padding-left: 1.1rem; }
    article li { margin: 0 0 0.6rem; }
    article blockquote { margin: 0 0 2.2rem; padding-left: 1.1rem; border-left: 2px solid var(--accent); }
    article blockquote p { margin: 0; font-size: 1.18rem; line-height: 1.4; color: var(--accent); }
    .epigraph { margin: 0 0 3.2rem; padding-left: 1.1rem; border-left: 2px solid var(--accent); }
    .epigraph p { margin: 0; font-size: clamp(1.2rem, 4vw, 1.45rem); line-height: 1.34; color: var(--accent); letter-spacing: -0.005em; }
    /* The alternatives table is wide; let it scroll rather than break the measure. */
    article table { width: 100%; border-collapse: collapse; margin: 0 0 1.6rem; font-size: 0.92rem; display: block; overflow-x: auto; }
    article th { text-align: left; font-weight: 600; color: var(--accent); border-bottom: 1px solid var(--rule); padding: 0.4rem 0.8rem 0.4rem 0; }
    article td { vertical-align: top; border-bottom: 1px solid var(--rule); padding: 0.55rem 0.8rem 0.55rem 0; color: var(--dim); }
    hr { border: 0; height: 1px; background: var(--rule); margin: 3rem 0; }
    .colophon { font-style: italic; color: var(--dim); }
    footer { margin-top: 4rem; color: var(--faint); font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.02em; }
    footer a { color: var(--faint); text-decoration: none; border-bottom: 1px solid var(--rule); }
    footer a:hover { color: var(--accent); }
    @media (max-width: 30rem) { body { font-size: 17.5px; } }
  </style>
</head>
<body>
  <main>
    <p class="back"><a href="/">&larr; Organon Mind</a></p>

    <header>
      <h1 class="title">Not Just What It Says<span class="sub">Why Organon Mind exists</span></h1>
      <p class="tagline">Output tells you what a model is about to say, never what it is doing. The ability to look inside a model must be public.</p>
      <p class="byline">James Andrew Walsh</p>
    </header>

    <!-- The line itself. It sits above the first `##` in the source, which the
         converter treats as masthead and skips, so the template carries it. -->
    <blockquote class="epigraph">
      <p>Because we need to see what it&rsquo;s doing, not just what it says.</p>
    </blockquote>

    <article>
__ARTICLE__
    </article>

    <hr>
    <p class="colophon">Organon Mind, an instrument for seeing inside a working model.</p>

    <footer>
      Written for the workshop. To watch the work, write to <a href="mailto:hello@organon.art">hello@organon.art</a>.
    </footer>
  </main>
</body>
</html>
"""


def main() -> None:
    article = build_article(SRC.read_text(encoding="utf-8"))
    OUT.write_text(TEMPLATE.replace("__ARTICLE__", article), encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)} ({len(article.splitlines())} article lines)")


if __name__ == "__main__":
    main()
