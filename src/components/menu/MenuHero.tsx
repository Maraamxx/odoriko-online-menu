// Static — no data, no hooks
import { COPY } from "@/constants/copy";

export function MenuHero() {
  return (
    <section className="flex flex-col gap-4 py-10">
      <span
        className="inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest"
        style={{ background: "var(--teal-pale)", color: "var(--teal)" }}
      >
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path d="M12 5v14M5 12h14" />
        </svg>
        {COPY.menu.heroEyebrow}
      </span>
      <h1 className="max-w-md font-serif text-[42px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
        Crafted for your{" "}
        <em className="font-serif italic" style={{ color: "var(--teal)" }}>finest moments</em>
      </h1>
      <p className="max-w-lg text-sm leading-relaxed" style={{ color: "var(--ink3)" }}>
        {COPY.menu.heroSubtitle}
      </p>
    </section>
  );
}
