import Image from "next/image";
import { COPY } from "@/constants/copy";
import { SectionLabel } from "@/components/landing/SectionLabel";

function TimelineItem({ year, jp, title, body, image, side }: typeof COPY.story.timeline[number]) {
  const content = (
    <div className={side === "left" ? "pr-0 text-left lg:pr-13 lg:text-right" : "pl-0 lg:pl-13"}>
      <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-sm">
        <Image src={image} alt={year} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
      </div>
      <div className="mb-2 font-serif text-[11px] font-light tracking-[0.14em]" style={{ color: "var(--ink4)" }}>{jp}</div>
      <h3 className="mb-2.5 font-serif text-[22px] font-semibold leading-snug" style={{ color: "var(--ink)" }}>{title}</h3>
      <p className="text-[13.5px] leading-[1.85]" style={{ color: "var(--ink3)" }}>{body}</p>
    </div>
  );
  const center = (
    <div className="hidden flex-col items-center pt-1 lg:flex">
      <div className="z-10 h-3.5 w-3.5 shrink-0 rounded-full shadow-[0_0_0_4px_var(--cream)]" style={{ background: "var(--accent)" }} />
      <div className="mt-2 whitespace-nowrap text-[13px] tracking-[0.1em]" style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}>{year}</div>
    </div>
  );

  return (
    <div className="mb-16 grid grid-cols-1 gap-4 last:mb-0 lg:mb-20 lg:grid-cols-[1fr_60px_1fr]">
      {side === "left" ? <>{content}{center}<div /></> : <><div />{center}{content}</>}
    </div>
  );
}

export function TimelineSection() {
  const S = COPY.story;
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-16 lg:py-28" style={{ background: "var(--cream)" }}>
      <span className="pointer-events-none absolute -right-14 -top-10 select-none font-serif text-[220px] font-semibold leading-none lg:text-[320px]" style={{ color: "rgba(26,20,16,.04)" }}>歴史</span>
      <div className="mb-16 grid grid-cols-1 items-end gap-8 lg:mb-20 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionLabel text={S.timelineLabel} jp={S.timelineLabelJp} />
          <small className="mb-2 block font-serif text-sm font-light tracking-[0.2em]" style={{ color: "var(--ink4)" }}>{S.timelineTitleJp}</small>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,6vw,80px)", lineHeight: .9, letterSpacing: ".03em", color: "var(--ink)" }}>{S.timelineTitle}</h2>
        </div>
        <p className="text-[15px] leading-[1.85]" style={{ color: "var(--ink3)" }}>{S.timelineIntro}</p>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 lg:block" style={{ background: "var(--border2)" }} />
        {S.timeline.map((item) => <TimelineItem key={item.year} {...item} />)}
      </div>
    </section>
  );
}
