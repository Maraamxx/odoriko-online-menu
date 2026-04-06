"use client";

import { OrdersTable } from "@/components/admin/OrdersTable";
import { COPY } from "@/constants/copy";

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-2xl font-semibold" style={{ color: "var(--ink)" }}>
        {COPY.admin.orders.title}
      </h1>
      <OrdersTable />
    </div>
  );
}
