import { ALLERGEN_LABELS, ALLERGENS } from "@/domain.contract";

export function AllergenLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-lg border px-4 py-2.5"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--ink4)" }}>
        Allergens:
      </span>
      {ALLERGENS.map((a) => (
        <span key={a} className="flex items-center gap-1 text-[11px]" style={{ color: "var(--ink3)" }}>
          <span className="rounded px-1 py-0.5 text-[10px] font-semibold" style={{ background: "var(--surface2)", color: "var(--ink4)" }}>{a}</span>
          {ALLERGEN_LABELS[a]}
        </span>
      ))}
    </div>
  );
}
