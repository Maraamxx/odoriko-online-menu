// Fields: OrderPricing.*, CartItem[], PricingSettings.vatRatePercent, PricingSettings.vatEnabled
import type { CartItem, OrderPricing, PricingSettings, Currency, Money } from "@/domain.contract";
import { formatPrice } from "@/lib/format";
import { COPY } from "@/constants/copy";

interface OrderSummaryProps {
  readonly items: CartItem[];
  readonly pricing: OrderPricing;
  readonly currency: Currency;
  readonly settings: PricingSettings;
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-sm font-semibold" : "text-xs"}`}>
      <span style={{ color: bold ? "var(--ink)" : "var(--ink3)" }}>{label}</span>
      <span style={{ color: bold ? "var(--teal)" : "var(--ink2)" }}>{value}</span>
    </div>
  );
}

export function OrderSummary({ items, pricing, currency, settings }: OrderSummaryProps) {
  const fmt = (cents: number) => formatPrice(cents as Money, currency);

  return (
    <div className="flex flex-col gap-3 rounded-xl p-4" style={{ background: "var(--surface2)" }}>
      {items.map((item) => (
        <div key={item.productId} className="flex justify-between text-xs">
          <span style={{ color: "var(--ink2)" }}>
            {item.name} &times; {item.quantity}
          </span>
          <span style={{ color: "var(--ink2)" }}>
            {fmt(item.priceInCents * item.quantity)}
          </span>
        </div>
      ))}
      <div className="border-t pt-2" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-col gap-1.5">
          <Row label={COPY.cart.subtotal} value={fmt(pricing.subtotalInCents)} />
          <Row
            label={COPY.cart.delivery}
            value={pricing.deliveryFeeInCents === 0 ? COPY.cart.complimentary : fmt(pricing.deliveryFeeInCents)}
          />
          <Row label={COPY.cart.serviceFee} value={fmt(pricing.serviceFeeInCents)} />
          {settings.vatEnabled && (
            <Row label={COPY.cart.vat(settings.vatRatePercent)} value={fmt(pricing.vatInCents)} />
          )}
          <div className="my-1 border-t" style={{ borderColor: "var(--border)" }} />
          <Row label={COPY.cart.total} value={fmt(pricing.grandTotalInCents)} bold />
        </div>
      </div>
    </div>
  );
}
