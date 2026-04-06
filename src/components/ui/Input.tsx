import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly label: string;
  readonly error?: string | undefined;
  readonly hint?: string | undefined;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...rest }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={inputId}
          className="text-xs font-medium"
          style={{ color: "var(--ink3)" }}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "rounded-lg border px-3 py-2 text-sm outline-none transition-colors",
            "placeholder:text-[var(--ink4)]",
            error
              ? "border-[var(--red)]"
              : "border-[var(--border)] focus:border-[var(--teal)]",
            className,
          )}
          style={{
            background: "var(--surface)",
            color: "var(--ink)",
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-[11px]"
            style={{ color: "var(--red)" }}
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-[11px]" style={{ color: "var(--ink4)" }}>
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
