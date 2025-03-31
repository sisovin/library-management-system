import { Context, Next } from "https://deno.land/x/oak/mod.ts";

export class ApiError extends Error {
  status: number;
  details: any;

  constructor(status: number, message: string, details: any = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function handleApiError(context: Context, error: any) {
  if (error instanceof ApiError) {
    context.response.status = error.status;
    context.response.body = {
      status: "error",
      message: error.message,
      details: error.details,
    };
  } else {
    context.response.status = 500;
    context.response.body = {
      status: "error",
      message: "Internal Server Error",
      details: error.message,
    };
  }
}

// Add the middleware function that app.ts is expecting
export const errorHandler = async (context: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error caught in middleware:", error);
    handleApiError(context, error);
  }
};