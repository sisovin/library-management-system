import { exec } from "https://deno.land/x/exec/mod.ts";

async function deployStaging() {
  console.log("Starting staging deployment...");

  // Pull the latest changes from the repository
  await exec("git pull origin staging");

  // Install dependencies
  await exec("deno task install");

  // Run database migrations
  await exec("deno task migrate");

  // Seed the database with initial data
  await exec("deno task seed");

  // Start the application
  await exec("deno task start");

  console.log("Staging deployment completed.");
}

deployStaging();
