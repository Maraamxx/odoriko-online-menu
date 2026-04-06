import { http, HttpResponse } from "msw";
import { db } from "../db";
import {
  PricingSettingsSchema,
  UpdatePricingSettingsInputSchema,
  type PricingSettings,
} from "@/domain.contract";
import { API } from "@/constants/api-endpoints";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
const url = (path: string) => `${BASE}/${path}`;

export const settingsHandlers = [
  http.get(url(API.SETTINGS), () => {
    return HttpResponse.json(PricingSettingsSchema.parse(db.settings.get()));
  }),

  http.patch(url(API.SETTINGS), async ({ request }) => {
    const patch = UpdatePricingSettingsInputSchema.parse(await request.json());
    const updated = db.settings.update(patch as Partial<PricingSettings>);
    return HttpResponse.json(PricingSettingsSchema.parse(updated));
  }),
];
