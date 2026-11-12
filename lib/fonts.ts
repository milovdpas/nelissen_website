import { Barlow_Condensed, DM_Sans } from "next/font/google";

// Self-hosted via next/font — no render-blocking Google Fonts @import.
// Exposed as CSS variables consumed by globals.css and inline `FONT` styles.
export const barlow = Barlow_Condensed({
  subsets: ["latin"],
  // 600 (CookieBanner, MapEmbed), 700 and 800 only. Every element that sets
  // FONT.heading sets an explicit weight too, and --font-heading is declared as
  // a theme token but never applied to a selector, so nothing ever rendered
  // Barlow at 400 - it was a preloaded file for no one.
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});
