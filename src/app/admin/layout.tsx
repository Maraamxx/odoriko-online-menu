"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

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
      <main className="flex-1 overflow-y-auto p-8" style={{ background: "var(--bg)" }}>
        {children}
      </main>
    </div>
  );
}
