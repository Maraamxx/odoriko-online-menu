interface SectionLabelProps {
  readonly text: string;
  readonly jp?: string;
  readonly light?: boolean;
}

export function SectionLabel({ text, jp, light }: SectionLabelProps) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <div className="h-px w-7" style={{ background: "var(--accent)" }} />
      <span
        className="text-[10px] font-medium uppercase tracking-[0.18em]"
        style={{ color: "var(--accent)" }}
      >
        {text}
      </span>
      {jp && (
        <span
          className="font-serif text-[10px] font-light tracking-[0.12em]"
          style={{ color: light ? "rgba(255,255,255,.3)" : "var(--ink4)" }}
        >
          {jp}
        </span>
      )}
    </div>
  );
}
