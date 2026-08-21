// The verification harness for organonmind.org.
//
// WHY THIS IS TRACKED. It was built twice in session scratchpads and lost
// twice, and both times the next session started by wondering whether the
// anchors still resolved. Twenty-five published fragments are load-bearing
// here and one of them was broken once already. An instrument that does not
// survive its session is testimony wearing the costume of measurement — the
// point OM-004 makes about its own evidence base, applied to the site.
//
// WHY A BROWSER. Reading source with grep answers "is the string present".
// It does not answer "does the fragment scroll", which is the property the
// obligation is about, and it cannot see JS routing at all. The explorer's
// eight legacy ids resolve in script; nothing static can check them.
//
//   node scripts/verify/verify.mjs            # against site/ over HTTP
//   node scripts/verify/verify.mjs --live     # against organonmind.org
//
// Exit code 0 = everything asserted held.
import { chromium } from 'playwright';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { serve } from './serve.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
// VERIFY_SITE exists for the negative control: point the harness at a copy of
// site/ with a fault introduced on purpose, and confirm it fails. A harness
// that has only ever passed has not been shown to detect anything.
const SITE = process.env.VERIFY_SITE || join(ROOT, 'site');
// NOT 8765. On the workstation this was written on, that port is the resident
// agent's voice channel, and the collision does not present as a bind error —
// every request 404s and the whole run reads as a site with no pages on it.
const PORT = Number(process.env.VERIFY_PORT || 8791);
const LIVE = process.argv.includes('--live');
const BASE = LIVE ? 'https://organonmind.org' : `http://127.0.0.1:${PORT}`;

let pass = 0;
const fails = [];
const ok = (cond, what) => { if (cond) pass++; else fails.push(what); };

// ── offline checks: the file, before a browser ever sees it ──────────────────

// A tag-balance check with a real stack, not a regex. HTML's void elements and
// the SVG subset used here are the whole vocabulary; anything else unbalanced
// is a mistake. `<p>` is deliberately excluded — these pages close every one,
// and treating it as optional would hide exactly the error worth catching.
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr', 'path', 'rect', 'circle',
  'line', 'polyline', 'polygon', 'ellipse', 'use', 'stop', 'animate']);

function structure(name, html) {
  const body = html.replace(/<!--[\s\S]*?-->/g, '')
                   .replace(/<script[\s\S]*?<\/script>/gi, '')
                   .replace(/<style[\s\S]*?<\/style>/gi, '');
  const stack = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g;
  let m;
  while ((m = re.exec(body))) {
    const [, close, rawTag, attrs] = m;
    const tag = rawTag.toLowerCase();
    if (VOID.has(tag) || attrs.trimEnd().endsWith('/')) continue;
    if (tag === '!doctype') continue;
    if (close) {
      const top = stack.pop();
      if (top !== tag) {
        fails.push(`${name}: </${tag}> closes <${top ?? 'nothing'}>`);
        return;
      }
    } else stack.push(tag);
  }
  ok(stack.length === 0, `${name}: unclosed ${stack.join(', ')}`);
}

function duplicateIds(name, html) {
  const seen = new Map();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) {
    seen.set(m[1], (seen.get(m[1]) || 0) + 1);
  }
  const dups = [...seen].filter(([, n]) => n > 1).map(([id]) => id);
  ok(dups.length === 0, `${name}: duplicate ids ${dups.join(', ')}`);
}

// The explorer is a single inline <script>. `new Function` throws on a syntax
// error without running anything, which is the cheapest way to learn that the
// catalogue's data literal still parses after a set has been added to it.
function jsParses(name, html) {
  for (const m of html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { new Function(m[1]); }
    catch (e) { fails.push(`${name}: inline script does not parse — ${e.message}`); return; }
  }
  pass++;
}

// ── the run ──────────────────────────────────────────────────────────────────

const files = (await readdir(SITE)).filter(f => f.endsWith('.html'));
const src = new Map();
for (const f of files) src.set(f, await readFile(join(SITE, f), 'utf8'));

