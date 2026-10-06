import { createClient } from 'redis';

let redis: ReturnType<typeof createClient> | null = null;

export async function getRedis() {
  if (redis) {
    return redis;
  }

  redis = createClient({
    url: process.env.REDIS_URL,
  });

  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });

  await redis.connect();
  return redis;
}

export async function closeRedis() {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}
