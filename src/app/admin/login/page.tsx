"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Button } from "@/components/ui";
import { handleError } from "@/lib/error";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error("Invalid password");
      document.cookie = `admin_secret=${password}; path=/`;
      router.push(from);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--bg)" }}>
      <div
        className="flex w-full max-w-sm flex-col gap-4 rounded-[18px] border p-8"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <h1 className="font-serif text-xl font-semibold" style={{ color: "var(--ink)" }}>
          Admin Login
        </h1>
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} isLoading={loading}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
