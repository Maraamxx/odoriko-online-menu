"use client";

import { COPY } from "@/constants/copy";

export default function CustomerError({
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        background: "var(--bg)",
        color: "var(--ink)",
      }}
    >
      <p style={{ fontSize: "1.125rem" }}>{COPY.errors.server}</p>
      <button
        onClick={reset}
        style={{
          padding: "0.5rem 1.5rem",
          background: "var(--primary)",
          color: "white",
          border: "none",
          borderRadius: "0.375rem",
          cursor: "pointer",
        }}
      >
        {COPY.errors.tryAgain}
      </button>
    </div>
  );
}
