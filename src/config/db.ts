import { Client } from 'postgres';

const client = new Client({
  user: Deno.env.get('POSTGRES_USER'),
  password: Deno.env.get('POSTGRES_PASSWORD'),
  database: Deno.env.get('POSTGRES_DB'),
  hostname: Deno.env.get('POSTGRES_HOST'),
  port: parseInt(Deno.env.get('POSTGRES_PORT') || '5432'),
});

export { client };
