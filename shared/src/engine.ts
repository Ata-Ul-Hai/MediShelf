import type {
  CabinetItem,
  CabinetReport,
  ExpiryFlag,
  PaoRuleMap,
  PrescribedItem,
  PrescriptionMatch,
  SaltLimit,
  SaltStack,
  Severity,
} from "./types.ts";

// ─── salt normalization ───────────────────────────────────────────────────────
// Brands write salts many ways: "Paracetamol IP", "paracetamol", "Acetaminophen",
// "Cetirizine Dihydrochloride". Normalize to a canonical key for grouping.

const SALT_ALIASES: Record<string, string> = {
  acetaminophen: "paracetamol",
  "paracetamol ip": "paracetamol",
  "n-acetyl para-aminophenol": "paracetamol",
  "cetirizine dihydrochloride": "cetirizine",
  "cetirizine hcl": "cetirizine",
  "levocetirizine dihydrochloride": "levocetirizine",
  "montelukast sodium": "montelukast",
  "amoxicillin trihydrate": "amoxicillin",
  "azithromycin dihydrate": "azithromycin",
  "pantoprazole sodium": "pantoprazole",
  "omeprazole ip": "omeprazole",
  "esomeprazole magnesium": "esomeprazole",
  ibuprofen: "ibuprofen",
  "ibuprofen ip": "ibuprofen",
  diclofenac: "diclofenac",
  "diclofenac sodium": "diclofenac",
  "diclofenac potassium": "diclofenac",
  aceclofenac: "aceclofenac",
  "metformin hcl": "metformin",
  "metformin hydrochloride": "metformin",
  "levothyroxine sodium": "levothyroxine",
  "amoxicillin and clavulanate": "amoxicillin",
};

const STOP_WORDS = new Set(["ip", "usp", "bp", "hcl", "hydrochloride", "sodium", "potassium", "dihydrochloride", "dihydrate", "trihydrate", "maleate", "tartrate", "mg", "mcg", "ml", "and"]);

export function normalizeSalt(raw: string): string {
  const key = raw.toLowerCase().trim().replace(/\s+/g, " ");
  if (SALT_ALIASES[key]) return SALT_ALIASES[key];
  // strip qualifier suffixes: "cetirizine dihydrochloride" -> base handled above,
  // fallback: first token-run that isn't a qualifier
  const tokens = key.split(" ").filter((t) => !STOP_WORDS.has(t));
  const base = (tokens.length ? tokens : [key]).join(" ");
  return SALT_ALIASES[base] ?? base;
}

/** Levenshtein for torn-label fuzzy matching ("...ramol 650" -> "paracetamol"). */
export function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

// ─── duplicate-salt detection across the whole cabinet ────────────────────────

const DEFAULT_LIMITS: SaltLimit[] = [
  { name: "paracetamol", maxDailyMg: 4000, duplicateIsDanger: true, note_en: "Adult label maximum 4 g/day from ALL products combined. Taking two paracetamol products together (e.g. Dolo + a cold medicine) is the most common cause of accidental overdose.", note_hi: "वयस्कों के लिए सभी दवाइयों मिलाकर अधिकतम 4 ग्राम/दिन। दो पैरासिटामोल दवाइयाँ साथ लेना (जैसे डोलो + सर्दी की दवा) दुर्घटनावश ओवरडोज़ का सबसे आम कारण है।" },
  { name: "ibuprofen", maxDailyMg: 1200, note_en: "OTC maximum 1200 mg/day without doctor.", note_hi: "डॉक्टर की सलाह के बिना अधिकतम 1200 मिग्रा/दिन।" },
  { name: "diclofenac", maxDailyMg: 150, note_en: "Typical maximum 150 mg/day.", note_hi: "सामान्य अधिकतम 150 मिग्रा/दिन।" },
  { name: "aceclofenac", maxDailyMg: 200, note_en: "Typical maximum 200 mg/day.", note_hi: "सामान्य अधिकतम 200 मिग्रा/दिन।" },
  { name: "caffeine", maxDailyMg: 400, note_en: "Healthy adult limit ~400 mg/day.", note_hi: "वयस्क सीमा लगभग 400 मिग्रा/दिन।" },
];

export function limitFor(salt: string, limits: SaltLimit[] = DEFAULT_LIMITS): SaltLimit | undefined {
  return limits.find((l) => normalizeSalt(l.name) === normalizeSalt(salt));
}

/**
 * Finds salts shared by 2+ cabinet items (the overdose danger) and computes the
 * combined dose if the user takes one dose of each — the "Dolo + Cheston Cold"
 * scenario.
 */
