// Static — no data, no hooks
import { COPY } from "@/constants/copy";

export function MenuHero() {
  return (
    <section className="flex flex-col gap-3 py-10">
      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--teal)" }}>
        {COPY.menu.heroEyebrow}
      </p>
      <h1 className="max-w-md font-serif text-4xl font-semibold leading-tight" style={{ color: "var(--ink)" }}>
        {COPY.menu.heroTitle}
      </h1>
      <p className="max-w-lg text-sm leading-relaxed" style={{ color: "var(--ink3)" }}>
        {COPY.menu.heroSubtitle}
      </p>
    </section>
  );
}
