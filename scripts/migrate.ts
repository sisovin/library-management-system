import { Client } from "https://deno.land/x/postgres/mod.ts";

const client = new Client({
  user: Deno.env.get("POSTGRES_USER"),
  password: Deno.env.get("POSTGRES_PASSWORD"),
  database: Deno.env.get("POSTGRES_DB"),
  hostname: Deno.env.get("POSTGRES_HOST"),
  port: parseInt(Deno.env.get("POSTGRES_PORT") || "5432"),
});

await client.connect();

const migrations = [
  "migrations/0001_initial_schema.ts",
  "migrations/0002_seed_data.ts",
  "migrations/0003_add_advanced_features.ts",
];

for (const migration of migrations) {
  const { up } = await import(`../${migration}`);
  await up(client);
}

await client.end();