export function findSaltStacks(items: CabinetItem[], limits: SaltLimit[] = DEFAULT_LIMITS): SaltStack[] {
  const bySalt = new Map<string, CabinetItem[]>();
  for (const item of items) {
    for (const salt of item.salts ?? []) {
      const key = normalizeSalt(salt.name);
      if (!key) continue;
      const arr = bySalt.get(key) ?? [];
      arr.push(item);
      bySalt.set(key, arr);
    }
  }
  const stacks: SaltStack[] = [];
  for (const [salt, owners] of bySalt) {
    if (owners.length < 2) continue;
    const limit = limitFor(salt, limits);
    const combined = owners.reduce((sum, it) => {
      const s = it.salts.find((x) => normalizeSalt(x.name) === salt);
      return sum + (s?.strengthMg ?? 0);
    }, 0);
    let severity: Severity = "warning";
    // danger when following each product's own normal schedule would breach the
    // daily cap (combined × 3 typical doses), or the salt is dangerous to duplicate at all
    const projectedDaily = combined * 3;
    if (limit?.duplicateIsDanger || (limit?.maxDailyMg && projectedDaily >= limit.maxDailyMg)) {
      severity = "danger";
    }
    stacks.push({
      salt,
      brands: owners.map((o) => o.brand),
      combinedDoseMg: combined || undefined,
      maxDailyMg: limit?.maxDailyMg,
      severity,
    });
  }
  return stacks.sort((a, b) => (a.severity === b.severity ? (b.combinedDoseMg ?? 0) - (a.combinedDoseMg ?? 0) : a.severity === "danger" ? -1 : 1));
}

// ─── expiry & period-after-opening ────────────────────────────────────────────

export const DAY_MS = 86_400_000;

export function daysUntil(iso: string, now = Date.now()): number {
  return Math.ceil((new Date(iso + "T00:00:00").getTime() - now) / DAY_MS);
}

/** Printed expiry on the pack (assume end of stated month). */
export function printedExpiryFlag(item: CabinetItem, now = Date.now()): ExpiryFlag | null {
  if (!item.printedExpiry) return null;
  const d = daysUntil(item.printedExpiry, now);
  if (d <= 0) {
    return {
      itemId: item.id,
      kind: "printed",
      severity: "danger",
      date: item.printedExpiry,
      message_en: `${item.brand}: expired ${Math.abs(d)} day(s) ago. Do not use.`,
      message_hi: `${item.brand}: समाप्त हो चुकी है (${Math.abs(d)} दिन पहले)। उपयोग न करें।`,
    };
  }
  if (d <= 90) {
    return {
      itemId: item.id,
      kind: "printed",
      severity: "warning",
      date: item.printedExpiry,
      message_en: `${item.brand}: expires in ${d} day(s).`,
      message_hi: `${item.brand}: ${d} दिन में समाप्त होगी।`,
    };
  }
  return null;
}

/** After-opening countdown (PAO). Label always wins over the category default. */
export function paoFlag(item: CabinetItem, rules: PaoRuleMap, now = Date.now()): ExpiryFlag | null {
  if (!item.openedOn || !item.paoCategory || item.paoCategory === "none") return null;
  const rule = rules[item.paoCategory];
  if (!rule || rule.days == null) return null;
  const discardBy = new Date(new Date(item.openedOn).getTime() + rule.days * DAY_MS);
  const iso = discardBy.toISOString().slice(0, 10);
  const d = Math.ceil((discardBy.getTime() - now) / DAY_MS);
  if (d <= 0) {
    return {
      itemId: item.id,
      kind: "pao",
      severity: "danger",
      date: iso,
      message_en: `${item.brand}: discard — opened ${rule.days}+ days ago (rule: ${rule.note_en}).`,
      message_hi: `${item.brand}: फेंक दें — खोले हुए ${rule.days}+ दिन हो गए (${rule.note_hi})।`,
    };
  }
  if (d <= 7) {
    return {
      itemId: item.id,
      kind: "pao",
      severity: "warning",
      date: iso,
      message_en: `${item.brand}: discard in ${d} day(s) — ${rule.note_en}`,
      message_hi: `${item.brand}: ${d} दिन में फेंकें — ${rule.note_hi}`,
    };
  }
  return {
    itemId: item.id,
    kind: "pao",
    severity: "info",
    date: iso,
    message_en: `${item.brand}: discard by ${iso} — ${rule.note_en}`,
    message_hi: `${item.brand}: ${iso} तक उपयोग करें — ${rule.note_hi}`,
  };
}

export function cabinetReport(items: CabinetItem[], rules: PaoRuleMap, now = Date.now()): CabinetReport {
  const expiryFlags: ExpiryFlag[] = [];
  for (const item of items) {
    const p = printedExpiryFlag(item, now);
    if (p) expiryFlags.push(p);
    const o = paoFlag(item, rules, now);
    if (o) expiryFlags.push(o);
  }
  expiryFlags.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return { stacks: findSaltStacks(items), expiryFlags };
}

