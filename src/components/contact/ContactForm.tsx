"use client";

import { useState } from "react";
import { COPY } from "@/constants/copy";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { cn } from "@/lib/cn";

export function ContactForm() {
  const C = COPY.contact;
  const [reason, setReason] = useState(0);

  return (
    <div className="px-6 py-16 sm:px-16 lg:py-20" style={{ background: "var(--surface)" }}>
      <SectionLabel text={C.formLabel} jp={C.formLabelJp} />
      <div className="mb-10">
        <small className="mb-2 block font-serif text-xs font-light tracking-[0.2em]" style={{ color: "var(--ink4)" }}>{C.formTitleJp}</small>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,4vw,56px)", lineHeight: .9, letterSpacing: ".03em", color: "var(--ink)" }}>{C.formTitle}</h2>
      </div>

      {/* Reason selector */}
      <div className="mb-7">
        <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--ink4)" }}>
          {C.formReasonLabel}
          <span className="font-serif text-[9px] font-light tracking-[0.1em] opacity-70">{C.formReasonLabelJp}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {C.formReasons.map((r, i) => (
            <button
              key={r.en}
              type="button"
              onClick={() => setReason(i)}
              className={cn(
                "rounded-sm border-[1.5px] px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.06em] transition-colors",
                i === reason
                  ? "border-[var(--accent)] bg-[var(--accent-pale)] text-[var(--accent)]"
                  : "border-[var(--cream2)] text-[var(--ink3)] hover:border-[var(--accent)]",
              )}
            >
              {r.en}
              <span className="mt-1 block font-serif text-[9px] font-light tracking-[0.1em] opacity-70">{r.jp}</span>
            </button>
          ))}
        </div>
      </div>

      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="First name" jp="名前" placeholder="Your first name" />
          <FormField label="Last name" jp="苗字" placeholder="Your last name" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Email" jp="メール" placeholder="you@example.com" type="email" />
          <FormField label="Phone" jp="電話" placeholder="+20 1xx xxx xxxx" type="tel" />
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--ink4)" }}>
            Message <span className="font-serif text-[9px] font-light tracking-[0.1em] opacity-70">メッセージ</span>
          </div>
          <textarea
            rows={4}
            placeholder="Tell us how we can help you…"
            className="w-full resize-y rounded-sm border-[1.5px] px-4 py-3.5 text-[13px] leading-relaxed outline-none transition-colors focus:border-[var(--accent)] focus:bg-[var(--surface)]"
            style={{ borderColor: "var(--cream2)", background: "var(--cream)", color: "var(--ink)" }}
          />
        </div>
        <div className="mt-2 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="max-w-[220px] text-[11px] leading-relaxed" style={{ color: "var(--ink4)" }}>
            <strong className="mb-0.5 block font-medium" style={{ color: "var(--ink3)" }}>We read everything.</strong>
            Expect a reply within 24 hours — usually sooner.
          </p>
          <button
            type="submit"
            className="flex items-center gap-3 whitespace-nowrap rounded-sm px-10 py-4 text-xl tracking-[0.18em] text-white transition-colors hover:bg-[var(--accent)]"
            style={{ fontFamily: "var(--font-display)", background: "var(--ink)" }}
          >
            {C.formSubmitBtn}<span className="text-xl opacity-60">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({ label, jp, placeholder, type = "text" }: { label: string; jp: string; placeholder: string; type?: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--ink4)" }}>
        {label} <span className="font-serif text-[9px] font-light tracking-[0.1em] opacity-70">{jp}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-sm border-[1.5px] px-4 py-3.5 text-[13px] outline-none transition-colors focus:border-[var(--accent)] focus:bg-[var(--surface)]"
        style={{ borderColor: "var(--cream2)", background: "var(--cream)", color: "var(--ink)" }}
      />
    </div>
  );
}
