#!/usr/bin/env bash
# The ledger's documents and schema name no company. Exit 1 on any hit.
set -u
cd "$(dirname "$0")/.."
# The vault status path keeps its old folder name until the vault is tidied (plan 5, Phase 6).
if grep -rniE "montblanc|ruhl it|capital ltd" README.md CLAUDE.md WORKLOG.md schema/ | grep -vE "icecream/projects/montblanc-ledger|status\(montblanc-ledger\)"; then
  echo "check-neutral: company name found (see above)" >&2
  exit 1
fi
echo "check-neutral: ok"
