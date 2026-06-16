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
  color: "rgba(255,255,255,0.5)",
};

export function ContactForm({ dict }: { dict: Dictionary["contact"] }) {
  const [form, setForm] = useState({ naam: "", email: "", bericht: "", website: "" });
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

  if (status === "sent") {
    return (
      <div className="p-8 flex flex-col items-start gap-4" style={{ background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
        <CheckCircle size={34} style={{ color: BRAND.yellow }} />
        <h3 style={{ fontFamily: FONT.heading, fontWeight: 700, fontSize: "1.4rem", color: "#fff", textTransform: "uppercase" }}>
          {dict.success.title}
        </h3>
        <p className="text-sm" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.65)" }}>
          {dict.success.body}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
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
        <label htmlFor="naam" className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={labelStyle}>
          {dict.fields.naam.label}
        </label>
        <input
          id="naam"
          type="text"
          required
          placeholder={dict.fields.naam.placeholder}
          value={form.naam}
          onChange={(e) => setForm({ ...form, naam: e.target.value })}
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

      <div>
        <label htmlFor="bericht" className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={labelStyle}>
          {dict.fields.bericht.label}
        </label>
        <textarea
          id="bericht"
          required
          rows={5}
          placeholder={dict.fields.bericht.placeholder}
          value={form.bericht}
          onChange={(e) => setForm({ ...form, bericht: e.target.value })}
          className="w-full px-4 py-3 text-sm outline-none resize-none"
          style={inputStyle}
        />
      </div>

      {status === "error" && (
        <p className="text-sm" style={{ fontFamily: FONT.body, color: "#ffb4b4" }}>
          {dict.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold transition-all duration-150 self-start focus:outline-none disabled:opacity-60"
        style={{ fontFamily: FONT.body, background: BRAND.yellow, color: BRAND.anthracite, borderRadius: 2 }}
      >
        {status === "sending" ? dict.sending : dict.submit}
        {status !== "sending" && <ArrowRight size={15} />}
      </button>
    </form>
  );
}
