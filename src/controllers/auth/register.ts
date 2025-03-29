import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { hash } from "../../lib/auth/argon2.ts";
import { createUser } from "../../models/user/repository.ts";
import { generateToken } from "../../lib/auth/jwt.ts";

export const register = async (context: RouterContext) => {
  const { request, response } = context;
  const { value } = await request.body({ type: "json" });
  const { username, password, email } = await value;

  if (!username || !password || !email) {
    response.status = 400;
    response.body = { message: "Missing required fields" };
    return;
  }

  const hashedPassword = await hash(password);
  const user = await createUser({ username, email, password: hashedPassword });

  if (!user) {
    response.status = 500;
    response.body = { message: "Failed to create user" };
    return;
  }

  const token = generateToken(user.id);

  response.status = 201;
  response.body = { token };
};
