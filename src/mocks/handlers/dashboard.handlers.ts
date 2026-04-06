import { http, HttpResponse } from "msw";
import { db } from "../db";
import { DashboardStatsSchema } from "@/domain.contract";
import { API } from "@/constants/api-endpoints";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
const url = (path: string) => `${BASE}/${path}`;

const oneWeekAgo = () => new Date(Date.now() - 7 * 86_400_000).toISOString();

export const dashboardHandlers = [
  http.get(url(API.DASHBOARD_STATS), () => {
    const orders = db.orders.getAll();
    const products = db.products.getAll();
    const completed = orders.filter((o) => o.status === "delivered");
    const thisWeek = completed.filter((o) => o.createdAt >= oneWeekAgo());
    const lastWeek = completed.filter((o) => o.createdAt < oneWeekAgo());
    const thisRevenue = thisWeek.reduce(
      (s, o) => s + o.pricing.grandTotalInCents,
      0,
    );
    const lastRevenue = lastWeek.reduce(
      (s, o) => s + o.pricing.grandTotalInCents,
      0,
    );
    const today = new Date().toDateString();

    const stats = DashboardStatsSchema.parse({
      revenueInCents: thisRevenue,
      revenueChangePercent:
        lastRevenue === 0
          ? 0
          : ((thisRevenue - lastRevenue) / lastRevenue) * 100,
      totalOrders: orders.length,
      newOrdersToday: orders.filter(
        (o) => new Date(o.createdAt).toDateString() === today,
      ).length,
      activeOrders: orders.filter(
        (o) => o.status === "preparing" || o.status === "on-way",
      ).length,
      availableProducts: products.filter((p) => p.isAvailable).length,
      hiddenProducts: products.filter((p) => !p.isAvailable).length,
    });

    return HttpResponse.json(stats);
  }),
];
