# site/ — organonmind.org

The page for **organonmind.org**, Organon Mind's own address. Same letterhead
lineage as `organon.art`: one page, no external requests.

- `index.html` — **the name and the line. That is the whole page.** No
  description of the instrument, no links, no invitation, no mail address,
  nothing to click at all. It says one thing and stops.
- `why.html` — *Not Just What It Says*, the argument behind the line, served at
  `/why`. **Generated**, do not hand-edit. Run
  `python3 scripts/generate_mind_why.py` from the repo root; the source is
  `doc/not_just_what_it_says.md`. Regenerate whenever that document changes.
- `vercel.json` — static config (`cleanUrls`, so `/why` serves `why.html`).
- `favicon.svg`, `apple-touch-icon.png` — the same marks as `organon.art`.
  **Deliberately identical**: this is Organon's branch, not a separate outfit.

## What it says, and what it withholds

The line carries the page: **"Because we need to see what it's doing, not just
what it says."** What stands behind it is `doc/not_just_what_it_says.md`, served
at `/why`.

That document is a **declaration, not an argument**, and the distinction is
load-bearing for anyone editing it. It states the position and what follows from
it. It does not present a case and then rebut itself, so there is no objections
section and none should be added back. Limits still get stated (seeing is not yet
understanding; the tools are early; the capability is dual-use), but each one
sits where it bears on the claim, and dual-use is stated as a reason for openness
rather than a concession against it. Keep internal references out of it too: no
PRD section numbers, no repo paths, no "this product". It is published by an
organization, and it should read that way.

**The page withholds everything else, on purpose.** It carried a paragraph
describing the instrument, links to `/why` and `organon.art/mind`, and the
invitation. All of that came out (2026-08-01): the line is the whole page now.
A visitor gets one sentence and no way forward, which was the intended effect
while the instrument was unfinished.

That is a real trade, and it is now worth revisiting rather than inheriting.
The page was a deliberate **dead end** when Mind had nothing published. That is
no longer true: this repo exists to publish, and a visitor who arrives at a dead
end cannot find what was published. Restoring a way forward is a small edit.
The previous version is one `git show` away in `organonart/organon-private`
(`git show <commit>:site-mind/index.html`).

`/why` is **served but unlinked**, so anyone with the URL can read the
declaration. Its footer carries `hello@organon.art`, which comes from the
generator template rather than from this page.

## What this page deliberately is not

No downloads, no pricing, no product framing, no cookie banner, no analytics,
no external requests. The offer is: watch the work, and if it interests you,
come to the bench.

## Deploy (Organon Vercel team)

Static, no build step, served from this repo.

1. In the **Organon** Vercel team, point the `organon-mind` project at the
   `organonart/organon-mind` repo.
2. Set **Root Directory = `site`**, Framework Preset = **Other**, no build
   command, no install command.
3. Domains: **`organonmind.org`** (apex), with **`www.organonmind.org`**
   redirecting to it.

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
- **A way forward from the index.** See the trade above: the dead end was right
  when there was nothing to link to, and this repo changes that.
