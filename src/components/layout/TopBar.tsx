// Fields: COPY.brand.*, COPY.nav.*, cart.itemCount
"use client";

import Image from "next/image";
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
  const toggleCart = useUIStore((s) => s.toggleCart);
  const openCheckout = useUIStore((s) => s.openCheckout);
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header
      className="sticky top-0 z-40 flex h-16 items-center justify-between border-b px-6"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* Left: Brand */}
      <Link href={ROUTES.MENU} className="flex items-center">
        <Image
          src="/brand/logo-full.webp"
          alt={COPY.brand.name}
          width={140}
          height={36}
          className="object-contain"
          style={{ width: "auto", height: 32 }}
          priority
        />
      </Link>

      {/* Center: View toggle */}
      <div className="hidden gap-1 rounded-full border p-0.5 sm:flex" style={{ borderColor: "var(--border2)" }}>
        <Link
          href={ROUTES.MENU}
          className={cn(
            "rounded-full px-5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
            !isAdmin
              ? "bg-[var(--ink)] text-white"
              : "text-[var(--ink3)] hover:text-[var(--ink)]",
          )}
        >
          {COPY.nav.guestMenu}
        </Link>
        <Link
          href={ROUTES.ADMIN.DASHBOARD}
          className={cn(
            "rounded-full px-5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
            isAdmin
              ? "bg-[var(--ink)] text-white"
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
            onClick={itemCount > 0 ? toggleCart : openCheckout}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            {COPY.nav.cart}
            {itemCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold"
                style={{ color: "var(--accent)" }}>
                {itemCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
