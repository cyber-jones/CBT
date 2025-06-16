const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  createExam,
  getAllExams,
  submitExam,
  getSubmissionLecturer,
  gradeSubmission,
  getResults,
  getSubmissionAdmin,
  approveResult,
} = require("../controllers/exam");

// Create exam (Lecturer with permission)
router.post("/", auth(["Lecturer"]), createExam);
// Get all exams (Student or Lecturer)
router.get("/", auth(["Student", "Lecturer"]), getAllExams);
// Submit exam (Student)
router.post("/submit", auth(["Student"]), submitExam);
// Get submissions for grading (Lecturer)
router.get("/submissions", auth(["Lecturer"]), getSubmissionLecturer);
// Grade submission (Lecturer)
router.put("/grade/:id", auth(["Lecturer"]), gradeSubmission);
// Get student results (Student)
router.get("/results", auth(["Student"]), getResults);
// Admin: Get all submissions for review
router.get("/submissions/admin", auth(["Admin"]), getSubmissionAdmin);
// Admin: Approve result
router.put("/approve-result/:id", auth(["Admin"]), approveResult);

module.exports = router;
