import { COPY } from "@/constants/copy";

const MENU_LINKS = [
  { en: "Starters", jp: "前菜" },
  { en: "Sushi", jp: "寿司" },
  { en: "Ramen", jp: "ラーメン" },
  { en: "Robatayaki", jp: "炉端焼き" },
  { en: "Desserts", jp: "デザート" },
];
const HOURS = ["Mon – Thu   12:00 – 23:00", "Fri – Sat   12:00 – 00:00", "Sunday      12:00 – 22:00"];

export function LandingFooter() {
  const L = COPY.landing;
  return (
    <footer className="px-6 pb-9 pt-16 sm:px-16" style={{ background: "var(--ink)", color: "rgba(255,255,255,.6)" }}>
      <div className="mb-14 grid grid-cols-1 gap-12 border-b pb-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]" style={{ borderColor: "rgba(255,255,255,.08)" }}>
        {/* Brand */}
        <div>
          <div className="mb-1.5 flex items-center gap-2.5 text-[32px] tracking-[0.14em] text-white" style={{ fontFamily: "var(--font-display)" }}>
            ODORIKO <span className="font-serif text-base font-light" style={{ color: "rgba(255,255,255,.3)" }}>踊子</span>
          </div>
          <div className="mb-5 font-serif text-[11px] font-light tracking-[0.12em]" style={{ color: "rgba(255,255,255,.35)" }}>{L.footerJp}</div>
          <p className="mb-7 max-w-[260px] text-[13px] leading-[1.8]" style={{ color: "rgba(255,255,255,.4)" }}>{L.footerDesc}</p>
          <div className="h-0.5 w-9" style={{ background: "var(--accent)" }} />
        </div>
        {/* Menu */}
        <div>
          <div className="mb-5 text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,.35)" }}>{L.footerMenu}</div>
          <ul className="flex flex-col gap-3" style={{ listStyle: "none" }}>
            {MENU_LINKS.map((l) => (
              <li key={l.en}>
                <a href="#" className="text-[13px] transition-colors hover:text-white" style={{ color: "rgba(255,255,255,.5)" }}>
                  {l.en}
                  <span className="mt-0.5 block font-serif text-[9px] tracking-[0.08em]" style={{ color: "rgba(255,255,255,.2)" }}>{l.jp}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Hours */}
        <div>
          <div className="mb-5 text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,.35)" }}>{L.footerHours}</div>
          <ul className="flex flex-col gap-3" style={{ listStyle: "none" }}>
            {HOURS.map((h) => (
              <li key={h} className="text-[13px]" style={{ color: "rgba(255,255,255,.5)" }}>{h}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-[11px] tracking-[0.06em]" style={{ color: "rgba(255,255,255,.25)" }}>{L.footerCopy}</p>
        <ul className="flex gap-6" style={{ listStyle: "none" }}>
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <li key={l}><a href="#" className="text-[11px] tracking-[0.06em] transition-colors hover:text-white/60" style={{ color: "rgba(255,255,255,.25)" }}>{l}</a></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
