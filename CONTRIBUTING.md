# Contributing

Short version: **corrections, counter-examples and evidence are welcome as pull
requests. New patterns start as an issue.** The rest of this explains why, and
lists the four things a well-meaning change breaks most often.

## What is most useful

**A counter-example.** A pattern shown not to hold in someone else's practice is
a real result and will be recorded as one, with credit. The papers say this on
their own faces; it is not a formality.

**Evidence.** Every claim here carries its provenance — *measured*, *reported*,
or *derived* — and the base is narrow: one workstation, one speaker, one room.
A measurement from a different machine, a different voice or a different team is
worth more to this programme than a new pattern.

**Corrections.** A wrong number, a broken anchor, a claim that does not survive
contact with your practice. The programme has withdrawn several of its own
claims in public and will withdraw more.

**Code.** The generators and the verification harness are MIT and ordinary
software. Fix them freely.

## New patterns: open an issue first

Not a rule about process. A rule about what an entry is.

Every entry in this catalogue is a signed, dated claim with a stated evidence
base, a stated cost, a failure signature, and — since OM-004 — the condition
under which it should be deleted. The papers are authored documents with
revision histories, and the provenance labels on every line mean something
because one person is accountable for them.

So the model is **editorial**. You propose; if it lands, it gets written into
the paper it belongs to and **you are credited for the proposal**. What a
proposal wants:

- the **forces** — what pulls against what. A pattern that resolves no tension
  is a tip.
- where you have **seen it**, and how often. Existence beats frequency here;
  both beat plausibility.
- the **cost**. An entry with only benefits has not been used.
- **how you would know it is unnecessary** — the condition that would make it
  pointless, named precisely enough to check. This is the field OM-004 adds and
  the hardest one to answer honestly.
- which **section** it belongs to, and what it relates to.

If the answer to the last two is "a new section", say so — that is a bigger and
more interesting proposal.

This will widen. The form is still moving: the template gained a field three
weeks ago and a set was renamed the week before that. Bylined entries by other
authors are a question of when, not whether.

## Four things that break

### 1. A published fragment is owed forever

Twenty-five anchors on this site are load-bearing, and they were broken once by
a change that looked purely editorial. If you move a section, its id stays and
lands on a line naming where it went. If you rename an entry, add a row to
`LEGACY` in `patterns.html` so the old id still resolves. **Never delete a row
from that table.**

### 2. Four pages are generated

`index.html`, `contents.html`, `poster.html` and `why.html` are written by a
script. Each says so in its first comment. A hand edit to any of them is
discarded at the next build — silently, and possibly weeks later.

```bash
node scripts/build_poster.mjs          # /, /contents, /poster
python3 scripts/generate_mind_why.py   # /why
```

Change the source, re-run the generator, commit what it writes.

### 3. One copy of each entry

Papers hold entries; `/patterns` holds the graph. An entry's prose lives in its
paper and nowhere else — the explorer carries position, intent and relations
only. Adding prose to the explorer without removing it from the paper creates a
second copy, and the second copy is the one that goes stale.

### 4. The view switch exists three times

`/` and `/contents` are generated from one array in `scripts/landing.mjs`.
`/patterns` is hand-authored and carries a typed copy. Change one and the
harness will tell you the three disagree — that check is the only thing keeping
the copy honest.

## Before you open a pull request

```bash
cd scripts/verify && npm install && npx playwright install chromium
node verify.mjs
```

Just under a thousand assertions, and it prints what it covered before it prints
that it passed. If you changed anything under `site/`, this is not optional —
most of what it checks is invisible in a diff.

If your change touches the catalogue, re-run `node scripts/build_poster.mjs` and
include the regenerated files. The harness cross-checks that the explorer and
the papers name the same set of patterns, so a half-applied change fails loudly.

## House style

Match the surrounding prose. It is plain, it states costs beside benefits, and
it does not use a word where a shorter one works. Names follow one rule:
**containers plain, leaves vivid** — build on vocabulary the reader already has,
and a name that needs a glossary entry has failed.

Numbers are counted, not estimated. If you cannot say where a figure came from,
it does not go in.

## Licence of contributions

The repo is dual-licensed: MIT for code, CC BY 4.0 for the writing (see
[`LICENSE`](LICENSE) and [`LICENSE-CONTENT`](LICENSE-CONTENT)). By opening a
pull request you agree your contribution may be published under whichever of
those two applies to the files you touched.

## Conduct

Disagree with the work as sharply as you like; that is what it is for. Do not
make it about the person. Reports: <hello@organon.art>.
