import type { Metadata } from "next";
import { getLocatie } from "@/content/nl/locaties";
import { breadcrumbJsonLd } from "@/lib/seo";
import { LocatieContent } from "@/components/sections/LocatieContent";
import { site } from "@/content/site";

const locatie = getLocatie("tegels-nistelrode")!;

export const metadata: Metadata = {
  title: locatie.metaTitle,
  description: locatie.metaDescription,
  alternates: { canonical: "/tegels-nistelrode" },
  openGraph: {
    title: locatie.metaTitle,
    description: locatie.metaDescription,
    url: `${site.url}/tegels-nistelrode`,
  },
};

export default function Page() {
  return (
    <>
      <LocatieContent locatie={locatie} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: locatie.metaTitle, path: "/tegels-nistelrode" }]),
          ),
        }}
      />
    </>
  );
}
