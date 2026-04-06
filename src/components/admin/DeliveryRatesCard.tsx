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
  const [standard, setStandard] = useState<number | null>(null);
  const [express, setExpress] = useState<number | null>(null);
  const [threshold, setThreshold] = useState<number | null>(null);
  const [freeEnabled, setFreeEnabled] = useState<boolean | null>(null);

  if (isLoading || !settings) return <Spinner />;

  const s = standard ?? settings.standardDeliveryInCents;
  const e = express ?? settings.expressDeliveryInCents;
  const t = threshold ?? settings.freeDeliveryThresholdInCents;
  const f = freeEnabled ?? settings.freeDeliveryEnabled;

  const save = async () => {
    try {
      await update.mutateAsync({
        standardDeliveryInCents: s,
        expressDeliveryInCents: e,
        freeDeliveryThresholdInCents: t,
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
      <SettingsRow label="Standard (cents)">
        <input type="number" value={s} onChange={(ev) => setStandard(Number(ev.target.value))}
          className="w-24 rounded border px-2 py-1 text-sm" style={{ borderColor: "var(--border)" }} />
      </SettingsRow>
      <SettingsRow label="Express (cents)">
        <input type="number" value={e} onChange={(ev) => setExpress(Number(ev.target.value))}
          className="w-24 rounded border px-2 py-1 text-sm" style={{ borderColor: "var(--border)" }} />
      </SettingsRow>
      <SettingsRow label="Free threshold (cents)">
        <input type="number" value={t} onChange={(ev) => setThreshold(Number(ev.target.value))}
          className="w-24 rounded border px-2 py-1 text-sm" style={{ borderColor: "var(--border)" }} />
      </SettingsRow>
      <SettingsRow label="Free delivery enabled">
        <Toggle checked={f} onChange={setFreeEnabled} />
      </SettingsRow>
      <div className="mt-4 flex justify-end">
        <Button size="sm" isLoading={update.isPending} onClick={save}>{COPY.admin.settings.save}</Button>
      </div>
    </div>
  );
}
