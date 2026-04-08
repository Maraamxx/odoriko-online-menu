"use client";

import { CUSTOMIZATION_OPTIONS } from "@/constants/customizations";
import { COPY } from "@/constants/copy";
import { cn } from "@/lib/cn";

interface CartItemCustomizeProps {
  readonly productId: string;
  readonly customizations: string[];
  readonly notes: string;
  readonly onToggle: (productId: string, option: string) => void;
  readonly onNotesChange: (productId: string, notes: string) => void;
}

export function CartItemCustomize({
  productId,
  customizations,
  notes,
  onToggle,
  onNotesChange,
}: CartItemCustomizeProps) {
  return (
    <div className="flex flex-col gap-2 pb-3 pt-1">
      <div className="flex flex-wrap gap-1.5">
        {CUSTOMIZATION_OPTIONS.map((opt) => {
          const active = customizations.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(productId, opt)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[10px] font-medium transition-colors",
                active
                  ? "border-[var(--accent)] bg-[var(--accent-pale)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--ink4)] hover:border-[var(--ink4)]",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <input
        type="text"
        value={notes}
        onChange={(e) => onNotesChange(productId, e.target.value)}
        placeholder={COPY.cart.itemNotesHint}
        className="rounded border px-2.5 py-1.5 text-[11px]"
        style={{ borderColor: "var(--border)", color: "var(--ink3)" }}
      />
    </div>
  );
}
