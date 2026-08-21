# site/ — organonmind.org

The page for **organonmind.org**, Organon Mind's own address. Same letterhead
lineage as `organon.art`: one page, no external requests.

- `index.html` — **the landing page. GENERATED**, do not hand-edit. Run
  `node scripts/build_poster.mjs`, which writes this and `poster.html` from the
  same graph; the composition is `scripts/landing.mjs`.

  It carries the wordmark, the view switch, the masthead and the taxonomy sheet.
  ⚠️ **It does not carry the publications list** — that is `/contents`, one click
  away on the switch. A list at the foot of the chart would be a second copy of
  that page, kept in step by nobody. ⚠️ **This reverses a stated decision and the
  reversal is deliberate.** Until 20 Aug 2026 the index was the name and a list —
  no tagline, no description, no invitation — on the grounds that the front page
  should not argue. It still does not argue: the one line says what the thing is
  and stops, because the argument is a document and a front page competing with
  OM-005 would be a second copy of it. What changed is that there is now
  something worth showing.

  ⚠️ **Two compositions, one source, and the breakpoint is measured.** The sheet
  is sized for A1, so its copy renders at container-width ÷ 1485 × 13.5 px —
  about 4px on a phone. Below 1080px the same graph is drawn again as a stacked
  ladder in real type and the sheet is offered rather than imposed. Neither is a
  summary of the other; both come out of `patterns.html`.

  ⚠️ **The ladder must not make Ambient Signals a sixth rung.** A vertical list is
  exactly the shape that flattens the one thing the drawing exists to say, so the
  band is its own block outside the numbered ladder, carrying the caption. And
  the rungs carry **no ordinals**: a number beside One Agent reads as a document
  number, and One Agent is OM-001 while sitting fourth in span order.

  ⚠️ **The publications list is derived from the papers on disk**, each supplying
  its own title from its masthead, and the builder throws if an `om-NNN.html`
  exists that the page does not link. It was hand-kept before, which is why
  OM-004 was live for some hours before the front page said so.
- `patterns.html` — *Design Patterns for Working with Agents*, the catalogue at
  `/patterns`: index rail, specimen detail, and Related Patterns as navigation
  rather than a dead list. One file, hand-authored, no external requests; the
  small amount of JavaScript is the explorer itself and runs from the same file.
  The One Agent overview carries *The line this stands in* — the OM-001 preface
  adapted to what this page does, and the reason Related Patterns is navigable at
  all. ⚠️ It is the short version on purpose; the signed one lives in the paper,
  and the two should not drift into competing accounts of the same debt.

  **It holds four sets, chosen by the Patterns switch above the rail**, and this
  is the answer to "where do the papers' entries go" — *not* one longer list. One
  Agent (14, OM-001), Many Agents (8, OM-002), Arrangements (6, OM-003 level one)
  and Many Teams (3, OM-003 level two) each bring their own groups, their own
  stage filter and their own overview. ⚠️ **They are not filters over one
  catalogue.** A stage is a different kind of thing in each, and "Stage:
  Execution" beside an entry about which squad's work lands first is how a
  catalogue stops meaning anything. The Side-of-seam filter is One Agent-only and
  hides elsewhere; a set with one group hides the stage row entirely, because
  "All" against one option is a control that cannot do anything.

  ⚠️ **No entry's full text lives here, and that is the one-copy rule holding.**
  Every set carries position, intent and relations, and names the paper that is
  canonical for it. One Agent was the exception until Aug 2026, because Rev. 3 of
  OM-001 had made that paper an argument with nowhere to put its fourteen; they
  are back in OM-001 and the rule is now uniform — papers hold entries, this page
  holds the graph. Do not add prose here without removing it there.

  Relations cross the sets freely and **say so** (`→ Many Agents` on the
  citation), and following one switches the rail with you. `Cited by` counts every
  set, and `[`/`]` deliberately step only within the set you are reading. Deep
  links are unchanged and set-agnostic: the id decides the set, so
  `/patterns#gather` lands in Many Agents without a caller knowing it exists.
- `om-001.html` — the paper at `/om-001`. Since Rev. 6 it is the **presentation**
  of the One Agent section and nothing else: §1 introduces it and §§2–15 are the
  fourteen entries in full, in the same template and markup OM-002 and OM-003 use.
  The argument that used to precede them is `om-005.html`. ⚠️ Its per-pattern
  anchors (`/om-001#approval-gate` and the other thirteen) are **load-bearing** and
  land on the entry itself. So do `#example-honest-gauge` and
  `#example-streaming-turn`, the two Rev. 3 reproduced as worked examples, carried
  as `legacy-anchor` spans — and the ten ids whose sections left for OM-005, held
  in **§18, *Where the argument went***, each landing on a line naming where it
  went. Do not remove any of them to tidy the markup; a published fragment is as
  permanent as a published number.
