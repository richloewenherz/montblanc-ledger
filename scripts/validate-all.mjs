#!/usr/bin/env node
// Validates every entry under ledger/**/*.json against schema/entry.schema.json
// (required keys, wallet_id pattern, amount pattern, enums), plus one synthetic w_ entry.
// No dependencies. Exit 1 on the first error.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schema = JSON.parse(readFileSync(join(root, "schema/entry.schema.json"), "utf8"));
const required = schema.required;
const props = schema.properties;
const patterns = Object.fromEntries(
  Object.entries(props).filter(([, p]) => p.pattern).map(([k, p]) => [k, new RegExp(p.pattern)]),
);
const enums = Object.fromEntries(
  Object.entries(props).filter(([, p]) => p.enum).map(([k, p]) => [k, new Set(p.enum)]),
);

function check(entry, where) {
  for (const k of required) if (!(k in entry)) throw new Error(`${where}: missing ${k}`);
  for (const k of Object.keys(entry)) if (!(k in props)) throw new Error(`${where}: unknown key ${k}`);
  for (const [k, re] of Object.entries(patterns)) if (k in entry && !re.test(entry[k])) throw new Error(`${where}: ${k} "${entry[k]}" fails ${re}`);
  for (const [k, set] of Object.entries(enums)) if (k in entry && !set.has(entry[k])) throw new Error(`${where}: ${k} "${entry[k]}" not in enum`);
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (name.endsWith(".json")) yield p;
  }
}

let files = 0;
let entries = 0;
for (const file of walk(join(root, "ledger"))) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  const list = Array.isArray(data) ? data : data.entries;
  if (!Array.isArray(list)) throw new Error(`${file}: no entries array`);
  files += 1;
  list.forEach((e, i) => { check(e, `${file}#${i}`); entries += 1; });
}

check({
  id: "00000000-0000-4000-8000-000000000000",
  wallet_id: "w_0123456789abcdef",
  type: "credit",
  amount_btc: "0.00012345",
  date: "2026-12-31",
  source: "daily_mining_earnings",
  ref: "daily_mining_earnings:2026-12-31",
  timestamp: "2026-12-31T06:00:00.000Z",
  signature: "c2lnbmF0dXJl",
}, "synthetic w_ entry");

console.log(`${files} files, ${entries} entries, 0 errors`);
