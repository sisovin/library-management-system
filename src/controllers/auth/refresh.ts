import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateRefreshToken } from "../../middleware/validation/users.ts";
import { generateToken, verifyToken } from "../../lib/auth/jwt.ts";
import { findUserById } from "../../models/user/repository.ts";

export const refresh = async (ctx: Context) => {
  const { value } = await ctx.request.body().value;
  const { refreshToken } = value;

  // Validate the refresh token request
  const validationErrors = validateRefreshToken({ refreshToken });
  if (validationErrors.length > 0) {
    ctx.response.status = 400;
    ctx.response.body = { errors: validationErrors };
    return;
  }

  // Verify the refresh token
  const decodedToken = verifyToken(refreshToken);
  if (!decodedToken) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid refresh token" };
    return;
  }

  // Find the user by ID
  const user = await findUserById(decodedToken.userId);
  if (!user) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid refresh token" };
    return;
  }

  // Generate a new JWT token
  const token = generateToken({ userId: user.id });

  ctx.response.status = 200;
  ctx.response.body = { token };
};
