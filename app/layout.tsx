import type { Metadata } from "next";
import { barlow, dmSans } from "@/lib/fonts";
import { site } from "@/content/site";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";
import { ConsentProvider } from "@/components/cookies/ConsentProvider";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { Analytics } from "@/components/cookies/Analytics";
import "./globals.css";

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: dict.meta.title,
    template: `%s | ${site.shortName}`,
  },
  description: dict.meta.description,
  applicationName: site.shortName,
  alternates: {
    canonical: "/",
    languages: {
      nl: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.url,
    siteName: site.name,
    title: dict.meta.title,
    description: dict.meta.description,
    images: [
      {
        url: "/images/showroom.jpeg",
        width: 1200,
        height: 630,
        alt: dict.meta.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: dict.meta.title,
    description: dict.meta.description,
    images: ["/images/showroom.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = [localBusinessJsonLd(), websiteJsonLd()];

  return (
    <html lang={defaultLocale} data-scroll-behavior="smooth" className={`${barlow.variable} ${dmSans.variable} antialiased`}>
      <body>
        <ConsentProvider>
          {children}
          <CookieBanner dict={dict.cookies} />
          <Analytics />
        </ConsentProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
