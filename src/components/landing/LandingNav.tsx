"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import { COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { label: "Menu メニュー", href: ROUTES.MENU },
  { label: "Our Story", href: ROUTES.OUR_STORY },
  { label: "Contact", href: ROUTES.CONTACT },
];

export function LandingNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const openCart = useUIStore((s) => s.openCart);
  const isMenuPage = pathname.startsWith("/menu") || pathname.startsWith("/confirmation");

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-4 sm:px-12"
      style={{ background: "var(--cream)", borderBottom: "1px solid rgba(26,20,16,.1)" }}
    >
      {/* Logo */}
      <Link href={ROUTES.HOME} className="flex items-center gap-2.5" style={{ fontFamily: "var(--font-display)" }}>
        <span className="text-[22px] tracking-[0.12em] sm:text-[26px]" style={{ color: "var(--ink)" }}>
          {COPY.brand.name}
        </span>
        <span className="mb-1 hidden self-end font-serif text-[11px] font-light tracking-[0.08em] sm:block" style={{ color: "var(--ink4)" }}>
          踊子
        </span>
      </Link>

      {/* Center links */}
      <ul className="hidden gap-9 md:flex" style={{ listStyle: "none" }}>
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={cn(
                "text-[11px] font-medium uppercase tracking-[0.1em] transition-colors hover:text-[var(--accent)]",
                pathname === item.href ? "text-[var(--accent)]" : "text-[var(--ink3)]",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Admin — subtle gear icon */}
        <Link
          href={ROUTES.ADMIN.DASHBOARD}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--surface3)]"
          style={{ color: "var(--ink4)" }}
          title="Admin Panel"
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </Link>

        {/* Cart — on menu/order pages */}
        {isMenuPage && (
          <button
            onClick={openCart}
            className="relative flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--surface3)]"
            style={{ color: "var(--ink3)" }}
            aria-label="Cart"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white" style={{ background: "var(--accent)" }}>
                {itemCount}
              </span>
            )}
          </button>
        )}

        {/* Order CTA — on non-menu pages */}
        {!isMenuPage && (
          <Link
            href={ROUTES.MENU}
            className="rounded-sm px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--accent2)]"
            style={{ background: "var(--accent)" }}
          >
            {COPY.landing.orderNow}
          </Link>
        )}
      </div>
    </nav>
  );
}
