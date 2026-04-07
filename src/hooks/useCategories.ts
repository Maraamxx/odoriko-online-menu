import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QK } from "@/constants/query-keys";
import { API } from "@/constants/api-endpoints";
import type { CategoryRecord } from "@/mocks/db";
import ky from "ky";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

export function useCategories() {
  return useQuery({
    queryKey: QK.categories.all(),
    queryFn: async () => {
      const res = await ky.get(`${BASE}/${API.CATEGORIES}`).json<CategoryRecord[]>();
      return res;
    },
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { name: string; japaneseName: string }) => {
      return ky.post(`${BASE}/${API.CATEGORIES}`, { json: input }).json<CategoryRecord>();
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: QK.categories.all() }),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }: { id: string; name?: string; japaneseName?: string }) => {
      return ky.patch(`${BASE}/${API.CATEGORY(id)}`, { json: patch }).json<CategoryRecord>();
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: QK.categories.all() }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await ky.delete(`${BASE}/${API.CATEGORY(id)}`);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: QK.categories.all() }),
  });
}
