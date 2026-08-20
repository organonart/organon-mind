#!/usr/bin/env node
// Lay out site/poster.html — the whole pattern language on one sheet.
//
//   node scripts/build_poster.mjs           # write site/poster.html
//   node scripts/build_poster.mjs --dry     # print the report, write nothing
//
// WHY A LAYOUT SCRIPT AND NOT A HAND-TYPED SVG. The poster is a publication,
// and its content is forty-five names and a hundred and fifty typed relations.
// Every one of them already exists, exactly once, in the catalogue's own data
// literal. Retyping them into a drawing would create a second copy of the graph
// that can drift from the first — which is the failure this repo has a rule
// against — and would put every name and every edge one keystroke away from
// being quietly wrong on a wall.
//
// So the marks are computed and the DESIGN is authored: the composition, the
// geometry, the type, the colour and the four edge treatments are all written
// out below by hand. Nothing here is diffused, sampled or guessed. An image
// model cannot draw this sheet — it would invent patterns that do not exist —
// and neither can a person typing a hundred and fifty bezier curves without
// making a mistake.
//
// Same standing as scripts/generate_mind_why.py: the committed artifact is the
// page, it is served with no build step, and it is regenerated rather than
// hand-edited.
import { writeFile, readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { load, classify, SPINE, BAND } from './pattern_graph.mjs';
import { landingPage, NAV, SWITCH_CSS } from './landing.mjs';
import { contentsPage } from './contents.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');
const OUT = join(SITE, 'poster.html');
const OUT_INDEX = join(SITE, 'index.html');
const OUT_CONTENTS = join(SITE, 'contents.html');

// ── the sheet ────────────────────────────────────────────────────────────────
// A1 portrait: 594 × 841 mm at 2.5 user units per mm. Fixed, because a poster
// is cut to a paper size; the row pitch flexes to fit the sections instead.
const W = 1485, H = 2102.5, MM = 2.5;
const M = 66;

const AXIS_X = 92;          // the span axis, far left
const GUT_L = 120;          // left gutter — where relations down the spine run
const RAIL_L = 372;         // the column's left rail; every pattern anchors here
const NAME_X = RAIL_L + 46;
const COL_R = 938;          // right edge of the column's text
const RAIL_R = 962;         // the column's right rail; ambient relations anchor here
const BAND_X = 1140;        // the band's rail
const BAND_L = BAND_X - 34; // its field's left edge
const BAND_R = W - M;
// COPY inside the field sits on its own measure, centred in the field, rather
// than starting on the border. The pattern rows were always inset — their rail
// is BAND_X, 34 in — so the caption was the only thing touching the edge, which
// read as an overflow rather than as a choice.
//
// The measure is centred in the field AND its left edge is the band's own rail,
// which is the same line the pattern dots sit on. Those two wants agree here only
// because the rail is 34 in from the left edge and the field has 34 to spare on
// the right — if that ever stops being true, keep the rail: a copy edge that
// misses a structural line by four units reads as a mistake, where one that
// misses it by forty reads as a decision.
//
// The title line is deliberately NOT inset. It belongs to the rule it sits on and
// spans the field the way each column section header spans its own — and at this
// letter-spacing it fills 268 of a 273-unit padded measure, so inset it would sit
// five units off the edge, which is a squeeze rather than a margin.
const BAND_TL = BAND_X;                     // copy aligns to the rail
const BAND_TR = BAND_R - (BAND_X - BAND_L); // and leaves the same air on the right
const COPY_W = BAND_TR - BAND_TL;           // the measure the copy is set on

const COL_TOP = 344;
const FOOT_H = 168;
const COL_BOT = H - M - FOOT_H - 44;    // 44 keeps the last row off the legend rule

const HDR = 66, GAP = 30, GAP_MAX = 104, PITCH_MAX = 34, PITCH_MIN = 25;

// ── the palette, from the site's own tokens ──────────────────────────────────
const INK = '#0d0f12', MUTED = '#5c626b', FAINT = '#9aa1a9';
const RULE = '#e6e9ec', RULE2 = '#cdd2d8', TICK = '#b9c0c7';
const LIVE = '#1440c4';                 // the site's one accent
const AMB = '#6f5cc4';                  // the band. A second accent, because the
                                        // band is the one thing on this sheet
                                        // that is NOT a rung on the ladder, and
                                        // it must not read as another level.
const UP = '#9a5b1f';                   // relations that run UP the spine. Warm,
                                        // and deliberately not red: eleven of
                                        // them exist, they are all OM-004's, and
                                        // they are a fact about the language, not
                                        // a fault in it.
const SANS = 'system-ui,-apple-system,&quot;Segoe UI Variable Text&quot;,&quot;Segoe UI&quot;,Roboto,&quot;Helvetica Neue&quot;,Arial,sans-serif';
const MONO = 'ui-monospace,&quot;Cascadia Mono&quot;,&quot;SF Mono&quot;,&quot;Roboto Mono&quot;,Menlo,Consolas,monospace';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const r1 = n => Math.round(n * 10) / 10;
const pad = n => String(n).padStart(2, '0');

// ── read the graph ───────────────────────────────────────────────────────────
const { langs, nodes, byId, edges } = await load();

for (const l of langs)
  if (!SPINE.includes(l.id) && l.id !== BAND)
    throw new Error(`patterns.html has a set "${l.id}" that is neither a spine level nor the band — ` +
                    `decide where it belongs before drawing it`);

