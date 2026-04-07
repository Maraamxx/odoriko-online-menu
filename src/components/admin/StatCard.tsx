// Fields: label, value, change, changeType, icon
interface StatCardProps {
  readonly label: string;
  readonly value: string;
  readonly change?: string;
  readonly changeType?: "up" | "down" | "neutral";
  readonly icon: React.ReactNode;
}

const changeColors: Record<string, string> = {
  up: "var(--green)",
  down: "var(--red)",
  neutral: "var(--ink4)",
};

export function StatCard({ label, value, change, changeType = "neutral", icon }: StatCardProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-[18px] border p-5"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: "var(--ink3)" }}>{label}</span>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{
            background: changeType === "up" ? "#e8f5e9" : changeType === "down" ? "#fdecea" : "var(--primary-pale)",
            color: changeType === "up" ? "var(--green)" : changeType === "down" ? "var(--red)" : "var(--primary)",
          }}
        >
          {icon}
        </span>
      </div>
      <span className="font-serif text-[30px] font-semibold leading-none" style={{ color: "var(--ink)" }}>
        {value}
      </span>
      {change && (
        <span className="text-[11px] font-medium" style={{ color: changeColors[changeType] }}>
          {change}
        </span>
      )}
    </div>
  );
}
