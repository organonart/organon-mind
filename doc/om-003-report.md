# OM-003 — commission report

**Drafted:** 13 August 2026
**Branch:** `claude/upbeat-hamilton-ex6qp7` · commit `35238d0`
**PR:** [organonart/organon-mind#1](https://github.com/organonart/organon-mind/pull/1) (draft, CI green, no review comments)
**Files:** `site/om-003.html` (new, 142,646 bytes) · `site/index.html` · `README.md` · `site/README.md`

---

## 1. The assumption to overrule first

**One paper, composites first** — as commissioned. It turned out to be more than a
convenience for the reader.

The composites half ends by following the Alexander debt down to its real test —
*is what gets generated good for the people who have to live inside it* — and that
question has no answer at fleet level, because at fleet level nobody lives anywhere.
The person is one level up. That is the hinge that makes the second half *follow*
rather than merely follow on, and it is the strongest argument for keeping the two
halves together.

If you disagree, the split is cheap and was designed to be:

- §3 carries an aside on the page saying the halves are written to be separable, and
  that the yard half becomes its own numbered document with a dated revision if it
  grows evidence of its own.
- The two halves share no numbering: composites are cited as *(Composite 2)*, yard
  patterns as *(OM-003 · 3)*.
- `site/README.md` records the separability as a decision, not an accident.

**The word: the yard.** You chose it. §14 names it as a choice — *"chosen rather than
found"* — and states that nothing below rests on the metaphor, so a later document can
overturn it without unpicking an argument.

**Evidence: visible gaps.** You chose this too. Eight open slots are on the page with
`#slot-N` anchors, and the entries that rest on reasoning link to their slot.

---

## 2. What is in the paper

### Level one — six arrangements (§7–§12)

Plain Fan-Out, Pipeline, Scout then Swarm, Loop Until Dry, Panel, Adversarial Verify.

The organising claim is yours, sharpened into a test that entries can fail:
**a composite is worth a name only when it changes what its constituent patterns mean.**
Each entry carries a new template field — **What it changes** — which is that claim
made into a table. Four examples, before any entry, in §2:

| Pattern | In plain fan-out | Inside another arrangement |
|---|---|---|
| Gather | surfacing disagreement is a *safety property* | in a Panel it is adjudication, and disagreement is the product |
| Isolation by Construction | makes collision unrepresentable — about trees | under Adversarial Verify it is independence of judgement — about a channel |
| The Return Path | carries a report back to the commissioning context | in a Pipeline it *is* the next unit's commission; two patterns, one object |
| Dispatch Without Escort | assumptions are made in parallel and collide at the join | in a Pipeline nothing collides; assumptions compound down the line |

**One candidate cut: Long Runner with Check-Ins.** It fails the test — its parts
(Fleet Standing, Dispatch Without Escort) do not change meaning inside it, its failure
signature is theirs unmodified, and a long run is a duration rather than a topology.
§6 records the cut, and what argument would bring it back. The test is worth nothing
if nothing fails it.

**§13 scores the answer rather than claiming it.** A selection sequence — five
questions asked in order, before the work — is more than a checklist, because it runs
forwards. It is less than Alexander's generativity, because it classifies and hands
over rather than differentiating a single whole, and because his final test is not
structural at all. Both halves of that verdict are on the page.

### Level two — the yard (§14–§17)

The asymmetry is stated as a five-row table: authority (unscopable), addressing (no
return address that resolves), accountability (no report), scarce resource (attention,
which does not divide and cannot be bought), failure mode (a squad nobody looked at is
indistinguishable from a squad running quietly).

Three patterns follow: **Standing by Readiness**, **Re-entry Note**, **Landing Order**.

Attention scheduling, contention beyond isolation, and uneven readiness are named as
forces and *not* promoted to patterns, because they do not yet have failure signatures
distinct from the three that are. That is the same discipline that cut entries from
OM-001.

**§18 stays open.** Whether an agent can run a yard, with what would settle it in each
direction — plus the observation that delegating the yard does not remove the
asymmetry, it moves it: the boundary is not a level in the hierarchy, it sits wherever
the person is.

### Evidence (§4)

Stated as a ladder, at the front, in one sentence: OM-001 had fourteen patterns with
four measured; OM-002 eight with two; **OM-003 has nine entries with none newly
measured.** Four sources are separated rather than blended — inherited measurements,
one practitioner's practice, reasoning about topology (the largest single source, and
labelled as argument), and adjacent prior art. Every entry carries an **Evidence** line
naming which it rests on.

The eight slots:

