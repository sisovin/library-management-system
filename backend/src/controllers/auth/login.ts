import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateLogin } from "../../middleware/validation/users.ts";
import { generateToken } from "../../lib/auth/jwt.ts";
import { UserRepository } from "../../models/user/repository.ts";
import { verify as comparePassword } from "../../lib/auth/argon2.ts";

export const login = async (ctx: Context) => {
  const { value } = await ctx.request.body().value;
  const { email, password } = value;

  // Validate the login request
  const validationErrors = validateLogin({ email, password });
  if (validationErrors.length > 0) {
    ctx.response.status = 400;
    ctx.response.body = { errors: validationErrors };
    return;
  }

  // Find the user by email
  const userRepository = new UserRepository();
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid email or password" };
    return;
  }

  // Compare the provided password with the stored password
  const passwordMatch = await comparePassword(user.password, password);
  if (!passwordMatch) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid email or password" };
    return;
  }

  // Generate a JWT token
  const token = generateToken({ userId: user.id });

  ctx.response.status = 200;
  ctx.response.body = { token };
};