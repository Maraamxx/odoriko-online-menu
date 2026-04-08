import Link from "next/link";
import { COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";
import { FeaturedDishCard } from "./FeaturedDishCard";

const DISHES = [
  { name: "Odoriko's Wagyu Tataki", desc: "Seared A5 wagyu, ponzu dressing, crispy garlic, daikon radish, fresh shiso", price: "550.00 EGP", image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=600&h=600", badge: "Chef's Pick", large: true },
  { name: "Firecracker Shrimp", desc: "Crispy tempura, sriracha glaze, sesame, micro greens", price: "440.00 EGP", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=400&h=300" },
  { name: "Tonkotsu Ramen", desc: "18hr pork bone broth, chashu, soft egg, bamboo, nori", price: "380.00 EGP", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&h=300" },
  { name: "Premium Salmon Sashimi", desc: "Norwegian salmon, yuzu soy, freshly grated wasabi, pickled ginger", price: "490.00 EGP", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&h=300", badge: "Seasonal" },
];

export function FeaturedDishes() {
  const L = COPY.landing;
  return (
    <section className="px-6 py-20 sm:px-16" style={{ background: "var(--cream)" }}>
      <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
        <div>
          <small className="mb-2 block font-serif text-sm font-light tracking-[0.2em]" style={{ color: "var(--ink4)" }}>{L.featLabelJp}</small>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,6vw,80px)", lineHeight: .9, letterSpacing: ".03em", color: "var(--ink)" }}>{L.featTitle}</h2>
        </div>
        <Link href={ROUTES.MENU} className="flex items-center gap-2 border-b pb-0.5 text-[11px] font-medium uppercase tracking-[0.1em] transition-all hover:gap-4" style={{ color: "var(--accent)", borderColor: "var(--accent)" }}>
          {L.featLink}<span>→</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-2">
        {DISHES.map((d) => (
          <FeaturedDishCard key={d.name} {...d} />
        ))}
      </div>
    </section>
  );
}
