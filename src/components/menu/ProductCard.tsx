// Fields: Product.name, Product.description, Product.priceInCents, Product.imageUrl,
//         Product.rating, Product.badge, Product.allergens, Product.isAvailable, Product.category
"use client";

import Image from "next/image";
import type { Product, Currency, Money } from "@/domain.contract";
import { formatPrice } from "@/lib/format";
import { StarRating } from "@/components/ui";
import { AllergenList } from "./AllergenList";
import { COPY } from "@/constants/copy";

interface ProductCardProps {
  readonly product: Product;
  readonly onAdd: (product: Product) => void;
  readonly currency: Currency;
}

export function ProductCard({ product, onAdd, currency }: ProductCardProps) {
  const { name, description, priceInCents, imageUrl, rating, badge, allergens, isAvailable } = product;

  return (
    <div
      className="group relative flex flex-col overflow-hidden border transition-all duration-200 hover:shadow-lg sm:flex-row"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        borderRadius: 14,
        opacity: isAvailable ? 1 : 0.55,
      }}
    >
      {/* Image */}
      <div className="relative h-[160px] w-full shrink-0 overflow-hidden sm:h-[180px] sm:w-[180px]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 180px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badge && (
          <span
            className="absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ background: "var(--accent)" }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-base font-bold leading-snug" style={{ color: "var(--ink)" }}>
              {name}
            </h3>
            <StarRating rating={rating} size="sm" />
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed" style={{ color: "var(--ink3)" }}>
            {description}
          </p>
          <AllergenList allergens={allergens} />
        </div>
        <div className="flex items-end justify-between pt-2">
          <div>
            <span className="font-serif text-lg font-bold" style={{ color: "var(--ink)" }}>
              {formatPrice(priceInCents as Money, currency)}
            </span>
            <span className="ml-1 text-[10px]" style={{ color: "var(--ink4)" }}>
              {COPY.menu.perHead}
            </span>
          </div>
          <button
            onClick={() => onAdd(product)}
            disabled={!isAvailable}
            className="flex h-8 items-center gap-1 rounded-full px-4 text-xs font-semibold text-white transition-all hover:scale-105 disabled:opacity-40"
            style={{ background: "var(--accent)" }}
            aria-label={`${COPY.menu.addToCart} ${name}`}
          >
            <span className="text-sm">+</span> Add
          </button>
        </div>
      </div>
    </div>
  );
}
