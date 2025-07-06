import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  submitFeedback,
  getFeedback,
  getFeedbackSummary,
} from "../controllers/feedback.js";
import { ROLES } from "../utils/SD.js";

// Submit feedback (Student or Lecturer)
router.post("/", auth([ROLES[2], ROLES[1]]), submitFeedback);
// Get feedback (Admin)
router.get("/", auth([ROLES[0]]), getFeedback);
// Get feedback summary (Admin)
router.get("/summary", auth([ROLES[0]]), getFeedbackSummary);

export default router;
