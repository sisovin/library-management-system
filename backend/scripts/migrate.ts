import { Client } from "https://deno.land/x/postgres/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

// Load environment variables first
const env = config({ path: "D:/DenoProjects/library-management-system/backend/.env" });

console.log("Migration: Loading database configuration");
console.log("- Database:", env.POSTGRES_DB || "[NOT SET]");
console.log("- User:", env.POSTGRES_USER || "[NOT SET]");
console.log("- Host:", env.POSTGRES_HOST || "[NOT SET]");
console.log("- Port:", env.POSTGRES_PORT || "5432");

const client = new Client({
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  hostname: env.POSTGRES_HOST,
  port: parseInt(env.POSTGRES_PORT || "5432"),
});

try {
  console.log("Connecting to database...");
  await client.connect();
  console.log("Connected to database successfully");

  // Fix: Check and clean corrupted migrations table if needed
  try {
    // Check if migrations table exists
    const { rows: tables } = await client.queryObject<{ exists: boolean }>(
      `SELECT EXISTS (
         SELECT FROM information_schema.tables 
         WHERE table_schema = 'public' 
         AND table_name = 'migrations'
       ) as exists`
    );
    
    if (tables[0].exists) {
      console.log("Migrations table exists, checking for corrupted records...");
      // See if there are any corrupted records (name = 'i')
      const { rows: corrupted } = await client.queryObject<{ count: number }>(
        `SELECT COUNT(*) as count FROM migrations WHERE name = 'i'`
      );
      
      if (parseInt(corrupted[0].count.toString()) > 0) {
        console.log("Found corrupted migration records, dropping migrations table to reset...");
        await client.queryObject(`DROP TABLE migrations`);
        console.log("Migrations table dropped successfully");
      }
    }
  } catch (error) {
    console.error("Failed to check/clean migrations table:", error);
    // Continue anyway, we'll recreate the table
  }

  // Create a migrations tracking table if it doesn't exist
  try {
    await client.queryObject(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.error("Failed to create migrations table:", error);
    throw error;
  }

  // Get list of already applied migrations
  const { rows: appliedMigrations } = await client.queryObject<{ name: string }>(
    `SELECT name FROM migrations ORDER BY id`
  );
  const appliedMigrationNames = appliedMigrations.map(m => m.name);
  
  console.log("Already applied migrations:", appliedMigrationNames.length ? appliedMigrationNames.join(", ") : "None");

  const migrations = [
    "migrations/0001_initial_schema.ts",
    "migrations/0002_seed_data.ts",
    "migrations/0003_add_advanced_features.ts",
  ];

  for (const migration of migrations) {
    // Skip already applied migrations
    if (appliedMigrationNames.includes(migration)) {
      console.log(`Skipping migration: ${migration} (already applied)`);
      continue;
    }

    console.log(`Running migration: ${migration}`);
    try {
      const mod = await import(`../${migration}`);
      if (typeof mod.up === 'function') {
        await mod.up(client);
        
        // Record the migration as applied
        await client.queryObject(
          `INSERT INTO migrations (name) VALUES ($1)`,
          [migration] // Fix: Pass value as array
        );
        
        console.log(`✅ Successfully applied migration: ${migration}`);
      } else {
        console.error(`❌ Migration ${migration} does not export an 'up' function`);
      }
    } catch (error) {
      console.error(`❌ Failed to apply migration ${migration}:`, error);
      // If the error is because the migration was already recorded but failed,
      // we should continue with other migrations
      if (error.message?.includes("duplicate key") || 
          error.message?.includes("already exists")) {
        console.log("This migration may have partially run before failing. Skipping and continuing...");
        continue;
      }
      throw error;
    }
  }

  console.log("All migrations completed successfully");
} catch (error) {
  console.error("Migration failed:", error);
  Deno.exit(1);
} finally {
  await client.end();
  console.log("Database connection closed");
}