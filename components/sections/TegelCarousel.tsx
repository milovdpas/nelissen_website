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

/**
 * How wide one slide is from `lg` up, per photo count.
 *
 * Spelled out as literal class names rather than built from `count`: Tailwind
 * only emits classes it can actually see in the source, so an interpolated
 * `lg:w-1/${n}` would generate nothing at all. The `sizes` hint lives beside the
 * class on purpose — if the two ever disagree the browser picks the wrong
 * candidate out of the srcset and the photo renders soft.
 */
const FOUR_UP = { width: "lg:w-1/4", size: "25vw" };
const NARROWER: Record<number, { width: string; size: string }> = {
  1: { width: "lg:w-full", size: "100vw" },
  2: { width: "lg:w-1/2", size: "50vw" },
  3: { width: "lg:w-1/3", size: "33vw" },
};

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
 * The server snapshot is `false`. Only the *offset* reads this now, and at the
 * first paint the offset is zero either way, so a desktop visitor no longer
 * sees the phone layout before hydration.
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
 * True while the tab is in the background.
 *
 * Auto-play has to stop there. A hidden tab still runs timers but does not run
 * animations, so the strip would keep advancing while the `transitionend` that
 * resets it never fires, and the viewer would come back to a carousel some
 * arbitrary number of slides along.
 */
function useDocumentHidden(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener("visibilitychange", onChange);
      return () => document.removeEventListener("visibilitychange", onChange);
    },
    () => document.hidden,
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
 * Slide *width* is pure CSS and slide *offset* is the only thing JavaScript
 * decides. The server cannot know the viewport, so anything width-related in JS
 * renders the phone layout first and then snaps — one 800px-tall photo
 * collapsing to a 210px row once the bundle lands.
 *
 * It loops in both directions without ever snapping back to the start. That is
 * done by appending clones of the first few slides and, once the strip has
 * animated onto them, silently resetting to the real first slide with the
 * transition switched off. Going backwards from the start does the same in
 * reverse: jump to the clone position with no transition, then animate.
 *
 * `index` is kept inside `[0, count]` at all times. Beyond `count` the strip
 * runs off the end of the clones and shows blank space, which is exactly what
 * happened when a second click arrived before the reset had run.
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
  const tabHidden = useDocumentHidden();

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

      // Both wraps work the same way: land on the position showing identical
      // pixels with the transition off, then animate one step from there.
      //
      // Forwards this only triggers when a click lands while the strip is
      // already sitting on the clones and `onTransitionEnd` has not reset it
      // yet — interrupting a transition means the original never reports
      // finishing. Without this, `index` ran to `count + 1` and the right-hand
      // slot had no slide to show.
      if (next < 0 || next > count) {
        const from = next < 0 ? count : 0;
        const to = next < 0 ? count - 1 : 1;
        setAnimate(false);
        setIndex(from);
        remember(from);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimate(true);
            setIndex(to);
            remember(to);
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
    if (paused || tabHidden || reducedMotion || !canScroll) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, tabHidden, reducedMotion, canScroll, go]);

  if (count === 0) return null;

  const layout = count >= PER_VIEW_DESKTOP ? FOUR_UP : NARROWER[count];
  const slideWidth = 100 / perView;
  // `isDesktop` is false on the server, so a short carousel renders as though it
  // scrolls: arrows, dots and clones all present. From `lg` up those few photos
  // sit side by side and it does not scroll, so the controls have to be hidden
  // in CSS as well as in JS. Without this the style pages, which carry three
  // photos each, flash their arrows and lose the ~24px dot row the moment the
  // bundle lands.
  const controlsOnlyBelowDesktop = count <= PER_VIEW_DESKTOP ? " lg:hidden" : "";
  const activeDot = ((index % count) + count) % count;
  const buttonStyle: React.CSSProperties = {
    background: "rgba(44,48,56,0.55)",
    color: "#fff",
    borderRadius: 2,
    backdropFilter: "blur(2px)",
  };

  return (
    <div
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
              // Offset only applies while the strip actually scrolls. Every
              // slide fits at once otherwise, and a stale offset would shunt
              // them sideways and leave a blank gap — which is what a tablet
              // rotated from portrait to landscape used to do.
              transform: `translateX(-${canScroll ? index * slideWidth : 0}%)`,
              transition: animate && !reducedMotion ? "transform 600ms ease-in-out" : "none",
            }}
            onTransitionEnd={(e) => {
              // Once the strip has animated onto the clones, drop back to the
              // real slides with the transition off. Identical pixels, so the
              // reset is invisible. `go` caps `index` at `count`, so this only
              // ever lands on 0.
              if (e.propertyName !== "transform" || index < count) return;
              setAnimate(false);
              setIndex(index - count);
              requestAnimationFrame(() => {
                requestAnimationFrame(() => setAnimate(true));
              });
            }}
          >
            {rendered.map((item, i) => (
              <div key={`${item.slug}-${i}`} className={`shrink-0 px-1.5 w-full ${layout.width}`}>
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
                      sizes={`(max-width: 1024px) 100vw, ${layout.size}`}
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
              className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 focus:outline-none focus-visible:ring-2${controlsOnlyBelowDesktop}`}
              style={buttonStyle}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={dict.next}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 focus:outline-none focus-visible:ring-2${controlsOnlyBelowDesktop}`}
              style={buttonStyle}
            >
              <ChevronRight size={18} />
            </button>
          </>
        ) : null}
      </div>

      {canScroll ? (
        <div className={`mt-4 flex justify-center gap-2${controlsOnlyBelowDesktop}`}>
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
