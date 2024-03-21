import express from "express";
import cors from "cors";
import "dotenv/config.js";
import submissionsRouter from "./routes/submissions.routes.js";
import { createClient } from "redis";

const app = express();

app.use(
  cors({
    origin: ["https://code-ide-x.web.app", "https://code-editor-x.vercel.app","http://localhost:5173"],
    credentials: true,
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
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
});

await client.connect();

app.use("/api/v1/submissions", submissionsRouter);

export { app, client };
