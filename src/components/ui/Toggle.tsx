"use client";

import { cn } from "@/lib/cn";

interface ToggleProps {
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
  readonly label?: string;
  readonly disabled?: boolean;
}

export function Toggle({ checked, onChange, label, disabled }: ToggleProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 select-none",
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className="relative inline-flex shrink-0 rounded-full transition-colors duration-200"
        style={{
          width: 42,
          height: 24,
          background: checked ? "var(--primary)" : "var(--border2)",
        }}
      >
        <span
          className="inline-block rounded-full bg-white shadow transition-transform duration-200"
          style={{
            width: 18,
            height: 18,
            marginTop: 3,
            marginLeft: checked ? 21 : 3,
          }}
        />
      </button>
      {label && (
        <span className="text-sm" style={{ color: "var(--ink2)" }}>
          {label}
        </span>
      )}
    </label>
  );
}
