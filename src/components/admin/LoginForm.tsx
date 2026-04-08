"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { handleError } from "@/lib/error";
import { COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";

export function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";
  const [password, setPassword] = useState("dev-secret-change-me");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error(COPY.login.invalidPass);
      document.cookie = `admin_secret=${password}; path=/`;
      window.location.href = from;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 sm:px-12 lg:px-20" style={{ background: "var(--ink)" }}>
      {/* Ghost kanji */}
      <span className="pointer-events-none absolute -bottom-14 -right-10 select-none font-serif text-[200px] font-semibold leading-none lg:text-[260px]" style={{ color: "rgba(255,255,255,.025)" }}>管理</span>

      {/* Back link */}
      <Link
        href={ROUTES.MENU}
        className="absolute right-6 top-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] transition-colors hover:text-white/70 sm:right-10 sm:top-9"
        style={{ color: "rgba(255,255,255,.3)" }}
      >
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,2 4,7 9,12" /></svg>
        Back to menu
      </Link>

      <div className="relative z-10 w-full max-w-[400px]">
        {/* Eyebrow */}
        <div className="mb-7 flex items-center gap-2.5">
          <div className="h-px w-6" style={{ background: "var(--accent)" }} />
          <span className="text-[10px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>Restricted Access</span>
        </div>

        {/* Title */}
        <h1 className="mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,6vw,64px)", lineHeight: .88, letterSpacing: ".04em", color: "var(--white)" }}>
          ADMIN
          <em className="block font-serif text-[clamp(40px,5vw,52px)] font-bold italic" style={{ color: "var(--accent)" }}>Portal</em>
        </h1>
        <p className="mb-12 text-[13px] leading-relaxed tracking-[0.04em]" style={{ color: "rgba(255,255,255,.35)" }}>
          Manage your menu, orders, and settings.<br />
          <span style={{ color: "rgba(255,255,255,.2)" }}>管理者専用エリア</span>
        </p>

        {/* Password field */}
        <div className="mb-5">
          <div className="mb-2.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,.35)" }}>
            Password
            <span className="font-serif text-[10px] font-light tracking-[0.1em]" style={{ color: "rgba(255,255,255,.18)" }}>パスワード</span>
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-sm border px-5 py-4 text-sm tracking-[0.04em] outline-none transition-colors focus:border-[var(--accent)]"
              style={{
                background: "rgba(255,255,255,.05)",
                borderColor: "rgba(255,255,255,.1)",
                color: "var(--white)",
              }}
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2" width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth={1.8}>
              <rect x="3" y="7" width="10" height="8" rx="1" /><path d="M5 7V5a3 3 0 016 0v2" />
            </svg>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="relative w-full rounded-sm py-[18px] text-xl tracking-[0.2em] text-white transition-colors hover:bg-[var(--accent2)] disabled:opacity-60"
          style={{ fontFamily: "var(--font-display)", background: "var(--accent)" }}
        >
          {loading ? "..." : "SIGN IN"}
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl opacity-60">→</span>
        </button>

        {/* Demo note */}
        <div className="mt-5 flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(255,255,255,.15)" }} />
          <span className="text-[11px] tracking-[0.06em]" style={{ color: "rgba(255,255,255,.2)" }}>{COPY.login.demoNote}</span>
        </div>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,.07)" }} />
          <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,.2)" }}>Odoriko Admin v1.0</span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,.07)" }} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-sm tracking-[0.14em]" style={{ fontFamily: "var(--font-display)", color: "rgba(255,255,255,.15)" }}>ODORIKO</span>
          <span className="text-[10px] tracking-[0.06em]" style={{ color: "rgba(255,255,255,.15)" }}>© 2025 · Secure Area</span>
        </div>
      </div>
    </div>
  );
}
