import { exec } from "https://deno.land/x/exec/mod.ts";

async function deploy() {
  console.log("Starting production deployment...");

  // Pull the latest changes from the repository
  await exec("git pull origin main");

  // Install dependencies
  await exec("deno task install");

  // Run database migrations
  await exec("deno task migrate");

  // Seed the database
  await exec("deno task seed");

  // Start the application
  await exec("deno task start");

  console.log("Production deployment completed.");
}

deploy();
