import { pgTable, serial, text, varchar, timestamp, boolean } from "npm:drizzle-orm/pg-core";
import { InferModel } from "npm:drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;
