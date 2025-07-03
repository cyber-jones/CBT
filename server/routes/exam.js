import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  createExam,
  getAllExams,
  submitExam,
  getSubmissionLecturer,
  // gradeSubmission,
  getResults,
  getSubmissionAdmin,
  approveResult,
} from "../controllers/exam.js";

// Create exam (Lecturer with permission)
router.post("/", auth(["Lecturer"]), createExam);
// Get all exams (Student or Lecturer)
router.get("/", auth(["Student", "Lecturer"]), getAllExams);
// Submit exam (Student)
router.post("/submit", auth(["Student"]), submitExam);
// Get submissions for grading (Lecturer)
router.get("/submissions", auth(["Lecturer"]), getSubmissionLecturer);
// Grade submission (Lecturer)
// router.put("/grade/:id", auth(["Lecturer"]), gradeSubmission);
// Get student results (Student)
router.get("/results", auth(["Student"]), getResults);
// Admin: Get all submissions for review
router.get("/submissions/admin", auth(["Admin"]), getSubmissionAdmin);
// Admin: Approve result
router.put("/approve-result/:id", auth(["Admin"]), approveResult);

export default router;
