"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND, FONT } from "@/content/site";

/**
 * A small calendar, used instead of <input type="date"> because a native date
 * input can restrict a range but cannot disable individual weekdays, and the
 * showroom is closed on Sundays.
 *
 * "Today" is only ever read once the calendar opens, never during the initial
 * render: a server-rendered minimum would be built from the server clock and
 * disagree with the browser around midnight, which is a hydration mismatch.
 */
export type DatePickerLabels = {
  placeholder: string;
  open: string;
  previousMonth: string;
  nextMonth: string;
  clear: string;
  closedNote: string;
};

const MONTH_FMT = new Intl.DateTimeFormat("nl-NL", { month: "long", year: "numeric" });
const FULL_FMT = new Intl.DateTimeFormat("nl-NL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
// Monday-first, as Dutch calendars are.
const WEEKDAYS = ["ma", "di", "wo", "do", "vr", "za", "zo"];

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const fromISO = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return y && m && d ? new Date(y, m - 1, d) : null;
};

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Closed on Sundays, and yesterday is not a date you can visit. */
const isDisabled = (day: Date, today: Date) => day < today || day.getDay() === 0;

/** The 6x7 block of days covering `month`, padded from the surrounding months. */
function monthGrid(month: Date): Date[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  // getDay() is Sunday-first; shift so Monday is column 0.
  const lead = (first.getDay() + 6) % 7;
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - lead);
  return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
}

export function DatePicker({
  id,
  value,
  onChange,
  labels,
  describedBy,
  triggerClassName,
  triggerStyle,
}: {
  id: string;
  value: string;
  onChange: (iso: string) => void;
  labels: DatePickerLabels;
  describedBy?: string;
  triggerClassName?: string;
  triggerStyle?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  // Only read once the calendar is opened, so nothing date-dependent is in the
  // server-rendered markup.
  const [month, setMonth] = useState<Date | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selected = value ? fromISO(value) : null;

  const toggle = () => {
    if (!open) {
      // Open on the selected month, else on the current one.
      setMonth(selected ? new Date(selected.getFullYear(), selected.getMonth(), 1) : startOfDay(new Date()));
    }
    setOpen((prev) => !prev);
  };

  const pick = (day: Date) => {
    onChange(toISO(day));
    setOpen(false);
    triggerRef.current?.focus();
  };

  const today = startOfDay(new Date());
  const shownMonth = month ?? today;
  const days = monthGrid(shownMonth);

  return (
    <div className="relative" ref={rootRef}>
      <button
        id={id}
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={value ? FULL_FMT.format(selected!) : labels.open}
        aria-describedby={describedBy}
        className={triggerClassName}
        style={triggerStyle}
      >
        <span style={{ color: value ? "#fff" : "rgba(255,255,255,0.45)" }}>
          {value && selected ? FULL_FMT.format(selected) : labels.placeholder}
        </span>
        <Calendar size={16} style={{ color: "rgba(255,255,255,0.55)", flexShrink: 0 }} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={labels.open}
          className="absolute z-50 mt-2 p-3 w-[19rem] max-w-[calc(100vw-3rem)]"
          style={{
            background: "#20242b",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 2,
            boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              aria-label={labels.previousMonth}
              onClick={() => setMonth(new Date(shownMonth.getFullYear(), shownMonth.getMonth() - 1, 1))}
              className="p-1.5 focus:outline-none"
              style={{ color: "#fff" }}
            >
              <ChevronLeft size={16} />
            </button>
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: FONT.body, color: "#fff", textTransform: "capitalize" }}
              aria-live="polite"
            >
              {MONTH_FMT.format(shownMonth)}
            </span>
            <button
              type="button"
              aria-label={labels.nextMonth}
              onClick={() => setMonth(new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 1))}
              className="p-1.5 focus:outline-none"
              style={{ color: "#fff" }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((d) => (
              <span
                key={d}
                className="text-center text-[10px] font-semibold uppercase py-1"
                style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.45)" }}
              >
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const outside = day.getMonth() !== shownMonth.getMonth();
              const disabled = isDisabled(day, today);
              const isSelected = !!selected && toISO(day) === value;
              return (
                <button
                  key={toISO(day)}
                  type="button"
                  disabled={disabled}
                  aria-label={FULL_FMT.format(day)}
                  aria-pressed={isSelected}
                  onClick={() => pick(day)}
                  className="h-9 text-sm focus:outline-none focus:ring-1"
                  style={{
                    fontFamily: FONT.body,
                    borderRadius: 2,
                    cursor: disabled ? "not-allowed" : "pointer",
                    background: isSelected ? BRAND.yellow : "transparent",
                    color: isSelected
                      ? BRAND.anthracite
                      : disabled
                        ? "rgba(255,255,255,0.22)"
                        : outside
                          ? "rgba(255,255,255,0.4)"
                          : "#fff",
                    fontWeight: isSelected ? 700 : 400,
                    textDecoration: disabled && day.getDay() === 0 ? "line-through" : undefined,
                  }}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <span className="text-[11px]" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.45)" }}>
              {labels.closedNote}
            </span>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="text-[11px] font-semibold underline focus:outline-none"
              style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.7)" }}
            >
              {labels.clear}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
