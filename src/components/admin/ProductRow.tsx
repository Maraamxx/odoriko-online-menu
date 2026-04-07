// Fields: Product.imageUrl, name, description, category, rating, priceInCents, isAvailable
"use client";

import Image from "next/image";
import type { Product, ProductId, Currency, Money } from "@/domain.contract";
import { formatPrice } from "@/lib/format";
import { Badge, Button } from "@/components/ui";
import { COPY } from "@/constants/copy";

interface ProductRowProps {
  readonly product: Product;
  readonly currency: Currency;
  readonly onToggle: (id: ProductId) => void;
  readonly onDelete: (id: ProductId) => void;
  readonly onEdit: (product: Product) => void;
}

export function ProductRow({ product, currency, onToggle, onDelete, onEdit }: ProductRowProps) {
  return (
    <tr className="border-b text-sm" style={{ borderColor: "var(--border)" }}>
      <td className="py-3 pr-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-lg">
          <Image src={product.imageUrl} alt={product.name} fill sizes="40px" className="object-cover" />
        </div>
      </td>
      <td className="py-3 pr-4 font-medium" style={{ color: "var(--ink)" }}>{product.name}</td>
      <td className="py-3 pr-4" style={{ color: "var(--ink3)" }}>{product.category}</td>
      <td className="py-3 pr-4" style={{ color: "var(--ink4)" }}>{product.rating.toFixed(1)}</td>
      <td className="py-3 pr-4 font-medium" style={{ color: "var(--ink)" }}>
        {formatPrice(product.priceInCents as Money, currency)}
      </td>
      <td className="py-3 pr-4">
        <Badge variant={product.isAvailable ? "success" : "neutral"}>
          {product.isAvailable ? COPY.admin.products.live : COPY.admin.products.hidden}
        </Badge>
      </td>
      <td className="py-3">
        <div className="flex gap-2">
          <button onClick={() => onEdit(product)} className="text-xs font-medium" style={{ color: "var(--primary)" }}>Edit</button>
          <Button variant="secondary" size="sm" onClick={() => onToggle(product.id as ProductId)}>
            {product.isAvailable ? COPY.admin.products.hide : COPY.admin.products.show}
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(product.id as ProductId)}>
            {COPY.admin.products.delete}
          </Button>
        </div>
      </td>
    </tr>
  );
}