const spine = SPINE.map(id => langs.find(l => l.id === id)).filter(Boolean);
const band = langs.find(l => l.id === BAND) || null;
const of = lang => nodes.filter(p => p.lang === lang).sort((a, b) => a.n - b.n);

// ── vertical layout ──────────────────────────────────────────────────────────
const colCount = spine.reduce((n, l) => n + of(l.id).length, 0);
const gaps = Math.max(1, spine.length - 1);
const chrome = spine.length * HDR + gaps * GAP;
const pitch = Math.max(PITCH_MIN, Math.min(PITCH_MAX, (COL_BOT - COL_TOP - chrome) / colCount));
// Whatever the pitch cap leaves over goes into the gaps between sections, so a
// four-section sheet fills the same field a six-section one does instead of
// stopping two thirds of the way down. Type size is fixed; air is what flexes.
const slack = (COL_BOT - COL_TOP) - (chrome + colCount * pitch);
const gap = GAP + Math.max(0, Math.min(GAP_MAX - GAP, slack / gaps));

const Y = new Map();                    // pattern id → row centre
const blocks = [];
let y = COL_TOP;
for (const l of spine) {
  const rows = of(l.id);
  const top = y;
  y += HDR;
  const first = y;
  for (const p of rows) { Y.set(p.id, y + pitch / 2); y += pitch; }
  blocks.push({ lang: l, rows, top, headerBase: top + HDR - 16, first, bottom: y });
  y += gap;
}
const STACK_TOP = COL_TOP, STACK_BOT = y - gap;

// The band's field spans the stack exactly — from the first section's rule to
// the last row of the last one — and its header sits on the same line as the
// first section's. That is the assertion, made in geometry: it is not stacked
// under anything, nothing is stacked under it, and it starts where the ladder
// starts and ends where the ladder ends.
const BAND_TOP = STACK_TOP + 12, BAND_BOT = STACK_BOT;
// The band's caption: why it is beside the column and not under it. Written
// here because the rows have to be placed below it, and it is a caption about
// the drawing rather than a copy of any entry — the poster carries names and
// relations only, and the prose stays in the paper.
// Wrapped to the measure rather than hand-broken. The field is 313 units wide,
// the type is 13.5, and 44 characters was measured to fit edge to edge — so
// 7.1 units a character, and the usable measure is whatever the padding leaves.
// Hand-broken lines were correct until the padding changed and would have been
// silently wrong after it; a wrapper cannot be.
const CH = 7.1;
const wrap = (s, width) => {
  const max = Math.floor(width / CH), out = [];
  let line = '';
  for (const word of s.split(/\s+/)) {
    const next = line ? line + ' ' + word : word;
    if (next.length > max && line) { out.push(line); line = word; } else line = next;
  }
  if (line) out.push(line);
  return out;
};
const WHY_TEXT =
  'Not a rung on the ladder, and drawn beside it rather than below it. ' +
  'The column is focal and single-channel: a turn is taken, attended to, ' +
  'and answered. This is the peripheral alternative — it reports when no ' +
  'turn is in progress, and there may never be one. Stacked as a sixth ' +
  'level it would read as a finer grain of the same thing. It is not. ' +
  'It runs alongside every one of them.';
const WHY = wrap(WHY_TEXT, BAND_TR - BAND_TL);
// The caption goes at the FOOT of the field, so the seven patterns get the
// height instead of it. They are what has to run alongside the whole ladder.
const WHY_LH = 21;
// The seed caption wraps too, so its height is reserved rather than assumed.
// Its only variables are two small integers, so three lines is stable at this
// measure — and the builder throws if a wrap ever exceeds it rather than
// drawing a caption that runs off the foot of the field.
const SEED_LINES = 3;
const SEED_Y = BAND_BOT - 34 - (SEED_LINES - 1) * 21;
const WHY_Y = SEED_Y - 30 - WHY.length * WHY_LH;
const BAND_ROWS_TOP = BAND_TOP + HDR + 6;   // clear of the header, as in the column
const BAND_ROWS_BOT = WHY_Y - 52;

const bandRows = band ? of(BAND) : [];
if (band) {
  // Spread evenly down the field. Their spacing means nothing on purpose —
  // the band has no rungs to sit on.
  const usable = BAND_ROWS_BOT - BAND_ROWS_TOP;
  bandRows.forEach((p, i) => Y.set(p.id, BAND_ROWS_TOP + (usable * (i + 0.5)) / bandRows.length));
}

// ── edge classes ─────────────────────────────────────────────────────────────
// Six treatments, and the poster's whole argument is in the difference:
//   within      a hairline. the internal life of one section.
//   down        ink, chevron down at the target. the gravity.
//   built from  the accent. one repeated verb, one gesture, one composition.
//   up          ochre, chevron up. every one of them is OM-004's.
//   band        violet, crossing the right-hand gutter.
//   bandwithin  violet hairline, inside the band's own field.
//
// The brief this sheet was built to said there would be four. There are six,
// because the graph grew two sections between the design and the drawing and
// both of them behave differently from everything before them.
const cls = e => {
  if (e.fromLang === BAND && e.toLang === BAND) return 'bandwithin';
  if (e.fromLang === BAND || e.toLang === BAND) return 'band';
  if (e.verb === 'built from' && classify(e) === 'down') return 'builtfrom';
  return classify(e);
};
const kind = {};
for (const e of edges) (kind[cls(e)] ??= []).push(e);
const N = k => (kind[k] || []).length;

const drawable = edges.filter(e => Y.has(e.from) && Y.has(e.to));
if (drawable.length !== edges.length)
  throw new Error(`${edges.length - drawable.length} edge(s) point at a pattern with no row`);

