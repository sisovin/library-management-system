import { verifyToken } from "../../lib/auth/jwt.ts";

export const authGuard = async (ctx: any, next: any) => {
  const authorizationHeader = ctx.request.headers.get("Authorization");

  if (!authorizationHeader) {
    ctx.response.status = 401;
    ctx.response.body = { message: "Unauthorized" };
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    ctx.response.status = 401;
    ctx.response.body = { message: "Unauthorized" };
    return;
  }

  try {
    const payload = await verifyToken(token);
    ctx.state.user = payload;
    await next();
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = { message: "Unauthorized" };
  }
};
