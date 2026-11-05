# CLAUDE.md — mining-ledger

Public mining ledger: Ed25519-signed JSON entries, appended by the operator's backend (`ruhl-mining-backend`).

Rules that never change:
- `ledger/**`, `balances/**` and `pubkey.pem` are written only by the backend's automated processes. Never hand-edit a day file; corrections re-chain from the first changed day via the backend's rebuild script, in a normal commit with neutral wording.
- The signing key never changes. The public key is published on the verification page https://mining.ruhl.ae/en/verify.
- Git history is the immutability guarantee: no force-push, no history rewrite.
- The documents and the schema in this repo name no company. `bash scripts/check-neutral.sh` must pass; `node scripts/validate-all.mjs` must report 0 errors.

## Status file

Status for this project lives in the Obsidian vault, not in this repo: `~/icecream/projects/montblanc-ledger/status.md` (a real file; `~/icecream` is the vault local home — a stable real path, no symlinks; never hardcode the iCloud path). This repo keeps no STATUS.md of its own. The vault folder keeps its old name until the vault is tidied after the switch.

On every commit or push: update that file (Now / Next / Recently done / Blockers; create it with the folder if missing), then commit it into the vault — `cd ~/icecream && git add projects/montblanc-ledger/status.md && git commit -m "status(montblanc-ledger): <summary>"`. If `~/icecream` is missing, ask.
