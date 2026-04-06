import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  DeliveryAddressSchema,
  CardDetailsSchema,
  type DeliveryAddress,
  type CardDetails,
} from "@/domain.contract";
import { useCart } from "./useCart";
import { usePlaceOrder } from "./useOrders";
import { useUIStore } from "@/store/ui.store";
import { ROUTES } from "@/constants/routes";
import { handleError } from "@/lib/error";

export type CheckoutStep = "address" | "delivery" | "payment";

export function useCheckout() {
  const router = useRouter();
  const cart = useCart();
  const placeOrder = usePlaceOrder();
  const closeCheckout = useUIStore((s) => s.closeCheckout);

  const [step, setStep] = useState<CheckoutStep>("address");

  const addressForm = useForm<DeliveryAddress>({
    resolver: zodResolver(DeliveryAddressSchema),
  });

  const cardForm = useForm<CardDetails>({
    resolver: zodResolver(CardDetailsSchema),
  });

  const goToStep = useCallback((next: CheckoutStep) => setStep(next), []);

  const submit = useCallback(async () => {
    const address = addressForm.getValues();
    try {
      const order = await placeOrder.mutateAsync({
        items: cart.items,
        deliveryType: cart.deliveryType,
        paymentMethod: cart.paymentMethod,
        address,
        notes: null,
      });
      cart.clearCart();
      closeCheckout();
      router.push(ROUTES.CONFIRMATION(order.id));
    } catch (error) {
      handleError(error);
    }
  }, [addressForm, cart, closeCheckout, placeOrder, router]);

  return {
    step,
    goToStep,
    addressForm,
    cardForm,
    cart,
    isSubmitting: placeOrder.isPending,
    submit,
  };
}
