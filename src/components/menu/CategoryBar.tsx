// Fields: ProductCategory enum, PRODUCT_CATEGORIES
"use client";

import { PRODUCT_CATEGORIES, type ProductCategory } from "@/domain.contract";
import { COPY } from "@/constants/copy";
import { cn } from "@/lib/cn";

interface CategoryBarProps {
  readonly active: ProductCategory | "All";
  readonly onSelect: (cat: ProductCategory | "All") => void;
}

const ICONS: Record<ProductCategory | "All", string> = {
  All: "M4 6h16M4 12h16M4 18h16",
  Starters: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
  Mains: "M3 17h18v2H3v-2zm0-7h18v2H3v-2zm0-7h18v2H3V3z",
  Desserts: "M12 2l2.4 7.4h7.6l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7L2 9.4h7.6z",
  Drinks: "M6 2l1 5h10l1-5M8 7v8a4 4 0 008 0V7",
};

type Category = ProductCategory | "All";
const ALL_CATS: Category[] = ["All", ...PRODUCT_CATEGORIES];

export function CategoryBar({ active, onSelect }: CategoryBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      {ALL_CATS.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-colors",
              isActive
                ? "border-[var(--teal)] bg-[var(--teal-pale)] text-[var(--teal)]"
                : "border-[var(--border2)] text-[var(--ink3)] hover:border-[var(--teal)] hover:text-[var(--teal)]",
            )}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d={ICONS[cat]} />
            </svg>
            {cat === "All" ? COPY.menu.filterAll : cat}
          </button>
        );
      })}
    </div>
  );
}
