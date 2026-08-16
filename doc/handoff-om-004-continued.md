# Handoff — Organon Mind, finishing OM-004

> ## ✅ SPENT — 2026-08-15, local session. Everything below was done.
>
> `origin/main` @ `1391123`. **OM-004 is published and live**, both halves, and
> OM-005 is at Rev. 3 with §§14–18. The catalogue is 45 patterns across six sets.
>
> - **§6's curl sweep ran, and the answer was clean** — all seven pages 200, all
>   byte-identical to `main`. Routing and DNS were never the problem.
> - **§6's harness is rebuilt and tracked**, at `scripts/verify/`, because it had
>   been lost from a scratchpad twice. 669 assertions, passing against
>   `organonmind.org` as well as `site/`. It has a negative control.
> - **§2.1's three entries** are drafted from the 08-15 pass, and §2.2 is shipped.
> - **§0's four decisions and §3's three shapes were kept.** No disagreement.
>
> **Two things this card got wrong, both worth carrying forward.**
>
> 1. **The 1.2% firing rate in §2.1 was never a real number.** It appears to be a
>    numerator and a denominator from different measurements; at the point where
>    405 utterances had accumulated, only three of the five edits had occurred.
>    The measured figure is **0.33%**, derived in `doc/om-004-draft.md` §12.
>    This is §5's own *count anything before publishing it* trap, and the card
>    repeated the figure rather than checking it.
> 2. **§6's suggested port 8765 is the resident agent's voice channel** on
>    organon-one. The collision does not present as a bind error — every request
>    404s and the run reads as a site with no pages on it. The harness defaults
>    to 8791.
>
> **Still open, and not this card's fault:** `doc/om-004-draft.md` §12.1 and §12.3
> are measurements taken on organon-one that belong in `workshop-machines`'
> evidence record too, and §12.3 describes a live defect in that repository's
> code — a hand-written rule that rewrites speech into a repository renamed on
> 2026-08-13. Both belong to a session rooted there.


**Successor to `doc/handoff-om-004.md`, which is now largely spent.** Read that one
only for §6 (conventions) and §7 (traps); its §0 decisions are made, its §2 state is
stale, and its §4.1, §4.2 and §4.5 are done and deployed. Written 2026-08-15 from a
cloud session. Everything below was verified in that session, not remembered.

**Written for a LOCAL session** — one with a browser, a shell, `curl` that reaches
the internet, and access to `james-andrew-walsh/workshop-machines`. Those three
things are exactly what the cloud session lacked, and they are why this document
exists rather than the work being finished.

---

## 0. Nothing is blocked on a decision

Both of the previous card's reserved decisions were made and shipped. Two more were
made during the session. **All four are settled — do not reopen any of them.**

| Decided | Answer |
|---|---|
| The catalogue title | **Design Patterns for Working with Agents** |
| Does `/why` get linked from the index | Linked, then **unlinked** hours later. The essay is not current. The page is still served; do not delete it, do not relink it. |
| OM-005's title | **On the First Four Papers** |
| OM-003's evidence section | **Split**, not moved. See §3. |

Four entry names were also fixed (§4). They are settled too.

---

## 1. Verified state, 2026-08-15

```
origin/main   c0c1e23   "OM-004: four names fixed, four of seven Revised Output entries drafted (#16)"
open PRs      none
merged today  #11 #12 #13 #14 #15 #16
```

**The site.** All four numbered papers are now plain presentations of their patterns;
the programme's argument lives in one document.

| URL | What it is now | § |
|---|---|---|
| `/patterns` | *Design Patterns for Working with Agents.* Four sets, position and relations only, **no prose for any set** | — |
| `/om-001` | fourteen One Agent entries | §1 intro, §§2–15 entries, §18 retired anchors, 19 sections |
| `/om-002` | eight Many Agents entries | §1–2 orientation, §§3–10 entries, §12 retired, 13 sections |
| `/om-003` | six arrangements + three Many Teams | §§5–10 and §§13–15, §18 retired, 19 sections |
| `/om-005` | **the argument, all of it** | 18 sections, Rev. 2 |
| `/why` | served, unlinked | — |

**The catalogue is still 31 published patterns and 118 relation edges.** Nothing was
added or removed this session; entries only moved.

⚠️ **The live site was never checked.** The cloud session's egress proxy returned 403
for `organonmind.org` and `*.vercel.app`. Everything above is verified against
`origin/main` plus the Vercel deployment record (production `dpl_CpwGWtnZ…`, READY at
`c0c1e23`). The site is static with `cleanUrls` and no build step, so bytes on `main`
are bytes served — but **routing and DNS were never exercised. Your first action
should be a `curl` sweep.** See §6.

---

## 2. The work that remains

### 2.1 Three entries — this is the actual blocker

`doc/om-004-draft.md` §9 has **four of seven** Revised Output entries. The roster in
§6 marks the other three `⚠️ needs 08-15 pass`:

