import { Barlow_Condensed, DM_Sans } from "next/font/google";

// Self-hosted via next/font — no render-blocking Google Fonts @import.
// Exposed as CSS variables consumed by globals.css and inline `FONT` styles.
export const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});
