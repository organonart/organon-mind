#!/usr/bin/env node
// Read the pattern graph out of site/patterns.html, and audit it.
//
// WHY THIS EXISTS. The catalogue's nodes and typed relations are a data
// literal inside the explorer's inline script. Anything that draws the graph —
// a poster, a figure, a count in a paper's prose — must take it from there and
// nowhere else. A number retyped is a number that can drift, and this repo has
// already published one that had been asserted in six places before anyone
// counted it.
//
//   node scripts/pattern_graph.mjs              # the audit, human-readable
//   node scripts/pattern_graph.mjs --json       # the whole graph, as JSON
//   node scripts/pattern_graph.mjs --check      # exit 1 if anything is wrong
//
// WHY NOT REGEX THE ENTRIES OUT. The literals are real JavaScript — nested
// arrays, apostrophes inside strings, a trailing comment per set. A bracket
// scanner plus `new Function` returns exactly what the browser will build,
// which is the only definition of the graph that matters. Nothing else in the
// file is executed: the two literals are lifted out and evaluated alone.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = process.env.PATTERNS_HTML || join(ROOT, 'site', 'patterns.html');

// The spine, top to bottom: widest span first, finest last. This is the
// programme's own axis and it is asserted here so that "downward" has a
// definition a machine can check. Revised Output sits BELOW One Agent because
// it is sub-turn — inside a single exchange, the finest grain there is.
//
// `ambient` is deliberately absent. Ambient Signals is not a rung on this
// ladder; it is the peripheral alternative that runs alongside every rung, and
// giving it a depth here would be the flattening OM-004 argues against. Edges
// touching it are counted as `band`, never as up or down.
export const SPINE = ['many-teams', 'arrangements', 'many-agents', 'one-agent', 'revised'];
export const BAND = 'ambient';

// Lift `var NAME = [ … ];` out of the file by scanning brackets, so a `]`
// inside a string or a comment cannot end the literal early.
function literal(src, name) {
  const at = src.indexOf(`var ${name}`);
  if (at < 0) throw new Error(`no "var ${name}" in ${SRC}`);
  const open = src.indexOf('[', at);
  let depth = 0, i = open, str = null, line = false, block = false;
  for (; i < src.length; i++) {
    const c = src[i], n = src[i + 1];
    if (line) { if (c === '\n') line = false; continue; }
    if (block) { if (c === '*' && n === '/') { block = false; i++; } continue; }
    if (str) { if (c === '\\') i++; else if (c === str) str = null; continue; }
    if (c === '"' || c === "'" || c === '`') { str = c; continue; }
    if (c === '/' && n === '/') { line = true; i++; continue; }
    if (c === '/' && n === '*') { block = true; i++; continue; }
    if (c === '[') depth++;
    else if (c === ']' && --depth === 0) { i++; break; }
  }
  return new Function(`return ${src.slice(open, i)};`)();
}

export async function load(file = SRC) {
  const src = await readFile(file, 'utf8');
  const langs = literal(src, 'LANGS');
  const nodes = literal(src, 'P');
  const byId = new Map(nodes.map(p => [p.id, p]));
  const edges = [];
  for (const p of nodes)
    for (const [verb, target] of p.rel || [])
      edges.push({ from: p.id, verb, to: target,
                   fromLang: p.lang, toLang: byId.get(target)?.lang ?? null });
  return { langs, nodes, byId, edges };
}

// Where a level sits on the ladder. The band has no depth by construction.
const depth = lang => SPINE.indexOf(lang);
export const classify = e => {
  if (e.fromLang === BAND || e.toLang === BAND) return 'band';
  const a = depth(e.fromLang), b = depth(e.toLang);
  if (a < 0 || b < 0) return 'unknown';
  if (a === b) return 'within';
  return b > a ? 'down' : 'up';
};

