// Fields: OrderPricing.*, PricingSettings.vatRatePercent, PricingSettings.vatEnabled,
//         PricingSettings.freeDeliveryEnabled, PricingSettings.freeDeliveryThresholdInCents
"use client";

import type { OrderPricing, PricingSettings, Currency, Money } from "@/domain.contract";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui";
import { FreeDeliveryProgress } from "./FreeDeliveryProgress";
import { COPY } from "@/constants/copy";

interface CartFooterProps {
  readonly pricing: OrderPricing | null;
  readonly settings: PricingSettings;
  readonly currency: Currency;
  readonly itemCount: number;
  readonly onCheckout: () => void;
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-[15px] font-semibold" : "text-[12.5px]"}`}>
      <span style={{ color: bold ? "var(--ink)" : "var(--ink3)" }}>{label}</span>
      <span style={{ color: bold ? "var(--teal)" : "var(--ink2)", fontWeight: bold ? 600 : 500 }}>{value}</span>
    </div>
  );
}

export function CartFooter({ pricing, settings, currency, itemCount, onCheckout }: CartFooterProps) {
  if (!pricing) return null;

  const fmt = (cents: number) => formatPrice(cents as Money, currency);
  const isFreeDelivery = pricing.deliveryFeeInCents === 0;

  return (
    <div className="mt-auto flex flex-col gap-3 border-t pt-4" style={{ borderColor: "var(--border)" }}>
      {settings.freeDeliveryEnabled && (
        <FreeDeliveryProgress
          subtotalInCents={pricing.subtotalInCents as Money}
          thresholdInCents={settings.freeDeliveryThresholdInCents as Money}
          currency={currency}
        />
      )}
      <div className="flex flex-col gap-1.5">
        <Row label={COPY.cart.subtotal} value={fmt(pricing.subtotalInCents)} />
        <Row
          label={COPY.cart.delivery}
          value={isFreeDelivery ? COPY.cart.complimentary : fmt(pricing.deliveryFeeInCents)}
        />
        <Row label={COPY.cart.serviceFee} value={fmt(pricing.serviceFeeInCents)} />
        {settings.vatEnabled && (
          <Row label={COPY.cart.vat(settings.vatRatePercent)} value={fmt(pricing.vatInCents)} />
        )}
        <div className="my-1 border-t" style={{ borderColor: "var(--border)" }} />
        <Row label={COPY.cart.total} value={fmt(pricing.grandTotalInCents)} bold />
      </div>
      <Button
        onClick={onCheckout}
        disabled={itemCount === 0}
        className="w-full tracking-[0.04em]"
        size="lg"
      >
        {COPY.cart.checkout}
      </Button>
    </div>
  );
}
