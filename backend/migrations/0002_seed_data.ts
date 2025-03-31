import { Client } from "https://deno.land/x/postgres/mod.ts";
import { hash } from "npm:argon2";

export async function up(client: Client) {
  console.log("Checking existing data before seeding...");
  
  // Check if users already exist
  const { rows: userCount } = await client.queryObject<{ count: number }>(
    `SELECT COUNT(*) as count FROM users`
  );
  
  if (parseInt(userCount[0].count.toString()) === 0) {
    console.log("Seeding users with hashed passwords...");
    
    // Hash passwords using Argon2
    const passwordNiewin = await hash("TestPas$953#&699");
    const passwordCheung = await hash("UserPas$36&99");
    const passwordJohn = await hash("JohnDoe123");
    
    // Insert users with hashed passwords
    await client.queryObject(`
      INSERT INTO users (username, email, password) VALUES
      ('Niewin', 'admin@niewin.local', $1),
      ('Cheung168', 'user@niewin.local', $2),
      ('JohnDoe', 'johndoe@niewin.local', $3)
    `, passwordNiewin, passwordCheung, passwordJohn);
    
    console.log("Users seeded with Argon2 hashed passwords");
  } else {
    console.log("Users already exist, skipping user seed data");
  }
    
  // Check if books already exist
  const { rows: bookCount } = await client.queryObject<{ count: number }>(
    `SELECT COUNT(*) as count FROM books`
  );
  
  if (parseInt(bookCount[0].count.toString()) === 0) {
    console.log("Seeding books...");
    await client.queryObject(`
      INSERT INTO books (title, author, published_date, isbn, cover_image_url) VALUES
      ('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10', '9780743273565', 'https://example.com/gatsby.jpg'),
      ('To Kill a Mockingbird', 'Harper Lee', '1960-07-11', '9780061120084', 'https://example.com/mockingbird.jpg'),
      ('1984', 'George Orwell', '1949-06-08', '9780451524935', 'https://example.com/1984.jpg'),
      ('Pride and Prejudice', 'Jane Austen', '1813-01-28', '9780141439518', 'https://example.com/pride.jpg')
    `);
  } else {
    console.log("Books already exist, skipping book seed data");
  }
  
  // Check if categories already exist
  const { rows: categoryCount } = await client.queryObject<{ count: number }>(
    `SELECT COUNT(*) as count FROM categories`
  );
  
  if (parseInt(categoryCount[0].count.toString()) === 0) {
    console.log("Seeding categories...");
    await client.queryObject(`
      INSERT INTO categories (name) VALUES
      ('Fiction'),
      ('Classics'),
      ('Science Fiction'),
      ('Romance'),
      ('Mystery')
    `);
  } else {
    console.log("Categories already exist, skipping category seed data");
  }
  
  // Only seed relationships if we have both users and books
  const { rows: borrowCount } = await client.queryObject<{ count: number }>(
    `SELECT COUNT(*) as count FROM borrows`
  );
  
  if (parseInt(borrowCount[0].count.toString()) === 0) {
    console.log("Seeding borrows, reviews, and reading lists...");
    await client.queryObject(`
      INSERT INTO borrows (user_id, book_id, borrow_date, return_date)
      SELECT u.id, b.id, '2023-01-01', '2023-01-15'
      FROM users u, books b
      WHERE u.username = 'Niewin' AND b.title = 'The Great Gatsby'
      ON CONFLICT DO NOTHING;
      
      INSERT INTO borrows (user_id, book_id, borrow_date, return_date)
      SELECT u.id, b.id, '2023-01-05', '2023-01-20'
      FROM users u, books b
      WHERE u.username = 'Cheung168' AND b.title = 'To Kill a Mockingbird'
      ON CONFLICT DO NOTHING;
      
      INSERT INTO borrows (user_id, book_id, borrow_date, return_date)
      SELECT u.id, b.id, '2023-02-01', NULL
      FROM users u, books b
      WHERE u.username = 'Niewin' AND b.title = '1984'
      ON CONFLICT DO NOTHING;
      
      INSERT INTO borrows (user_id, book_id, borrow_date, return_date)
      SELECT u.id, b.id, '2023-02-10', '2023-02-20'
      FROM users u, books b
      WHERE u.username = 'JohnDoe' AND b.title = 'Pride and Prejudice'
      ON CONFLICT DO NOTHING;
      
      INSERT INTO borrows (user_id, book_id, borrow_date, return_date)
      SELECT u.id, b.id, '2023-03-01', NULL
      FROM users u, books b
      WHERE u.username = 'Cheung168' AND b.title = 'The Great Gatsby'
      ON CONFLICT DO NOTHING;

      INSERT INTO reviews (user_id, book_id, rating, comment)
      SELECT u.id, b.id, 5, 'Amazing book!'
      FROM users u, books b
      WHERE u.username = 'Niewin' AND b.title = 'The Great Gatsby'
      ON CONFLICT DO NOTHING;
      
      INSERT INTO reviews (user_id, book_id, rating, comment)
      SELECT u.id, b.id, 4, 'Great read.'
      FROM users u, books b
      WHERE u.username = 'Cheung168' AND b.title = 'To Kill a Mockingbird'
      ON CONFLICT DO NOTHING;
      
      INSERT INTO reviews (user_id, book_id, rating, comment)
      SELECT u.id, b.id, 3, 'It was okay.'
      FROM users u, books b
      WHERE u.username = 'JohnDoe' AND b.title = '1984'
      ON CONFLICT DO NOTHING;
      
      INSERT INTO reviews (user_id, book_id, rating, comment)
      SELECT u.id, b.id, 2, 'Not my type.'
      FROM users u, books b
      WHERE u.username = 'Niewin' AND b.title = 'Pride and Prejudice'
      ON CONFLICT DO NOTHING;

      INSERT INTO reading_lists (user_id, name)
      SELECT id, 'Favorites'
      FROM users
      WHERE username = 'Niewin'
      ON CONFLICT DO NOTHING;
      
      INSERT INTO reading_lists (user_id, name)
      SELECT id, 'To Read'
      FROM users
      WHERE username = 'Cheung168'
      ON CONFLICT DO NOTHING;
      
      INSERT INTO reading_lists (user_id, name)
      SELECT id, 'Currently Reading'
      FROM users
      WHERE username = 'JohnDoe'
      ON CONFLICT DO NOTHING;
    `);
    
    // For reading_list_books, we need to get the IDs first
    console.log("Seeding reading list books...");
    try {
      // Fix: Use arrays for parameter values
      
      // Get reading list IDs
      const { rows: favorites } = await client.queryObject<{ id: number }>(
        `SELECT id FROM reading_lists WHERE name = 'Favorites' LIMIT 1`
      );
      
      const { rows: toRead } = await client.queryObject<{ id: number }>(
        `SELECT id FROM reading_lists WHERE name = 'To Read' LIMIT 1`
      );
      
      const { rows: currentlyReading } = await client.queryObject<{ id: number }>(
        `SELECT id FROM reading_lists WHERE name = 'Currently Reading' LIMIT 1`
      );
      
      // Get book IDs
      const { rows: gatsby } = await client.queryObject<{ id: number }>(
        `SELECT id FROM books WHERE title = 'The Great Gatsby' LIMIT 1`
      );
      
      const { rows: mockingbird } = await client.queryObject<{ id: number }>(
        `SELECT id FROM books WHERE title = 'To Kill a Mockingbird' LIMIT 1`
      );
      
      const { rows: book1984 } = await client.queryObject<{ id: number }>(
        `SELECT id FROM books WHERE title = '1984' LIMIT 1`
      );
      
      const { rows: pride } = await client.queryObject<{ id: number }>(
        `SELECT id FROM books WHERE title = 'Pride and Prejudice' LIMIT 1`
      );
      
      // Fix: Use arrays for the parameters
      if (favorites.length && gatsby.length) {
        await client.queryObject(
          `INSERT INTO reading_list_books (reading_list_id, book_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [favorites[0].id, gatsby[0].id]
        );
      }
      
      if (toRead.length && mockingbird.length) {
        await client.queryObject(
          `INSERT INTO reading_list_books (reading_list_id, book_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [toRead[0].id, mockingbird[0].id]
        );
      }
      
      if (currentlyReading.length && book1984.length) {
        await client.queryObject(
          `INSERT INTO reading_list_books (reading_list_id, book_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [currentlyReading[0].id, book1984[0].id]
        );
      }
      
      if (favorites.length && pride.length) {
        await client.queryObject(
          `INSERT INTO reading_list_books (reading_list_id, book_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [favorites[0].id, pride[0].id]
        );
      }
    } catch (error) {
      console.error("Error seeding reading list books:", error);
    }
  } else {
    console.log("Relationship data already exists, skipping");
  }
  
  console.log("Seed data migration completed");
}