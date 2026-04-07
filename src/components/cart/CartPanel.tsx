// Fields: Cart items, pricing, settings, currency
"use client";

import { useCart } from "@/hooks/useCart";
import { useSettings } from "@/hooks/useSettings";
import { useUIStore } from "@/store/ui.store";
import { CartItem } from "./CartItem";
import { CartFooter } from "./CartFooter";
import { COPY } from "@/constants/copy";

export function CartPanel() {
  const cart = useCart();
  const settings = useSettings();
  const openCheckout = useUIStore((s) => s.openCheckout);

  return (
    <aside
      className="sticky top-16 flex flex-col overflow-y-auto border-l"
      style={{
        width: 380,
        height: "calc(100vh - 64px)",
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold" style={{ color: "var(--ink)" }}>
            {COPY.cart.title}
          </h2>
          <span
            className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
            style={{ borderColor: "var(--border2)", color: "var(--ink3)" }}
          >
            {cart.itemCount > 0 ? COPY.cart.items(cart.itemCount) : `0 items`}
          </span>
        </div>
        {cart.itemCount === 0 && (
          <p className="mt-0.5 text-xs" style={{ color: "var(--ink4)" }}>Select dishes to begin</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: "var(--surface2)" }}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--ink4)" strokeWidth={1.5}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <p className="text-sm font-medium" style={{ color: "var(--ink2)" }}>
              {COPY.cart.emptyTitle}
            </p>
            <p className="max-w-[200px] text-xs leading-relaxed" style={{ color: "var(--ink4)" }}>
              {COPY.cart.emptySub}
            </p>
          </div>
        ) : (
          cart.items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              currency={cart.currency}
              onRemove={cart.removeItem}
              onUpdateQty={cart.updateQty}
            />
          ))
        )}
      </div>

      {settings.data && (
        <div className="px-5 pb-5">
          <CartFooter
            pricing={cart.pricing}
            settings={settings.data}
            currency={cart.currency}
            itemCount={cart.itemCount}
            onCheckout={openCheckout}
          />
        </div>
      )}
    </aside>
  );
}
