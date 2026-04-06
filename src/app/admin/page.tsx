"use client";

import { StatCardGrid } from "@/components/admin/StatCardGrid";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { COPY } from "@/constants/copy";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-serif text-2xl font-semibold" style={{ color: "var(--ink)" }}>
        {COPY.admin.nav.dashboard}
      </h1>
      <StatCardGrid />
      <div>
        <h2 className="mb-4 text-sm font-semibold" style={{ color: "var(--ink2)" }}>
          Recent Orders
        </h2>
        <OrdersTable />
      </div>
    </div>
  );
}
