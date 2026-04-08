"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { handleError } from "@/lib/error";
import { TopBar } from "@/components/layout/TopBar";

const makeClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { staleTime: 30_000, retry: 2, retryDelay: 500 },
      mutations: { onError: handleError },
    },
  });

export function Providers({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const isMarketing = pathname === "/" || pathname === "/our-story";
  const [client] = useState(makeClient);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      if (process.env.NEXT_PUBLIC_USE_MSW === "true") {
        const { worker } = await import("@/mocks/browser");
        await worker.start({
          onUnhandledRequest(req, print) {
            const url = new URL(req.url);
            if (url.pathname.startsWith("/api/")) {
              print.warning();
            }
          },
        });
      }
      if (!cancelled) setReady(true);
    };
    void init();
    return () => { cancelled = true; };
  }, []);

  return (
    <QueryClientProvider client={client}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: "13px",
            background: "var(--surface)",
            color: "var(--ink)",
            border: "1px solid var(--border)",
          },
        }}
      />
      {ready ? (
        <>
          {!isMarketing && <TopBar />}
          {children}
        </>
      ) : (
        <div style={{ minHeight: "100vh", background: "var(--bg)" }} />
      )}
    </QueryClientProvider>
  );
}
