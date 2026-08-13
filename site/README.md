# site/ — organonmind.org

The page for **organonmind.org**, Organon Mind's own address. Same letterhead
lineage as `organon.art`: one page, no external requests.

- `index.html` — **the name. That is the whole page.** No tagline, no
  description, no links, no invitation, no mail address, nothing to click at
  all. Set in the same tokens as the publications: white ground, system sans,
  and the wordmark in tracked monospace — the same treatment as a publication
  masthead, scaled up, so the identity is one element used consistently rather
  than a logo.
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

**The page withholds everything else, on purpose**, and has been narrowed twice.
It once carried a paragraph describing the instrument, links to `/why` and
`organon.art/mind`, and an invitation; all of that came out on 2026-08-01,
leaving the line. The line came out on 2026-08-12, leaving the name. Each
version is one `git show` away — the earliest in `organonart/organon-private`
(`git show <commit>:site-mind/index.html`), the tagline version in this repo's
history.

`/why` and `/om-001` are **served but unlinked**, so anyone with a URL can read
them. `/why`'s footer carries `hello@organon.art`, which comes from the
generator template rather than from this page.

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
## The index is a dead end on purpose

**Decided 2026-08-12. Do not "fix" this.**

The front page is the name and nothing else — no description, no links, no
address, nothing to click. `/why` and `/om-001` are both served and neither is
reachable from it. That is not an oversight and not an unfinished state; it is
the intended effect while the work is early. A visitor gets one word and no way
forward, and anyone who is meant to have a document has its URL.

It is recorded here because it looks exactly like a bug. The obvious, helpful,
wrong move is to add a publications list the first time someone notices that a
published document cannot be found from the homepage. Publications are numbered
and cited by direct URL precisely so that the front page does not have to carry
them.

Reopening it is a small edit and a deliberate one. It should be made because the
programme is ready to be found, not because a link was missing.