// The sheet prints the claim that every crossing points at an earlier paper.
// It is checked here rather than believed, because this repo has published a
// number that six documents asserted and nobody had counted.
const paperNo = lang => Number(String(langs.find(l => l.id === lang).doc).replace(/\D/g, ''));
const forward = edges.filter(e => e.fromLang !== e.toLang && paperNo(e.toLang) >= paperNo(e.fromLang));
if (forward.length)
  throw new Error(`the colophon claims every crossing points at an earlier paper, and ${forward.length} do not: ` +
                  forward.map(e => `${e.from} —${e.verb}→ ${e.to}`).join('; '));

const spans = drawable.map(e => Math.abs(Y.get(e.to) - Y.get(e.from)));
const MAXSPAN = Math.max(...spans, 1);

// Two edges between the same pair would land on the same curve. Fan them.
const seen = new Map();
const nth = e => {
  const k = [e.from, e.to].sort().join('|');
  const n = seen.get(k) || 0; seen.set(k, n + 1); return n;
};

function depth(span, min, max, bump) {
  return min + Math.pow(Math.min(span / MAXSPAN, 1), 0.62) * (max - min) + bump * 9;
}
const arc = (x, y1, y2, d, dir) =>
  `M${r1(x)} ${r1(y1)}C${r1(x + dir * d)} ${r1(y1)} ${r1(x + dir * d)} ${r1(y2)} ${r1(x)} ${r1(y2)}`;

// A chevron at the target of every relation that crosses a section, pointing
// the way the relation runs on the spine. `s` is +1 for down and -1 for up.
const chevron = (x, yy, s) =>
  `M${r1(x - 17)} ${r1(yy - s * 5)}L${r1(x - 11.5)} ${r1(yy + s * 1)}L${r1(x - 6)} ${r1(yy - s * 5)}`;
const head = (x, yy, dir) =>
  `M${r1(x - dir * 9)} ${r1(yy - 3.8)}L${r1(x - dir * 1.5)} ${r1(yy)}L${r1(x - dir * 9)} ${r1(yy + 3.8)}Z`;

const svg = [];
const put = s => svg.push(s);

// ── frame and registration ───────────────────────────────────────────────────
put(`<rect width="${W}" height="${H}" fill="#ffffff"/>`);
for (const [cx, cy] of [[M / 2, M / 2], [W - M / 2, M / 2], [M / 2, H - M / 2], [W - M / 2, H - M / 2]])
  put(`<g stroke="${TICK}" stroke-width="1"><line x1="${cx - 9}" y1="${cy}" x2="${cx + 9}" y2="${cy}"/>` +
      `<line x1="${cx}" y1="${cy - 9}" x2="${cx}" y2="${cy + 9}"/></g>`);

// ── masthead ─────────────────────────────────────────────────────────────────
const tot = nodes.length, rels = edges.length;
put(`<text x="${M}" y="112" font-family="${MONO}" font-size="15" letter-spacing="5.4" fill="${INK}">ORGANON MIND</text>`);
put(`<text x="${W - M}" y="112" text-anchor="end" font-family="${MONO}" font-size="13" letter-spacing="2.4" fill="${MUTED}">ORGANONMIND.ORG/PATTERNS</text>`);
put(`<line x1="${M}" y1="130" x2="${W - M}" y2="130" stroke="${RULE2}" stroke-width="1"/>`);
const sectionsHeld = spine.length + (band ? 1 : 0);
const sectionsAll = SPINE.length + 1;
put(`<text x="${M}" y="196" font-family="${SANS}" font-size="46" font-weight="600" letter-spacing="-0.9" fill="${INK}">Design Patterns for Working with Agents</text>`);
const STANDFIRST = sectionsHeld === sectionsAll
  ? `${sectionsHeld} sections · ${tot} patterns · ${rels} relations · the whole language on one sheet`
  : `${sectionsHeld} of ${sectionsAll} sections · ${tot} patterns · ${rels} relations · the rest is not published yet`;
put(`<text x="${M}" y="232" font-family="${SANS}" font-size="19" fill="${MUTED}">` +
    (sectionsHeld === sectionsAll
      ? `${sectionsHeld} sections · ${tot} patterns · ${rels} relations · the whole language on one sheet`
      : `${sectionsHeld} of ${sectionsAll} sections · ${tot} patterns · ${rels} relations · the rest is not published yet`) +
    `</text>`);

// The readout. Counted from the data every time this file is written, because
// a number on a poster is a published number.
const DOWN = N('down') + N('builtfrom');
const CROSS = DOWN + N('up') + N('band');
const readout = [
  ['RELATIONS', rels],
  ['WITHIN A SECTION', N('within') + N('bandwithin')],
  ['CROSSING A SECTION', CROSS],
  ['DOWN THE SPINE', DOWN],
  ['UP THE SPINE', N('up')],
];
if (band) readout.push(['BAND TO SPINE', N('band')]);
readout.forEach(([k, v], i) => {
  const x = M + i * 226;
  put(`<text x="${x}" y="276" font-family="${MONO}" font-size="10.5" letter-spacing="1.7" fill="${FAINT}">${esc(k)}</text>`);
  put(`<text x="${x}" y="306" font-family="${MONO}" font-size="27" fill="${v === 0 ? MUTED : INK}">${pad(v)}</text>`);
});
put(`<line x1="${M}" y1="322" x2="${W - M}" y2="322" stroke="${RULE}" stroke-width="1"/>`);

