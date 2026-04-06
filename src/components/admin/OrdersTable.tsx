// Fields: Order[] via useOrders
"use client";

import { useOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import { useSettings } from "@/hooks/useSettings";
import { OrderRow } from "./OrderRow";
import { SectionError } from "@/components/errors/SectionError";
import { Spinner } from "@/components/ui";
import { COPY } from "@/constants/copy";
import type { OrderId, OrderStatus } from "@/domain.contract";

export function OrdersTable() {
  const { data: orders, isLoading, error, refetch } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const settings = useSettings();
  const currency = settings.data?.currency ?? "USD";

  const handleStatusChange = (id: OrderId, status: OrderStatus) => {
    updateStatus.mutate({ id, status });
  };

  if (error) return <SectionError message={COPY.errors.server} onRetry={() => void refetch()} />;
  if (isLoading) return <div className="flex justify-center py-16"><Spinner size={28} /></div>;
  if (!orders || orders.length === 0) {
    return <p className="py-16 text-center text-sm" style={{ color: "var(--ink3)" }}>No orders yet</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-xs font-medium" style={{ borderColor: "var(--border)", color: "var(--ink4)" }}>
            <th className="pb-2 pr-4">Order</th>
            <th className="pb-2 pr-4">Customer</th>
            <th className="pb-2 pr-4">Items</th>
            <th className="pb-2 pr-4">Total</th>
            <th className="pb-2 pr-4">Status</th>
            <th className="pb-2 pr-4">Date</th>
            <th className="pb-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              currency={currency}
              onStatusChange={handleStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
