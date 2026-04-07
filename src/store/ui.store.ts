import { create } from "zustand";
import type { ProductCategory } from "@/domain.contract";

interface UIState {
  activeCategory: ProductCategory | "All";
  isCheckoutOpen: boolean;
  isCartOpen: boolean;
  setActiveCategory: (cat: ProductCategory | "All") => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeCategory: "All",
  isCheckoutOpen: false,
  isCartOpen: false,
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
}));
