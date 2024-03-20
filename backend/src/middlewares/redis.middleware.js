import { createClient } from "redis";
import { asyncHandler } from "../utils/asyncHandler.js";
import "dotenv/config.js";
const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

await client.connect();

export const redisCache = asyncHandler(async (req, res, next) => {
  const cachedSubmissions = await client.get("submissions");
  const cachedTotalPages = await client.get("totalPages");
  if (cachedSubmissions && cachedTotalPages) {
    return res.status(200).json({
      submissions: JSON.parse(cachedSubmissions),
      totalPages: cachedTotalPages,
    });
  } else {
    next();
  }
});

export { client };
