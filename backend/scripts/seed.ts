import { Client } from 'postgres';

const client = new Client({
  user: Deno.env.get('POSTGRES_USER'),
  password: Deno.env.get('POSTGRES_PASSWORD'),
  database: Deno.env.get('POSTGRES_DB'),
  hostname: Deno.env.get('POSTGRES_HOST'),
  port: parseInt(Deno.env.get('POSTGRES_PORT') || '5432'),
});

await client.connect();

await client.queryArray(`
  INSERT INTO users (username, email, password) VALUES
  ('john_doe', 'john@example.com', 'password123'),
  ('jane_doe', 'jane@example.com', 'password123');

  INSERT INTO books (title, author, published_date, isbn, cover_image_url) VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10', '9780743273565', 'https://example.com/gatsby.jpg'),
  ('To Kill a Mockingbird', 'Harper Lee', '1960-07-11', '9780061120084', 'https://example.com/mockingbird.jpg');

  INSERT INTO categories (name) VALUES
  ('Fiction'),
  ('Classics');

  INSERT INTO borrows (user_id, book_id, borrow_date, return_date) VALUES
  (1, 1, '2023-01-01', '2023-01-15'),
  (2, 2, '2023-01-05', '2023-01-20');

  INSERT INTO reviews (user_id, book_id, rating, comment) VALUES
  (1, 1, 5, 'Amazing book!'),
  (2, 2, 4, 'Great read.');

  INSERT INTO reading_lists (user_id, name) VALUES
  (1, 'Favorites'),
  (2, 'To Read');

  INSERT INTO reading_list_books (reading_list_id, book_id) VALUES
  (1, 1),
  (2, 2);
`);

await client.end();
