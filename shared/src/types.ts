// ─── Core domain types ────────────────────────────────────────────────────────
// Shared between the Next.js PWA (runs offline) and Lambda handlers.

/** A single active ingredient, e.g. { name: "paracetamol", strengthMg: 650 } */
export interface Salt {
  /** normalized lowercase name, e.g. "paracetamol", "amoxicillin", "clavulanic acid" */
  name: string;
  /** strength per unit dose (tablet / 5ml / drop) in mg where meaningful */
  strengthMg?: number;
  /** display strength when not expressible in mg, e.g. "50 mcg", "0.5% w/v" */
  strengthText?: string;
}

export type Form = "tablet" | "capsule" | "syrup" | "suspension" | "drops" | "cream" | "ointment" | "gel" | "injection" | "inhaler" | "sachet" | "lozenge";

export type PaoCategory =
  | "eyedrops"
  | "eyeointment"
  | "eardrops"
  | "nasalspray"
  | "reconstituted-antibiotic"
  | "insulin"
  | "oral-liquid"
  | "cream-tube"
  | "none";

/** One entry in the drug index (a brand product). */
export interface DrugEntry {
  id: string;
  brand: string;
  company?: string;
  form: Form;
  salts: Salt[];
  /** therapeutic classes for cross-family warnings, e.g. ["analgesic","antipyretic"] */
  classes: string[];
  purpose_en: string;
  purpose_hi: string;
  paoCategory: PaoCategory;
  /** "R" = prescription-only in India, "OTC" = over the counter */
  rx?: "R" | "OTC";
}

/** Safety limits per salt (adult, label-typical). Used for stack warnings. */
export interface SaltLimit {
  name: string;
  maxDailyMg?: number;
  /** duplication across products is itself dangerous (e.g. paracetamol hepatotoxicity) */
  duplicateIsDanger?: boolean;
  note_en?: string;
  note_hi?: string;
}

/** Period-after-opening rule with citation. */
export interface PaoRule {
  category: PaoCategory;
  /** days after opening before discard; null = "check label, no fixed default" */
  days: number | null;
  /** override when label says otherwise — label always wins */
  labelWins: true;
  source: string;
  note_en: string;
  note_hi: string;
}

/** runtime rule map keyed by PaoCategory (as loaded from pao-rules.json) */
export type PaoRuleMap = Record<string, { days: number | null; note_en: string; note_hi: string; source: string }>;

// ─── Cabinet (user state) ─────────────────────────────────────────────────────

export interface CabinetItem {
  id: string;
  /** drug index id if matched, else null */
  drugId: string | null;
  brand: string;
  company?: string;
  form: Form;
  salts: Salt[];
  classes: string[];
  purpose_en: string;
  purpose_hi: string;
  paoCategory: PaoCategory;
  /** printed expiry on the pack, ISO date (YYYY-MM-DD) if known */
  printedExpiry?: string;
  /** ISO date when the user opened the pack */
  openedOn?: string;
  addedOn: string;
  count?: number;
  notes?: string;
}

// ─── Warnings engine output ───────────────────────────────────────────────────

export type Severity = "info" | "warning" | "danger";

export interface SaltStack {
  salt: string;
  brands: string[];
  /** total mg consumed if the user takes one dose of each product sharing this salt */
  combinedDoseMg?: number;
  maxDailyMg?: number;
  severity: Severity;
}

export interface ExpiryFlag {
  itemId: string;
  kind: "printed" | "pao";
  severity: Severity;
  /** ISO date when it becomes/turned unsafe */
  date: string;
  message_en: string;
  message_hi: string;
}

export interface CabinetReport {
  stacks: SaltStack[];
  expiryFlags: ExpiryFlag[];
}

// ─── Prescription matching ────────────────────────────────────────────────────

export interface PrescribedItem {
  rawText: string;
  salt: string | null;
  strengthMg?: number;
}

export type MatchStatus = "owned-same-strength" | "owned-different-strength" | "same-class-owned" | "missing";

export interface PrescriptionMatch {
  prescribed: PrescribedItem;
  status: MatchStatus;
  matchedItems: CabinetItem[];
  message_en: string;
  message_hi: string;
}

// ─── Scan pipeline ────────────────────────────────────────────────────────────

export interface ScanCandidate extends Omit<DrugEntry, "id"> {
  id: string | null;
  confidence: number;
  /** raw text fragments OCR/vision recovered — for the confirm UI */
  evidence: string[];
}

export interface ScanResult {
  ok: boolean;
  candidates: ScanCandidate[];
  engine: "textract" | "bedrock-vision" | "local-fuzzy";
  rawText?: string;
  error?: string;
}
