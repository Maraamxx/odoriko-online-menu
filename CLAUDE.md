@AGENTS.md

# CLAUDE.md — ODORIKO · Agent Reference

> Read this at the start of every session before writing a single line of code.
> State which step you are on, run `tsc --noEmit`, then proceed.

---

## Project

**ODORIKO** is a single-restaurant ordering system — not a SaaS platform, not multi-tenant.
One restaurant. One menu. One settings object.

| Layer        | Technology                                           |
|--------------|------------------------------------------------------|
| Frontend     | Next.js 14 (App Router) · TypeScript strict          |
| Styling      | Tailwind CSS · CSS custom properties (no Tailwind color tokens — use `var(--*)` directly) |
| Mock layer   | MSW 2 — runs in browser, controlled by `NEXT_PUBLIC_USE_MSW` |
| Server state | TanStack Query v5                                    |
| UI state     | Zustand v4 (cart: sessionStorage persist · UI: in-memory) |
| Validation   | Zod v3 — schema is source of truth, types are inferred |
| Forms        | React Hook Form + `@hookform/resolvers/zod`          |
| HTTP         | ky — thin typed fetch wrapper                        |
| IDs          | nanoid — never `crypto.randomUUID()`                 |
| Fonts        | Cormorant Garamond (serif) · Work Sans (sans)        |

---

## File map

```
src/
  domain.contract.ts          ← schemas + inferred types + enums. No seed data. No imports except zod.
  lib/
    cn.ts                     ← clsx + tailwind-merge
    format.ts                 ← formatPrice(cents, currency), formatDate, formatPercent
    error.ts                  ← AppError class + handleError (toast-only, no router)
    api-client.ts             ← apiFetch / apiMutate / apiDelete
  mocks/
    db.ts                     ← in-memory store + ALL seed data (12 products, 5 orders, settings)
    browser.ts                ← MSW worker setup
    server.ts                 ← MSW server setup (tests)
    handlers/
      product.handlers.ts
      order.handlers.ts
      settings.handlers.ts
      dashboard.handlers.ts
  constants/
    copy.ts                   ← every UI string
    routes.ts                 ← all route paths
    api-endpoints.ts          ← all API URL strings
    query-keys.ts             ← TanStack Query key factory
  services/
    pricing.service.ts        ← pure functions. no side effects. tested immediately.
  store/
    cart.store.ts             ← Zustand + sessionStorage persist
    ui.store.ts               ← activeCategory, isCheckoutOpen — in-memory only
  hooks/
    useProducts.ts
    useOrders.ts
    useSettings.ts
    useDashboardStats.ts
    useCart.ts                ← reads cart store + computes pricing
    useCheckout.ts            ← orchestrates full checkout flow
  repositories/
    interfaces/               ← IProductRepository, IOrderRepository, ISettingsRepository
    http/                     ← HttpProductRepository etc — thin fetch wrappers
  components/
    ui/                       ← Button, Badge, Input, Toggle, Modal, StarRating, ProgressBar, Spinner
    errors/                   ← SectionError, ErrorBoundary
    layout/                   ← TopBar, ViewToggle
    menu/                     ← MenuHero, CategoryBar, ProductCard, ProductGrid, AllergenList
    cart/                     ← CartPanel, CartItem, QuantityControl, CartFooter, FreeDeliveryProgress
    checkout/                 ← CheckoutModal, DeliveryAddressForm, DeliveryOptions,
    |                            PaymentOptions, CardDetailsForm, OrderSummary
    admin/                    ← AdminSidebar, StatCard, OrderRow, OrdersTable, StatusBadge,
    |                            ProductRow, ProductsTable, AddProductForm,
    |                            SettingsRow, DeliveryRatesCard, ServiceFeeCard,
    |                            VatConfigCard, TaxSnapshotCard
  app/
    layout.tsx                ← QueryClient + MSW init (client-only)
    error.tsx                 ← root error boundary
    not-found.tsx
    globals.css
    (customer)/
      layout.tsx
      loading.tsx
      error.tsx
      page.tsx                ← menu
      checkout/page.tsx
      confirmation/[orderId]/page.tsx
    admin/
      layout.tsx
      error.tsx
      login/page.tsx
      page.tsx                ← dashboard
      orders/page.tsx
      products/page.tsx
      categories/page.tsx
      delivery/page.tsx
      vat/page.tsx
  middleware.ts               ← admin route protection via ADMIN_SECRET cookie
```

---

## The 11 rules

