import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import SwRegister from "@/components/SwRegister";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const deva = Noto_Sans_Devanagari({
  variable: "--font-deva",
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: "MediShelf — your medicine cabinet, understood",
  description:
    "Scan medicine strips: know the salt, catch duplicate-salt overdose risks, track after-opening expiry, match prescriptions to what you own. Works offline. English + हिंदी.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "MediShelf", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#0e5e54",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${deva.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <StoreProvider>{children}</StoreProvider>
        <SwRegister />
      </body>
    </html>
  );
}
