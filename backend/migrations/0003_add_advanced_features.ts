import { Client } from "https://deno.land/x/postgres/mod.ts";

export async function up(client: Client) {
  // Check if tsv column already exists in books table
  const { rows: columns } = await client.queryObject<{ column_name: string }>(
    `SELECT column_name 
     FROM information_schema.columns 
     WHERE table_name = 'books' AND column_name = 'tsv'`
  );
  
  if (columns.length === 0) {
    console.log("Adding full-text search capabilities to books table");
    await client.queryObject(`
      ALTER TABLE books ADD COLUMN tsv tsvector;
      CREATE INDEX IF NOT EXISTS idx_books_tsv ON books USING gin(tsv);
      
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_trigger 
          WHERE tgname = 'books_tsv_trigger'
        ) THEN
          CREATE TRIGGER books_tsv_trigger BEFORE INSERT OR UPDATE
          ON books FOR EACH ROW EXECUTE FUNCTION
          tsvector_update_trigger(tsv, 'pg_catalog.english', title, author);
        END IF;
      END
      $$;
    `);
  } else {
    console.log("Full-text search capabilities already exist");
  }

  console.log("Creating notifications table if not exists");
  await client.queryObject(`
    CREATE TABLE IF NOT EXISTS notifications (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      message TEXT NOT NULL,
      read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Creating analytics table if not exists");
  await client.queryObject(`
    CREATE TABLE IF NOT EXISTS analytics (
      id SERIAL PRIMARY KEY,
      event_name VARCHAR(100) NOT NULL,
      user_id INTEGER REFERENCES users(id),
      book_id INTEGER REFERENCES books(id),
      event_data JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Creating file_storage table if not exists");
  await client.queryObject(`
    CREATE TABLE IF NOT EXISTS file_storage (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      file_url VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}