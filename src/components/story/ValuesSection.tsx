"use client";

import { COPY } from "@/constants/copy";
import { SectionLabel } from "@/components/landing/SectionLabel";

function ValueCard({ num, name, jp, desc }: typeof COPY.story.values[number]) {
  return (
    <div className="group cursor-default p-8 transition-colors duration-300 hover:bg-[var(--ink)] sm:p-10 lg:p-12" style={{ background: "var(--surface)" }}>
      <div className="mb-5 text-[48px] leading-none tracking-[0.04em] transition-colors duration-300 group-hover:text-[var(--accent)] lg:text-[64px]" style={{ fontFamily: "var(--font-display)", color: "var(--cream2)" }}>{num}</div>
      <div className="mb-1.5 text-[28px] tracking-[0.06em] transition-colors duration-300 group-hover:text-white lg:text-4xl" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>{name}</div>
      <div className="mb-6 font-serif text-[13px] font-light tracking-[0.16em] transition-colors duration-300 group-hover:text-white/30" style={{ color: "var(--ink4)" }}>{jp}</div>
      <div className="mb-6 h-0.5 w-8 transition-colors duration-300 group-hover:bg-[var(--accent)]" style={{ background: "var(--accent)" }} />
      <p className="text-sm leading-[1.85] transition-colors duration-300 group-hover:text-white/50" style={{ color: "var(--ink3)" }}>{desc}</p>
    </div>
  );
}

export function ValuesSection() {
  const S = COPY.story;
  return (
    <section className="px-6 py-20 sm:px-16 lg:py-28" style={{ background: "var(--cream)" }}>
      <div className="mb-16">
        <SectionLabel text={S.valuesLabel} jp={S.valuesLabelJp} />
        <small className="mb-2 block font-serif text-sm font-light tracking-[0.2em]" style={{ color: "var(--ink4)" }}>{S.valuesTitleJp}</small>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,6vw,80px)", lineHeight: .9, letterSpacing: ".03em", color: "var(--ink)" }}>{S.valuesTitle}</h2>
      </div>
      <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
        {S.values.map((v) => <ValueCard key={v.num} {...v} />)}
      </div>
    </section>
  );
}
