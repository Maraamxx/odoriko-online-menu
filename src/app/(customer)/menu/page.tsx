// Fields: Product[] via useProducts, Cart via useCart, activeCategory via useUIStore
"use client";

import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useUIStore } from "@/store/ui.store";
import { MenuHero } from "@/components/menu/MenuHero";
import { CategoryBar } from "@/components/menu/CategoryBar";
import { ProductGrid } from "@/components/menu/ProductGrid";
import { AllergenLegend } from "@/components/menu/AllergenLegend";
import { CartPanel } from "@/components/cart/CartPanel";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import type { ProductCategory } from "@/domain.contract";
import { COPY } from "@/constants/copy";

export default function MenuPage() {
  const activeCategory = useUIStore((s) => s.activeCategory);
  const setActiveCategory = useUIStore((s) => s.setActiveCategory);
  const category = activeCategory === "All" ? undefined : (activeCategory as ProductCategory);
  const { data: products, isLoading, error, refetch } = useProducts(category);
  const cart = useCart();

  return (
    <>
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-20 sm:px-6">
        <MenuHero />
        <CategoryBar active={activeCategory} onSelect={setActiveCategory} />
        <div className="mt-4">
          <AllergenLegend />
        </div>
        <div className="mt-8">
          <div className="mb-5 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <h2 className="font-serif text-2xl font-bold uppercase tracking-tight" style={{ color: "var(--ink)" }}>
                {activeCategory === "All" ? "Full Menu" : activeCategory}
              </h2>
              <span className="font-serif text-sm" style={{ color: "var(--ink4)" }}>
                {activeCategory === "All" ? "全メニュー" : COPY.categoryJa[activeCategory] ?? ""}
              </span>
            </div>
            {products && (
              <span className="text-xs font-medium" style={{ color: "var(--ink4)" }}>
                {products.length} {COPY.menu.available}
              </span>
            )}
          </div>
          <ProductGrid
            products={products}
            isLoading={isLoading}
            error={error}
            onAdd={(product) => { cart.addItem(product); useUIStore.getState().openCart(); }}
            currency={cart.currency}
            onRetry={() => void refetch()}
          />
        </div>
      </main>
      <CartPanel />
      <CheckoutModal />
    </>
  );
}
