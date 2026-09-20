import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.medishelf.pwa",
  appName: "MediShelf",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
