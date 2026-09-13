"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { BRAND, FONT } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { Button } from "@/components/ui/Button";
import { ChoiceChip } from "@/components/ui/ChoiceChip";
import { DatePicker } from "@/components/ui/DatePicker";

type Status = "idle" | "sending" | "sent" | "error";
type RequestType = "appointment" | "question";
type FieldName = "name" | "email" | "phone" | "date" | "dayparts" | "message";
/** Everything in the form state that is a plain string. */
type TextField = "name" | "email" | "phone" | "date" | "message" | "website";

const FIELD_NAMES: readonly FieldName[] = ["name", "email", "phone", "date", "dayparts", "message"];
const isFieldName = (v: unknown): v is FieldName => FIELD_NAMES.includes(v as FieldName);

const inputStyle: React.CSSProperties = {
  fontFamily: FONT.body,
  background: "rgba(255,255,255,0.07)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 2,
};

// The same field, flagged. Only the border colour changes, so nothing reflows.
const invalidBorder = "1px solid rgba(255,120,120,0.75)";

const labelStyle: React.CSSProperties = {
  fontFamily: FONT.body,
  color: "rgba(255,255,255,0.7)",
};

const errorTextStyle: React.CSSProperties = {
  fontFamily: FONT.body,
  color: "#ffb4b4",
};

const LABEL_CLASS = "block text-xs font-semibold mb-2 tracking-wide uppercase";
const CONTROL_CLASS = "w-full px-4 py-3 text-sm outline-none";

