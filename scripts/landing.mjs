// The landing page — organonmind.org/
//
// GENERATED, from the same graph as the poster. `build_poster.mjs` calls this
// with the sheet it has just laid out, so the front page cannot describe a
// catalogue the catalogue does not have. That is the whole reason this is a
// module and not a hand-authored file: the index used to be a hand-kept list of
// papers, and a hand-kept list on the front page is the one copy nobody notices
// has gone stale.
//
// TWO COMPOSITIONS, ONE SOURCE. The sheet is sized for A1 paper, so its body
// copy is 13.5 units on a 1485-unit sheet — legible at a desk, a grey texture on
// a phone. Measured: at 375px the pattern names render at about 4px. So below
// the breakpoint the same graph is drawn again as a stacked ladder, in real
// type, and the sheet is offered rather than imposed. Both are generated here;
// neither is a summary of the other.
//
// ⚠️ THE STACK MUST NOT MAKE AMBIENT SIGNALS A SIXTH RUNG. It is the one thing
// the poster exists to say — five sections grow outward in span, and Ambient
// Signals runs alongside all of them rather than beneath the last. A vertical
// list is exactly the shape that flattens it, so the band is drawn as its own
// block, outside the numbered ladder, carrying the caption that says why.

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Below this the sheet is hidden and the ladder shown. Chosen by measurement,
// not taste: the sheet scales to the container, so band copy renders at
// width/1485 × 13.5 px. At 1080 that is about 9.8px and names about 11px, which
// is the floor for something a person is meant to read rather than admire. Move
// this down and the front page starts lying about being legible.
const BREAK = 1080;

