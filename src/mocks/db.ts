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
const dish = (cat: string, file: string) =>
  `/dishes/${cat}/${file.replace(/\.(png|PNG|jpg|JPG|jpeg)$/, ".webp")}`;

// ── Seed products ────────────────────────────────────────────────────────────

const SEED_PRODUCTS: Product[] = [
  // ─── Starters ────────────────────────────────────────────────────────────
  { id: pid("prod_001"), categoryId: "cat_starters", name: "Firecracker Shrimp", category: "Starters", description: "Crispy tempura shrimp, sriracha glaze, sesame, micro greens", priceInCents: cash(44000), imageUrl: dish("starters", "firecraker-sherimp.png"), rating: 4.8, badge: null, allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(30), updatedAt: daysAgo(1) },
  { id: pid("prod_002"), categoryId: "cat_starters", name: "Odoriko's Beef Tataki", category: "Starters", description: "Seared wagyu tataki, ponzu, crispy garlic, radish, shiso", priceInCents: cash(55000), imageUrl: dish("starters", "odoriko-beef-tataki-.png"), rating: 4.9, badge: "Chef's Pick", allergens: ["S", "G"], isAvailable: true, createdAt: daysAgo(30), updatedAt: daysAgo(1) },
  { id: pid("prod_003"), categoryId: "cat_starters", name: "Wasabi Calamari", category: "Starters", description: "Crispy squid rings, wasabi mayo, pickled ginger, lime", priceInCents: cash(36000), imageUrl: dish("starters", "wasabi-calamari-.png"), rating: 4.6, badge: null, allergens: ["G", "E"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(2) },
  { id: pid("prod_004"), categoryId: "cat_starters", name: "Loaded Kimchi Fries", category: "Starters", description: "Crispy fries, aged kimchi, spicy mayo, nori, bonito flakes", priceInCents: cash(42000), imageUrl: dish("starters", "loaded-kimtchi-frise.png"), rating: 4.7, badge: null, allergens: ["G", "D"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(1) },
  { id: pid("prod_005"), categoryId: "cat_starters", name: "Seoul of Tokyo Wings", category: "Starters", description: "Korean-style fried wings, gochujang glaze, sesame, scallion", priceInCents: cash(32000), imageUrl: dish("starters", "seoul-of-tokyo-wings-.png"), rating: 4.8, badge: "Popular", allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(27), updatedAt: daysAgo(0) },
  { id: pid("prod_006"), categoryId: "cat_starters", name: "Chicken Teriyaki Wings", category: "Starters", description: "Glazed wings, house teriyaki, toasted sesame, yuzu zest", priceInCents: cash(31000), imageUrl: dish("starters", "teriyaki-chicken-wings-.png"), rating: 4.5, badge: null, allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(26), updatedAt: daysAgo(1) },
  { id: pid("prod_007"), categoryId: "cat_starters", name: "Shrimp Summer Rolls", category: "Starters", description: "Rice paper, tiger shrimp, mango, mint, nuoc cham dipping sauce", priceInCents: cash(54000), imageUrl: dish("starters", "garden-summer-roll.png"), rating: 4.7, badge: null, allergens: ["S", "F"], isAvailable: true, createdAt: daysAgo(25), updatedAt: daysAgo(2) },
  { id: pid("prod_008"), categoryId: "cat_starters", name: "Smokey Butter Corn Ribs", category: "Starters", description: "Charred corn ribs, miso butter, chili flakes, lime", priceInCents: cash(23000), imageUrl: dish("starters", "smokey-butter-corn-ribs-.png"), rating: 4.6, badge: null, allergens: ["D"], isAvailable: true, createdAt: daysAgo(24), updatedAt: daysAgo(0) },
  { id: pid("prod_009"), categoryId: "cat_starters", name: "Tuna Avocado Roulade", category: "Starters", description: "Fresh tuna, avocado mousse, tobiko, truffle ponzu", priceInCents: cash(38000), imageUrl: dish("starters", "tuna-avocado-roulade.png"), rating: 4.8, badge: null, allergens: ["F", "S"], isAvailable: true, createdAt: daysAgo(23), updatedAt: daysAgo(1) },
  { id: pid("prod_010"), categoryId: "cat_starters", name: "Charred Chili Garlic Edamame", category: "Starters", description: "Wok-tossed edamame, garlic, chili oil, flaky salt", priceInCents: cash(27000), imageUrl: dish("starters", "charred-chili-garlic-edamame-.png"), rating: 4.4, badge: null, allergens: ["S"], isAvailable: true, createdAt: daysAgo(22), updatedAt: daysAgo(0) },
  { id: pid("prod_011"), categoryId: "cat_starters", name: "Citrus Yellowtail Carpaccio", category: "Starters", description: "Thinly sliced yellowtail, yuzu dressing, jalapeño, microgreens", priceInCents: cash(69500), imageUrl: dish("starters", "citrus-yellowtail-carpaccio-.jpg"), rating: 4.9, badge: "Seasonal", allergens: ["F", "S"], isAvailable: true, createdAt: daysAgo(20), updatedAt: daysAgo(1) },
  { id: pid("prod_012"), categoryId: "cat_starters", name: "Miso Chermoula Eggplant", category: "Starters", description: "Roasted eggplant, miso chermoula, pomegranate, pine nuts", priceInCents: cash(23500), imageUrl: dish("starters", "miso-chermoula-eggplant.png"), rating: 4.5, badge: null, allergens: ["N"], isAvailable: true, createdAt: daysAgo(19), updatedAt: daysAgo(0) },

  // ─── Salads ──────────────────────────────────────────────────────────────
  { id: pid("prod_013"), categoryId: "cat_salads", name: "Sesame Salmon Salad", category: "Salads", description: "Seared salmon, mixed greens, sesame dressing, avocado, edamame", priceInCents: cash(44000), imageUrl: dish("salads", "sesame-salmon-salad.webp"), rating: 4.7, badge: null, allergens: ["F", "S"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(1) },
  { id: pid("prod_014"), categoryId: "cat_salads", name: "Edamame Quinoa Salad", category: "Salads", description: "Quinoa, edamame, roasted vegetables, miso vinaigrette", priceInCents: cash(38500), imageUrl: dish("salads", "edamame-quinoa-salad.webp"), rating: 4.5, badge: null, allergens: ["S"], isAvailable: true, createdAt: daysAgo(27), updatedAt: daysAgo(0) },
  { id: pid("prod_015"), categoryId: "cat_salads", name: "Thai Beef Noodle Salad", category: "Salads", description: "Grilled beef, glass noodles, Thai herbs, chili lime dressing", priceInCents: cash(52500), imageUrl: dish("salads", "thai-beef-noodle-salad.webp"), rating: 4.8, badge: null, allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(26), updatedAt: daysAgo(1) },
  { id: pid("prod_016"), categoryId: "cat_salads", name: "Salmon Poke Bowl", category: "Salads", description: "Fresh salmon, sushi rice, avocado, mango, sesame soy dressing", priceInCents: cash(59500), imageUrl: dish("salads", "salmon-poke-bowl.webp"), rating: 4.9, badge: "Popular", allergens: ["F", "S", "G"], isAvailable: true, createdAt: daysAgo(25), updatedAt: daysAgo(0) },

  // ─── Soups & Ramen ───────────────────────────────────────────────────────
  { id: pid("prod_017"), categoryId: "cat_soups", name: "Beef Shoyu Ramen", category: "Soups & Ramen", description: "Rich beef broth, chashu, ramen egg, nori, bamboo shoots, scallion", priceInCents: cash(52500), imageUrl: dish("soups-ramen", "beef-shoyu-ramen.webp"), rating: 4.9, badge: "Best Seller", allergens: ["G", "E", "S"], isAvailable: true, createdAt: daysAgo(30), updatedAt: daysAgo(0) },
  { id: pid("prod_018"), categoryId: "cat_soups", name: "Chicken Shoyu Ramen", category: "Soups & Ramen", description: "Chicken broth, tender chicken, ramen egg, corn, nori", priceInCents: cash(42400), imageUrl: dish("soups-ramen", "chicken-shoyu-ramen.webp"), rating: 4.7, badge: null, allergens: ["G", "E", "S"], isAvailable: true, createdAt: daysAgo(29), updatedAt: daysAgo(1) },
  { id: pid("prod_019"), categoryId: "cat_soups", name: "Mussels in Miso Butter Broth", category: "Soups & Ramen", description: "Fresh mussels, white miso, butter, garlic, sourdough", priceInCents: cash(48500), imageUrl: dish("soups-ramen", "mussls-in-miso-butter-broth.png"), rating: 4.8, badge: null, allergens: ["D", "S", "G"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(0) },

  // ─── From the Wok ────────────────────────────────────────────────────────
  { id: pid("prod_020"), categoryId: "cat_wok", name: "Beef & Mushroom Udon", category: "From the Wok", description: "Thick udon noodles, wagyu strips, shiitake, oyster sauce", priceInCents: cash(53000), imageUrl: dish("wok", "beef-&-mushroom-udon.webp"), rating: 4.8, badge: null, allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(1) },
  { id: pid("prod_021"), categoryId: "cat_wok", name: "Spicy Shrimp Udon", category: "From the Wok", description: "Udon noodles, tiger shrimp, chili garlic sauce, bok choy", priceInCents: cash(54000), imageUrl: dish("wok", "spicy-shrimp-udon.webp"), rating: 4.7, badge: null, allergens: ["G", "S", "F"], isAvailable: true, createdAt: daysAgo(27), updatedAt: daysAgo(0) },
  { id: pid("prod_022"), categoryId: "cat_wok", name: "Mongolian Beef", category: "From the Wok", description: "Wok-seared beef, sweet soy glaze, scallion, steamed rice", priceInCents: cash(49000), imageUrl: dish("wok", "mongolian-beef.webp"), rating: 4.8, badge: "Popular", allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(26), updatedAt: daysAgo(1) },
  { id: pid("prod_023"), categoryId: "cat_wok", name: "Chicken Noodle Stir Fry", category: "From the Wok", description: "Egg noodles, chicken breast, vegetables, teriyaki sauce", priceInCents: cash(36000), imageUrl: dish("wok", "chicken-noodle-stir-fry.webp"), rating: 4.5, badge: null, allergens: ["G", "E", "S"], isAvailable: true, createdAt: daysAgo(25), updatedAt: daysAgo(0) },
  { id: pid("prod_024"), categoryId: "cat_wok", name: "Chicken Cashew", category: "From the Wok", description: "Wok-tossed chicken, roasted cashews, bell peppers, hoisin", priceInCents: cash(46000), imageUrl: dish("wok", "chicken-cashew-.png"), rating: 4.6, badge: null, allergens: ["N", "G", "S"], isAvailable: true, createdAt: daysAgo(24), updatedAt: daysAgo(1) },
  { id: pid("prod_025"), categoryId: "cat_wok", name: "Biangbiang Vegetable Noodles", category: "From the Wok", description: "Hand-pulled noodles, seasonal vegetables, chili oil, Sichuan pepper", priceInCents: cash(26000), imageUrl: dish("wok", "biangbiang-vegetable-noodles.webp"), rating: 4.4, badge: null, allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(23), updatedAt: daysAgo(0) },

  // ─── Dim Sum & Bao ───────────────────────────────────────────────────────
  { id: pid("prod_026"), categoryId: "cat_dimsum", name: "Reef & Beef Gyoza", category: "Dim Sum & Bao", description: "Shrimp and wagyu filling, crispy bottom, ponzu dipping sauce", priceInCents: cash(29000), imageUrl: dish("dimsum-bao", "reef-&-beef-gyoza-.png"), rating: 4.7, badge: null, allergens: ["G", "S", "F"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(1) },
  { id: pid("prod_027"), categoryId: "cat_dimsum", name: "Crispy Shrimp Bao", category: "Dim Sum & Bao", description: "Fluffy steamed bun, crispy shrimp, spicy mayo, pickled slaw", priceInCents: cash(37500), imageUrl: dish("dimsum-bao", "crispy-shrimp-bao-.png"), rating: 4.8, badge: null, allergens: ["G", "S", "E"], isAvailable: true, createdAt: daysAgo(27), updatedAt: daysAgo(0) },
  { id: pid("prod_028"), categoryId: "cat_dimsum", name: "Gochujang Chicken Bao", category: "Dim Sum & Bao", description: "Steamed bao, Korean fried chicken, gochujang glaze, pickles", priceInCents: cash(32000), imageUrl: dish("dimsum-bao", "gochujang-chicken-bao-.png"), rating: 4.6, badge: null, allergens: ["G", "S", "E"], isAvailable: true, createdAt: daysAgo(26), updatedAt: daysAgo(1) },
  { id: pid("prod_029"), categoryId: "cat_dimsum", name: "Teriyaki Duck Bao", category: "Dim Sum & Bao", description: "Slow-cooked duck, teriyaki glaze, cucumber, hoisin", priceInCents: cash(36000), imageUrl: dish("dimsum-bao", "teriyaki-duck-bao-.png"), rating: 4.8, badge: null, allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(25), updatedAt: daysAgo(0) },
  { id: pid("prod_030"), categoryId: "cat_dimsum", name: "Chicken Truffle Shumai", category: "Dim Sum & Bao", description: "Delicate dumplings, chicken-truffle filling, tobiko", priceInCents: cash(37000), imageUrl: dish("dimsum-bao", "chicken-truffle-shumai.png"), rating: 4.7, badge: null, allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(24), updatedAt: daysAgo(1) },
  { id: pid("prod_031"), categoryId: "cat_dimsum", name: "Pulled Beef Bao", category: "Dim Sum & Bao", description: "12-hour braised beef, smoky BBQ, pickled red onion", priceInCents: cash(45000), imageUrl: dish("dimsum-bao", "pulled-beef-.png"), rating: 4.9, badge: "Chef's Pick", allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(23), updatedAt: daysAgo(0) },
  { id: pid("prod_032"), categoryId: "cat_dimsum", name: "Truffle Bao Burger", category: "Dim Sum & Bao", description: "Bao bun, wagyu patty, truffle mayo, gruyère, rocket", priceInCents: cash(34000), imageUrl: dish("dimsum-bao", "truffel-bao-burger-.png"), rating: 4.7, badge: null, allergens: ["G", "D", "E"], isAvailable: true, createdAt: daysAgo(22), updatedAt: daysAgo(1) },
  { id: pid("prod_033"), categoryId: "cat_dimsum", name: "Hanetsuki Gyoza", category: "Dim Sum & Bao", description: "Crispy-winged dumplings, pork and ginger filling, dipping sauce", priceInCents: cash(26500), imageUrl: dish("dimsum-bao", "hanetsuki-gyoza.png"), rating: 4.5, badge: null, allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(21), updatedAt: daysAgo(0) },

  // ─── Skewers ─────────────────────────────────────────────────────────────
  { id: pid("prod_034"), categoryId: "cat_skewers", name: "Beef Kushiyaki", category: "Skewers", description: "Chargrilled wagyu skewers, tare glaze, shichimi, scallion", priceInCents: cash(59000), imageUrl: dish("skewers", "beef-kushayaki-.png"), rating: 4.9, badge: null, allergens: ["S"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(1) },
  { id: pid("prod_035"), categoryId: "cat_skewers", name: "Negima Yakitori", category: "Skewers", description: "Chicken thigh and leek skewers, tare sauce, shichimi togarashi", priceInCents: cash(48000), imageUrl: dish("skewers", "negima-yakitori.png"), rating: 4.7, badge: null, allergens: ["S"], isAvailable: true, createdAt: daysAgo(27), updatedAt: daysAgo(0) },
  { id: pid("prod_036"), categoryId: "cat_skewers", name: "Yuzu Miso Salmon", category: "Skewers", description: "Grilled salmon, yuzu miso glaze, pickled ginger", priceInCents: cash(54000), imageUrl: dish("skewers", "yuzu-miso-salamon.png"), rating: 4.8, badge: null, allergens: ["F", "S"], isAvailable: true, createdAt: daysAgo(26), updatedAt: daysAgo(1) },
  { id: pid("prod_037"), categoryId: "cat_skewers", name: "Miso Charred Corn", category: "Skewers", description: "Whole corn, white miso butter, shichimi, lime", priceInCents: cash(16000), imageUrl: dish("skewers", "miso-charred-corn-.png"), rating: 4.4, badge: null, allergens: ["D"], isAvailable: true, createdAt: daysAgo(25), updatedAt: daysAgo(0) },

  // ─── Robatayaki ──────────────────────────────────────────────────────────
  { id: pid("prod_038"), categoryId: "cat_robata", name: "Black Pepper Short Ribs Pot", category: "Robatayaki", description: "Braised short ribs, black pepper sauce, steamed rice, pickles", priceInCents: cash(139500), imageUrl: dish("robatayaki", "black-pepper-short-rib-rice-pot-.png"), rating: 5.0, badge: "Signature", allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(30), updatedAt: daysAgo(0) },
  { id: pid("prod_039"), categoryId: "cat_robata", name: "Herb-Grilled Beef Tenderloin", category: "Robatayaki", description: "Prime tenderloin, herb crust, red wine jus, roasted vegetables", priceInCents: cash(109000), imageUrl: dish("robatayaki", "herb-grilled-beef-tenderloin-.png"), rating: 4.9, badge: null, allergens: ["D"], isAvailable: true, createdAt: daysAgo(29), updatedAt: daysAgo(1) },
  { id: pid("prod_040"), categoryId: "cat_robata", name: "Cranberry Grilled Duck", category: "Robatayaki", description: "Duck breast, cranberry glaze, sweet potato purée, greens", priceInCents: cash(99000), imageUrl: dish("robatayaki", "cranberry-grilled-duck.png"), rating: 4.8, badge: null, allergens: ["S"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(0) },
  { id: pid("prod_041"), categoryId: "cat_robata", name: "Grilled Salmon Teriyaki", category: "Robatayaki", description: "Atlantic salmon fillet, teriyaki glaze, sesame, steamed greens", priceInCents: cash(99000), imageUrl: dish("robatayaki", "grilled-salmon-teriyaki.webp"), rating: 4.8, badge: null, allergens: ["F", "S"], isAvailable: true, createdAt: daysAgo(27), updatedAt: daysAgo(1) },
  { id: pid("prod_042"), categoryId: "cat_robata", name: "Miso Cured Baby Chicken", category: "Robatayaki", description: "Half chicken, white miso cure, yuzu kosho, grilled lemon", priceInCents: cash(51000), imageUrl: dish("robatayaki", "miso-cured-baby-chicken-.png"), rating: 4.6, badge: null, allergens: ["S"], isAvailable: true, createdAt: daysAgo(26), updatedAt: daysAgo(0) },

  // ─── Sushi (representative selection) ────────────────────────────────────
  { id: pid("prod_043"), categoryId: "cat_sushi", name: "Big Catch (40 pcs)", category: "Sushi", description: "Chef's selection of 40 premium nigiri, maki and sashimi pieces", priceInCents: cash(179500), imageUrl: dish("sushi", "big-catch-40-.jpg"), rating: 5.0, badge: "Best Seller", allergens: ["F", "S", "G"], isAvailable: true, createdAt: daysAgo(30), updatedAt: daysAgo(0) },
  { id: pid("prod_044"), categoryId: "cat_sushi", name: "Royal Platter (40 pcs)", category: "Sushi", description: "40 pieces of our finest sushi — toro, uni, wagyu nigiri", priceInCents: cash(260000), imageUrl: dish("sushi", "royal-sushi-platter-.png"), rating: 5.0, badge: "Premium", allergens: ["F", "S", "G"], isAvailable: true, createdAt: daysAgo(30), updatedAt: daysAgo(0) },
  { id: pid("prod_045"), categoryId: "cat_sushi", name: "Kyoto Fusion (16 pcs)", category: "Sushi", description: "16-piece assortment of uramaki and special rolls", priceInCents: cash(69500), imageUrl: dish("sushi", "kyoto-fusion-16-pieces-.jpg"), rating: 4.8, badge: null, allergens: ["F", "S", "G"], isAvailable: true, createdAt: daysAgo(29), updatedAt: daysAgo(1) },
  { id: pid("prod_046"), categoryId: "cat_sushi", name: "Samurai Spread (24 pcs)", category: "Sushi", description: "24-piece platter — nigiri, hosomaki, uramaki selection", priceInCents: cash(98000), imageUrl: dish("sushi", "samurai-spread-24-pieces.jpg"), rating: 4.9, badge: null, allergens: ["F", "S", "G"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(0) },
  { id: pid("prod_047"), categoryId: "cat_sushi", name: "Salmon Sashimi (3 pcs)", category: "Sushi", description: "Premium Norwegian salmon, hand-cut to order", priceInCents: cash(42000), imageUrl: dish("sushi", "salmon-sashimi.png"), rating: 4.9, badge: null, allergens: ["F"], isAvailable: true, createdAt: daysAgo(27), updatedAt: daysAgo(1) },
  { id: pid("prod_048"), categoryId: "cat_sushi", name: "Philly Fusion Uramaki (8 pcs)", category: "Sushi", description: "Salmon, cream cheese, avocado, tobiko, spicy mayo", priceInCents: cash(42000), imageUrl: dish("sushi", "philly-fusion-.png"), rating: 4.7, badge: null, allergens: ["F", "D", "G"], isAvailable: true, createdAt: daysAgo(26), updatedAt: daysAgo(0) },
  { id: pid("prod_049"), categoryId: "cat_sushi", name: "Truffle Toro S-Uramaki (8 pcs)", category: "Sushi", description: "Toro, black truffle, micro greens, truffle ponzu", priceInCents: cash(58000), imageUrl: dish("sushi", "truffel-toro.png"), rating: 4.9, badge: "Premium", allergens: ["F", "S", "G"], isAvailable: true, createdAt: daysAgo(25), updatedAt: daysAgo(1) },
  { id: pid("prod_050"), categoryId: "cat_sushi", name: "Salmon Nigiri (1 pc)", category: "Sushi", description: "Fresh salmon over seasoned sushi rice", priceInCents: cash(15000), imageUrl: dish("sushi", "salmon.png"), rating: 4.6, badge: null, allergens: ["F", "G"], isAvailable: true, createdAt: daysAgo(24), updatedAt: daysAgo(0) },

  // ─── Sides ───────────────────────────────────────────────────────────────
  { id: pid("prod_051"), categoryId: "cat_sides", name: "Odoriko House Fries", category: "Sides", description: "Crispy shoestring fries, nori salt, truffle mayo", priceInCents: cash(13000), imageUrl: dish("sides", "odoriko-house-fries.png"), rating: 4.5, badge: null, allergens: ["G"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(0) },
  { id: pid("prod_052"), categoryId: "cat_sides", name: "Vegetable Fried Rice", category: "Sides", description: "Wok-fried rice, seasonal vegetables, egg, soy", priceInCents: cash(15000), imageUrl: dish("sides", "vegetable-fried-rice.png"), rating: 4.3, badge: null, allergens: ["G", "E", "S"], isAvailable: true, createdAt: daysAgo(27), updatedAt: daysAgo(1) },
  { id: pid("prod_053"), categoryId: "cat_sides", name: "Shiitake Fried Rice", category: "Sides", description: "Fragrant rice, shiitake, garlic, truffle oil, scallion", priceInCents: cash(24000), imageUrl: dish("sides", "shiitake-fried-rice-.png"), rating: 4.6, badge: null, allergens: ["G", "E", "S"], isAvailable: true, createdAt: daysAgo(26), updatedAt: daysAgo(0) },
  { id: pid("prod_054"), categoryId: "cat_sides", name: "Furikake Rice", category: "Sides", description: "Steamed Japanese rice, house furikake blend, nori", priceInCents: cash(9000), imageUrl: dish("sides", "furikake-rice-.png"), rating: 4.2, badge: null, allergens: ["G", "S"], isAvailable: true, createdAt: daysAgo(25), updatedAt: daysAgo(1) },
  { id: pid("prod_055"), categoryId: "cat_sides", name: "Buttery Potato Mash", category: "Sides", description: "Creamy mashed potatoes, French butter, chives", priceInCents: cash(17500), imageUrl: dish("sides", "buttery-potato-mash-.png"), rating: 4.4, badge: null, allergens: ["D"], isAvailable: true, createdAt: daysAgo(24), updatedAt: daysAgo(0) },
  { id: pid("prod_056"), categoryId: "cat_sides", name: "Odoriko House Salad", category: "Sides", description: "Mixed greens, cherry tomato, cucumber, wafu dressing", priceInCents: cash(7000), imageUrl: dish("sides", "odoriko-house-salad.png"), rating: 4.1, badge: null, allergens: [], isAvailable: true, createdAt: daysAgo(23), updatedAt: daysAgo(1) },

  // ─── Breakfast ───────────────────────────────────────────────────────────
  { id: pid("prod_057"), categoryId: "cat_breakfast", name: "Sausage Jianbing Burrito", category: "Breakfast", description: "Chinese crêpe, scrambled egg, sausage, hoisin, crispy wonton", priceInCents: cash(34000), imageUrl: dish("breakfast", "sausage-jianbing-burrito.webp"), rating: 4.7, badge: null, allergens: ["G", "E"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(1) },
  { id: pid("prod_058"), categoryId: "cat_breakfast", name: "Matcha Pain Perdu", category: "Breakfast", description: "Brioche French toast, matcha custard, berry compote, cream", priceInCents: cash(39000), imageUrl: dish("breakfast", "matcha-pain-perdu.webp"), rating: 4.8, badge: "Popular", allergens: ["G", "D", "E"], isAvailable: true, createdAt: daysAgo(27), updatedAt: daysAgo(0) },
  { id: pid("prod_059"), categoryId: "cat_breakfast", name: "Nori Tamagoyaki Omelette", category: "Breakfast", description: "Japanese rolled omelette, nori, daikon, soy", priceInCents: cash(24000), imageUrl: dish("breakfast", "nori-rolled-omelette.webp"), rating: 4.5, badge: null, allergens: ["E", "S"], isAvailable: true, createdAt: daysAgo(26), updatedAt: daysAgo(1) },
  { id: pid("prod_060"), categoryId: "cat_breakfast", name: "Omurice", category: "Breakfast", description: "Fluffy omelette, seasoned fried rice, tomato demi-glace", priceInCents: cash(29000), imageUrl: dish("breakfast", "omurice.webp"), rating: 4.6, badge: null, allergens: ["E", "G", "D"], isAvailable: true, createdAt: daysAgo(25), updatedAt: daysAgo(0) },
  { id: pid("prod_061"), categoryId: "cat_breakfast", name: "Salmon Bao Benedict", category: "Breakfast", description: "Steamed bao, smoked salmon, avocado, hollandaise, poached egg", priceInCents: cash(52000), imageUrl: dish("breakfast", "salmon-bao-benedict.webp"), rating: 4.9, badge: "Chef's Pick", allergens: ["G", "D", "E", "F"], isAvailable: true, createdAt: daysAgo(24), updatedAt: daysAgo(1) },
  { id: pid("prod_062"), categoryId: "cat_breakfast", name: "Scramble & Sausage Bao", category: "Breakfast", description: "Fluffy scrambled eggs, chicken sausage, sriracha, bao bun", priceInCents: cash(27500), imageUrl: dish("breakfast", "scramble-&-sausage-bao.webp"), rating: 4.5, badge: null, allergens: ["G", "E"], isAvailable: true, createdAt: daysAgo(23), updatedAt: daysAgo(0) },
  { id: pid("prod_063"), categoryId: "cat_breakfast", name: "Smoked Salmon Okonomiyaki", category: "Breakfast", description: "Japanese savoury pancake, smoked salmon, bonito, kewpie", priceInCents: cash(47000), imageUrl: dish("breakfast", "smoked-salmon-okonomiyaki.webp"), rating: 4.8, badge: null, allergens: ["G", "E", "F", "D"], isAvailable: true, createdAt: daysAgo(22), updatedAt: daysAgo(1) },
  { id: pid("prod_064"), categoryId: "cat_breakfast", name: "Turkey Bao Benedict", category: "Breakfast", description: "Bao bun, roast turkey, hollandaise, poached egg, truffle", priceInCents: cash(48500), imageUrl: dish("breakfast", "turkey-bao-benedict.webp"), rating: 4.7, badge: null, allergens: ["G", "D", "E"], isAvailable: true, createdAt: daysAgo(21), updatedAt: daysAgo(0) },
  { id: pid("prod_065"), categoryId: "cat_breakfast", name: "Yuzu Yogurt Granola Bowl", category: "Breakfast", description: "Greek yogurt, house granola, yuzu, seasonal fruit, honey", priceInCents: cash(26000), imageUrl: dish("breakfast", "yuzu-yogurt-granola-bowl.webp"), rating: 4.4, badge: null, allergens: ["D", "N", "G"], isAvailable: true, createdAt: daysAgo(20), updatedAt: daysAgo(1) },
  { id: pid("prod_066"), categoryId: "cat_breakfast", name: "Natsukashii Granola Milk", category: "Breakfast", description: "Warm oat milk, crunchy granola, kinako, brown sugar", priceInCents: cash(24000), imageUrl: dish("breakfast", "natsukashii-granola-milk.webp"), rating: 4.3, badge: null, allergens: ["D", "N", "G"], isAvailable: true, createdAt: daysAgo(19), updatedAt: daysAgo(0) },

  // ─── Desserts ─────────────────────────────────────────────────────────────
  { id: pid("prod_067"), categoryId: "cat_desserts", name: "Japanese Cheesecake", category: "Desserts", description: "Light, jiggly soufflé cheesecake, berry coulis", priceInCents: cash(29000), imageUrl: dish("desserts", "japanese-chesecake.webp"), rating: 4.8, badge: null, allergens: ["D", "E", "G"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(1) },
  { id: pid("prod_068"), categoryId: "cat_desserts", name: "Tiramisu", category: "Desserts", description: "Classic Italian layers, espresso-soaked ladyfingers, mascarpone", priceInCents: cash(32000), imageUrl: dish("desserts", "tiramisu.png"), rating: 4.7, badge: null, allergens: ["D", "E", "G"], isAvailable: true, createdAt: daysAgo(27), updatedAt: daysAgo(0) },
  { id: pid("prod_069"), categoryId: "cat_desserts", name: "Lemongrass Crème Brûlée", category: "Desserts", description: "Lemongrass-infused custard, caramelized sugar, citrus zest", priceInCents: cash(22000), imageUrl: dish("desserts", "lemongrass-cr\u00c8me-br\u00dbl\u00c9e.webp"), rating: 4.6, badge: null, allergens: ["D", "E"], isAvailable: true, createdAt: daysAgo(26), updatedAt: daysAgo(1) },
  { id: pid("prod_070"), categoryId: "cat_desserts", name: "Matcha Fondant", category: "Desserts", description: "Warm matcha lava cake, vanilla ice cream, white chocolate", priceInCents: cash(32000), imageUrl: dish("desserts", "matcha-fundue.png"), rating: 4.9, badge: "#1 Dessert", allergens: ["D", "E", "G"], isAvailable: true, createdAt: daysAgo(25), updatedAt: daysAgo(0) },
  { id: pid("prod_071"), categoryId: "cat_desserts", name: "Matchamisu", category: "Desserts", description: "Matcha twist on tiramisu, mascarpone, matcha sponge", priceInCents: cash(32000), imageUrl: dish("desserts", "matchamisu.png"), rating: 4.8, badge: null, allergens: ["D", "E", "G"], isAvailable: true, createdAt: daysAgo(24), updatedAt: daysAgo(1) },
  { id: pid("prod_072"), categoryId: "cat_desserts", name: "Melon Mango Bingsu", category: "Desserts", description: "Shaved ice, fresh melon, mango, condensed milk, mochi", priceInCents: cash(32000), imageUrl: dish("desserts", "melon-mango-bingsu.webp"), rating: 4.7, badge: "Seasonal", allergens: ["D"], isAvailable: true, createdAt: daysAgo(23), updatedAt: daysAgo(0) },
  { id: pid("prod_073"), categoryId: "cat_desserts", name: "Pas Parfait", category: "Desserts", description: "Layered parfait, seasonal fruit, granola, cream", priceInCents: cash(22500), imageUrl: dish("desserts", "pas-parfait.webp"), rating: 4.5, badge: null, allergens: ["D", "G", "N"], isAvailable: true, createdAt: daysAgo(22), updatedAt: daysAgo(1) },

  // ─── Beverages ────────────────────────────────────────────────────────────
  { id: pid("prod_074"), categoryId: "cat_bev", name: "Matcha Latte", category: "Beverages", description: "Ceremonial grade matcha, steamed oat milk", priceInCents: cash(16000), imageUrl: dish("beverages", "matcha-latte.webp"), rating: 4.7, badge: "Popular", allergens: ["D"], isAvailable: true, createdAt: daysAgo(28), updatedAt: daysAgo(0) },
  { id: pid("prod_075"), categoryId: "cat_bev", name: "Iced Spanish Matcha", category: "Beverages", description: "Matcha, condensed milk, oat milk, ice", priceInCents: cash(18500), imageUrl: dish("beverages", "iced-spanish-matcha.webp"), rating: 4.6, badge: null, allergens: ["D"], isAvailable: true, createdAt: daysAgo(27), updatedAt: daysAgo(1) },
  { id: pid("prod_076"), categoryId: "cat_bev", name: "Dalgona Coffee", category: "Beverages", description: "Whipped coffee foam, iced milk, brown sugar", priceInCents: cash(21000), imageUrl: dish("beverages", "dalgona-coffee.webp"), rating: 4.5, badge: null, allergens: ["D"], isAvailable: true, createdAt: daysAgo(26), updatedAt: daysAgo(0) },
  { id: pid("prod_077"), categoryId: "cat_bev", name: "Vietnamese Coffee", category: "Beverages", description: "Strong drip coffee, condensed milk, ice", priceInCents: cash(19000), imageUrl: dish("beverages", "vietnamese-coffee.webp"), rating: 4.6, badge: null, allergens: ["D"], isAvailable: true, createdAt: daysAgo(25), updatedAt: daysAgo(1) },
  { id: pid("prod_078"), categoryId: "cat_bev", name: "Blueberry Matcha Boba", category: "Beverages", description: "Matcha, blueberry, tapioca pearls, oat milk", priceInCents: cash(28500), imageUrl: dish("beverages", "blueberry-matcha-boba.webp"), rating: 4.7, badge: null, allergens: ["D"], isAvailable: true, createdAt: daysAgo(24), updatedAt: daysAgo(0) },
  { id: pid("prod_079"), categoryId: "cat_bev", name: "Zen Zei", category: "Beverages", description: "House signature mocktail, yuzu, elderflower, sparkling water", priceInCents: cash(29500), imageUrl: dish("beverages", "zen-zei.webp"), rating: 4.8, badge: "Signature", allergens: [], isAvailable: true, createdAt: daysAgo(23), updatedAt: daysAgo(1) },
  { id: pid("prod_080"), categoryId: "cat_bev", name: "Hanami", category: "Beverages", description: "Cherry blossom, lychee, rose water, soda", priceInCents: cash(22000), imageUrl: dish("beverages", "hanami.webp"), rating: 4.6, badge: null, allergens: [], isAvailable: true, createdAt: daysAgo(22), updatedAt: daysAgo(0) },
  { id: pid("prod_081"), categoryId: "cat_bev", name: "Flat White", category: "Beverages", description: "Double ristretto, silky steamed milk", priceInCents: cash(15500), imageUrl: dish("beverages", "flat-white.webp"), rating: 4.5, badge: null, allergens: ["D"], isAvailable: true, createdAt: daysAgo(21), updatedAt: daysAgo(1) },
  { id: pid("prod_082"), categoryId: "cat_bev", name: "Cappuccino", category: "Beverages", description: "Espresso, steamed milk, foam art", priceInCents: cash(14500), imageUrl: dish("beverages", "cappuccino.webp"), rating: 4.4, badge: null, allergens: ["D"], isAvailable: true, createdAt: daysAgo(20), updatedAt: daysAgo(0) },
  { id: pid("prod_083"), categoryId: "cat_bev", name: "Iced Coffee", category: "Beverages", description: "Cold brew, ice, optional milk", priceInCents: cash(16000), imageUrl: dish("beverages", "iced-coffee.webp"), rating: 4.3, badge: null, allergens: [], isAvailable: true, createdAt: daysAgo(19), updatedAt: daysAgo(1) },
  { id: pid("prod_084"), categoryId: "cat_bev", name: "Peach Iced Tea", category: "Beverages", description: "Brewed green tea, white peach, honey, ice", priceInCents: cash(22000), imageUrl: dish("beverages", "peach-iced-tea.webp"), rating: 4.5, badge: null, allergens: [], isAvailable: true, createdAt: daysAgo(18), updatedAt: daysAgo(0) },
];

// ── Seed orders (spanning 2 weeks for dashboard stats) ──────────────────────

const SEED_ORDERS: Order[] = [
  {
    id: oid("ord_01"),
    status: "delivered",
    deliveryType: "standard",
    paymentMethod: "card",
    items: [
      { productId: "prod_017", name: "Beef Shoyu Ramen", imageUrl: dish("soups-ramen", "beef-shoyu-ramen.webp"), priceInCents: cash(52500), quantity: 2, customizations: [], notes: "" },
      { productId: "prod_079", name: "Zen Zei", imageUrl: dish("beverages", "zen-zei.webp"), priceInCents: cash(29500), quantity: 1, customizations: [], notes: "" },
    ],
    pricing: { subtotalInCents: cash(134500), deliveryFeeInCents: cash(0), serviceFeeInCents: cash(5000), vatInCents: cash(20925), grandTotalInCents: cash(160425) },
    address: { firstName: "Ahmed", lastName: "Hassan", street: "14 Road 9, Maadi", city: "Cairo", postalCode: "11431", phone: "+20 100 123 4567" },
    customerName: "Ahmed Hassan",
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
      { productId: "prod_043", name: "Big Catch (40 pcs)", imageUrl: dish("sushi", "big-catch-40-.jpg"), priceInCents: cash(179500), quantity: 1, customizations: [], notes: "" },
      { productId: "prod_070", name: "Matcha Fondant", imageUrl: dish("desserts", "matcha-fundue.png"), priceInCents: cash(32000), quantity: 2, customizations: [], notes: "" },
    ],
    pricing: { subtotalInCents: cash(243500), deliveryFeeInCents: cash(0), serviceFeeInCents: cash(5000), vatInCents: cash(37275), grandTotalInCents: cash(285775) },
    address: { firstName: "Nour", lastName: "El-Din", street: "28 Abdel Moneim Riad, Mohandessin", city: "Giza", postalCode: "12411", phone: "+20 112 234 5678" },
    customerName: "Nour El-Din",
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
      { productId: "prod_002", name: "Odoriko's Beef Tataki", imageUrl: dish("starters", "odoriko-beef-tataki-.png"), priceInCents: cash(55000), quantity: 1, customizations: [], notes: "" },
      { productId: "prod_022", name: "Mongolian Beef", imageUrl: dish("wok", "mongolian-beef.webp"), priceInCents: cash(49000), quantity: 1, customizations: [], notes: "" },
    ],
    pricing: { subtotalInCents: cash(104000), deliveryFeeInCents: cash(0), serviceFeeInCents: cash(5000), vatInCents: cash(16350), grandTotalInCents: cash(125350) },
    address: { firstName: "Youssef", lastName: "Khalil", street: "5 Taha Hussein, Zamalek", city: "Cairo", postalCode: "11211", phone: "+20 101 345 6789" },
    customerName: "Youssef Khalil",
    notes: "Ring the bell twice",
    createdAt: daysAgo(1),
    updatedAt: daysAgo(0),
  },
  {
    id: oid("ord_04"),
    status: "delivered",
    deliveryType: "standard",
    paymentMethod: "cash",
    items: [
      { productId: "prod_038", name: "Black Pepper Short Ribs Pot", imageUrl: dish("robatayaki", "black-pepper-short-rib-rice-pot-.png"), priceInCents: cash(139500), quantity: 1, customizations: [], notes: "" },
    ],
    pricing: { subtotalInCents: cash(139500), deliveryFeeInCents: cash(0), serviceFeeInCents: cash(5000), vatInCents: cash(21675), grandTotalInCents: cash(166175) },
    address: { firstName: "Layla", lastName: "Mahmoud", street: "12 El Batal Ahmed Abdel Aziz", city: "Giza", postalCode: "12511", phone: "+20 100 456 7890" },
    customerName: "Layla Mahmoud",
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
      { productId: "prod_016", name: "Salmon Poke Bowl", imageUrl: dish("salads", "salmon-poke-bowl.webp"), priceInCents: cash(59500), quantity: 2, customizations: [], notes: "" },
    ],
    pricing: { subtotalInCents: cash(119000), deliveryFeeInCents: cash(0), serviceFeeInCents: cash(5000), vatInCents: cash(18600), grandTotalInCents: cash(142600) },
    address: { firstName: "Omar", lastName: "Farid", street: "7 Syria Street, Mohandessin", city: "Giza", postalCode: "12411", phone: "+20 111 567 8901" },
    customerName: "Omar Farid",
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
      { productId: "prod_058", name: "Matcha Pain Perdu", imageUrl: dish("breakfast", "matcha-pain-perdu.webp"), priceInCents: cash(39000), quantity: 2, customizations: [], notes: "" },
      { productId: "prod_074", name: "Matcha Latte", imageUrl: dish("beverages", "matcha-latte.webp"), priceInCents: cash(16000), quantity: 2, customizations: [], notes: "" },
    ],
    pricing: { subtotalInCents: cash(110000), deliveryFeeInCents: cash(0), serviceFeeInCents: cash(5000), vatInCents: cash(17250), grandTotalInCents: cash(132250) },
    address: { firstName: "Salma", lastName: "Ibrahim", street: "22 Road 233, Degla Maadi", city: "Cairo", postalCode: "11431", phone: "+20 102 678 9012" },
    customerName: "Salma Ibrahim",
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
      { productId: "prod_044", name: "Royal Platter (40 pcs)", imageUrl: dish("sushi", "royal-sushi-platter-.png"), priceInCents: cash(260000), quantity: 1, customizations: [], notes: "" },
    ],
    pricing: { subtotalInCents: cash(260000), deliveryFeeInCents: cash(0), serviceFeeInCents: cash(5000), vatInCents: cash(39750), grandTotalInCents: cash(304750) },
    address: { firstName: "Karim", lastName: "Mostafa", street: "3 El Gezira, Zamalek", city: "Cairo", postalCode: "11211", phone: "+20 100 789 0123" },
    customerName: "Karim Mostafa",
    notes: null,
    createdAt: daysAgo(12),
    updatedAt: daysAgo(12),
  },
];

const SEED_SETTINGS: PricingSettings = {
  currency: "EGP",
  standardDeliveryInCents: cash(5000),
  expressDeliveryInCents: cash(10000),
  freeDeliveryThresholdInCents: cash(80000),
  freeDeliveryEnabled: true,
  serviceFeeInCents: cash(5000),
  vatRatePercent: 15,
  vatEnabled: true,
  updatedAt: now(),
};

// ── Seed categories ──────────────────────────────────────────────────────────

export interface CategoryRecord {
  id: string;
  name: string;
  japaneseName: string;
}

const SEED_CATEGORIES: CategoryRecord[] = [
  { id: "cat_starters", name: "Starters", japaneseName: "前菜" },
  { id: "cat_salads", name: "Salads", japaneseName: "サラダ" },
  { id: "cat_soups", name: "Soups & Ramen", japaneseName: "スープ・ラーメン" },
  { id: "cat_wok", name: "From the Wok", japaneseName: "炒め物" },
  { id: "cat_dimsum", name: "Dim Sum & Bao", japaneseName: "点心・包" },
  { id: "cat_skewers", name: "Skewers", japaneseName: "串焼き" },
  { id: "cat_robata", name: "Robatayaki", japaneseName: "炉端焼き" },
  { id: "cat_sushi", name: "Sushi", japaneseName: "寿司" },
  { id: "cat_sides", name: "Sides", japaneseName: "サイド" },
  { id: "cat_breakfast", name: "Breakfast", japaneseName: "朝食" },
  { id: "cat_desserts", name: "Desserts", japaneseName: "デザート" },
  { id: "cat_bev", name: "Beverages", japaneseName: "ドリンク" },
];

// ── In-memory store ──────────────────────────────────────────────────────────

let _products = [...SEED_PRODUCTS];
let _orders = [...SEED_ORDERS];
let _settings = { ...SEED_SETTINGS };
let _categories = [...SEED_CATEGORIES];

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
  categories: {
    getAll: () => [..._categories],
    getById: (id: string) => _categories.find((c) => c.id === id) ?? null,
    insert: (c: CategoryRecord) => {
      _categories = [..._categories, c];
      return c;
    },
    update: (id: string, patch: Partial<CategoryRecord>) => {
      const updated = { ..._categories.find((c) => c.id === id)!, ...patch };
      _categories = _categories.map((c) => (c.id === id ? updated : c));
      return updated;
    },
    delete: (id: string) => {
      _categories = _categories.filter((c) => c.id !== id);
    },
  },
};

export { nanoid, now };
