import ky, { HTTPError } from "ky";
import type { ZodSchema } from "zod";
import { ApiErrorSchema } from "@/domain.contract";
import { AppError } from "./error";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

const client = ky.create({
  prefix: BASE_URL,
  hooks: {
    beforeError: [
      async ({ error }) => {
        if (error instanceof HTTPError) {
          const { response } = error;
          let body: unknown;
          try {
            body = ApiErrorSchema.parse(await response.clone().json());
          } catch {
            /* unparseable */
          }
          return AppError.fromHttpStatus(
            response.status,
            body as ReturnType<typeof ApiErrorSchema.parse>,
          );
        }
        return error;
      },
    ],
  },
});

/** GET request — validates response against schema. */
export async function apiFetch<T>(
  path: string,
  schema: ZodSchema<T>,
  params?: Record<string, string | number | boolean>,
): Promise<T> {
  try {
    const data = await client
      .get(
        path,
        params
          ? { searchParams: params as Record<string, string> }
          : undefined,
      )
      .json();
    return schema.parse(data);
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error instanceof TypeError) throw AppError.network();
    throw AppError.validation({ path, error: String(error) });
  }
}

/** POST / PATCH request — sends body, validates response against schema. */
export async function apiMutate<TBody, TResponse>(
  method: "post" | "patch" | "put",
  path: string,
  body: TBody,
  schema: ZodSchema<TResponse>,
): Promise<TResponse> {
  try {
    const data = await client[method](path, { json: body }).json();
    return schema.parse(data);
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error instanceof TypeError) throw AppError.network();
    throw AppError.validation({ path, error: String(error) });
  }
}

/** DELETE request — returns void. */
export async function apiDelete(path: string): Promise<void> {
  try {
    await client.delete(path);
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error instanceof TypeError) throw AppError.network();
    throw AppError.unknown(error);
  }
}
