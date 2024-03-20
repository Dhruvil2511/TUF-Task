import { Router } from "express";
import {
  getSubmissions,
  postSubmission,
} from "../controllers/submissions.controller.js";

const router = Router();

router.route("/submit").post(postSubmission);
router.route("/get-submissions").get(getSubmissions);

export default router;
