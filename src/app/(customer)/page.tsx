// Fields: Product[] via useProducts, Cart via useCart, activeCategory via useUIStore
"use client";

import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useUIStore } from "@/store/ui.store";
import { MenuHero } from "@/components/menu/MenuHero";
import { CategoryBar } from "@/components/menu/CategoryBar";
import { ProductGrid } from "@/components/menu/ProductGrid";
import { CartPanel } from "@/components/cart/CartPanel";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import type { ProductCategory } from "@/domain.contract";

export default function MenuPage() {
  const activeCategory = useUIStore((s) => s.activeCategory);
  const setActiveCategory = useUIStore((s) => s.setActiveCategory);
  const category = activeCategory === "All" ? undefined : (activeCategory as ProductCategory);
  const { data: products, isLoading, error, refetch } = useProducts(category);
  const cart = useCart();

  return (
    <>
      <div className="grid" style={{ gridTemplateColumns: "1fr 380px" }}>
        <main className="px-8 pb-16">
          <MenuHero />
          <CategoryBar active={activeCategory} onSelect={setActiveCategory} />
          <div className="mt-6">
            <ProductGrid
              products={products}
              isLoading={isLoading}
              error={error}
              onAdd={cart.addItem}
              currency={cart.currency}
              onRetry={() => void refetch()}
            />
          </div>
        </main>
        <CartPanel />
      </div>
      <CheckoutModal />
    </>
  );
}