for (const [f, html] of src) { structure(f, html); duplicateIds(f, html); jsParses(f, html); }

const server = LIVE ? null : await serve(SITE, PORT);
const browser = await chromium.launch();
const page = await browser.newPage();

const noise = [];
page.on('pageerror', e => noise.push(`pageerror: ${e.message}`));
page.on('console', m => { if (m.type() === 'error') noise.push(`console.error: ${m.text()}`); });

// /poster is a third view of the same graph. It is on this list because check 5
// then resolves each of its forty-five `/patterns#…` links against the
// catalogue's own ids, which is the property that keeps a drawing honest: a
// node whose name or id it invented cannot pass.
const PAGES = ['/', '/patterns', '/om-001', '/om-002', '/om-003', '/om-004', '/om-005', '/why', '/poster', '/contents'];
const papers = ['om-001', 'om-002', 'om-003', 'om-004', 'om-005'];

// 6 · every page loads with no script noise, and collect its ids for check 5.
const idsByPath = new Map();
for (const path of PAGES) {
  const before = noise.length;
  const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
  ok(res.status() === 200, `${path}: HTTP ${res?.status()}`);
  ok(noise.length === before, `${path}: ${noise.slice(before).join(' | ')}`);
  idsByPath.set(path, new Set(await page.$$eval('[id]', els => els.map(e => e.id))));
}

// 0 · the three views agree. Two of the pages are generated from one array in
// scripts/landing.mjs; /patterns is hand-authored and carries a hand-written
// copy of the same markup. That copy is the reason this check exists — it
// asserts all three offer the SAME views in the SAME order and that each marks
// itself, so the copy cannot drift without failing here. A switch that quietly
// stops saying where you are is worse than no switch.
const VIEW_PAGES = [["/", "Chart"], ["/contents", "Contents"], ["/patterns", "Catalogue"]];
const seenSwitch = [];
for (const [path, label] of VIEW_PAGES) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  const sw = await page.$$eval("nav.switch a", els => els.map(e => ({
    href: e.getAttribute("href"), text: e.textContent.trim(),
    cur: e.hasAttribute("aria-current"),
  })));
  ok(sw.length === VIEW_PAGES.length,
     path + ": switch offers " + sw.length + " views, expected " + VIEW_PAGES.length);
  ok(sw.filter(a => a.cur).length === 1,
     path + ": switch marks " + sw.filter(a => a.cur).length + " views current, expected 1");
  const cur = sw.find(a => a.cur);
  ok(cur && cur.href === path,
     path + ": switch marks " + JSON.stringify(cur && cur.href) + " current, not this page");
  ok(cur && cur.text === label,
     path + ": current view reads " + JSON.stringify(cur && cur.text) + ", expected " + JSON.stringify(label));
  seenSwitch.push(sw.map(a => a.href + "|" + a.text).join(" "));
}
ok(new Set(seenSwitch).size === 1,
   "the three switches disagree: " + JSON.stringify([...new Set(seenSwitch)]));

// 1 · every retired id resolves, scrolls, and names the exact fragment it claims.
//
// The two exceptions are deliberate and are asserted as exceptions rather than
// skipped: `preface` keeps its bare id because OM-005 is now the argument's own
// paper, and OM-003's `#the-evidence` resolves in OM-003 because that section
// was split rather than moved. A harness that quietly tolerated both would not
// notice if a third appeared.
const EXPECT_BARE = new Set(['preface']);
let retiredSeen = 0;
for (const paper of ['om-001', 'om-002', 'om-003']) {
  const html = src.get(`${paper}.html`);
  for (const m of html.matchAll(/<li id="([^"]+)"><a href="(\/om-005#[^"]+)"/g)) {
    const [, id, href] = m;
    retiredSeen++;
    const want = EXPECT_BARE.has(id) ? `/om-005#${id}` : `/om-005#${paper}-${id}`;
    ok(href === want, `${paper}#${id}: href is ${href}, expected ${want}`);
    ok(idsByPath.get('/om-005').has(href.split('#')[1]),
       `${paper}#${id}: target ${href} does not exist in OM-005`);
    await page.goto(`${BASE}/${paper}#${id}`, { waitUntil: 'networkidle' });
    ok(await page.evaluate(() => window.scrollY) > 0, `${paper}#${id}: did not scroll`);
  }
}
ok(retiredSeen === 15, `retired anchors: found ${retiredSeen}, expected 15`);

