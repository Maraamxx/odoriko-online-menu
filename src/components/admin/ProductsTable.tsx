// Fields: Product[] via useProducts
"use client";

import { useState } from "react";
import { useProducts, useToggleAvailability, useDeleteProduct } from "@/hooks/useProducts";
import { useSettings } from "@/hooks/useSettings";
import { ProductRow } from "./ProductRow";
import { AddProductForm } from "./AddProductForm";
import { SectionError } from "@/components/errors/SectionError";
import { Button, Spinner } from "@/components/ui";
import { COPY } from "@/constants/copy";
import type { ProductId } from "@/domain.contract";

export function ProductsTable() {
  const [showForm, setShowForm] = useState(false);
  const { data: products, isLoading, error, refetch } = useProducts();
  const toggleAvailability = useToggleAvailability();
  const deleteProduct = useDeleteProduct();
  const settings = useSettings();
  const currency = settings.data?.currency ?? "USD";

  if (error) return <SectionError message={COPY.errors.server} onRetry={() => void refetch()} />;
  if (isLoading) return <div className="flex justify-center py-16"><Spinner size={28} /></div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold" style={{ color: "var(--ink)" }}>{COPY.admin.products.title}</h2>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>{COPY.admin.products.add}</Button>
      </div>

      {showForm && <AddProductForm onDone={() => setShowForm(false)} />}

      {!products || products.length === 0 ? (
        <p className="py-16 text-center text-sm" style={{ color: "var(--ink3)" }}>No products yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-xs font-medium" style={{ borderColor: "var(--border)", color: "var(--ink4)" }}>
                <th className="pb-2 pr-4">Image</th>
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Category</th>
                <th className="pb-2 pr-4">Rating</th>
                <th className="pb-2 pr-4">Price</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  currency={currency}
                  onToggle={(id: ProductId) => toggleAvailability.mutate(id)}
                  onDelete={(id: ProductId) => deleteProduct.mutate(id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
