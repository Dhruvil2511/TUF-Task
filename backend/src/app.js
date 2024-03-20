import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" })); 

import submissionsRouter from "./routes/submissions.routes.js"
app.use("/api/v1/submissions",submissionsRouter);

export { app };
