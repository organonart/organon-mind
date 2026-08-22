# Rulesets — what protects `main`, and why each rule is the one it is

Two JSON files here, both written against the **REST API's create-ruleset body**
(`POST /repos/{owner}/{repo}/rulesets`), which is also the shape GitHub's *Import a
ruleset* button accepts. The file **is** the request payload, so there is no
transcription step between the reasoning below and what GitHub enforces.

| File | Target | What it stops |
|---|---|---|
| `main.json` | the default branch (`~DEFAULT_BRANCH`) | direct pushes, force-pushes, deletion, merging a red build |
| `release-tags.json` | `refs/tags/v*` | a published tag being deleted or moved |

⚠️ **GitHub is the authority, not this directory.** A ruleset lives in repository
settings; these files are the *source* they were created from and the record of the
reasoning. Editing a file here changes nothing until someone re-applies it, and editing
the ruleset in the web UI silently makes the file here stale. If you change one, change
both in the same pull request — the same discipline `CONTRIBUTING.md` asks for around
generated pages, for the same reason: a second copy nobody maintains goes wrong quietly.

## As found — 2026-08-21

`main` was **unprotected**. Not weakly protected:
`GET /repos/organonart/organon-mind/rulesets` returned `[]`,
`GET /branches/main/protection` returned `404 Branch not protected`, and
`GET /rules/branches/main` returned `[]`. Anyone with write access — one account today —
could have force-pushed or deleted it, and so could any token that account had issued.

## Applying them

```bash
gh api --method POST repos/organonart/organon-mind/rulesets --input .github/rulesets/main.json
gh api --method POST repos/organonart/organon-mind/rulesets --input .github/rulesets/release-tags.json
```

The web path: **Settings → Rules → Rulesets → New ruleset → Import a ruleset**, then
pick the file. Both need repository **admin**.

Verify afterwards — an active ruleset whose condition never matched looks identical to a
working one from the settings page:

```bash
gh api repos/organonart/organon-mind/rulesets --jq '.[] | {id, name, target, enforcement}'
gh api repos/organonart/organon-mind/rules/branches/main --jq '[.[].type]'
```

That second call is the one that matters. It asks *"what rules does this branch have"*
rather than *"what rulesets exist"*. Expect it to return all five types: `deletion`,
`non_fast_forward`, `required_linear_history`, `pull_request`, `required_status_checks`.
⚠️ Note `branches`, **plural** — `rules/branch/main` is a plausible-looking 404, and a
404 reads as "nothing applied".

🚨 **On Windows, do not build the input file with PowerShell redirection.** `>` and
`Out-File` default to **UTF-16LE with a BOM** in PowerShell 5.1, `gh` forwards those
bytes verbatim, and GitHub answers `400 Problems parsing JSON` — an error that points at
the ruleset when the ruleset is fine. Applying from a checkout avoids this entirely,
because git wrote the file. If you fetch it instead, use `curl.exe -o`, which writes raw
bytes, and check the first four before you POST:

```powershell
curl.exe -sS "https://raw.githubusercontent.com/organonart/organon-mind/main/.github/rulesets/main.json" -o "$env:TEMP\main.json"
([System.IO.File]::ReadAllBytes("$env:TEMP\main.json")[0..3] | % { $_.ToString('X2') }) -join ' '
```

`7B` (`{`) is good; `FF FE` is the BOM and the POST will fail. `Format-Hex -Count` is
PowerShell 6+, which is why the check above is spelled the long way.

📌 Only the **first byte** is the signal. Run that check against a checked-out copy of
these files and you get `7B 0D 0A 20` rather than `7B 0A 20 20`, because `.gitattributes`
sets `text=auto` and Windows gets CRLF. That is not the fault condition — `CR` is
whitespace to every JSON parser, verified against these two files. Only a leading `FF FE`
matters.

