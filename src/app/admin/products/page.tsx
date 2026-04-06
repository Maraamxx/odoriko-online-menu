"use client";

import { ProductsTable } from "@/components/admin/ProductsTable";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <ProductsTable />
    </div>
  );
}
