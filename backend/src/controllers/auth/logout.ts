import { Context } from "https://deno.land/x/oak/mod.ts";
import { deleteSession } from "../../lib/auth/sessions.ts";

export const logout = async (ctx: Context) => {
  const { token } = await ctx.request.body().value;

  if (!token) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Token is required" };
    return;
  }

  const result = await deleteSession(token);

  if (result) {
    ctx.response.status = 200;
    ctx.response.body = { message: "Logged out successfully" };
  } else {
    ctx.response.status = 500;
    ctx.response.body = { message: "Failed to log out" };
  }
};
