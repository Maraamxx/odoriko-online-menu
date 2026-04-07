// Fields: ROUTES.ADMIN.*, COPY.admin.nav.*, COPY.admin.groups.*
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { COPY } from "@/constants/copy";
import { cn } from "@/lib/cn";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: COPY.admin.groups.overview,
    items: [
      { label: COPY.admin.nav.dashboard, href: ROUTES.ADMIN.DASHBOARD, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" },
      { label: COPY.admin.nav.orders, href: ROUTES.ADMIN.ORDERS, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    ],
  },
  {
    label: COPY.admin.groups.catalog,
    items: [
      { label: COPY.admin.nav.products, href: ROUTES.ADMIN.PRODUCTS, icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
      { label: COPY.admin.nav.categories, href: ROUTES.ADMIN.CATEGORIES, icon: "M4 6h16M4 12h16M4 18h7" },
    ],
  },
  {
    label: COPY.admin.groups.config,
    items: [
      { label: COPY.admin.nav.delivery, href: ROUTES.ADMIN.DELIVERY, icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" },
      { label: COPY.admin.nav.vat, href: ROUTES.ADMIN.VAT, icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden sticky top-16 flex-col gap-6 overflow-y-auto border-r px-3 py-5 md:flex"
      style={{
        width: 216,
        height: "calc(100vh - 64px)",
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
    >
      {GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col gap-0.5">
          <span
            className="mb-1 px-3 text-[9px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--ink4)" }}
          >
            {group.label}
          </span>
          {group.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12.5px] font-medium transition-colors",
                  isActive
                    ? "border-l-2 border-[var(--primary)] bg-[var(--primary-pale)] text-[var(--primary)]"
                    : "border-l-2 border-transparent text-[var(--ink3)] hover:bg-[var(--surface2)] hover:text-[var(--ink)]",
                )}
              >
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={item.icon} />
                </svg>
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
