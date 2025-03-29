import { Client } from 'postgres';
import { connect } from 'redis';

const client = new Client({
  user: Deno.env.get('POSTGRES_USER'),
  password: Deno.env.get('POSTGRES_PASSWORD'),
  database: Deno.env.get('POSTGRES_DB'),
  hostname: Deno.env.get('POSTGRES_HOST'),
  port: parseInt(Deno.env.get('POSTGRES_PORT') || '5432'),
});

await client.connect();

const redis = await connect({
  hostname: Deno.env.get('REDIS_HOST'),
  port: parseInt(Deno.env.get('REDIS_PORT') || '6379'),
  password: Deno.env.get('REDIS_PASSWORD'),
});

export { client, redis };
