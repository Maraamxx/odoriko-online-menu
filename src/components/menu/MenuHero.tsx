// Static — no data, no hooks
import { COPY } from "@/constants/copy";

export function MenuHero() {
  return (
    <section className="flex flex-col gap-3 py-10">
      <span
        className="inline-flex w-fit items-center gap-1.5 rounded px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ background: "var(--accent)", color: "white" }}
      >
        {COPY.menu.heroEyebrow}
      </span>
      <h1 className="max-w-lg font-serif text-[28px] font-bold leading-[1.1] tracking-tight sm:text-[44px]" style={{ color: "var(--ink)" }}>
        CRAFTED FOR YOUR{" "}
        <em className="font-serif italic" style={{ color: "var(--accent)" }}>FINEST</em>{" "}
        MOMENTS
      </h1>
      <p className="font-serif text-sm tracking-[0.15em]" style={{ color: "var(--ink4)" }}>
        最高のひとときのために
      </p>
      <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--ink3)" }}>
        {COPY.menu.heroSubtitle}
      </p>
    </section>
  );
}
