// The landing page — organonmind.org/
//
// GENERATED, from the same graph as the poster. `build_poster.mjs` calls this
// with the sheet it has just laid out, so the front page cannot describe a
// catalogue the catalogue does not have. That is the whole reason this is a
// module and not a hand-authored file: the index used to be a hand-kept list of
// papers, and a hand-kept list on the front page is the one copy nobody notices
// has gone stale.
//
// ⚠️ THIS IS A PAGE, NOT A PLATE. The first version inlined the whole sheet —
// frame, crop marks, printed masthead and all — under the page's own wordmark,
// and it read as a photograph of a poster rather than as a front page: two
// mastheads, the words ORGANON MIND twice, and the sheet's printed credit line
// announcing `organonmind.org/patterns` to a reader already standing on
// organonmind.org.
//
// So the sheet is split. Its printed chrome stays on /poster, where a sheet
// that will be pinned to a wall does need to say what it is and where it came
// from. Here the page supplies that chrome in HTML — same words, same order,
// real type — and the SVG is cropped to the drawing itself and set on the page
// with no card and no shadow. One masthead, then the picture it belongs to.
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
// block, outside the ladder, carrying the caption that says why.

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Below this the sheet is hidden and the ladder shown. Chosen by measurement,
// not taste: the sheet scales to the container, so band copy renders at
// width/1485 × 13.5 px. At 1080 that is about 9.8px and names about 11px, which
// is the floor for something a person is meant to read rather than admire. Move
// this down and the front page starts lying about being legible.
const BREAK = 1080;

// Two front doors, and each says so. The chart catches attention and the
// contents page is how you actually get somewhere — so neither may be a dead
// end, and the way across must be visible without scrolling. It sits on the
// wordmark line on both pages, in the same place, with the page you are on
// marked rather than removed: a control that changes shape between pages is a
// control people stop trusting.
// The three surfaces, in one place. /patterns is hand-authored and carries a
// hand-written copy of this markup — unavoidable, since it is not generated —
// so the harness asserts all three pages offer the SAME hrefs and labels and
// mark exactly one current. A copy that cannot drift silently is acceptable;
// one that can is not.
export const VIEWS = [
  ['chart', '/', 'Chart'],
  ['contents', '/contents', 'Contents'],
  ['catalogue', '/patterns', 'Catalogue'],
];
export const NAV = here => `<nav class="switch" aria-label="Views">` +
  VIEWS.map(([id, href, label]) =>
    `<a href="${href}"${here === id ? ' aria-current="page"' : ''}>${label}</a>`).join('') +
  `</nav>`;

export const SWITCH_CSS = `
.top{display:flex;align-items:baseline;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.switch{display:flex;gap:.1rem;font-family:var(--mono);font-size:.66rem;
  letter-spacing:.16em;text-transform:uppercase;flex:none}
.switch a{padding:.34rem .7rem;text-decoration:none;color:var(--muted);
  border:1px solid var(--rule2)}
.switch a+a{border-left:0}
.switch a:hover{color:var(--ink);background:#f6f7f9}
.switch a[aria-current]{color:var(--paper);background:var(--ink);border-color:var(--ink)}
`;

