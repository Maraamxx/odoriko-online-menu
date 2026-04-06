// Fields: Order.id, customerName, items, pricing.grandTotalInCents, status, createdAt
"use client";

import type { Order, OrderId, OrderStatus, Currency, Money } from "@/domain.contract";
import { ORDER_STATUSES, ORDER_STATUS_LABELS, ORDER_STATUS_TERMINAL } from "@/domain.contract";
import { formatPrice } from "@/lib/format";
import { formatDate } from "@/lib/format";
import { StatusBadge } from "./StatusBadge";

interface OrderRowProps {
  readonly order: Order;
  readonly currency: Currency;
  readonly onStatusChange: (id: OrderId, status: OrderStatus) => void;
}

export function OrderRow({ order, currency, onStatusChange }: OrderRowProps) {
  const initials = order.customerName.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const itemCount = order.items.reduce((n, i) => n + i.quantity, 0);

  return (
    <tr className="border-b text-sm" style={{ borderColor: "var(--border)" }}>
      <td className="py-3 pr-4 font-serif text-[15px] font-semibold" style={{ color: "var(--teal)" }}>
        {order.id.slice(0, 8)}
      </td>
      <td className="py-3 pr-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold text-white"
            style={{ background: "var(--teal)" }}>
            {initials}
          </span>
          <span style={{ color: "var(--ink)" }}>{order.customerName}</span>
        </div>
      </td>
      <td className="py-3 pr-4" style={{ color: "var(--ink3)" }}>
        {itemCount} item{itemCount !== 1 ? "s" : ""}
      </td>
      <td className="py-3 pr-4 font-medium" style={{ color: "var(--ink)" }}>
        {formatPrice(order.pricing.grandTotalInCents as Money, currency)}
      </td>
      <td className="py-3 pr-4"><StatusBadge status={order.status} /></td>
      <td className="py-3 pr-4" style={{ color: "var(--ink4)" }}>{formatDate(order.createdAt)}</td>
      <td className="py-3">
        {!ORDER_STATUS_TERMINAL.has(order.status) && (
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id as OrderId, e.target.value as OrderStatus)}
            className="rounded border px-2 py-1 text-xs"
            style={{ borderColor: "var(--border)", color: "var(--ink2)" }}
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>
            ))}
          </select>
        )}
      </td>
    </tr>
  );
}
