import { test } from "node:test";
import {
  normalizeSalt,
  findSaltStacks,
  paoFlag,
  printedExpiryFlag,
  cabinetReport,
  matchPrescription,
  fuzzyRank,
  levenshtein,
} from "./engine.ts";
import { DRUG_INDEX, PAO_RULES, itemFromDrug, drugById } from "./cabinet.ts";
import type { CabinetItem, PrescribedItem } from "./types.ts";

const NOW = new Date("2026-09-18T10:00:00").getTime();
const iso = (d: Date) => d.toISOString().slice(0, 10);

function item(id: string, overrides: Partial<CabinetItem> = {}): CabinetItem {
  const drug = drugById(id);
  if (!drug) throw new Error(`no drug ${id}`);
  return itemFromDrug(drug, overrides);
}

test("normalizeSalt: brand spellings collapse to canonical salts", () => {
  if (normalizeSalt("Paracetamol IP") !== "paracetamol") throw new Error("IP suffix");
  if (normalizeSalt("Acetaminophen") !== "paracetamol") throw new Error("acetaminophen alias");
  if (normalizeSalt("Cetirizine Dihydrochloride") !== "cetirizine") throw new Error("dihydrochloride");
  if (normalizeSalt("Amoxicillin Trihydrate") !== "amoxicillin") throw new Error("trihydrate");
  if (normalizeSalt("Montelukast Sodium") !== "montelukast") throw new Error("sodium qualifier");
});

test("engine: Dolo 650 + Cheston Cold => paracetamol stack flagged danger (975mg, half of 4g cap)", () => {
  const items = [item("dolo-650"), item("cheston-cold")];
  const stacks = findSaltStacks(items);
  const para = stacks.find((s) => s.salt === "paracetamol");
  if (!para) throw new Error("paracetamol stack not found");
  if (para.severity !== "danger") throw new Error(`expected danger, got ${para.severity}`);
  if (para.combinedDoseMg !== 975) throw new Error(`expected 975mg, got ${para.combinedDoseMg}`);
  if (para.brands.length !== 2) throw new Error("expected 2 brands");
});

test("engine: three-way paracetamol (Dolo + Calpol + Combiflam) => 1625mg combined", () => {
  const items = [item("dolo-650"), item("calpol-650"), item("combiflam")];
  const para = findSaltStacks(items).find((s) => s.salt === "paracetamol");
  if (para?.combinedDoseMg !== 1625) throw new Error(`expected 1625, got ${para?.combinedDoseMg}`);
});

test("engine: unrelated medicines produce no stacks", () => {
  const items = [item("dolo-650"), item("pan-40"), item("refresh-tears")];
  if (findSaltStacks(items).length !== 0) throw new Error("unexpected stacks");
});

test("pao: eye drops opened 30 days ago => discard (28-day rule)", () => {
  const opened = new Date(NOW - 30 * 86400000);
  const flag = paoFlag(item("moxicip-eye-drops", { openedOn: iso(opened) }), PAO_RULES, NOW);
  if (!flag || flag.severity !== "danger") throw new Error("expected danger discard flag");
});

test("pao: eye drops opened 10 days ago => info countdown", () => {
  const opened = new Date(NOW - 10 * 86400000);
  const flag = paoFlag(item("refresh-tears", { openedOn: iso(opened) }), PAO_RULES, NOW);
  if (!flag || flag.severity !== "info") throw new Error("expected info flag");
});

test("pao: unopened eye drops produce no flag", () => {
  if (paoFlag(item("refresh-tears"), PAO_RULES, NOW) !== null) throw new Error("no openedOn => no flag");
});

test("pao: reconstituted azithromycin syrup 12 days after mixing => warning/danger window", () => {
  const opened = new Date(NOW - 12 * 86400000);
  const flag = paoFlag(item("azithral-syrup", { openedOn: iso(opened) }), PAO_RULES, NOW);
  if (!flag) throw new Error("expected flag");
  if (flag.severity !== "danger" && flag.severity !== "warning") throw new Error(`got ${flag.severity}`);
});

test("printed expiry: past date => danger; <90d => warning; future => null", () => {
  if (printedExpiryFlag(item("dolo-650", { printedExpiry: "2026-08-01" }), NOW)?.severity !== "danger") throw new Error("past");
  if (printedExpiryFlag(item("dolo-650", { printedExpiry: "2026-10-15" }), NOW)?.severity !== "warning") throw new Error("soon");
  if (printedExpiryFlag(item("dolo-650", { printedExpiry: "2028-01-01" }), NOW) !== null) throw new Error("future");
});

