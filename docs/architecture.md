# MediShelf — Architecture

## Request flows

### 1. Scan a strip (online)
```
Phone camera (≤1280px JPEG dataURL)
  → POST /scan (API Gateway HTTP API)
    → Lambda /scan
        1. Amazon Textract DetectDocumentText (cheap deterministic OCR)
        2. Amazon Bedrock Converse (Claude multimodal, temp=0)
           prompt returns JSON: brand / salts+strengths / form / expiry / visibleFragments
        3. Fuzzy rank all recovered fragments against the bundled drug index
           (shared engine: trigram + Levenshtein across brand AND salt text)
        4. Respond with top-3 candidates + confidence + evidence snippets
  → UI shows confirm cards (never auto-commits) → user confirms → IndexedDB
```
Design notes:
- Bedrock is prompted to read *partial* text and to extract the **composition line** (printed on every pocket of a strip) so a torn brand name still resolves.
- If Textract or Bedrock fails, the pipeline degrades: fragments → local fuzzy ranking still returns candidates.
- Image saved to S3 (audit), best-effort — failure never blocks the verdict.

### 2. Prescription match
```
POST /prescription → Lambda → Bedrock vision (handwriting-tolerant extraction)
  → medicines[{rawText, salt, strengthMg}]
  → UI confirm/edit step (user fixes any misread salt)
  → matchPrescription() runs LOCALLY (deterministic, offline-safe):
      same salt + same strength → "you already have it"
      same salt, other strength → pharmacist-confirm note
      same therapeutic class    → same-family caution (NSAID+NSAID etc.)
      nothing                   → "you'll need to buy it"
```

### 3. Safety engine (identical in browser and Lambda)
- **Duplicate salt stacking**: normalize every salt (alias table: Acetaminophen→paracetamol, IP/USP qualifiers stripped) → group across the whole cabinet → combined per-dose math → danger when the salt is flagged `duplicateIsDanger` (paracetamol) or 3×combined ≥ daily cap.
- **Printed expiry**: end-of-month assumption, danger ≤0d, warning ≤90d.
- **After-opening (PAO)**: category rules with citations (eye drops 28d, eardrops 28d, reconstituted antibiotics 10–14d, insulin 28d, oral liquids 90d, creams 90d). Label wins; per-item `openedOn` drives the countdown.
- 19 unit tests cover the Dolo+Cheston scenario, timers, matching, torn-label fuzzy.

### 4. Offline strategy
- IndexedDB is the source of truth (cabinet, opened dates, language).
- Bundled index (~140 curated entries → Kaggle-extendable) ships inside the JS; search + full engine run on-device.
- Service worker: documents network-first (stale-shell-proof), immutable /_next/static cache-first, **activate-time warm-up** precaches every chunk referenced by the root HTML.
- Scan/prescription/voice need network by design and say so honestly, steering to the offline path.
- Cloud sync (DynamoDB) is best-effort, never blocking.

### 5. Daily sweep (EventBridge → Lambda 05:30 IST)
Server recomputes `cabinetReport()` per household and stores `lastSweep/flagCount/stackCount/lastReport` — proving the shared engine runs identically server-side (and later this feeds notifications).

## Deployment (SAM)
`template.yaml` defines: HTTP API, DynamoDB (on-demand), S3 (blocked-public), 5 functions (arm64, nodejs20) with least-privilege inline policies, EventBridge ScheduleV2. Outputs: ApiUrl. Frontend deploys to Amplify Hosting with `NEXT_PUBLIC_API_URL` set at build time.

## Cost (demo scale)
All services stay inside free tiers / the $100 event credits: Textract pages ~$0.05/1k-equivalent volumes, Bedrock only per demo scan, Lambda/DynamoDB on-demand ≈ 0.
