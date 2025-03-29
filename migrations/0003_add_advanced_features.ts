import { Client } from "https://deno.land/x/postgres/mod.ts";

const client = new Client({
  user: Deno.env.get("POSTGRES_USER"),
  password: Deno.env.get("POSTGRES_PASSWORD"),
  database: Deno.env.get("POSTGRES_DB"),
  hostname: Deno.env.get("POSTGRES_HOST"),
  port: parseInt(Deno.env.get("POSTGRES_PORT") || "5432"),
});

await client.connect();

await client.queryObject(`
  -- Add full-text search capabilities
  ALTER TABLE books ADD COLUMN tsv tsvector;
  CREATE INDEX idx_books_tsv ON books USING gin(tsv);
  CREATE TRIGGER books_tsv_trigger BEFORE INSERT OR UPDATE
  ON books FOR EACH ROW EXECUTE FUNCTION
  tsvector_update_trigger(tsv, 'pg_catalog.english', title, author);

  -- Add notifications table
  CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Add analytics table
  CREATE TABLE analytics (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    user_id INTEGER REFERENCES users(id),
    book_id INTEGER REFERENCES books(id),
    event_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Add file storage table
  CREATE TABLE file_storage (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    file_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

await client.end();
