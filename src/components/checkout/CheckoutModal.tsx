// Fields: CheckoutStep, DeliveryAddress, CardDetails, OrderPricing, CartItem[]
"use client";

import { useCheckout, type CheckoutStep } from "@/hooks/useCheckout";
import { useSettings } from "@/hooks/useSettings";
import { useUIStore } from "@/store/ui.store";
import { Modal, Button } from "@/components/ui";
import { DeliveryAddressForm } from "./DeliveryAddressForm";
import { DeliveryOptions } from "./DeliveryOptions";
import { PaymentOptions } from "./PaymentOptions";
import { CardDetailsForm } from "./CardDetailsForm";
import { OrderSummary } from "./OrderSummary";
import { COPY } from "@/constants/copy";
import { formatPrice } from "@/lib/format";
import type { Money } from "@/domain.contract";

const STEPS: CheckoutStep[] = ["address", "delivery", "payment"];
const STEP_LABELS = [COPY.checkout.stepAddress, COPY.checkout.stepDelivery, COPY.checkout.stepPayment];

function StepIndicator({ current }: { current: CheckoutStep }) {
  const idx = STEPS.indexOf(current);
  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold"
            style={{
              background: i <= idx ? "var(--teal)" : "var(--surface3)",
              color: i <= idx ? "white" : "var(--ink4)",
            }}
          >
            {i + 1}
          </div>
          <span className="text-xs font-medium" style={{ color: i <= idx ? "var(--teal)" : "var(--ink4)" }}>
            {STEP_LABELS[i]}
          </span>
          {i < STEPS.length - 1 && (
            <div className="mx-1 h-px w-8" style={{ background: "var(--border)" }} />
          )}
        </div>
      ))}
    </div>
  );
}

export function CheckoutModal() {
  const isOpen = useUIStore((s) => s.isCheckoutOpen);
  const closeCheckout = useUIStore((s) => s.closeCheckout);
  const checkout = useCheckout();
  const settings = useSettings();

  return (
    <Modal isOpen={isOpen} onClose={closeCheckout} title={COPY.checkout.title} size="md">
      <StepIndicator current={checkout.step} />

      {checkout.step === "address" && (
        <>
          <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--ink)" }}>
            {COPY.checkout.sectionAddress}
          </h3>
          <DeliveryAddressForm form={checkout.addressForm} />
          <div className="mt-4">
            <Button
              className="w-full"
              onClick={checkout.addressForm.handleSubmit(() => checkout.goToStep("delivery"))}
            >
              {COPY.checkout.stepDelivery}
            </Button>
          </div>
        </>
      )}

      {checkout.step === "delivery" && settings.data && (
        <>
          <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--ink)" }}>
            {COPY.checkout.sectionDelivery}
          </h3>
          <DeliveryOptions
            selected={checkout.cart.deliveryType}
            settings={settings.data}
            subtotal={(checkout.cart.pricing?.subtotalInCents ?? 0) as Money}
            currency={checkout.cart.currency}
            onSelect={checkout.cart.setDelivery}
          />
          <div className="mt-4">
            <Button className="w-full" onClick={() => checkout.goToStep("payment")}>
              {COPY.checkout.stepPayment}
            </Button>
          </div>
        </>
      )}

      {checkout.step === "payment" && settings.data && checkout.cart.pricing && (
        <>
          <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--ink)" }}>
            {COPY.checkout.sectionPayment}
          </h3>
          <PaymentOptions selected={checkout.cart.paymentMethod} onSelect={checkout.cart.setPayment} />
          {checkout.cart.paymentMethod === "card" && <CardDetailsForm form={checkout.cardForm} />}
          <div className="mt-4">
            <OrderSummary
              items={checkout.cart.items}
              pricing={checkout.cart.pricing}
              currency={checkout.cart.currency}
              settings={settings.data}
            />
          </div>
          <div className="mt-4">
            <Button
              className="w-full tracking-[0.04em]"
              size="lg"
              isLoading={checkout.isSubmitting}
              onClick={checkout.submit}
            >
              {COPY.checkout.placeOrder(
                formatPrice(checkout.cart.pricing.grandTotalInCents as Money, checkout.cart.currency),
              )}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