// `/om-003#the-evidence` is the split's exception. It must resolve in OM-003.
await page.goto(`${BASE}/om-003#the-evidence`, { waitUntil: 'networkidle' });
ok(await page.evaluate(() => window.scrollY) > 0, '/om-003#the-evidence: did not scroll');
ok(idsByPath.get('/om-003').has('the-evidence'), '/om-003#the-evidence: id missing');

// 2 · every entry anchor lands on its own <h2>. An entry is a section carrying
// the template: entries run 11–14 `p.field`, the prose sections that surround
// them at most 4, so ten is a floor with real clearance on both sides.
const entryIds = new Set();
for (const paper of papers) {
  await page.goto(`${BASE}/${paper}`, { waitUntil: 'networkidle' });
  const sections = await page.$$eval('section[id]', els => els.map(e => ({
    id: e.id, fields: e.querySelectorAll('p.field').length, h2: !!e.querySelector('h2'),
  })));
  for (const s of sections.filter(s => s.fields >= 10)) {
    entryIds.add(s.id);
    ok(s.h2, `${paper}#${s.id}: entry has no <h2>`);
    await page.goto(`${BASE}/${paper}#${s.id}`, { waitUntil: 'networkidle' });
    ok(await page.evaluate(() => window.scrollY) > 0, `${paper}#${s.id}: did not scroll`);
  }
}
const entries = entryIds.size;
ok(entries > 0, 'no entries found — the p.field selector has changed');

// 3 · OM-003's eight slots, and every same-page fragment in that document.
await page.goto(`${BASE}/om-003`, { waitUntil: 'networkidle' });
const slots = [...src.get('om-003.html').matchAll(/id="(slot-\d+)"/g)].map(m => m[1]);
ok(new Set(slots).size === 8, `om-003: ${new Set(slots).size} slot ids, expected 8`);
for (const slot of new Set(slots)) {
  await page.goto(`${BASE}/om-003#${slot}`, { waitUntil: 'networkidle' });
  ok(await page.evaluate(() => window.scrollY) > 0, `om-003#${slot}: did not scroll`);
}

// 4 · the explorer's legacy ids are JS-routed. Assert on the rendered name,
// because there is no element whose id is the pattern's id to look for.
const patterns = src.get('patterns.html');
const legacyBlock = patterns.match(/var LEGACY=\{([\s\S]*?)\};/)[1];
const legacy = [...legacyBlock.matchAll(/'([^']+)':'([^']+)'/g)].map(m => [m[1], m[2]]);
ok(legacy.length === 8, `patterns: ${legacy.length} LEGACY rows, expected 8`);
const nameOf = new Map(
  [...patterns.matchAll(/id:"([^"]+)",n:\d+,name:"([^"]+)"/g)].map(m => [m[1], m[2]]));
for (const [old, live] of legacy) {
  await page.goto(`${BASE}/patterns#${old}`, { waitUntil: 'networkidle' });
  // Null-safe and non-fatal on purpose. The predicate can be evaluated against
  // a document that is still committing, where the element does not exist yet;
  // a bare `.textContent` throws there and reads as a missing element. And a
  // router that never runs should be reported as one failed id, not as an
  // exception that abandons every check after it.
  let shown = null;
  try {
    await page.waitForFunction(() => {
      const el = document.getElementById('d-name');
      return !!el && el.textContent !== '—';
    }, null, { timeout: 5000 });
    shown = await page.$eval('#d-name', e => e.textContent.trim());
  } catch { /* shown stays null */ }
  ok(shown === nameOf.get(live), `/patterns#${old}: shows ${JSON.stringify(shown)}, expected "${nameOf.get(live)}"`);
}

