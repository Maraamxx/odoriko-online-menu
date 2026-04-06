"use client";

import { useProducts } from "@/hooks/useProducts";
import { PRODUCT_CATEGORIES } from "@/domain.contract";
import { Spinner } from "@/components/ui";
import { SectionError } from "@/components/errors/SectionError";
import { COPY } from "@/constants/copy";

export default function CategoriesPage() {
  const { data: products, isLoading, error, refetch } = useProducts();

  if (error) return <SectionError message={COPY.errors.server} onRetry={() => void refetch()} />;
  if (isLoading) return <div className="flex justify-center py-16"><Spinner size={28} /></div>;

  const rows = PRODUCT_CATEGORIES.map((cat) => {
    const items = (products ?? []).filter((p) => p.category === cat);
    const live = items.filter((p) => p.isAvailable).length;
    const hidden = items.length - live;
    return { cat, total: items.length, live, hidden };
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-2xl font-semibold" style={{ color: "var(--ink)" }}>
        {COPY.admin.nav.categories}
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-xs font-medium" style={{ borderColor: "var(--border)", color: "var(--ink4)" }}>
              <th className="pb-2 pr-4">Category</th>
              <th className="pb-2 pr-4">Total Items</th>
              <th className="pb-2 pr-4">Live</th>
              <th className="pb-2">Hidden</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.cat} className="border-b text-sm" style={{ borderColor: "var(--border)" }}>
                <td className="py-3 pr-4 font-medium" style={{ color: "var(--ink)" }}>{r.cat}</td>
                <td className="py-3 pr-4" style={{ color: "var(--ink3)" }}>{r.total}</td>
                <td className="py-3 pr-4" style={{ color: "var(--green)" }}>{r.live}</td>
                <td className="py-3" style={{ color: "var(--ink4)" }}>{r.hidden}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