export function landingPage({ svg, W, H, spine, band, of, whyText, papers, nodes }) {
  // No ordinals. A number beside "One Agent" reads as its document number, and
  // One Agent is OM-001 while sitting fourth in span order — so the two would
  // contradict each other on the same line. The rule and its dots carry the
  // sequence; the axis line above says which way it runs.
  const rung = l => `      <li>
        <p class="rname">${esc(l.label)}<span class="rct">${of(l.id).length}</span></p>
        <p class="rsub">${esc(l.sub)} · <a href="${l.href}">${esc(l.doc)}</a></p>
        <ul class="rpats">${of(l.id).map(p =>
          `<li><a href="/patterns#${esc(p.id)}">${esc(p.name)}</a></li>`).join('')}</ul>
      </li>`;

  const ladder = spine.map(l => rung(l)).join('\n');

  const bandBlock = band ? `
    <div class="band">
      <p class="bhead">Not a level</p>
      <p class="rname">${esc(band.label)}<span class="rct">${of(band.id).length}</span></p>
      <p class="rsub">${esc(band.sub)} · <a href="${band.href}">${esc(band.doc)}</a></p>
      <p class="bwhy">${esc(whyText)}</p>
      <ul class="rpats">${of(band.id).map(p =>
        `<li><a href="/patterns#${esc(p.id)}">${esc(p.name)}</a></li>`).join('')}</ul>
    </div>` : '';

  const pubs = papers.map(p => `      <li>
        <a href="${p.href}">
          <span class="label">${esc(p.label)}</span>
          <span class="title">${esc(p.title)}</span>
        </a>
      </li>`).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Organon Mind</title>
<meta name="description" content="A pattern language for working with agents: ${nodes.length} patterns across ${spine.length + 1} sections, and every relation between them.">
<link rel="icon" href="/favicon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Organon Mind">
<meta property="og:title" content="Organon Mind">
<meta property="og:description" content="A pattern language for working with agents: ${nodes.length} patterns across ${spine.length + 1} sections, and every relation between them.">
<meta property="og:url" content="https://organonmind.org/">
<meta name="twitter:card" content="summary">
<style>
/* GENERATED — do not hand-edit. scripts/build_poster.mjs writes this file via
   scripts/landing.mjs, from site/patterns.html and the papers on disk. An edit
   here is lost at the next run, and worse, it is an edit to a copy. */
:root{
  --paper:#ffffff;--ink:#0d0f12;--muted:#5c626b;--faint:#9aa1a9;
  --rule:#e6e9ec;--rule2:#cdd2d8;--live:#1440c4;--amb:#6f5cc4;
  --sans:system-ui,-apple-system,"Segoe UI Variable Text","Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"Cascadia Mono","SF Mono","Roboto Mono",Menlo,Consolas,monospace;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--sans);
  font-size:17px;line-height:1.65;-webkit-font-smoothing:antialiased}
main{max-width:96rem;margin:0 auto;padding:clamp(2.2rem,5vw,4rem) 1.5rem 6rem}
a{color:var(--live);text-underline-offset:2px;text-decoration-thickness:1px}

.wordmark{font-family:var(--mono);font-weight:500;
  font-size:clamp(1.05rem,2.6vw,1.5rem);letter-spacing:.2em;text-transform:uppercase;
  margin:0}
/* One line. The front page says what the thing is and stops — the argument is a
   document, and a front page that starts making it is competing with OM-005. */
.framing{color:var(--muted);margin:.7rem 0 0;max-width:44rem;
  font-size:clamp(.98rem,1.6vw,1.1rem);text-wrap:balance}

.sheet{margin:2.6rem 0 0}
.sheet svg{display:block;width:100%;height:auto;background:#fff;
  box-shadow:0 1px 2px rgba(13,15,18,.07),0 12px 44px rgba(13,15,18,.10)}
.after{margin:1rem 0 0;font-size:.9rem;color:var(--muted)}

/* The ladder — the same graph in type, for anything the sheet is too fine for. */
.stack{margin:2.4rem 0 0}
.axis{font-family:var(--mono);font-size:.63rem;letter-spacing:.16em;
  text-transform:uppercase;color:var(--faint);margin:0 0 .5rem}
.ladder{list-style:none;margin:0;padding:0;border-left:1px solid var(--rule2)}
.ladder>li{padding:0 0 1.5rem 1.1rem;position:relative}
.ladder>li::before{content:"";position:absolute;left:-4px;top:.62rem;
  width:7px;height:7px;border-radius:50%;background:#fff;border:1.4px solid var(--rule2)}
.rname{margin:0;font-weight:600;letter-spacing:-.008em;font-size:1.06rem}
.rct{font-family:var(--mono);font-size:.72rem;color:var(--faint);
  font-weight:400;margin-left:.5rem}
.rsub{margin:.1rem 0 .5rem;color:var(--muted);font-size:.9rem}
.rpats{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.3rem .5rem}
.rpats li{font-size:.88rem}
.rpats a{color:var(--ink);text-decoration:none;border-bottom:1px solid var(--rule2);
  padding-bottom:1px}
.rpats a:hover{color:var(--live);border-color:var(--live)}

/* Outside the ladder on purpose. See the note at the head of this file. */
.band{margin:.4rem 0 0;padding:1rem 1.1rem;border:1px solid var(--rule);
  border-left:2px solid var(--amb);background:#faf9fe}
.bhead{font-family:var(--mono);font-size:.63rem;letter-spacing:.2em;
  text-transform:uppercase;color:var(--amb);margin:0 0 .45rem}
.band .rct{color:var(--amb)}
.bwhy{margin:.1rem 0 .7rem;color:var(--muted);font-size:.9rem;max-width:40rem}
.band .rpats a:hover{color:var(--amb);border-color:var(--amb)}

.index{list-style:none;margin:3.2rem 0 0;padding:1.4rem 0 0;border-top:1px solid var(--rule)}
.index li{border-bottom:1px solid var(--rule)}
.index a{display:block;padding:.85rem 0;text-decoration:none;color:inherit}
.index a:hover .title{text-decoration:underline;text-decoration-color:var(--live);
  text-underline-offset:3px}
.index .label{display:block;font-family:var(--mono);font-size:.66rem;
  letter-spacing:.14em;text-transform:uppercase;color:var(--faint);margin-bottom:.15rem}
.index .title{font-weight:600;letter-spacing:-.008em}

/* The switch. Measured, not chosen — see BREAK at the head of this file. */
.stack{display:block}
.sheet,.after{display:none}
@media (min-width:${BREAK}px){
  .stack{display:none}
  .sheet,.after{display:block}
}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>
</head>
<body>
<main>
  <h1 class="wordmark">Organon Mind</h1>
  <p class="framing">A pattern language for working with agents: ${nodes.length} patterns
    across ${spine.length + 1} sections, and every relation between them.</p>

  <div class="sheet">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Taxonomy of Design Patterns for Working with Agents: ${spine.length} sections in a column ordered by span, Ambient Signals as a band beside it, and every relation drawn as an arc.">
${svg.join('\n')}
</svg>
  </div>
  <p class="after">Every name on the sheet opens its entry in <a href="/patterns">the catalogue</a>.
    The sheet alone, at A1 and ready to print: <a href="/poster">the poster</a>.</p>

  <div class="stack">
    <p class="axis">Outward in span — a turn at the bottom, days at the top</p>
    <ol class="ladder">
${ladder}
    </ol>${bandBlock}
    <p class="after" style="display:block">The whole language as one sheet, with every
      relation drawn: <a href="/poster">the poster</a>. It is sized for A1 paper, so it
      wants a wide screen or a printer.</p>
  </div>

  <ul class="index">
${pubs}
  </ul>
</main>
</body>
</html>
`;
}
