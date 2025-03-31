import { getCache, setCache, deleteCache } from "../redis.ts";
import { cachePolicies } from "../../../config/cache.ts";

const BOOK_CACHE_KEY_PREFIX = "book_";

export async function getBookFromCache(bookId: string): Promise<string | null> {
  const cacheKey = `${BOOK_CACHE_KEY_PREFIX}${bookId}`;
  return await getCache(cacheKey);
}

export async function setBookInCache(bookId: string, bookData: string): Promise<void> {
  const cacheKey = `${BOOK_CACHE_KEY_PREFIX}${bookId}`;
  const { maxAge } = cachePolicies.books;
  await setCache(cacheKey, bookData, maxAge);
}

export async function deleteBookFromCache(bookId: string): Promise<void> {
  const cacheKey = `${BOOK_CACHE_KEY_PREFIX}${bookId}`;
  await deleteCache(cacheKey);
}
