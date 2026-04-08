import Image from "next/image";
import { COPY } from "@/constants/copy";

export function StoryHero() {
  const S = COPY.story;
  return (
    <section className="grid grid-cols-1 pt-16 lg:grid-cols-[55%_45%]" style={{ minHeight: "100dvh" }}>
      <div className="relative flex flex-col justify-center overflow-hidden px-6 py-16 sm:px-16 lg:px-[72px] lg:py-20" style={{ background: "var(--ink)" }}>
        <span className="pointer-events-none absolute -bottom-14 -right-10 select-none font-serif text-[200px] font-semibold leading-none lg:text-[300px]" style={{ color: "rgba(255,255,255,.03)" }}>物語</span>
        <div className="mb-9 flex items-center gap-2.5">
          <div className="h-px w-8" style={{ background: "var(--accent)" }} />
          <span className="text-[10px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>{S.heroEyebrow}</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(64px,9vw,140px)", lineHeight: .88, letterSpacing: ".03em", color: "var(--white)" }}>
          {S.heroTitle1}<br />{S.heroTitle2}<br />
          <em className="block font-serif text-[clamp(54px,7.5vw,118px)] font-bold italic" style={{ color: "var(--accent)" }}>{S.heroAccent}</em>
        </h1>
        <p className="mt-6 font-serif text-[13px] font-light tracking-[0.22em]" style={{ color: "rgba(255,255,255,.3)" }}>{S.heroJp}</p>
        <p className="mt-10 max-w-[420px] text-[15px] leading-[1.85]" style={{ color: "rgba(255,255,255,.55)" }}>{S.heroIntro}</p>
        <div className="mt-12 flex items-center gap-3.5 text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,.3)" }}>
          <div className="h-px w-12" style={{ background: "rgba(255,255,255,.15)" }} />
          {S.heroScroll}
        </div>
      </div>
      <div className="relative hidden lg:block">
        <Image src="/brand/story/story-hero.webp" alt="Odoriko founder" fill sizes="45vw" className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,20,16,.5) 0%, transparent 50%)" }} />
        <div className="absolute right-10 top-12 z-10 rounded-sm px-5 py-4 text-center text-white" style={{ background: "var(--accent)" }}>
          <div className="text-5xl leading-none tracking-[0.04em]" style={{ fontFamily: "var(--font-display)" }}>{S.heroYear}</div>
          <div className="mt-0.5 text-[9px] uppercase tracking-[0.14em] opacity-75">{S.heroYearLabel}</div>
        </div>
      </div>
    </section>
  );
}
