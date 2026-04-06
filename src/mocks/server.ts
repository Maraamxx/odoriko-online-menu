import { setupServer } from "msw/node";
import { productHandlers } from "./handlers/product.handlers";
import { orderHandlers } from "./handlers/order.handlers";
import { settingsHandlers } from "./handlers/settings.handlers";
import { dashboardHandlers } from "./handlers/dashboard.handlers";

export const server = setupServer(
  ...productHandlers,
  ...orderHandlers,
  ...settingsHandlers,
  ...dashboardHandlers,
);
