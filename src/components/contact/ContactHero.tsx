import Image from "next/image";
import { COPY } from "@/constants/copy";

export function ContactHero() {
  const C = COPY.contact;
  return (
    <section className="grid grid-cols-1 pt-16 lg:grid-cols-2" style={{ minHeight: "72vh" }}>
      <div className="relative flex flex-col justify-center overflow-hidden px-6 py-16 sm:px-16 lg:px-[72px] lg:py-20" style={{ background: "var(--ink)" }}>
        <span className="pointer-events-none absolute -bottom-14 -right-10 select-none font-serif text-[200px] font-semibold leading-none lg:text-[280px]" style={{ color: "rgba(255,255,255,.03)" }}>連絡</span>
        <div className="mb-9 flex items-center gap-2.5">
          <div className="h-px w-8" style={{ background: "var(--accent)" }} />
          <span className="text-[10px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>{C.heroEyebrow}</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(64px,9vw,130px)", lineHeight: .88, letterSpacing: ".03em", color: "var(--white)" }}>
          {C.heroTitle1}<br />{C.heroTitle2}<br />
          <em className="block font-serif text-[clamp(54px,7.5vw,108px)] font-bold italic" style={{ color: "var(--accent)" }}>{C.heroAccent}</em>
        </h1>
        <p className="mt-5 font-serif text-[13px] font-light tracking-[0.22em]" style={{ color: "rgba(255,255,255,.3)" }}>{C.heroJp}</p>
        <p className="mt-9 max-w-[420px] text-sm leading-[1.85]" style={{ color: "rgba(255,255,255,.45)" }}>{C.heroSub}</p>
      </div>
      <div className="relative hidden lg:block">
        <Image src="/brand/contact/contact-hero.webp" alt="Odoriko dining room" fill sizes="50vw" className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,20,16,.45) 0%, transparent 50%)" }} />
        <div className="absolute -left-px bottom-12 z-10 rounded-r-sm px-7 py-5" style={{ background: "var(--accent)" }}>
          <div className="mb-2.5 text-[9px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,.65)" }}>{C.hoursTitle}</div>
          {C.hours.map((h) => {
            const [day, time] = h.split(/\s{2,}/);
            return (
              <div key={h} className="mb-1.5 flex items-baseline justify-between gap-5 last:mb-0">
                <span className="text-[11px] font-medium tracking-[0.06em]" style={{ color: "rgba(255,255,255,.75)" }}>{day}</span>
                <span className="text-lg tracking-[0.06em] text-white" style={{ fontFamily: "var(--font-display)" }}>{time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
