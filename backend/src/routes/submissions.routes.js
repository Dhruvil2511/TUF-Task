import { Router } from "express";
import {
  getSubmissions,
  postSubmission,
} from "../controllers/submissions.controller.js";
import { redisCache } from "../middlewares/redis.middleware.js";

const router = Router();

router.route("/post-submission").post(postSubmission);
router.route("/get-submissions").get(redisCache, getSubmissions);

export default router;
