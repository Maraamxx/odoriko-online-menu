"use client";

import { DeliveryRatesCard } from "@/components/admin/DeliveryRatesCard";
import { ServiceFeeCard } from "@/components/admin/ServiceFeeCard";
import { COPY } from "@/constants/copy";

export default function DeliveryPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-2xl font-semibold" style={{ color: "var(--ink)" }}>
        {COPY.admin.nav.delivery}
      </h1>
      <DeliveryRatesCard />
      <ServiceFeeCard />
    </div>
  );
}
