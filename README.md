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
doc/        markdown sources of record — the writing, unrendered
site/       organonmind.org, deployed as static files
scripts/    one generator per document class
```

**`doc/` is the record; `site/` is a rendering.** Anything under `site/` that is
generated must never be hand-edited — the markdown is what gets revised, and the
page is rebuilt from it. This is the discipline the sibling repo already uses
and the reason a document can be corrected years later without archaeology.

| Page | Source | Generator |
|---|---|---|
| `/` | `site/index.html` | hand-written — the name and the line, nothing else |
| `/why` | `doc/not_just_what_it_says.md` | `scripts/generate_mind_why.py` |

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
