import { http, HttpResponse } from "msw";
import { nanoid } from "nanoid";
import { db, type CategoryRecord } from "../db";
import { API } from "@/constants/api-endpoints";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
const url = (path: string) => `${BASE}/${path}`;

export const categoryHandlers = [
  http.get(url(API.CATEGORIES), () => {
    return HttpResponse.json(db.categories.getAll());
  }),

  http.post(url(API.CATEGORIES), async ({ request }) => {
    const body = (await request.json()) as { name: string; japaneseName: string };
    const cat: CategoryRecord = {
      id: `cat_${nanoid(8)}`,
      name: body.name,
      japaneseName: body.japaneseName,
    };
    db.categories.insert(cat);
    return HttpResponse.json(cat, { status: 201 });
  }),

  http.patch(url(API.CATEGORY(":id")), async ({ params, request }) => {
    const id = params["id"] as string;
    const body = (await request.json()) as Partial<CategoryRecord>;
    const existing = db.categories.getById(id);
    if (!existing)
      return HttpResponse.json({ error: "NOT_FOUND", message: "Category not found" }, { status: 404 });
    const updated = db.categories.update(id, body);
    return HttpResponse.json(updated);
  }),

  http.delete(url(API.CATEGORY(":id")), ({ params }) => {
    db.categories.delete(params["id"] as string);
    return new HttpResponse(null, { status: 204 });
  }),
];
