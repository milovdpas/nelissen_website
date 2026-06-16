import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { cookiePolicy } from "@/content/nl/legal";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: "Cookiebeleid van Nelissen Tegelhandel & Tegelzettersbedrijf: welke cookies wij gebruiken en hoe u uw voorkeuren beheert.",
  alternates: { canonical: "/cookiebeleid" },
};

export default function CookiebeleidPage() {
  return <LegalPage doc={cookiePolicy} />;
}