// Everything pushed up to here is the SHEET'S OWN printed chrome: the white
// ground, the registration marks, the masthead and the readout. /poster keeps
// all of it, because a sheet going on a wall has to say what it is. The
// landing page carries the same words in HTML instead and inlines only what
// follows — see scripts/landing.mjs.
const CHROME_END = svg.length;

// ── the span axis ────────────────────────────────────────────────────────────
// A wedge, wide at the top and fine at the bottom. It is the only part of the
// sheet that states the ordering rather than showing it.
put(`<path d="M${AXIS_X - 9} ${STACK_TOP}L${AXIS_X + 9} ${STACK_TOP}L${AXIS_X + 1.5} ${STACK_BOT}L${AXIS_X - 1.5} ${STACK_BOT}Z" fill="${RULE}"/>`);
put(`<line x1="${AXIS_X}" y1="${STACK_TOP}" x2="${AXIS_X}" y2="${STACK_BOT}" stroke="${RULE2}" stroke-width="1"/>`);
put(`<g transform="translate(${AXIS_X - 16} ${(STACK_TOP + STACK_BOT) / 2}) rotate(-90)">` +
    `<text text-anchor="middle" font-family="${MONO}" font-size="11.5" letter-spacing="4.2" fill="${MUTED}">` +
    `SPAN &#183; WIDER ABOVE &#183; FINER BELOW</text></g>`);
put(`<text x="${AXIS_X}" y="${STACK_TOP - 14}" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${TICK}">&#9650;</text>`);
put(`<text x="${AXIS_X}" y="${STACK_BOT + 24}" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${TICK}">&#9660;</text>`);

// ── the strata ───────────────────────────────────────────────────────────────
// One faint field per section, so the column reads as five layers rather than
// as a long list with headings in it. The band's field, painted next, is a
// different colour on a different axis for exactly this reason.
for (const b of blocks)
  put(`<rect x="${RAIL_L}" y="${r1(b.top + 12)}" width="${COL_R - RAIL_L}" height="${r1(b.bottom - b.top - 12)}" fill="#fafbfc"/>`);

// ── the band's field, painted before everything it runs beside ───────────────
if (band) {
  put(`<rect x="${BAND_L}" y="${BAND_TOP}" width="${BAND_R - BAND_L}" height="${r1(BAND_BOT - BAND_TOP)}" fill="${AMB}" fill-opacity="0.045"/>`);
  put(`<line x1="${BAND_L}" y1="${BAND_TOP}" x2="${BAND_L}" y2="${r1(BAND_BOT)}" stroke="${AMB}" stroke-width="1" stroke-opacity="0.35"/>`);
  put(`<line x1="${BAND_R}" y1="${BAND_TOP}" x2="${BAND_R}" y2="${r1(BAND_BOT)}" stroke="${AMB}" stroke-width="1" stroke-opacity="0.35"/>`);
}

// ── relations ────────────────────────────────────────────────────────────────
// Painted in weight order, lightest first, so the gravity sits on top of the
// texture rather than under it.
const bucket = { within: [], down: [], builtfrom: [], band: [], bandwithin: [], up: [] };
for (const e of drawable) bucket[cls(e)].push(e);

const gutterArc = (e, min, max) => {
  const y1 = Y.get(e.from), y2 = Y.get(e.to);
  return arc(RAIL_L, y1, y2, depth(Math.abs(y2 - y1), min, max, nth(e)), -1);
};

put(`<g fill="none" stroke="${FAINT}" stroke-width="0.85" stroke-opacity="0.42">`);
for (const e of bucket.within) put(`<path d="${gutterArc(e, 26, 148)}"/>`);
put(`</g>`);

put(`<g fill="none" stroke="${INK}" stroke-width="1.25" stroke-opacity="0.5">`);
for (const e of bucket.down) put(`<path d="${gutterArc(e, 44, 296)}"/>`);
put(`</g>`);
put(`<g fill="none" stroke="${LIVE}" stroke-width="1.3" stroke-opacity="0.62">`);
for (const e of bucket.builtfrom) put(`<path d="${gutterArc(e, 44, 296)}"/>`);
put(`</g>`);

// Against the grain, and drawn after the grain so it is not buried in it.
put(`<g fill="none" stroke="${UP}" stroke-width="1.3" stroke-opacity="0.7">`);
for (const e of bucket.up) put(`<path d="${gutterArc(e, 44, 296)}"/>`);
put(`</g>`);

// Every crossing gets its chevron, and they are drawn last of the left gutter
// so nothing sits on top of them. This is where the sheet makes its claim: the
// direction of a relation is not written anywhere, it is simply which way the
// mark at its target points.
put(`<g fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">`);
for (const e of bucket.down) put(`<path d="${chevron(RAIL_L, Y.get(e.to), 1)}" stroke="${INK}" stroke-opacity="0.55"/>`);
for (const e of bucket.builtfrom) put(`<path d="${chevron(RAIL_L, Y.get(e.to), 1)}" stroke="${LIVE}" stroke-opacity="0.7"/>`);
for (const e of bucket.up) put(`<path d="${chevron(RAIL_L, Y.get(e.to), -1)}" stroke="${UP}" stroke-opacity="0.85"/>`);
put(`</g>`);

