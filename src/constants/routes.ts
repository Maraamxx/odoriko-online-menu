export const ROUTES = {
  HOME:         '/',
  MENU:         '/menu',
  OUR_STORY:    '/our-story',
  CONTACT:      '/contact',
  CHECKOUT:     '/checkout',
  CONFIRMATION: (id: string) => `/confirmation/${id}` as const,
  ADMIN: {
    LOGIN:      '/admin/login',
    DASHBOARD:  '/admin',
    ORDERS:     '/admin/orders',
    PRODUCTS:   '/admin/products',
    CATEGORIES: '/admin/categories',
    DELIVERY:   '/admin/delivery',
    VAT:        '/admin/vat',
  },
} as const;
