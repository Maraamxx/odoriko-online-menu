/**
 * domain.contract.ts
 * ==================
 * Single source of truth for all data types in Lumière.
 *
 * RULES:
 *   1. Only import from 'zod'. Nothing else.
 *   2. Every TypeScript type is z.infer<typeof Schema>. No hand-written types.
 *   3. Every field a UI component renders must exist here BEFORE the component is built.
 *   4. No seed data. No default values. No constructor helpers. Those live in mocks/db.ts and lib/.
 *   5. Bump SCHEMA_VERSION and add a comment when making a breaking change.
 *   6. This file maps 1:1 to the Prisma schema when the backend is built.
 *
 * VERSION HISTORY:
 *   v1  initial — products, cart, orders, settings, auth, dashboard
 */

import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// VERSION
// ─────────────────────────────────────────────────────────────────────────────

export const SCHEMA_VERSION = 1;

// ─────────────────────────────────────────────────────────────────────────────
// BRANDED PRIMITIVES
// Prevent ID mix-ups at the type level. Money enforces cents-only storage.
// ─────────────────────────────────────────────────────────────────────────────

export type ProductId = string & { readonly _brand: "ProductId" };
export type CategoryId = string & { readonly _brand: "CategoryId" };
export type OrderId = string & { readonly _brand: "OrderId" };
export type UserId = string & { readonly _brand: "UserId" };

/**
 * Money — always stored and computed as integer cents.
 * $28.00 = 2800. $4.99 = 499.
 * Display via formatPrice(cents, currency) in lib/format.ts — never inline.
 */
export type Money = number & { readonly _brand: "Money" };

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// Defined as const tuples → Zod enum → inferred TS type.
// Display labels colocated so they never drift from the enum values.
// ─────────────────────────────────────────────────────────────────────────────

export const CURRENCIES = ["EGP", "USD", "EUR", "GBP"] as const;
export type Currency = (typeof CURRENCIES)[number];
export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EGP: "EGP",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export const PRODUCT_CATEGORIES = [
  "Starters",
  "Salads",
  "Soups & Ramen",
  "From the Wok",
  "Dim Sum & Bao",
  "Skewers",
  "Robatayaki",
  "Sushi",
  "Sides",
  "Breakfast",
  "Desserts",
  "Beverages",
] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const ALLERGENS = ["G", "D", "E", "S", "F", "N"] as const;
export type Allergen = (typeof ALLERGENS)[number];
export const ALLERGEN_LABELS: Record<Allergen, string> = {
  G: "Gluten",
  D: "Dairy",
  E: "Egg",
  S: "Sulphites",
  F: "Fish",
  N: "Nuts",
};

export const DELIVERY_TYPES = ["standard", "express"] as const;
export type DeliveryType = (typeof DELIVERY_TYPES)[number];
export const DELIVERY_LABELS: Record<DeliveryType, string> = {
  standard: "Standard",
  express: "Express",
};
export const DELIVERY_ETA: Record<DeliveryType, string> = {
  standard: "35–50 min",
  express: "15–20 min",
};

export const PAYMENT_METHODS = ["card", "apple-pay", "cash"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  card: "Credit card",
  "apple-pay": "Apple Pay",
  cash: "Cash on delivery",
};

