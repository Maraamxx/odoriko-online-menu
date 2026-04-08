import { COPY } from "@/constants/copy";

export function MarqueeStrip() {
  const items = COPY.marqueeItems;
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-3.5" style={{ background: "var(--accent)" }} aria-hidden="true">
      <div className="inline-flex" style={{ animation: "marquee 24s linear infinite" }}>
        {doubled.map((item, i) => (
          <div key={`${item.en}-${i}`} className="flex items-center gap-6 px-8" style={{ fontFamily: "var(--font-display)" }}>
            <span className="text-[22px] tracking-[0.12em]" style={{ color: "rgba(255,255,255,.9)" }}>{item.en}</span>
            <span className="font-serif text-sm font-light tracking-[0.12em]" style={{ color: "rgba(255,255,255,.4)" }}>{item.jp}</span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(255,255,255,.5)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