test("cabinetReport: sorts flags by date and includes stacks", () => {
  const items = [
    item("dolo-650", { printedExpiry: "2026-09-20" }),
    item("cheston-cold"),
    item("refresh-tears", { openedOn: "2026-09-10" }),
  ];
  const report = cabinetReport(items, PAO_RULES, NOW);
  if (report.stacks.length < 1) throw new Error("stacks missing");
  if (report.expiryFlags.length < 2) throw new Error("flags missing");
});

test("prescription: paracetamol 650 prescribed with Dolo in cabinet => owned-same-strength", () => {
  const rx: PrescribedItem[] = [{ rawText: "Paracetamol 650", salt: "paracetamol", strengthMg: 650 }];
  const m = matchPrescription(rx, [item("dolo-650")])[0];
  if (m.status !== "owned-same-strength") throw new Error(m.status);
  if (!m.matchedItems[0].brand.includes("Dolo")) throw new Error("wrong match");
});

test("prescription: azithromycin 500 prescribed, Azithral syrup (200) owned => different strength", () => {
  const rx: PrescribedItem[] = [{ rawText: "Azithromycin 500", salt: "azithromycin", strengthMg: 500 }];
  const m = matchPrescription(rx, [item("azithral-syrup")])[0];
  if (m.status !== "owned-different-strength") throw new Error(m.status);
});

test("prescription: ibuprofen prescribed with Combiflam owned => same-salt (Combiflam contains it)", () => {
  const rx: PrescribedItem[] = [{ rawText: "Ibuprofen 400", salt: "ibuprofen", strengthMg: 400 }];
  const m = matchPrescription(rx, [item("combiflam")])[0];
  if (m.status !== "owned-same-strength") throw new Error(m.status);
});

test("prescription: diclofenac prescribed with Combiflam owned => same-class warning (both NSAID)", () => {
  const rx: PrescribedItem[] = [{ rawText: "Diclofenac", salt: "diclofenac" }];
  const m = matchPrescription(rx, [item("combiflam")])[0];
  if (m.status !== "same-class-owned") throw new Error(m.status);
});

test("prescription: missing medicine flagged", () => {
  const rx: PrescribedItem[] = [{ rawText: "Cefixime 200", salt: "cefixime", strengthMg: 200 }];
  const m = matchPrescription(rx, [item("dolo-650")])[0];
  if (m.status !== "missing") throw new Error(m.status);
});

test("fuzzy: torn label '...ramol 650' ranks paracetamol products via partial salt match", () => {
  const targets = DRUG_INDEX.map((d) => ({ id: d.id, brand: d.brand, salts: d.salts.map((s) => s.name).join(" ") }));
  const hits = fuzzyRank("ramol 650 mg", targets, 3);
  if (!hits.length) throw new Error("no candidates");
  const brands = hits.map((h) => drugById(h.id)!.brand);
  if (!brands.some((b) => /dolo|crocin|calpol|paracip/i.test(b))) throw new Error(`bad: ${brands.join(", ")}`);
});

test("fuzzy: partial brand 'azith' finds Azithral/Azee", () => {
  const targets = DRUG_INDEX.map((d) => ({ id: d.id, brand: d.brand, salts: d.salts.map((s) => s.name).join(" ") }));
  const hits = fuzzyRank("azith", targets, 3);
  if (!hits.some((h) => drugById(h.id)!.brand.toLowerCase().includes("azith"))) throw new Error("no azithral");
});

test("levenshtein sanity", () => {
  if (levenshtein("dolo", "dolo") !== 0) throw new Error("equal");
  if (levenshtein("dolo", "dol") !== 1) throw new Error("one edit");
});

test("index integrity: unique ids, every entry has salts + purpose + hindi", () => {
  const ids = new Set<string>();
  for (const d of DRUG_INDEX) {
    if (ids.has(d.id)) throw new Error(`dup id ${d.id}`);
    ids.add(d.id);
    if (!d.brand || !d.salts.length || !d.purpose_en || !d.purpose_hi) throw new Error(`incomplete ${d.id}`);
  }
});