export const ORDER_STATUSES = [
  "pending",
  "preparing",
  "on-way",
  "delivered",
  "cancelled",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  preparing: "Preparing",
  "on-way": "En Route",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
/** Statuses that can no longer be changed. */
export const ORDER_STATUS_TERMINAL = new Set<OrderStatus>([
  "delivered",
  "cancelled",
]);
/** Ordered sequence shown in the tracker UI (excludes cancelled). */
export const ORDER_TRACKER_STEPS: OrderStatus[] = [
  "pending",
  "preparing",
  "on-way",
  "delivered",
];

export const USER_ROLES = ["customer", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

// ─────────────────────────────────────────────────────────────────────────────
// ENTITY SCHEMAS
// One schema per entity. z.infer derives the TypeScript type.
// Field names match exactly what the API returns and what the UI renders.
// ─────────────────────────────────────────────────────────────────────────────

// ── Product ──────────────────────────────────────────────────────────────────
// Fields confirmed by: Screen 01 (ProductCard), Screen 02 (CategoryBar),
//                      Screen 11 (AdminProductRow), Screen 12 (AddProductForm)

export const ProductSchema = z.object({
  id: z.string().min(1),
  categoryId: z.string().min(1),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  category: z.enum(PRODUCT_CATEGORIES),
  priceInCents: z.number().int().positive(),
  imageUrl: z.string().min(1),
  rating: z.number().min(0).max(5),
  badge: z.string().max(30).nullable(),
  allergens: z.array(z.enum(ALLERGENS)),
  isAvailable: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Product = z.infer<typeof ProductSchema>;
export const ProductArraySchema = z.array(ProductSchema);

// ── Cart ─────────────────────────────────────────────────────────────────────
// Fields confirmed by: Screen 03 (CartItem), Screen 04 (CartFooter)

export const CartItemSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1), // snapshot — frozen at add-time
  imageUrl: z.string().min(1), // snapshot
  priceInCents: z.number().int().positive(), // snapshot — frozen at add-time
  quantity: z.number().int().min(1).max(99),
});
export type CartItem = z.infer<typeof CartItemSchema>;

export const CartSchema = z.object({
  items: z.array(CartItemSchema),
  deliveryType: z.enum(DELIVERY_TYPES),
  paymentMethod: z.enum(PAYMENT_METHODS),
});
export type Cart = z.infer<typeof CartSchema>;

// ── Order ─────────────────────────────────────────────────────────────────────
// Fields confirmed by: Screen 08 (OrderSummary), Screen 09 (Confirmation),
//                      Screen 10 (AdminOrderRow)

export const DeliveryAddressSchema = z.object({
  firstName: z.string().min(1, "Required").max(50),
  lastName: z.string().min(1, "Required").max(50),
  street: z.string().min(5, "Enter a full address").max(200),
  city: z.string().min(1, "Required").max(100),
  postalCode: z.string().min(3, "Required").max(20),
  phone: z.string().min(8, "Enter a valid phone number").max(20),
});
export type DeliveryAddress = z.infer<typeof DeliveryAddressSchema>;

export const OrderPricingSchema = z.object({
  subtotalInCents: z.number().int().min(0),
  deliveryFeeInCents: z.number().int().min(0),
  serviceFeeInCents: z.number().int().min(0),
  vatInCents: z.number().int().min(0),
  grandTotalInCents: z.number().int().positive(),
});
export type OrderPricing = z.infer<typeof OrderPricingSchema>;

export const OrderSchema = z.object({
  id: z.string().min(1),
  status: z.enum(ORDER_STATUSES),
  deliveryType: z.enum(DELIVERY_TYPES),
  paymentMethod: z.enum(PAYMENT_METHODS),
  items: z.array(CartItemSchema), // snapshot — immutable after placement
  pricing: OrderPricingSchema,
  address: DeliveryAddressSchema,
  customerName: z.string().min(1),
  notes: z.string().max(500).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Order = z.infer<typeof OrderSchema>;
export const OrderArraySchema = z.array(OrderSchema);

// ── Pricing Settings ──────────────────────────────────────────────────────────
// Fields confirmed by: Screen 04 (CartFooter), Screen 06 (DeliveryOptions),
//                      Screen 13 (SettingsCards)

export const PricingSettingsSchema = z.object({
  currency: z.enum(CURRENCIES),
  standardDeliveryInCents: z.number().int().min(0),
  expressDeliveryInCents: z.number().int().min(0),
  freeDeliveryThresholdInCents: z.number().int().min(0),
  freeDeliveryEnabled: z.boolean(),
  serviceFeeInCents: z.number().int().min(0),
  vatRatePercent: z.number().min(0).max(100),
  vatEnabled: z.boolean(),
  updatedAt: z.string().datetime(),
});
export type PricingSettings = z.infer<typeof PricingSettingsSchema>;

// ── User ──────────────────────────────────────────────────────────────────────

export const UserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1).nullable(),
  role: z.enum(USER_ROLES),
  createdAt: z.string().datetime(),
});
export type User = z.infer<typeof UserSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// INPUT SCHEMAS
// What the UI submits. Server sets id, createdAt, updatedAt.
// ─────────────────────────────────────────────────────────────────────────────