// 4b · the catalogue and the papers must name the same set of patterns. This is
// the one-copy rule made checkable in the direction it actually breaks: a set
// added to the explorer whose paper was not written, or an entry renamed in a
// paper while the explorer keeps the old id. Neither shows up as a broken link,
// because nothing links across the two by id.
for (const id of nameOf.keys())
  ok(entryIds.has(id), `/patterns lists "${id}" but no paper has an entry with that id`);
for (const id of entryIds)
  ok(nameOf.has(id), `a paper has entry "${id}" but /patterns does not list it`);

// 5 · site-wide link integrity. Fragments on /patterns are JS-routed, so its
// same-page hrefs are checked against the catalogue rather than against ids.
const known = new Set(nameOf.keys());
legacy.forEach(([old]) => known.add(old));
let links = 0;
for (const path of PAGES) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  const hrefs = await page.$$eval('a[href]', els => els.map(e => e.getAttribute('href')));
  for (const href of hrefs) {
    if (href.startsWith('#') || href.startsWith('/')) links++;
    if (href.startsWith('#')) {
      const frag = href.slice(1);
      if (path === '/patterns') ok(known.has(frag) || idsByPath.get(path).has(frag),
        `${path}: ${href} is neither a pattern id nor an element id`);
      else ok(idsByPath.get(path).has(frag), `${path}: ${href} has no target`);
    } else if (href.startsWith('/')) {
      const [p, frag] = href.split('#');
      const target = p === '' ? '/' : p;
      ok(idsByPath.has(target), `${path}: link to ${target}, which is not a page`);
      if (frag && idsByPath.has(target)) {
        if (target === '/patterns') ok(known.has(frag), `${path}: ${href} is not a pattern id`);
        else ok(idsByPath.get(target).has(frag), `${path}: ${href} has no target`);
      }
    }
  }
}

// The rendered-text sweep. innerText alone misses SVG, which is where a stale
// word survives longest — a figure is the last place anyone greps.
const RETIRED_WORDS = /\b(fleet|yard)\b/i;
const ALLOWED = new Set(['/om-002', '/om-003']);
for (const path of PAGES) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  const text = await page.evaluate(() =>
    document.body.innerText + '\n' +
    [...document.querySelectorAll('svg text, svg tspan')].map(t => t.textContent).join('\n'));
  const hit = RETIRED_WORDS.test(text);
  ok(!hit || ALLOWED.has(path), `${path}: retired vocabulary in rendered text`);
}

