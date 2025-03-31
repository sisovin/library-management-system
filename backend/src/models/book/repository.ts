import { client } from "../../db/client.ts";
import { Book, NewBook, books } from "./model.ts";

export class BookRepository {
  async create(book: NewBook): Promise<Book> {
    const result = await client.queryObject<Book>(
      `INSERT INTO books (title, author, published_date, isbn, cover_image_url, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING *`,
      book.title,
      book.author,
      book.publishedDate,
      book.isbn,
      book.coverImageUrl
    );
    return result.rows[0];
  }

  async getById(id: number): Promise<Book | null> {
    const result = await client.queryObject<Book>(
      `SELECT * FROM books WHERE id = $1`,
      id
    );
    return result.rows.length ? result.rows[0] : null;
  }

  async update(id: number, bookData: Partial<NewBook>): Promise<Book | null> {
    const fields = [];
    const values = [];
    let index = 1;

    if (bookData.title) {
      fields.push(`title = $${index++}`);
      values.push(bookData.title);
    }
    if (bookData.author) {
      fields.push(`author = $${index++}`);
      values.push(bookData.author);
    }
    if (bookData.publishedDate) {
      fields.push(`published_date = $${index++}`);
      values.push(bookData.publishedDate);
    }
    if (bookData.isbn) {
      fields.push(`isbn = $${index++}`);
      values.push(bookData.isbn);
    }
    if (bookData.coverImageUrl) {
      fields.push(`cover_image_url = $${index++}`);
      values.push(bookData.coverImageUrl);
    }

    if (!fields.length) {
      return this.getById(id);
    }

    values.push(id);
    const result = await client.queryObject<Book>(
      `UPDATE books SET ${fields.join(", ")}, updated_at = NOW() WHERE id = $${index}
       RETURNING *`,
      ...values
    );
    return result.rows.length ? result.rows[0] : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await client.queryObject(
      `DELETE FROM books WHERE id = $1`,
      id
    );
    return result.rowCount > 0;
  }

  async search(query: string): Promise<Book[]> {
    const result = await client.queryObject<Book>(
      `SELECT * FROM books 
       WHERE title ILIKE $1 OR author ILIKE $1 OR isbn ILIKE $1
       ORDER BY title ASC`,
      `%${query}%`
    );
    return result.rows;
  }
}