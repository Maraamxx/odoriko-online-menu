// Fields: Product.name, Product.description, Product.priceInCents, Product.imageUrl,
//         Product.rating, Product.badge, Product.allergens, Product.isAvailable, Product.category
"use client";

import Image from "next/image";
import type { Product, Currency } from "@/domain.contract";
import { formatPrice } from "@/lib/format";
import { StarRating } from "@/components/ui";
import { AllergenList } from "./AllergenList";
import { COPY } from "@/constants/copy";
import type { Money } from "@/domain.contract";

interface ProductCardProps {
  readonly product: Product;
  readonly onAdd: (product: Product) => void;
  readonly currency: Currency;
}

export function ProductCard({ product, onAdd, currency }: ProductCardProps) {
  const { name, description, priceInCents, imageUrl, rating, badge, allergens, isAvailable, category } = product;

  return (
    <div
      className="group relative flex flex-col overflow-hidden border transition-all duration-300 hover:-translate-y-[3px]"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        borderRadius: 18,
        opacity: isAvailable ? 1 : 0.55,
      }}
    >
      {/* Image */}
      <div className="relative h-[162px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 226px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
          style={{ background: "var(--surface)", color: "var(--ink3)" }}>
          {category}
        </span>
        {badge && (
          <span className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold"
            style={{ background: "var(--teal)", color: "white" }}>
            {badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {name}
          </h3>
          <StarRating rating={rating} size="sm" />
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed" style={{ color: "var(--ink3)" }}>
          {description}
        </p>
        <AllergenList allergens={allergens} />
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="font-serif text-[22px] font-semibold" style={{ color: "var(--teal)" }}>
              {formatPrice(priceInCents as Money, currency)}
            </span>
            <span className="ml-1 text-xs" style={{ color: "var(--ink4)" }}>
              {COPY.menu.perHead}
            </span>
          </div>
          <button
            onClick={() => onAdd(product)}
            disabled={!isAvailable}
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-white shadow transition-transform hover:scale-110 disabled:opacity-40"
            style={{ background: "var(--teal)" }}
            aria-label={`${COPY.menu.addToCart} ${name}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
