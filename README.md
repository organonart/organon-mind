# organon-mind

**Organon Mind** — the research programme, and the site it publishes from:
[organonmind.org](https://organonmind.org).

A pattern language for working with agents. Forty-five named patterns across six
sections, every relation between them typed and drawn, and five papers making
the case.

The patterns came out of **[Organon](https://github.com/organonart/organon)** — a
workspace for exploring new paradigms for interacting with machines in this
agentic era. The voice loop, the resident agent, the presence layer: things built
to find out how people and machines might work together. These patterns were
surfaced there rather than invented here.

Organon is where that work happens. Organon Mind is where what it surfaces gets
written down, argued for, and made refusable. Same outfit, same marks, different
kind of paper.

## What is here

```
site/       organonmind.org — the pages themselves
scripts/    the generator and the verification harness
```

The repo is the site and what checks it. Nothing else.

`site/README.md` is the one to read before changing a page. It carries the rules
each file is held to and the traps that are easy to walk into.

## The pages

| Page | File | How it is made |
|---|---|---|
| `/` | `index.html` | **generated** — the chart, and the front door |
| `/contents` | `contents.html` | **generated** — the second front door: the name and the list |
| `/patterns` | `patterns.html` | hand-authored. **The catalogue, and the one place the graph lives** |
| `/poster` | `poster.html` | **generated** — the whole language on one A1 sheet |
| `/om-001` | `om-001.html` | hand-authored. Fourteen patterns for one agent |
| `/om-002` | `om-002.html` | hand-authored. Eight for many agents |
| `/om-003` | `om-003.html` | hand-authored. Six arrangements, and three for many teams |
| `/om-004` | `om-004.html` | hand-authored. Seven ambient, seven for revised output |
| `/om-005` | `om-005.html` | hand-authored. The argument behind all four |
| `/why` | `why.html` | hand-authored. Served, and not linked |

**Papers hold entries; `/patterns` holds the graph.** There is exactly one copy
of each entry and it is in its paper. The explorer carries position, intent and
relations, and names the paper that is canonical. Do not add prose to the
explorer without removing it from the paper.

## Generated files

Three pages are written by a script. **Each says so in its first comment, and a
hand edit is lost at the next run.**

```bash
node scripts/build_poster.mjs      # /, /contents and /poster — from patterns.html
```

`build_poster.mjs` reads the catalogue out of `patterns.html` and nothing else,
so the chart, the sheet and the front page cannot describe a catalogue the
catalogue does not have. If you change an entry in `patterns.html`, re-run it
and commit what it writes.

`scripts/render_paper_markdown.py` runs the other way, and the direction is the
point: it consumes a *page* and prints a markdown rendering of it, for places
that will not take HTML. Nothing is committed from it. A publication is
canonical and no generator can overwrite one.

## Verifying a change

```bash
cd scripts/verify && npm install && npx playwright install chromium
node verify.mjs            # against site/, over real HTTP
node verify.mjs --live     # against organonmind.org
```

Just under a thousand assertions: every published fragment still resolves and
scrolls, every entry anchor lands on its own heading, the explorer and the
papers name the same set of patterns, every internal link has a target, and no
page throws. It prints what it covered before it prints that it passed.

**Run it before opening a pull request.** `scripts/verify/README.md` explains
what each check is for and the two traps it is written around.

## Publishing

Publications are numbered (`OM-001`, `OM-002`, …). A number is permanent and is
never reused, so anything published can be cited without ambiguity.

**A published fragment is owed forever.** Twenty-five anchors on this site are
load-bearing and were broken once. If a section moves, its id stays and lands on
a line naming where it went; if an entry is renamed, the old id keeps resolving
through the explorer's `LEGACY` table. Never delete a row from it.

**Revisions are visible.** A published document that changes carries a dated
revision line saying what changed and why; it is not silently edited. If a
measurement is corrected, the correction is part of the record. This costs
nothing and is most of what separates a research note from marketing.

## Contributing

Corrections, counter-examples and evidence are welcome, and a pattern shown not
to hold in someone else's practice is a useful result. **New patterns start as
an issue rather than a pull request** — see [`CONTRIBUTING.md`](CONTRIBUTING.md)
for what that means and why.

## Licence

Two, because the repo holds two kinds of thing.

- **Code** — `scripts/`, and the JavaScript and CSS in the pages — under the
  MIT Licence. See [`LICENSE`](LICENSE).
- **The writing** — the publications, the catalogue, the entries and the
  figures — under **CC BY 4.0**. See [`LICENSE-CONTENT`](LICENSE-CONTENT).

Quote a pattern, teach from it, put it on a wall, fork the catalogue and
disagree with it in public. Credit Organon Mind and link back where practical.

## What this site deliberately is not

No downloads, no pricing, no product framing, no cookie banner, no analytics
that needs consent, no external requests — no fonts, no scripts, no trackers.
Inherited from `organon.art` on purpose: the offer is to watch the work, and if
it interests you, come to the bench.

Corrections and counter-examples: <hello@organon.art>.