📌 **What GitHub echoes back is wider than what it accepts.** The POST response carries
server-side representations — `required_reviewers`, `dismissal_restriction`, and the
ruleset's own `id`, `created_at` and `_links` — that are not inputs. These files are the
*intent*, not a mirror of the response. Never paste a response body back over one.

📌 **There is no emergency bypass, on purpose.** `bypass_actors` is empty, so the rules
apply to the admin too — which is the entire point when the admin is also the only
person who could bypass them. The valve is `enforcement`: flip a ruleset to `disabled`
in one click, do the thing, flip it back. That leaves a trail in the audit log; a
standing bypass does not.

## `main.json`, rule by rule

**`deletion` — the branch cannot be deleted.** Cheap and absolute. Without it, `main` is
one mis-aimed `git push --delete` from gone.

**`non_fast_forward` — no force-pushes.** The rule that actually protects history. This
repository is the source of a published site, and `CONTRIBUTING.md` opens by saying a
published fragment is owed forever. A force-push to `main` is how the commit behind a
published URL silently becomes a different commit.

**`required_linear_history` — merge commits are rejected.** A lock on a decision already
made rather than a change of workflow. `main` holds 9 merge commits out of 71, and all 9
fall between 2026-08-13 and 2026-08-15; the **28 commits since then carry zero**, because
the project moved to the squash button and stayed there. Turning this on forbids nothing
anyone has done in six days, and stops a stray "Create a merge commit" click from putting
a second parent into a history that is otherwise a clean list of published changes.
⚠️ It does **not** reject the merge commits already on `main` — rules are evaluated
against new pushes, not existing history. *Trigger to remove it:* a deliberate return to
merge-commit workflow, which would also want `allowed_merge_methods` widened below.

**`pull_request` — every change to `main` arrives as a pull request.** Its parameters are
where the judgement is:

- **`required_approving_review_count: 0`.** Deliberate, and the thing most likely to look
  like an oversight. `GET /collaborators` returns exactly one account with write access
  (`james-andrew-walsh`, admin), and GitHub will not let anyone approve their own pull
  request — so any non-zero count makes `main` unmergeable by the only person who can
  merge to it. Zero still buys the whole gate: no direct pushes, a diff and a checks page
  for every change, a revertable commit. **Raise this to 1 the day a second account has
  write access**, and not before.
- **`required_review_thread_resolution: true`.** Every review conversation must be
  resolved before merge, so a finding has to be answered or dismissed rather than
  scrolled past. It is also the rule most likely to irritate you on a busy pull request —
  if it does, turn *this* off rather than weakening the gate itself.
- **`dismiss_stale_reviews_on_push: true`.** Inert at zero required approvals, correct the
  moment that count goes up, and free either way.
- **`require_last_push_approval: false`.** At zero approvals it has nothing to dismiss; at
  one approval with a solo maintainer it would deadlock — your own last push would need
  someone else's blessing.
- **`require_code_owner_review: false`.** There is **no `CODEOWNERS` file** in this
  repository. Setting this `true` today would be inert; setting it `true` on the day a
  `CODEOWNERS` naming one person lands would be the self-approval deadlock wearing a
  different hat. It flips to `true` alongside the approval count when ownership is
  genuinely shared.
- **`require_extra_approval_for_unattributed_changes: true`.** GitHub's default, pinned
  here so it reads as a decision rather than a default nobody looked at. ⚠️ It looks like
  it should deadlock a solo maintainer at zero required approvals, and it does not —
  tested on `organonart/organon` on 2026-08-21, where a pull request merged cleanly with
  zero approvals under exactly this pairing. Set it `false` and `PATCH` the ruleset if it
  ever does bite; the symptom is a merge button asking for an approval when the required
  count is zero.
