# Project: Montblanc Ledger

## What It Does
Append-only, cryptographically signed, public ledger of all Bitcoin mining earnings distributed by Montblanc Capital. Immutable source of truth for daily earnings distributions.

## Stack
- Git repository + JSON files
- Ed25519 signature verification
- Public repo on GitHub: richloewenherz/montblanc-ledger

## Architecture Decisions
- Daily entries as JSON files: `ledger/YYYY/MM/DD.json`
- Each entry signed with Ed25519, includes Merkle root
- Chain-linked via previous_hash for tamper detection
- Pseudonymous wallet IDs (mbc_...) — no link to user identities
- Updated daily at 03:00 Berlin by montblanc-backend cron job
- Public key at `/pubkey.pem` for independent verification

## Key Files
- `ledger/YYYY/MM/DD.json` — Daily signed entries
- `balances/current.json` — Running balance per wallet
- `pubkey.pem` — Ed25519 public key
- `schema/entry.schema.json` — JSON schema validation

## Entry Format
Each entry: id (UUID), wallet_id, type (credit/debit), amount_btc, date, source, timestamp, signature

## Notes for Laptop
- Automated commits — don't manually edit ledger files
- Verify: use pubkey.pem to check signatures and rebuild Merkle trees
