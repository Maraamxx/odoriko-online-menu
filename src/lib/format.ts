import { CURRENCY_SYMBOLS, type Currency, type Money } from "@/domain.contract";

export function formatPrice(cents: Money, currency: Currency = "USD"): string {
  return `${CURRENCY_SYMBOLS[currency]}${(cents / 100).toFixed(2)}`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function formatPercent(n: number): string {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}
