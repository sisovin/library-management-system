import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

// Load environment variables directly in this file with the correct path
const env = config({ path: "D:/DenoProjects/library-management-system/backend/.env" });

// Create the database connection configuration
const dbConfig = {
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  hostname: env.POSTGRES_HOST,
  port: parseInt(env.POSTGRES_PORT || "5432"),
};

console.log("Database connection configuration (db/client.ts):");
console.log("- Database:", dbConfig.database);
console.log("- User:", dbConfig.user);
console.log("- Host:", dbConfig.hostname);
console.log("- Port:", dbConfig.port);
console.log("- Password:", dbConfig.password ? "[SET]" : "[NOT SET]");

// Create the database client
export const client = new Client(dbConfig);

// Export connectToDatabase function to be used by app.ts
let connected = false;

export async function connectToDatabase() {
  if (connected) return;
  
  try {
    await client.connect();
    connected = true;
    console.log("✅ Connected to PostgreSQL database successfully");
  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL database:", error);
    throw error;
  }
}