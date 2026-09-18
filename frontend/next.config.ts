import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const nextConfig: NextConfig = {
  // monorepo root (one level up) so the symlinked @medishelf/shared package resolves
  turbopack: {
    root: join(dirname(fileURLToPath(import.meta.url)), ".."),
  },
  transpilePackages: ["@medishelf/shared"],
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

export default nextConfig;
