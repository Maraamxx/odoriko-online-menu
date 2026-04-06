"use client";

import { VatConfigCard } from "@/components/admin/VatConfigCard";
import { TaxSnapshotCard } from "@/components/admin/TaxSnapshotCard";
import { COPY } from "@/constants/copy";

export default function VatPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-2xl font-semibold" style={{ color: "var(--ink)" }}>
        {COPY.admin.nav.vat}
      </h1>
      <div className="grid grid-cols-2 gap-6">
        <VatConfigCard />
        <TaxSnapshotCard />
      </div>
    </div>
  );
}
