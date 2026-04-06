import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiFetch, apiMutate } from "@/lib/api-client";
import { QK } from "@/constants/query-keys";
import { API } from "@/constants/api-endpoints";
import {
  PricingSettingsSchema,
  type PricingSettings,
  type UpdatePricingSettingsInput,
} from "@/domain.contract";

export function useSettings() {
  return useQuery({
    queryKey: QK.settings.all(),
    queryFn: () => apiFetch(API.SETTINGS, PricingSettingsSchema),
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdatePricingSettingsInput) =>
      apiMutate("patch", API.SETTINGS, input, PricingSettingsSchema),
    onSuccess: (updated) =>
      qc.setQueryData<PricingSettings>(QK.settings.all(), updated),
  });
}
