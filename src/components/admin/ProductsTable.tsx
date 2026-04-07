// Fields: Product[] via useProducts
"use client";

import { useState, useMemo } from "react";
import { useProducts, useToggleAvailability, useDeleteProduct } from "@/hooks/useProducts";
import { useSettings } from "@/hooks/useSettings";
import { ProductRow } from "./ProductRow";
import { AddProductForm } from "./AddProductForm";
import { SectionError } from "@/components/errors/SectionError";
import { Button, Spinner } from "@/components/ui";
import { COPY } from "@/constants/copy";
import { PRODUCT_CATEGORIES, type ProductId, type ProductCategory } from "@/domain.contract";

const PAGE_SIZE = 10;

export function ProductsTable() {
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "live" | "hidden">("all");
  const [search, setSearch] = useState("");

  const { data: products, isLoading, error, refetch } = useProducts();
  const toggleAvailability = useToggleAvailability();
  const deleteProduct = useDeleteProduct();
  const settings = useSettings();
  const currency = settings.data?.currency ?? "EGP";

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      if (statusFilter === "live" && !p.isAvailable) return false;
      if (statusFilter === "hidden" && p.isAvailable) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [products, categoryFilter, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const liveCount = products?.filter((p) => p.isAvailable).length ?? 0;

  if (error) return <SectionError message={COPY.errors.server} onRetry={() => void refetch()} />;
  if (isLoading) return <div className="flex justify-center py-16"><Spinner size={28} /></div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold" style={{ color: "var(--ink)" }}>{COPY.admin.products.title}</h2>
          <p className="mt-1 text-xs" style={{ color: "var(--ink4)" }}>{products?.length ?? 0} items · {liveCount} live on menu</p>
        </div>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>{COPY.admin.products.add}</Button>
      </div>

      {showForm && <AddProductForm onDone={() => setShowForm(false)} />}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="rounded-lg border px-3 py-1.5 text-sm"
          style={{ borderColor: "var(--border)", color: "var(--ink)", width: 200 }}
        />
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value as ProductCategory | "all"); setPage(1); }}
          className="rounded-lg border px-3 py-1.5 text-sm"
          style={{ borderColor: "var(--border)", color: "var(--ink)" }}
        >
          <option value="all">All categories</option>
          {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as "all" | "live" | "hidden"); setPage(1); }}
          className="rounded-lg border px-3 py-1.5 text-sm"
          style={{ borderColor: "var(--border)", color: "var(--ink)" }}
        >
          <option value="all">All statuses</option>
          <option value="live">Live</option>
          <option value="hidden">Hidden</option>
        </select>
        <span className="text-xs" style={{ color: "var(--ink4)" }}>{filtered.length} results</span>
      </div>

      {paged.length === 0 ? (
        <p className="py-16 text-center text-sm" style={{ color: "var(--ink3)" }}>No products match filters</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-xs font-medium" style={{ borderColor: "var(--border)", color: "var(--ink4)" }}>
                <th className="pb-2 pr-4">Product</th>
                <th className="pb-2 pr-4">Category</th>
                <th className="pb-2 pr-4">Rating</th>
                <th className="pb-2 pr-4">Price</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((p) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs" style={{ color: "var(--ink4)" }}>
            Page {safePage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="rounded-lg border px-3 py-1 text-xs font-medium disabled:opacity-40"
              style={{ borderColor: "var(--border)", color: "var(--ink3)" }}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="rounded-lg border px-3 py-1 text-xs font-medium disabled:opacity-40"
              style={{ borderColor: "var(--border)", color: "var(--ink3)" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
