// Fields: standardDeliveryInCents, expressDeliveryInCents, freeDeliveryThresholdInCents, freeDeliveryEnabled
"use client";

import { useState } from "react";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { SettingsRow } from "./SettingsRow";
import { Button, Toggle, Spinner } from "@/components/ui";
import { COPY } from "@/constants/copy";
import { handleError } from "@/lib/error";

export function DeliveryRatesCard() {
  const { data: settings, isLoading } = useSettings();
  const update = useUpdateSettings();
  const toEgp = (cents: number) => (cents / 100).toFixed(2);
  const toCents = (egp: string) => Math.round(parseFloat(egp || "0") * 100);

  const [standard, setStandard] = useState<string | null>(null);
  const [express, setExpress] = useState<string | null>(null);
  const [threshold, setThreshold] = useState<string | null>(null);
  const [freeEnabled, setFreeEnabled] = useState<boolean | null>(null);

  if (isLoading || !settings) return <Spinner />;

  const s = standard ?? toEgp(settings.standardDeliveryInCents);
  const e = express ?? toEgp(settings.expressDeliveryInCents);
  const t = threshold ?? toEgp(settings.freeDeliveryThresholdInCents);
  const f = freeEnabled ?? settings.freeDeliveryEnabled;

  const save = async () => {
    try {
      await update.mutateAsync({
        standardDeliveryInCents: toCents(s),
        expressDeliveryInCents: toCents(e),
        freeDeliveryThresholdInCents: toCents(t),
        freeDeliveryEnabled: f,
      });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <h3 className="mb-1 text-sm font-semibold" style={{ color: "var(--ink)" }}>{COPY.admin.settings.deliveryRates}</h3>
      <p className="mb-4 text-xs" style={{ color: "var(--ink4)" }}>{COPY.admin.settings.deliveryRatesSub}</p>
      <SettingsRow label="Standard delivery (EGP)">
        <input type="number" step="0.01" value={s} onChange={(ev) => setStandard(ev.target.value)}
          className="w-24 rounded border px-2 py-1 text-sm" style={{ borderColor: "var(--border)" }} />
      </SettingsRow>
      <SettingsRow label="Express delivery (EGP)">
        <input type="number" step="0.01" value={e} onChange={(ev) => setExpress(ev.target.value)}
          className="w-24 rounded border px-2 py-1 text-sm" style={{ borderColor: "var(--border)" }} />
      </SettingsRow>
      <SettingsRow label="Free delivery threshold (EGP)">
        <input type="number" step="0.01" value={t} onChange={(ev) => setThreshold(ev.target.value)}
          className="w-24 rounded border px-2 py-1 text-sm" style={{ borderColor: "var(--border)" }} />
      </SettingsRow>
      <SettingsRow label="Enable free delivery">
        <Toggle checked={f} onChange={setFreeEnabled} />
      </SettingsRow>
      <div className="mt-4 flex justify-end">
        <Button size="sm" isLoading={update.isPending} onClick={save}>{COPY.admin.settings.save}</Button>
      </div>
    </div>
  );
}