// ── the ambient crossings, in the right gutter ───────────────────────────────
const AAC = 'ambient-activity-channel';
const seed = bucket.band.filter(e => e.from === AAC || e.to === AAC);
const other = bucket.band.filter(e => !(e.from === AAC || e.to === AAC));
const bandArc = e => {
  const fromBand = e.fromLang === BAND;
  const x1 = fromBand ? BAND_X : RAIL_R, x2 = fromBand ? RAIL_R : BAND_X;
  const y1 = Y.get(e.from), y2 = Y.get(e.to);
  const d = depth(Math.abs(y2 - y1), 26, 104, 0);
  const dir = fromBand ? -1 : 1;
  // Both rails, not one: an ambient relation leaves the column on its right and
  // arrives at the band on its left, so the curve crosses the gutter rather
  // than doubling back through it.
  return `M${r1(x1)} ${r1(y1)}C${r1(x1 + dir * d)} ${r1(y1)} ${r1(x2 - dir * d)} ${r1(y2)} ${r1(x2)} ${r1(y2)}`;
};
// The band's own internal life, kept inside its own field rather than run out
// into the gutter, so it cannot be mistaken for a crossing.
put(`<g fill="none" stroke="${AMB}" stroke-width="0.85" stroke-opacity="0.4">`);
for (const e of bucket.bandwithin) {
  const y1 = Y.get(e.from), y2 = Y.get(e.to);
  put(`<path d="${arc(BAND_X, y1, y2, depth(Math.abs(y2 - y1), 14, 30, nth(e)), -1)}"/>`);
}
put(`</g>`);

put(`<g fill="none" stroke="${AMB}" stroke-width="1.15" stroke-opacity="0.5">`);
for (const e of other) put(`<path d="${bandArc(e)}"/>`);
put(`</g>`);
// THE THREAD. Pattern 9 of One Agent is where the band came from, and in the
// data the band says so itself: five of its seven cite Ambient Activity
// Channel by name — corrects, specialises, realises. The arrows run INTO the
// column, not out of it, because a pattern's relations are written by the
// entry that has something to say. Heaviest stroke on the sheet.
put(`<g fill="none" stroke="${AMB}" stroke-width="2.4" stroke-opacity="0.95">`);
for (const e of seed) put(`<path d="${bandArc(e)}"/>`);
put(`</g>`);
put(`<g fill="${AMB}" fill-opacity="0.8">`);
for (const e of bucket.band)
  put(`<path d="${head(e.toLang === BAND ? BAND_X : RAIL_R, Y.get(e.to), e.toLang === BAND ? 1 : -1)}"/>`);
put(`</g>`);

// ── the column ───────────────────────────────────────────────────────────────
const groupName = (lang, g) => (langs.find(l => l.id === lang)?.groups || []).find(x => x[0] === g)?.[1] || '';
const rightAnchored = new Set(bucket.band.flatMap(e => [e.from, e.to]));

for (const b of blocks) {
  const l = b.lang;
  put(`<line x1="${RAIL_L}" y1="${b.top + 12}" x2="${COL_R}" y2="${b.top + 12}" stroke="${INK}" stroke-width="1.6"/>`);
  put(`<text x="${RAIL_L}" y="${b.headerBase}" font-family="${MONO}" font-size="23" letter-spacing="4.4" fill="${INK}">${esc(l.label.toUpperCase())}</text>`);
  put(`<text x="${COL_R}" y="${b.headerBase}" text-anchor="end" font-family="${MONO}" font-size="23" fill="${INK}">${pad(b.rows.length)}</text>`);
  put(`<text x="${RAIL_L}" y="${b.headerBase + 21}" font-family="${SANS}" font-size="14.5" fill="${MUTED}">${esc(l.sub)}</text>`);
  put(`<text x="${COL_R}" y="${b.headerBase + 21}" text-anchor="end" font-family="${MONO}" font-size="12" letter-spacing="1.6" fill="${FAINT}">${esc(l.doc)}</text>`);

  // The rail itself, so the block reads as a run rather than as loose dots.
  put(`<line x1="${RAIL_L}" y1="${b.first + 4}" x2="${RAIL_L}" y2="${b.bottom - 4}" stroke="${RULE2}" stroke-width="1"/>`);

  let run = null;
  for (const p of b.rows) {
    const yy = Y.get(p.id);
    if (p.g !== run) {
      run = p.g;
      const gn = groupName(l.id, p.g);
      if (gn && (l.groups || []).length > 1)
        put(`<text x="${COL_R}" y="${r1(yy + 4)}" text-anchor="end" font-family="${MONO}" font-size="10" letter-spacing="1.5" fill="${TICK}">${esc(gn.toUpperCase())}</text>`);
    }
    put(`<circle cx="${RAIL_L}" cy="${r1(yy)}" r="3.4" fill="#ffffff" stroke="${INK}" stroke-width="1.4"/>`);
    put(`<text x="${RAIL_L + 15}" y="${r1(yy + 4.6)}" font-family="${MONO}" font-size="11.5" fill="${FAINT}">${pad(p.n)}</text>`);
    put(`<a href="/patterns#${esc(p.id)}"><text x="${NAME_X}" y="${r1(yy + 5.4)}" font-family="${SANS}" font-size="16.5" fill="${INK}">${esc(p.name)}</text></a>`);
    if (rightAnchored.has(p.id))
      put(`<circle cx="${RAIL_R}" cy="${r1(yy)}" r="2.8" fill="${AMB}"/>`);
  }
}

