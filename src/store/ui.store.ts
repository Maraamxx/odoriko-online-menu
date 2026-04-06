import { create } from "zustand";
import type { ProductCategory } from "@/domain.contract";

interface UIState {
  activeCategory: ProductCategory | "All";
  isCheckoutOpen: boolean;
  setActiveCategory: (cat: ProductCategory | "All") => void;
  openCheckout: () => void;
  closeCheckout: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeCategory: "All",
  isCheckoutOpen: false,
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
}));
