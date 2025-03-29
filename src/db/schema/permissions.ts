import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const permissions = pgTable("permissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});