- `om-005.html` — *On the First Four Papers*, at `/om-005`. Where the programme's
  argument lives: the gap, the literature, the cost, the evidence, the form and
  the field added to it, the map — plus, as they arrive, OM-002's and OM-003's
  evidence and gap sections (Rev. 2) and OM-004's method notes (Rev. 3).
  ⚠️ **Sections moved here are re-anchored `om-00N-<original-id>`**, and that
  prefix is not decoration: all three papers had a section called *The evidence*
  and one called *Forces that recur*, so unprefixed ids would collide on arrival
  and two of the three would have to be renamed — which a published fragment does
  not permit. The rule is mechanical and stated on the page: `/om-001#x` is
  `/om-005#om-001-x`. The preface is the one exception and keeps its bare id; it
  prefaces this argument, and this is now the argument's paper.
- `om-002.html` — *Working with Many Agents*, at `/om-002`. Eight patterns for delegating
  to more than one agent at once, in three acts: the split, in flight, the join.
  Published in full in the paper, like all three sets since Aug 2026 — there is
  exactly one copy of each, and do not create a second by adding them to
  `/patterns`. Since Rev. 5 the argument is gone: the gap, the evidence and
  *Forces that recur* are OM-005 §§8–10, and their three ids are kept in **§12,
  *Where the argument went***.
- `om-003.html` — *Arrangements, and Many Teams*, at `/om-003`. Two levels in one
  document: six named arrangements of OM-002's eight patterns (§5–§10), and the
  level above a squad — one person working four to six squads at once (§12–§15).
  ⚠️ **The two halves are written to be separable.** If the Many Teams half grows
  evidence of its own it becomes its own numbered document, and the split is a
  dated revision here saying so; §2 states that on the page. Two fields are added
  to the template and both are defended in §4 — *What it changes*, which is a
  composite's central claim, and *Evidence*, which names per entry which of §3's
  four sources it rests on. ⚠️ **The eight `#slot-N` anchors in §3 are
  load-bearing**: twelve links from ten sections point at them, eight of those
  from entries. Closing a slot means editing the slot in place with a dated
  revision, not deleting it.

  ⚠️ **§3 is the one section that was split rather than moved when the arguments
  left for OM-005 (Rev. 5), and the reason is those anchors.** The *assessment* —
  that this document's evidence is thinner than either predecessor — is OM-005
  §12. The *instrument* — the four sources and the eight slots — stayed, because
  sending it away would make every entry leave its own paper to say what it rests
  on. So `#the-evidence` resolves **here**, not in OM-005, which is the single
  exception to the `/om-00N#x` → `/om-005#om-00N-x` rule. Do not "tidy" the
  remaining half into confidence, and do not finish the move.
- `om-004.html` — *Ambient Signals, and Revised Output*, at `/om-004`. Two sets in
  one document, on OM-003's precedent and separable the same way: seven patterns
  for a peripheral channel (§4–§10) and seven for output that is rewritten after
  it has been shown (§11–§17). One field is added to the template —
  ***How you would know this is unnecessary***, the condition that would make each
  pattern pointless — and its argument is in OM-005 rather than here.

  ⚠️ **Ambient Signals is not a further step outward and must not be drawn as
  one.** OM-001/2/3 grow in span, seconds to days; this set runs *alongside* all
  of them, because it is the peripheral alternative to a focal surface rather than
  a wider one. Revised Output goes the other way, beneath One Agent, inside a
  single exchange. §2 states the axis on the page and the two `lang` keys —
  `ambient` and `revised` — match their names, unlike the older four.

  ⚠️ **Five entries are published with their own reference instance failing them**,
  and the notes saying so are the point rather than an embarrassment to tidy: it is
  the added field doing its work. Do not soften them, and do not remove one because
  the instance was later fixed — date it instead.
- `contents.html` — **the second front door**, at `/contents`. **GENERATED** by
  the same run; the composition is `scripts/contents.mjs`. It is the page the
  index used to be — the wordmark and the list, nothing else — kept rather than
  lost when the chart took the front page. A reader who already knows they want
  OM-003 should not have to scroll past a poster to reach it.

  ⚠️ **It is deliberately the plain one.** The temptation is to put a small
  version of the sheet at the top, which would make it a worse copy of the page
  it exists to be an alternative to. What it gains from the chart existing is
  one row — the sheet, listed as a thing you can open and print — not a picture
  of it.

  ⚠️ **The switch offers three views — Chart, Contents, Catalogue — and one copy
  of it is hand-written.** `scripts/landing.mjs` holds the array and generates it
  for `/` and `/contents`; `patterns.html` is hand-authored, so its copy is typed.
  The harness asserts all three pages offer the same views in the same order and
  that each marks itself current — so the copy cannot drift without failing a
  check. It sits in the same place on all three and marks the page you are on
  rather than hiding it: a control that changes shape between pages is one people
  stop trusting.

  ⚠️ **`/contents` is the door that must be complete, and the builder enforces it.**
  The chart links the papers that own a section, through the ladder — and OM-005
  owns none, being the argument behind all of them. So the guard requires every
  `om-NNN.html` on disk to appear on `/contents`, not on both. Requiring both is
  what would force a list back onto the foot of the chart.

