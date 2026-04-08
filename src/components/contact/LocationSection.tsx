import { COPY } from "@/constants/copy";
import { SectionLabel } from "@/components/landing/SectionLabel";

const DETAILS = [
  { label: "Address", icon: "M10 1C6.5 1 3 4.5 3 8.5c0 6 7 12 7 12s7-6 7-12C17 4.5 13.5 1 10 1z M10 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" },
  { label: "Opening hours", icon: "M10 2a8 8 0 100 16 8 8 0 000-16z M10 5v5l4 2" },
  { label: "Reserve a table", icon: "M3 3h14l1 12H2L3 3z M7 3V2a1 1 0 012 0v1 M11 3V2a1 1 0 012 0v1" },
];

export function LocationSection() {
  const C = COPY.contact;
  return (
    <section className="relative grid grid-cols-1 overflow-hidden lg:grid-cols-2" style={{ background: "var(--ink)", minHeight: 560 }}>
      <span className="pointer-events-none absolute left-1/2 -top-14 -translate-x-1/2 select-none font-serif text-[220px] font-semibold leading-none lg:text-[320px]" style={{ color: "rgba(255,255,255,.025)" }}>場所</span>
      {/* Map */}
      <div className="relative min-h-[300px] lg:min-h-[560px]">
        <iframe
          src={C.mapEmbedUrl}
          className="h-full w-full border-none"
          style={{ filter: "grayscale(100%) contrast(1.1) brightness(.7)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Odoriko location"
        />
        <div className="pointer-events-none absolute inset-0" style={{ background: "rgba(26,20,16,.25)" }} />
      </div>
      {/* Info */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-16 sm:px-16 lg:px-[72px] lg:py-20">
        <SectionLabel text={C.locationLabel} jp={C.locationLabelJp} light />
        <div className="mb-10">
          <small className="mb-2 block font-serif text-[13px] font-light tracking-[0.2em]" style={{ color: "rgba(255,255,255,.3)" }}>{C.locationTitleAr}</small>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,5vw,72px)", lineHeight: .9, letterSpacing: ".03em", color: "var(--white)" }}>
            {C.locationTitle}<br />
            <em className="font-serif text-[clamp(40px,4vw,58px)] font-bold italic" style={{ color: "var(--accent)" }}>{C.locationAccent}</em>
          </h2>
        </div>
        <div className="flex flex-col">
          {[
            { label: "Address", value: C.locationAddress, jp: C.locationAddressJp, iconIdx: 0 },
            { label: "Opening hours", value: C.hours.join(" · "), jp: "営業時間", iconIdx: 1 },
            { label: "Reserve a table", value: "Book instantly online", jp: "オンライン予約", iconIdx: 2 },
          ].map((row) => (
            <div key={row.label} className="flex gap-4 border-b py-5 last:border-b-0" style={{ borderColor: "rgba(255,255,255,.07)" }}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm" style={{ background: "rgba(255,255,255,.05)" }}>
                <svg width={16} height={16} viewBox="0 0 20 20" fill="none" stroke="var(--accent)" strokeWidth={1.8}><path d={DETAILS[row.iconIdx]?.icon} /></svg>
              </div>
              <div>
                <div className="mb-1 text-[9px] uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,.3)" }}>{row.label}</div>
                <div className="font-serif text-base font-semibold leading-snug text-white">{row.value}</div>
                <div className="mt-1 font-serif text-[11px] font-light tracking-[0.1em]" style={{ color: "rgba(255,255,255,.25)" }}>{row.jp}</div>
              </div>
            </div>
          ))}
        </div>
        <a
          href="https://maps.app.goo.gl/aXyHvDKLS4P9JYQ3A"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center gap-2.5 self-start rounded-sm px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--accent2)]"
          style={{ background: "var(--accent)" }}
        >
          {C.locationDirections}<span>→</span>
        </a>
      </div>
    </section>
  );
}
