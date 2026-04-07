// Edit product modal — updates name, description, category, price via PATCH
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Modal, Input, Button } from "@/components/ui";
import { PRODUCT_CATEGORIES, type Product, type Money } from "@/domain.contract";
import { QK } from "@/constants/query-keys";
import { handleError } from "@/lib/error";
import ky from "ky";
import { API } from "@/constants/api-endpoints";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

interface EditProductModalProps {
  readonly product: Product;
  readonly onClose: () => void;
}

export function EditProductModal({ product, onClose }: EditProductModalProps) {
  const qc = useQueryClient();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState((product.priceInCents / 100).toFixed(2));
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await ky.patch(`${BASE}/${API.PRODUCT(product.id)}`, {
        json: {
          name,
          description,
          category,
          priceInCents: Math.round(parseFloat(price) * 100) as Money,
        },
      }).json();
      await qc.invalidateQueries({ queryKey: QK.products.all() });
      onClose();
    } catch (e) {
      handleError(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen onClose={onClose} title="Edit product" size="md">
      <div className="flex flex-col gap-4 pt-2">
        <Input label="Product name" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: "var(--ink3)" }}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className="rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: "var(--border)", color: "var(--ink)" }}
          >
            {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <Input label="Price (EGP)" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} isLoading={saving}>Save changes</Button>
        </div>
      </div>
    </Modal>
  );
}
