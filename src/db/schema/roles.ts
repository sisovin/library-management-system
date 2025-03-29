import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { permissions } from "./permissions";

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

export const rolePermissions = pgTable("role_permissions", {
  roleId: integer("role_id")
    .notNull()
    .references(() => roles.id),
  permissionId: integer("permission_id")
    .notNull()
    .references(() => permissions.id),
});
