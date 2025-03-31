import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { UserRepository } from "../../models/user/repository.ts";
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

  // Create an instance of UserRepository
  const userRepository = new UserRepository();
  
  // Create the user with the repository instance
  const user = await userRepository.createUser({ 
    username, 
    email, 
    password,
    isActive: true
  });

  if (!user) {
    response.status = 500;
    response.body = { message: "Failed to create user" };
    return;
  }

  // Generate a token for the new user
  const token = generateToken({ userId: user.id });

  response.status = 201;
  response.body = { token };
};