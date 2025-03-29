import { z } from "https://deno.land/x/zod/mod.ts";

export const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  isActive: z.boolean().optional(),
});

export const validateUser = (user: unknown) => {
  return userSchema.safeParse(user);
};
