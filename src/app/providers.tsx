"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { handleError } from "@/lib/error";

const makeClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { staleTime: 30_000, retry: 1 },
      mutations: { onError: handleError },
    },
  });

export function Providers({ children }: { readonly children: React.ReactNode }) {
  const [client] = useState(makeClient);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (process.env.NEXT_PUBLIC_USE_MSW === "true") {
        const { worker } = await import("@/mocks/browser");
        await worker.start({ onUnhandledRequest: "warn" });
      }
      setReady(true);
    };
    void init();
  }, []);

  return (
    <QueryClientProvider client={client}>
      {ready ? (
        children
      ) : (
        <div style={{ minHeight: "100vh", background: "var(--bg)" }} />
      )}
    </QueryClientProvider>
  );
}
