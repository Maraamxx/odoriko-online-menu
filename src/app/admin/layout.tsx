"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";

function AdminTopBar() {
  return (
    <header
      className="sticky top-0 z-40 flex h-16 items-center justify-between border-b px-4 sm:px-8"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <Link href={ROUTES.ADMIN.DASHBOARD} className="flex items-center gap-2.5" style={{ fontFamily: "var(--font-display)" }}>
        <span className="text-xl tracking-[0.12em]" style={{ color: "var(--ink)" }}>{COPY.brand.name}</span>
        <span className="rounded-sm px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider" style={{ background: "var(--accent-pale)", color: "var(--accent)" }}>
          Admin
        </span>
      </Link>
      <Link
        href={ROUTES.HOME}
        className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors hover:text-[var(--accent)]"
        style={{ color: "var(--ink4)" }}
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
        View Site
      </Link>
    </header>
  );
}

export default function AdminLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <main style={{ minHeight: "100vh", background: "var(--bg)" }}>{children}</main>;
  }

  return (
    <>
      <AdminTopBar />
      <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-20 md:p-8 md:pb-8" style={{ background: "var(--bg)" }}>
          {children}
        </main>
        <AdminMobileNav />
      </div>
    </>
  );
}
