# Handoff — Organon Mind, papers as plain presentation

**For a session rooted in `C:\Users\james\Documents\GitHub\organon-mind`** (or a clone of
`organonart/organon-mind`). Written 2026-08-15. Everything below was verified, not remembered.

---

## 0. Two decisions are yours and both block work

**Do not guess them** — they become permanent published names, and two earlier guesses in
this programme had to be publicly retracted.

**What they actually block is narrower than it first looks.** §4.1 (OM-001), §4.2 (trims),
§4.3 (drafting), §4.4 (publishing OM-004) and §4.5 (OM-005) can all proceed without either
decision — OM-004's own title is settled, and adding sections to the explorer does not
require retitling the catalogue. **Blocked, and only these:** changing the catalogue title
wherever it appears (`site/index.html`, `site/patterns.html`), and linking `/why`. Do
everything else, and leave those two as a final small commit.

1. **The catalogue title.** Currently *Design Patterns for AI Agents*, on the front page and
   `/patterns`. It fails on both halves of the naming rule: it promises agent internals, of
   which the catalogue contains **zero** (9 harness, 4 both, 1 disposition, none agent-side),
   and it omits the person, who is the protagonist of all 45 patterns. It also won't survive
   "agent" deflating the way "web" and "mobile" did.

   Five that pass the three hard cases — dictation with no agent, a lamp reporting when
   nothing is happening, one person over four squads for days:

   | Design Patterns for… | risk |
   |---|---|
   | **Working with Machines** ← recommended | *machines* can read as hardware |
   | **Working with Intelligent Machines** ← James's | see below; strong on findability |
   | Working Alongside Machines | a syllable longer for no gain elsewhere |
   | Machines That Act | omits the person; invites an argument about "act" |
   | Machine Work | omits the person; slightly industrial |

   ⚠️ On *Intelligent*: it is durable (Turing-era, has not dated) and it buys back the
   discoverability lost by dropping "agent". But the seven Ambient Signals patterns drive a
   **Govee lamp, which has no intelligence at all**, and they exist *because* of that —
   Standing Assertion's stated retirement condition is "if the device could report its own
   state". So the word names a property untrue of ~15% of the catalogue, in the title's
   load-bearing position. Both are defensible; this is a taste call, not a correctness one.

2. **Does `/why` get linked from the index?** See §5's risk. One-word answer is enough.

---

## 1. The change being made

**The four numbered papers stop being accounts of how the patterns were arrived at.** They
become plain presentations of the patterns themselves: a prosaic introduction about *what
this section contains*, then the entries in the template. Gang of Four practicality.

Everything removed — method, evidence discipline, corrections, derivation — goes into a new
**OM-005, a reflective paper about the first four**. It is not a lesser paper; it is where
the programme's argument now lives.

This reverses OM-001's Rev. 3, which deliberately turned that paper *from* a catalogue *into*
an argument. That was a good decision at the time and is being knowingly undone.

---

## 2. Verified state, 2026-08-15

```
origin/main        e46c369    "The two paper titles, and the eight anchors #8 broke (#9)"
open PRs           none
live site          /patterns 200, four sections served
```

**The catalogue** — 31 published patterns, 118 relation edges:

| section | n | canonical text lives in |
|---|---|---|
| One Agent | 14 | **`/patterns`** ← the outlier |
| Many Agents | 8 | OM-002 |
| Arrangements | 6 | OM-003 |
| Many Teams | 3 | OM-003 |

**Papers** — titles are settled, do not revisit:

```
OM-001  Conversational Agent Control Surfaces   13 sections, 12 of them argument,
                                                ZERO pattern bodies (§9 is 14 stubs)
OM-002  Working with Many Agents                already the target shape
OM-003  Arrangements, and Many Teams            already the target shape
OM-004  Ambient Signals, and Revised Output     unpublished, 7 of 14 entries drafted
```

⚠️ **OM-004's title is settled and this is not obvious.** It was rejected earlier for
announcing a new taxonomy, because its §1 opened by denying it was one. This change moves
§1 to OM-005, so the paper becomes exactly a presentation of two sets — and naming it for
them is now correct. It matches *Arrangements, and Many Teams*. **Do not reopen it.**

---

## 3. Recently landed, so you don't undo it

