import Image from "next/image";
import { COPY } from "@/constants/copy";
import { SectionLabel } from "./SectionLabel";

export function PhilosophySection() {
  const L = COPY.landing;
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative h-[400px] overflow-hidden lg:h-[600px]">
        <Image
          src="/dishes/robatayaki/black-pepper-short-rib-rice-pot-.webp"
          alt="Kitchen craft"
          fill sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 hover:scale-[1.04]"
        />
        <div className="absolute bottom-7 right-7 rounded-sm px-3.5 py-2 text-[10px] uppercase tracking-[0.14em]" style={{ background: "rgba(26,20,16,.85)", color: "rgba(255,255,255,.7)" }}>
          {L.philCaption}
        </div>
      </div>
      <div className="flex flex-col justify-center px-6 py-16 sm:px-16" style={{ background: "var(--surface)" }}>
        <SectionLabel text={L.philLabel} jp={L.philLabelJp} />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,5vw,68px)", lineHeight: .95, letterSpacing: ".03em", color: "var(--ink)" }}>
          {L.philTitle}<br />
          <em className="font-serif text-[clamp(40px,4vw,56px)] font-bold italic" style={{ color: "var(--accent)" }}>{L.philAccent}</em><br />
          {L.philTitle2}
        </h2>
        <p className="mt-7 max-w-[440px] text-sm leading-[1.85]" style={{ color: "var(--ink3)" }}>{L.philBody}</p>
        <p className="mt-10 border-l-2 pl-5 font-serif text-[13px] font-light leading-8 tracking-[0.2em]" style={{ borderColor: "var(--accent)", color: "var(--ink4)" }}>
          {L.philQuoteJp}<br />{L.philQuoteEn}
        </p>
        <a href="#" className="mt-10 inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.1em] transition-all hover:gap-5" style={{ color: "var(--accent)" }}>
          {L.philLink}<span className="text-base">→</span>
        </a>
      </div>
    </section>
  );
}
