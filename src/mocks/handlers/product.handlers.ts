import { http, HttpResponse } from "msw";
import { nanoid } from "nanoid";
import { db, now } from "../db";
import {
  ProductSchema,
  ProductArraySchema,
  CreateProductInputSchema,
  type ProductId,
} from "@/domain.contract";
import { API } from "@/constants/api-endpoints";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
const url = (path: string) => `${BASE}/${path}`;

export const productHandlers = [
  http.get(url(API.PRODUCTS), ({ request }) => {
    const category =
      new URL(request.url).searchParams.get("category") ?? undefined;
    let products = db.products.getAll();
    if (category) products = products.filter((p) => p.category === category);
    return HttpResponse.json(ProductArraySchema.parse(products));
  }),

  http.post(url(API.PRODUCTS), async ({ request }) => {
    const body = CreateProductInputSchema.parse(await request.json());
    const product = ProductSchema.parse({
      ...body,
      id: nanoid() as ProductId,
      categoryId: `cat_${body.category.toLowerCase()}`,
      isAvailable: true,
      createdAt: now(),
      updatedAt: now(),
    });
    db.products.insert(product);
    return HttpResponse.json(product, { status: 201 });
  }),

  http.patch(url(API.PRODUCT_AVAILABILITY(":id")), ({ params }) => {
    const id = params["id"] as string;
    const product = db.products.getById(id);
    if (!product)
      return HttpResponse.json(
        { error: "NOT_FOUND", message: "Product not found" },
        { status: 404 },
      );
    const updated = db.products.update(id, {
      isAvailable: !product.isAvailable,
    });
    return HttpResponse.json(ProductSchema.parse(updated));
  }),

  http.delete(url(API.PRODUCT(":id")), ({ params }) => {
    db.products.delete(params["id"] as string);
    return new HttpResponse(null, { status: 204 });
  }),
];
