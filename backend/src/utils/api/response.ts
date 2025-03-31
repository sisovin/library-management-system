export function successResponse(data: any, message: string = "Success") {
  return {
    status: "success",
    message,
    data,
  };
}

export function errorResponse(error: any, message: string = "Error") {
  return {
    status: "error",
    message,
    error,
  };
}
