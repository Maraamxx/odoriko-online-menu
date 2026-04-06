import { cn } from "@/lib/cn";

type Variant = "success" | "warning" | "info" | "error" | "neutral";

interface BadgeProps {
  readonly variant?: Variant;
  readonly children: React.ReactNode;
  readonly className?: string;
}

const variantStyles: Record<Variant, string> = {
  success: "bg-[#e8f5e9] text-[var(--green)]",
  warning: "bg-[#fff8e1] text-[var(--amber)]",
  info: "bg-[var(--teal-pale)] text-[var(--teal)]",
  error: "bg-[#fdecea] text-[var(--red)]",
  neutral: "bg-[var(--surface3)] text-[var(--ink3)]",
};

export function Badge({ variant = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
        "text-[10px] font-semibold uppercase tracking-wide",
        variantStyles[variant],
        className,
      )}
    >
      <span
        className="inline-block h-1 w-1 rounded-full"
        style={{ background: "currentColor" }}
      />
      {children}
    </span>
  );
}