// 8 · link-preview cards. The card filename is written twice by construction —
// once as a PNG that scripts/build_cards.mjs emits from a page's og:title, and
// once as an og:image in the page itself — and nothing in either place can see
// the other. A card that was renamed, never generated, or generated for a page
// that has since been retitled fails the same way: the crawler asks for it,
// gets a 404, and shows the small grey text card that having no og:image at all
// would have shown. Silent, and only visible from outside the project, which is
// the worst place to find out.
let cards = 0;
for (const path of PAGES) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  const m = await page.evaluate(() => {
    const g = p => document.querySelector(`meta[property="${p}"]`)?.getAttribute('content') || '';
    return { img: g('og:image'), w: g('og:image:width'), h: g('og:image:height'),
             alt: g('og:image:alt'),
             card: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content') || '' };
  });
  ok(!!m.img, `${path}: no og:image`);
  if (!m.img) continue;
  // Absolute, and on the canonical host. A relative og:image is resolved by
  // some consumers and dropped by others, so it half-works, which is worse
  // than failing.
  ok(m.img.startsWith('https://organonmind.org/'),
     `${path}: og:image is ${m.img}, expected an absolute organonmind.org URL`);
  // summary_large_image is what turns the card from a thumbnail into the
  // 1200×630 image. Shipping the image and leaving the old value renders a
  // 120px square crop of a page of type, which is unreadable.
  ok(m.card === 'summary_large_image',
     `${path}: twitter:card is ${JSON.stringify(m.card)}, expected "summary_large_image"`);

  const res = await fetch(BASE + new URL(m.img).pathname);
  ok(res.status === 200, `${path}: og:image ${m.img} returns HTTP ${res.status}`);
  if (res.status !== 200) continue;
  const buf = Buffer.from(await res.arrayBuffer());
  // Read the real dimensions out of IHDR rather than trusting the declared
  // ones: the declared pair is what a crawler lays out against before it has
  // fetched anything, so the two disagreeing is a visible layout jump.
  const isPng = buf.length > 24 && buf.toString('latin1', 1, 4) === 'PNG';
  ok(isPng, `${path}: og:image is not a PNG`);
  if (!isPng) continue;
  const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
  ok(w === 1200 && h === 630, `${path}: og:image is ${w}×${h}, expected 1200×630`);
  ok(Number(m.w) === w && Number(m.h) === h,
     `${path}: og:image declares ${m.w}×${m.h} but the file is ${w}×${h}`);
  ok(m.alt.length > 0, `${path}: og:image has no alt`);
  cards++;
}
ok(cards === PAGES.length, `cards: ${cards} of ${PAGES.length} pages have a working one`);

// 9 · the sitemap lists every page and nothing else. It is generated from disk
// by build_poster.mjs, so this is really a check that the generator ran — but
// the failure it guards against is worth stating: a page missing from the
// sitemap is not broken, not slower, and not visibly different in any way from
// inside the project. It is simply never crawled. /why is the case that makes
// this load-bearing, because nothing links to it and the sitemap is its only
// route in.
const sm = await fetch(BASE + '/sitemap.xml');
ok(sm.status === 200, `/sitemap.xml: HTTP ${sm.status}`);
if (sm.status === 200) {
  const xml = await sm.text();
  const listed = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(m => new URL(m[1]).pathname).sort();
  const want = [...PAGES].sort();
  ok(listed.length === new Set(listed).size, `/sitemap.xml: duplicate <loc> entries`);
  for (const p of want)
    ok(listed.includes(p), `/sitemap.xml: does not list ${p}`);
  for (const p of listed)
    ok(want.includes(p), `/sitemap.xml: lists ${p}, which the harness does not know as a page`);
  // Every <loc> must be the canonical absolute form. A relative or
  // http:// entry is accepted by the schema and ignored by crawlers.
  ok([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
       .every(m => m[1].startsWith('https://organonmind.org')),
     `/sitemap.xml: a <loc> is not an absolute https://organonmind.org URL`);
}

const rb = await fetch(BASE + '/robots.txt');
ok(rb.status === 200, `/robots.txt: HTTP ${rb.status}`);
if (rb.status === 200) {
  const txt = await rb.text();
  ok(/^Sitemap:\s*https:\/\/organonmind\.org\/sitemap\.xml\s*$/m.test(txt),
     `/robots.txt: does not point at the sitemap`);
  ok(!/^Disallow:\s*\/\s*$/m.test(txt), `/robots.txt: disallows the whole site`);
}

await browser.close();
if (server) server.close();

// Say what was covered, not just that it passed. A selector that stops matching
// turns every check built on it into a silent no-op, and "all clear" over zero
// entries looks exactly like "all clear" over fifty.
console.log(`against ${BASE}`);
console.log(`  ${PAGES.length} pages · ${retiredSeen} retired anchors · ${entries} entries · ` +
            `${new Set(slots).size} slots · ${legacy.length} legacy ids · ${links} links · ` +
            `${cards} cards`);
console.log(`${pass} assertions passed`);
if (fails.length) {
  console.error(`\n${fails.length} FAILED:`);
  fails.forEach(f => console.error('  ✗ ' + f));
  process.exit(1);
}
console.log('all clear');