- **`allowed_merge_methods: ["squash", "rebase"]`.** Both produce linear history, so this
  list and `required_linear_history` cannot contradict each other — the merge button stops
  *offering* the method the ruleset would reject, rather than offering it and failing at
  the click. Repository settings still have all three methods enabled
  (`allow_merge_commit: true`); this narrows what the button will do without touching them.
  📌 The two rules overlap on purpose and are not redundant: this one governs the merge
  button, `required_linear_history` governs any push that reaches `main` by another route.

**`required_status_checks` — a red harness cannot be merged.** Exactly one context is
required, and which one took measuring:

| `context` | job in `verify.yml` | `integration_id` | required? |
|---|---|---|---|
| `anchors, links and the graph` | `harness` | `15368` | **yes** |
| `generated pages are up to date` | `generated` | `15368` | no — see below |
| `Vercel Preview Comments` | — (Vercel app) | `8329` | no — see below |

🚨 **This rule exists here and does not exist on `organonart/organon`, and the difference
is a fact about the workflows rather than a preference.** Over there the rule is omitted
because `ci.yml` is `paths-ignore`-filtered: a prose-only pull request never *starts* the
matrix, its checks never report, and a required check that never reports is not a slow
merge but a permanent one. **`verify.yml` here has no path filter at all** — `on:
pull_request:` with no `paths` or `paths-ignore` — so every pull request runs both jobs
and both always report.

The `context` strings are the jobs' `name:` values, not their YAML keys, and they were
read off real runs rather than transcribed from the workflow
(`GET /commits/{sha}/check-runs`). `integration_id: 15368` is the GitHub Actions app;
without it, any app reporting a check by that name would satisfy the rule.

🚨 **`generated pages are up to date` is NOT required, because it fails with the
calendar.** `scripts/build_poster.mjs:530` stamps the build date into the poster
colophon:

```js
ORGANON MIND &#183; ${new Date().toISOString().slice(0, 10)}
```

`toISOString()` is **UTC**, and the job rebuilds and then fails if the tree moved. So on
any pull request opened on a later UTC day than the last committed rebuild, two lines
move — the colophon in `site/poster.html` and the same SVG embedded in `site/index.html` —
and the job goes red **whatever the diff contains**. This was not reasoned about in the
abstract: the pull request that added this directory touches nothing but `.github/` and
went red on exactly those two lines, while `anchors, links and the graph` passed.

Requiring it would mean every pull request must carry a poster rebuild stamped with the
UTC day it merges on, and would turn a night's delay in review into a red build. That is
the same permanent-block shape that keeps the rule off `organon` entirely, reached
through a clock instead of a path filter.

> **The trigger.** Make that stamp deterministic and the check becomes requirable in the
> same change. Three ways, in ascending order of how much they change what the poster
> asserts: derive it from the last commit that touched the catalogue
> (`git log -1 --format=%cs -- <paths>`), read it from a field in the source the poster is
> built from, or drop the date line. All three are editorial decisions about what that
> date *means*, which is why this file names the problem rather than fixing it.
>
> ⚠️ Until then, **not required means you have to look.** A genuinely stale generated page
> — the failure the job was written to catch — reports identically to a date bump. Read
> the diff in the job output: two lines, both `ORGANON MIND · <date>`, is the clock;
> anything else is real.

📌 **The Vercel checks are not required either, and that is a smaller decision.**
`Vercel Preview Comments` (app `8329`) and the `Vercel` commit status report on every pull
request. A preview deployment failing is worth seeing and is not worth blocking a prose
correction over, and the context strings belong to a third party — Vercel can rename them,
and a required context that no longer reports is a block with no error message.

- **`strict_required_status_checks_policy: false`.** `true` would additionally require the
  branch to be up to date with `main` before merging, forcing an update-and-rewait cycle
  every time anything else lands first. For a repository merging roughly one pull request
  at a time that is pure friction. *Trigger:* two green branches merging into a red `main`
  — which, for a repository whose harness cross-checks the explorer against the papers, is
  a real possibility rather than a theoretical one. Turn it on the first time it happens.

