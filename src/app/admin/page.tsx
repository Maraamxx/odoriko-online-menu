"use client";

import { StatCardGrid } from "@/components/admin/StatCardGrid";
import { COPY } from "@/constants/copy";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-2xl font-semibold" style={{ color: "var(--ink)" }}>
        {COPY.admin.nav.dashboard}
      </h1>
      <StatCardGrid />
    </div>
  );
}
