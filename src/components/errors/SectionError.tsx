"use client";

import { Button } from "@/components/ui";
import { COPY } from "@/constants/copy";

interface SectionErrorProps {
  readonly message?: string | undefined;
  readonly onRetry?: (() => void) | undefined;
}

export function SectionError({ message, onRetry }: SectionErrorProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-xl p-8"
      style={{ background: "var(--surface2)", color: "var(--ink3)" }}
    >
      <p className="text-sm">{message ?? COPY.errors.server}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          {COPY.errors.tryAgain}
        </Button>
      )}
    </div>
  );
}
