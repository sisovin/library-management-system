import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

// Load environment variables from .env file
const env = config({ path: "D:/DenoProjects/library-management-system/backend/.env" });

// Log the loaded environment variables (without sensitive values)
console.log("Environment variables loaded:");
console.log("- POSTGRES_USER:", env.POSTGRES_USER ? "✓" : "✗");
console.log("- POSTGRES_PASSWORD:", env.POSTGRES_PASSWORD ? "[REDACTED]" : "✗");
console.log("- POSTGRES_DB:", env.POSTGRES_DB ? "✓" : "✗");
console.log("- POSTGRES_HOST:", env.POSTGRES_HOST ? "✓" : "✗");
console.log("- POSTGRES_PORT:", env.POSTGRES_PORT ? "✓" : "✗");
console.log("- JWT_SECRET:", env.JWT_SECRET ? "[REDACTED]" : "✗");