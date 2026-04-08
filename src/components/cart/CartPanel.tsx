// Fields: Cart items, pricing, settings, currency, orderNotes, customizations
"use client";

import { useCart } from "@/hooks/useCart";
import { useSettings } from "@/hooks/useSettings";
import { useUIStore } from "@/store/ui.store";
import { useCartStore } from "@/store/cart.store";
import { CartItem } from "./CartItem";
import { CartFooter } from "./CartFooter";
import { COPY } from "@/constants/copy";

export function CartPanel() {
  const cart = useCart();
  const settings = useSettings();
  const openCheckout = useUIStore((s) => s.openCheckout);
  const isCartOpen = useUIStore((s) => s.isCartOpen);
  const closeCart = useUIStore((s) => s.closeCart);
  const orderNotes = useCartStore((s) => s.orderNotes);
  const setOrderNotes = useCartStore((s) => s.setOrderNotes);
  const toggleCustomization = useCartStore((s) => s.toggleCustomization);
  const setItemNotes = useCartStore((s) => s.setItemNotes);

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 transition-opacity" onClick={closeCart} />
      )}

      <aside
        className="fixed right-0 top-16 z-50 flex w-full flex-col border-l transition-transform duration-300 sm:w-[380px]"
        style={{
          maxHeight: "calc(100vh - 64px)",
          background: "var(--surface)",
          borderColor: "var(--border)",
          transform: isCartOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-baseline gap-2">
            <h2 className="font-serif text-lg font-bold" style={{ color: "var(--ink)" }}>{COPY.cart.title}</h2>
            <span className="text-xs" style={{ color: "var(--ink4)" }}>{COPY.cart.titleJa}</span>
          </div>
          <div className="flex items-center gap-3">
            {cart.itemCount > 0 && (
              <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: "var(--accent-pale)", color: "var(--accent)" }}>
                {COPY.cart.items(cart.itemCount)}
              </span>
            )}
            <button onClick={closeCart} className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[var(--surface2)]" style={{ color: "var(--ink3)" }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* Items — scrollable, shrinks to fit */}
        <div className="flex-1 overflow-y-auto px-5">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "var(--surface2)" }}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--ink4)" strokeWidth={1.5}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--ink2)" }}>{COPY.cart.emptyTitle}</p>
              <p className="max-w-[200px] text-xs leading-relaxed" style={{ color: "var(--ink4)" }}>{COPY.cart.emptySub}</p>
            </div>
          ) : (
            <>
              {cart.items.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  currency={cart.currency}
                  onRemove={cart.removeItem}
                  onUpdateQty={cart.updateQty}
                  onToggleCustomization={toggleCustomization}
                  onItemNotes={setItemNotes}
                />
              ))}
              {/* Order notes */}
              <div className="mt-3 pb-3">
                <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--ink4)" }}>
                  {COPY.cart.orderNotes}
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder={COPY.cart.orderNotesHint}
                  rows={2}
                  className="w-full resize-none rounded-lg border px-3 py-2 text-xs leading-relaxed"
                  style={{ borderColor: "var(--border)", color: "var(--ink3)" }}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {settings.data && (
          <div className="px-5 pb-5">
            <CartFooter
              pricing={cart.pricing}
              settings={settings.data}
              currency={cart.currency}
              itemCount={cart.itemCount}
              onCheckout={openCheckout}
              onAddMore={closeCart}
            />
          </div>
        )}
      </aside>
    </>
  );
}
