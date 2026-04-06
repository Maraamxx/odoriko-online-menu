// Reusable settings row: label + note left, children right
interface SettingsRowProps {
  readonly label: string;
  readonly note?: string;
  readonly children: React.ReactNode;
}

export function SettingsRow({ label, note, children }: SettingsRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>{label}</p>
        {note && <p className="text-xs" style={{ color: "var(--ink4)" }}>{note}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