🚨 **The failure mode to know about.** If `verify.yml` is renamed or deleted, or the
`harness` job's `name:` changes, the required check stops reporting and `main` becomes
**unmergeable** — including for the pull request making that change. The fix is to `PATCH`
the ruleset in the same breath, or flip `enforcement` to `disabled`, merge, and flip it
back. Changing that job's display name is now a ruleset change.

## What is deliberately NOT in `main.json`

An absence with no stated trigger is an oversight with better prose. Each of these has
one.

**`required_signatures` — omitted, and the closest to worth having.** Requiring signed
commits is the strongest single defence against a commit forged under your name, and on a
public repository that is a real threat rather than a theoretical one. It is off here only
because it is not free: every machine you commit from needs SSH or GPG signing configured
first (`git config --global gpg.format ssh`, plus the key uploaded to GitHub), and
anything pushed by a workflow or an agent session must come through the GitHub API to be
signed. *Trigger:* signing works on every machine you actually push from. Turn it on as
its own change — bundled with anything else, the first failure is indistinguishable from a
broken ruleset.

**`creation` and `update` — omitted, and they are not what they sound like.** Neither is a
branch-protection rule in the sense wanted here. On a default-branch ruleset, `creation`
only blocks the branch's own creation, which already happened.

**`required_deployments`, `commit_message_pattern`, `commit_author_email_pattern`,
`branch_name_pattern` — omitted.** No deployment environments exist, and the pattern rules
encode a house style into a merge gate. `CONTRIBUTING.md` states this project's style in
prose and expects it to be read; a regex that rejects a pull request at the merge button
teaches nothing and fails on the first legitimate exception. *Trigger:* none foreseen.

## `release-tags.json`

There are **zero tags and zero releases** today, which is exactly why this is worth landing
now: the rule has to exist *before* the first `v*` tag to have protected it. It blocks
deletion and force-updates of `refs/tags/v*` — the two ways a tag quietly starts pointing
at different content than the one people cited. Tag *creation* is untouched, so cutting a
release works normally, and nothing in the repository is affected until the day a `v*` tag
is pushed.

⚠️ **Honest about the evidence:** unlike `organonart/organon`, nothing here triggers on
`release: published`, so releases are plausible rather than planned. The rule costs nothing
and blocks nothing that exists. *Trigger to retire it:* a decision that this repository
will never carry version tags — in which case delete the ruleset, rather than leave a rule
guarding a namespace nobody uses.

## The rest of the checklist — what no file in this repository can carry

A ruleset protects the branch. It does not protect the repository. Everything below is a
settings toggle, read from the API on 2026-08-21, in rough order of what it buys.

### Now, in Settings

1. **Settings → Code security → Secret scanning — currently `disabled`.** Free on public
   repositories.
2. **Settings → Code security → Push protection — currently `disabled`.** This is the half
   that matters: it rejects a commit containing a recognised credential *at push time*,
   instead of telling you afterwards, by which point the secret is public and must be
   rotated regardless. ⚠️ This repository has **no Actions secrets today**, which lowers
   the stakes now and not later — the first one added is the one that gets pasted into a
   file.
3. **Settings → Code security → Private vulnerability reporting — currently `disabled`.**
   Enable it *before* writing a `SECURITY.md`, not after: while the setting is off, the
   `/security/advisories/new` URL such a file points at **404s**, so the documented
   private-disclosure path silently does not exist and the failure is invisible from the
   outside.
4. **Settings → General → Pull Requests → tick "Automatically delete head branches" —
   currently `delete_branch_on_merge: false`.** Not tidiness. Auto-delete is the mechanism
   that makes GitHub retarget a stacked pull request when its base merges; without it, a
   pull request based on another pull request's branch can land on a dead branch and never
   reach `main`.
