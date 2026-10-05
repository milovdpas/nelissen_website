"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { TegelPhoto } from "@/content/nl/tegels";

const SWIPE_THRESHOLD_PX = 45;

export type LightboxDict = {
  prev: string;
  next: string;
  close: string;
  counterOf: string;
};

type Props = {
  items: TegelPhoto[];
  /** Index into `items` of the photo to show. */
  index: number;
  onIndexChange: (next: number) => void;
  onClose: () => void;
  dict: LightboxDict;
};

/**
 * Full-size view of one carousel photo.
 *
 * The carousel crops hard: every slide is a 3:2 box over portrait phone photos,
 * so a tiled wall is often half out of frame. This shows the whole photograph,
 * which is the only reason it exists.
 *
 * Rendered through a portal onto document.body. The strip it is opened from
 * carries a transform, and a transformed ancestor becomes the containing block
 * for position:fixed, which would trap the overlay inside the carousel. The
 * portal sidesteps that rather than relying on where the markup happens to sit.
 *
 * Only mounted while open, which is also why `createPortal` can reach for
 * `document` with no client guard: the carousel renders this on a click and
 * never otherwise, so it exists on neither the server nor the first client
 * render, and there is no hydration pass for it to mismatch.
 */
export function TegelLightbox({ items, index, onIndexChange, onClose, dict }: Props) {
  const count = items.length;
  const item = items[index];

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const drag = useRef<{ pointerId: number; startX: number; dx: number } | null>(null);

  const go = useCallback(
    (delta: number) => onIndexChange(((index + delta) % count + count) % count),
    [index, count, onIndexChange],
  );

  // Send focus into the dialog and put it back where it came from on close.
  // Without the restore, closing drops focus on <body> and a keyboard user is
  // returned to the top of the page rather than to the photo they opened.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  // Stop the page behind the overlay from scrolling. Replacing the padding the
  // scrollbar used to occupy keeps the layout from jumping sideways as it goes.
  useEffect(() => {
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const overflow = body.style.overflow;
    const padding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = overflow;
      body.style.paddingRight = padding;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); return; }
      if (e.key !== "Tab") return;

      // Focus trap. Only three controls can ever be in here, so cycling the
      // ends by hand beats pulling in a library.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  if (!item) return null;

  const startDrag = (e: React.PointerEvent) => {
    if (count < 2 || e.button !== 0) return;
    drag.current = { pointerId: e.pointerId, startX: e.clientX, dx: 0 };
  };
  const moveDrag = (e: React.PointerEvent) => {
    if (drag.current?.pointerId !== e.pointerId) return;
    drag.current.dx = e.clientX - drag.current.startX;
  };
  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (d?.pointerId !== e.pointerId) return;
    drag.current = null;
    if (d.dx <= -SWIPE_THRESHOLD_PX) go(1);
    else if (d.dx >= SWIPE_THRESHOLD_PX) go(-1);
  };

  const arrowStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    borderRadius: 2,
    backdropFilter: "blur(2px)",
  };

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "rgba(16,17,20,0.92)" }}
      // A click that lands on the backdrop closes; one inside the photo or the
      // controls does not, which is why this checks the target rather than
      // leaning on stopPropagation further in.
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="flex items-center justify-between px-5 py-4 shrink-0">
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
          {index + 1} {dict.counterOf} {count}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={dict.close}
          className="p-2 focus:outline-none focus-visible:ring-2"
          style={arrowStyle}
        >
          <X size={20} />
        </button>
      </div>

      <div
        className="relative flex-1 min-h-0 mx-4 mb-2 select-none"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{ touchAction: "pan-y" }}
      >
        <Image
          // Keyed on the url so React swaps the element rather than mutating
          // src on one <img>, which would otherwise hold the previous photo on
          // screen until the next one decodes.
          key={item.url}
          src={item.url}
          alt={item.alt}
          fill
          draggable={false}
          sizes="100vw"
          // contain, not cover: showing the whole photograph is the point.
          className="object-contain"
          priority
        />
      </div>

      <p
        className="px-5 pb-5 pt-1 text-center text-sm shrink-0"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        {item.alt}
      </p>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={dict.prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 focus:outline-none focus-visible:ring-2"
            style={arrowStyle}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={dict.next}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 focus:outline-none focus-visible:ring-2"
            style={arrowStyle}
          >
            <ChevronRight size={22} />
          </button>
        </>
      ) : null}
    </div>,
    document.body,
  );
}
