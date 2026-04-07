export const QK = {
  products: {
    all:    ()                      => ['products'] as const,
    list:   (cat?: string)          => ['products', 'list', cat] as const,
    detail: (id: string)            => ['products', 'detail', id] as const,
  },
  orders: {
    all:    ()                      => ['orders'] as const,
    list:   ()                      => ['orders', 'list'] as const,
    detail: (id: string)            => ['orders', 'detail', id] as const,
  },
  settings: {
    all:    ()                      => ['settings'] as const,
  },
  dashboard: {
    stats:  ()                      => ['dashboard', 'stats'] as const,
  },
  categories: {
    all:    ()                      => ['categories'] as const,
  },
} as const;