"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND } from "@/content/site";
import type { TegelPhoto } from "@/content/nl/tegels";
import { focusPosition } from "@/content/nl/image-focus";

const INTERVAL_MS = 4000;
const DESKTOP_QUERY = "(min-width: 1024px)";
const PER_VIEW_DESKTOP = 4;

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
 * Subscribe to a media query without setState-in-an-effect.
 *
 * The server snapshot is `false`, so the first paint is the one-card mobile
 * layout and the client corrects on hydration. The markup is identical either
 * way, only widths and the transform change, so there is nothing for React to
 * complain about.
 */
function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Photo strip under the assortiment cards.
 *
 * One card at a time on a phone, four side by side from `lg` up. The single
 * full-width version was roughly 800px tall on a desktop, which is absurd for a
 * supporting element. Four cards at a quarter of the width are about 210px, and
 * showing several tiles at once also argues the thing the copy keeps asserting:
 * that there are hundreds of them.
 *
 * It loops in both directions without ever snapping back to the start. That is
 * done by appending clones of the first few slides and, once the strip has
 * animated onto them, silently resetting to the real first slide with the
 * transition switched off. Going backwards from the start does the same in
 * reverse: jump to the clone position with no transition, then animate.
 *
 * Clones cost no extra network: they reuse the same URLs, so the browser serves
 * them from cache.
 *
 * Hand-rolled rather than a dependency: the CSP only allows scripts from 'self'
 * and googletagmanager, and a library would be ~30 KB for what this does.
 *
 * No lightbox yet. That is the expensive half (focus trap, Escape, arrow keys,
 * scroll lock, focus restored on close) and is specified separately in the plan.
 */
export function TegelCarousel({ items, dict }: Props) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const count = items.length;
  const perView = isDesktop ? Math.min(PER_VIEW_DESKTOP, count) : 1;
  const canScroll = count > perView;

  // Clones of the leading slides, so the strip can run past the end and be reset
  // without the viewer seeing it. Always PER_VIEW_DESKTOP of them: harmless on
  // mobile, and avoids the clone count changing on resize.
  const rendered = canScroll ? [...items, ...items.slice(0, PER_VIEW_DESKTOP)] : items;

  // Mounted window over the rendered list, so `loading="lazy"` still means
  // something: all slides sit in one in-viewport box, so mounting every one
  // would fetch the lot the moment the section scrolled into view.
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0, 1, 2, 3, 4]));

  const remember = useCallback(
    (target: number) => {
      setMounted((prev) => {
        const wanted: number[] = [];
        for (let i = target - 1; i <= target + PER_VIEW_DESKTOP; i++) {
          if (i >= 0) wanted.push(i);
        }
        if (wanted.every((i) => prev.has(i))) return prev;
        const next = new Set(prev);
        wanted.forEach((i) => next.add(i));
        return next;
      });
    },
    [],
  );

  const go = useCallback(
    (next: number) => {
      if (!canScroll) return;

      // With no animation there is nothing to hide, so plain wrapping is both
      // simpler and correct. It also matters: `transitionend` never fires when
      // the transition is off, so the silent reset below would never run.
      if (reducedMotion) {
        const target = ((next % count) + count) % count;
        setIndex(target);
        remember(target);
        return;
      }

      if (next < 0) {
        // Jump to the clone position with the transition off, then animate one
        // step back into the real slides on the next frame.
        setAnimate(false);
        setIndex(count);
        remember(count);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimate(true);
            setIndex(count - 1);
            remember(count - 1);
          });
        });
        return;
      }

      setIndex(next);
      remember(next);
    },
    [canScroll, reducedMotion, count, remember],
  );

  // A timeout keyed on the current index rather than a standing interval: `go`
  // updates several pieces of state, and doing that inside an interval's updater
  // would be a side effect in a reducer.
  useEffect(() => {
    if (paused || reducedMotion || !canScroll) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reducedMotion, canScroll, go]);

  if (count === 0) return null;

  const slideWidth = 100 / perView;
  const activeDot = ((index % count) + count) % count;
  const buttonStyle: React.CSSProperties = {
    background: "rgba(44,48,56,0.55)",
    color: "#fff",
    borderRadius: 2,
    backdropFilter: "blur(2px)",
  };

  return (
    <div
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
      <div className="relative">
        <div className="overflow-hidden -mx-1.5">
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * slideWidth}%)`,
              transition: animate && !reducedMotion ? "transform 600ms ease-in-out" : "none",
            }}
            onTransitionEnd={(e) => {
              // Once the strip has animated onto the clones, drop back to the
              // real slides with the transition off. Identical pixels, so the
              // reset is invisible.
              if (e.propertyName !== "transform" || index < count) return;
              setAnimate(false);
              setIndex(index - count);
              requestAnimationFrame(() => {
                requestAnimationFrame(() => setAnimate(true));
              });
            }}
          >
            {rendered.map((item, i) => (
              <div key={`${item.slug}-${i}`} className="shrink-0 px-1.5" style={{ width: `${slideWidth}%` }}>
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "3 / 2", borderRadius: 2, background: "rgba(44,48,56,0.06)" }}
                >
                  {mounted.has(i) ? (
                    <Image
                      src={item.url}
                      alt={i < count ? item.alt : ""}
                      // Clones are decorative duplicates: an empty alt keeps a
                      // screen reader from reading the same photo twice.
                      aria-hidden={i >= count}
                      fill
                      // Never eager: next/image emits a preload link for eager
                      // images, which would compete with the hero, the page's
                      // actual LCP element.
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover"
                      style={{ objectPosition: focusPosition(item.focus) }}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {canScroll ? (
          <>
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
          </>
        ) : null}
      </div>

      {canScroll ? (
        <div className="mt-4 flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => go(i)}
              aria-label={`${dict.goTo} ${i + 1}`}
              aria-current={i === activeDot}
              className="h-2 focus:outline-none focus-visible:ring-2 transition-all duration-200"
              style={{
                width: i === activeDot ? 22 : 8,
                borderRadius: 2,
                background: i === activeDot ? BRAND.yellow : "rgba(44,48,56,0.22)",
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
