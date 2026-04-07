import Link from "next/link";
import { COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        background: "var(--bg)",
        color: "var(--ink)",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
        {COPY.errors.notFound}
      </h1>
      <Link
        href={ROUTES.MENU}
        style={{ color: "var(--primary)", textDecoration: "underline" }}
      >
        {COPY.errors.goBack}
      </Link>
    </div>
  );
}
