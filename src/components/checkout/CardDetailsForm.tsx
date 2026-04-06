// Fields: CardDetails.number, expiry, cvc, holder
// UI only — this data is never submitted to the server
"use client";

import type { UseFormReturn } from "react-hook-form";
import type { CardDetails } from "@/domain.contract";
import { Input } from "@/components/ui";
import { COPY } from "@/constants/copy";

interface CardDetailsFormProps {
  readonly form: UseFormReturn<CardDetails>;
}

export function CardDetailsForm({ form }: CardDetailsFormProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="mt-4 flex flex-col gap-4">
      <Input label={COPY.forms.cardNumber} error={errors.number?.message} {...register("number")} />
      <div className="grid grid-cols-2 gap-4">
        <Input label={COPY.forms.expiry} error={errors.expiry?.message} placeholder="MM/YY" {...register("expiry")} />
        <Input label={COPY.forms.cvc} error={errors.cvc?.message} {...register("cvc")} />
      </div>
      <Input label={COPY.forms.holder} error={errors.holder?.message} {...register("holder")} />
    </div>
  );
}
