"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { BRAND, FONT } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";

type Status = "idle" | "sending" | "sent" | "error";

const inputStyle: React.CSSProperties = {
  fontFamily: FONT.body,
  background: "rgba(255,255,255,0.07)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 2,
};

const labelStyle: React.CSSProperties = {
  fontFamily: FONT.body,
  color: "rgba(255,255,255,0.7)",
};

/**
 * The form fields and the contact-details card (`aside`) share one equal-height
 * row, so the card bottom aligns with the message textarea bottom. The submit
 * button sits below that row.
 */
export function ContactForm({ dict, aside }: { dict: Dictionary["contact"]; aside: React.ReactNode }) {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const sent = status === "sent";

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
              {dict.success.title}
            </h3>
            <p className="text-sm" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.65)" }}>
              {dict.success.body}
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
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={labelStyle}>
                {dict.fields.name.label}
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder={dict.fields.name.placeholder}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 text-sm outline-none"
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={labelStyle}>
                {dict.fields.email.label}
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder={dict.fields.email.placeholder}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 text-sm outline-none"
                style={inputStyle}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label htmlFor="message" className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={labelStyle}>
                {dict.fields.message.label}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder={dict.fields.message.placeholder}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full flex-1 min-h-[140px] px-4 py-3 text-sm outline-none resize-none"
                style={inputStyle}
              />
            </div>
          </div>
        )}

        {/* Submit — directly under the fields on mobile, below the row on desktop */}
        {!sent && (
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold transition-all duration-150 self-start focus:outline-none disabled:opacity-60 lg:col-start-1 lg:row-start-2"
            style={{ fontFamily: FONT.body, background: BRAND.yellow, color: BRAND.anthracite, borderRadius: 2 }}
          >
            {status === "sending" ? dict.sending : dict.submit}
            {status !== "sending" && <ArrowRight size={15} />}
          </button>
        )}

        {/* Right: contact-details card; stretches to match the fields' height on desktop */}
        <div className="lg:col-start-2 lg:row-start-1">{aside}</div>
      </div>

      {status === "error" && (
        <p className="text-sm" style={{ fontFamily: FONT.body, color: "#ffb4b4" }}>
          {dict.error}
        </p>
      )}
    </form>
  );
}
