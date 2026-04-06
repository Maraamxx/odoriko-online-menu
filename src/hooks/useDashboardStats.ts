import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { QK } from "@/constants/query-keys";
import { API } from "@/constants/api-endpoints";
import { DashboardStatsSchema } from "@/domain.contract";

export function useDashboardStats() {
  return useQuery({
    queryKey: QK.dashboard.stats(),
    queryFn: () => apiFetch(API.DASHBOARD_STATS, DashboardStatsSchema),
    staleTime: 60_000,
  });
}
