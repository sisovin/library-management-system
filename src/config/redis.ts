import { connect } from 'redis';

const redis = await connect({
  hostname: Deno.env.get('REDIS_HOST'),
  port: parseInt(Deno.env.get('REDIS_PORT') || '6379'),
  password: Deno.env.get('REDIS_PASSWORD'),
});

export { redis };
