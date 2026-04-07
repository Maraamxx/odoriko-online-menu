// Fields: CreateProductInput.* (all fields from CreateProductInputSchema)
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductInputSchema, type CreateProductInput } from "@/domain.contract";
import { useCreateProduct } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Input, Button } from "@/components/ui";
import { handleError } from "@/lib/error";

interface AddProductFormProps {
  readonly onDone: () => void;
}

export function AddProductForm({ onDone }: AddProductFormProps) {
  const createProduct = useCreateProduct();
  const { data: categories } = useCategories();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RHF + Zod + exactOptionalPropertyTypes conflict
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(CreateProductInputSchema),
    defaultValues: { rating: 4.5, imageUrl: "/dishes/placeholder.webp" },
  } as any);
  const err = (field: string) => (errors[field] as { message?: string } | undefined)?.message;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setValue("imageUrl", url, { shouldValidate: true });
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      const priceEgp = data.priceInCents as number;
      const input = {
        ...data,
        priceInCents: Math.round(priceEgp * 100),
        categoryId: `cat_${(data.category as string).toLowerCase().replace(/[& ]/g, "_")}`,
      } as CreateProductInput;
      await createProduct.mutateAsync(input);
      onDone();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-xl border p-6"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <h3 className="font-serif text-lg font-semibold" style={{ color: "var(--ink)" }}>New product</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Product name" placeholder="e.g. Foie Gras Terrine" error={err("name")} {...register("name")} />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: "var(--ink3)" }}>Category</label>
          <select
            className="rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: err("category") ? "var(--red)" : "var(--border)", color: "var(--ink)" }}
            {...register("category")}
          >
            <option value="">Select...</option>
            {(categories ?? []).map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          {err("category") && <p className="text-[11px]" style={{ color: "var(--red)" }}>{err("category")}</p>}
        </div>
      </div>

      <Input
        label="Price (EGP)"
        placeholder="0.00"
        error={err("priceInCents")}
        type="number"
        step="0.01"
        {...register("priceInCents", { valueAsNumber: true })}
      />

      <Input label="Description" placeholder="Concise, elegant dish description for guests..." error={err("description")} {...register("description")} />

      {/* Image upload */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium" style={{ color: "var(--ink3)" }}>Dish photo</label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-colors hover:border-[var(--ink4)]"
            style={{ borderColor: err("imageUrl") ? "var(--red)" : "var(--border2)" }}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="var(--ink4)" strokeWidth={1.5}>
                <path d="M12 5v14M5 12h14" />
              </svg>
            )}
          </button>
          <div className="flex flex-col gap-1">
            <span className="text-xs" style={{ color: "var(--ink3)" }}>
              {preview ? "Photo selected" : "Click to upload a dish photo"}
            </span>
            {err("imageUrl") && <p className="text-[11px]" style={{ color: "var(--red)" }}>{err("imageUrl")}</p>}
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <input type="hidden" {...register("imageUrl")} />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onDone}>Cancel</Button>
        <Button type="submit" isLoading={createProduct.isPending}>Save product</Button>
      </div>
    </form>
  );
}
