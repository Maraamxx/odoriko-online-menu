// Fields: PaymentMethod enum, PAYMENT_LABELS
"use client";

import { PAYMENT_METHODS, PAYMENT_LABELS, type PaymentMethod } from "@/domain.contract";
import { cn } from "@/lib/cn";

interface PaymentOptionsProps {
  readonly selected: PaymentMethod;
  readonly onSelect: (m: PaymentMethod) => void;
}

const ICONS: Record<PaymentMethod, string> = {
  card: "M3 7h18v10H3V7zm0 3h18",
  "apple-pay": "M12 2a10 10 0 110 20 10 10 0 010-20z",
  cash: "M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
};

export function PaymentOptions({ selected, onSelect }: PaymentOptionsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {PAYMENT_METHODS.map((method) => (
        <button
          key={method}
          onClick={() => onSelect(method)}
          className={cn(
            "flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors",
            selected === method
              ? "border-[var(--teal)] bg-[var(--teal-pale)]"
              : "border-[var(--border)] hover:border-[var(--teal)]",
          )}
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2} strokeLinecap="round"
            style={{ color: selected === method ? "var(--teal)" : "var(--ink3)" }}>
            <path d={ICONS[method]} />
          </svg>
          <span className="text-xs font-medium" style={{ color: "var(--ink2)" }}>
            {PAYMENT_LABELS[method]}
          </span>
        </button>
      ))}
    </div>
  );
}
