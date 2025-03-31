import { client as dbClient } from "../db/client.ts";

// Re-export the client
export const client = dbClient;

// Connect to the database
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