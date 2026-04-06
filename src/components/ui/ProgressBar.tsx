interface ProgressBarProps {
  readonly percent: number;
  readonly label?: string;
}

export function ProgressBar({ percent, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="text-[11px]" style={{ color: "var(--ink4)" }}>
          {label}
        </span>
      )}
      <div
        className="w-full overflow-hidden rounded-full"
        style={{ height: 3, background: "var(--teal-pale2)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-400"
          style={{
            width: `${clamped}%`,
            background: "var(--teal)",
          }}
        />
      </div>
    </div>
  );
}
