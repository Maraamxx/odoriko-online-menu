// Fields: DashboardStats.* via useDashboardStats
"use client";

import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useSettings } from "@/hooks/useSettings";
import { StatCard } from "./StatCard";
import { SectionError } from "@/components/errors/SectionError";
import { Spinner } from "@/components/ui";
import { COPY } from "@/constants/copy";
import { formatPrice, formatPercent } from "@/lib/format";
import type { Money } from "@/domain.contract";

export function StatCardGrid() {
  const { data: stats, isLoading, error, refetch } = useDashboardStats();
  const settings = useSettings();
  const currency = settings.data?.currency ?? "EGP";

  if (error) return <SectionError message={COPY.errors.server} onRetry={() => void refetch()} />;
  if (isLoading || !stats) return <div className="flex justify-center py-16"><Spinner size={28} /></div>;

  const changeType = stats.revenueChangePercent > 0 ? "up" as const
    : stats.revenueChangePercent < 0 ? "down" as const : "neutral" as const;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label={COPY.admin.stats.revenue}
        value={formatPrice(stats.revenueInCents as Money, currency)}
        change={formatPercent(stats.revenueChangePercent)}
        changeType={changeType}
        icon={<svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>}
      />
      <StatCard
        label={COPY.admin.stats.orders}
        value={String(stats.totalOrders)}
        change={`${stats.newOrdersToday} today`}
        changeType="neutral"
        icon={<svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
      />
      <StatCard
        label={COPY.admin.stats.active}
        value={String(stats.activeOrders)}
        icon={<svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={12} r={10} /><path d="M12 6v6l4 2" /></svg>}
      />
      <StatCard
        label={COPY.admin.stats.menu}
        value={String(stats.availableProducts)}
        change={`${stats.hiddenProducts} hidden`}
        changeType="neutral"
        icon={<svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18M3 12h18M3 18h18" /></svg>}
      />
    </div>
  );
}
