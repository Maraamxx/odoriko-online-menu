import Image from "next/image";

interface FeaturedDishCardProps {
  readonly name: string;
  readonly desc: string;
  readonly price: string;
  readonly image: string;
  readonly badge?: string;
  readonly large?: boolean;
}

export function FeaturedDishCard({ name, desc, price, image, badge, large }: FeaturedDishCardProps) {
  return (
    <div className={`group relative cursor-pointer overflow-hidden rounded-sm ${large ? "row-span-2" : ""}`} style={{ background: "var(--surface)" }}>
      <div className={`overflow-hidden ${large ? "h-[300px] sm:h-[480px]" : "h-[220px]"}`}>
        <Image src={image} alt={name} fill sizes={large ? "40vw" : "20vw"} className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
      </div>
      {badge && (
        <span className="absolute left-4 top-4 rounded-sm px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-white" style={{ background: "var(--accent)" }}>
          {badge}
        </span>
      )}
      <div className="p-5">
        <div className={`mb-1 font-serif ${large ? "text-2xl" : "text-lg"} font-semibold`} style={{ color: "var(--ink)" }}>{name}</div>
        <p className="mb-3.5 text-xs leading-relaxed" style={{ color: "var(--ink3)" }}>{desc}</p>
        <div className="flex items-center justify-between">
          <div className={`font-serif ${large ? "text-[26px]" : "text-xl"} font-semibold`} style={{ color: "var(--accent)" }}>
            {price} <sub className="font-sans text-[11px] font-normal" style={{ color: "var(--ink4)" }}>per person</sub>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-[22px] text-white transition-all hover:scale-110 hover:bg-[var(--accent2)]" style={{ background: "var(--accent)" }}>+</button>
        </div>
      </div>
    </div>
  );
}