- **Deterministic Last Mile** — needs the 1.2%-of-utterances firing rate and its derivation
- **One List, Two Uses** — needs the α1.0 cost re-measure (this repo's pass has α2.0 only)
- **Draft and Record Apart** — needs where the boundary actually falls

All three rest on **`doc/om-004-evidence-2026-08-15.md` in `james-andrew-walsh/workshop-machines`**
(PR #49, merged). The cloud session could not open it: `add_repo` refuses cross-owner
adds, and the GitHub tools were scoped to `organonart`. A local session just reads it.

🚨 **Do not draft these from `doc/om-004-evidence-2026-08-14.md`, which IS in this
repo.** The 08-15 pass *overturns* it on the load-bearing claim:

> **08-14:** a thirty-second-deep revision "does not happen", and cannot in 99.4% of utterances
> **08-15:** observed one reaching **35.6 s back, rewriting the utterance's first word**

Only the *frequency* half survived; the possibility claim was falsified. `doc/om-004-draft.md`
§11 records the correction in full, and §9 opens by stating which pass governs where they
conflict. The 08-14 pass is still citable for what it alone measured and 08-15 did not
overturn — the corrector curve (~6.3 ms per second of audio over a ~64 ms floor) and the
1502 logged utterance durations.

Write the three in the same shape as the four already there: **Intent · Motivation ·
Applicability · Consequences · Implementation · How you would know this is unnecessary ·
Relations**, plus a `⚠️` block where something is unflattering. Two of the four drafted
entries carry one — their reference instance is proposed for deletion by the same evidence
that verified them — and that is the template addition working, not a problem to smooth.

### 2.2 Publish OM-004 (the old card's §4.4)

Only after 2.1. The draft's own rule stands: *nothing ships until both halves exist.*

- `site/om-004.html` — the paper. Copy the shape of `site/om-002.html`: masthead, a short
  orientation section, then the fourteen entries as `<section id="…">` with
  `<p class="field first">Intent</p>` and the rest. **The Ambient Signals half's seven
  entries are already written** in draft §7 and need only converting to that markup.
- `site/patterns.html` — two new sets in `LANGS` with `lang` keys **`ambient`** and
  **`revised`** (both free, both matching their names), plus their entries in `P` with
  `intent:` and `rel:`. Both get `full:false` — every set is `full:false` now, and the
  explorer holds no prose. Add an `overview-ambient` and `overview-revised` panel to
  `#store`, in the shape of `overview-many-agents`.
- `site/index.html` — an OM-004 row, between OM-003 and OM-005.
- `site/README.md` — an `om-004.html` entry.
- **OM-005 Rev. 3** — draft §§1, 4, 5, 8 and 11 belong there, not in OM-004: the return to
  a published pattern, the template addition and the failure mode we walked into, the
  evidence position and the acceptance-corpus commitment, and the three corrected claims.
  Rev. 1's note already promises this. Use the prefix rule: `om-004-<original-id>`.

---

## 3. Settled shapes you must not undo

**The one-copy rule is now uniform.** Papers hold entries; `/patterns` holds the graph.
Every set is `full:false`. Do not add prose to the explorer.

⚠️ **The cost of that, already accepted:** the fourteen One Agent hero diagrams are gone
from the explorer, because `show()` lifts a `<figure>` out of stored full text that no
longer exists. Every figure is still in OM-001. Do not "fix" this by putting figures back
in the store — that is the one-copy rule fraying at the edge.

**Retired anchors: `/om-00N#x` → `/om-005#om-00N-x`.** Mechanical, stated on the page in
OM-005 §1, and the reason is not tidiness: all three papers had a section called *The
evidence* and one called *Forces that recur*, so unprefixed ids would have collided and
two of three would have needed renaming — which a published fragment does not permit.
**Two exceptions, both deliberate:**

- **`preface`** keeps its bare id in OM-005. It prefaces this argument, and OM-005 is now
  the argument's paper.
- **`/om-003#the-evidence` resolves in OM-003, not OM-005.** That section was split.

**The split, because it will look like an unfinished move.** OM-003 §4 was doing two jobs.
The *assessment* — thinner evidence than either predecessor, and the ladder — went to
OM-005 §12. The *instrument* — four sources with what each can and cannot establish, and
the eight open slots — **stayed** as OM-003 §3, retitled *The four sources, and eight open
slots*, because **twelve links from ten sections of that document point into those slots,
eight of them from entries**. Sending it away would make every entry leave its own paper
to say what it rests on. `site/README.md` carries this note. **Do not finish the move.**

**Revision notes are records.** Section numbers inside dated `Rev. N` lines describe the
structure of their own day and were deliberately left wrong-looking; each paper's newest
note says so. Cross-document pointers in those notes *were* corrected, because they point
at a live other document. That distinction is the rule — keep it.

---

## 4. Names settled this session

| was | is |
|---|---|
| The Visible Seam | **Show the Handover** |
| One Exemplar, Two Injections | **One List, Two Uses** |
| Split the Substrate | **Draft and Record Apart** |
| Single Precedence | **One Ordering, One Place** |

*Seam* was the worst: it is already OM-001's template field naming which side of the
harness/agent boundary a pattern sits on. *One Ordering, One Place* is the only one
already drafted, so the only rename that touched prose — and its entry body had been
arguing the corrected rule all along.

Still unpublished, so still free to change — but they were chosen against the plain-name
rule and the reasoning is in draft §11.

---

## 5. Traps found this session, on top of the old card's §7

- ⚠️ **Renumbering a paper staleness-breaks the other papers' citations of it.** PR #12
  renumbered OM-001 and left OM-002 and OM-003 citing "OM-001 §11" and "§10". Links were
  by id so nothing 404'd, but the printed numbers were live and wrong for ~15 minutes.
  **After any renumber, grep every other paper for `OM-00N §`.**
- ⚠️ **Count anything before publishing it.** "Eleven entries link into those slots" was
  asserted in six places before being checked. It is twelve links from ten sections, eight
  of them entries. `grep -o 'href="#slot-[0-9]*"'` takes two seconds.
- ⚠️ **The old card's anchor count was eight. The real obligation was twenty-five.**
  `#example-honest-gauge` and `#example-streaming-turn` were published at OM-001 Rev. 3 and
  were not on anyone's list; moving the worked examples would have taken them off the site
  exactly as PR #8 did. Then ten more when OM-001's argument left, then five more from
  OM-002 and OM-003. **Before touching a paper, enumerate its ids from the file** —
  `grep -o ' id="[^"]*"'` — not from a list someone wrote down.
- ⚠️ **A merged PR strands the branch.** After every squash merge, the remote feature
  branch still points at the pre-squash head, and a plain push fails. Reset onto the new
  `main` (`git checkout -B <branch> origin/main`) and `--force-with-lease`. This is normal
  here, not a sign of trouble.
- ✅ **The router CAN be exercised locally, contrary to the old card's §7.** That warning is
  about the in-app `data:` preview, which strips fragments. Serve the directory over HTTP
  and drive it with a real browser instead — this is how all twenty-five anchors were
  actually verified, and it is far stronger than reading source.

---

## 6. The verification harness — rebuild it, it earned its keep

The cloud session's scripts were in a scratchpad and are gone. They are worth twenty
minutes to recreate, and they caught things greps did not.

```bash
cd site && npx http-server -p 8765 --silent .    # static, no build
```

Then, with Playwright + Chromium, assert:

1. **Every retired id** resolves, produces a non-zero `scrollY`, and its `<a>` `href` equals
   the exact `/om-005#…` fragment it names. Fifteen of these across three papers.
2. **Every entry anchor** lands on its own `<h2>` with ≥12 `p.field` in the section.
3. **All eight `#slot-N`** in OM-003, and every same-page `a[href^="#"]` in that document.
4. **The eight ids in `LEGACY`** on `/patterns` open the right entry (JS-routed — assert on
   `#d-name`'s text, not on an element id).
5. **Site-wide link integrity**: collect `[id]` per page, then check every `a[href^="/"]`
   and `a[href^="#"]` on all seven pages resolves. Skip fragment-checking `/patterns`, whose
   ids are JS-routed.
6. **No `pageerror` and no `console.error`** on any page.

Plus, outside the browser:

```bash
# structural — a real parser, not a regex
python3 -c "…html.parser…"          # unclosed tags, mismatches
node -e "…"                          # duplicate ids per file
node --check <extracted patterns.js> # the explorer's JS still parses
```

⚠️ **Sweep the RENDERED text, including SVG.** The old card's §7 trap is real and the fix is
`document.body.innerText` **plus** `[...document.querySelectorAll('svg text, svg tspan')]`.
Current expected result: `fleet`/`yard` appear only in OM-002's and OM-003's dated revision
notes and in the permanent `#the-yard` / `#can-an-agent-run-a-yard` ids. Everything else clean.

**And then `curl` the live site**, which no session has done since this work began:

```bash
for u in / /patterns /om-001 /om-002 /om-003 /om-005 /why /om-004; do
  printf '%-12s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code}' https://organonmind.org$u)"
done
# expect 200 for all but /om-004 until it publishes
diff <(git show origin/main:site/om-001.html) <(curl -s https://organonmind.org/om-001)
```

⚠️ Compare `git show` against `curl`, never the working tree — the tree is CRLF on Windows
and the server serves LF, which shows a false one-byte-per-line diff.

---

## 7. Deploy

Unchanged: merging to `main` publishes to organonmind.org, and that is authorised. Land in
reviewable pieces and check each one against the live URL after it deploys — which, from a
local session, you can finally actually do.
