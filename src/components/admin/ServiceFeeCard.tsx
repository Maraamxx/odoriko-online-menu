// Fields: PricingSettings.serviceFeeInCents
"use client";

import { useState } from "react";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { SettingsRow } from "./SettingsRow";
import { Button, Spinner } from "@/components/ui";
import { COPY } from "@/constants/copy";
import { handleError } from "@/lib/error";

export function ServiceFeeCard() {
  const { data: settings, isLoading } = useSettings();
  const update = useUpdateSettings();
  const [fee, setFee] = useState<number | null>(null);

  if (isLoading || !settings) return <Spinner />;

  const value = fee ?? settings.serviceFeeInCents;

  const save = async () => {
    try {
      await update.mutateAsync({ serviceFeeInCents: value });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <h3 className="mb-1 text-sm font-semibold" style={{ color: "var(--ink)" }}>{COPY.admin.settings.serviceFee}</h3>
      <p className="mb-4 text-xs" style={{ color: "var(--ink4)" }}>{COPY.admin.settings.serviceFeeSub}</p>
      <SettingsRow label="Fee (cents)">
        <input type="number" value={value} onChange={(ev) => setFee(Number(ev.target.value))}
          className="w-24 rounded border px-2 py-1 text-sm" style={{ borderColor: "var(--border)" }} />
      </SettingsRow>
      <div className="mt-4 flex justify-end">
        <Button size="sm" isLoading={update.isPending} onClick={save}>{COPY.admin.settings.save}</Button>
      </div>
    </div>
  );
}
