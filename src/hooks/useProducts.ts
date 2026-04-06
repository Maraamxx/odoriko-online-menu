import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiFetch, apiMutate, apiDelete } from "@/lib/api-client";
import { QK } from "@/constants/query-keys";
import { API } from "@/constants/api-endpoints";
import {
  ProductArraySchema,
  ProductSchema,
  CreateProductInputSchema,
  type ProductCategory,
  type CreateProductInput,
  type ProductId,
} from "@/domain.contract";

export function useProducts(category?: ProductCategory) {
  return useQuery({
    queryKey: QK.products.list(category),
    queryFn: () =>
      apiFetch(
        API.PRODUCTS,
        ProductArraySchema,
        category ? { category } : undefined,
      ),
  });
}

export function useToggleAvailability() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: ProductId) =>
      apiMutate("patch", API.PRODUCT_AVAILABILITY(id), {}, ProductSchema),
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: QK.products.all() }),
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateProductInput) =>
      apiMutate(
        "post",
        API.PRODUCTS,
        CreateProductInputSchema.parse(input),
        ProductSchema,
      ),
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: QK.products.all() }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: ProductId) => apiDelete(API.PRODUCT(id)),
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: QK.products.all() }),
  });
}
