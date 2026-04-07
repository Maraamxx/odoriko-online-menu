import { cn } from "@/lib/cn";

interface SpinnerProps {
  readonly size?: number;
  readonly className?: string;
}

export function Spinner({ size = 20, className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("inline-block animate-spin rounded-full", className)}
      style={{
        width: size,
        height: size,
        border: "2.5px solid var(--border)",
        borderTopColor: "var(--primary)",
      }}
    />
  );
}
