import Image from "next/image";

interface CategoryTileProps {
  readonly name: string;
  readonly jp: string;
  readonly count: number;
  readonly image: string;
}

export function CategoryTile({ name, jp, count, image }: CategoryTileProps) {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
      <Image src={image} alt={name} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.08]" />
      <div className="absolute inset-0 transition-all duration-300" style={{ background: "linear-gradient(to top, rgba(26,20,16,.85) 0%, rgba(26,20,16,.1) 60%)" }} />
      <div className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(197,48,74,.9) 0%, rgba(197,48,74,.2) 70%)" }} />
      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
        <div className="text-xl tracking-[0.08em] text-white" style={{ fontFamily: "var(--font-display)" }}>{name}</div>
        <div className="font-serif text-[10px] font-light tracking-[0.14em]" style={{ color: "rgba(255,255,255,.6)" }}>{jp}</div>
      </div>
      <div className="absolute right-3.5 top-3.5 rounded-full px-2.5 py-1 text-[10px] tracking-[0.08em] text-white" style={{ background: "rgba(255,255,255,.15)", backdropFilter: "blur(4px)" }}>
        {count} dishes
      </div>
    </div>
  );
}