| Slot | Entry | What would fill it |
|---|---|---|
| 1 | Pipeline | a stage re-run because an intermediate artifact was not durable, and what it cost |
| 2 | Scout then Swarm | duplicated orientation cost across a fan-out's units, measured |
| 3 | Loop Until Dry | a run stopped at a fixed count that missed something, and what the extra round found |
| 4 | Panel | one panel whose disagreement changed a decision; one whose unanimity was worthless |
| 5 | Adversarial Verify | confirmation rates with and without the producer's reasoning |
| 6 | Standing by Readiness | how long a squad sat blocked while another was watched |
| 7 | Re-entry Note | reconstruction timed against reading a maintained note |
| 8 | Landing Order | finished work invalidated by another squad's landing: what was lost, when noticed |

**Slot 5 is the cheap one** — it could be closed in an afternoon and it is the only
claim in the document that could be settled that easily.

---

## 3. Verification, and the one thing I could not do

**`organonmind.org` is blocked by this session's egress proxy** — the gateway answers
403 to CONNECT for that host, and for the `*.vercel.app` preview too. So I could not
diff the live pages against the tree, and could not curl the published URL. Reported
rather than worked around, per the proxy's own instructions.

What I did instead:

- **Confirmed the tree is what Vercel builds.** Working tree clean; `HEAD` ==
  `origin/main` == `4fc57c8` before my commit, so there were no unpushed revisions of
  OM-002 to build on and nothing in the tree diverging from what is served.
- **Ran the live checks locally in headless Chromium** against `file://` — no network
  needed, since the page makes no external requests.

Results:

- **External references: 0.** The only absolute URL is `https://organonmind.org` in the
  colophon.
- **Every internal fragment resolves**, and every `/om-002#…` and `/om-001#…` target
  exists in the tree.
- **At 1280 and at a true 375** (device metrics, not a clamped window — the headless
  shell reports 375×812): no label outside its viewBox, none spilling its box, no
  label-on-label collisions across **149 labels in 11 figures**, and
  `body.scrollWidth == clientWidth` at both widths. Only `<pre>` scrolls, inside its
  own container.
- **Sanity-checked a known-good label first** before trusting any measurement — the
  zero-width-viewport trap you flagged. It reported 285.4 user units for a label that
  should be about that, so the numbers were trustworthy.

**The check earned its keep: it found three real defects**, all fixed and re-verified —
a seam label wider than its box in the pipeline figure, and two labels crossing the
trunk line in the landing figure. I also eyeballed rendered screenshots of every figure
at desktop scale, which is how the trunk-line crossings were spotted before the
measurement confirmed them.

### To run after merge

```sh
curl -s -o /dev/null -w "%{http_code}\n" https://organonmind.org/om-003   # expect 200
curl -s https://organonmind.org/om-003 | wc -c                            # expect 142646
curl -s https://organonmind.org/ | grep om-003                            # index links it
```

**Merging PR #1 is what publishes it.** I did not push to `main` directly — the branch
policy for this session says not to, and I could not have verified the result if I had.

---

## 4. House conventions observed

- Hand-authored HTML, no build step, no generator, **no external requests** — no fonts,
  no scripts, no analytics.
- CSS token block copied from `om-002.html`, single-theme light, every colour painted.
  One addition: `.slot`, dashed rather than solid, because the distinction from an
  aside is exactly that a slot is unfinished and says so.
- Eleven figures, inline SVG, drawn by hand, thin strokes, `currentColor`, the shared
  `#ah` arrowhead marker.
- Dated revision line on the masthead; nothing silently edited.
- Patterns cited by number; OM-001 cross-references go to `/patterns#anchor` as
  specified, OM-002's to `/om-002#anchor`.
- Section structure matches OM-002: the gap, the shape (with a map figure), the
  evidence, forces that recur, the entries in full, what this does not cover, sources
  and lineage.
- `site/index.html`, the `README.md` page table and the `site/README.md` file list all
  updated. Two stale "the name, and two links" descriptions were corrected (they had
  been wrong since OM-002 went up); the historical account of the front page's
  narrowing was left alone.

---

## 5. Left open, deliberately

- **OM-002 gets no forward link to OM-003.** Adding one is an edit to a published
  document and wants a dated revision line. Your call, not a silent tidy — say the word
  and it is a two-line change.
- **`/patterns` still holds only the first fourteen.** OM-003's nine live in the paper,
  as OM-002's eight do. Moving either set is the revision the READMEs already describe.
- **Composites left out for want of evidence rather than for failing the test** —
  tournament brackets, shadow runs, relays that hand work to a fresh context when one
  is exhausted. Named in §19 so they are not quietly forgotten.
- **Whether six is the right number**, or whether the set is closed. Stated as unknown.
- **More than one person in a yard** — now uncovered by three documents running, and
  said so in §19.
- The two fields added to the template (**What it changes**, **Evidence**) are defended
  in §6 rather than introduced silently. If either reads as apparatus rather than
  argument, it is one section to cut.
