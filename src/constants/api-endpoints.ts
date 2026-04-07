export const API = {
  PRODUCTS:           'products',
  PRODUCT:            (id: string) => `products/${id}` as const,
  PRODUCT_AVAILABILITY:(id: string) => `products/${id}/availability` as const,
  ORDERS:             'orders',
  ORDER:              (id: string) => `orders/${id}` as const,
  ORDER_STATUS:       (id: string) => `orders/${id}/status` as const,
  SETTINGS:           'settings',
  DASHBOARD_STATS:    'dashboard/stats',
  CATEGORIES:         'categories',
  CATEGORY:           (id: string) => `categories/${id}` as const,
} as const;