"use client";

import { cn } from "@/lib/cn";
import { Spinner } from "./Spinner";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: Variant;
  readonly size?: Size;
  readonly isLoading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--primary)] text-white hover:bg-[var(--primary2)] active:bg-[var(--primary2)]",
  secondary:
    "border border-[var(--border2)] text-[var(--ink2)] hover:bg-[var(--surface2)]",
  ghost: "text-[var(--ink3)] hover:bg-[var(--surface2)]",
  danger: "bg-[var(--red)] text-white hover:opacity-90",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {isLoading && <Spinner size={size === "sm" ? 14 : 16} />}
      {children}
    </button>
  );
}
