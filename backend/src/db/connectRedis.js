import { createClient } from "redis";

async function connectRedis() {
  try {
    const client = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });
    await client.connect();
    return client;
  } catch (error) {
    console.error(error);
  }
}
export { connectRedis };
