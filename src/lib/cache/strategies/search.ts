import { getCache, setCache, deleteCache } from "../redis.ts";
import { cachePolicies } from "../../../config/cache.ts";

const SEARCH_CACHE_KEY_PREFIX = "search_";

export async function getSearchResultsFromCache(query: string): Promise<string | null> {
  const cacheKey = `${SEARCH_CACHE_KEY_PREFIX}${query}`;
  return await getCache(cacheKey);
}

export async function setSearchResultsInCache(query: string, searchData: string): Promise<void> {
  const cacheKey = `${SEARCH_CACHE_KEY_PREFIX}${query}`;
  const { maxAge } = cachePolicies.search;
  await setCache(cacheKey, searchData, maxAge);
}

export async function deleteSearchResultsFromCache(query: string): Promise<void> {
  const cacheKey = `${SEARCH_CACHE_KEY_PREFIX}${query}`;
  await deleteCache(cacheKey);
}
