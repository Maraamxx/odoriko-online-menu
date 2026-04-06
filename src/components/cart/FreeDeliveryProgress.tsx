// Fields: Money (subtotalInCents, thresholdInCents), Currency
import type { Money, Currency } from "@/domain.contract";
import { formatPrice } from "@/lib/format";
import { ProgressBar } from "@/components/ui";
import { COPY } from "@/constants/copy";

interface FreeDeliveryProgressProps {
  readonly subtotalInCents: Money;
  readonly thresholdInCents: Money;
  readonly currency: Currency;
}

export function FreeDeliveryProgress({
  subtotalInCents,
  thresholdInCents,
  currency,
}: FreeDeliveryProgressProps) {
  const percent = Math.min(100, (subtotalInCents / thresholdInCents) * 100);
  const isFree = subtotalInCents >= thresholdInCents;
  const remaining = (thresholdInCents - subtotalInCents) as Money;

  return (
    <div
      className="rounded-lg border p-3"
      style={{ background: "var(--teal-pale)", borderColor: "var(--teal-pale2)" }}
    >
      <p className="mb-2 text-xs font-medium" style={{ color: "var(--teal)" }}>
        {isFree
          ? COPY.cart.freeEarned
          : COPY.cart.freeProgress(formatPrice(remaining, currency))}
      </p>
      <ProgressBar percent={percent} />
    </div>
  );
}
