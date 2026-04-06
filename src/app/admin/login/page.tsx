"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Button } from "@/components/ui";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";
  const [secret, setSecret] = useState("");

  const handleLogin = () => {
    document.cookie = `admin_secret=${secret}; path=/`;
    router.push(from);
  };

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--bg)" }}>
      <div
        className="flex w-full max-w-sm flex-col gap-4 rounded-[18px] border p-8"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <h1 className="font-serif text-xl font-semibold" style={{ color: "var(--ink)" }}>Admin Login</h1>
        <Input label="Admin Secret" type="password" value={secret} onChange={(e) => setSecret(e.target.value)} />
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
