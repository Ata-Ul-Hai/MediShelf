# Deployment runbook — AWS (Day 3/4)

One-time account prep (needs the AWS console, ~15 min):
1. **AWS account** + root MFA. Create an IAM user (or use IAM Identity Center) with `AdministratorAccess` for the hackathon.
2. **Apply the $100 event credits**: Billing → Credits (code distributed by WeMakeDevs).
3. **Enable Bedrock model access**: us-east-1 console → Bedrock → Model access → request Claude (anthropic.claude-sonnet-4-20250514-v1:0) *and* a Nova model as fallback. Approval can take minutes–hours, so do this first.
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
If deploy complains about Bedrock model access, redeploy with:
`--parameter-overrides BedrockModelId=amazon.nova-lite-v1:0`

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
