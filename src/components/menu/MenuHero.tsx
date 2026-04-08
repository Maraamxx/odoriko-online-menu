// Static — no data, no hooks
import Image from "next/image";
import { COPY } from "@/constants/copy";

export function MenuHero() {
  return (
    <section className="relative overflow-visible py-10">
      {/* Rotated logo — pinned to far right edge of viewport */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 hidden select-none items-center md:flex"
        style={{ right: "calc(-1 * (100vw - 100%) / 2)" }}
        aria-hidden="true"
      >
        <Image
          src="/brand/logo-full.webp"
          alt=""
          width={200}
          height={96}
          className="-rotate-90"
          style={{ width: 200, height: "auto", opacity: 0.5, filter: "brightness(0.15)" }}
        />
      </div>

      <div className="flex flex-col gap-3">
        <span
          className="inline-flex w-fit items-center gap-1.5 rounded px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ background: "var(--accent)", color: "white" }}
        >
          {COPY.menu.heroEyebrow}
        </span>
        <h1 className="max-w-lg font-serif text-[28px] font-bold leading-[1.1] tracking-tight sm:text-[44px]" style={{ color: "var(--ink)" }}>
          CRAFTED FOR YOUR{" "}
          <em className="font-serif italic" style={{ color: "var(--accent)" }}>FINEST</em>{" "}
          MOMENTS
        </h1>
        <p className="font-serif text-sm tracking-[0.15em]" style={{ color: "var(--ink4)" }}>
          最高のひとときのために
        </p>
        <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--ink3)" }}>
          {COPY.menu.heroSubtitle}
        </p>
      </div>
    </section>
  );
}
