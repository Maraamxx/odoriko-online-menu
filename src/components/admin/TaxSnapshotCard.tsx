// Fields: PricingSettings (read-only snapshot)
"use client";

import { useSettings } from "@/hooks/useSettings";
import { SettingsRow } from "./SettingsRow";
import { Badge, Spinner } from "@/components/ui";
import { COPY } from "@/constants/copy";
import { formatPrice } from "@/lib/format";
import type { Money } from "@/domain.contract";

export function TaxSnapshotCard() {
  const { data: settings, isLoading } = useSettings();

  if (isLoading || !settings) return <Spinner />;

  const fmt = (cents: number) => formatPrice(cents as Money, settings.currency);

  return (
    <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <h3 className="mb-1 text-sm font-semibold" style={{ color: "var(--ink)" }}>{COPY.admin.settings.taxSnapshot}</h3>
      <p className="mb-4 text-xs" style={{ color: "var(--ink4)" }}>{COPY.admin.settings.taxSnapshotSub}</p>
      <SettingsRow label="Standard delivery">{fmt(settings.standardDeliveryInCents)}</SettingsRow>
      <SettingsRow label="Express delivery">{fmt(settings.expressDeliveryInCents)}</SettingsRow>
      <SettingsRow label="Free threshold">{fmt(settings.freeDeliveryThresholdInCents)}</SettingsRow>
      <SettingsRow label="Free delivery">
        <Badge variant={settings.freeDeliveryEnabled ? "success" : "neutral"}>
          {settings.freeDeliveryEnabled ? "On" : "Off"}
        </Badge>
      </SettingsRow>
      <SettingsRow label="Service fee">{fmt(settings.serviceFeeInCents)}</SettingsRow>
      <SettingsRow label="VAT">
        <Badge variant={settings.vatEnabled ? "success" : "neutral"}>
          {settings.vatEnabled ? `${settings.vatRatePercent}%` : "Off"}
        </Badge>
      </SettingsRow>
    </div>
  );
}
