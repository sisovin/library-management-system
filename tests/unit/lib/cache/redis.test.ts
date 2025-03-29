import { assertEquals } from 'std/testing/asserts.ts';
import { getCache, setCache, deleteCache } from '../../../src/lib/cache/redis.ts';

Deno.test('setCache and getCache', async () => {
  await setCache('testKey', 'testValue', 60);
  const value = await getCache('testKey');
  assertEquals(value, 'testValue');
});

Deno.test('deleteCache', async () => {
  await setCache('testKey', 'testValue', 60);
  await deleteCache('testKey');
  const value = await getCache('testKey');
  assertEquals(value, null);
});
