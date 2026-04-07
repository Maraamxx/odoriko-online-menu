"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/useCategories";
import { Button, Input, Spinner, ConfirmDialog } from "@/components/ui";
import { SectionError } from "@/components/errors/SectionError";
import { COPY } from "@/constants/copy";
import { handleError } from "@/lib/error";

export default function CategoriesPage() {
  const { data: products, isLoading: productsLoading, error, refetch } = useProducts();
  const { data: categories, isLoading: catsLoading } = useCategories();
  const createCat = useCreateCategory();
  const updateCat = useUpdateCategory();
  const deleteCat = useDeleteCategory();

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newJa, setNewJa] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editJa, setEditJa] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (error) return <SectionError message={COPY.errors.server} onRetry={() => void refetch()} />;
  if (productsLoading || catsLoading) return <div className="flex justify-center py-16"><Spinner size={28} /></div>;

  const cats = categories ?? [];
  const rows = cats.map((cat) => {
    const items = (products ?? []).filter((p) => p.category === cat.name);
    const live = items.filter((p) => p.isAvailable).length;
    return { ...cat, total: items.length, live, hidden: items.length - live };
  });

  const handleAdd = async () => {
    if (!newName.trim()) return;
    try {
      await createCat.mutateAsync({ name: newName.trim(), japaneseName: newJa.trim() });
      setNewName(""); setNewJa(""); setShowForm(false);
    } catch (e) { handleError(e); }
  };

  const handleUpdate = async () => {
    if (!editId || !editName.trim()) return;
    try {
      await updateCat.mutateAsync({ id: editId, name: editName.trim(), japaneseName: editJa.trim() });
      setEditId(null);
    } catch (e) { handleError(e); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteCat.mutateAsync(deleteId);
      setDeleteId(null);
    } catch (e) { handleError(e); }
  };

  const startEdit = (cat: typeof rows[number]) => {
    setEditId(cat.id); setEditName(cat.name); setEditJa(cat.japaneseName);
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
        <div className="flex items-end gap-3 rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="flex-1"><Input label="Category name" placeholder="e.g. Tempura" value={newName} onChange={(e) => setNewName(e.target.value)} /></div>
          <div className="flex-1"><Input label="Japanese translation" placeholder="e.g. 天ぷら" value={newJa} onChange={(e) => setNewJa(e.target.value)} /></div>
          <Button size="sm" onClick={handleAdd} isLoading={createCat.isPending}>Save</Button>
          <Button size="sm" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
        </div>
      )}

      <p className="text-xs" style={{ color: "var(--ink4)" }}>
        {cats.length} categories · {rows.reduce((n, r) => n + r.total, 0)} total products
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-xs font-medium" style={{ borderColor: "var(--border)", color: "var(--ink4)" }}>
              <th className="pb-2 pr-4">Category</th>
              <th className="pb-2 pr-4">Japanese</th>
              <th className="pb-2 pr-4">Total</th>
              <th className="pb-2 pr-4">Live</th>
              <th className="pb-2 pr-4">Hidden</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b text-sm" style={{ borderColor: "var(--border)" }}>
                {editId === r.id ? (
                  <>
                    <td className="py-2 pr-4">
                      <input value={editName} onChange={(e) => setEditName(e.target.value)}
                        className="w-full rounded border px-2 py-1 text-sm" style={{ borderColor: "var(--border)" }} />
                    </td>
                    <td className="py-2 pr-4">
                      <input value={editJa} onChange={(e) => setEditJa(e.target.value)}
                        className="w-full rounded border px-2 py-1 text-sm" style={{ borderColor: "var(--border)" }} />
                    </td>
                    <td className="py-3 pr-4" style={{ color: "var(--ink3)" }}>{r.total}</td>
                    <td className="py-3 pr-4" style={{ color: "var(--green)" }}>{r.live}</td>
                    <td className="py-3 pr-4" style={{ color: "var(--ink4)" }}>{r.hidden || "—"}</td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleUpdate} isLoading={updateCat.isPending}>Save</Button>
                        <Button size="sm" variant="secondary" onClick={() => setEditId(null)}>Cancel</Button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 pr-4 font-medium" style={{ color: "var(--ink)" }}>{r.name}</td>
                    <td className="py-3 pr-4 font-serif text-xs" style={{ color: "var(--ink4)" }}>{r.japaneseName || "—"}</td>
                    <td className="py-3 pr-4" style={{ color: "var(--ink3)" }}>{r.total}</td>
                    <td className="py-3 pr-4" style={{ color: "var(--green)" }}>{r.live}</td>
                    <td className="py-3 pr-4" style={{ color: "var(--ink4)" }}>{r.hidden || "—"}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(r)} className="text-xs font-medium" style={{ color: "var(--primary)" }}>Edit</button>
                        <button onClick={() => setDeleteId(r.id)} className="text-xs font-medium" style={{ color: "var(--red)" }}>Delete</button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete category"
        message="This will remove the category. Products in this category will not be deleted but may become uncategorized."
        isLoading={deleteCat.isPending}
      />
    </div>
  );
}
