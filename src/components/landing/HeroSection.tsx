import Image from "next/image";
import Link from "next/link";
import { COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";

function HeroStats() {
  const stats = [
    { num: "84+", label: COPY.landing.statDishes },
    { num: "12", label: COPY.landing.statYears },
    { num: "4.9★", label: COPY.landing.statRating },
  ];
  return (
    <div className="flex gap-10 border-t pt-10" style={{ borderColor: "rgba(255,255,255,.08)" }}>
      {stats.map((s) => (
        <div key={s.label}>
          <div className="mb-1 text-4xl leading-none tracking-[0.04em] text-white" style={{ fontFamily: "var(--font-display)" }}>{s.num}</div>
          <div className="text-[10px] uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,.35)" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const L = COPY.landing;
  return (
    <section className="grid grid-cols-1 pt-16 lg:grid-cols-2" style={{ minHeight: "100dvh" }}>
      {/* Left */}
      <div className="relative flex flex-col justify-between overflow-hidden px-6 py-16 sm:px-16 lg:py-20" style={{ background: "var(--ink)" }}>
        <span className="pointer-events-none absolute -bottom-10 -right-5 select-none font-serif text-[180px] font-semibold leading-none lg:text-[260px]" style={{ color: "rgba(255,255,255,.04)" }}>踊子</span>
        {/* Rotated white logo — right edge, vertically centered */}
        <div className="pointer-events-none absolute -right-4 top-0 bottom-0 flex select-none items-center" aria-hidden="true">
          <Image src="/brand/logo-full.webp" alt="" width={140} height={45} className="-rotate-90 brightness-0 invert" style={{ width: 140, height: "auto", opacity: 0.1 }} priority />
        </div>
        <div>
          <div className="mb-10 flex items-center gap-2.5">
            <div className="h-px w-8" style={{ background: "var(--accent)" }} />
            <span className="text-[10px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>{L.heroEyebrow}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px,8vw,130px)", lineHeight: .92, letterSpacing: ".02em", color: "var(--white)" }}>
            {L.heroTitle1}<br />{L.heroTitle2}<br />
            <em className="block font-serif text-[clamp(48px,6.5vw,108px)] font-bold italic" style={{ color: "var(--accent)" }}>{L.heroAccent}</em>
            {L.heroTitle3}
          </h1>
          <p className="mt-4 font-serif text-[13px] font-light tracking-[0.2em]" style={{ color: "rgba(255,255,255,.35)" }}>{L.heroJp}</p>
          <p className="mt-12 max-w-sm text-sm leading-[1.75]" style={{ color: "rgba(255,255,255,.55)" }}>{L.heroSub}</p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link href={ROUTES.MENU} className="rounded-sm px-9 py-4 text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--accent2)]" style={{ background: "var(--accent)" }}>{L.heroExplore}</Link>
            <a href={ROUTES.OUR_STORY} className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] transition-colors hover:text-white/90" style={{ color: "rgba(255,255,255,.5)" }}>
              {L.heroStory}<span className="text-base">→</span>
            </a>
          </div>
        </div>
        <div className="mt-10">
          <HeroStats />
        </div>
      </div>
      {/* Right — image with logo overlay */}
      <div className="relative hidden overflow-hidden lg:block">
        {/* Background image — dimmed */}
        <Image src="/brand/hero-section-img.jpg" alt="Japanese fine dining" fill sizes="50vw" className="object-cover" style={{ filter: "brightness(.35) saturate(.7)" }} priority />
        {/* Gradient blending into left panel */}
        <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to right, rgba(26,20,16,.8) 0%, transparent 40%)" }} />
        {/* Centered logo */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <Image src="/brand/logo-full.webp" alt={COPY.brand.name} width={300} height={96} className="brightness-0 invert" style={{ width: 300, height: "auto", opacity: 0.9 }} />
        </div>
        {/* Hours badge */}
        <div className="absolute bottom-12 left-12 z-10 rounded-sm px-7 py-5 text-white" style={{ background: "var(--accent)" }}>
          <div className="text-[9px] uppercase tracking-[0.14em] opacity-70">{L.openNow}</div>
          <div className="mt-1 text-[28px] leading-none tracking-[0.04em]" style={{ fontFamily: "var(--font-display)" }}>{L.openHours}</div>
          <div className="mt-0.5 text-[9px] opacity-65">{L.openModes}</div>
        </div>
      </div>
    </section>
  );
}