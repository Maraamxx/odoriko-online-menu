import Image from "next/image";
import { COPY } from "@/constants/copy";

const STATS = [
  { num: "84", label: "Dishes", jp: "メニュー数" },
  { num: "12", label: "Years", jp: "年の歴史" },
  { num: "18H", label: "Broth", jp: "仕込み時間" },
  { num: "4.9", label: "Rating", jp: "平均評価" },
];

export function LoginBrandPanel() {
  return (
    <div className="relative hidden overflow-hidden lg:block" style={{ flex: "0 0 52%" }}>
      <Image
        src="/brand/login-photo.webp"
        alt=""
        fill sizes="52vw"
        className="object-cover"
        style={{ filter: "brightness(.55) saturate(.8)" }}
        priority
      />
      {/* Red left rule */}
      <div className="absolute inset-y-0 left-0 z-10 w-[3px]" style={{ background: "var(--accent)" }} />
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 z-10 h-[40%]" style={{ background: "linear-gradient(to bottom, rgba(26,20,16,.6), transparent)" }} />
      {/* Right fade into dark panel */}
      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to right, transparent 60%, rgba(26,20,16,.95) 100%)" }} />

      <div className="relative z-20 flex h-full flex-col justify-between p-12 lg:p-14">
        {/* Brand */}
        <div className="flex items-start gap-3">
          <span className="text-[42px] leading-none tracking-[0.1em]" style={{ fontFamily: "var(--font-display)", color: "var(--white)" }}>
            {COPY.brand.name}
          </span>
          <div className="flex flex-col gap-px pt-1.5">
            {"踊り子".split("").map((c, i) => (
              <span key={i} className="font-serif text-[10px] font-light leading-snug tracking-[0.04em]" style={{ color: "rgba(255,255,255,.45)" }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Center hero */}
        <div className="text-center">
          <p className="mb-5 font-serif text-[13px] font-light tracking-[0.3em]" style={{ color: "rgba(255,255,255,.35)" }}>
            最高のひとときのために
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,5vw,80px)", lineHeight: .88, letterSpacing: ".04em", color: "var(--white)" }}>
            WHERE<br />TRADITION
            <em className="block font-serif text-[clamp(40px,4vw,68px)] font-bold italic" style={{ color: "var(--accent)" }}>Meets Craft</em>
          </h2>
          <div className="mx-auto my-5 h-0.5 w-9" style={{ background: "var(--accent)" }} />
          <p className="text-[13px] tracking-[0.06em]" style={{ color: "rgba(255,255,255,.4)" }}>
            Japanese Fine Dining · Cairo
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-end justify-between">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-end gap-4">
              <div className="text-center">
                <div className="text-[32px] leading-none tracking-[0.04em]" style={{ fontFamily: "var(--font-display)", color: "var(--white)" }}>{s.num}</div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,.3)" }}>{s.label}</div>
                <div className="font-serif text-[9px] font-light tracking-[0.1em]" style={{ color: "rgba(255,255,255,.2)" }}>{s.jp}</div>
              </div>
              {i < STATS.length - 1 && <div className="mb-2 h-10 w-px" style={{ background: "rgba(255,255,255,.1)" }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
