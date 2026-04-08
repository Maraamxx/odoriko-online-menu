import Image from "next/image";
import { COPY } from "@/constants/copy";
import { SectionLabel } from "./SectionLabel";

function Pillar({ num, name, jp, desc }: { num: string; name: string; jp: string; desc: string }) {
  return (
    <div className="flex gap-5 border-b py-5 last:border-b-0" style={{ borderColor: "rgba(255,255,255,.07)" }}>
      <span className="mt-0.5 min-w-7 text-[13px] tracking-[0.1em]" style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}>{num}</span>
      <div>
        <div className="mb-1 font-serif text-base font-semibold text-white">{name}</div>
        <div className="mb-1.5 font-serif text-[11px] font-light tracking-[0.12em]" style={{ color: "rgba(255,255,255,.3)" }}>{jp}</div>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,.4)" }}>{desc}</p>
      </div>
    </div>
  );
}

export function CraftSection() {
  const L = COPY.landing;
  return (
    <section className="relative grid grid-cols-1 items-center gap-16 overflow-hidden px-6 py-20 sm:px-16 lg:grid-cols-2 lg:gap-20 lg:py-28" style={{ background: "var(--ink)" }}>
      <span className="pointer-events-none absolute -right-14 -top-20 select-none font-serif text-[280px] font-semibold leading-none lg:text-[380px]" style={{ color: "rgba(255,255,255,.03)" }}>料理</span>
      <div>
        <SectionLabel text={L.craftLabel} jp={L.craftLabelJp} light />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,6vw,80px)", lineHeight: .92, letterSpacing: ".03em", color: "var(--white)" }}>
          {L.craftTitle}<br />
          <em className="font-serif text-[clamp(40px,5vw,66px)] font-bold italic" style={{ color: "var(--accent)" }}>{L.craftAccent}</em><br />
          {L.craftTitle2}
        </h2>
        <p className="mt-7 max-w-[400px] text-sm leading-[1.85]" style={{ color: "rgba(255,255,255,.5)" }}>{L.craftBody}</p>
        <div className="mt-12">
          {L.pillars.map((p) => <Pillar key={p.num} {...p} />)}
        </div>
      </div>
      <div className="hidden grid-cols-2 gap-3 lg:grid">
        <div className="row-span-2 h-[420px] overflow-hidden rounded-sm">
          <Image src="https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=500&h=500" alt="Kitchen" fill sizes="25vw" className="object-cover" />
        </div>
        <div className="h-[204px] overflow-hidden rounded-sm">
          <Image src="https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&w=400&h=300" alt="Plating" fill sizes="25vw" className="object-cover" />
        </div>
        <div className="h-[204px] overflow-hidden rounded-sm">
          <Image src="https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=400&h=300" alt="Ingredients" fill sizes="25vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
