import { pgTable, serial, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  publishedDate: timestamp("published_date"),
  isbn: varchar("isbn", { length: 20 }).unique(),
  coverImageUrl: varchar("cover_image_url", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Book = InferModel<typeof books>;
export type NewBook = InferModel<typeof books, "insert">;
