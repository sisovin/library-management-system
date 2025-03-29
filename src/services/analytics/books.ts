import { client } from "../../db/client.ts";

export async function getBookAnalytics(bookId: number): Promise<any> {
  const result = await client.queryObject`
    SELECT 
      b.id, 
      b.title, 
      COUNT(r.id) as review_count, 
      AVG(r.rating) as average_rating, 
      COUNT(br.id) as borrow_count
    FROM books b
    LEFT JOIN reviews r ON b.id = r.book_id
    LEFT JOIN borrows br ON b.id = br.book_id
    WHERE b.id = ${bookId}
    GROUP BY b.id
  `;
  return result.rows[0];
}

export async function getTopRatedBooks(limit: number): Promise<any[]> {
  const result = await client.queryObject`
    SELECT 
      b.id, 
      b.title, 
      AVG(r.rating) as average_rating
    FROM books b
    LEFT JOIN reviews r ON b.id = r.book_id
    GROUP BY b.id
    ORDER BY average_rating DESC
    LIMIT ${limit}
  `;
  return result.rows;
}

export async function getMostBorrowedBooks(limit: number): Promise<any[]> {
  const result = await client.queryObject`
    SELECT 
      b.id, 
      b.title, 
      COUNT(br.id) as borrow_count
    FROM books b
    LEFT JOIN borrows br ON b.id = br.book_id
    GROUP BY b.id
    ORDER BY borrow_count DESC
    LIMIT ${limit}
  `;
  return result.rows;
}