/** Label + input + inline error, the shape every text field in here shares. */
function TextField({
  id,
  label,
  value,
  onChange,
  errorMessage,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string | null;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  const errorId = errorMessage ? `${id}-error` : undefined;
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS} style={labelStyle}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={errorId}
        className={CONTROL_CLASS}
        style={errorMessage ? { ...inputStyle, border: invalidBorder } : inputStyle}
      />
      {errorMessage && (
        <p id={errorId} className="mt-1.5 text-xs" style={errorTextStyle}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

/**
 * The form fields and the contact-details card (`aside`) share one equal-height
 * row, so the card bottom aligns with the message textarea bottom. The submit
 * button sits below that row.
 */
export function ContactForm({ dict, aside }: { dict: Dictionary["contact"]; aside: React.ReactNode }) {
  const [type, setType] = useState<RequestType>("appointment");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    dayparts: [] as string[],
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  // Which fields the API rejected, plus a form-level message for everything
  // else (send failure, rate limit). The API stays the only validator, so the
  // two can never drift apart.
  const [invalid, setInvalid] = useState<FieldName[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const isAppointment = type === "appointment";
  const errorFor = (field: FieldName) => (invalid.includes(field) ? dict.validation[field] : null);

  const set = (field: TextField) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleDaypart = (value: string) =>
    setForm((prev) => ({
      ...prev,
      dayparts: prev.dayparts.includes(value)
        ? prev.dayparts.filter((v) => v !== value)
        : [...prev.dayparts, value],
    }));

  const chooseType = (next: RequestType) => {
    setType(next);
    // Errors belong to the fields of the form you were just looking at.
    setInvalid([]);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setInvalid([]);
    setFormError(null);

    // Only send what this request type actually asked for; leftovers from a
    // toggle would otherwise show up in the e-mail as a phantom appointment.
    const payload = {
      type,
      name: form.name,
      email: form.email,
      message: form.message,
      website: form.website,
      ...(isAppointment ? { phone: form.phone, date: form.date, dayparts: form.dayparts } : {}),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("sent");
        return;
      }

      const data: unknown = await res.json().catch(() => null);
      const body = (data ?? {}) as { error?: string; fields?: unknown };
      setStatus("error");

      if (res.status === 429) {
        setFormError(dict.rateLimited);
        return;
      }

      if (body.error === "validation" && Array.isArray(body.fields)) {
        const fields = body.fields.filter(isFieldName);
        if (fields.length > 0) {
          setInvalid(fields);
          return;
        }
      }

      setFormError(dict.error);
    } catch {
      setStatus("error");
      setFormError(dict.error);
    }
  };

  const sent = status === "sent";
  const success = isAppointment ? dict.successAppointment : dict.success;
  const messageCopy = isAppointment ? dict.fields.messageAppointment : dict.fields.message;

  /** Label + control + inline error, wired up for screen readers. */
  const describedBy = (field: FieldName) => (errorFor(field) ? `${field}-error` : undefined);
  const controlStyle = (field: FieldName, base: React.CSSProperties = inputStyle) =>
    errorFor(field) ? { ...base, border: invalidBorder } : base;

  const fieldError = (field: FieldName) =>
    errorFor(field) ? (
      <p id={`${field}-error`} className="mt-1.5 text-xs" style={errorTextStyle}>
        {errorFor(field)}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/*
        Mobile: plain flex column → fields, button, then details card.
        Desktop (lg): 2-col grid with explicit placement → fields (r1c1) and
        card (r1c2) share an equal-height row so the card aligns to the textarea
        bottom, and the button sits in r2c1 below the row.
      */}
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-6 lg:items-stretch">
        {/* Left: fields (or success message after submit) */}
        {sent ? (
          <div className="p-8 flex flex-col items-start gap-4 lg:col-start-1 lg:row-start-1" style={{ background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
            <CheckCircle size={34} style={{ color: BRAND.yellow }} />
            <h3 style={{ fontFamily: FONT.heading, fontWeight: 700, fontSize: "1.4rem", color: "#fff", textTransform: "uppercase" }}>
              {success.title}
            </h3>
            <p className="text-sm" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.65)" }}>
              {success.body}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 lg:col-start-1 lg:row-start-1">
            {/* Honeypot — hidden from humans, bots tend to fill it. */}
            <div aria-hidden className="hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => set("website")(e.target.value)}
              />
            </div>

            {/* Request type. Real radios so the choice is announced properly. */}
            <fieldset className="m-0 p-0" style={{ border: 0 }}>
              <legend className={LABEL_CLASS} style={labelStyle}>
                {dict.type.legend}
              </legend>
              <div className="flex flex-wrap gap-2">
                {(["appointment", "question"] as const).map((value) => (
                  <ChoiceChip
                    key={value}
                    type="radio"
                    name="type"
                    value={value}
                    checked={type === value}
                    onChange={() => chooseType(value)}
                  >
                    {dict.type[value]}
                  </ChoiceChip>
                ))}
              </div>
            </fieldset>

            <TextField
              id="name"
              label={dict.fields.name.label}
              placeholder={dict.fields.name.placeholder}
              value={form.name}
              onChange={set("name")}
              errorMessage={errorFor("name")}
              autoComplete="name"
              required
            />

            <TextField
              id="email"
              type="email"
              label={dict.fields.email.label}
              placeholder={dict.fields.email.placeholder}
              value={form.email}
              onChange={set("email")}
              errorMessage={errorFor("email")}
              autoComplete="email"
              required
            />

            {isAppointment && (
              <>
                <TextField
                  id="phone"
                  type="tel"
                  label={dict.fields.phone.label}
                  placeholder={dict.fields.phone.placeholder}
                  value={form.phone}
                  onChange={set("phone")}
                  errorMessage={errorFor("phone")}
                  autoComplete="tel"
                />

                <div>
                  <label htmlFor="date" className={LABEL_CLASS} style={labelStyle}>
                    {dict.fields.date.label}
                  </label>
                  <DatePicker
                    id="date"
                    value={form.date}
                    onChange={set("date")}
                    labels={dict.fields.date}
                    describedBy={describedBy("date")}
                    triggerClassName={`${CONTROL_CLASS} flex items-center justify-between gap-2 text-left`}
                    triggerStyle={controlStyle("date")}
                  />
                  {fieldError("date")}
                </div>

                {/* Checkboxes, not radios: several dayparts may suit. */}
                <fieldset className="m-0 p-0" style={{ border: 0 }}>
                  <legend className={LABEL_CLASS} style={labelStyle}>
                    {dict.fields.dayparts.label}
                  </legend>
                  <div
                    className="flex flex-wrap gap-2"
                    aria-describedby={describedBy("dayparts")}
                  >
                    {dict.fields.dayparts.options.map((option) => (
                      <ChoiceChip
                        key={option.value}
                        type="checkbox"
                        name="dayparts"
                        value={option.value}
                        checked={form.dayparts.includes(option.value)}
                        onChange={() => toggleDaypart(option.value)}
                      >
                        {option.label}
                      </ChoiceChip>
                    ))}
                  </div>
                  {fieldError("dayparts")}
                </fieldset>
              </>
            )}

            <div className="flex-1 flex flex-col">
              <label htmlFor="message" className={LABEL_CLASS} style={labelStyle}>
                {messageCopy.label}
              </label>
              <textarea
                id="message"
                required={!isAppointment}
                rows={5}
                placeholder={messageCopy.placeholder}
                value={form.message}
                onChange={(e) => set("message")(e.target.value)}
                aria-invalid={errorFor("message") ? true : undefined}
                aria-describedby={describedBy("message")}
                className={`${CONTROL_CLASS} flex-1 min-h-[140px] resize-none`}
                style={controlStyle("message")}
              />
              {fieldError("message")}
            </div>

            {isAppointment && (
              <p className="text-xs leading-relaxed" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.55)" }}>
                {dict.appointmentNote}
              </p>
            )}
          </div>
        )}

        {/* Submit — directly under the fields on mobile, below the row on desktop */}
        {!sent && (
          <Button
            type="submit"
            disabled={status === "sending"}
            className="self-start disabled:opacity-60 lg:col-start-1 lg:row-start-2"
          >
            {status === "sending" ? dict.sending : isAppointment ? dict.submitAppointment : dict.submit}
            {status !== "sending" && <ArrowRight size={15} />}
          </Button>
        )}

        {/* Form-level errors belong in the left column, under the button: as the
            last child of the form they would render after the details card on
            mobile, where the column order is fields → button → card. */}
        {formError && (
          <p className="text-sm lg:col-start-1 lg:row-start-3" role="alert" style={errorTextStyle}>
            {formError}
          </p>
        )}

        {/* Right: contact-details card; stretches to match the fields' height on desktop */}
        <div className="lg:col-start-2 lg:row-start-1">{aside}</div>
      </div>
    </form>
  );
}
