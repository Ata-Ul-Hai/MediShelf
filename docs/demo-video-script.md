# MediShelf — 3-minute demo video script

Total: 3:00. Screen-record on a phone (or phone-width browser window). Pre-shoot
the medicine photos on a real table. No live demo — this video is what judges see.

| Time | Screen | Voiceover (EN, with HI take for the banner moment) |
|---|---|---|
| 0:00–0:20 | Real shot: hands open a medicine drawer — strips, an eye-drop bottle. Overlay text: "Dolo 650 · Cheston Cold · eye drops opened… when?" | "Every Indian home has this drawer. Dolo for fever, Cheston Cold for the nose — both contain paracetamol. And these eye drops say 'expiry 2027' on the label. Both of those are lies the cabinet tells you." |
| 0:20–0:35 | MediShelf home (empty) → "Load demo cabinet" tap → grid fills, red banner slides in with pulse. | "MediShelf scans the strips and understands the whole cabinet at once. Dolo, Cheston Cold and Combiflam — three paracetamol products. One dose of each: 1300 milligrams." |
| 0:35–0:55 | Tap the red banner → stack page: brand cards, salt chips, combined-dose math, daily cap. Quick Hindi toggle → banner in हिंदी + tap 🔊 (audio up). | "And when someone can't read English well — it speaks. हिंदी में: 'चेतावनी — इन तीनों में एक ही सॉल्ट है।'" |
| 0:55–1:20 | Item detail for Refresh Tears → "Opened today" tap → countdown starts; cut to Azithral syrup detail showing the 14-day reconstitution clock and the AAO/CDC source line. | "The printed expiry never tells you the real rule: eye drops die 28 days after opening. Antibiotic syrups die 10–14 days after mixing. MediShelf starts the countdown the day you open the pack — and cites its sources." |
| 1:20–1:55 | Add sheet → Prescription tab → photograph a handwritten prescription → "Read prescription" → confirm screen → "Match against my cabinet" → ✅ "You already have: Dolo 650" + 🚨 duplicate warning + 🛒 missing item. | "Doctor wrote a prescription? Photograph it. MediShelf matches salts to what you already own — so you don't buy duplicates, don't double-dose, and don't have to call a family member to double-check." |
| 1:55–2:20 | The torn-strip moment: photograph a half-torn Dolo strip (only '…cetamol IP 650' visible) → scan → top-3 confirm cards → tap confirm. | "Torn wrapper? Half a name? Indian strips print the salt on every pocket — MediShelf reads what survived and asks you to confirm. It never guesses silently." |
| 2:20–2:35 | Airplane mode ON (status bar visible) → app fully alive: cabinet grid, banner, type "meftal" → results. | "And it works with no network at all. The drug index, your cabinet, the safety engine — all on-device. हवाई जहाज़ मोड में भी।" |
| 2:35–2:50 | Architecture montage: diagram animating PWA → API Gateway → Lambda → Textract → Bedrock → Polly → DynamoDB → EventBridge → S3. | "Under the hood: Amazon Textract reads, Amazon Bedrock reasons over torn labels and prescriptions, Polly speaks Hindi, DynamoDB and EventBridge run the nightly safety sweep across households." |
| 2:50–3:00 | Roadmap card: WhatsApp bot · pharmacy batch mode · real-time salt-price hints. Disclaimer card. End card: team + "Built on AWS". | "Next: a WhatsApp bot for the same safety engine, and pharmacy batch mode. MediShelf — informational, not medical advice; the printed label always wins." |

## Shot list (pre-production)

1. Physical: medicine drawer, Dolo 650 strip, Cheston Cold strip, Combiflam strip, Refresh Tears bottle, Azithral syrup, one torn Dolo strip, one handwritten prescription.
2. Photos for the scan demos: taken on the same phone used in the video (no glare, pack flat) — verified working before recording.
3. Screen recording: Chrome DevTools device toolbar, 390×844, 60fps; mic audio for 🔊 moments.
4. Hindi VO segment recorded separately and mixed under the banner moment.
