import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Cart,
  CartItem,
  DeliveryType,
  PaymentMethod,
  Product,
} from "@/domain.contract";

interface CartState extends Cart {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  setDelivery: (type: DeliveryType) => void;
  setPayment: (method: PaymentMethod) => void;
  clearCart: () => void;
}

const EMPTY: Cart = {
  items: [],
  deliveryType: "standard",
  paymentMethod: "card",
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      ...EMPTY,

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === product.id,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }
          const newItem: CartItem = {
            productId: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            priceInCents: product.priceInCents,
            quantity: 1,
          };
          return { items: [...state.items, newItem] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQty: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0)
            return {
              items: state.items.filter((i) => i.productId !== productId),
            };
          return {
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, quantity } : i,
            ),
          };
        }),

      setDelivery: (deliveryType) => set({ deliveryType }),
      setPayment: (paymentMethod) => set({ paymentMethod }),
      clearCart: () => set(EMPTY),
    }),
    {
      name: "lumiere:cart",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? sessionStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
      ),
    },
  ),
);
