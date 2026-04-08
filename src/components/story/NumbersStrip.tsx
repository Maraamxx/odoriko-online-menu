import { COPY } from "@/constants/copy";

export function NumbersStrip() {
  return (
    <section className="grid grid-cols-2 gap-0 lg:grid-cols-4" style={{ background: "var(--accent)" }}>
      {COPY.story.numbers.map((n, i) => (
        <div
          key={n.label}
          className="flex flex-col gap-1.5 px-6 py-12 sm:px-12 lg:py-24"
          style={{ borderRight: i < COPY.story.numbers.length - 1 ? "1px solid rgba(255,255,255,.15)" : undefined }}
        >
          <div className="text-[clamp(48px,6vw,80px)] leading-none tracking-[0.03em] text-white" style={{ fontFamily: "var(--font-display)" }}>{n.val}</div>
          <div className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,.6)" }}>{n.label}</div>
          <div className="font-serif text-[11px] font-light tracking-[0.14em]" style={{ color: "rgba(255,255,255,.35)" }}>{n.jp}</div>
        </div>
      ))}
    </section>
  );
}
