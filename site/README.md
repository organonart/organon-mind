# site/ — organonmind.org

The page for **organonmind.org**, Organon Mind's own address. Same letterhead
lineage as `organon.art`: one page, no external requests.

- `index.html` — **the name, and the index.** No tagline, no description of the
  programme, no invitation, no mail address. Set in the same tokens as the
  publications: white ground, system sans, and the wordmark in tracked monospace
  — the same treatment as a publication masthead, scaled up, so the identity is
  one element used consistently rather than a logo.
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
- `om-001.html` — the paper at `/om-001`. Since Rev. 5 it is the **presentation**
  of the One Agent section: §7 introduces it and §§8–21 are the fourteen entries
  in full, in the same template and markup OM-002 and OM-003 use. §§1–6 are still
  the argument — the gap, the literature, the cost, the evidence, the form and the
  map — and move to OM-005, which the Rev. 5 note says on the page. ⚠️ Its
  per-pattern anchors (`/om-001#approval-gate` and the other thirteen) are
  **load-bearing** and now land on the entry itself. So do `#example-honest-gauge`
  and `#example-streaming-turn`, the two Rev. 3 reproduced as worked examples,
  carried as `legacy-anchor` spans. Do not remove them to tidy the markup; a
  published fragment is as permanent as a published number.
- `om-002.html` — *Working with Many Agents*, at `/om-002`. Eight patterns for delegating
  to more than one agent at once, in three acts: the split, in flight, the join.
  Published in full in the paper, like all three sets since Aug 2026 — there is
  exactly one copy of each, and do not create a second by adding them to
  `/patterns`.
- `om-003.html` — *Arrangements, and Many Teams*, at `/om-003`. Two levels in one
  document: six named arrangements of OM-002's eight patterns (§7–§12), and the
  level above a squad — one person working four to six squads at once (§14–§17).
  ⚠️ **The two halves are written to be separable.** If the Many Teams half grows
  evidence of its own it becomes its own numbered document, and the split is a
  dated revision here saying so; §3 states that on the page. Two fields are added
  to the template and both are defended in §6 — *What it changes*, which is a
  composite's central claim, and *Evidence*, which names per entry which of §4's
  four sources it rests on. ⚠️ **The eight `#slot-N` anchors in §4 are
  load-bearing**: entries link to them, and closing a slot means editing the slot
  in place with a dated revision, not deleting it. This document has weaker
  evidence than either predecessor and says so in §4 — do not "tidy" that section
  into confidence.
- `why.html` — *Not Just What It Says*, the argument behind the line, served at
  `/why`. **Generated**, do not hand-edit. Run
  `python3 scripts/generate_mind_why.py` from the repo root; the source is
  `doc/not_just_what_it_says.md`. Regenerate whenever that document changes.
- `vercel.json` — static config (`cleanUrls`, so `/why` serves `why.html`).
- `favicon.svg`, `apple-touch-icon.png` — the same marks as `organon.art`.
  **Deliberately identical**: this is Organon's branch, not a separate outfit.

## What it says, and what it withholds

The page carried a line — *"Because we need to see what it's doing, not just what
it says."* — until 2026-08-12, when the front page was reset to the name alone.
The line is not gone as a position; it is simply no longer the front door. What
stands behind it is `doc/not_just_what_it_says.md`, served at `/why`.

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
before being reopened once. It originally carried a paragraph describing the
instrument, links to `/why` and `organon.art/mind`, and an invitation; all of
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
today and gets it from `scripts/generate_mind_why.py`, not from this page — so
the swap there is an edit to the generator followed by a regenerate.

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
