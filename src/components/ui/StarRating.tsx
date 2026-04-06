import { cn } from "@/lib/cn";

type Size = "sm" | "md";

interface StarRatingProps {
  readonly rating: number;
  readonly size?: Size;
  readonly className?: string;
}

const dimensions: Record<Size, number> = { sm: 12, md: 16 };

function Star({ filled, dim }: { filled: boolean; dim: number }) {
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill={filled ? "var(--amber)" : "none"}
      stroke={filled ? "var(--amber)" : "var(--border2)"}
      strokeWidth={2}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function StarRating({ rating, size = "sm", className }: StarRatingProps) {
  const dim = dimensions[size];

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} filled={i < Math.round(rating)} dim={dim} />
      ))}
      <span
        className="ml-1 text-[11px]"
        style={{ color: "var(--ink4)" }}
      >
        {rating.toFixed(1)}
      </span>
    </span>
  );
}
