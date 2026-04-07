// Fields: Product[] (all ProductCard fields)
"use client";

import { useState, useCallback } from "react";
import type { Product, Currency } from "@/domain.contract";
import { ProductCard } from "./ProductCard";
import { SectionError } from "@/components/errors/SectionError";
import { COPY } from "@/constants/copy";

const INITIAL_COUNT = 8;
const LOAD_MORE_COUNT = 8;

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
    <div className="flex animate-pulse overflow-hidden border" style={{ borderColor: "var(--border)", borderRadius: 14 }}>
      <div className="h-[180px] w-[180px] shrink-0" style={{ background: "var(--surface2)" }} />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-3/4 rounded" style={{ background: "var(--surface3)" }} />
        <div className="h-3 w-full rounded" style={{ background: "var(--surface2)" }} />
        <div className="h-3 w-1/2 rounded" style={{ background: "var(--surface2)" }} />
      </div>
    </div>
  );
}

export function ProductGrid({ products, isLoading, error, onAdd, currency, onRetry }: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  }, []);

  if (error) return <SectionError message={COPY.errors.server} onRetry={onRetry} />;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

  const visible = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} currency={currency} />
        ))}
      </div>
      {hasMore && (
        <button
          onClick={loadMore}
          className="mx-auto rounded-lg px-8 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:opacity-90"
          style={{ background: "var(--ink)" }}
        >
          Show more · {products.length - visibleCount} remaining
        </button>
      )}
    </div>
  );
}
