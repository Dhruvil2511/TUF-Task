import express from "express";
import cors from "cors";
import "dotenv/config.js";
import submissionsRouter from "./routes/submissions.routes.js";

const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173", "https://code-ide-x.web.app"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/v1/submissions", submissionsRouter);

export { app };
