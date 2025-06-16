import { LRUCache } from "lru-cache";

type CacheKey = string;
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type CacheValue = any;

const cache = new LRUCache<CacheKey, CacheValue>({
	max: 100, // maximum 100 items
	ttl: 1000 * 60 * 5, // 5 minutes TTL
});

/**
 * Get value from cache or fetch + store if not cached.
 *
 * @param key - Unique cache key
 * @param fetcher - Function to fetch data if not cached
 * @returns cached or fetched value
 */
export async function getOrSetCache<T>(
	key: string,
	fetcher: () => Promise<T>,
): Promise<T> {
	const cached = cache.get(key) as T | undefined;
	if (cached !== undefined) {
		return cached;
	}
	const data = await fetcher();
	cache.set(key, data);
	return data;
}

export default cache;
