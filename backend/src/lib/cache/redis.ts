import { redis } from '../../config/redis.ts';

export async function getCache(key: string): Promise<string | null> {
  return await redis.get(key);
}

export async function setCache(key: string, value: string, ttl: number): Promise<void> {
  await redis.set(key, value, { ex: ttl });
}

export async function deleteCache(key: string): Promise<void> {
  await redis.del(key);
}
