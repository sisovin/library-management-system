import { z } from "https://deno.land/x/zod/mod.ts";

export const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  isActive: z.boolean().optional(),
});

// Add login schema for validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const validateUser = (user: unknown) => {
  return userSchema.safeParse(user);
};

// Add the validateLogin function
export const validateLogin = (loginData: unknown) => {
  const result = loginSchema.safeParse(loginData);
  if (!result.success) {
    return result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
  }
  return [];
};