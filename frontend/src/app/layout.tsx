import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import SwRegister from "@/components/SwRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediShelf — your medicine cabinet, understood",
  description:
    "Scan medicine strips: know the salt, catch duplicate-salt overdose risks, track after-opening expiry, match prescriptions to what you own. Works offline. English + हिंदी.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "MediShelf", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <StoreProvider>{children}</StoreProvider>
        <SwRegister />
      </body>
    </html>
  );
}
