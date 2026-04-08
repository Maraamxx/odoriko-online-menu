import { COPY } from "@/constants/copy";
import { SectionLabel } from "@/components/landing/SectionLabel";

export function OriginSection() {
  const S = COPY.story;
  return (
    <section className="grid grid-cols-1 gap-16 px-6 py-20 sm:px-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24 lg:py-28" style={{ background: "var(--surface)" }}>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <SectionLabel text={S.originLabel} jp={S.originLabelJp} />
        <div className="relative -left-2 text-[120px] leading-none tracking-tight lg:text-[200px]" style={{ fontFamily: "var(--font-display)", color: "var(--cream2)" }}>01</div>
        <h2 className="-mt-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,5vw,72px)", lineHeight: .92, letterSpacing: ".03em", color: "var(--ink)" }}>
          {S.originTitle}<br />
          <em className="font-serif text-[clamp(40px,4vw,58px)] font-bold italic" style={{ color: "var(--accent)" }}>{S.originAccent}</em>
        </h2>
        <p className="mt-4 font-serif text-xs font-light tracking-[0.2em]" style={{ color: "var(--ink4)" }}>{S.originJp}</p>
      </div>
      <div className="pt-2">
        <p className="mb-9 font-serif text-[22px] font-medium leading-relaxed" style={{ color: "var(--ink)" }}>{S.originLede}</p>
        {S.originBody.map((p, i) => (
          <p key={i} className="mb-7 text-[15px] leading-8" style={{ color: "var(--ink3)" }}>{p}</p>
        ))}
        <blockquote className="my-12 border-l-[3px] pl-7" style={{ borderColor: "var(--accent)" }}>
          <p className="mb-3 font-serif text-xl font-medium leading-relaxed" style={{ color: "var(--ink)" }}>{S.originQuote}</p>
          <p className="mb-3 font-serif text-xs font-light tracking-[0.18em]" style={{ color: "var(--ink4)" }}>{S.originQuoteJp}</p>
          <p className="text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--accent)" }}>{S.originQuoteAttr}</p>
        </blockquote>
      </div>
    </section>
  );
}
