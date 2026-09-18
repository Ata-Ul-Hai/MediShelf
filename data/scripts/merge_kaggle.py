#!/usr/bin/env python3
"""Merge the Kaggle All-India Drug Bank CSV (253k medicines) into the curated index.

Usage:
    kaggle datasets download -d ankushpoddar/all-india-drug-bank-database -p data/kaggle --unzip
    python3 data/scripts/merge_kaggle.py

Merged entries are marked source=kaggle; curated entries always win on conflict.
Unknown-purpose entries get a generated purpose from their composition — the
Bedrock layer enriches these at scan time; here we only store structure.
"""
import csv
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
KAGGLE_DIR = ROOT / "data" / "kaggle"
OUT = ROOT / "data" / "drug-index-merged.json"

def find_csv() -> Path | None:
    if not KAGGLE_DIR.exists():
        return None
    for p in sorted(KAGGLE_DIR.glob("*.csv")):
        if "drug" in p.name.lower() or "medicine" in p.name.lower() or True:
            return p
    return None

SALT_RE = re.compile(r"([A-Za-z][A-Za-z0-9\-\s\(\)]*?)\s*(\d+(?:\.\d+)?)\s*(mg|mcg|gm|g|iu)\b", re.I)

def parse_composition(text: str):
    salts = []
    if not text:
        return salts
    for part in re.split(r"[+,;]", text):
        part = part.strip()
        if not part:
            continue
        m = SALT_RE.search(part)
        if m:
            name = m.group(1).strip().lower()
            qty = float(m.group(2))
            unit = m.group(3).lower()
            if unit == "gm" or unit == "g":
                qty *= 1000
            elif unit == "mcg":
                # keep mcg as strengthText; mg value tiny
                salts.append({"name": name, "strengthText": f"{m.group(2)} {unit}"})
                continue
            salts.append({"name": name, "strengthMg": qty})
        else:
            salts.append({"name": part.lower()})
    return salts

def slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")

def main():
    csv_path = find_csv()
    if not csv_path:
        print("Kaggle CSV not found in data/kaggle/. Download it first:")
        print("  kaggle datasets download -d ankushpoddar/all-india-drug-bank-database -p data/kaggle --unzip")
        sys.exit(1)

    curated = json.loads((ROOT / "data" / "drug-index.json").read_text())
    curated_brands = {e["brand"].lower() for e in curated["entries"]}

    with open(csv_path, newline="", encoding="utf-8", errors="replace") as f:
        reader = csv.DictReader(f)
        cols = reader.fieldnames or []
        # auto-detect column names (dataset variants)
        name_col = next((c for c in cols if c.lower() in ("name", "medicine_name", "brand")), cols[0])
        mfr_col = next((c for c in cols if "manufacturer" in c.lower() or "company" in c.lower()), None)
        comp1 = next((c for c in cols if "composition1" in c.lower() or "short_composition" in c.lower()), None)
        comp2 = next((c for c in cols if "composition2" in c.lower()), None)
        disc_col = next((c for c in cols if "discontinued" in c.lower()), None)

        merged, seen = list(curated["entries"]), set(curated_brands)
        for row in reader:
            if disc_col and row.get(disc_col, "").strip().lower() in ("1", "true", "yes"):
                continue
            brand = (row.get(name_col) or "").strip()
            if not brand or brand.lower() in seen:
                continue
            comp = " + ".join(x for x in [row.get(comp1, ""), row.get(comp2, "")] if x and x.strip())
            salts = parse_composition(comp)
            if not salts:
                continue
            seen.add(brand.lower())
            merged.append({
                "id": f"k-{slug(brand)}",
                "brand": brand,
                "company": (row.get(mfr_col) or "").strip() or None,
                "form": "tablet",
                "salts": salts,
                "classes": [],
                "purpose_en": f"Contains {', '.join(s['name'] for s in salts[:3])}",
                "purpose_hi": "",
                "paoCategory": "none",
                "rx": "R",
                "source": "kaggle",
            })

    out = {"version": curated.get("version", 1), "entries": merged}
    OUT.write_text(json.dumps(out, ensure_ascii=False))
    print(f"merged index: {len(merged)} entries -> {OUT}")

if __name__ == "__main__":
    main()
