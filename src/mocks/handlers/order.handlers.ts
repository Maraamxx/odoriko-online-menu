import { http, HttpResponse } from "msw";
import { nanoid } from "nanoid";
import { db, now } from "../db";
import {
  OrderSchema,
  OrderArraySchema,
  CreateOrderInputSchema,
  UpdateOrderStatusInputSchema,
  type OrderId,
} from "@/domain.contract";
import { buildOrderPricing } from "@/services/pricing.service";
import { API } from "@/constants/api-endpoints";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
const url = (path: string) => `${BASE}/${path}`;

export const orderHandlers = [
  http.get(url(API.ORDERS), () => {
    return HttpResponse.json(OrderArraySchema.parse(db.orders.getAll()));
  }),

  http.get(url(API.ORDER(":id")), ({ params }) => {
    const order = db.orders.getById(params["id"] as string);
    if (!order)
      return HttpResponse.json(
        { error: "NOT_FOUND", message: "Order not found" },
        { status: 404 },
      );
    return HttpResponse.json(OrderSchema.parse(order));
  }),

  http.post(url(API.ORDERS), async ({ request }) => {
    const body = CreateOrderInputSchema.parse(await request.json());
    const settings = db.settings.get();
    const pricing = buildOrderPricing(body.items, body.deliveryType, settings);
    const order = OrderSchema.parse({
      ...body,
      id: nanoid() as OrderId,
      status: "pending",
      pricing,
      customerName: `${body.address.firstName} ${body.address.lastName}`,
      createdAt: now(),
      updatedAt: now(),
    });
    db.orders.insert(order);
    return HttpResponse.json(order, { status: 201 });
  }),

  http.patch(url(API.ORDER_STATUS(":id")), async ({ params, request }) => {
    const { status } = UpdateOrderStatusInputSchema.parse(
      await request.json(),
    );
    const order = db.orders.getById(params["id"] as string);
    if (!order)
      return HttpResponse.json(
        { error: "NOT_FOUND", message: "Order not found" },
        { status: 404 },
      );
    const updated = db.orders.update(params["id"] as string, { status });
    return HttpResponse.json(OrderSchema.parse(updated));
  }),
];
