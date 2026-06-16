"use client";

import Script from "next/script";
import { useConsent } from "./ConsentProvider";

/**
 * Google Analytics, loaded ONLY after the visitor grants analytics consent.
 * Reads the measurement id from NEXT_PUBLIC_GA_ID; renders nothing if unset.
 */
export function Analytics() {
  const { ready, categories } = useConsent();
  const id = process.env.NEXT_PUBLIC_GA_ID;

  if (!ready || !categories.analytics || !id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
