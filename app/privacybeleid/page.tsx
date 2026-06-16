import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacyPolicy } from "@/content/nl/legal";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Privacybeleid van Nelissen Tegelhandel & Tegelzettersbedrijf: welke persoonsgegevens wij verwerken, waarom en uw rechten.",
  alternates: { canonical: "/privacybeleid" },
};

export default function PrivacybeleidPage() {
  return <LegalPage doc={privacyPolicy} />;
}
