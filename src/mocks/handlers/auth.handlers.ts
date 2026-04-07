import { http, HttpResponse } from "msw";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
const url = (path: string) => `${BASE}/${path}`;

const SEED_ADMIN_PASSWORD = "dev-secret-change-me";

export const authHandlers = [
  http.post(url("admin/login"), async ({ request }) => {
    const body = (await request.json()) as { password?: string };
    if (body.password === SEED_ADMIN_PASSWORD) {
      return HttpResponse.json({ ok: true });
    }
    return HttpResponse.json(
      { error: "UNAUTHORIZED", message: "Invalid password" },
      { status: 401 },
    );
  }),
];
