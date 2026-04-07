// Fields: DeliveryType, PricingSettings.standardDeliveryInCents, expressDeliveryInCents
"use client";

import {
  DELIVERY_TYPES,
  DELIVERY_LABELS,
  DELIVERY_ETA,
  type DeliveryType,
  type PricingSettings,
  type Currency,
  type Money,
} from "@/domain.contract";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

interface DeliveryOptionsProps {
  readonly selected: DeliveryType;
  readonly settings: PricingSettings;
  readonly subtotal: Money;
  readonly currency: Currency;
  readonly onSelect: (t: DeliveryType) => void;
}

export function DeliveryOptions({ selected, settings, subtotal, currency, onSelect }: DeliveryOptionsProps) {
  const isFree = settings.freeDeliveryEnabled && subtotal >= settings.freeDeliveryThresholdInCents;

  const fee = (type: DeliveryType): string => {
    if (isFree) return "Free";
    const cents = type === "express" ? settings.expressDeliveryInCents : settings.standardDeliveryInCents;
    return formatPrice(cents as Money, currency);
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {DELIVERY_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={cn(
            "flex flex-col gap-1 rounded-xl border p-4 text-left transition-colors",
            selected === type
              ? "border-[var(--primary)] bg-[var(--primary-pale)]"
              : "border-[var(--border)] hover:border-[var(--primary)]",
          )}
        >
          <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
            {DELIVERY_LABELS[type]}
          </span>
          <span className="text-xs" style={{ color: "var(--ink3)" }}>
            {DELIVERY_ETA[type]}
          </span>
          <span className="text-xs font-medium" style={{ color: "var(--primary)" }}>
            {fee(type)}
          </span>
        </button>
      ))}
    </div>
  );
}
