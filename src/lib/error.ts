import type { ApiError } from "@/domain.contract";

export type AppErrorType =
  | "NETWORK"
  | "VALIDATION"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "CONFLICT"
  | "SERVER"
  | "UNKNOWN";

export class AppError extends Error {
  readonly type: AppErrorType;
  readonly userMessage: string;
  readonly context: Record<string, unknown>;
  readonly retryable: boolean;
  readonly statusCode: number | undefined;

  constructor(
    type: AppErrorType,
    userMessage: string,
    context: Record<string, unknown> = {},
    retryable = false,
    statusCode?: number,
  ) {
    super(userMessage);
    this.name = "AppError";
    this.type = type;
    this.userMessage = userMessage;
    this.context = context;
    this.retryable = retryable;
    this.statusCode = statusCode;
  }

  static fromHttpStatus(status: number, body?: ApiError): AppError {
    const msg = body?.message ?? "Unexpected error";
    if (status === 401)
      return new AppError(
        "UNAUTHORIZED",
        "Please sign in to continue.",
        {},
        false,
        401,
      );
    if (status === 403)
      return new AppError(
        "FORBIDDEN",
        "You don't have permission.",
        {},
        false,
        403,
      );
    if (status === 404)
      return new AppError("NOT_FOUND", "Not found.", {}, false, 404);
    if (status === 409)
      return new AppError("CONFLICT", msg, {}, true, 409);
    if (status >= 500)
      return new AppError(
        "SERVER",
        "Something went wrong. Please try again.",
        { status },
        true,
        status,
      );
    return new AppError("UNKNOWN", "An unexpected error occurred.", {
      status,
      body,
    });
  }

  static network(): AppError {
    return new AppError(
      "NETWORK",
      "Couldn't connect. Check your connection.",
      {},
      true,
    );
  }

  static validation(context: Record<string, unknown>): AppError {
    return new AppError("VALIDATION", "Unexpected data format.", context);
  }

  static unknown(cause: unknown): AppError {
    return new AppError("UNKNOWN", "An unexpected error occurred.", {
      cause: String(cause),
    });
  }
}

/**
 * handleError — the single entry point for all runtime errors.
 * Toast-only. Never navigates. Auth redirects are handled by middleware.ts.
 */
export function handleError(error: unknown): void {
  const appError =
    error instanceof AppError ? error : AppError.unknown(error);

  if (appError.type === "UNKNOWN" || appError.type === "VALIDATION") {
    console.error("[AppError]", appError.type, appError.context);
  }

  // TODO: Replace with toast library (sonner / react-hot-toast)
  if (typeof window !== "undefined") {
    console.warn(`[${appError.type}]`, appError.userMessage);
  }
}

export function toAppError(error: unknown): AppError {
  return error instanceof AppError ? error : AppError.unknown(error);
}
