import type {
  CartItem,
  DeliveryType,
  OrderPricing,
  PricingSettings,
  Money,
} from "@/domain.contract";

/** Compute subtotal from cart items (sum of price * quantity). */
export function computeSubtotal(items: CartItem[]): Money {
  return items.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
    0,
  ) as Money;
}

/** Resolve the delivery fee based on type, subtotal, and settings. */
export function resolveDeliveryFee(
  deliveryType: DeliveryType,
  subtotalInCents: Money,
  settings: PricingSettings,
): Money {
  if (
    settings.freeDeliveryEnabled &&
    subtotalInCents >= settings.freeDeliveryThresholdInCents
  ) {
    return 0 as Money;
  }
  return (deliveryType === "express"
    ? settings.expressDeliveryInCents
    : settings.standardDeliveryInCents) as Money;
}

/** Compute VAT on (subtotal + serviceFee). Delivery is VAT-exempt. */
export function computeVat(
  subtotalInCents: number,
  serviceFeeInCents: number,
  settings: PricingSettings,
): Money {
  if (!settings.vatEnabled) return 0 as Money;
  return Math.round(
    ((subtotalInCents + serviceFeeInCents) * settings.vatRatePercent) / 100,
  ) as Money;
}

/** Build the full OrderPricing object from cart items + settings. */
export function buildOrderPricing(
  items: CartItem[],
  deliveryType: DeliveryType,
  settings: PricingSettings,
): OrderPricing {
  const subtotalInCents = computeSubtotal(items);
  const deliveryFeeInCents = resolveDeliveryFee(
    deliveryType,
    subtotalInCents,
    settings,
  );
  const serviceFeeInCents = settings.serviceFeeInCents as Money;
  const vatInCents = computeVat(subtotalInCents, serviceFeeInCents, settings);
  const grandTotalInCents = (subtotalInCents +
    deliveryFeeInCents +
    serviceFeeInCents +
    vatInCents) as Money;

  return {
    subtotalInCents,
    deliveryFeeInCents,
    serviceFeeInCents,
    vatInCents,
    grandTotalInCents,
  };
}