export const CreateProductInputSchema = z.object({
  categoryId: z.string().min(1, "Select a category"),
  name: z.string().min(1, "Name is required").max(100, "Too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Too long"),
  category: z.enum(PRODUCT_CATEGORIES, { error: "Select a category" }),
  priceInCents: z
    .number({ error: "Enter a valid price" })
    .int()
    .positive("Must be positive"),
  imageUrl: z.string().min(1, "Enter an image URL"),
  rating: z.number().min(0).max(5).default(0),
  badge: z.string().max(30).nullable().default(null),
  allergens: z.array(z.enum(ALLERGENS)).default([]),
});
export type CreateProductInput = z.infer<typeof CreateProductInputSchema>;

export const UpdateProductInputSchema = CreateProductInputSchema.partial();
export type UpdateProductInput = z.infer<typeof UpdateProductInputSchema>;

export const CreateOrderInputSchema = z.object({
  items: z.array(CartItemSchema).min(1, "Cart is empty"),
  deliveryType: z.enum(DELIVERY_TYPES),
  paymentMethod: z.enum(PAYMENT_METHODS),
  address: DeliveryAddressSchema,
  notes: z.string().max(500).nullable().default(null),
});
export type CreateOrderInput = z.infer<typeof CreateOrderInputSchema>;

export const UpdateOrderStatusInputSchema = z.object({
  status: z.enum(ORDER_STATUSES),
});
export type UpdateOrderStatusInput = z.infer<
  typeof UpdateOrderStatusInputSchema
>;

export const UpdatePricingSettingsInputSchema = PricingSettingsSchema.omit({
  updatedAt: true,
}).partial();
export type UpdatePricingSettingsInput = z.infer<
  typeof UpdatePricingSettingsInputSchema
>;

/**
 * CardDetails — collected in UI for user confidence. Never sent to server.
 * Payment processing is out of scope for this prototype.
 */
export const CardDetailsSchema = z.object({
  number: z.string().min(16, "Invalid card number").max(19),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Use MM/YY"),
  cvc: z.string().min(3, "Invalid CVC").max(4),
  holder: z.string().min(1, "Required"),
});
export type CardDetails = z.infer<typeof CardDetailsSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// COMPUTED / RESPONSE SCHEMAS
// Not stored entities — derived by the server or computed client-side.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * DashboardStats — confirmed by Screen 14.
 * Computed from orders collection. Has no database table.
 */
export const DashboardStatsSchema = z.object({
  revenueInCents: z.number().int().min(0),
  revenueChangePercent: z.number(), // e.g. 14.2 means +14.2% vs last week
  totalOrders: z.number().int().min(0),
  newOrdersToday: z.number().int().min(0),
  activeOrders: z.number().int().min(0), // preparing + on-way
  availableProducts: z.number().int().min(0),
  hiddenProducts: z.number().int().min(0),
});
export type DashboardStats = z.infer<typeof DashboardStatsSchema>;

/**
 * Paginated wrapper — used by orders and products list endpoints.
 * Prototype uses plain arrays; real API uses this shape.
 */
export const PaginatedSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    total: z.number().int().min(0),
    page: z.number().int().min(1),
    perPage: z.number().int().min(1),
    hasMore: z.boolean(),
  });

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// API ERROR SCHEMA
// Shape of all error responses from the API (and from MSW error handlers).
// ─────────────────────────────────────────────────────────────────────────────

export const ApiErrorSchema = z.object({
  error: z.string(), // machine code e.g. "PRODUCT_NOT_FOUND"
  message: z.string(), // human message for logging
  details: z.unknown().optional(),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;
