"use client";

import Link from "next/link";
import { COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";

export function LandingNav() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-4 sm:px-12"
      style={{ background: "var(--cream)", borderBottom: "1px solid rgba(26,20,16,.1)" }}
    >
      <div className="flex items-center gap-2.5" style={{ fontFamily: "var(--font-display)" }}>
        <span className="text-[26px] tracking-[0.12em]" style={{ color: "var(--ink)" }}>
          {COPY.brand.name}
        </span>
        <span
          className="mb-1 self-end font-serif text-[11px] font-light tracking-[0.08em]"
          style={{ color: "var(--ink4)" }}
        >
          踊子
        </span>
      </div>

      <ul className="hidden gap-9 md:flex" style={{ listStyle: "none" }}>
        {COPY.landing.navLinks.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-[11px] font-medium uppercase tracking-[0.1em] transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--ink3)" }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <Link
          href={ROUTES.MENU}
          className="rounded-sm px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--accent2)]"
          style={{ background: "var(--accent)" }}
        >
          {COPY.landing.orderNow}
        </Link>
      </div>
    </nav>
  );
}
