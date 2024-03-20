import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: "10mb" })); 

import submissionsRouter from "./routes/submissions.routes.js"
app.use("api/v1/submissions",submissionsRouter);

export { app };