// ── the audit ────────────────────────────────────────────────────────────────
//
// Guarded, because the poster builder imports `load` and `classify` from here
// and must not trip the audit's `process.exit` on the way past.
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) audit();

async function audit() {
const { langs, nodes, byId, edges } = await load();
const problems = [];

for (const e of edges)
  if (!byId.has(e.to)) problems.push(`${e.from} —${e.verb}→ ${e.to}: no such pattern`);
for (const p of nodes)
  if (!SPINE.includes(p.lang) && p.lang !== BAND)
    problems.push(`${p.id}: lang "${p.lang}" is neither a spine level nor the band`);

const order = [...SPINE, BAND].filter(l => nodes.some(p => p.lang === l));
const count = l => nodes.filter(p => p.lang === l).length;
const kinds = {};
for (const e of edges) (kinds[classify(e)] ??= []).push(e);

const pair = new Map();
for (const e of kinds.down || []) {
  const k = `${e.fromLang} -> ${e.toLang}`;
  pair.set(k, (pair.get(k) || 0) + 1);
}

const verbs = new Map();
for (const e of edges) verbs.set(e.verb, (verbs.get(e.verb) || 0) + 1);

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({
    spine: SPINE, band: BAND,
    langs: langs.map(l => ({ id: l.id, label: l.label, sub: l.sub, doc: l.doc, n: count(l.id) })),
    nodes: nodes.map(p => ({ id: p.id, lang: p.lang, n: p.n, name: p.name, g: p.g })),
    edges: edges.map(e => ({ ...e, kind: classify(e) })),
  }, null, 1));
} else {
  const label = id => langs.find(l => l.id === id)?.label ?? id;
  console.log(`from ${SRC.replace(ROOT, '.')}\n`);
  console.log('THE SPINE, largest span at top');
  for (const l of order.filter(l => l !== BAND))
    console.log(`  ${String(count(l)).padStart(3)}  ${label(l)}`);
  if (nodes.some(p => p.lang === BAND))
    console.log(`\nALONGSIDE\n  ${String(count(BAND)).padStart(3)}  ${label(BAND)}`);
  console.log(`\n  ${nodes.length} patterns · ${edges.length} relation edges · ${verbs.size} distinct verbs`);

  console.log('\nGRAVITY');
  const n = k => (kinds[k] || []).length;
  console.log(`  ${String(n('down')).padStart(3)}  down the spine`);
  console.log(`  ${String(n('up')).padStart(3)}  up the spine`);
  console.log(`  ${String(n('within')).padStart(3)}  within a level`);
  console.log(`  ${String(n('band')).padStart(3)}  touching the band`);
  for (const e of kinds.up || []) console.log(`       ↑ ${e.from} —${e.verb}→ ${e.to}`);

  console.log('\nCROSSINGS, down the spine');
  for (const [k, v] of [...pair].sort((a, b) => b[1] - a[1]))
    console.log(`  ${String(v).padStart(3)}  ${k}`);

  if (kinds.band) {
    console.log('\nCROSSINGS, spine ↔ band');
    const bp = new Map();
    for (const e of kinds.band) {
      const k = e.fromLang === BAND ? `${BAND} -> ${e.toLang}` : `${e.fromLang} -> ${BAND}`;
      bp.set(k, (bp.get(k) || 0) + 1);
    }
    for (const [k, v] of [...bp].sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(3)}  ${k}`);
  }

  console.log('\nVERBS used more than once');
  for (const [v, c] of [...verbs].sort((a, b) => b[1] - a[1]).filter(([, c]) => c > 1))
    console.log(`  ${String(c).padStart(3)}  ${v}`);
  console.log(`  ${[...verbs.values()].filter(c => c === 1).length} verbs used exactly once`);
}

if (problems.length) {
  console.error(`\n${problems.length} PROBLEM(S):`);
  problems.forEach(p => console.error('  ✗ ' + p));
  process.exit(1);
}
if (process.argv.includes('--check')) console.log('\ngraph is internally consistent');
}