// ── the band's panel ─────────────────────────────────────────────────────────
if (band) {
  // On the same line as MANY TEAMS, and in the same type at the same size:
  // this is a section of the language, drawn as a peer of the five, on a
  // different axis from them.
  // Same offsets from the rule as every section header in the column, so the
  // two sit on one line and read as peers.
  const hb = BAND_TOP + (HDR - 16) - 12;
  put(`<line x1="${BAND_L}" y1="${BAND_TOP}" x2="${BAND_R}" y2="${BAND_TOP}" stroke="${AMB}" stroke-width="1.6"/>`);
  put(`<text x="${BAND_L}" y="${r1(hb)}" font-family="${MONO}" font-size="23" letter-spacing="4.4" fill="${AMB}">${esc(band.label.toUpperCase())}</text>`);
  put(`<text x="${BAND_R}" y="${r1(hb)}" text-anchor="end" font-family="${MONO}" font-size="23" fill="${AMB}">${pad(bandRows.length)}</text>`);
  put(`<text x="${BAND_L}" y="${r1(hb + 21)}" font-family="${SANS}" font-size="14.5" fill="${MUTED}">${esc(band.sub)}</text>`);
  put(`<text x="${BAND_R}" y="${r1(hb + 21)}" text-anchor="end" font-family="${MONO}" font-size="12" letter-spacing="1.6" fill="${FAINT}">${esc(band.doc)}</text>`);
  put(`<text x="${BAND_TL}" y="${r1(WHY_Y - 26)}" font-family="${MONO}" font-size="10.5" letter-spacing="2.8" fill="${AMB}">NOT A LEVEL</text>`);
  WHY.forEach((t, i) =>
    put(`<text x="${BAND_TL}" y="${r1(WHY_Y + i * WHY_LH)}" font-family="${SANS}" font-size="13.5" fill="${MUTED}">${esc(t)}</text>`));

  if (seed.length) {
    const ncite = new Set(seed.map(e => (e.fromLang === BAND ? e.from : e.to))).size;
    const lines = wrap(
      ncite + " of the " + bandRows.length + " cite One Agent " + pad(byId.get(AAC).n) +
      ", Ambient Activity Channel, by name " + String.fromCharCode(8212) + " the heavy threads.",
      BAND_TR - BAND_TL);
    if (lines.length > SEED_LINES)
      throw new Error(`seed caption wrapped to ${lines.length} lines, ${SEED_LINES} reserved`);
    lines.forEach((t, i) =>
      put(`<text x="${BAND_TL}" y="${r1(SEED_Y + i * 21)}" font-family="${SANS}" font-size="13.5" font-style="italic" fill="${AMB}">${esc(t)}</text>`));
  }

  for (const p of bandRows) {
    const yy = Y.get(p.id);
    put(`<circle cx="${BAND_X}" cy="${r1(yy)}" r="3.4" fill="#ffffff" stroke="${AMB}" stroke-width="1.4"/>`);
    put(`<text x="${BAND_X + 15}" y="${r1(yy + 4.6)}" font-family="${MONO}" font-size="11.5" fill="${FAINT}">${pad(p.n)}</text>`);
    put(`<a href="/patterns#${esc(p.id)}"><text x="${BAND_X + 46}" y="${r1(yy + 5.4)}" font-family="${SANS}" font-size="15.5" fill="${INK}">${esc(p.name)}</text></a>`);
  }
}

// ── the band's field, before the band exists ─────────────────────────────────
// Reserved rather than filled in from a draft. The sections that are missing
// are missing because their paper is not published, and a poster that printed
// them would publish them — ahead of the document that is supposed to. So the
// sheet says what it is short of and nothing about what will go there.
if (!band) {
  const pend = SPINE.filter(id => !langs.some(l => l.id === id)).length + 1;
  put(`<rect x="${BAND_L}" y="${BAND_TOP}" width="${BAND_R - BAND_L}" height="${r1(BAND_BOT - BAND_TOP)}" fill="#fcfcfd"/>`);
  put(`<g stroke="${RULE2}" stroke-width="1" stroke-dasharray="3 7" fill="none">` +
      `<rect x="${BAND_L}" y="${BAND_TOP}" width="${BAND_R - BAND_L}" height="${r1(BAND_BOT - BAND_TOP)}"/></g>`);
  const cx = (BAND_L + BAND_R) / 2, cy = (BAND_TOP + BAND_BOT) / 2;
  put(`<text x="${cx}" y="${r1(cy - 30)}" text-anchor="middle" font-family="${MONO}" font-size="13" letter-spacing="3.6" fill="${FAINT}">RESERVED</text>`);
  const lines = [
    `${pend} of the ${sectionsAll} sections are not yet in the`,
    `catalogue&#8217;s data. One of them does not belong`,
    `in the column at all, and this field is where it`,
    `goes: alongside the whole stack, not beneath it.`,
    ``,
    `Re-run the layout when they publish.`,
  ];
  lines.forEach((t, i) => t && put(`<text x="${cx}" y="${r1(cy + 6 + i * 24)}" text-anchor="middle" font-family="${SANS}" font-size="14.5" fill="${MUTED}">${t}</text>`));
}

// ── legend and colophon ──────────────────────────────────────────────────────
const FY = H - M - FOOT_H + 30;
put(`<line x1="${M}" y1="${FY - 30}" x2="${W - M}" y2="${FY - 30}" stroke="${RULE2}" stroke-width="1"/>`);

