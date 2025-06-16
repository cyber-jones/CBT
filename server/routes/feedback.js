const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  submitFeedback,
  getFeedback,
  getFeedbackSummary,
} = require("../controllers/feedback");

// Submit feedback (Student or Lecturer)
router.post("/", auth(["Student", "Lecturer"]), submitFeedback);
// Get feedback (Admin)
router.get("/", auth(["Admin"]), getFeedback);
// Get feedback summary (Admin)
router.get("/summary", auth(["Admin"]), getFeedbackSummary);

module.exports = router;
