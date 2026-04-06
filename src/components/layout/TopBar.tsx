// Fields: COPY.brand.*, COPY.nav.*, cart.itemCount
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import { COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/cn";

export function TopBar() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const openCheckout = useUIStore((s) => s.openCheckout);
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header
      className="sticky top-0 z-40 flex h-16 items-center justify-between border-b px-6"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* Left: Brand */}
      <Link href={ROUTES.MENU} className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: "var(--teal)" }}
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
            <path d="M12 2C8 6 4 10 4 14a8 8 0 0016 0c0-4-4-8-8-12z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-base font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {COPY.brand.name}
          </span>
          <span className="text-[10px] font-medium tracking-wide" style={{ color: "var(--ink4)" }}>
            {COPY.brand.tagline}
          </span>
        </div>
      </Link>

      {/* Center: View toggle */}
      <div className="flex gap-1 rounded-full border p-0.5" style={{ borderColor: "var(--border2)" }}>
        <Link
          href={ROUTES.MENU}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
            !isAdmin
              ? "bg-[var(--teal)] text-white"
              : "text-[var(--ink3)] hover:text-[var(--ink)]",
          )}
        >
          {COPY.nav.guestMenu}
        </Link>
        <Link
          href={ROUTES.ADMIN.DASHBOARD}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
            isAdmin
              ? "bg-[var(--teal)] text-white"
              : "text-[var(--ink3)] hover:text-[var(--ink)]",
          )}
        >
          {COPY.nav.admin}
        </Link>
      </div>

      {/* Right: Cart */}
      <div className="flex items-center gap-3">
        {!isAdmin && (
          <button
            onClick={openCheckout}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--teal)" }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            {COPY.nav.cart}
            {itemCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold"
                style={{ color: "var(--teal)" }}>
                {itemCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
