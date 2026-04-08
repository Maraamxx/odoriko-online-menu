import Link from "next/link";
import { COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";
import { CategoryTile } from "./CategoryTile";

const CATS = [
  { name: "SOUPS & RAMEN", jp: "スープ・ラーメン", count: 14, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&h=600" },
  { name: "SUSHI", jp: "寿司", count: 22, image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=400&h=600" },
  { name: "ROBATAYAKI", jp: "炉端焼き", count: 18, image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=400&h=600" },
  { name: "DIM SUM", jp: "点心", count: 16, image: "https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&w=400&h=600" },
  { name: "SKEWERS", jp: "串焼き", count: 14, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&h=600" },
];

export function CategoryTiles() {
  const L = COPY.landing;
  return (
    <section className="px-6 py-20 sm:px-16" style={{ background: "var(--surface)" }}>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <small className="mb-1.5 block font-serif text-sm font-light tracking-[0.2em]" style={{ color: "var(--ink4)" }}>{L.catLabelJp}</small>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,5vw,72px)", lineHeight: .92, letterSpacing: ".03em", color: "var(--ink)" }}>{L.catTitle}</h2>
        </div>
        <Link href={ROUTES.MENU} className="flex items-center gap-2 border-b pb-0.5 text-[11px] font-medium uppercase tracking-[0.1em] transition-all hover:gap-4" style={{ color: "var(--accent)", borderColor: "var(--accent)" }}>
          {L.catLink}<span>→</span>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {CATS.map((c) => <CategoryTile key={c.name} {...c} />)}
      </div>
    </section>
  );
}