// ─── prescription ↔ cabinet matching ──────────────────────────────────────────

export function matchPrescription(
  prescribed: PrescribedItem[],
  cabinet: CabinetItem[]
): PrescriptionMatch[] {
  return prescribed.map((p) => {
    // shorthand inference: "Tab PCM 650 TDS" → paracetamol when the model
    // couldn't resolve the salt itself
    const inferred = p.salt ?? saltFromRawText(p.rawText);
    const withSalt: PrescribedItem = inferred ? { ...p, salt: inferred } : p;
    const target = inferred ? normalizeSalt(inferred) : null;
    const sameSalt = target
      ? cabinet.filter((c) => c.salts.some((s) => normalizeSalt(s.name) === target))
      : [];
    if (sameSalt.length) {
      const exact = sameSalt.filter((c) => {
        const s = c.salts.find((x) => normalizeSalt(x.name) === target);
        return p.strengthMg && s?.strengthMg ? s.strengthMg === p.strengthMg : true;
      });
      const matched = exact.length ? exact : sameSalt;
      const strengthExact = exact.length > 0;
      return {
        prescribed: withSalt,
        status: strengthExact ? "owned-same-strength" : "owned-different-strength",
        matchedItems: matched,
        message_en: strengthExact
          ? `You already have this: ${matched.map((m) => m.brand).join(", ")} (same salt${p.strengthMg ? `, ${p.strengthMg} mg` : ""}).`
          : `Same salt, different strength: ${matched.map((m) => m.brand).join(", ")}. Confirm the dose with a pharmacist before substituting.`,
        message_hi: strengthExact
          ? `आपके पास पहले से है: ${matched.map((m) => m.brand).join(", ")} (वही सॉल्ट${p.strengthMg ? `, ${p.strengthMg} मिग्रा` : ""})।`
          : `वही सॉल्ट, अलग मात्रा: ${matched.map((m) => m.brand).join(", ")}। बदलने से पहले केमिस्ट से पुष्टि करें।`,
      };
    }
    // no same salt — check same therapeutic class (e.g. two different NSAIDs)
    const cls = saltClassHint(target ?? p.rawText);
    const sameClass = cls ? cabinet.filter((c) => c.classes.includes(cls)) : [];
    if (sameClass.length) {
      return {
        prescribed: withSalt,
        status: "same-class-owned",
        matchedItems: sameClass,
        message_en: `Different salt but same family (${cls}) as your ${sameClass.map((m) => m.brand).join(", ")}. Ask a pharmacist before taking both.`,
        message_hi: `सॉल्ट अलग है पर श्रेणी वही (${cls}) — आपके ${sameClass.map((m) => m.brand).join(", ")} जैसी। दोनों लेने से पहले केमिस्ट से पूछें।`,
      };
    }
    return {
      prescribed: withSalt,
      status: "missing",
      matchedItems: [],
      message_en: `Not in your cabinet. You will need to buy it.`,
      message_hi: `आपकी कैबिनेट में नहीं है। खरीदनी होगी।`,
    };
  });
}

/** crude class hint for the "same family" warning (NSAIDs, antihistamines…) */
const CLASS_HINTS: Record<string, string> = {
  ibuprofen: "nsaid", diclofenac: "nsaid", aceclofenac: "nsaid", "mefenamic acid": "nsaid", aspirin: "nsaid", naproxen: "nsaid", nimesulide: "nsaid",
  ketorolac: "nsaid",
  cetirizine: "antihistamine", levocetirizine: "antihistamine", fexofenadine: "antihistamine", chlorpheniramine: "antihistamine", hydroxyzine: "antihistamine",
  "phenylephrine": "decongestant", pseudoephedrine: "decongestant",
  pantoprazole: "ppi", omeprazole: "ppi", esomeprazole: "ppi", rabeprazole: "ppi",
  amoxicillin: "penicillin-antibiotic",
  metformin: "antidiabetic",
};

function saltClassHint(salt: string): string | null {
  const n = normalizeSalt(salt);
  return CLASS_HINTS[n] ?? null;
}

// ─── fuzzy candidate matching (torn labels, partial OCR) ─────────────────────

export interface FuzzyTarget {
  id: string;
  brand: string;
  salts: string; // pre-joined normalized salt string for scoring
}

/**
 * Score an OCR fragment against the index. Works with:
 *  - full brand name, torn brand ("...cetamol"), salt text, or salt+strength.
 * Returns index ids sorted best-first.
 */
