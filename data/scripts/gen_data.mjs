#!/usr/bin/env node
// Generates shared/src/generated.ts from data/*.json so both Node (type-strip)
// and Next.js/Turbopack import plain TS with no import-attribute friction.
// Run after editing the JSON: node data/scripts/gen_data.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const drugs = JSON.parse(readFileSync(join(root, "data", "drug-index.json"), "utf8"));
const pao = JSON.parse(readFileSync(join(root, "data", "pao-rules.json"), "utf8"));

const out = `// AUTO-GENERATED from data/*.json — edit those files, then run data/scripts/gen_data.mjs
import type { DrugEntry, PaoRuleMap } from "./types.ts";

export const DRUG_INDEX: DrugEntry[] = ${JSON.stringify(drugs.entries, null, 2)};

export const PAO_RULES: PaoRuleMap & Record<string, { days: number | null; note_en: string; note_hi: string; source: string }> = ${JSON.stringify(pao, null, 2)};
`;

const target = join(root, "shared", "src", "generated.ts");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, out);
console.log(`wrote ${target} (${drugs.entries.length} entries)`);
