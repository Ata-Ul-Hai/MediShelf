import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const nextConfig: NextConfig = {
  // fully static export → servable by Amplify, `npx serve out`, and Capacitor
  output: "export",
  // monorepo root (one level up) so the symlinked @medishelf/shared package resolves
  turbopack: {
    root: join(dirname(fileURLToPath(import.meta.url)), ".."),
  },
  transpilePackages: ["@medishelf/shared"],
};

export default nextConfig;
