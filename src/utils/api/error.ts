export class ApiError extends Error {
  status: number;
  details: any;

  constructor(status: number, message: string, details: any = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function handleApiError(context: any, error: any) {
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
