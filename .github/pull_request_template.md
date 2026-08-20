**What this changes, and why.**

---

- [ ] `node verify.mjs` passes in `scripts/verify` (required for any change under `site/`)
- [ ] If the catalogue changed: re-ran `node scripts/build_poster.mjs` and committed what it wrote
- [ ] No published fragment was removed — moved sections keep their id, renamed entries keep a `LEGACY` row
- [ ] No generated page was hand-edited (`index.html`, `contents.html`, `poster.html`, `why.html`)
- [ ] No entry's prose exists in two places

New patterns start as an issue rather than a pull request — see
[CONTRIBUTING.md](../CONTRIBUTING.md).
