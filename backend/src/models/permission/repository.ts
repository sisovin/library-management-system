import { db } from "../../db/client.ts";
import { Permission } from "./model.ts";

export class PermissionRepository {
  async create(permission: Permission): Promise<Permission> {
    const result = await db.query(
      "INSERT INTO permissions (name, description) VALUES ($1, $2) RETURNING *",
      [permission.name, permission.description]
    );
    return result.rows[0];
  }

  async findById(id: string): Promise<Permission | null> {
    const result = await db.query("SELECT * FROM permissions WHERE id = $1", [id]);
    return result.rows.length ? result.rows[0] : null;
  }

  async findAll(): Promise<Permission[]> {
    const result = await db.query("SELECT * FROM permissions");
    return result.rows;
  }

  async update(id: string, permission: Permission): Promise<Permission | null> {
    const result = await db.query(
      "UPDATE permissions SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [permission.name, permission.description, id]
    );
    return result.rows.length ? result.rows[0] : null;
  }

  async delete(id: string): Promise<void> {
    await db.query("DELETE FROM permissions WHERE id = $1", [id]);
  }
}
