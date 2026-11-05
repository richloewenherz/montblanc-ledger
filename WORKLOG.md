# WORKLOG — mining-ledger

Rolling journal so any session (or Control, or Richard) can pick up this project's
*current* state without a live session. Newest entry on top. Keep entries short and
factual; the "why" matters more than the "what" (git already has the what).

> Convention: prepend a dated entry whenever you finish a meaningful chunk of work,
> make a decision, hit a blocker, or change direction. One session = one or more entries.
> This file is durable context — it survives reboots and cold starts. Keep it honest.

---

## 2026-11-05 — Neutral documents, wider wallet-id pattern, rename pending

**Did:** README, CLAUDE.md and this file no longer name a company: the publisher is "the operator", identified on the verification page https://mining.ruhl.ae/en/verify. `schema/entry.schema.json` has a neutral title and accepts wallet ids with the prefix `mbc_` (history) or `w_` (new); the prefix has no meaning. Two scripts: `scripts/check-neutral.sh` (no company name in the documents or schema) and `scripts/validate-all.mjs` (every day file validates against the schema, plus one synthetic `w_` entry). Branch `rebrand/neutral-docs`; `ledger/**`, `balances/**` and `pubkey.pem` are untouched.
**Why:** the service moved to a new operator and the ledger must stay true under any name. Signed entries never change; only the wording around them.
**Open threads:** merge on switch day: `git checkout main && git merge --ff-only rebrand/neutral-docs && git push`, then `gh repo rename mining-ledger` (old raw URLs redirect; the backend's `git remote` and the VPS checkout need updating by hand). The vault status folder keeps its old name until the vault is tidied.
**Gotchas:** the day files are objects with `date`, `previous_hash`, `entries_count`, `merkle_root`, `entries[]`; the schema describes one element of `entries[]`. The README verification snippet applies to one element.

---

<!-- older entries below -->
