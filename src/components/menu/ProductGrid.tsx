// Fields: Product[] (all ProductCard fields)
"use client";

import type { Product, Currency } from "@/domain.contract";
import { ProductCard } from "./ProductCard";
import { SectionError } from "@/components/errors/SectionError";
import { COPY } from "@/constants/copy";

interface ProductGridProps {
  readonly products: Product[] | undefined;
  readonly isLoading: boolean;
  readonly error: Error | null;
  readonly onAdd: (product: Product) => void;
  readonly currency: Currency;
  readonly onRetry?: () => void;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden border" style={{ borderColor: "var(--border)", borderRadius: 18 }}>
      <div className="h-[162px]" style={{ background: "var(--surface2)" }} />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-4 w-3/4 rounded" style={{ background: "var(--surface3)" }} />
        <div className="h-3 w-full rounded" style={{ background: "var(--surface2)" }} />
        <div className="h-3 w-1/2 rounded" style={{ background: "var(--surface2)" }} />
      </div>
    </div>
  );
}

export function ProductGrid({ products, isLoading, error, onAdd, currency, onRetry }: ProductGridProps) {
  if (error) return <SectionError message={COPY.errors.server} onRetry={onRetry} />;

  if (isLoading) {
    return (
      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        {Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-sm" style={{ color: "var(--ink3)" }}>{COPY.menu.unavailable}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} currency={currency} />
      ))}
    </div>
  );
}
