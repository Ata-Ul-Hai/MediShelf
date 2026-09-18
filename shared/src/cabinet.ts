import type { CabinetItem, DrugEntry, PaoRuleMap } from "./types.ts";
import { DRUG_INDEX as IDX, PAO_RULES as RULES } from "./generated.ts";

export const DRUG_INDEX = IDX;
export const PAO_RULES = RULES;

export function drugById(id: string): DrugEntry | undefined {
  return DRUG_INDEX.find((d) => d.id === id);
}

/** CabinetItem from a confirmed index entry (the canonical construction path). */
export function itemFromDrug(drug: DrugEntry, overrides: Partial<CabinetItem> = {}): CabinetItem {
  return {
    id: crypto.randomUUID(),
    drugId: drug.id,
    brand: drug.brand,
    company: drug.company,
    form: drug.form,
    salts: drug.salts,
    classes: drug.classes,
    purpose_en: drug.purpose_en,
    purpose_hi: drug.purpose_hi,
    paoCategory: drug.paoCategory,
    addedOn: new Date().toISOString().slice(0, 10),
    ...overrides,
  };
}

/** Search the index by brand or salt text — the offline type/speak path. */
export function searchIndex(query: string, limit = 8): DrugEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const scored: Array<{ d: DrugEntry; s: number }> = [];
  for (const d of DRUG_INDEX) {
    const brand = d.brand.toLowerCase();
    let s = 0;
    if (brand.startsWith(q)) s = 1;
    else if (brand.includes(q)) s = 0.8;
    else if (d.salts.some((sal) => sal.name.includes(q))) s = 0.6;
    else if (d.company?.toLowerCase().includes(q)) s = 0.4;
    if (s > 0) scored.push({ d, s });
  }
  return scored.sort((a, b) => b.s - a.s).slice(0, limit).map((x) => x.d);
}
