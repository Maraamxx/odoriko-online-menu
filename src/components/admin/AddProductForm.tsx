// Fields: CreateProductInput.* (all fields from CreateProductInputSchema)
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductInputSchema, PRODUCT_CATEGORIES, type CreateProductInput } from "@/domain.contract";
import { useCreateProduct } from "@/hooks/useProducts";
import { Input, Button } from "@/components/ui";
import { COPY } from "@/constants/copy";
import { handleError } from "@/lib/error";

interface AddProductFormProps {
  readonly onDone: () => void;
}

export function AddProductForm({ onDone }: AddProductFormProps) {
  const createProduct = useCreateProduct();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RHF + Zod + exactOptionalPropertyTypes conflict
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(CreateProductInputSchema),
  } as any);
  const err = (field: string) => (errors[field] as { message?: string } | undefined)?.message;

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      await createProduct.mutateAsync(data as CreateProductInput);
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
      <div className="grid grid-cols-2 gap-4">
        <Input label="Name" error={err("name")} {...register("name")} />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: "var(--ink3)" }}>Category</label>
          <select
            className="rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: err("category") ? "var(--red)" : "var(--border)", color: "var(--ink)" }}
            {...register("category")}
          >
            <option value="">Select...</option>
            {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {err("category") && <p className="text-[11px]" style={{ color: "var(--red)" }}>{err("category")}</p>}
        </div>
      </div>
      <Input label="Description" error={err("description")} {...register("description")} />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price (cents)"
          error={err("priceInCents")}
          type="number"
          {...register("priceInCents", { valueAsNumber: true })}
        />
        <Input label="Image URL" error={err("imageUrl")} {...register("imageUrl")} />
      </div>
      <Input label="Category ID" error={err("categoryId")} {...register("categoryId")} />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onDone}>Cancel</Button>
        <Button type="submit" isLoading={createProduct.isPending}>{COPY.admin.products.add}</Button>
      </div>
    </form>
  );
}
