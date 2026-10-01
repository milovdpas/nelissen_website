"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND } from "@/content/site";
import type { TegelPhoto } from "@/content/nl/tegels";
import { focusPosition } from "@/content/nl/image-focus";

const INTERVAL_MS = 4000;

type Props = {
  items: TegelPhoto[];
  dict: {
    label: string;
    prev: string;
    next: string;
    goTo: string;
  };
};

/**
 * Crossfading photo strip under the assortiment cards — Mark's "foto voor foto
 * afspeelt".
 *
 * Hand-rolled rather than a dependency: the CSP only allows scripts from 'self'
 * and googletagmanager, and a library would be ~30 KB for a crossfade.
 *
 * Auto-play stops on hover, on keyboard focus, and whenever the user has asked
 * for reduced motion. The manual controls keep working in every case, so the
 * component is never motion-only.
 */
export function TegelCarousel({ items, dict }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Same DOM is rendered either way — only the behaviour changes — so there is
  // no hydration mismatch from reading the media query after mount.
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const count = items.length;

  // Which slides are in the DOM: everything visited so far, plus one ahead so
  // the next crossfade has its image ready rather than fading into a blank.
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0, 1 % Math.max(count, 1)]));

  const go = useCallback(
    (next: number) => {
      const target = ((next % count) + count) % count;
      const ahead = (target + 1) % count;
      setIndex(target);
      setMounted((prev) =>
        prev.has(target) && prev.has(ahead) ? prev : new Set(prev).add(target).add(ahead),
      );
    },
    [count],
  );

  // A timeout keyed on the current index rather than a standing interval: `go`
  // updates two pieces of state, and doing that from inside an interval's
  // updater would be a side effect in a reducer.
  useEffect(() => {
    if (paused || reducedMotion || count < 2) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reducedMotion, count, go]);

  if (count === 0) return null;

  const buttonStyle: React.CSSProperties = {
    background: "rgba(44,48,56,0.55)",
    color: "#fff",
    borderRadius: 2,
    backdropFilter: "blur(2px)",
  };

  return (
    <div
      ref={containerRef}
      className="mt-12"
      role="group"
      aria-roledescription="carousel"
      aria-label={dict.label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        // Only resume once focus has left the carousel entirely, not when it
        // moves between the arrows and the dots.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div
        className="relative overflow-hidden w-full"
        style={{ aspectRatio: "3 / 2", borderRadius: 2, background: "rgba(44,48,56,0.06)" }}
      >
        {items.map((item, i) => {
          // Only the slides that have been reached, plus the next one, are
          // mounted. Every slide sits in the same in-viewport box, so mounting
          // them all would defeat `loading="lazy"` entirely — the browser would
          // fetch all 10 (soon 20) the moment the section scrolled into view.
          if (!mounted.has(i)) return null;
          const active = i === index;
          return (
            <Image
              key={item.slug}
              src={item.url}
              alt={item.alt}
              fill
              // Never eager: next/image emits a preload link for eager images,
              // which would compete with the hero — the page's actual LCP
              // element and the only image that should be preloaded.
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 1200px"
              aria-hidden={!active}
              className="tegel-slide object-cover"
              style={{ opacity: active ? 1 : 0, objectPosition: focusPosition(item.focus) }}
            />
          );
        })}

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label={dict.prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 focus:outline-none focus-visible:ring-2"
          style={buttonStyle}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label={dict.next}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 focus:outline-none focus-visible:ring-2"
          style={buttonStyle}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => go(i)}
            aria-label={`${dict.goTo} ${i + 1}`}
            aria-current={i === index}
            className="h-2 focus:outline-none focus-visible:ring-2 transition-all duration-200"
            style={{
              width: i === index ? 22 : 8,
              borderRadius: 2,
              background: i === index ? BRAND.yellow : "rgba(44,48,56,0.22)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
