import Image from "next/image";
import Link from "next/link";
import { COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";

export function StoryCTA() {
  const S = COPY.story;
  return (
    <section className="relative flex h-[400px] items-center justify-center overflow-hidden sm:h-[500px]">
      <Image src="/brand/story/story-cta.webp" alt="Odoriko" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ background: "rgba(26,20,16,.75)" }} />
      <div className="relative z-10 px-6 text-center sm:px-8">
        <p className="mb-5 font-serif text-[13px] font-light tracking-[0.3em]" style={{ color: "rgba(255,255,255,.4)" }}>{S.ctaJp}</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,7vw,100px)", lineHeight: .9, letterSpacing: ".04em", color: "var(--white)" }}>
          {S.ctaTitle}<br /><span style={{ color: "var(--accent)" }}>{S.ctaAccent}</span>
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <Link href={ROUTES.MENU} className="rounded-sm px-9 py-4 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--accent2)]" style={{ background: "var(--accent)" }}>
            {COPY.landing.orderNow}
          </Link>
        </div>
      </div>
    </section>
  );
}
