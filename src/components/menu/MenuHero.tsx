// Static — no data, no hooks
import Image from "next/image";
import { COPY } from "@/constants/copy";

export function MenuHero() {
  return (
    <section className="flex gap-0 py-10">
      {/* Content */}
      <div className="flex flex-1 flex-col gap-3">
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

      {/* Right border strip — 64px column with rotated logo */}
      <div
        className="hidden w-16 shrink-0 items-center justify-center border-l md:flex"
        style={{ borderColor: "var(--border)" }}
        aria-hidden="true"
      >
        <Image
          src="/brand/logo-full.webp"
          alt=""
          width={200}
          height={64}
          className="rotate-180"
          style={{
            width: "auto",
            height: 200,
            objectFit: "contain",
            opacity: 0.07,
            filter: "brightness(0)",
            writingMode: "vertical-rl",
          }}
        />
      </div>
    </section>
  );
}
