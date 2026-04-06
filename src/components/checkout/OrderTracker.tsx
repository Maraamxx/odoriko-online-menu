// Fields: OrderStatus, ORDER_TRACKER_STEPS, ORDER_STATUS_LABELS
import {
  ORDER_TRACKER_STEPS,
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from "@/domain.contract";

interface OrderTrackerProps {
  readonly currentStatus: OrderStatus;
}

export function OrderTracker({ currentStatus }: OrderTrackerProps) {
  const currentIdx = ORDER_TRACKER_STEPS.indexOf(currentStatus);

  return (
    <div className="flex items-center justify-between">
      {ORDER_TRACKER_STEPS.map((step, i) => {
        const isCompleted = i <= currentIdx;
        const isCurrent = i === currentIdx;
        return (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
                style={{
                  background: isCompleted ? "var(--teal)" : "var(--surface3)",
                  color: isCompleted ? "white" : "var(--ink4)",
                  boxShadow: isCurrent ? "0 0 0 3px var(--teal-pale2)" : undefined,
                }}
              >
                {i + 1}
              </div>
              <span
                className="text-[10px] font-medium"
                style={{ color: isCompleted ? "var(--teal)" : "var(--ink4)" }}
              >
                {ORDER_STATUS_LABELS[step]}
              </span>
            </div>
            {i < ORDER_TRACKER_STEPS.length - 1 && (
              <div
                className="mx-2 h-0.5 flex-1"
                style={{ background: i < currentIdx ? "var(--teal)" : "var(--border)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