- **Sections renamed** (PR #7): Turn→One Agent, Fleet→Many Agents, Yard→Many Teams.
- **Nine pattern names renamed** (PR #8), e.g. Mode Legibility→Mode Visibility.
- ⚠️ **PR #8 silently broke eight published anchors.** Repaired in PR #9 by two mechanisms
  that must both survive any rewrite: **legacy `<span>` anchors** in the papers, and a
  **`LEGACY` map** in `patterns.html` consulted before the router gives up. Verify all eight
  still resolve after any edit to those files.
- **Arrangements now record composition** — 24 `built from` edges, extracted from OM-003's
  Constituent tables. Previously 6 edges against 30 the prose asserted.
- **`fleet` and `yard` are expunged.** `fleet`→`squad` (17× in OM-002); `yard` removed with
  **no replacement coined**. Surviving occurrences are only revision notes, published ids,
  and one historical line — all deliberate. **Do not reintroduce either word.** *Squad*
  stays (it names a thing); *team* is the plain container above it.

---

## 4. The work

**Order matters — 4.1 unblocks the uniform rule that 4.2 and 4.4 depend on.**

### 4.1 OM-001 becomes a presentation
Move the fourteen pattern bodies **out of `/patterns` and into `om-001.html`**, in the same
markup OM-002 uses (`<section id="…">` per pattern, `class="field"` headings: Intent,
Motivation, Applicability, Structure, Participants, Collaborations, Consequences,
Implementation, Sample interaction, Related). Replace the twelve argument sections with one
short introduction about what the One Agent section contains. Keep §9's stub mechanism and
all fourteen `#anchors` — they are load-bearing and predate Rev. 2.

**Consequence, and it is a simplification:** every paper then holds its own entries and
`/patterns` becomes a uniform index across all sections. One rule instead of two. It also
reverses OM-004 draft §10's "born canonical in `/patterns`" — OM-004 is now canonical in
its own paper.

### 4.2 OM-002 and OM-003 — trim only
Entries are already correct and in full. Reduce the front matter to orientation about the
section's contents. Move the evidence and gap sections to OM-005. Do not touch the entries.

### 4.3 Draft OM-004's remaining seven entries
`doc/om-004-draft.md` has 7 of 14 written (the Ambient Signals set). Write the Revised
Output seven: Draft and Record · No Frozen Prefix · The Visible Seam · Churn Is Not
Correction · Deterministic Last Mile · One Exemplar, Two Injections · Split the Substrate.

⚠️ **Four of those names fail the plain-name rule and should be fixed while drafting:**
- **The Visible Seam** — *seam* is already OM-001's template field (which side of the
  harness/agent boundary a pattern sits on). Two meanings, one word, both ours.
- **One Exemplar, Two Injections** — *exemplar* isn't vernacular; *injections* reads as DI
  or SQL. It means: one vocabulary file used two ways. Try **One List, Two Uses**.
- **Split the Substrate** — *substrate* is pure coinage.
- **Single Precedence** — describes the wrong rule. The rule is that the ordering must live
  in **one place**, not that one thing wins.

Evidence for this half is `doc/om-004-evidence-2026-08-15.md` in `workshop-machines`
(PR #49, merged). The headline finding: **continuous re-reading cannot change the final
text** — proven structurally, not just sampled — so No Frozen Prefix and The Visible Seam
govern a live view that is itself proposed for deletion. Say that in those entries.

### 4.4 Publish OM-004
Paper page + two explorer sets (`ambient`, `revised` as `lang` keys; those ids are free and
should match their names). Add to `site/index.html`. Update `site/README.md`.

### 4.5 OM-005 — the reflective paper
Holds everything removed above, plus what is currently OM-004 draft §§1, 4, 5, 8, 10: the
return to a published pattern and the two implementation notes that proved insufficient in
practice; the template additions and the failure mode we walked into; the evidence position
and the acceptance-corpus commitment; three published claims corrected. Title per the same
plain rule.

---

## 5. Risk to keep in view

Stripping OM-001 to an intro means a new reader's first encounter is a bare catalogue, with
the case for it deferred to OM-005 they may never reach. Gang of Four solved this by putting
the argument in chapter 1 of the same book. `/why` already exists, is served, is unlinked,
and is exactly the programme's position — linking it from the index covers this. See §0.2.

---

## 6. Conventions that are load-bearing

- Hand-authored HTML. **No generators, no build step** (`why.html` is the sole exception and
  is generated from `doc/not_just_what_it_says.md`).
- **No external requests** — no fonts, scripts, analytics, trackers.
- Single-theme light. A publication has a canonical appearance and does not follow the OS.
- **Revisions are visible**: dated `<p class="revision">Rev. N — DD Mon 2026.` lines. Never
  silent edits. OM-002 and OM-003 are at Rev. 3.
- **Publications, numbers and anchors are permanent.** A published fragment is owed forever.
  Headings may move; ids may not.
- ⚠️ **ONE COPY OF EACH ENTRY.** After 4.1 the papers are canonical and `/patterns` carries
  position, intent and relations only. Never add prose to the explorer without removing it
  from the paper.
- **Containers plain, leaves vivid.** Build on vocabulary the reader already has; a name
  needing a glossary has failed. A container name must also be *durable* — not a word at
  peak fashion.
- **Naming test:** a good name describes everything the thing is and nothing it isn't.

---

## 7. Traps that cost real time in this session

- ⚠️ **Verify the artifact, never the branch or the tree.** A whole audit was run against a
  working tree that sat on a stale branch and reported confidently wrong counts.
- ⚠️ **Grep the rendered page, not just the source.** `A FLEET` and `LEVEL TWO · THE YARD`
  survived every source sweep because they were **all-caps inside SVG figures** and the
  greps used lower and title case. Only reading the rendered text found them.
- ⚠️ **Check the live URL with `curl` after every merge.** Never assume a push deployed.
  Vercel builds on push to `main` and on nothing else.
- ⚠️ Comparing working-tree bytes to served bytes shows a false one-byte-per-line diff —
  the tree is CRLF, the server serves LF. Compare `git show origin/main:site/x.html` against
  `curl` output instead.
- ⚠️ `/patterns` anchors are JS-routed. To check one resolves, grep for `id:"…"` in the data
  and the `LEGACY` map — **not** for an element id.
- ⚠️ A PR merged out from under you freezes its head SHA; later pushes strand silently on the
  branch. If a push "vanishes", check whether the PR merged and whether `main` already has
  the content (a squash merge means ancestry is the wrong test — diff the content).
- ⚠️ The in-app preview serves local files as a `data:` URL, which **strips fragments and
  blocks `location.hash`** — the router cannot be exercised locally. Verify it live.
- ⚠️ `python` on this machine is the Store stub and does not run. Use `sed`/`awk`/`node`.

---

## 8. Deploy

Merging to `main` **publishes to organonmind.org**. That is the intended path for this work —
James has authorised checking in and deploying from the cloud session.

**But:** land §4 in reviewable pieces rather than one merge, verify each against the live URL
after it deploys, and **do not merge anything that depends on a §0 decision until it is
given**.
