import express from "express";
import cors from "cors";
import "dotenv/config.js";
import submissionsRouter from "./routes/submissions.routes.js";
import { createClient } from "redis";

const app = express();

app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN,
      "http://localhost:5173",
      "https://code-ide-x.web.app",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

await client.connect();

app.use("/api/v1/submissions", submissionsRouter);

export { app, client };
