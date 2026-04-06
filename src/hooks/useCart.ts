import { useCartStore } from "@/store/cart.store";
import { useSettings } from "./useSettings";
import { buildOrderPricing } from "@/services/pricing.service";

export function useCart() {
  const cart = useCartStore();
  const settings = useSettings();

  const pricing = settings.data
    ? buildOrderPricing(cart.items, cart.deliveryType, settings.data)
    : null;

  const itemCount = cart.items.reduce((n, i) => n + i.quantity, 0);
  const isAboveMin =
    pricing !== null && settings.data !== undefined
      ? pricing.subtotalInCents >= settings.data.freeDeliveryThresholdInCents
      : false;

  return {
    ...cart,
    pricing,
    itemCount,
    currency: settings.data?.currency ?? "USD",
    isAboveMin,
    settingsReady: settings.isSuccess,
  };
}