- `poster.html` — the taxonomy poster at `/poster`. One A1 sheet carrying the
  whole language: five sections as a column ordered by span, Ambient Signals as a
  band beside it, and every relation between them drawn as an arc. **Generated**,
  do not hand-edit. Run `node scripts/build_poster.mjs` from the repo root; the
  source is `site/patterns.html` and nothing else. **Served and unlinked**, on
  `/why`'s precedent: the index is the name plus the catalogue and the papers, and
  a poster is neither. Linking it is a decision about the front page, not about
  this file.

  ⚠️ **It is a third view of the graph, and it holds no prose from any entry.**
  Names, numbers and relations only. The captions on it describe the *drawing* —
  why the band is beside the column, what a chevron means — and must not grow into
  a summary of what the patterns say. That is the one-copy rule at the edge where
  it is easiest to fray, because a poster looks like it wants an explanation.

  ⚠️ **Every number on it is counted at build time, and one is asserted.** The
  builder throws rather than draws if the sheet's claim that every crossing points
  at an earlier paper stops being true. `node scripts/pattern_graph.mjs` prints the
  same audit without writing anything.

  ⚠️ **Six edge classes, not four**, and the reason is worth keeping: OM-004 added
  the first relations that run *up* the spine — eleven of them, all Revised Output
  citing One Agent — so "everything points down", true of the first four sections,
  is not true of the language. See the poster's own readout.
- `why.html` — *Not Just What It Says*, the argument behind the line, served at
  `/why`. **Served and unlinked**, deliberately: it is reachable by direct URL and
  is not on the index. It was briefly linked on 15 Aug 2026 and unlinked the same
  day — the essay is not current, and the index is not the place to work that out.
  **Hand-authored since 20 Aug 2026.** It was generated from a markdown source
  until then; the source and its generator are gone, and the page is now edited
  directly like every other publication here.
- `vercel.json` — static config (`cleanUrls`, so `/why` serves `why.html`).
- `favicon.svg`, `apple-touch-icon.png` — the same marks as `organon.art`.
  **Deliberately identical**: this is Organon's branch, not a separate outfit.

## What it says, and what it withholds

The page carried a line — *"Because we need to see what it's doing, not just what
it says."* — until 2026-08-12, when the front page was reset to the name alone.
The line is not gone as a position; it is simply no longer the front door. What
stands behind it is the page served at `/why`.

That document is a **declaration, not an argument**, and the distinction is
load-bearing for anyone editing it. It states the position and what follows from
it. It does not present a case and then rebut itself, so there is no objections
section and none should be added back. Limits still get stated (seeing is not yet
understanding; the tools are early; the capability is dual-use), but each one
sits where it bears on the claim, and dual-use is stated as a reason for openness
rather than a concession against it. Keep internal references out of it too: no
PRD section numbers, no repo paths, no "this product". It is published by an
organization, and it should read that way.

**The page withholds everything else, on purpose**, and has been narrowed twice
before being reopened once. It originally carried a paragraph describing
Organon, links to `/why` and `organon.art/mind`, and an invitation; all of
that came out on 2026-08-01, leaving the line. The line came out on 2026-08-12,
leaving the name alone. Later the same day the work itself went up, and the page
gained links to `/patterns` and `/om-001` — **two titles and nothing else**. Each
version is one `git show` away — the earliest in `organonart/organon-private`
(`git show <commit>:site-mind/index.html`), the tagline and name-only versions in
this repo's history.

`/why` is still **served but unlinked**, so anyone with a URL can read it. Its
footer carries `hello@organon.art`, which comes from the generator template
rather than from this page.

## What this page deliberately is not

No downloads, no pricing, no product framing, no cookie banner, no analytics,
no external requests. The offer is: watch the work, and if it interests you,
come to the bench.

## Deploy (Organon Vercel team)

Static, no build step, served from this repo.

**The deploy configuration is not written down here, on purpose.** It lives in
the Vercel dashboard and in DNS — outside this repo, changeable without touching
it, and therefore impossible for any file here to keep true. Every previous
version of this section asserted it anyway, and was wrong about the source repo,
the build trigger and the redirect direction in turn. Prose cannot track state
it does not own.

