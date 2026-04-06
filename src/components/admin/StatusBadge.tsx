// Fields: OrderStatus, ORDER_STATUS_LABELS
import { ORDER_STATUS_LABELS, type OrderStatus } from "@/domain.contract";
import { Badge } from "@/components/ui";

interface StatusBadgeProps {
  readonly status: OrderStatus;
}

const VARIANT_MAP: Record<OrderStatus, "success" | "warning" | "info" | "error" | "neutral"> = {
  pending: "warning",
  preparing: "info",
  "on-way": "info",
  delivered: "success",
  cancelled: "error",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={VARIANT_MAP[status]}>{ORDER_STATUS_LABELS[status]}</Badge>;
}
