// AUTO-GENERATED from data/*.json — edit those files, then run data/scripts/gen_data.mjs
import type { DrugEntry, PaoRuleMap } from "./types.ts";

export const DRUG_INDEX: DrugEntry[] = [
  {
    "id": "dolo-650",
    "brand": "Dolo 650",
    "company": "Micro Labs",
    "form": "tablet",
    "salts": [
      {
        "name": "paracetamol",
        "strengthMg": 650
      }
    ],
    "classes": [
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Fever and mild-to-moderate pain relief",
    "purpose_hi": "बुखार और हल्का-मध्यम दर्द",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "dolo-500",
    "brand": "Dolo 500",
    "company": "Micro Labs",
    "form": "tablet",
    "salts": [
      {
        "name": "paracetamol",
        "strengthMg": 500
      }
    ],
    "classes": [
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Fever and mild pain relief",
    "purpose_hi": "बुखार और हल्का दर्द",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "crocin-advance-500",
    "brand": "Crocin Advance 500",
    "company": "GSK",
    "form": "tablet",
    "salts": [
      {
        "name": "paracetamol",
        "strengthMg": 500
      }
    ],
    "classes": [
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Fever and pain relief (fast-release)",
    "purpose_hi": "बुखार और दर्द (तेज़ असर)",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "calpol-650",
    "brand": "Calpol 650",
    "company": "GSK",
    "form": "tablet",
    "salts": [
      {
        "name": "paracetamol",
        "strengthMg": 650
      }
    ],
    "classes": [
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Fever and pain relief",
    "purpose_hi": "बुखार और दर्द",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "paracip-650",
    "brand": "Paracip 650",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "paracetamol",
        "strengthMg": 650
      }
    ],
    "classes": [
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Fever and pain relief",
    "purpose_hi": "बुखार और दर्द",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "pacimol-650",
    "brand": "Pacimol 650",
    "company": "Ipca",
    "form": "tablet",
    "salts": [
      {
        "name": "paracetamol",
        "strengthMg": 650
      }
    ],
    "classes": [
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Fever and pain relief",
    "purpose_hi": "बुखार और दर्द",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "combiflam",
    "brand": "Combiflam",
    "company": "Sanofi",
    "form": "tablet",
    "salts": [
      {
        "name": "ibuprofen",
        "strengthMg": 400
      },
      {
        "name": "paracetamol",
        "strengthMg": 325
      }
    ],
    "classes": [
      "nsaid",
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Strong pain relief with anti-inflammatory action (sprains, cramps, dental pain)",
    "purpose_hi": "तेज़ दर्द और सूजन (मोच, ऐंठन, दाँत का दर्द)",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "brufen-400",
    "brand": "Brufen 400",
    "company": "Abbott",
    "form": "tablet",
    "salts": [
      {
        "name": "ibuprofen",
        "strengthMg": 400
      }
    ],
    "classes": [
      "nsaid",
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Pain, fever, inflammation",
    "purpose_hi": "दर्द, बुखार, सूजन",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "zerodol-sp",
    "brand": "Zerodol SP",
    "company": "Ipca",
    "form": "tablet",
    "salts": [
      {
        "name": "aceclofenac",
        "strengthMg": 100
      },
      {
        "name": "paracetamol",
        "strengthMg": 325
      },
      {
        "name": "serratiopeptidase",
        "strengthMg": 15
      }
    ],
    "classes": [
      "nsaid",
      "analgesic"
    ],
    "purpose_en": "Pain and swelling (post-injury, post-surgery)",
    "purpose_hi": "दर्द और सूजन (चोट/ऑपरेशन के बाद)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "zerodol-p",
    "brand": "Zerodol P",
    "company": "Ipca",
    "form": "tablet",
    "salts": [
      {
        "name": "aceclofenac",
        "strengthMg": 100
      },
      {
        "name": "paracetamol",
        "strengthMg": 325
      }
    ],
    "classes": [
      "nsaid",
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Pain and fever",
    "purpose_hi": "दर्द और बुखार",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "voveran-sr-100",
    "brand": "Voveran SR 100",
    "company": "Novartis",
    "form": "tablet",
    "salts": [
      {
        "name": "diclofenac",
        "strengthMg": 100
      }
    ],
    "classes": [
      "nsaid",
      "analgesic"
    ],
    "purpose_en": "Arthritis, back pain, severe inflammation",
    "purpose_hi": "जोड़ों का दर्द, कमर दर्द",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "naprosyn-500",
    "brand": "Naprosyn 500",
    "company": "RPG",
    "form": "tablet",
    "salts": [
      {
        "name": "naproxen",
        "strengthMg": 500
      }
    ],
    "classes": [
      "nsaid",
      "analgesic"
    ],
    "purpose_en": "Pain and inflammation (arthritis, gout)",
    "purpose_hi": "दर्द और सूजन (गठिया)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "meftal-spas",
    "brand": "Meftal Spas",
    "company": "Blue Cross",
    "form": "tablet",
    "salts": [
      {
        "name": "mefenamic acid",
        "strengthMg": 250
      },
      {
        "name": "dicyclomine",
        "strengthMg": 10
      }
    ],
    "classes": [
      "nsaid",
      "antispasmodic"
    ],
    "purpose_en": "Menstrual cramps and abdominal spasms",
    "purpose_hi": "माहवारी की ऐंठन और पेट की मरोड़",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "meftal-forte",
    "brand": "Meftal Forte",
    "company": "Blue Cross",
    "form": "tablet",
    "salts": [
      {
        "name": "mefenamic acid",
        "strengthMg": 500
      },
      {
        "name": "paracetamol",
        "strengthMg": 325
      }
    ],
    "classes": [
      "nsaid",
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Pain and fever",
    "purpose_hi": "दर्द और बुखार",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "cyclopam",
    "brand": "Cyclopam",
    "company": "Indoco",
    "form": "tablet",
    "salts": [
      {
        "name": "dicyclomine",
        "strengthMg": 20
      },
      {
        "name": "paracetamol",
        "strengthMg": 325
      }
    ],
    "classes": [
      "antispasmodic",
      "analgesic"
    ],
    "purpose_en": "Stomach cramps and colic pain",
    "purpose_hi": "पेट की ऐंठन और मरोड़",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "drotin-ds",
    "brand": "Drotin DS",
    "company": "Walter Bushnell",
    "form": "tablet",
    "salts": [
      {
        "name": "drotaverine",
        "strengthMg": 80
      }
    ],
    "classes": [
      "antispasmodic"
    ],
    "purpose_en": "Smooth-muscle spasms (abdominal, menstrual)",
    "purpose_hi": "पेट/माहवारी की ऐंठन",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "buscopan",
    "brand": "Buscopan",
    "company": "Boehringer",
    "form": "tablet",
    "salts": [
      {
        "name": "hyoscine butylbromide",
        "strengthMg": 10
      }
    ],
    "classes": [
      "antispasmodic"
    ],
    "purpose_en": "Stomach cramps and IBS pain",
    "purpose_hi": "पेट की मरोड़",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "cheston-cold",
    "brand": "Cheston Cold",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "paracetamol",
        "strengthMg": 325
      },
      {
        "name": "phenylephrine",
        "strengthMg": 5
      },
      {
        "name": "cetirizine",
        "strengthMg": 5
      }
    ],
    "classes": [
      "analgesic",
      "antipyretic",
      "antihistamine",
      "decongestant"
    ],
    "purpose_en": "Cold and flu: blocked nose, sneezing, fever",
    "purpose_hi": "सर्दी-जुकाम: बंद नाक, छींक, बुखार",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "sinarest",
    "brand": "Sinarest",
    "company": "Centaur",
    "form": "tablet",
    "salts": [
      {
        "name": "paracetamol",
        "strengthMg": 325
      },
      {
        "name": "phenylephrine",
        "strengthMg": 5
      },
      {
        "name": "chlorpheniramine",
        "strengthMg": 2
      }
    ],
    "classes": [
      "analgesic",
      "antipyretic",
      "antihistamine",
      "decongestant"
    ],
    "purpose_en": "Cold, sinus congestion, fever",
    "purpose_hi": "सर्दी, साइनस, बुखार",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "wikoryl",
    "brand": "Wikoryl",
    "company": "Alembic",
    "form": "tablet",
    "salts": [
      {
        "name": "paracetamol",
        "strengthMg": 325
      },
      {
        "name": "phenylephrine",
        "strengthMg": 5
      },
      {
        "name": "chlorpheniramine",
        "strengthMg": 2
      }
    ],
    "classes": [
      "analgesic",
      "antipyretic",
      "antihistamine",
      "decongestant"
    ],
    "purpose_en": "Cold and flu symptoms",
    "purpose_hi": "सर्दी-जुकाम के लक्षण",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "okacet",
    "brand": "Okacet",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "cetirizine",
        "strengthMg": 10
      }
    ],
    "classes": [
      "antihistamine"
    ],
    "purpose_en": "Allergy, itching, sneezing, hives",
    "purpose_hi": "एलर्जी, खुजली, छींक",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "cetzine",
    "brand": "Cetzine",
    "company": "GSK",
    "form": "tablet",
    "salts": [
      {
        "name": "cetirizine",
        "strengthMg": 10
      }
    ],
    "classes": [
      "antihistamine"
    ],
    "purpose_en": "Allergy and cold symptoms",
    "purpose_hi": "एलर्जी और जुकाम",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "alerid",
    "brand": "Alerid",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "cetirizine",
        "strengthMg": 10
      }
    ],
    "classes": [
      "antihistamine"
    ],
    "purpose_en": "Allergy relief",
    "purpose_hi": "एलर्जी राहत",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "levocet-5",
    "brand": "Levocet 5",
    "company": "Wockhardt",
    "form": "tablet",
    "salts": [
      {
        "name": "levocetirizine",
        "strengthMg": 5
      }
    ],
    "classes": [
      "antihistamine"
    ],
    "purpose_en": "Allergy (less drowsy than cetirizine)",
    "purpose_hi": "एलर्जी (सेटिरिज़िन से कम नींद)",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "teczine-5",
    "brand": "Teczine 5",
    "company": "Ajanta",
    "form": "tablet",
    "salts": [
      {
        "name": "levocetirizine",
        "strengthMg": 5
      }
    ],
    "classes": [
      "antihistamine"
    ],
    "purpose_en": "Allergy relief",
    "purpose_hi": "एलर्जी राहत",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "allegra-120",
    "brand": "Allegra 120",
    "company": "Sanofi",
    "form": "tablet",
    "salts": [
      {
        "name": "fexofenadine",
        "strengthMg": 120
      }
    ],
    "classes": [
      "antihistamine"
    ],
    "purpose_en": "Allergy (non-drowsy)",
    "purpose_hi": "एलर्जी (बिना नींद)",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "avil-25",
    "brand": "Avil 25",
    "company": "Sanofi",
    "form": "tablet",
    "salts": [
      {
        "name": "pheniramine",
        "strengthMg": 25
      }
    ],
    "classes": [
      "antihistamine"
    ],
    "purpose_en": "Allergy (older, drowsy antihistamine)",
    "purpose_hi": "एलर्जी (पुरानी, नींद लाने वाली)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "montair-lc",
    "brand": "Montair LC",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "montelukast",
        "strengthMg": 10
      },
      {
        "name": "levocetirizine",
        "strengthMg": 5
      }
    ],
    "classes": [
      "antihistamine",
      "leukotriene-antagonist"
    ],
    "purpose_en": "Allergic rhinitis, allergic cough, mild asthma prevention",
    "purpose_hi": "एलर्जिक नाक भरना, एलर्जिक खाँसी",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "montek-lc",
    "brand": "Montek LC",
    "company": "Sun",
    "form": "tablet",
    "salts": [
      {
        "name": "montelukast",
        "strengthMg": 10
      },
      {
        "name": "levocetirizine",
        "strengthMg": 5
      }
    ],
    "classes": [
      "antihistamine",
      "leukotriene-antagonist"
    ],
    "purpose_en": "Allergic rhinitis and cough",
    "purpose_hi": "एलर्जिक नाक/खाँसी",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "solvin",
    "brand": "Solvin",
    "company": "Ipca",
    "form": "tablet",
    "salts": [
      {
        "name": "chlorpheniramine",
        "strengthMg": 2
      },
      {
        "name": "phenylephrine",
        "strengthMg": 10
      }
    ],
    "classes": [
      "antihistamine",
      "decongestant"
    ],
    "purpose_en": "Blocked nose and cold",
    "purpose_hi": "बंद नाक, जुकाम",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "azithral-500",
    "brand": "Azithral 500",
    "company": "Alembic",
    "form": "tablet",
    "salts": [
      {
        "name": "azithromycin",
        "strengthMg": 500
      }
    ],
    "classes": [
      "macrolide-antibiotic"
    ],
    "purpose_en": "Bacterial infections (throat, chest, sinus, skin)",
    "purpose_hi": "जीवाणु संक्रमण (गला, छाती, त्वचा)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "azee-500",
    "brand": "Azee 500",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "azithromycin",
        "strengthMg": 500
      }
    ],
    "classes": [
      "macrolide-antibiotic"
    ],
    "purpose_en": "Bacterial infections",
    "purpose_hi": "जीवाणु संक्रमण",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "azithral-syrup",
    "brand": "Azithral syrup 200",
    "company": "Alembic",
    "form": "suspension",
    "salts": [
      {
        "name": "azithromycin",
        "strengthMg": 200
      }
    ],
    "classes": [
      "macrolide-antibiotic"
    ],
    "purpose_en": "Bacterial infections (children's syrup — discard 10 days after mixing)",
    "purpose_hi": "जीवाणु संक्रमण (बच्चों की सिरप — मिलाने के 10 दिन बाद फेंकें)",
    "paoCategory": "reconstituted-antibiotic",
    "rx": "R"
  },
  {
    "id": "augmentin-625",
    "brand": "Augmentin 625 Duo",
    "company": "GSK",
    "form": "tablet",
    "salts": [
      {
        "name": "amoxicillin",
        "strengthMg": 500
      },
      {
        "name": "clavulanic acid",
        "strengthMg": 125
      }
    ],
    "classes": [
      "penicillin-antibiotic"
    ],
    "purpose_en": "Bacterial infections (chest, urine, dental, skin)",
    "purpose_hi": "जीवाणु संक्रमण (छाती, पेशाब, दाँत)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "clavam-625",
    "brand": "Clavam 625",
    "company": "Alkem",
    "form": "tablet",
    "salts": [
      {
        "name": "amoxicillin",
        "strengthMg": 500
      },
      {
        "name": "clavulanic acid",
        "strengthMg": 125
      }
    ],
    "classes": [
      "penicillin-antibiotic"
    ],
    "purpose_en": "Bacterial infections",
    "purpose_hi": "जीवाणु संक्रमण",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "augmentin-dry-syrup",
    "brand": "Augmentin DDS syrup",
    "company": "GSK",
    "form": "suspension",
    "salts": [
      {
        "name": "amoxicillin",
        "strengthMg": 200
      },
      {
        "name": "clavulanic acid",
        "strengthMg": 28.5
      }
    ],
    "classes": [
      "penicillin-antibiotic"
    ],
    "purpose_en": "Children's antibiotic syrup — discard 14 days after mixing, refrigerate",
    "purpose_hi": "बच्चों की एंटीबायोटिक सिरप — मिलाने के 14 दिन बाद फेंकें, फ्रिज में रखें",
    "paoCategory": "reconstituted-antibiotic",
    "rx": "R"
  },
  {
    "id": "mox-250",
    "brand": "Mox 250",
    "company": "Ranbaxy/Sun",
    "form": "capsule",
    "salts": [
      {
        "name": "amoxicillin",
        "strengthMg": 250
      }
    ],
    "classes": [
      "penicillin-antibiotic"
    ],
    "purpose_en": "Bacterial infections",
    "purpose_hi": "जीवाणु संक्रमण",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "taxim-o-200",
    "brand": "Taxim-O 200",
    "company": "Alkem",
    "form": "tablet",
    "salts": [
      {
        "name": "cefixime",
        "strengthMg": 200
      }
    ],
    "classes": [
      "cephalosporin-antibiotic"
    ],
    "purpose_en": "Bacterial infections (typhoid, urine, throat)",
    "purpose_hi": "जीवाणु संक्रमण (टाइफाइड, गला)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "cifran-500",
    "brand": "Cifran 500",
    "company": "Sun",
    "form": "tablet",
    "salts": [
      {
        "name": "ciprofloxacin",
        "strengthMg": 500
      }
    ],
    "classes": [
      "fluoroquinolone-antibiotic"
    ],
    "purpose_en": "Bacterial infections (urine, gut)",
    "purpose_hi": "जीवाणु संक्रमण (पेशाब, आँत)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "oflox-200",
    "brand": "Oflox 200",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "ofloxacin",
        "strengthMg": 200
      }
    ],
    "classes": [
      "fluoroquinolone-antibiotic"
    ],
    "purpose_en": "Bacterial infections",
    "purpose_hi": "जीवाणु संक्रमण",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "norflox-tz",
    "brand": "Norflox TZ",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "norfloxacin",
        "strengthMg": 400
      },
      {
        "name": "tinidazole",
        "strengthMg": 600
      }
    ],
    "classes": [
      "fluoroquinolone-antibiotic",
      "antiprotozoal"
    ],
    "purpose_en": "Diarrhoea and dysentery",
    "purpose_hi": "दस्त और पेचिश",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "metrogyl-400",
    "brand": "Metrogyl 400",
    "company": "JB Chemicals",
    "form": "tablet",
    "salts": [
      {
        "name": "metronidazole",
        "strengthMg": 400
      }
    ],
    "classes": [
      "antiprotozoal",
      "antibiotic"
    ],
    "purpose_en": "Amoebiasis, dental and gut infections",
    "purpose_hi": "अमीबियासिस, दाँत/पेट का संक्रमण",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "doxt-sl",
    "brand": "Doxt SL",
    "company": "Ajanta",
    "form": "capsule",
    "salts": [
      {
        "name": "doxycycline",
        "strengthMg": 100
      }
    ],
    "classes": [
      "tetracycline-antibiotic"
    ],
    "purpose_en": "Acne, chest and tick-borne infections",
    "purpose_hi": "मुँहासे, छाती का संक्रमण",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "martifur-100",
    "brand": "Martifur 100",
    "company": "Sun",
    "form": "tablet",
    "salts": [
      {
        "name": "nitrofurantoin",
        "strengthMg": 100
      }
    ],
    "classes": [
      "urinary-antibiotic"
    ],
    "purpose_en": "Urinary tract infection",
    "purpose_hi": "पेशाब का संक्रमण (UTI)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "wysolone-10",
    "brand": "Wysolone 10",
    "company": "Wyeth",
    "form": "tablet",
    "salts": [
      {
        "name": "prednisolone",
        "strengthMg": 10
      }
    ],
    "classes": [
      "corticosteroid"
    ],
    "purpose_en": "Steroid for inflammation, allergy, asthma (never stop suddenly)",
    "purpose_hi": "स्टेरॉयड — सूजन/एलर्जी/अस्थमा (अचानक बंद न करें)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "omez-20",
    "brand": "Omez 20",
    "company": "Dr. Reddy's",
    "form": "capsule",
    "salts": [
      {
        "name": "omeprazole",
        "strengthMg": 20
      }
    ],
    "classes": [
      "ppi"
    ],
    "purpose_en": "Acidity, reflux, ulcers (take before breakfast)",
    "purpose_hi": "एसिडिटी, रिफ्लक्स, अल्सर (नाश्ते से पहले)",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "pan-40",
    "brand": "Pan 40",
    "company": "Alkem",
    "form": "tablet",
    "salts": [
      {
        "name": "pantoprazole",
        "strengthMg": 40
      }
    ],
    "classes": [
      "ppi"
    ],
    "purpose_en": "Acidity, reflux, ulcers",
    "purpose_hi": "एसिडिटी, रिफ्लक्स, अल्सर",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "pantop-40",
    "brand": "Pantop 40",
    "company": "Aristo",
    "form": "tablet",
    "salts": [
      {
        "name": "pantoprazole",
        "strengthMg": 40
      }
    ],
    "classes": [
      "ppi"
    ],
    "purpose_en": "Acidity and reflux",
    "purpose_hi": "एसिडिटी और रिफ्लक्स",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "pan-d",
    "brand": "Pan-D",
    "company": "Alkem",
    "form": "capsule",
    "salts": [
      {
        "name": "pantoprazole",
        "strengthMg": 40
      },
      {
        "name": "domperidone",
        "strengthMg": 30
      }
    ],
    "classes": [
      "ppi",
      "prokinetic"
    ],
    "purpose_en": "Acidity with bloating/nausea",
    "purpose_hi": "एसिडिटी के साथ गैस/जी मिचलाना",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "gelusil-mps",
    "brand": "Gelusil MPS",
    "company": "Pfizer",
    "form": "tablet",
    "salts": [
      {
        "name": "magaldrate",
        "strengthText": "540 mg"
      },
      {
        "name": "simethicone",
        "strengthText": "50 mg"
      }
    ],
    "classes": [
      "antacid"
    ],
    "purpose_en": "Instant relief from heartburn and gas",
    "purpose_hi": "एसिडिटी और गैस की तुरंत राहत",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "digene",
    "brand": "Digene",
    "company": "Abbott",
    "form": "tablet",
    "salts": [
      {
        "name": "magaldrate"
      },
      {
        "name": "simethicone"
      }
    ],
    "classes": [
      "antacid"
    ],
    "purpose_en": "Heartburn and gas relief",
    "purpose_hi": "एसिडिटी और गैस",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "digene-gel",
    "brand": "Digene gel",
    "company": "Abbott",
    "form": "suspension",
    "salts": [
      {
        "name": "magaldrate"
      },
      {
        "name": "simethicone"
      }
    ],
    "classes": [
      "antacid"
    ],
    "purpose_en": "Liquid antacid for heartburn",
    "purpose_hi": "एसिडिटी के लिए तरल एंटासिड",
    "paoCategory": "oral-liquid",
    "rx": "OTC"
  },
  {
    "id": "eno",
    "brand": "Eno fruit salt",
    "company": "GSK",
    "form": "sachet",
    "salts": [
      {
        "name": "sodium bicarbonate"
      },
      {
        "name": "citric acid"
      },
      {
        "name": "sodium carbonate"
      }
    ],
    "classes": [
      "antacid"
    ],
    "purpose_en": "Effervescent fast heartburn relief",
    "purpose_hi": "एसिडिटी की तुरंत राहत",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "cremaffin-plus",
    "brand": "Cremaffin Plus",
    "company": "Abbott",
    "form": "syrup",
    "salts": [
      {
        "name": "milk of magnesia"
      },
      {
        "name": "liquid paraffin"
      },
      {
        "name": "sodium picosulfate"
      }
    ],
    "classes": [
      "laxative"
    ],
    "purpose_en": "Constipation relief",
    "purpose_hi": "कब्ज",
    "paoCategory": "oral-liquid",
    "rx": "OTC"
  },
  {
    "id": "duphalac",
    "brand": "Duphalac",
    "company": "Abbott",
    "form": "syrup",
    "salts": [
      {
        "name": "lactulose",
        "strengthText": "10 g/15 ml"
      }
    ],
    "classes": [
      "laxative"
    ],
    "purpose_en": "Constipation (gentle, works in 1-2 days)",
    "purpose_hi": "कब्ज (हल्की, 1-2 दिन में असर)",
    "paoCategory": "oral-liquid",
    "rx": "OTC"
  },
  {
    "id": "eldoper",
    "brand": "Eldoper",
    "company": "Micro Labs",
    "form": "capsule",
    "salts": [
      {
        "name": "loperamide",
        "strengthMg": 2
      }
    ],
    "classes": [
      "antidiarrheal"
    ],
    "purpose_en": "Stops acute diarrhoea (use with ORS; not for bloody stools/fever)",
    "purpose_hi": "तेज़ दस्त रोकने (ORS के साथ; खून/बुखार में नहीं)",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "ondem-4",
    "brand": "Ondem 4",
    "company": "Alkem",
    "form": "tablet",
    "salts": [
      {
        "name": "ondansetron",
        "strengthMg": 4
      }
    ],
    "classes": [
      "antiemetic"
    ],
    "purpose_en": "Nausea and vomiting",
    "purpose_hi": "जी मिचलाना, उल्टी",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "emeset-4",
    "brand": "Emeset 4",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "ondansetron",
        "strengthMg": 4
      }
    ],
    "classes": [
      "antiemetic"
    ],
    "purpose_en": "Nausea and vomiting",
    "purpose_hi": "मतली, उल्टी",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "domstal-10",
    "brand": "Domstal 10",
    "company": "Torrent",
    "form": "tablet",
    "salts": [
      {
        "name": "domperidone",
        "strengthMg": 10
      }
    ],
    "classes": [
      "prokinetic",
      "antiemetic"
    ],
    "purpose_en": "Nausea, bloating, indigestion",
    "purpose_hi": "मतली, गैस, अपच",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "perinorm",
    "brand": "Perinorm",
    "company": "Ipca",
    "form": "tablet",
    "salts": [
      {
        "name": "metoclopramide",
        "strengthMg": 10
      }
    ],
    "classes": [
      "antiemetic"
    ],
    "purpose_en": "Vomiting and migraine-associated nausea",
    "purpose_hi": "उल्टी और माइग्रेन जनित मतली",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "unienzyme",
    "brand": "Unienzyme",
    "company": "Du Pharma",
    "form": "tablet",
    "salts": [
      {
        "name": "diastase"
      },
      {
        "name": "pepsin"
      },
      {
        "name": "activated charcoal"
      }
    ],
    "classes": [
      "digestive-enzyme"
    ],
    "purpose_en": "Bloating and indigestion after heavy meals",
    "purpose_hi": "भारी खाने के बाद गैस/अपच",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "ors-electral",
    "brand": "Electral ORS",
    "company": "FDC",
    "form": "sachet",
    "salts": [
      {
        "name": "oral rehydration salts"
      }
    ],
    "classes": [
      "rehydration"
    ],
    "purpose_en": "Dehydration from diarrhoea/vomiting/heat (dissolve 1 sachet in 1 L water)",
    "purpose_hi": "दस्त/उल्टी/गर्मी से पानी की कमी (1 सैशे को 1 लीटर पानी में)",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "ors-who",
    "brand": "ORS (WHO formula)",
    "form": "sachet",
    "salts": [
      {
        "name": "oral rehydration salts"
      }
    ],
    "classes": [
      "rehydration"
    ],
    "purpose_en": "Dehydration — dissolve as directed",
    "purpose_hi": "पानी की कमी — निर्देशानुसार घोलें",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "ascoril-ls",
    "brand": "Ascoril LS syrup",
    "company": "Glenmark",
    "form": "syrup",
    "salts": [
      {
        "name": "levosalbutamol",
        "strengthText": "1 mg/5 ml"
      },
      {
        "name": "ambroxol",
        "strengthText": "30 mg/5 ml"
      },
      {
        "name": "guaifenesin",
        "strengthText": "50 mg/5 ml"
      }
    ],
    "classes": [
      "expectorant",
      "bronchodilator",
      "cough"
    ],
    "purpose_en": "Wet cough with chest congestion",
    "purpose_hi": "बलगम वाली खाँसी",
    "paoCategory": "oral-liquid",
    "rx": "R"
  },
  {
    "id": "benadryl-dr",
    "brand": "Benadryl DR",
    "company": "J&J/Kenvue",
    "form": "syrup",
    "salts": [
      {
        "name": "dextromethorphan",
        "strengthText": "15 mg/5 ml"
      }
    ],
    "classes": [
      "antitussive",
      "cough"
    ],
    "purpose_en": "Dry cough suppression",
    "purpose_hi": "सूखी खाँसी",
    "paoCategory": "oral-liquid",
    "rx": "OTC"
  },
  {
    "id": "alex-syrup",
    "brand": "Alex syrup",
    "company": "Glenmark",
    "form": "syrup",
    "salts": [
      {
        "name": "chlorpheniramine",
        "strengthText": "2 mg/5 ml"
      },
      {
        "name": "phenylephrine",
        "strengthText": "5 mg/5 ml"
      },
      {
        "name": "dextromethorphan",
        "strengthText": "10 mg/5 ml"
      }
    ],
    "classes": [
      "antihistamine",
      "decongestant",
      "antitussive",
      "cough"
    ],
    "purpose_en": "Dry cough with blocked nose",
    "purpose_hi": "सूखी खाँसी, बंद नाक",
    "paoCategory": "oral-liquid",
    "rx": "R"
  },
  {
    "id": "asthalin-hfa",
    "brand": "Asthalin HFA inhaler",
    "company": "Cipla",
    "form": "inhaler",
    "salts": [
      {
        "name": "salbutamol",
        "strengthText": "100 mcg/puff"
      }
    ],
    "classes": [
      "bronchodilator",
      "asthma-rescue"
    ],
    "purpose_en": "Rescue inhaler for asthma/breathlessness attacks",
    "purpose_hi": "अस्थमा/साँस की तकलीफ में तुरंत राहत",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "foracort-200",
    "brand": "Foracort 200 inhaler",
    "company": "Cipla",
    "form": "inhaler",
    "salts": [
      {
        "name": "budesonide",
        "strengthText": "200 mcg/puff"
      },
      {
        "name": "formoterol",
        "strengthText": "6 mcg/puff"
      }
    ],
    "classes": [
      "ics-laba",
      "asthma-controller"
    ],
    "purpose_en": "Daily asthma/COPD controller inhaler",
    "purpose_hi": "रोज़ इस्तेमाल होने वाला अस्थमा इनहेलर",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "deriphyllin-retard-150",
    "brand": "Deriphyllin Retard 150",
    "company": "Zydus",
    "form": "tablet",
    "salts": [
      {
        "name": "etofylline",
        "strengthMg": 77
      },
      {
        "name": "theophylline",
        "strengthMg": 23
      }
    ],
    "classes": [
      "bronchodilator"
    ],
    "purpose_en": "Chronic asthma and breathlessness maintenance",
    "purpose_hi": "पुराना अस्थमा, साँस की तकलीफ",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "telma-40",
    "brand": "Telma 40",
    "company": "Glenmark",
    "form": "tablet",
    "salts": [
      {
        "name": "telmisartan",
        "strengthMg": 40
      }
    ],
    "classes": [
      "arb",
      "antihypertensive"
    ],
    "purpose_en": "High blood pressure",
    "purpose_hi": "उच्च रक्तचाप",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "losar-50",
    "brand": "Losar 50",
    "company": "Unichem",
    "form": "tablet",
    "salts": [
      {
        "name": "losartan",
        "strengthMg": 50
      }
    ],
    "classes": [
      "arb",
      "antihypertensive"
    ],
    "purpose_en": "High blood pressure",
    "purpose_hi": "उच्च रक्तचाप",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "amlong-5",
    "brand": "Amlong 5",
    "company": "Micro Labs",
    "form": "tablet",
    "salts": [
      {
        "name": "amlodipine",
        "strengthMg": 5
      }
    ],
    "classes": [
      "ccb",
      "antihypertensive"
    ],
    "purpose_en": "High blood pressure (may cause ankle swelling)",
    "purpose_hi": "उच्च रक्तचाप (टखनों में सूजन हो सकती है)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "metolar-xr-25",
    "brand": "Metolar XR 25",
    "company": "Cipla",
    "form": "capsule",
    "salts": [
      {
        "name": "metoprolol",
        "strengthMg": 25
      }
    ],
    "classes": [
      "beta-blocker",
      "antihypertensive"
    ],
    "purpose_en": "BP, angina, palpitations (never stop suddenly)",
    "purpose_hi": "BP, छाती दर्द, धड़कन (अचानक बंद न करें)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "concor-5",
    "brand": "Concor 5",
    "company": "Merck",
    "form": "tablet",
    "salts": [
      {
        "name": "bisoprolol",
        "strengthMg": 5
      }
    ],
    "classes": [
      "beta-blocker",
      "antihypertensive"
    ],
    "purpose_en": "BP and heart-rate control",
    "purpose_hi": "BP और धड़कन नियंत्रण",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "ciplar-10",
    "brand": "Ciplar 10",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "propranolol",
        "strengthMg": 10
      }
    ],
    "classes": [
      "beta-blocker"
    ],
    "purpose_en": "Migraine prevention, tremor, anxiety, palpitations",
    "purpose_hi": "माइग्रेन रोकथाम, कंपन, घबराहट",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "ecosprin-75",
    "brand": "Ecosprin 75",
    "company": "USV",
    "form": "tablet",
    "salts": [
      {
        "name": "aspirin",
        "strengthMg": 75
      }
    ],
    "classes": [
      "antiplatelet",
      "nsaid"
    ],
    "purpose_en": "Blood thinner to prevent heart attack/stroke",
    "purpose_hi": "खून पतला करने (दिल्ले/स्ट्रोक से बचाव)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "clopilet-a-75",
    "brand": "Clopilet A 75",
    "company": "Sun",
    "form": "tablet",
    "salts": [
      {
        "name": "clopidogrel",
        "strengthMg": 75
      },
      {
        "name": "aspirin",
        "strengthMg": 75
      }
    ],
    "classes": [
      "antiplatelet"
    ],
    "purpose_en": "Dual blood thinner after stent/heart attack",
    "purpose_hi": "स्टेंट/हार्ट अटैक के बाद दोहरी खून-पतली दवा",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "atorva-10",
    "brand": "Atorva 10",
    "company": "Zydus",
    "form": "tablet",
    "salts": [
      {
        "name": "atorvastatin",
        "strengthMg": 10
      }
    ],
    "classes": [
      "statin"
    ],
    "purpose_en": "Lowers bad cholesterol",
    "purpose_hi": "खराब कोलेस्ट्रॉल कम करती है",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "rosuvas-10",
    "brand": "Rosuvas 10",
    "company": "Sun",
    "form": "tablet",
    "salts": [
      {
        "name": "rosuvastatin",
        "strengthMg": 10
      }
    ],
    "classes": [
      "statin"
    ],
    "purpose_en": "Lowers cholesterol",
    "purpose_hi": "कोलेस्ट्रॉल कम करती है",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "storvas-20",
    "brand": "Storvas 20",
    "company": "Ranbaxy/Sun",
    "form": "tablet",
    "salts": [
      {
        "name": "atorvastatin",
        "strengthMg": 20
      }
    ],
    "classes": [
      "statin"
    ],
    "purpose_en": "Lowers cholesterol",
    "purpose_hi": "कोलेस्ट्रॉल कम करती है",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "dytor-10",
    "brand": "Dytor 10",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "torsemide",
        "strengthMg": 10
      }
    ],
    "classes": [
      "diuretic"
    ],
    "purpose_en": "Removes excess water (swelling, heart failure) — take in the morning",
    "purpose_hi": "शरीर का ज़्यादा पानी निकालती है — सुबह लें",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "lasix-40",
    "brand": "Lasix 40",
    "company": "Sanofi",
    "form": "tablet",
    "salts": [
      {
        "name": "furosemide",
        "strengthMg": 40
      }
    ],
    "classes": [
      "diuretic"
    ],
    "purpose_en": "Water pill for swelling/hypertension",
    "purpose_hi": "सूजन/BP के लिए पानी निकालने वाली दवा",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "glycomet-gp2",
    "brand": "Glycomet GP2",
    "company": "USV",
    "form": "tablet",
    "salts": [
      {
        "name": "metformin",
        "strengthMg": 500
      },
      {
        "name": "glimepiride",
        "strengthMg": 2
      }
    ],
    "classes": [
      "antidiabetic"
    ],
    "purpose_en": "Type-2 diabetes (take with food; can cause low sugar)",
    "purpose_hi": "टाइप-2 शुगर (खाने के साथ; शुगर कम हो सकती है)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "glycomet-500-sr",
    "brand": "Glycomet 500 SR",
    "company": "USV",
    "form": "tablet",
    "salts": [
      {
        "name": "metformin",
        "strengthMg": 500
      }
    ],
    "classes": [
      "antidiabetic"
    ],
    "purpose_en": "Type-2 diabetes first-line",
    "purpose_hi": "टाइप-2 शुगर की पहली दवा",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "januvia-50",
    "brand": "Januvia 50",
    "company": "MSD",
    "form": "tablet",
    "salts": [
      {
        "name": "sitagliptin",
        "strengthMg": 50
      }
    ],
    "classes": [
      "antidiabetic"
    ],
    "purpose_en": "Type-2 diabetes",
    "purpose_hi": "टाइप-2 शुगर",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "amaryl-2",
    "brand": "Amaryl 2",
    "company": "Sanofi",
    "form": "tablet",
    "salts": [
      {
        "name": "glimepiride",
        "strengthMg": 2
      }
    ],
    "classes": [
      "antidiabetic"
    ],
    "purpose_en": "Type-2 diabetes (before breakfast)",
    "purpose_hi": "टाइप-2 शुगर (नाश्ते से पहले)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "thyronorm-50",
    "brand": "Thyronorm 50 mcg",
    "company": "Abbott",
    "form": "tablet",
    "salts": [
      {
        "name": "levothyroxine",
        "strengthMg": 0.05,
        "strengthText": "50 mcg"
      }
    ],
    "classes": [
      "thyroid"
    ],
    "purpose_en": "Under-active thyroid (empty stomach, 30-60 min before food)",
    "purpose_hi": "थायरॉइड की कमी (खाली पेट, खाने से 30-60 मिनट पहले)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "eltroxin-50",
    "brand": "Eltroxin 50 mcg",
    "company": "GSK",
    "form": "tablet",
    "salts": [
      {
        "name": "levothyroxine",
        "strengthMg": 0.05,
        "strengthText": "50 mcg"
      }
    ],
    "classes": [
      "thyroid"
    ],
    "purpose_en": "Under-active thyroid",
    "purpose_hi": "थायरॉइड की कमी",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "zincovit",
    "brand": "Zincovit",
    "company": "Apex",
    "form": "tablet",
    "salts": [
      {
        "name": "multivitamin blend"
      },
      {
        "name": "zinc"
      }
    ],
    "classes": [
      "multivitamin"
    ],
    "purpose_en": "Daily multivitamin with zinc",
    "purpose_hi": "रोज़ का मल्टीविटामिन (जिंक सहित)",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "supradyn",
    "brand": "Supradyn",
    "company": "Bayer",
    "form": "tablet",
    "salts": [
      {
        "name": "multivitamin blend"
      }
    ],
    "classes": [
      "multivitamin"
    ],
    "purpose_en": "Daily multivitamin",
    "purpose_hi": "रोज़ का मल्टीविटामिन",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "neurobion-forte",
    "brand": "Neurobion Forte",
    "company": "Merck",
    "form": "tablet",
    "salts": [
      {
        "name": "vitamin b complex"
      }
    ],
    "classes": [
      "multivitamin",
      "b-complex"
    ],
    "purpose_en": "Nerve health, B-vitamin deficiency",
    "purpose_hi": "नसों की सेहत, B-विटामिन की कमी",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "becosules",
    "brand": "Becosules",
    "company": "Pfizer",
    "form": "capsule",
    "salts": [
      {
        "name": "vitamin b complex"
      },
      {
        "name": "vitamin c"
      }
    ],
    "classes": [
      "multivitamin",
      "b-complex"
    ],
    "purpose_en": "B-complex + C for mouth ulcers, fatigue",
    "purpose_hi": "मुँह के छाले, कमज़ोरी",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "limcee-500",
    "brand": "Limcee 500",
    "company": "Abbott",
    "form": "tablet",
    "salts": [
      {
        "name": "ascorbic acid",
        "strengthMg": 500
      }
    ],
    "classes": [
      "vitamin-c"
    ],
    "purpose_en": "Vitamin C (chewable)",
    "purpose_hi": "विटामिन सी (चबाने वाली)",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "cetrizine-vitc",
    "brand": "Celin 500",
    "company": "GSK",
    "form": "tablet",
    "salts": [
      {
        "name": "ascorbic acid",
        "strengthMg": 500
      }
    ],
    "classes": [
      "vitamin-c"
    ],
    "purpose_en": "Vitamin C supplement",
    "purpose_hi": "विटामिन सी",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "folvite-5",
    "brand": "Folvite 5",
    "company": "Pfizer",
    "form": "tablet",
    "salts": [
      {
        "name": "folic acid",
        "strengthMg": 5
      }
    ],
    "classes": [
      "folic-acid"
    ],
    "purpose_en": "Folic acid (pregnancy, anaemia)",
    "purpose_hi": "फोलिक एसिड (गर्भावस्था, खून की कमी)",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "shelcal-500",
    "brand": "Shelcal 500",
    "company": "Torrent",
    "form": "tablet",
    "salts": [
      {
        "name": "calcium carbonate",
        "strengthText": "500 mg"
      },
      {
        "name": "cholecalciferol",
        "strengthText": "250 IU"
      }
    ],
    "classes": [
      "calcium"
    ],
    "purpose_en": "Calcium + Vitamin D3 for bones",
    "purpose_hi": "हड्डियों के लिए कैल्शियम + विटामिन D3",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "autrin",
    "brand": "Autrin",
    "company": "Pfizer",
    "form": "capsule",
    "salts": [
      {
        "name": "elemental iron"
      },
      {
        "name": "folic acid"
      }
    ],
    "classes": [
      "iron"
    ],
    "purpose_en": "Iron + folic acid for anaemia",
    "purpose_hi": "खून की कमी (आयरन + फोलिक)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "dexorange-syrup",
    "brand": "Dexorange syrup",
    "company": "Franco-Indian",
    "form": "syrup",
    "salts": [
      {
        "name": "elemental iron"
      },
      {
        "name": "vitamin b12"
      }
    ],
    "classes": [
      "iron"
    ],
    "purpose_en": "Iron tonic for anaemia",
    "purpose_hi": "खून की कमी के लिए आयरन सिरप",
    "paoCategory": "oral-liquid",
    "rx": "OTC"
  },
  {
    "id": "livogen",
    "brand": "Livogen",
    "company": "Merck",
    "form": "tablet",
    "salts": [
      {
        "name": "elemental iron"
      },
      {
        "name": "folic acid"
      }
    ],
    "classes": [
      "iron"
    ],
    "purpose_en": "Iron + folate for anaemia",
    "purpose_hi": "खून की कमी",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "moxicip-eye-drops",
    "brand": "Moxicip eye drops",
    "company": "Cipla",
    "form": "drops",
    "salts": [
      {
        "name": "moxifloxacin",
        "strengthText": "0.5% w/v"
      }
    ],
    "classes": [
      "ophthalmic-antibiotic"
    ],
    "purpose_en": "Bacterial eye infection — discard 28 days after opening",
    "purpose_hi": "आँख का जीवाणु संक्रमण — खोलने के 28 दिन बाद फेंकें",
    "paoCategory": "eyedrops",
    "rx": "R"
  },
  {
    "id": "ciplox-eye-drops",
    "brand": "Ciplox eye/ear drops",
    "company": "Cipla",
    "form": "drops",
    "salts": [
      {
        "name": "ciprofloxacin",
        "strengthText": "0.3% w/v"
      }
    ],
    "classes": [
      "ophthalmic-antibiotic"
    ],
    "purpose_en": "Eye/ear bacterial infection — discard 28 days after opening",
    "purpose_hi": "आँख/कान का संक्रमण — खोलने के 28 दिन बाद फेंकें",
    "paoCategory": "eyedrops",
    "rx": "R"
  },
  {
    "id": "zanocin-eye-drops",
    "brand": "Zanocin eye drops",
    "company": "Sun",
    "form": "drops",
    "salts": [
      {
        "name": "ofloxacin",
        "strengthText": "0.3% w/v"
      }
    ],
    "classes": [
      "ophthalmic-antibiotic"
    ],
    "purpose_en": "Bacterial conjunctivitis — discard 28 days after opening",
    "purpose_hi": "आँख आना (जीवाणु) — खोलने के 28 दिन बाद फेंकें",
    "paoCategory": "eyedrops",
    "rx": "R"
  },
  {
    "id": "refresh-tears",
    "brand": "Refresh Tears",
    "company": "Allergan",
    "form": "drops",
    "salts": [
      {
        "name": "carboxymethylcellulose",
        "strengthText": "0.5% w/v"
      }
    ],
    "classes": [
      "artificial-tears"
    ],
    "purpose_en": "Dry-eye lubricant drops — discard 28 days after opening",
    "purpose_hi": "सूखी आँखों के लिए — खोलने के 28 दिन बाद फेंकें",
    "paoCategory": "eyedrops",
    "rx": "OTC"
  },
  {
    "id": "candibiotic-ear-drops",
    "brand": "Candibiotic ear drops",
    "company": "Glenmark",
    "form": "drops",
    "salts": [
      {
        "name": "chloramphenicol"
      },
      {
        "name": "beclometasone"
      },
      {
        "name": "clotrimazole"
      },
      {
        "name": "lidocaine"
      }
    ],
    "classes": [
      "otic-antibiotic"
    ],
    "purpose_en": "Painful ear infection (antibiotic+steroid+antifungal) — discard 28 days after opening",
    "purpose_hi": "कान का दर्द/संक्रमण — खोलने के 28 दिन बाद फेंकें",
    "paoCategory": "eardrops",
    "rx": "R"
  },
  {
    "id": "otek-ac",
    "brand": "Otek AC ear drops",
    "company": "Cipla",
    "form": "drops",
    "salts": [
      {
        "name": "clotrimazole"
      },
      {
        "name": "lidocaine"
      },
      {
        "name": "chloramphenicol"
      }
    ],
    "classes": [
      "otic-antibiotic"
    ],
    "purpose_en": "Fungal/bacterial ear infection — discard after 28 days",
    "purpose_hi": "कान का संक्रमण — खोलने के 28 दिन बाद फेंकें",
    "paoCategory": "eardrops",
    "rx": "R"
  },
  {
    "id": "nasivion",
    "brand": "Nasivion nasal drops",
    "company": "Merck",
    "form": "drops",
    "salts": [
      {
        "name": "oxymetazoline",
        "strengthText": "0.05%"
      }
    ],
    "classes": [
      "nasal-decongestant"
    ],
    "purpose_en": "Blocked nose (max 3-5 days or rebound congestion)",
    "purpose_hi": "बंद नाक (3-5 दिन से ज़्यादा नहीं)",
    "paoCategory": "nasalspray",
    "rx": "OTC"
  },
  {
    "id": "oxynasal-spray",
    "brand": "Otrivin nasal spray",
    "company": "GSK",
    "form": "drops",
    "salts": [
      {
        "name": "xylometazoline",
        "strengthText": "0.1%"
      }
    ],
    "classes": [
      "nasal-decongestant"
    ],
    "purpose_en": "Blocked nose (max 3-5 days)",
    "purpose_hi": "बंद नाक (3-5 दिन से ज़्यादा नहीं)",
    "paoCategory": "nasalspray",
    "rx": "OTC"
  },
  {
    "id": "candid-cream",
    "brand": "Candid cream",
    "company": "Glenmark",
    "form": "cream",
    "salts": [
      {
        "name": "clotrimazole",
        "strengthText": "1%"
      }
    ],
    "classes": [
      "antifungal-topical"
    ],
    "purpose_en": "Ringworm, athlete's foot, fungal skin infections",
    "purpose_hi": "दाद, फंगल संक्रमण",
    "paoCategory": "cream-tube",
    "rx": "OTC"
  },
  {
    "id": "candid-b-cream",
    "brand": "Candid-B cream",
    "company": "Glenmark",
    "form": "cream",
    "salts": [
      {
        "name": "clotrimazole",
        "strengthText": "1%"
      },
      {
        "name": "beclometasone",
        "strengthText": "0.025%"
      }
    ],
    "classes": [
      "antifungal-topical",
      "topical-steroid"
    ],
    "purpose_en": "Fungal infection with itching/inflammation",
    "purpose_hi": "फंगल संक्रमण खुजली सहित",
    "paoCategory": "cream-tube",
    "rx": "R"
  },
  {
    "id": "fourderm",
    "brand": "Fourderm cream",
    "company": "Mankind",
    "form": "cream",
    "salts": [
      {
        "name": "clobetasol"
      },
      {
        "name": "neomycin"
      },
      {
        "name": "miconazole"
      }
    ],
    "classes": [
      "topical-steroid",
      "antifungal-topical"
    ],
    "purpose_en": "Mixed skin infection (use short-term only)",
    "purpose_hi": "मिश्रित त्वचा संक्रमण (कम दिन ही लगाएँ)",
    "paoCategory": "cream-tube",
    "rx": "R"
  },
  {
    "id": "betnovate-c",
    "brand": "Betnovate-C cream",
    "company": "GSK",
    "form": "cream",
    "salts": [
      {
        "name": "betamethasone"
      },
      {
        "name": "clioquinol"
      }
    ],
    "classes": [
      "topical-steroid"
    ],
    "purpose_en": "Eczema and dermatitis (steroid — avoid on face)",
    "purpose_hi": "एक्जिमा, त्वचा की सूजन (स्टेरॉयड — चेहरे पर नहीं)",
    "paoCategory": "cream-tube",
    "rx": "R"
  },
  {
    "id": "soframycin",
    "brand": "Soframycin cream",
    "company": "Sanofi",
    "form": "cream",
    "salts": [
      {
        "name": "framycetin",
        "strengthText": "1%"
      }
    ],
    "classes": [
      "topical-antibiotic"
    ],
    "purpose_en": "Cuts, wounds, minor skin infections",
    "purpose_hi": "कट, घाव, त्वचा संक्रमण",
    "paoCategory": "cream-tube",
    "rx": "OTC"
  },
  {
    "id": "t-bact",
    "brand": "T-Bact ointment",
    "company": "GSK",
    "form": "ointment",
    "salts": [
      {
        "name": "mupirocin",
        "strengthText": "2%"
      }
    ],
    "classes": [
      "topical-antibiotic"
    ],
    "purpose_en": "Impetigo, infected cuts, boils",
    "purpose_hi": "फोड़े, संक्रमित घाव",
    "paoCategory": "cream-tube",
    "rx": "R"
  },
  {
    "id": "neosporin",
    "brand": "Neosporin powder",
    "company": "GSK",
    "form": "sachet",
    "salts": [
      {
        "name": "neomycin"
      },
      {
        "name": "polymyxin b"
      },
      {
        "name": "bacitracin"
      }
    ],
    "classes": [
      "topical-antibiotic"
    ],
    "purpose_en": "Dust on wounds to prevent infection",
    "purpose_hi": "घावों पर लगाने वाला पाउडर",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "volini-gel",
    "brand": "Volini gel",
    "company": "Sun",
    "form": "gel",
    "salts": [
      {
        "name": "diclofenac diethylamine",
        "strengthText": "1.16%"
      },
      {
        "name": "methyl salicylate"
      },
      {
        "name": "menthol"
      }
    ],
    "classes": [
      "topical-nsaid"
    ],
    "purpose_en": "Topical pain relief for sprains and muscle pain",
    "purpose_hi": "मोच/मांसपेशी दर्द का जेल",
    "paoCategory": "cream-tube",
    "rx": "OTC"
  },
  {
    "id": "moov",
    "brand": "Moov pain spray",
    "company": "Reckitt",
    "form": "gel",
    "salts": [
      {
        "name": "diclofenac diethylamine"
      },
      {
        "name": "methyl salicylate"
      }
    ],
    "classes": [
      "topical-nsaid"
    ],
    "purpose_en": "Spray-on pain relief for back and muscle pain",
    "purpose_hi": "कमर/मांसपेशी दर्द का स्प्रे",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "calosoft",
    "brand": "Calosoft lotion",
    "company": "Micro Labs",
    "form": "suspension",
    "salts": [
      {
        "name": "calamine"
      },
      {
        "name": "aluminium hydroxide gel"
      }
    ],
    "classes": [
      "soothing-topical"
    ],
    "purpose_en": "Chickenpox, prickly heat, insect-bite itch",
    "purpose_hi": "छोटी माता, गर्मी की रैश, कीड़े के काटने पर",
    "paoCategory": "cream-tube",
    "rx": "OTC"
  },
  {
    "id": "kz-shampoo",
    "brand": "KZ shampoo",
    "company": "Glenmark",
    "form": "sachet",
    "salts": [
      {
        "name": "ketoconazole",
        "strengthText": "2%"
      }
    ],
    "classes": [
      "antifungal-topical"
    ],
    "purpose_en": "Dandruff and fungal scalp infections",
    "purpose_hi": "रूसी और सिर का फंगल संक्रमण",
    "paoCategory": "none",
    "rx": "OTC"
  },
  {
    "id": "alprax-025",
    "brand": "Alprax 0.25",
    "company": "Torrent",
    "form": "tablet",
    "salts": [
      {
        "name": "alprazolam",
        "strengthMg": 0.25
      }
    ],
    "classes": [
      "benzodiazepine"
    ],
    "purpose_en": "Anxiety/panic (habit-forming — exactly as prescribed)",
    "purpose_hi": "घबराहट (आदत लगती है — डॉक्टर के अनुसार ही)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "etizola-05",
    "brand": "Etizola 0.5",
    "company": "Alkem",
    "form": "tablet",
    "salts": [
      {
        "name": "etizolam",
        "strengthMg": 0.5
      }
    ],
    "classes": [
      "benzodiazepine-like"
    ],
    "purpose_en": "Anxiety and sleep (habit-forming)",
    "purpose_hi": "घबराहट और नींद (आदत लगती है)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "zolfresh-5",
    "brand": "Zolfresh 5",
    "company": "Abbott",
    "form": "tablet",
    "salts": [
      {
        "name": "zolpidem",
        "strengthMg": 5
      }
    ],
    "classes": [
      "hypnotic"
    ],
    "purpose_en": "Short-term insomnia (take only at bedtime)",
    "purpose_hi": "नींद की दवा (सिर्फ़ सोते समय)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "nexito-10",
    "brand": "Nexito 10",
    "company": "Sun",
    "form": "tablet",
    "salts": [
      {
        "name": "escitalopram",
        "strengthMg": 10
      }
    ],
    "classes": [
      "ssri"
    ],
    "purpose_en": "Depression/anxiety (takes 2-4 weeks; never stop suddenly)",
    "purpose_hi": "डिप्रेशन/घबराहट (2-4 हफ्ते में असर; अचानक बंद न करें)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "serlift-50",
    "brand": "Serlift 50",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "sertraline",
        "strengthMg": 50
      }
    ],
    "classes": [
      "ssri"
    ],
    "purpose_en": "Depression, OCD, anxiety",
    "purpose_hi": "डिप्रेशन, OCD, घबराहट",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "clonotril-05",
    "brand": "Clonotril 0.5",
    "company": "Torrent",
    "form": "tablet",
    "salts": [
      {
        "name": "clonazepam",
        "strengthMg": 0.5
      }
    ],
    "classes": [
      "benzodiazepine"
    ],
    "purpose_en": "Seizures, panic (habit-forming)",
    "purpose_hi": "दौरे, पैनिक (आदत लगती है)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "levipil-500",
    "brand": "Levipil 500",
    "company": "Intas",
    "form": "tablet",
    "salts": [
      {
        "name": "levetiracetam",
        "strengthMg": 500
      }
    ],
    "classes": [
      "antiepileptic"
    ],
    "purpose_en": "Epilepsy/seizure control",
    "purpose_hi": "मिर्गी/दौरे की रोकथाम",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "eptoin-100",
    "brand": "Eptoin 100",
    "company": "Abbott",
    "form": "tablet",
    "salts": [
      {
        "name": "phenytoin",
        "strengthMg": 100
      }
    ],
    "classes": [
      "antiepileptic"
    ],
    "purpose_en": "Seizure control",
    "purpose_hi": "दौरे की रोकथाम",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "tegritol-200",
    "brand": "Tegritol 200",
    "company": "Novartis",
    "form": "tablet",
    "salts": [
      {
        "name": "carbamazepine",
        "strengthMg": 200
      }
    ],
    "classes": [
      "antiepileptic"
    ],
    "purpose_en": "Epilepsy, nerve pain (trigeminal neuralgia)",
    "purpose_hi": "मिर्गी, नसों का दर्द",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "sumatriptan-50",
    "brand": "Suminat 50",
    "company": "Sun",
    "form": "tablet",
    "salts": [
      {
        "name": "sumatriptan",
        "strengthMg": 50
      }
    ],
    "classes": [
      "triptan"
    ],
    "purpose_en": "Acute migraine attack (at first sign)",
    "purpose_hi": "माइग्रेन का दौरा (पहले लक्षण पर)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "vasograin",
    "brand": "Vasograin",
    "company": "Abbott",
    "form": "tablet",
    "salts": [
      {
        "name": "ergotamine"
      },
      {
        "name": "paracetamol",
        "strengthMg": 250
      },
      {
        "name": "caffeine",
        "strengthMg": 50
      },
      {
        "name": "prochlorperazine"
      }
    ],
    "classes": [
      "antimigraine"
    ],
    "purpose_en": "Migraine attack (max 2 tablets/day; contains ergot)",
    "purpose_hi": "माइग्रेन (दिन में अधिकतम 2 गोली)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "cyclopam-syrup",
    "brand": "Cyclopam syrup",
    "company": "Indoco",
    "form": "syrup",
    "salts": [
      {
        "name": "dicyclomine"
      },
      {
        "name": "paracetamol",
        "strengthText": "250 mg/5 ml"
      }
    ],
    "classes": [
      "antispasmodic",
      "analgesic"
    ],
    "purpose_en": "Children's stomach cramps and colic",
    "purpose_hi": "बच्चों की पेट की मरोड़",
    "paoCategory": "oral-liquid",
    "rx": "OTC"
  },
  {
    "id": "crocin-syrup-120",
    "brand": "Crocin syrup 120",
    "company": "GSK",
    "form": "syrup",
    "salts": [
      {
        "name": "paracetamol",
        "strengthText": "120 mg/5 ml"
      }
    ],
    "classes": [
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Children's fever and pain (dose by weight)",
    "purpose_hi": "बच्चों का बुखार/दर्द (वज़न के अनुसार मात्रा)",
    "paoCategory": "oral-liquid",
    "rx": "OTC"
  },
  {
    "id": "calpol-syrup-250",
    "brand": "Calpol syrup 250",
    "company": "GSK",
    "form": "suspension",
    "salts": [
      {
        "name": "paracetamol",
        "strengthText": "250 mg/5 ml"
      }
    ],
    "classes": [
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Children's fever (dose by weight)",
    "purpose_hi": "बच्चों का बुखार (वज़न अनुसार)",
    "paoCategory": "oral-liquid",
    "rx": "OTC"
  },
  {
    "id": "zincogut-zinc-syrup",
    "brand": "Zinc syrup (20 mg)",
    "form": "syrup",
    "salts": [
      {
        "name": "zinc",
        "strengthMg": 20
      }
    ],
    "classes": [
      "zinc"
    ],
    "purpose_en": "Zinc for children's diarrhoea (14 days with ORS)",
    "purpose_hi": "दस्त में जिंक (ORS के साथ 14 दिन)",
    "paoCategory": "oral-liquid",
    "rx": "OTC"
  },
  {
    "id": "paracetamol-susp-generic",
    "brand": "Paracetamol suspension 125 mg",
    "form": "suspension",
    "salts": [
      {
        "name": "paracetamol",
        "strengthText": "125 mg/5 ml"
      }
    ],
    "classes": [
      "analgesic",
      "antipyretic"
    ],
    "purpose_en": "Children's fever and pain",
    "purpose_hi": "बच्चों का बुखार/दर्द",
    "paoCategory": "oral-liquid",
    "rx": "OTC"
  },
  {
    "id": "insulin-lantus",
    "brand": "Lantus SoloStar",
    "company": "Sanofi",
    "form": "injection",
    "salts": [
      {
        "name": "insulin glargine",
        "strengthText": "100 IU/ml"
      }
    ],
    "classes": [
      "basal-insulin"
    ],
    "purpose_en": "Once-daily long-acting insulin — in-use pen good ~28 days at room temperature",
    "purpose_hi": "रोज़ लगने वाली लंबी असर वाली इंसुलिन — इस्तेमाल में ~28 दिन",
    "paoCategory": "insulin",
    "rx": "R"
  },
  {
    "id": "insulin-novorapid",
    "brand": "NovoRapid FlexPen",
    "company": "Novo Nordisk",
    "form": "injection",
    "salts": [
      {
        "name": "insulin aspart",
        "strengthText": "100 IU/ml"
      }
    ],
    "classes": [
      "mealtime-insulin"
    ],
    "purpose_en": "Rapid mealtime insulin — in-use pen ~28 days",
    "purpose_hi": "खाने के साथ लगने वाली इंसुलिन — ~28 दिन",
    "paoCategory": "insulin",
    "rx": "R"
  },
  {
    "id": "huminsulin-30-70",
    "brand": "Huminsulin 30/70",
    "company": "Lilly",
    "form": "injection",
    "salts": [
      {
        "name": "human insulin isophane",
        "strengthText": "100 IU/ml"
      }
    ],
    "classes": [
      "premixed-insulin"
    ],
    "purpose_en": "Premixed insulin — in-use vial/pen ~28 days",
    "purpose_hi": "मिश्रित इंसुलिन — इस्तेमाल में ~28 दिन",
    "paoCategory": "insulin",
    "rx": "R"
  },
  {
    "id": "regestrone-5",
    "brand": "Regestrone 5",
    "company": "Cipla",
    "form": "tablet",
    "salts": [
      {
        "name": "norethisterone",
        "strengthMg": 5
      }
    ],
    "classes": [
      "progestogen"
    ],
    "purpose_en": "Postpones periods / abnormal bleeding (as advised)",
    "purpose_hi": "माहवारी टालना/असामान्य रक्तस्राव",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "krimson-35",
    "brand": "Krimson 35",
    "company": "Sun",
    "form": "tablet",
    "salts": [
      {
        "name": "ethinylestradiol",
        "strengthText": "0.035 mg"
      },
      {
        "name": "cyproterone",
        "strengthMg": 2
      }
    ],
    "classes": [
      "ocp"
    ],
    "purpose_en": "PCOS, acne, oral contraception (same time daily)",
    "purpose_hi": "PCOS, मुँहासे, गर्भनिरोध (रोज़ एक ही समय)",
    "paoCategory": "none",
    "rx": "R"
  },
  {
    "id": "unwanted-72",
    "brand": "Unwanted 72",
    "company": "Mankind",
    "form": "tablet",
    "salts": [
      {
        "name": "levonorgestrel",
        "strengthMg": 1.5
      }
    ],
    "classes": [
      "emergency-contraceptive"
    ],
    "purpose_en": "Emergency contraceptive (within 72 h; not for regular use)",
    "purpose_hi": "आपातकालीन गर्भनिरोध (72 घंटे के भीतर)",
    "paoCategory": "none",
    "rx": "OTC"
  }
];

export const PAO_RULES: PaoRuleMap & Record<string, { days: number | null; note_en: string; note_hi: string; source: string }> = {
  "eyedrops": {
    "days": 28,
    "note_en": "Discard multi-dose eye drops 28 days after opening (contamination risk; in-use bottles show 10-46% contamination).",
    "note_hi": "आँख की बूँदें खोलने के 28 दिन बाद फेंक दें (संक्रमण का खतरा)।",
    "source": "AAO — https://www.aao.org/eye-health/tips-prevention/how-to-store-eye-drops-properly ; CDC — https://www.cdc.gov/healthywater/hygiene/healthy-eyes/eye-drops.html"
  },
  "eyeointment": {
    "days": 28,
    "note_en": "Discard eye ointment ~1 month after opening unless the label says otherwise.",
    "note_hi": "आँख की मरहम खोलने के लगभग 1 महीने बाद फेंकें, यदि लेबल पर कुछ और न हो।",
    "source": "AAO storage guidance (same page as eye drops)"
  },
  "eardrops": {
    "days": 28,
    "note_en": "Discard ear drops ~28 days after opening (patient contamination).",
    "note_hi": "कान की बूँदें खोलने के लगभग 28 दिन बाद फेंकें।",
    "source": "Common pharmacist guidance; label may allow longer — label wins"
  },
  "nasalspray": {
    "days": 60,
    "note_en": "Discard nasal sprays 1-2 months after opening; 28 days if preservative-free.",
    "note_hi": "नाक का स्प्रे खोलने के 1-2 महीने बाद फेंकें (बिना प्रिजर्वेटिव वाला 28 दिन)।",
    "source": "Label guidance; preservative-free = 28 days"
  },
  "reconstituted-antibiotic": {
    "days": 14,
    "note_en": "Reconstituted antibiotic syrup is good ~10-14 days after mixing (amoxicillin 14d, azithromycin 10d, cephalexin 14d) — refrigerate.",
    "note_hi": "मिलाई (पाउडर वाली) एंटीबायोटिक सिरप 10-14 दिन ही चलती है — फ्रिज में रखें।",
    "source": "GoodRx reconstitution guide — https://www.goodrx.com/classes/antibiotics/how-long-do-liquid-antibiotics-last ; Cleveland Clinic"
  },
  "insulin": {
    "days": 28,
    "note_en": "In-use insulin (pen/vial at room temperature) is good ~28 days; unopened stock stays refrigerated until printed expiry.",
    "note_hi": "इस्तेमाल में लगी इंसुलिन ~28 दिन चलती है; बंद पैक फ्रिज में छपी तारीख तक।",
    "source": "Manufacturer labels (Lilly/Sanofi/Novo patient inserts)"
  },
  "oral-liquid": {
    "days": 90,
    "note_en": "Cough syrups/suspensions: use within ~1-3 months of opening; check the label.",
    "note_hi": "खाँसी की सिरप आदि खोलने के 1-3 महीने में उपयोग करें; लेबल देखें।",
    "source": "Label guidance; WHO eye-drop-style 28-day rule does NOT apply to oral liquids with preservatives"
  },
  "cream-tube": {
    "days": 90,
    "note_en": "Creams/ointments: discard ~3 months after opening (tube PAO).",
    "note_hi": "क्रीम/मरहम खोलने के लगभग 3 महीने बाद फेंकें।",
    "source": "PAO (Period After Opening) convention on cosmetic/dermal packs"
  },
  "none": {
    "days": null,
    "note_en": "No after-opening limit for this form; printed expiry applies.",
    "note_hi": "इस रूप के लिए खोलने की सीमा नहीं; छपी तारीख लागू।",
    "source": ""
  }
};
