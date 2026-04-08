import { COPY } from "@/constants/copy";
import { SectionLabel } from "@/components/landing/SectionLabel";

const ICONS: Record<string, string> = {
  whatsapp: "M10 2a8 8 0 00-6.93 11.99L2 18l4.13-1.06A8 8 0 1010 2z",
  instagram: "M3 6a3 3 0 013-3h8a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V6z M10 13a3 3 0 100-6 3 3 0 000 6z",
  pin: "M10 1C6.5 1 3 4.5 3 8.5c0 6 7 12 7 12s7-6 7-12C17 4.5 13.5 1 10 1z M10 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  calendar: "M2 5a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V5z M2 8h16 M8 3v5 M12 3v5",
};

export function ContactChannels() {
  const C = COPY.contact;
  return (
    <div className="border-b px-6 py-16 sm:px-16 lg:border-b-0 lg:border-r lg:py-20" style={{ borderColor: "var(--cream2)" }}>
      <SectionLabel text={C.channelsLabel} jp={C.channelsLabelJp} />
      <div className="mb-10">
        <small className="mb-2 block font-serif text-xs font-light tracking-[0.2em]" style={{ color: "var(--ink4)" }}>{C.channelsTitleJp}</small>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,4vw,56px)", lineHeight: .9, letterSpacing: ".03em", color: "var(--ink)" }}>{C.channelsTitle}</h2>
      </div>
      <div className="flex flex-col">
        {C.channels.map((ch) => (
          <a
            key={ch.label}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-5 border-b py-6 first:pt-0 last:border-b-0"
            style={{ borderColor: "var(--cream2)" }}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white" style={{ borderColor: "var(--cream2)", color: "var(--ink3)" }}>
              <svg width={18} height={18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}><path d={ICONS[ch.icon]} /></svg>
            </div>
            <div className="flex-1">
              <div className="mb-1 text-[9px] uppercase tracking-[0.16em]" style={{ color: "var(--ink4)" }}>
                {ch.label} <span className="font-serif text-[9px] font-light tracking-[0.1em] opacity-60">{ch.jp}</span>
              </div>
              <div className="mb-1 font-serif text-[17px] font-semibold" style={{ color: "var(--ink)" }}>{ch.value}</div>
              <div className="text-xs" style={{ color: "var(--ink4)" }}>{ch.note}</div>
            </div>
            <span className="mt-2.5 text-lg transition-all group-hover:translate-x-1 group-hover:text-[var(--accent)]" style={{ color: "var(--ink4)" }}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
