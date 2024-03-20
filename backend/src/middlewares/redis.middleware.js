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
  const page = req.query.page;
  if (page) {
    const key = `submissions_page_${page}`;
    const cachedSubmissions = await client.get(key);
    if (cachedSubmissions) {
      return res.status(200).json({
        submissions: JSON.parse(cachedSubmissions),
        totalPages: parseInt(await client.get("totalPages")),
      });
    }
  }
  next();
});

export { client };
