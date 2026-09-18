// Bundle each handler with esbuild into dist/<name>/index.js for SAM.
// @aws-sdk/* stays external — the nodejs20 runtime ships SDK v3.
import { build } from "esbuild";
import { mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const handlers = ["scan", "prescription", "voice", "sync", "cron"];

rmSync(join(here, "dist"), { recursive: true, force: true });

for (const name of handlers) {
  await build({
    entryPoints: [join(here, "src", `${name}.ts`)],
    bundle: true,
    platform: "node",
    target: "node20",
    format: "cjs",
    outfile: join(here, "dist", name, "index.js"),
    external: ["@aws-sdk/*"],
    sourcemap: true,
    minify: true,
    logLevel: "info",
  });
  mkdirSync(join(here, "dist", name), { recursive: true });
}
console.log("bundled:", handlers.join(", "));
