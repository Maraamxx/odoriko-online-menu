/**
 * LoginForm — right-side form panel for admin login.
 * Fields: login.title, login.subtitle, login.password, login.signIn, login.demoNote.
 */
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Button } from "@/components/ui";
import { handleError } from "@/lib/error";
import { COPY } from "@/constants/copy";

export function LoginForm() {
  const router = useRouter();
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
      router.push(from);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-6 sm:px-12"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full max-w-sm">
        <h1
          className="font-serif text-2xl font-semibold"
          style={{ color: "var(--ink)" }}
        >
          {COPY.login.title}
        </h1>

        <p className="mb-8 mt-2 text-sm" style={{ color: "var(--ink3)" }}>
          {COPY.login.subtitle}
        </p>

        <div className="flex flex-col gap-5">
          <Input
            label={COPY.login.password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleLogin} isLoading={loading}>
            {COPY.login.signIn}
          </Button>
        </div>

        <p
          className="mt-4 text-center text-xs"
          style={{ color: "var(--ink4)" }}
        >
          {COPY.login.demoNote}
        </p>
      </div>
    </div>
  );
}
