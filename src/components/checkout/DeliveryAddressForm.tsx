// Fields: DeliveryAddress.firstName, lastName, street, city, postalCode, phone
"use client";

import type { UseFormReturn } from "react-hook-form";
import type { DeliveryAddress } from "@/domain.contract";
import { Input } from "@/components/ui";
import { COPY } from "@/constants/copy";

interface DeliveryAddressFormProps {
  readonly form: UseFormReturn<DeliveryAddress>;
}

export function DeliveryAddressForm({ form }: DeliveryAddressFormProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label={COPY.forms.firstName} error={errors.firstName?.message} {...register("firstName")} />
        <Input label={COPY.forms.lastName} error={errors.lastName?.message} {...register("lastName")} />
      </div>
      <Input label={COPY.forms.street} error={errors.street?.message} {...register("street")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label={COPY.forms.city} error={errors.city?.message} {...register("city")} />
        <Input label={COPY.forms.postalCode} error={errors.postalCode?.message} {...register("postalCode")} />
      </div>
      <Input label={COPY.forms.phone} error={errors.phone?.message} type="tel" {...register("phone")} />
    </div>
  );
}
