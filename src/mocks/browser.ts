import { setupWorker } from "msw/browser";
import { productHandlers } from "./handlers/product.handlers";
import { orderHandlers } from "./handlers/order.handlers";
import { settingsHandlers } from "./handlers/settings.handlers";
import { dashboardHandlers } from "./handlers/dashboard.handlers";
import { authHandlers } from "./handlers/auth.handlers";
import { categoryHandlers } from "./handlers/category.handlers";

export const worker = setupWorker(
  ...productHandlers,
  ...orderHandlers,
  ...settingsHandlers,
  ...dashboardHandlers,
  ...authHandlers,
  ...categoryHandlers,
);
