import type {
  CartItem,
  DeliveryType,
  OrderPricing,
  PricingSettings,
  Money,
} from "@/domain.contract";

const cents = (n: number): Money => n as Money;

export function calculateSubtotal(items: CartItem[]): Money {
  return cents(
    items.reduce((sum, i) => sum + i.priceInCents * i.quantity, 0),
  );
}

export function calculateDeliveryFee(
  subtotal: Money,
  deliveryType: DeliveryType,
  settings: PricingSettings,
): Money {
  if (
    settings.freeDeliveryEnabled &&
    subtotal >= settings.freeDeliveryThresholdInCents
  ) {
    return cents(0);
  }
  return cents(
    deliveryType === "express"
      ? settings.expressDeliveryInCents
      : settings.standardDeliveryInCents,
  );
}

export function calculateVat(
  subtotal: Money,
  deliveryFee: Money,
  serviceFee: Money,
  settings: PricingSettings,
): Money {
  if (!settings.vatEnabled) return cents(0);
  return cents(
    Math.round(
      ((subtotal + deliveryFee + serviceFee) * settings.vatRatePercent) / 100,
    ),
  );
}

export function buildOrderPricing(
  items: CartItem[],
  deliveryType: DeliveryType,
  settings: PricingSettings,
): OrderPricing {
  const subtotalInCents = calculateSubtotal(items);
  const deliveryFeeInCents = calculateDeliveryFee(
    subtotalInCents,
    deliveryType,
    settings,
  );
  const serviceFeeInCents = cents(settings.serviceFeeInCents);
  const vatInCents = calculateVat(
    subtotalInCents,
    deliveryFeeInCents,
    serviceFeeInCents,
    settings,
  );
  const grandTotalInCents = cents(
    subtotalInCents + deliveryFeeInCents + serviceFeeInCents + vatInCents,
  );
  return {
    subtotalInCents,
    deliveryFeeInCents,
    serviceFeeInCents,
    vatInCents,
    grandTotalInCents,
  };
}
