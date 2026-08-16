# The verification harness

```bash
npm install && npx playwright install chromium   # once
node verify.mjs            # against site/, served over real HTTP
node verify.mjs --live     # against organonmind.org
```

Both modes print what they covered before they print that they passed.

## Why this is tracked

It was built twice in session scratchpads and lost twice, and both times the
next session opened by wondering whether the anchors still resolved. Twenty-five
published fragments are load-bearing on this site and one of them was broken
once already, by a move that looked purely editorial.

The programme's own position, from OM-004 §5: *a number whose instrument is
unreproducible is testimony wearing the costume of measurement.* That applies to
a site check as much as to a latency figure. An instrument that does not survive
its session is not an instrument.

## Why a browser rather than grep

`grep` answers *is the string present*. The obligation is *does the fragment
scroll*, which is a different question — an `id` can be present on an element
that is `hidden`, inside a collapsed container, or above the fold on a short
page. And the explorer routes eight retired ids in JavaScript, where nothing
static can see them at all.

## What it asserts

| | |
|---|---|
| Structure | balanced tags via a real stack, no duplicate ids, every inline script parses |
| Retired anchors | all 15 resolve, scroll, and their `href` equals the exact `/om-005#…` the prefix rule requires |
| Exceptions | `preface` keeps its bare id; `/om-003#the-evidence` resolves in OM-003 — both asserted *as* exceptions, so a third would be noticed |
| Entries | every entry anchor scrolls and lands on its own `<h2>` |
| One copy | the explorer's pattern ids and the papers' entry ids are the same set, in both directions |
| Slots | all 8 `#slot-N` in OM-003 |
| Legacy routing | the 8 `LEGACY` ids open the right entry, asserted on rendered text |
| Links | every `a[href^="/"]` and `a[href^="#"]` on all seven pages resolves |
| Noise | no `pageerror`, no `console.error` |
| Vocabulary | retired words swept from rendered text **and SVG** |

## Two traps it was written around

**Port 8765 is not free on every machine.** On the workstation this was written
on it is the resident agent's voice channel, and the collision does not present
as a bind error — every request 404s and the run reads as a site with no pages.
The default is 8791; `VERIFY_PORT` overrides.

**The server has to be the one under test.** `cleanUrls` is the thing being
verified, so `serve.mjs` reproduces it rather than depending on a generic static
server that might resolve `/om-001` some other way.

## The negative control

`VERIFY_SITE` points the harness at a copy of `site/` so a fault can be
introduced deliberately. Four were, and all four were caught and named: a
retired anchor pointed one character off, an entry id renamed in a paper but not
in the catalogue, a same-page link with no target, and a duplicate id. Re-run it
after changing what the harness asserts — the failure mode of a check is to stop
checking, silently.
