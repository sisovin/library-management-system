import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  publishedDate: z.date().optional(),
  isbn: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
});

export const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  isActive: z.boolean().optional(),
});