What belongs here is how to **read the state**, which cannot go stale:

```
# which repo actually builds this site — from any deployment's metadata
#   githubRepo:  must be organon-mind
# Vercel dashboard → the deployment → Source, or the API

# which host is canonical
curl -s -o /dev/null -w "%{redirect_url}\n" https://www.organonmind.org
#   empty  → www is canonical
#   an apex URL → apex is canonical (intended)

# what is actually served
curl -s -o /dev/null -w "%{http_code}\n" https://organonmind.org/patterns
```

The intent, which *is* ours to state: apex canonical, `www` redirecting to it,
Root Directory `site`, no build command. If a check above disagrees with that,
the configuration drifted — not this file.

⚠️ **If you ever invert this again, order matters.** Point the apex at the
Production environment *first*, then set `www` to redirect. Doing it the other
way leaves both hosts redirecting at each other and the site is unreachable
until you break the loop.

This matters more here than on a marketing site. Publications are numbered so
they can be **cited**, and a citation inherits whichever host answered when it
was written. The canonical host is settled before the first document goes up,
which is the point of doing it now.

⚠️ **Step 2 is the one that fails silently, and it already has once.** On the
old layout, leaving Root Directory unset did not error — Vercel found a
`package.json` at the repo root, auto-detected Vite, built the **legacy
cube-field web app**, and served it at this domain. Green build, `READY`
deployment, wrong site (2026-07-31, deployment `HsNEcRT2dkph…`, a 1.19 MB
three.js bundle).

That exact failure cannot recur here — this repo has no `package.json` and no
app to build. The weaker version still can: with Root Directory unset, Vercel
serves the **repo root**, and a visitor gets a directory of markdown instead of
the page. So check the value rather than assuming it. The Vercel bot's PR
comment carries `rootDirectory` in its base64 payload, which is the cheapest way
to read it back — it must say `site`.

⚠️ **Do not trust this file about where the site deploys from — check.** That
sentence is written from experience: this README has, at various times, said the
project built from `organonart/organon` and from `organonart/organon-private`,
and both were wrong at the moment someone read them. The site moved and the
prose did not.

The value that cannot be stale is in the deployment metadata. Any deployment
carries the repo that produced it:

```
githubRepo:   organon-mind     ← must say this
githubRepoId: <the organon-mind id>
```

Read it from the Vercel dashboard's deployment detail, or via the API. Before
2026-08-12 every deployment here read `organon-private` with Root Directory
`site-mind`, which is why pushes to this repo appeared to do nothing at all:
they were not connected to anything.

⚠️ **Vercel builds on push, and on nothing else.** Measured twice while sorting
this out: reconnecting the project to a different repo produced no deployment,
and changing Root Directory afterwards produced no deployment either. Both are
settings changes, and settings changes are not events. Until something lands on
`main`, a corrected configuration looks exactly like a broken one — the site
keeps serving whatever the last successful build produced, which may be from a
repo you have since disconnected. After changing any project setting, push
something (or redeploy from the dashboard) before believing the result.

## Before this gets traffic

**If you put an address back on this page, use `hello@organon.art` until
`organonmind.org` mail actually delivers.** A mail domain without **SPF, DKIM
and DMARC** fails *silently*: the sender sees a sent message, and it lands in a
spam folder or nowhere. `organon.art` already has those records;
`organonmind.org` does not yet. Publish the records, send yourself a test that
lands in an inbox, and only then switch.

This still applies to `why.html`'s footer, which carries `hello@organon.art`
today. That page is hand-authored now, so the swap there is an ordinary edit.

## Still open

- **`og:image`.** Omitted rather than reusing Organon's card, which is
  instrument-branded and would misdescribe the page in a link preview. A Mind
  card wants its own image.
## The index says nothing about the programme

**Decided 2026-08-12. Do not "fix" this.**

The front page is the name and a short index — the catalogue and the papers, each
given a title and nothing more. There is no sentence saying what Organon Mind is,
what it believes, who it is for, or what it would like from you. That is not an
oversight and not an unfinished state: **the work is the description.** A visitor
who wants to know what this is reads a publication.

The page was a genuine dead end until 2026-08-12 — the name, nothing to click —
and was reopened the day the catalogue went up. The reasoning is unchanged by
that: it was reopened because the programme became findable, not because a link
was missing. The earlier decision is left in the history rather than rewritten,
because "we later disagreed with ourselves" is worth more than a clean file.

It is recorded here because the obvious next edit looks helpful and is not: a
line under the wordmark explaining the research programme, a mission sentence, an
invitation to get in touch. Each is a small improvement to a page whose whole
effect depends on not making it. Publications are numbered and cited by direct
URL precisely so the front page does not have to sell them.