5. **Settings → Actions → General → Fork pull request workflows → "Require approval for
   all external contributors."** ⚠️ Not readable through the API for a public repository —
   the endpoint answers `422 Access policy only applies to internal and private
   repositories` — so this one must be checked by eye. The public default gates only
   *first-time* contributors; after one merged pull request, later fork pull requests start
   runners automatically. The cost of getting it wrong is bounded here (no secrets exist,
   and the default workflow token is read-only), but it is still free runner time for
   anyone who wants it.
6. **Settings → Code security → Dependabot security updates — currently `disabled`.**
   Alerts are already **enabled**. The updates half opens pull requests for vulnerable
   dependencies only, which is low-noise here: the sole manifest is
   `scripts/verify/package.json`, one devDependency (`playwright`), not part of the site
   build.

### Already correct — checked, no action needed

Recorded so nobody spends an afternoon on them:

- **Default workflow permissions are already `read`**, and *"Allow GitHub Actions to create
  and approve pull requests"* is already **off** (`can_approve_pull_request_reviews: false`).
- **Organisation 2FA is already required** on `organonart`. A ruleset is exactly as strong
  as the authentication in front of the account that can turn it off.
- **Dependabot alerts are already enabled.**
- **`CONTRIBUTING.md`, `LICENSE`, `LICENSE-CONTENT`, the issue templates and the pull
  request template all exist.**

### The two documents that do not exist

Both are recommendations rather than omissions to fix in passing, because both are
editorial commitments in a repository where editorial commitments are the subject.

- **`SECURITY.md`** — where to report a vulnerability privately. Do point 3 above first; a
  `SECURITY.md` written today would ship a link that 404s.
- **`CODEOWNERS`** — worth having for review routing, and note the interaction above:
  adding one that names a single account is safe *only* while `require_code_owner_review`
  stays `false` in `main.json`.

### The workflow audit — what was looked for and not found

`.github/workflows/verify.yml` is the only workflow. It was audited against the failure
modes that matter on a public repository, and it has none of them:

- **No `issue_comment` and no `pull_request_target` trigger.** Those are the two that run
  from the default branch with access to repository secrets, including for pull requests
  from forks — so a workflow gating on comment *content* rather than
  `github.event.comment.author_association` lets any commenter spend those secrets. There
  is no such workflow here. `verify.yml` triggers on plain `pull_request`, which gets no
  secrets from a fork; it simply runs without them, which is the safe failure direction.
- **No third-party actions.** Both `uses:` lines are `actions/checkout@v4` and
  `actions/setup-node@v4` — GitHub's own `actions` organisation. These are mutable tags,
  and pinning to a commit SHA is still the stricter posture, but the supply-chain argument
  that makes pinning urgent is about *who else* controls the tag. Nobody outside GitHub
  does here, and there is nothing for a compromised action to take: no secrets exist and
  the default token is read-only. 📌 *Trigger:* the first `uses:` line pointing outside
  `actions/`, or the first Actions secret. At that point pin everything to SHAs with the
  version in a trailing comment (`uses: actions/checkout@<sha>  # v4.2.2`) and add a
  `github-actions` entry to `.github/dependabot.yml` so the pins do not rot. ⚠️ `@stable`
  and friends are *branches*, not tags — none appear here, and none should.
- **Repository-level `sha_pinning_required` is `false`.** GitHub can enforce SHA pinning
  repository-wide from Settings → Actions → General. Worth knowing it exists; turning it on
  before the first third-party action would be enforcing a rule against nothing.

🚨 **One thing the audit did find, and it is not a security finding: the `generated` job
goes red with the calendar.** The full reasoning is under `required_status_checks` above.
The short version is that `build_poster.mjs` stamps the UTC build date into the poster, so
the job fails on any pull request opened on a later UTC day than the last committed
rebuild, regardless of the diff. This has been survivable because nothing required the
check — it is the reason that one stays advisory, and the reason to fix the stamp is that
a check which cries wolf on the clock is a check people learn to merge past.
