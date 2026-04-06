import { nanoid } from "nanoid";
import type {
  Product,
  Order,
  PricingSettings,
  ProductId,
  OrderId,
  Money,
} from "@/domain.contract";

// Type helpers — only used here and in mocks
const pid = (s: string): ProductId => s as ProductId;
const oid = (s: string): OrderId => s as OrderId;
const cash = (n: number): Money => n as Money;
const now = () => new Date().toISOString();
const daysAgo = (d: number) =>
  new Date(Date.now() - d * 86_400_000).toISOString();
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=480&h=320`;

// ── Seed products ────────────────────────────────────────────────────────────

const SEED_PRODUCTS: Product[] = [
  {
    id: pid("prod_01"),
    categoryId: "cat_mains",
    name: "Truffle Risotto",
    category: "Mains",
    description:
      "Arborio rice, aged black truffle shavings, parmesan foam, chive oil",
    priceInCents: cash(2800),
    imageUrl: img("1476124369491-e7addf5db371"),
    rating: 4.9,
    badge: "Chef's Pick",
    allergens: ["G", "D"],
    isAvailable: true,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(2),
  },
  {
    id: pid("prod_02"),
    categoryId: "cat_mains",
    name: "Wagyu Burger",
    category: "Mains",
    description:
      "A5 wagyu patty, brioche bun, caramelized onion, truffle aioli, cornichon",
    priceInCents: cash(3400),
    imageUrl: img("1568901346375-23c9450c58cd"),
    rating: 4.8,
    badge: null,
    allergens: ["G", "D", "E"],
    isAvailable: true,
    createdAt: daysAgo(28),
    updatedAt: daysAgo(1),
  },
  {
    id: pid("prod_03"),
    categoryId: "cat_starters",
    name: "Burrata Salad",
    category: "Starters",
    description:
      "Buffalo burrata, heirloom tomatoes, basil oil, aged balsamic, Maldon sea salt",
    priceInCents: cash(1800),
    imageUrl: img("1512621776951-a57141f2eefd"),
    rating: 4.7,
    badge: null,
    allergens: ["D"],
    isAvailable: true,
    createdAt: daysAgo(25),
    updatedAt: daysAgo(3),
  },
  {
    id: pid("prod_04"),
    categoryId: "cat_starters",
    name: "Lobster Bisque",
    category: "Starters",
    description:
      "Atlantic lobster, cognac cream reduction, chive oil, sourdough crostini",
    priceInCents: cash(2200),
    imageUrl: img("1547592180-85f173990554"),
    rating: 4.9,
    badge: "Seasonal",
    allergens: ["G", "S", "D"],
    isAvailable: true,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(1),
  },
  {
    id: pid("prod_05"),
    categoryId: "cat_desserts",
    name: "Chocolate Fondant",
    category: "Desserts",
    description:
      "72% Valrhona dark chocolate, warm vanilla crème, edible gold leaf",
    priceInCents: cash(1400),
    imageUrl: img("1578985545062-69928b1d9587"),
    rating: 5.0,
    badge: "#1 Dessert",
    allergens: ["G", "D", "E"],
    isAvailable: true,
    createdAt: daysAgo(18),
    updatedAt: daysAgo(0),
  },
  {
    id: pid("prod_06"),
    categoryId: "cat_desserts",
    name: "Crème Brûlée",
    category: "Desserts",
    description:
      "Madagascar bourbon vanilla custard, caramelized sugar crust, fresh berry",
    priceInCents: cash(1200),
    imageUrl: img("1488477304112-4944851de03d"),
    rating: 4.8,
    badge: null,
    allergens: ["D", "E"],
    isAvailable: true,
    createdAt: daysAgo(15),
    updatedAt: daysAgo(2),
  },
  {
    id: pid("prod_07"),
    categoryId: "cat_drinks",
    name: "Château Margaux 2018",
    category: "Drinks",
    description:
      "Bordeaux, France. Blackcurrant, cedarwood, tobacco leaf. Long mineral finish.",
    priceInCents: cash(8500),
    imageUrl: img("1510812431401-41d2bd2722f3"),
    rating: 5.0,
    badge: "Sommelier Pick",
    allergens: ["S"],
    isAvailable: true,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(5),
  },
  {
    id: pid("prod_08"),
    categoryId: "cat_drinks",
    name: "Perrier-Jouët Belle Époque",
    category: "Drinks",
    description:
      "Blanc de Blancs Champagne. White peach, floral, brioche, citrus zest.",
    priceInCents: cash(6500),
    imageUrl: img("1558618666-fcd25c85cd64"),
    rating: 4.9,
    badge: null,
    allergens: ["S"],
    isAvailable: true,
    createdAt: daysAgo(55),
    updatedAt: daysAgo(4),
  },
  {
    id: pid("prod_09"),
    categoryId: "cat_mains",
    name: "Pan-Seared Sea Bass",
    category: "Mains",
    description:
      "Line-caught sea bass, lemon beurre blanc, asparagus, capers, samphire",
    priceInCents: cash(3800),
    imageUrl: img("1519708227418-a8e4b09a8674"),
    rating: 4.8,
    badge: null,
    allergens: ["F", "D"],
    isAvailable: true,
    createdAt: daysAgo(10),
    updatedAt: daysAgo(1),
  },
  {
    id: pid("prod_10"),
    categoryId: "cat_starters",
    name: "Artisan Cheese Board",
    category: "Starters",
    description:
      "Comté 18-month, Brie de Meaux, Roquefort PDO, quince paste, candied walnuts",
    priceInCents: cash(2400),
    imageUrl: img("1452195100486-9cc805987862"),
    rating: 4.7,
    badge: null,
    allergens: ["D", "N"],
    isAvailable: true,
    createdAt: daysAgo(8),
    updatedAt: daysAgo(2),
  },
  {
    id: pid("prod_11"),
    categoryId: "cat_desserts",
    name: "Tarte Tatin",
    category: "Desserts",
    description:
      "Caramelized Braeburn apple, all-butter puff pastry, Normandy crème fraîche",
    priceInCents: cash(1300),
    imageUrl: img("1464305795204-6f5bbfc7fb81"),
    rating: 4.6,
    badge: null,
    allergens: ["G", "D", "E"],
    isAvailable: true,
    createdAt: daysAgo(6),
    updatedAt: daysAgo(0),
  },
  {
    id: pid("prod_12"),
    categoryId: "cat_drinks",
    name: "Elderflower Pressé",
    category: "Drinks",
    description:
      "Fresh elderflower cordial, sparkling water, cucumber ribbon, fresh mint",
    priceInCents: cash(800),
    imageUrl: img("1543362906-acfc16c67564"),
    rating: 4.5,
    badge: null,
    allergens: [],
    isAvailable: true,
    createdAt: daysAgo(4),
    updatedAt: daysAgo(0),
  },
];

// ── Seed orders (spanning 2 weeks for dashboard stats) ──────────────────────

const SEED_ORDERS: Order[] = [
  {
    id: oid("ord_01"),
    status: "delivered",
    deliveryType: "standard",
    paymentMethod: "card",
    items: [
      {
        productId: "prod_01",
        name: "Truffle Risotto",
        imageUrl: img("1476124369491-e7addf5db371"),
        priceInCents: cash(2800),
        quantity: 1,
      },
      {
        productId: "prod_07",
        name: "Château Margaux 2018",
        imageUrl: img("1510812431401-41d2bd2722f3"),
        priceInCents: cash(8500),
        quantity: 1,
      },
    ],
    pricing: {
      subtotalInCents: cash(11300),
      deliveryFeeInCents: cash(0),
      serviceFeeInCents: cash(150),
      vatInCents: cash(1718),
      grandTotalInCents: cash(13168),
    },
    address: {
      firstName: "James",
      lastName: "Morrison",
      street: "14 Rue de Rivoli",
      city: "Paris",
      postalCode: "75001",
      phone: "+33 6 11 22 33 44",
    },
    customerName: "James Morrison",
    notes: null,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: oid("ord_02"),
    status: "preparing",
    deliveryType: "express",
    paymentMethod: "apple-pay",
    items: [
      {
        productId: "prod_02",
        name: "Wagyu Burger",
        imageUrl: img("1568901346375-23c9450c58cd"),
        priceInCents: cash(3400),
        quantity: 2,
      },
      {
        productId: "prod_06",
        name: "Crème Brûlée",
        imageUrl: img("1488477304112-4944851de03d"),
        priceInCents: cash(1200),
        quantity: 1,
      },
    ],
    pricing: {
      subtotalInCents: cash(8000),
      deliveryFeeInCents: cash(999),
      serviceFeeInCents: cash(150),
      vatInCents: cash(1372),
      grandTotalInCents: cash(10521),
    },
    address: {
      firstName: "Sofia",
      lastName: "Reyes",
      street: "8 Av. des Champs-Élysées",
      city: "Paris",
      postalCode: "75008",
      phone: "+33 6 22 33 44 55",
    },
    customerName: "Sofia Reyes",
    notes: null,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: oid("ord_03"),
    status: "on-way",
    deliveryType: "standard",
    paymentMethod: "card",
    items: [
      {
        productId: "prod_04",
        name: "Lobster Bisque",
        imageUrl: img("1547592180-85f173990554"),
        priceInCents: cash(2200),
        quantity: 1,
      },
      {
        productId: "prod_09",
        name: "Pan-Seared Sea Bass",
        imageUrl: img("1519708227418-a8e4b09a8674"),
        priceInCents: cash(3800),
        quantity: 1,
      },
    ],
    pricing: {
      subtotalInCents: cash(6000),
      deliveryFeeInCents: cash(0),
      serviceFeeInCents: cash(150),
      vatInCents: cash(923),
      grandTotalInCents: cash(7073),
    },
    address: {
      firstName: "Chen",
      lastName: "Wei",
      street: "22 Rue du Faubourg",
      city: "Paris",
      postalCode: "75010",
      phone: "+33 6 33 44 55 66",
    },
    customerName: "Chen Wei",
    notes: "Leave at door",
    createdAt: daysAgo(1),
    updatedAt: daysAgo(0),
  },
  {
    id: oid("ord_04"),
    status: "delivered",
    deliveryType: "standard",
    paymentMethod: "cash",
    items: [
      {
        productId: "prod_10",
        name: "Artisan Cheese Board",
        imageUrl: img("1452195100486-9cc805987862"),
        priceInCents: cash(2400),
        quantity: 1,
      },
      {
        productId: "prod_08",
        name: "Perrier-Jouët Belle Époque",
        imageUrl: img("1558618666-fcd25c85cd64"),
        priceInCents: cash(6500),
        quantity: 1,
      },
    ],
    pricing: {
      subtotalInCents: cash(8900),
      deliveryFeeInCents: cash(0),
      serviceFeeInCents: cash(150),
      vatInCents: cash(1358),
      grandTotalInCents: cash(10408),
    },
    address: {
      firstName: "Amara",
      lastName: "Diallo",
      street: "5 Rue de la Paix",
      city: "Paris",
      postalCode: "75001",
      phone: "+33 6 44 55 66 77",
    },
    customerName: "Amara Diallo",
    notes: null,
    createdAt: daysAgo(3),
    updatedAt: daysAgo(2),
  },
  {
    id: oid("ord_05"),
    status: "cancelled",
    deliveryType: "standard",
    paymentMethod: "card",
    items: [
      {
        productId: "prod_03",
        name: "Burrata Salad",
        imageUrl: img("1512621776951-a57141f2eefd"),
        priceInCents: cash(1800),
        quantity: 2,
      },
      {
        productId: "prod_11",
        name: "Tarte Tatin",
        imageUrl: img("1464305795204-6f5bbfc7fb81"),
        priceInCents: cash(1300),
        quantity: 1,
      },
    ],
    pricing: {
      subtotalInCents: cash(4900),
      deliveryFeeInCents: cash(499),
      serviceFeeInCents: cash(150),
      vatInCents: cash(832),
      grandTotalInCents: cash(6381),
    },
    address: {
      firstName: "Marcus",
      lastName: "Bell",
      street: "18 Bd Saint-Germain",
      city: "Paris",
      postalCode: "75006",
      phone: "+33 6 55 66 77 88",
    },
    customerName: "Marcus Bell",
    notes: null,
    createdAt: daysAgo(7),
    updatedAt: daysAgo(6),
  },
  {
    id: oid("ord_06"),
    status: "delivered",
    deliveryType: "standard",
    paymentMethod: "card",
    items: [
      {
        productId: "prod_05",
        name: "Chocolate Fondant",
        imageUrl: img("1578985545062-69928b1d9587"),
        priceInCents: cash(1400),
        quantity: 2,
      },
    ],
    pricing: {
      subtotalInCents: cash(2800),
      deliveryFeeInCents: cash(499),
      serviceFeeInCents: cash(150),
      vatInCents: cash(517),
      grandTotalInCents: cash(3966),
    },
    address: {
      firstName: "Lea",
      lastName: "Martin",
      street: "7 Rue Montorgueil",
      city: "Paris",
      postalCode: "75001",
      phone: "+33 6 66 77 88 99",
    },
    customerName: "Lea Martin",
    notes: null,
    createdAt: daysAgo(10),
    updatedAt: daysAgo(10),
  },
  {
    id: oid("ord_07"),
    status: "delivered",
    deliveryType: "express",
    paymentMethod: "card",
    items: [
      {
        productId: "prod_07",
        name: "Château Margaux 2018",
        imageUrl: img("1510812431401-41d2bd2722f3"),
        priceInCents: cash(8500),
        quantity: 1,
      },
    ],
    pricing: {
      subtotalInCents: cash(8500),
      deliveryFeeInCents: cash(999),
      serviceFeeInCents: cash(150),
      vatInCents: cash(1430),
      grandTotalInCents: cash(11079),
    },
    address: {
      firstName: "Hugo",
      lastName: "Bernard",
      street: "3 Av. Montaigne",
      city: "Paris",
      postalCode: "75008",
      phone: "+33 6 77 88 99 00",
    },
    customerName: "Hugo Bernard",
    notes: null,
    createdAt: daysAgo(12),
    updatedAt: daysAgo(12),
  },
];

const SEED_SETTINGS: PricingSettings = {
  currency: "USD",
  standardDeliveryInCents: cash(499),
  expressDeliveryInCents: cash(999),
  freeDeliveryThresholdInCents: cash(5000),
  freeDeliveryEnabled: true,
  serviceFeeInCents: cash(150),
  vatRatePercent: 15,
  vatEnabled: true,
  updatedAt: now(),
};

// ── In-memory store ──────────────────────────────────────────────────────────

let _products = [...SEED_PRODUCTS];
let _orders = [...SEED_ORDERS];
let _settings = { ...SEED_SETTINGS };

export const db = {
  products: {
    getAll: () => [..._products],
    getById: (id: string) => _products.find((p) => p.id === id) ?? null,
    insert: (p: Product) => {
      _products = [p, ..._products];
      return p;
    },
    update: (id: string, patch: Partial<Product>) => {
      const updated = {
        ..._products.find((p) => p.id === id)!,
        ...patch,
        updatedAt: now(),
      };
      _products = _products.map((p) => (p.id === id ? updated : p));
      return updated;
    },
    delete: (id: string) => {
      _products = _products.filter((p) => p.id !== id);
    },
  },
  orders: {
    getAll: () => [..._orders],
    getById: (id: string) => _orders.find((o) => o.id === id) ?? null,
    insert: (o: Order) => {
      _orders = [o, ..._orders];
      return o;
    },
    update: (id: string, patch: Partial<Order>) => {
      const updated = {
        ..._orders.find((o) => o.id === id)!,
        ...patch,
        updatedAt: now(),
      };
      _orders = _orders.map((o) => (o.id === id ? updated : o));
      return updated;
    },
  },
  settings: {
    get: () => ({ ..._settings }),
    update: (patch: Partial<PricingSettings>) => {
      _settings = { ..._settings, ...patch, updatedAt: now() };
      return _settings;
    },
  },
};

export { nanoid, now };
