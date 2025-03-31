import { Client } from "https://deno.land/x/postgres/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

// Load environment variables
const env = config({ path: "D:/DenoProjects/library-management-system/backend/.env" });

console.log("Creating database if it doesn't exist...");

// Connect to the default 'postgres' database first
const client = new Client({
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: "postgres", // Connect to default postgres database
  hostname: env.POSTGRES_HOST,
  port: parseInt(env.POSTGRES_PORT || "5432"),
});

try {
  await client.connect();
  console.log("Connected to PostgreSQL successfully");
  
  // Check if database exists
  const { rows } = await client.queryObject<{ exists: boolean }>(
    `SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = $1) as exists`, 
    env.POSTGRES_DB
  );
  
  if (!rows[0].exists) {
    // Create the database
    console.log(`Creating database '${env.POSTGRES_DB}'...`);
    await client.queryObject(`CREATE DATABASE ${env.POSTGRES_DB}`);
    console.log(`✅ Database '${env.POSTGRES_DB}' created successfully`);
  } else {
    console.log(`Database '${env.POSTGRES_DB}' already exists`);
  }
} catch (error) {
  console.error("Failed to create database:", error);
  Deno.exit(1);
} finally {
  await client.end();
}