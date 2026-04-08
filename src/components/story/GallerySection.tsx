import Image from "next/image";
import { COPY } from "@/constants/copy";

export function GallerySection() {
  const S = COPY.story;
  const imgs = S.galleryImages;
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-16 lg:py-28" style={{ background: "var(--ink)" }}>
      <span className="pointer-events-none absolute -right-20 -top-14 select-none font-serif text-[280px] font-semibold leading-none lg:text-[380px]" style={{ color: "rgba(255,255,255,.025)" }}>空間</span>
      <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <small className="mb-2 block font-serif text-sm font-light tracking-[0.2em]" style={{ color: "rgba(255,255,255,.3)" }}>{S.galleryLabelJp}</small>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,6vw,80px)", lineHeight: .9, letterSpacing: ".03em", color: "var(--white)" }}>
            {S.galleryTitle}<br /><em className="font-serif text-[clamp(40px,5vw,66px)] font-bold italic" style={{ color: "var(--accent)" }}>{S.galleryAccent}</em>
          </h2>
        </div>
        <p className="max-w-[380px] text-sm leading-[1.8]" style={{ color: "rgba(255,255,255,.4)" }}>{S.galleryIntro}</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {imgs.map((img) => (
          <div key={img.name} className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-sm">
            <Image src={img.src} alt={img.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover brightness-[.85] transition-all duration-500 group-hover:scale-[1.06] group-hover:brightness-100" />
            <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(26,20,16,.85), transparent)" }}>
              <div className="text-lg tracking-[0.1em] text-white" style={{ fontFamily: "var(--font-display)" }}>{img.name}</div>
              <div className="font-serif text-[10px] font-light tracking-[0.14em]" style={{ color: "rgba(255,255,255,.5)" }}>{img.jp}</div>
            </div>
          </div>
        ))}
        {/* Accent cell */}
        <div className="flex aspect-[4/3] items-center justify-center rounded-sm" style={{ background: "var(--accent)" }}>
          <div className="text-center">
            <div className="text-7xl leading-none tracking-[0.04em]" style={{ fontFamily: "var(--font-display)", color: "rgba(255,255,255,.9)" }}>32</div>
            <div className="mt-1.5 text-[11px] uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,.6)" }}>Original seats</div>
            <div className="mt-1 font-serif text-[11px] font-light tracking-[0.12em]" style={{ color: "rgba(255,255,255,.4)" }}>開店時の座席数</div>
          </div>
        </div>
      </div>
    </section>
  );
}
