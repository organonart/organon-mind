# organon-mind

**Organon Mind** — the research programme, and the site it publishes from.

This repo holds `organonmind.org`: the letterhead, the declaration behind it,
and the publications. It is deliberately separate from the instrument's source,
which lives in [`organonart/organon`](https://github.com/organonart/organon).

Organon is the made thing. Organon Mind is the work of finding out how minds and
people work together — the voice loop, the resident agent, the presence layer,
the patterns that came out of building them. Same outfit, same marks, different
kind of paper.

## What is here

```
site/       organonmind.org — the pages themselves, hand-authored
doc/        sources for things that are not the pages
scripts/    one surviving generator; see the warning below
```

**The HTML in `site/` is the document.** Publications are written directly as
HTML rather than generated from markdown. The generator that used to do this
existed because the site lived in a different repository from its source; now
that they are together, a markdown renderer would only stand between the writing
and the design — and the pattern explorer needs design control a renderer cannot
give. One artifact, no drift.

`doc/` keeps sources for things that are genuinely *not* the pages: the figure
prompts, which are the source for any generated figure, and the writing behind
`/why`.

| Page | How it is made |
|---|---|
| `/` | `site/index.html` — hand-authored. The name, and two links |
| `/patterns` | `site/patterns.html` — hand-authored. **The catalogue, and canonical for it** |
| `/om-001` | `site/om-001.html` — hand-authored, figures as inline SVG. The argument |
| `/om-002` | `site/om-002.html` — hand-authored. The second language, in full |
| `/why` | ⚠️ **still generated** — see below |

**`/patterns` is canonical for the fourteen patterns; `/om-001` is the argument
for them.** OM-001 carried all fourteen in full until Rev. 3 (12 Aug 2026), which
is when the explorer took over and the paper became what it should always have
been: the case for the language, the evidence behind it, and the one field the
Gang of Four template is missing. Two entries — Honest Gauge and Streaming Turn —
are reproduced in the paper as worked examples, marked as reproductions, because
an argument for a form has to show the form working. **If those two ever differ
from `/patterns`, the catalogue is right.**

⚠️ **`site/why.html` is the one page that is still generated**, from
`doc/not_just_what_it_says.md` via `scripts/generate_mind_why.py`. Do not
hand-edit it; the next regenerate silently discards the change. This is a
transitional state, not the rule — when `/why` is reset in the current type
setting it becomes hand-authored like the rest, and the generator and its
markdown go with it.

## Publishing

Publications are numbered (`OM-001`, `OM-002`, …). A number is permanent and is
never reused, so anything published can be cited without ambiguity.

**Revisions are visible.** A published document that changes carries a dated
revision line saying what changed and why; it is not silently edited. If a
measurement is corrected, the correction is part of the record. This costs
nothing and is most of what separates a research note from marketing.

## Deploy

Static, no build step, deployed from this repo. `vercel.json` sets `cleanUrls`
so `/why` serves `why.html`.

## What this site deliberately is not

No downloads, no pricing, no product framing, no cookie banner, no analytics
that needs consent, no external requests — no fonts, no scripts, no trackers.
Inherited from `organon.art` on purpose: the offer is to watch the work, and if
it interests you, come to the bench.

## History

This repo previously held a mirror of Organon's source, taken 4 August 2026 and
folded into `organonart/organon` on 9 August by *"Organon — one engine, three
instruments"*. That history was cleared when the repo was repurposed; the
snapshot is kept locally under the tag `mirror-snapshot-2026-08-04` and nothing
in it was unique.
