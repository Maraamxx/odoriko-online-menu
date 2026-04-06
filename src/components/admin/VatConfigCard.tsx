// Fields: PricingSettings.vatEnabled, vatRatePercent
"use client";

import { useState } from "react";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { SettingsRow } from "./SettingsRow";
import { Button, Toggle, Spinner } from "@/components/ui";
import { COPY } from "@/constants/copy";
import { handleError } from "@/lib/error";

export function VatConfigCard() {
  const { data: settings, isLoading } = useSettings();
  const update = useUpdateSettings();
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [rate, setRate] = useState<number | null>(null);

  if (isLoading || !settings) return <Spinner />;

  const v = enabled ?? settings.vatEnabled;
  const r = rate ?? settings.vatRatePercent;

  const save = async () => {
    try {
      await update.mutateAsync({ vatEnabled: v, vatRatePercent: r });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <h3 className="mb-1 text-sm font-semibold" style={{ color: "var(--ink)" }}>{COPY.admin.settings.vatConfig}</h3>
      <p className="mb-4 text-xs" style={{ color: "var(--ink4)" }}>{COPY.admin.settings.vatConfigSub}</p>
      <SettingsRow label="VAT enabled">
        <Toggle checked={v} onChange={setEnabled} />
      </SettingsRow>
      <SettingsRow label="VAT rate (%)">
        <input type="number" value={r} onChange={(ev) => setRate(Number(ev.target.value))}
          className="w-24 rounded border px-2 py-1 text-sm" style={{ borderColor: "var(--border)" }}
          min={0} max={100} step={0.1} />
      </SettingsRow>
      <div className="mt-4 flex justify-end">
        <Button size="sm" isLoading={update.isPending} onClick={save}>{COPY.admin.settings.save}</Button>
      </div>
    </div>
  );
}