// Two columns of three. Six classes is more than a legend wants, and it is
// what the graph has.
const key = [
  [FAINT, 0.42, 0.85, N('within'), 'within a section'],
  [INK, 0.5, 1.25, N('down'), 'down the spine'],
  [LIVE, 0.62, 1.3, N('builtfrom'), '&#8220;built from&#8221; &#8212; Arrangements over Many Agents'],
  [UP, 0.7, 1.3, N('up'), 'up the spine &#8212; all of them Revised Output'],
  [AMB, 0.5, 1.15, N('band'), 'band to spine'],
  [AMB, 0.4, 0.85, N('bandwithin'), 'within the band'],
];
key.forEach(([col, op, wdt, n, name], i) => {
  const x = M + (i > 2 ? 452 : 0), yy = FY + (i % 3) * 27;
  put(`<path d="M${x} ${yy}C${x + 22} ${yy - 12} ${x + 34} ${yy + 12} ${x + 56} ${yy}" fill="none" stroke="${col}" stroke-width="${wdt}" stroke-opacity="${op}"/>`);
  put(`<text x="${x + 70}" y="${yy + 5}" font-family="${MONO}" font-size="14" fill="${INK}">${pad(n)}</text>`);
  put(`<text x="${x + 106}" y="${yy + 5}" font-family="${SANS}" font-size="14.5" fill="${INK}">${name}</text>`);
});
const CHY = FY + 3 * 27 + 6;
put(`<g fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="${chevron(M + 56, CHY, 1)}" stroke="${INK}" stroke-opacity="0.55"/>` +
    `<path d="${chevron(M + 96, CHY, -1)}" stroke="${UP}" stroke-opacity="0.85"/></g>`);
put(`<text x="${M + 106}" y="${CHY + 5}" font-family="${SANS}" font-size="14.5" fill="${MUTED}">` +
    `a chevron marks the target of a crossing, and points the way it runs on the spine</text>`);

const colophon = [
  `${tot} patterns and ${rels} typed relations, read from the catalogue&#8217;s own data.`,
  `${CROSS} relations cross a section. ${DOWN} run down the spine, ${N('up')} run up, ${N('band')} leave the band.`,
  `Every one of the ${CROSS} points at a pattern published in an earlier paper. None points at a later one.`,
  `Generated by scripts/build_poster.mjs from site/patterns.html. Nothing is drawn that is not in the data.`,
];
colophon.forEach((t, i) =>
  put(`<text x="${W - M}" y="${FY + 5 + i * 22}" text-anchor="end" font-family="${SANS}" font-size="14.5" fill="${i === 2 ? INK : MUTED}">${t}</text>`));
put(`<text x="${W - M}" y="${FY + 5 + colophon.length * 22 + 10}" text-anchor="end" font-family="${MONO}" font-size="11.5" letter-spacing="2.2" fill="${FAINT}">ORGANON MIND &#183; ${new Date().toISOString().slice(0, 10)}</text>`);

// ── the page ─────────────────────────────────────────────────────────────────
const missing = SPINE.filter(id => !langs.some(l => l.id === id));
const pending = [...missing, ...(band ? [] : [BAND])];

const note = pending.length
  ? `<p class="note"><strong>Incomplete.</strong> ${pending.length} of the ${SPINE.length + 1} sections ` +
    `(${pending.map(p => `<code>${p}</code>`).join(', ')}) are not yet in the catalogue&#8217;s data, so they are not on the sheet. ` +
    `Re-run <code>node scripts/build_poster.mjs</code> once they are.</p>`
  : '';

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The whole language, on one sheet — Organon Mind</title>
<meta name="description" content="A taxonomy poster of Design Patterns for Working with Agents: every section, every pattern, and every relation between them.">
<link rel="icon" href="/favicon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Organon Mind">
<meta property="og:title" content="The whole language, on one sheet">
<meta property="og:url" content="https://organonmind.org/poster">
<meta name="twitter:card" content="summary">
<style>
/* GENERATED — do not hand-edit. scripts/build_poster.mjs writes this file from
   site/patterns.html, which is the one place the graph lives. An edit here is
   lost at the next run, and worse, it is an edit to a copy. */