export function landingPage({
  sheetBody, crop, spine, band, of, whyText, papers, nodes, title, standfirst, readout,
}) {
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

  const stats = readout.map(([k, v]) =>
    `      <div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Organon Mind — ${esc(title)}</title>
<meta name="description" content="${esc(title)}: ${esc(standfirst)}">
<link rel="icon" href="/favicon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Organon Mind">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(standfirst)}">
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
  font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}
main{max-width:94rem;margin:0 auto;padding:clamp(2.4rem,4.5vw,3.6rem) clamp(1.25rem,3vw,2.5rem) 6rem}
a{color:var(--live);text-underline-offset:2px;text-decoration-thickness:1px}

/* The masthead the sheet used to carry, in real type. Same words, same order —
   so the drawing below begins where the printed sheet's drawing begins, and the
   page reads as one thing rather than as a poster pinned to another poster. */
.org{font-family:var(--mono);font-weight:500;font-size:.8rem;letter-spacing:.34em;
  text-transform:uppercase;color:var(--ink);margin:0}
.top{margin:0 0 .9rem}
${SWITCH_CSS}
.mast{border-top:1px solid var(--rule2);padding-top:clamp(1.1rem,2vw,1.6rem)}
h1{font-weight:600;letter-spacing:-.024em;line-height:1.08;margin:0;
  font-size:clamp(1.8rem,4.4vw,2.9rem);text-wrap:balance}
.sub{color:var(--muted);margin:.6rem 0 0;font-size:clamp(.98rem,1.5vw,1.16rem)}

.readout{display:flex;flex-wrap:wrap;gap:1.1rem 2.6rem;margin:clamp(1.3rem,2.4vw,1.9rem) 0 0;
  padding:0 0 clamp(1rem,2vw,1.4rem);border-bottom:1px solid var(--rule)}
.readout div{margin:0}
.readout dt{font-family:var(--mono);font-size:.62rem;letter-spacing:.15em;
  text-transform:uppercase;color:var(--faint)}
.readout dd{font-family:var(--mono);font-size:clamp(1.1rem,1.9vw,1.55rem);margin:.15rem 0 0}

/* No card, no shadow. The drawing sits on the page; the plate is /poster. */
.sheet{margin:clamp(1.2rem,2.4vw,2rem) 0 0}
.scanwrap svg{display:block;width:100%;height:auto}
.after{margin:1.2rem 0 0;font-size:.9rem;color:var(--muted)}
.zoom{display:none}

/* Pan and scan, for anything too narrow to show the sheet whole.
   overscroll-behavior:contain stops a drag inside the viewport from scrolling
   the page behind it — without it the two fight, and the chart feels broken.
   It also means the page cannot be scrolled by dragging ON the chart, which is
   why the viewport is a bounded height with page above and below it. */
@media (max-width:${BREAK - 1}px){
  .scanwrap{overflow:auto;overscroll-behavior:contain;height:62vh;min-height:20rem;
    border:1px solid var(--rule);background:#fff;touch-action:pan-x pan-y;
    -webkit-overflow-scrolling:touch}
  .scanwrap svg{width:auto;max-width:none}
  .zoom{display:flex;gap:.1rem;margin:0 0 .6rem;font-family:var(--mono);
    font-size:.63rem;letter-spacing:.14em;text-transform:uppercase}
  .zoom button{flex:1;padding:.62rem .3rem;background:none;color:var(--muted);
    border:1px solid var(--rule2);cursor:pointer;font:inherit;letter-spacing:inherit;
    text-transform:inherit}
  .zoom button+button{border-left:0}
  .zoom button[aria-pressed="true"]{background:var(--ink);color:var(--paper);
    border-color:var(--ink)}
  .scanhint{margin:.5rem 0 0;font-size:.82rem;color:var(--faint)}
}

/* The ladder — the same graph in type, for anything the sheet is too fine for. */
.stack{margin:1.8rem 0 0}
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


/* The switch. Measured, not chosen — see BREAK at the head of this file.
   Below it BOTH are shown: the chart as something to explore, the ladder as the
   thing you actually navigate with. The sheet's type is too fine to read at
   phone width, and that is what the viewport and the ladder are each for. */
.stack{display:block}
.after{display:none}
@media (min-width:${BREAK}px){
  .stack,.zoom,.scanhint{display:none}
  .after{display:block}
}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>
</head>
<body>
<main>
  <div class="top"><p class="org">Organon Mind</p>${NAV('chart')}</div>
  <div class="mast">
    <h1>${esc(title)}</h1>
    <p class="sub">${esc(standfirst)}</p>
    <dl class="readout">
${stats}
    </dl>
  </div>

  <div class="sheet">
    <div class="zoom" role="group" aria-label="Chart size">
      <button type="button" data-zoom="fit" aria-pressed="true">Fit</button>
      <button type="button" data-zoom="read" aria-pressed="false">Read</button>
      <button type="button" data-zoom="close" aria-pressed="false">Close</button>
    </div>
    <div class="scanwrap" id="scanwrap" tabindex="0" role="region" aria-label="The chart, pannable">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${crop.x} ${crop.y} ${crop.w} ${crop.h}" role="img" aria-label="Taxonomy of ${esc(title)}: ${spine.length} sections in a column ordered by span, Ambient Signals as a band beside it, and every relation drawn as an arc.">
${sheetBody.join('\n')}
</svg>
    </div>
    <p class="scanhint">Drag to explore. Tap any name to open its entry.</p>
  </div>
  <p class="after">Every name opens its entry in <a href="/patterns">the catalogue</a>.
    The same drawing as a sheet, with its own masthead and ready to print at A1:
    <a href="/poster">the poster</a>.</p>

  <div class="stack">
    <p class="axis">Outward in span — a turn at the bottom, days at the top</p>
    <ol class="ladder">
${ladder}
    </ol>${bandBlock}
    <p class="after" style="display:block">The whole language as one sheet, with every
      relation drawn: <a href="/poster">the poster</a>. It is sized for A1 paper, so it
      wants a wide screen or a printer.</p>
  </div>


<script>
(function () {
  var wrap = document.getElementById('scanwrap');
  if (!wrap) return;
  var svg = wrap.querySelector('svg');
  // viewBox.baseVal rather than parsing the attribute. A regex here needs a
  // backslash that a template literal silently eats when this file is written,
  // and a mis-parsed viewBox yields NaN for every position without throwing —
  // which is exactly how it shipped once.
  var vb = svg.viewBox.baseVal;
  var ratio = vb.height / vb.width;
  var buttons = [].slice.call(document.querySelectorAll('.zoom button'));
  var SIZES = { read: 1120, close: 1800 };
  // Where to look when there was nowhere to look before. Fit shows the whole
  // sheet, so "keep the centre" has no useful meaning coming out of it — the
  // centre of this sheet is the gutter between the column and the band, and
  // zooming into blank paper reads as a broken control. The column starts at
  // 372 of 1485 sheet units, which is this fraction of the cropped view.
  var COLUMN_X = (372 - vb.x) / vb.width;

  function widthFor(name) {
    return name === 'fit' ? wrap.clientWidth : SIZES[name];
  }

  // Keep whatever was in the middle of the viewport in the middle of it. Zoom
  // that throws you back to the top-left is the thing that makes a map feel
  // like a document, and it is two lines to avoid.
  function apply(name, animate) {
    var oldW = svg.clientWidth || wrap.clientWidth;
    var oldH = oldW * ratio;
    // Preserve the centre only along an axis that was actually scrollable. If
    // the whole thing was visible there is no remembered position to keep, and
    // the honest anchor is where reading starts.
    var hadX = oldW > wrap.clientWidth + 1;
    var hadY = oldH > wrap.clientHeight + 1;
    var cx = hadX ? (wrap.scrollLeft + wrap.clientWidth / 2) / oldW : null;
    var cy = hadY ? (wrap.scrollTop + wrap.clientHeight / 2) / oldH : null;
    var w = widthFor(name);
    svg.style.width = w + 'px';
    svg.style.height = (w * ratio) + 'px';
    wrap.scrollLeft = cx === null ? COLUMN_X * w - 10 : cx * w - wrap.clientWidth / 2;
    wrap.scrollTop = cy === null ? 0 : cy * w * ratio - wrap.clientHeight / 2;
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.zoom === name));
    });
    current = name;
  }

  var current = 'fit';
  buttons.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.dataset.zoom); });
  });

  // Only take over sizing where the viewport is actually a viewport. Above the
  // breakpoint the sheet is a plain block at width:100% and this must not touch
  // it — an inline width would override the stylesheet and break the desktop.
  var mq = window.matchMedia('(max-width: ${BREAK - 1}px)');
  function sync() {
    if (mq.matches) { apply(current); }
    else { svg.style.width = ''; svg.style.height = ''; }
  }
  (mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync));
  window.addEventListener('resize', function () { if (mq.matches) apply(current); });
  sync();
})();
</script>
</main>
</body>
</html>
`;
}
