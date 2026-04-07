"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { PRODUCT_CATEGORIES } from "@/domain.contract";
import { Button, Input, Spinner } from "@/components/ui";
import { SectionError } from "@/components/errors/SectionError";
import { COPY } from "@/constants/copy";

export default function CategoriesPage() {
  const { data: products, isLoading, error, refetch } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [newCat, setNewCat] = useState("");

  if (error) return <SectionError message={COPY.errors.server} onRetry={() => void refetch()} />;
  if (isLoading) return <div className="flex justify-center py-16"><Spinner size={28} /></div>;

  const allCategories = [...new Set([
    ...PRODUCT_CATEGORIES,
    ...(products ?? []).map((p) => p.category),
  ])];

  const rows = allCategories.map((cat) => {
    const items = (products ?? []).filter((p) => p.category === cat);
    const live = items.filter((p) => p.isAvailable).length;
    const hidden = items.length - live;
    return { cat, total: items.length, live, hidden };
  });

  const handleAddCategory = () => {
    if (!newCat.trim()) return;
    setNewCat("");
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold" style={{ color: "var(--ink)" }}>
          {COPY.admin.nav.categories}
        </h1>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>+ Add category</Button>
      </div>

      {showForm && (
        <div
          className="flex items-end gap-3 rounded-xl border p-5"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <div className="flex-1">
            <Input
              label="Category name"
              placeholder="e.g. Tempura"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={handleAddCategory}>Save</Button>
          <Button size="sm" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
        </div>
      )}

      <p className="text-xs" style={{ color: "var(--ink4)" }}>
        {allCategories.length} categories · {rows.reduce((n, r) => n + r.total, 0)} total products
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-xs font-medium" style={{ borderColor: "var(--border)", color: "var(--ink4)" }}>
              <th className="pb-2 pr-4">Category</th>
              <th className="pb-2 pr-4">Japanese</th>
              <th className="pb-2 pr-4">Total</th>
              <th className="pb-2 pr-4">Live</th>
              <th className="pb-2">Hidden</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.cat} className="border-b text-sm" style={{ borderColor: "var(--border)" }}>
                <td className="py-3 pr-4 font-medium" style={{ color: "var(--ink)" }}>{r.cat}</td>
                <td className="py-3 pr-4 font-serif text-xs" style={{ color: "var(--ink4)" }}>
                  {COPY.categoryJa[r.cat] ?? "—"}
                </td>
                <td className="py-3 pr-4" style={{ color: "var(--ink3)" }}>{r.total}</td>
                <td className="py-3 pr-4" style={{ color: "var(--green)" }}>{r.live}</td>
                <td className="py-3" style={{ color: "var(--ink4)" }}>{r.hidden || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
