import { describe, it, expect } from "vitest";
import {
  calculateSubtotal,
  calculateDeliveryFee,
  calculateVat,
  buildOrderPricing,
} from "./pricing.service";
import type { PricingSettings, CartItem, Money } from "@/domain.contract";

const c = (n: number): Money => n as Money;
const S: PricingSettings = {
  currency: "USD",
  standardDeliveryInCents: c(499),
  expressDeliveryInCents: c(999),
  freeDeliveryThresholdInCents: c(5000),
  freeDeliveryEnabled: true,
  serviceFeeInCents: c(150),
  vatRatePercent: 15,
  vatEnabled: true,
  updatedAt: new Date().toISOString(),
};
const item = (price: number, qty: number): CartItem => ({
  productId: "p1",
  name: "Test",
  imageUrl: "https://x.com/i.jpg",
  priceInCents: c(price),
  quantity: qty,
  customizations: [],
  notes: "",
});

describe("calculateSubtotal", () => {
  it("returns 0 for empty cart", () =>
    expect(calculateSubtotal([])).toBe(0));
  it("sums a single item", () =>
    expect(calculateSubtotal([item(2800, 1)])).toBe(2800));
  it("multiplies quantity correctly", () =>
    expect(calculateSubtotal([item(2800, 2)])).toBe(5600));
  it("sums multiple items", () =>
    expect(calculateSubtotal([item(2800, 1), item(1200, 2)])).toBe(5200));
});

describe("calculateDeliveryFee", () => {
  it("charges standard below threshold", () =>
    expect(calculateDeliveryFee(c(2000), "standard", S)).toBe(499));
  it("charges express below threshold", () =>
    expect(calculateDeliveryFee(c(2000), "express", S)).toBe(999));
  it("is free exactly at threshold", () =>
    expect(calculateDeliveryFee(c(5000), "standard", S)).toBe(0));
  it("is free above threshold", () =>
    expect(calculateDeliveryFee(c(9000), "express", S)).toBe(0));
  it("ignores threshold when disabled", () =>
    expect(
      calculateDeliveryFee(c(9000), "standard", {
        ...S,
        freeDeliveryEnabled: false,
      }),
    ).toBe(499));
});

describe("calculateVat", () => {
  it("returns 0 when vatEnabled is false", () =>
    expect(
      calculateVat(c(5000), c(0), c(150), { ...S, vatEnabled: false }),
    ).toBe(0));
  it("calculates 15% correctly", () =>
    expect(calculateVat(c(5000), c(0), c(150), S)).toBe(773));
  it("rounds half-up", () =>
    expect(calculateVat(c(1000), c(0), c(0), S)).toBe(150));
});

describe("buildOrderPricing", () => {
  it("produces consistent grand total", () => {
    const pricing = buildOrderPricing([item(2800, 2)], "standard", S);
    expect(pricing.subtotalInCents).toBe(5600);
    expect(pricing.deliveryFeeInCents).toBe(0); // above free threshold
    expect(pricing.serviceFeeInCents).toBe(150);
    expect(pricing.vatInCents).toBe(863); // (5600+0+150)*0.15=862.5→863
    expect(pricing.grandTotalInCents).toBe(6613);
  });
});
