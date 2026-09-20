# Deployment runbook — AWS (Day 3/4)

One-time account prep (needs the AWS console, ~15 min):
1. **AWS account** + root MFA. Create an IAM user (or use IAM Identity Center) with `AdministratorAccess` for the hackathon.
2. **Apply the $100 event credits**: Billing → Credits (code distributed by WeMakeDevs).
3. **Bedrock model access**: nothing required for the default (Nova Lite auto-enables on first invoke). Anthropic Claude is skipped for now (use-case form rejected → support case filed); once AWS clears it, submit the use-case form via Model catalog → Claude Sonnet → Open in playground, then redeploy with:
   `sam deploy --parameter-overrides BedrockModelId=anthropic.claude-sonnet-4-20250514-v1:0`
4. **Install CLI tooling** (local machine):
   ```bash
   brew install awscli aws-sam-cli
   aws configure   # paste the IAM access keys
   ```

Deploy backend:
```bash
cd backend
npm install
npm run build                 # esbuild-bundles the 5 handlers into dist/
sam build
sam deploy --guided           # accept defaults; note the ApiUrl output
```


## LIVE URLS (kept out of the public repo on purpose)
Endpoints and identifiers are account-specific and deliberately not committed
here (the frontend JS bundle exposes the API URL by design; server-side
throttling on the API stage is the actual mitigation, not doc secrecy).
- App (Amplify): see Amplify console → domain
- API: `sam deploy` output `ApiUrl`, or `aws cloudformation describe-stacks --stack-name medishelf --query 'Stacks[0].Outputs'`
- Amplify manual-deploy update flow: `cd frontend && NEXT_PUBLIC_API_URL=<api> npm run build && cd out && zip -qr /tmp/web.zip . && aws amplify create-deployment --app-id <app-id> --branch-name main --output json` → PUT zip to `zipUploadUrl` (site files at zip ROOT, not under out/) → `aws amplify start-deployment --job-id <id>`
- Repo: this repository
- NOTE: New-account gates (as of first deploy): CloudFront blocked; Textract + Bedrock return subscription/verification errors until AWS finishes account verification (<2h per AWS console message, aws-verification@amazon.com if longer). Text-mode /scan and all other endpoints work during the wait; camera-scan and /prescription activate automatically once verification lands — verify with:
  `aws bedrock-runtime converse --model-id amazon.nova-lite-v1:0 --messages '[{"role":"user","content":[{"text":"hi"}]}]' --region us-east-1`
- NOTE: CloudFront is gated until the new account is verified (support case / ~24h). Bedrock Nova invocation had the same gate — retry `aws bedrock-runtime converse --model-id amazon.nova-lite-v1:0 --messages '[{"role":"user","content":[{"text":"hi"}]}]' --region us-east-1` periodically; until it passes, /scan falls back to textract+fuzzy and /prescription returns an error.

Wire the frontend + deploy to Amplify:
```bash
cd frontend
NEXT_PUBLIC_API_URL=<ApiUrl> npm run build   # verify locally first
```
- The build is a **static export** (`out/`). Amplify: connect the Git repo with an
  `amplify.yml` (preBuild `npm ci --prefix frontend`, build `npm run build --prefix frontend`,
  artifacts.baseDirectory `out`) or drag-and-drop the `out/` folder.
- Set env var `NEXT_PUBLIC_API_URL=<ApiUrl>` in Amplify build settings.
- sw.js updates propagate immediately (`updateViaCache: "none"` at registration).
- Android APK (optional demo add-on): `npm run apk` in `frontend/` → sideload
  `android/app/build/outputs/apk/debug/app-debug.apk`.
- Smoke test: scan a strip, read a prescription, play voice, then airplane-mode the type path.

Verify the daily sweep ran: DynamoDB console → medishelf-cabinet → items should
show `lastSweep`, `flagCount`, `lastReport` after 05:30 IST (or run the Lambda once manually).

Free-tier / credit guardrails: Textract only runs on scans you trigger, Bedrock
only on scan+prescription, everything else is on-demand or free tier.
