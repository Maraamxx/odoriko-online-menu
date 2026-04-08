// Fields: CartItem.name, imageUrl, priceInCents, quantity, productId, customizations, notes
"use client";

import { useState } from "react";
import Image from "next/image";
import type { CartItem as CartItemType, Currency, Money } from "@/domain.contract";
import { formatPrice } from "@/lib/format";
import { QuantityControl } from "./QuantityControl";
import { CartItemCustomize } from "./CartItemCustomize";
import { COPY } from "@/constants/copy";

interface CartItemProps {
  readonly item: CartItemType;
  readonly currency: Currency;
  readonly onRemove: (id: string) => void;
  readonly onUpdateQty: (id: string, qty: number) => void;
  readonly onToggleCustomization: (id: string, opt: string) => void;
  readonly onItemNotes: (id: string, notes: string) => void;
}

export function CartItem({ item, currency, onRemove, onUpdateQty, onToggleCustomization, onItemNotes }: CartItemProps) {
  const [showCustomize, setShowCustomize] = useState(false);
  const lineTotal = (item.priceInCents * item.quantity) as Money;
  const hasCustom = item.customizations.length > 0 || item.notes.length > 0;

  return (
    <div className="border-b py-3" style={{ borderColor: "var(--border)" }}>
      <div className="grid items-center gap-3" style={{ gridTemplateColumns: "56px 1fr" }}>
        <div className="relative h-14 w-14 overflow-hidden rounded-lg">
          <Image src={item.imageUrl} alt={item.name} fill sizes="56px" className="object-cover" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between">
            <span className="text-[13px] font-semibold" style={{ color: "var(--ink)" }}>{item.name}</span>
            <button onClick={() => onRemove(item.productId)}
              className="text-[20px] leading-none transition-colors hover:text-[var(--red)]"
              style={{ color: "var(--ink4)", border: "none", background: "none" }}
              aria-label={`Remove ${item.name}`}>
              &times;
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold" style={{ color: "var(--primary)" }}>
              {formatPrice(lineTotal, currency)}
            </span>
            <QuantityControl quantity={item.quantity} onChange={(qty) => onUpdateQty(item.productId, qty)} />
          </div>
          <button
            onClick={() => setShowCustomize(!showCustomize)}
            className="mt-0.5 self-start text-[10px] font-medium uppercase tracking-wider transition-colors hover:text-[var(--accent)]"
            style={{ color: hasCustom ? "var(--accent)" : "var(--ink4)" }}
          >
            {COPY.cart.customize} {hasCustom && `(${item.customizations.length})`}
          </button>
        </div>
      </div>
      {showCustomize && (
        <div className="mt-2 pl-[68px]">
          <CartItemCustomize
            productId={item.productId}
            customizations={item.customizations}
            notes={item.notes}
            onToggle={onToggleCustomization}
            onNotesChange={onItemNotes}
          />
        </div>
      )}
    </div>
  );
}
