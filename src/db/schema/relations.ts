import { pgTable, serial, varchar, text, timestamp, integer, boolean, foreignKey } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";
import { users } from "./users";
import { books } from "./books";

export const borrows = pgTable("borrows", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(users.id),
  bookId: integer("book_id").notNull().references(books.id),
  borrowDate: timestamp("borrow_date").defaultNow().notNull(),
  returnDate: timestamp("return_date"),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(users.id),
  bookId: integer("book_id").notNull().references(books.id),
  rating: integer("rating").notNull().check("rating >= 1 AND rating <= 5"),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const readingLists = pgTable("reading_lists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(users.id),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const readingListBooks = pgTable("reading_list_books", {
  readingListId: integer("reading_list_id").notNull().references(readingLists.id),
  bookId: integer("book_id").notNull().references(books.id),
  primaryKey: ["reading_list_id", "book_id"],
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(users.id),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  eventName: varchar("event_name", { length: 100 }).notNull(),
  userId: integer("user_id").references(users.id),
  bookId: integer("book_id").references(books.id),
  eventData: text("event_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const fileStorage = pgTable("file_storage", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(users.id),
  fileUrl: varchar("file_url", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
