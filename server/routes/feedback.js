import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  submitFeedback,
  getFeedback,
  getFeedbackSummary,
} from "../controllers/feedback.js";

// Submit feedback (Student or Lecturer)
router.post("/", auth(["Student", "Lecturer"]), submitFeedback);
// Get feedback (Admin)
router.get("/", auth(["Admin"]), getFeedback);
// Get feedback summary (Admin)
router.get("/summary", auth(["Admin"]), getFeedbackSummary);

export default router;