1. **Schema → type. Never hand-write a type that duplicates a schema.**
2. **Contract before component.** Every field a component renders must exist in `domain.contract.ts` before the file is created. List fields in a comment at the top of every new component.
3. **No `any`. No `@ts-ignore`.** If you can't type it, model it.
4. **No god anything.** Component > 120 lines → split. Hook > 80 lines → split. Function > 40 lines → split. File that has more than one reason to change → split.
5. **No business logic in components.** Components receive typed props, call typed callbacks.
6. **MSW only.** No `localStorage` in application code. No direct fetch in components.
7. **`handleError()` is toast-only.** Auth redirects are handled by `middleware.ts`. Not-found is handled by `error.tsx`. `handleError` shows a toast and optionally logs. Nothing else.
8. **Cart state lives in Zustand + sessionStorage.** Not in MSW. Not in TanStack Query. Not in `localStorage`.
9. **Money is always cents.** `Money` branded type. `formatPrice(cents, currency)` at display boundary only.
10. **All strings in `copy.ts`.** Zero string literals in JSX.
11. **`tsc --noEmit` before marking any step done.**

---

## MSW on Vercel

MSW starts when `NEXT_PUBLIC_USE_MSW === 'true'`.

```
Local dev:      NEXT_PUBLIC_USE_MSW=true   → MSW intercepts all API calls
Vercel prototype: NEXT_PUBLIC_USE_MSW=true   → MSW intercepts all API calls
Vercel + real API: NEXT_PUBLIC_USE_MSW=false  → real API handles all calls
```

Never use `NODE_ENV === 'development'` to control MSW. Vercel sets `NODE_ENV=production` on every deploy including previews.

---

## Data persistence on Vercel (prototype)

| Data            | Where stored       | Survives refresh? | Survives tab close? |
|-----------------|--------------------|-------------------|---------------------|
| Cart items      | Zustand + sessionStorage | ✅ Yes       | ❌ No               |
| Menu / orders   | MSW in-memory db   | ❌ Reseeds        | ❌ Reseeds          |
| Settings        | MSW in-memory db   | ❌ Reseeds        | ❌ Reseeds          |

**Tell stakeholders upfront**: refreshing resets the menu/orders/settings to seed data. Cart survives navigation and refresh within a tab session.

---

## Error handling

```
AppError types: NETWORK | VALIDATION | NOT_FOUND | UNAUTHORIZED | FORBIDDEN | CONFLICT | SERVER | UNKNOWN

Surfaces:
  toast         → NETWORK, SERVER, CONFLICT, UNKNOWN   (handleError shows toast)
  inline field  → form validation (React Hook Form + Zod resolver, no manual errors)
  error.tsx     → route-level uncaught throws (Next.js catches these)
  middleware    → UNAUTHORIZED / FORBIDDEN (redirect before page loads)

handleError(error: unknown): void
  → normalises to AppError
  → shows toast with userMessage
  → logs UNKNOWN + VALIDATION to console (Sentry in Phase 6)
  → never calls router.push() — that's middleware's job
```

---

## Checkout orchestration

`useCheckout` is the single hook that owns the checkout flow. `CheckoutModal` only renders — it never contains logic.

```
useCheckout()
  reads:   useCart() → items, pricing, deliveryType, paymentMethod
  reads:   useSettings() → PricingSettings
  manages: step (address | delivery | payment)
  manages: DeliveryAddress form state
  manages: CardDetails form state (UI-only — never submitted to server)
  action:  placeOrder() → POST /api/orders → clears cart → navigates to /confirmation/:id
```

---

## Discovery build order

Build in this sequence. Each screen reveals its data needs, which feeds `domain.contract.ts` before the next screen is started.

```
01  ProductCard              → Product display fields
02  CategoryBar              → ProductCategory enum, filter state
03  CartItem                 → CartItem snapshot fields
04  CartFooter               → pricing computation inputs, FreeDeliveryProgress
05  DeliveryAddressForm      → DeliveryAddress fields + validation messages
06  DeliveryOptions          → DeliveryType, fee display
07  PaymentOptions           → PaymentMethod enum, CardDetailsForm (UI-only)
08  OrderSummary             → OrderPricing breakdown
09  ConfirmationPage         → OrderId, OrderStatus tracker
10  AdminOrderRow            → Order list fields, status transitions
11  AdminProductRow          → Product admin-view fields
12  AddProductForm           → CreateProductInput validation
13  SettingsCards            → PricingSettings all fields
14  DashboardStats           → DashboardStats (computed — no DB table)
```

Before each screen: comment listing every field → check contract → update if missing → `tsc --noEmit` → build.

---

## Backend migration (when ready)

1. Generate types from OpenAPI spec: `npx openapi-typescript http://api/docs-json -o src/types/api.generated.ts`
2. Confirm generated types match `domain.contract.ts` schemas
3. Implement `repositories/http/*` (they already call `fetch` — just update the base URL)
4. Set `NEXT_PUBLIC_USE_MSW=false`
5. MSW handlers stay in codebase for tests — they are not deleted

---

## Pre-step checklist (run before every step)

```
□ tsc --noEmit passes
□ fields listed in comment at top of new component
□ all fields exist in domain.contract.ts
□ all strings come from copy.ts
□ component ≤ 120 lines
□ no business logic inline
□ loading + error + empty + data states handled
```