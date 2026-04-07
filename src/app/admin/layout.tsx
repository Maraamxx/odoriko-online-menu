"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

export default function AdminLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <main style={{ minHeight: "calc(100vh - 64px)", background: "var(--bg)" }}>
        {children}
      </main>
    );
  }

  return (
    <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-20 md:p-8 md:pb-8" style={{ background: "var(--bg)" }}>
        {children}
      </main>
      <AdminMobileNav />
    </div>
  );
}