export function fuzzyRank(
  fragment: string,
  targets: FuzzyTarget[],
  limit = 3
): Array<{ id: string; score: number; why: "brand" | "salt" }> {
  const q = fragment.toLowerCase().replace(/[^a-z0-9\s.]/g, " ").replace(/\s+/g, " ").trim();
  if (!q) return [];
  const scored: Array<{ id: string; score: number; why: "brand" | "salt" }> = [];
  for (const t of targets) {
    const brand = t.brand.toLowerCase();
    let best = 0;
    let why: "brand" | "salt" = "brand";
    if (brand.includes(q) || q.includes(brand)) best = 1;
    else {
      const d = levenshtein(q, brand);
      const norm = 1 - d / Math.max(q.length, brand.length);
      if (norm > best) best = norm;
    }
    if (t.salts.includes(q)) {
      const s = 0.9;
      if (s > best) { best = s; why = "salt"; }
    } else {
      // partial salt match: any word of q of length ≥5 inside salts
      for (const w of q.split(" ")) {
        if (w.length >= 5 && t.salts.includes(w)) {
          const s = 0.7;
          if (s > best) { best = s; why = "salt"; }
        }
      }
    }
    if (best >= 0.45) scored.push({ id: t.id, score: Math.round(best * 100) / 100, why });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

// ─── search expansion: prescription shorthand + Hinglish + Hindi script ──────

/** How people actually write/say medicines in India → canonical search keyword. */
export const ABBREV: Record<string, string> = {
  pcm: "paracetamol", para: "paracetamol", acetaminophen: "paracetamol",
  azm: "azithromycin", azi: "azithromycin", azithro: "azithromycin",
  cetriz: "cetirizine", czine: "cetirizine",
  diclo: "diclofenac", aceclo: "aceclofenac",
  ibu: "ibuprofen",
  omez: "omeprazole",
  metform: "metformin",
};

/** Spoken Hinglish symptom words → English keyword to match in purposes. */
export const HINGLISH: Record<string, string> = {
  bukhar: "fever", "बुखार": "fever",
  dard: "pain", "दर्द": "pain",
  sardi: "cold", "सर्दी": "cold",
  jukam: "cold", "जुकाम": "cold",
  khansi: "cough", "खाँसी": "cough", "खांसी": "cough",
  dast: "diarrhoea", "दस्त": "diarrhoea",
  khujli: "itching", "खुजली": "itching",
  ulan: "inflammation", "सूजन": "inflammation",
  ulti: "vomiting", "उल्टी": "vomiting",
  mitli: "nausea", "मिचलाना": "nausea",
  kamzori: "fatigue", "कमज़ोरी": "fatigue",
};

/** Devanagari brand spellings → brand keywords (e.g. डोलो → dolo). */
export const HINDI_BRANDS: Array<[string, string]> = [
  ["डोलो", "dolo"],
  ["क्रोसिन", "crocin"],
  ["कैलपोल", "calpol"],
  ["कॉम्बिफ्लैम", "combiflam"],
  ["पैरासिटामोल", "paracetamol"],
  ["एज़िथ्रो", "azithral"],
  ["एज़िथ्रोमाइसिन", "azithromycin"],
  ["पैंटोप्रेज़ोल", "pantoprazole"],
  ["पैंटोप", "pantop"],
  ["डोमस्टाल", "domstal"],
  ["एनो", "eno"],
  ["डिजीन", "digene"],
  ["मेफ्टाल", "meftal"],
  ["सेट्रिज़िन", "cetirizine"],
];

/**
 * Expand a raw query into search variants: the original, prescription
 * shorthand expansions ("PCM 650" → paracetamol), Hinglish symptom words
 * ("bukhar" → fever), and Devanagari brand aliases (डोलो → dolo).
 */
export function expandQuery(raw: string): string[] {
  const q = raw.toLowerCase().trim();
  const variants = new Set<string>();
  if (!q) return [];
  variants.add(q);

  if (ABBREV[q]) variants.add(ABBREV[q]);

  const doseTokens = new Set(["mg", "mcg", "tab", "tablet", "cap", "capsule", "syp", "syrup", "tds", "bd", "od", "hs", "sos", "x", "1", "0"]);
  for (const tok of q.split(/[\s,/+.-]+/)) {
    if (!tok || doseTokens.has(tok)) continue;
    if (ABBREV[tok]) variants.add(ABBREV[tok]);
    if (HINGLISH[tok]) variants.add(HINGLISH[tok]);
  }

  for (const [hi, en] of HINDI_BRANDS) {
    if (raw.includes(hi)) variants.add(en);
  }
  return [...variants];
}

/**
 * Infer the generic salt from a prescription line like "Tab PCM 650 TDS x3d"
 * by scanning it for known abbreviations/keywords. Returns null if unknown.
 */
export function saltFromRawText(rawText: string): string | null {
  const lower = rawText.toLowerCase();
  const keys = [...Object.keys(ABBREV)].sort((a, b) => b.length - a.length);
  for (const k of keys) {
    if (lower.includes(k)) return ABBREV[k];
  }
  return null;
}
