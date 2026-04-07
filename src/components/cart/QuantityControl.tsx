// Fields: quantity (number)
"use client";

interface QuantityControlProps {
  readonly quantity: number;
  readonly onChange: (qty: number) => void;
}

export function QuantityControl({ quantity, onChange }: QuantityControlProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={() => onChange(quantity - 1)}
        className="flex h-[26px] w-[26px] items-center justify-center rounded-full border text-xs transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
        style={{ borderColor: "var(--border2)", color: "var(--ink3)" }}
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <span className="w-5 text-center text-xs font-semibold" style={{ color: "var(--ink)" }}>
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="flex h-[26px] w-[26px] items-center justify-center rounded-full border text-xs transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
        style={{ borderColor: "var(--border2)", color: "var(--ink3)" }}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
