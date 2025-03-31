import { client } from "../../db/client.ts";
import { users, User, NewUser } from "./model.ts";
import { hash } from "../../lib/auth/argon2.ts";

export class UserRepository {
  async createUser(newUser: NewUser): Promise<User> {
    const hashedPassword = await hash(newUser.password);
    const result = await client.queryObject<User>(
      `INSERT INTO users (username, email, password, created_at, updated_at, is_active)
       VALUES ($1, $2, $3, NOW(), NOW(), $4)
       RETURNING *`,
      newUser.username,
      newUser.email,
      hashedPassword,
      newUser.isActive
    );
    return result.rows[0];
  }

  async getUserById(id: number): Promise<User | null> {
    const result = await client.queryObject<User>(
      `SELECT * FROM users WHERE id = $1`,
      id
    );
    return result.rows.length ? result.rows[0] : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await client.queryObject<User>(
      `SELECT * FROM users WHERE email = $1`,
      email
    );
    return result.rows.length ? result.rows[0] : null;
  }

  async updateUser(id: number, updatedUser: Partial<NewUser>): Promise<User | null> {
    const fields = [];
    const values = [];
    let index = 1;

    if (updatedUser.username) {
      fields.push(`username = $${index++}`);
      values.push(updatedUser.username);
    }
    if (updatedUser.email) {
      fields.push(`email = $${index++}`);
      values.push(updatedUser.email);
    }
    if (updatedUser.password) {
      const hashedPassword = await hash(updatedUser.password);
      fields.push(`password = $${index++}`);
      values.push(hashedPassword);
    }
    if (updatedUser.isActive !== undefined) {
      fields.push(`is_active = $${index++}`);
      values.push(updatedUser.isActive);
    }

    if (!fields.length) {
      return this.getUserById(id);
    }

    values.push(id);
    const result = await client.queryObject<User>(
      `UPDATE users SET ${fields.join(", ")}, updated_at = NOW() WHERE id = $${index}
       RETURNING *`,
      ...values
    );
    return result.rows.length ? result.rows[0] : null;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await client.queryObject(
      `DELETE FROM users WHERE id = $1`,
      id
    );
    return result.rowCount > 0;
  }
}
