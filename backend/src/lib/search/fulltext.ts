import { client } from "../../db/client.ts";

export async function searchBooks(query: string): Promise<any[]> {
  const result = await client.queryObject`
    SELECT id, title, author, published_date, isbn, cover_image_url
    FROM books
    WHERE to_tsvector('english', title || ' ' || author) @@ to_tsquery('english', ${query})
  `;
  return result.rows;
}
