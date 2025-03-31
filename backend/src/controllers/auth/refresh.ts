import { Context } from "https://deno.land/x/oak/mod.ts";
import { verifyRefreshToken, generateSessionToken } from "../../lib/auth/sessions.ts";
import { UserRepository } from "../../models/user/repository.ts";

export const refreshToken = async (ctx: Context) => {
  // Get refresh token from request body
  const { value } = await ctx.request.body().value;
  const { refreshToken } = value;

  if (!refreshToken) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Refresh token is required" };
    return;
  }

  // Verify refresh token
  const payload = await verifyRefreshToken(refreshToken);
  if (!payload || !payload.userId) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid refresh token" };
    return;
  }

  // Get user from database
  const userRepository = new UserRepository();
  const user = await userRepository.getUserById(payload.userId);
  if (!user) {
    ctx.response.status = 401;
    ctx.response.body = { error: "User not found" };
    return;
  }

  // Generate new access token
  const newToken = await generateSessionToken({ userId: user.id });

  ctx.response.status = 200;
  ctx.response.body = { token: newToken };
};