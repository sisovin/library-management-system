import { Context, Middleware } from 'oak';
import { redis } from '../config/redis.ts';

const rateLimit = (options: { windowMs: number; max: number }): Middleware => {
  return async (ctx: Context, next: () => Promise<unknown>) => {
    const key = `rate-limit:${ctx.request.ip}`;
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, options.windowMs / 1000);
    }

    if (current > options.max) {
      ctx.response.status = 429;
      ctx.response.body = { message: 'Too many requests, please try again later.' };
      return;
    }

    await next();
  };
};

export { rateLimit };
