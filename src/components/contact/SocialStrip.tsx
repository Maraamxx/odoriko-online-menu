"use client";

import { COPY } from "@/constants/copy";
import { SectionLabel } from "@/components/landing/SectionLabel";

const ICONS: Record<string, string> = {
  instagram: "M3 6a3 3 0 013-3h8a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V6z M10 13a3 3 0 100-6 3 3 0 000 6z",
  tiktok: "M14 3a3 3 0 003 3v3a6 6 0 01-3-.8V14a5 5 0 11-5-5v3a2 2 0 102 2V3h3z",
  facebook: "M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h6v-6H8V9h2V7a3 3 0 013-3h2v2h-1.5A1.5 1.5 0 0012 7.5V9h2.5l-.5 2H12v6h4a1 1 0 001-1V4a1 1 0 00-1-1z",
  whatsapp: "M10 2a8 8 0 00-6.93 11.99L2 18l4.13-1.06A8 8 0 1010 2z",
};

export function SocialStrip() {
  const C = COPY.contact;
  return (
    <section className="grid grid-cols-1 items-center gap-12 px-6 py-16 sm:px-16 lg:grid-cols-2 lg:gap-20 lg:py-20" style={{ background: "var(--surface)" }}>
      <div>
        <SectionLabel text={C.socialLabel} jp={C.socialLabelJp} />
        <small className="mb-2 block font-serif text-[13px] font-light tracking-[0.2em]" style={{ color: "var(--ink4)" }}>{C.socialTitleJp}</small>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,64px)", lineHeight: .9, letterSpacing: ".03em", color: "var(--ink)" }}>{C.socialTitle}</h2>
        <p className="mt-5 max-w-[400px] text-sm leading-[1.8]" style={{ color: "var(--ink3)" }}>{C.socialSub}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {C.socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-sm border-[1.5px] p-5 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-pale)] sm:p-6"
            style={{ borderColor: "var(--cream2)" }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-sm border transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white" style={{ borderColor: "var(--cream2)", color: "var(--ink3)" }}>
              <svg width={18} height={18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}><path d={ICONS[s.icon]} /></svg>
            </div>
            <div className="text-xl tracking-[0.08em]" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>{s.name}</div>
            <div className="text-xs" style={{ color: "var(--ink4)" }}>{s.handle}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
