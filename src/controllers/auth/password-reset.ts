import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { findUserByEmail, updateUserPassword } from "../../models/user/repository.ts";
import { hash } from "../../lib/auth/argon2.ts";
import { sendPasswordResetEmail } from "../../services/notification/email.ts";

export const passwordReset = async (context: RouterContext) => {
  const { request, response } = context;
  const { value } = await request.body({ type: "json" });
  const { email, newPassword } = await value;

  if (!email || !newPassword) {
    response.status = 400;
    response.body = { message: "Missing required fields" };
    return;
  }

  const user = await findUserByEmail(email);
  if (!user) {
    response.status = 404;
    response.body = { message: "User not found" };
    return;
  }

  const hashedPassword = await hash(newPassword);
  const updatedUser = await updateUserPassword(user.id, hashedPassword);

  if (!updatedUser) {
    response.status = 500;
    response.body = { message: "Failed to reset password" };
    return;
  }

  await sendPasswordResetEmail(user.email);

  response.status = 200;
  response.body = { message: "Password reset successfully" };
};
