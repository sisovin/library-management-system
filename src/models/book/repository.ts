import { client } from "../../db/client.ts";
import { books, Book, NewBook } from "./model.ts";

export class BookRepository {
  async create(book: NewBook): Promise<Book> {
    const result = await client.queryObject<Book>(
      `INSERT INTO books (title, author, published_date, isbn, cover_image_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      book.title,
      book.author,
      book.publishedDate,
      book.isbn,
      book.coverImageUrl
    );
    return result.rows[0];
  }

  async findById(id: number): Promise<Book | null> {
    const result = await client.queryObject<Book>(
      `SELECT * FROM books WHERE id = $1`,
      id
    );
    return result.rows.length ? result.rows[0] : null;
  }

  async findAll(): Promise<Book[]> {
    const result = await client.queryObject<Book>(
      `SELECT * FROM books`
    );
    return result.rows;
  }

  async update(id: number, book: Partial<NewBook>): Promise<Book | null> {
    const fields = Object.keys(book).map((key, index) => `${key} = $${index + 2}`).join(", ");
    const values = Object.values(book);
    const result = await client.queryObject<Book>(
      `UPDATE books SET ${fields} WHERE id = $1 RETURNING *`,
      id,
      ...values
    );
    return result.rows.length ? result.rows[0] : null;
  }

  async delete(id: number): Promise<void> {
    await client.queryObject(
      `DELETE FROM books WHERE id = $1`,
      id
    );
  }
}
