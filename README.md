# Public Mining Ledger

**Cryptographically signed. Pseudonymous. Tamper-proof. Auditable.**

This repository contains the complete, verifiable record of all Bitcoin mining earnings credited by the operator of this ledger. The operator is identified on its verification page: https://mining.ruhl.ae/en/verify

## How It Works

Every day, mining rewards are credited to participants and recorded here as **signed ledger entries**. Each entry is:

- **Signed** with Ed25519 — proving it was issued by the holder of the key in `pubkey.pem` and hasn't been altered
- **Pseudonymous** — identified only by wallet IDs (`mbc_…` or `w_…`), never by name or email
- **Append-only** — historical entries are never modified or deleted
- **Publicly verifiable** — anyone can audit the math

## Structure

```
ledger/
└── YYYY/
    └── MM/
        └── DD.json       ← Signed entries for that day

balances/
└── current.json          ← Running balance per wallet

pubkey.pem                ← Public key for signature verification
schema/
└── entry.schema.json     ← JSON schema for entry format
```

Wallet IDs are opaque. Older IDs carry the prefix `mbc_`, newer ones `w_`; the prefix has no meaning.

## Verifying an Entry

Each entry contains a `signature` field — an Ed25519 signature over the entry data (excluding the signature itself). To verify:

1. Take the entry, remove the `signature` field
2. JSON-stringify the remaining fields with sorted keys
3. Verify the signature against `pubkey.pem`

```javascript
const crypto = require("crypto");
const fs = require("fs");

const pubKey = crypto.createPublicKey(fs.readFileSync("pubkey.pem"));
const { signature, ...data } = entry;
const payload = JSON.stringify(data, Object.keys(data).sort());
const valid = crypto.verify(null, Buffer.from(payload), pubKey, Buffer.from(signature, "base64"));

console.log(valid ? "✅ Valid" : "❌ Tampered");
```

## Privacy

Wallet IDs are **randomly generated** and have no mathematical relationship to user identities. The mapping between wallet IDs and real users exists only in the operator's private database — never in this repository.

This follows the same principle as Bitcoin: **transparent transactions, pseudonymous participants.**

## Integrity

- Entries are cryptographically signed at creation time
- The Git history provides an additional layer of immutability
- Daily Merkle roots can be computed from entries for compact integrity proofs

---

*Don't trust us. Verify.*

© the operator · https://mining.ruhl.ae/en/verify
