import { z } from "https://deno.land/x/zod/mod.ts";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  publishedDate: z.date().optional(),
  isbn: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
});

export const validateBook = (book: unknown) => {
  return bookSchema.safeParse(book);
};
