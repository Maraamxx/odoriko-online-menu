// Fields: CartItem.name, CartItem.imageUrl, CartItem.priceInCents, CartItem.quantity, CartItem.productId
"use client";

import Image from "next/image";
import type { CartItem as CartItemType, Currency, Money } from "@/domain.contract";
import { formatPrice } from "@/lib/format";
import { QuantityControl } from "./QuantityControl";

interface CartItemProps {
  readonly item: CartItemType;
  readonly currency: Currency;
  readonly onRemove: (id: string) => void;
  readonly onUpdateQty: (id: string, qty: number) => void;
}

export function CartItem({ item, currency, onRemove, onUpdateQty }: CartItemProps) {
  const lineTotal = (item.priceInCents * item.quantity) as Money;

  return (
    <div
      className="grid items-center gap-3 py-3"
      style={{ gridTemplateColumns: "56px 1fr", borderBottom: "1px solid var(--border)" }}
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-lg">
        <Image src={item.imageUrl} alt={item.name} fill sizes="56px" className="object-cover" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between">
          <span className="text-[13px] font-semibold" style={{ color: "var(--ink)" }}>
            {item.name}
          </span>
          <button
            onClick={() => onRemove(item.productId)}
            className="text-[20px] leading-none transition-colors hover:text-[var(--red)]"
            style={{ color: "var(--ink4)", border: "none", background: "none" }}
            aria-label={`Remove ${item.name}`}
          >
            &times;
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold" style={{ color: "var(--primary)" }}>
            {formatPrice(lineTotal, currency)}
          </span>
          <QuantityControl
            quantity={item.quantity}
            onChange={(qty) => onUpdateQty(item.productId, qty)}
          />
        </div>
      </div>
    </div>
  );
}
