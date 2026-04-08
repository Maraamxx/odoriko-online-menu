import Image from "next/image";
import Link from "next/link";
import { COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";

export function BannerCTA() {
  const L = COPY.landing;
  return (
    <section className="relative flex h-[420px] items-center justify-center overflow-hidden sm:h-[520px]">
      <Image
        src="https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1800&h=600"
        alt="Restaurant atmosphere"
        fill sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ background: "rgba(26,20,16,.72)" }} />
      <div className="relative z-10 max-w-[700px] px-6 text-center sm:px-8">
        <p className="mb-5 font-serif text-[13px] font-light tracking-[0.3em]" style={{ color: "rgba(255,255,255,.5)" }}>{L.bannerJp}</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,7vw,100px)", lineHeight: .92, letterSpacing: ".04em", color: "var(--white)" }}>
          {L.bannerTitle}<br /><span style={{ color: "var(--accent)" }}>{L.bannerAccent}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-[1.75]" style={{ color: "rgba(255,255,255,.55)" }}>{L.bannerSub}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <Link href={ROUTES.MENU} className="rounded-sm px-9 py-4 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--accent2)]" style={{ background: "var(--accent)" }}>{L.bannerOrder}</Link>
          <a href="#" className="rounded-sm px-9 py-4 text-xs font-medium uppercase tracking-[0.1em] transition-all hover:bg-[var(--cream2)]" style={{ background: "var(--surface)", color: "var(--ink)" }}>{L.bannerReserve}</a>
        </div>
      </div>
    </section>
  );
}
