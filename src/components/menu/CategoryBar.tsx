// Fields: ProductCategory enum, PRODUCT_CATEGORIES
"use client";

import { PRODUCT_CATEGORIES, type ProductCategory } from "@/domain.contract";
import { COPY } from "@/constants/copy";
import { cn } from "@/lib/cn";

interface CategoryBarProps {
  readonly active: ProductCategory | "All";
  readonly onSelect: (cat: ProductCategory | "All") => void;
}

type Category = ProductCategory | "All";
const ALL_CATS: Category[] = ["All", ...PRODUCT_CATEGORIES];

export function CategoryBar({ active, onSelect }: CategoryBarProps) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      {ALL_CATS.map((cat) => {
        const isActive = cat === active;
        const jaText = cat === "All" ? "全て" : COPY.categoryJa[cat];
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "flex shrink-0 flex-col items-center gap-0.5 rounded-lg px-4 py-2 transition-all",
              isActive
                ? "text-white"
                : "text-[var(--ink3)] hover:bg-[var(--surface2)] hover:text-[var(--ink)]",
            )}
            style={isActive ? { background: "var(--ink)" } : undefined}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {cat === "All" ? "All" : cat}
            </span>
            <span className={cn("text-[9px]", isActive ? "text-[var(--ink4)]" : "opacity-50")}>
              {jaText}
            </span>
          </button>
        );
      })}
    </div>
  );
}
