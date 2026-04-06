// Fields: Allergen[], ALLERGEN_LABELS
import { ALLERGEN_LABELS, type Allergen } from "@/domain.contract";

interface AllergenListProps {
  readonly allergens: Allergen[];
}

export function AllergenList({ allergens }: AllergenListProps) {
  if (allergens.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {allergens.map((a) => (
        <span
          key={a}
          className="rounded px-1.5 py-0.5 text-[10px] font-medium"
          style={{ background: "var(--surface2)", color: "var(--ink4)" }}
          title={ALLERGEN_LABELS[a]}
        >
          {a}
        </span>
      ))}
    </div>
  );
}
