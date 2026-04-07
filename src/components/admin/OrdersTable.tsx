// Fields: Order[] via useOrders
"use client";

import { useState, useMemo } from "react";
import { useOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import { useSettings } from "@/hooks/useSettings";
import { OrderRow } from "./OrderRow";
import { SectionError } from "@/components/errors/SectionError";
import { Spinner } from "@/components/ui";
import { COPY } from "@/constants/copy";
import { ORDER_STATUSES, type OrderId, type OrderStatus } from "@/domain.contract";

const PAGE_SIZE = 10;

export function OrdersTable() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");

  const { data: orders, isLoading, error, refetch } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const settings = useSettings();
  const currency = settings.data?.currency ?? "EGP";

  const handleStatusChange = (id: OrderId, status: OrderStatus) => {
    updateStatus.mutate({ id, status });
  };

  const filtered = useMemo(() => {
    if (!orders) return [];
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (search && !o.customerName.toLowerCase().includes(search.toLowerCase()) && !o.id.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [orders, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  if (error) return <SectionError message={COPY.errors.server} onRetry={() => void refetch()} />;
  if (isLoading) return <div className="flex justify-center py-16"><Spinner size={28} /></div>;

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by customer or order ID..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="rounded-lg border px-3 py-1.5 text-sm"
          style={{ borderColor: "var(--border)", color: "var(--ink)", width: 240 }}
        />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as OrderStatus | "all"); setPage(1); }}
          className="rounded-lg border px-3 py-1.5 text-sm"
          style={{ borderColor: "var(--border)", color: "var(--ink)" }}
        >
          <option value="all">All statuses</option>
          {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <span className="text-xs" style={{ color: "var(--ink4)" }}>{filtered.length} orders</span>
      </div>

      {paged.length === 0 ? (
        <p className="py-16 text-center text-sm" style={{ color: "var(--ink3)" }}>No orders match filters</p>
      ) : (
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
              {paged.map((order) => (
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
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs" style={{ color: "var(--ink4)" }}>
            Page {safePage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="rounded-lg border px-3 py-1 text-xs font-medium disabled:opacity-40"
              style={{ borderColor: "var(--border)", color: "var(--ink3)" }}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="rounded-lg border px-3 py-1 text-xs font-medium disabled:opacity-40"
              style={{ borderColor: "var(--border)", color: "var(--ink3)" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
