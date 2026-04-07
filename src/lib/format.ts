import { CURRENCY_SYMBOLS, type Currency, type Money } from "@/domain.contract";

export function formatPrice(cents: Money, currency: Currency = "EGP"): string {
  const amount = (cents / 100).toFixed(2);
  if (currency === "EGP") return `${amount} EGP`;
  return `${CURRENCY_SYMBOLS[currency]}${amount}`;
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