:root{
  --paper:#ffffff;--ink:#0d0f12;--muted:#5c626b;--faint:#9aa1a9;--rule:#e6e9ec;--live:#1440c4;
  --sans:system-ui,-apple-system,"Segoe UI Variable Text","Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"Cascadia Mono","SF Mono","Roboto Mono",Menlo,Consolas,monospace;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:#f4f5f7;color:var(--ink);font-family:var(--sans);font-size:16px;line-height:1.6}
header{max-width:74rem;margin:0 auto;padding:1.6rem 1.5rem .9rem;display:flex;flex-wrap:wrap;gap:.8rem;align-items:baseline}
header a.org{font-family:var(--mono);font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;color:var(--ink);text-decoration:none}
header .sep{font-family:var(--mono);font-size:.68rem;color:var(--faint)}
header .here{font-family:var(--mono);font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
header .spacer{flex:1}
header .out{font-family:var(--mono);font-size:.63rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);text-decoration:none}
header .out:hover{color:var(--live)}
.sheet{max-width:74rem;margin:0 auto 2rem;padding:0 1.5rem}
.sheet svg{display:block;width:100%;height:auto;background:#fff;box-shadow:0 1px 2px rgba(13,15,18,.08),0 10px 40px rgba(13,15,18,.09)}
.note{max-width:74rem;margin:0 auto;padding:0 1.5rem 2.4rem;color:var(--muted);font-size:.9rem}
.note code{font-family:var(--mono);font-size:.85em}
.note a{color:var(--live)}
/* A1 portrait. Print, or print to PDF, and it is the sheet. */
@page{size:594mm 841mm;margin:0}
@media print{
  body{background:#fff}
  header,.note{display:none}
  .sheet{max-width:none;margin:0;padding:0}
  .sheet svg{box-shadow:none;width:594mm;height:841mm}
}
</style>
</head>
<body>
<header>
  <a class="org" href="/">Organon Mind</a>
  <span class="sep">/</span>
  <span class="here">Poster</span>
  <span class="spacer"></span>
  <a class="out" href="/patterns">The catalogue</a>
</header>

<div class="sheet">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W / MM}mm" height="${H / MM}mm" role="img" aria-label="Taxonomy of Design Patterns for Working with Agents">
${svg.join('\n')}
</svg>
</div>

${note}<p class="note">A1 portrait, 594&#215;841&#8239;mm. Every name and every relation is read from
<a href="/patterns">the catalogue</a>; each name on the sheet links to its entry there.
Print, or print to PDF, for the wall.</p>
</body>
</html>
`;

const report = [
  `sheet    ${W}×${H} units = ${W / MM}×${H / MM} mm`,
  `pitch    ${r1(pitch)} units (${r1(pitch / MM)} mm) over ${colCount} column rows`,
  `stack    y ${r1(STACK_TOP)} → ${r1(STACK_BOT)}`,
  `sections ${spine.map(l => `${l.id}:${of(l.id).length}`).join('  ')}${band ? `  |  band ${BAND}:${bandRows.length}` : '  |  band absent'}`,
  `edges    within ${N('within')}  down ${N('down')}  built-from ${N('builtfrom')}  up ${N('up')}  ` +
    `band ${N('band')}  band-within ${N('bandwithin')}  = ${N('within') + N('down') + N('builtfrom') + N('up') + N('band') + N('bandwithin')} of ${rels}`,
  `gravity  ${CROSS} crossings: ${DOWN} down, ${N('up')} up, ${N('band')} out of the band — and all ${CROSS} point at an earlier paper`,
  `thread   ${seed.length} relation(s) between ${AAC} and the band`,
  pending.length ? `PENDING  ${pending.join(', ')} not in the data yet` : `complete: all ${SPINE.length + 1} sections drawn`,
];
console.log(report.join('\n'));

// ── the landing page ─────────────────────────────────────────────────────────
// The publications list is DERIVED, not kept. It used to be a hand-written list
// in index.html, which is the one copy nobody notices has gone stale — OM-004
// existed for hours before anything on the front page said so. Each paper on
// disk supplies its own number and its own title, read from its masthead, and
// the builder refuses to write a front page that has silently dropped one.
const paperFiles = (await readdir(SITE)).filter(f => /^om-\d+\.html$/.test(f)).sort();
const papers = [
  { href: '/patterns', label: 'Catalogue', title: 'Design Patterns for Working with Agents' },
  { href: '/poster', label: 'Sheet', title: 'The whole language, on one sheet' },
];
for (const f of paperFiles) {
  const html = await readFile(join(SITE, f), 'utf8');
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!h1) throw new Error(`${f} has no <h1> — cannot title it on the index`);
  const slug = f.replace(/\.html$/, '');
  papers.push({
    href: `/${slug}`,
    label: `${slug.toUpperCase()} · Paper`,
    title: h1[1].replace(/<[^>]+>/g, '').trim(),
  });
}
// The crop. Content runs from the span axis on the left to the band's right
// edge, and from the top of the column to the foot of the colophon. Derived
// from the same constants that placed them, so it cannot drift out of step
// with the drawing the way a hand-typed viewBox would.
const CROP_PAD = 16;
// The span axis carries a marker above the column at STACK_TOP - 14, and a
// 12pt glyph reaches about 12 above its own baseline. Cropping to COL_TOP
// sliced its tip off — the one thing above the columns, and the easiest to
// miss, since it is four pixels of grey.
const CROP_TOP = COL_TOP - 14 - 16;
const crop = {
  x: AXIS_X - 28 - CROP_PAD,
  y: CROP_TOP - CROP_PAD,
  w: (BAND_R + CROP_PAD) - (AXIS_X - 28 - CROP_PAD),
  h: (H - M / 2 - CROP_PAD) - (CROP_TOP - CROP_PAD),
};
const contents = contentsPage({ papers, nav: NAV('contents'), switchCss: SWITCH_CSS });
const landing = landingPage({
  sheetBody: svg.slice(CHROME_END), crop, spine, band, of, whyText: WHY_TEXT,
  papers, nodes, title: 'Design Patterns for Working with Agents',
  standfirst: STANDFIRST, readout,
});
// /contents is the door that has to be complete. The chart is not a table of
// contents and does not pretend to be: it links the papers that own a section,
// through the ladder, and OM-005 owns none — it is the argument behind all of
// them. Requiring the chart to link everything would mean bolting a list back
// onto the bottom of it, which is the thing /contents exists to carry instead.
for (const f of paperFiles) {
  const slug = f.replace(/\.html$/, '');
  if (!contents.includes(`href="/${slug}"`))
    throw new Error(`${slug} is on disk but not listed on /contents`);
}

if (!process.argv.includes('--dry')) {
  await writeFile(OUT, page, 'utf8');
  console.log(`\nwrote ${OUT.replace(ROOT, '.')}  (${(page.length / 1024).toFixed(1)} kB)`);
  await writeFile(OUT_INDEX, landing, 'utf8');
  await writeFile(OUT_CONTENTS, contents, 'utf8');
  console.log(`wrote ${OUT_INDEX.replace(ROOT, '.')}  (${(landing.length / 1024).toFixed(1)} kB)  ` +
    `${papers.length} publications, ladder + sheet`);
  console.log(`wrote ${OUT_CONTENTS.replace(ROOT, '.')}  (${(contents.length / 1024).toFixed(1)} kB)`);
}
