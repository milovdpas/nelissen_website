"use client";

import { useConsent } from "./ConsentProvider";

/** Reopens the cookie settings — placed in the footer so consent is revocable. */
export function ManageCookiesButton({ label, className, style }: { label: string; className?: string; style?: React.CSSProperties }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" onClick={openSettings} className={className} style={style}>
      {label}
    </button>
  );
}
