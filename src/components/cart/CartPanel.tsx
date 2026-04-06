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
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
          {COPY.cart.title}
        </h2>
        {cart.itemCount > 0 && (
          <span className="text-xs" style={{ color: "var(--ink4)" }}>
            {COPY.cart.items(cart.itemCount)}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <span className="text-3xl">&#x1F6D2;</span>
            <p className="text-sm font-medium" style={{ color: "var(--ink2)" }}>
              {COPY.cart.emptyTitle}
            </p>
            <p className="text-xs" style={{ color: "var(--ink4)" }}>
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
