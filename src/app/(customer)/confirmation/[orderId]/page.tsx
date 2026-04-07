// Fields: Order.id, Order.status via useOrder
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useOrder } from "@/hooks/useOrders";
import { OrderTracker } from "@/components/checkout/OrderTracker";
import { Spinner } from "@/components/ui";
import { SectionError } from "@/components/errors/SectionError";
import { COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";
import type { OrderId } from "@/domain.contract";

export default function ConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading, error, refetch } = useOrder(orderId as OrderId);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size={32} />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-8">
        <SectionError message={COPY.errors.notFound} onRetry={() => void refetch()} />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-8 px-8 py-16 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-semibold" style={{ color: "var(--ink)" }}>
          {COPY.confirmation.title}
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--ink3)" }}>
          {COPY.confirmation.subtitle}
        </p>
      </div>

      <div
        className="w-full rounded-xl border p-6"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <p className="mb-1 text-xs" style={{ color: "var(--ink4)" }}>
          {COPY.confirmation.reference}
        </p>
        <p className="mb-6 font-serif text-lg font-semibold" style={{ color: "var(--primary)" }}>
          {order.id}
        </p>
        <OrderTracker currentStatus={order.status} />
      </div>

      <Link
        href={ROUTES.MENU}
        className="rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
        style={{ background: "var(--primary)" }}
      >
        {COPY.confirmation.returnMenu}
      </Link>
    </div>
  );
}
