import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  createExam,
  getAllExams,
  getExam,
  submitExam,
  getSubmissionLecturer,
  // gradeSubmission,
  getResults,
  getSubmissionAdmin,
  approveResult,
} from "../controllers/exam.js";
import { ROLES } from "../utils/SD.js";

// Create exam (Lecturer with permission)
router.post("/", auth([ROLES[1]]), createExam);
// Get all exams (Student or Lecturer)
router.get("/", auth([ROLES[2], ROLES[1]]), getAllExams);
// Get exam (Student or Lecturer)
router.get("/:id", auth([ROLES[2], ROLES[1]]), getExam);
// Submit exam (Student)
router.post("/submit", auth([ROLES[2]]), submitExam);
// Get submissions for grading (Lecturer)
router.get("/submissions", auth([ROLES[1]]), getSubmissionLecturer);
// Grade submission (Lecturer)
// router.put("/grade/:id", auth([ROLES[1]]), gradeSubmission);
// Get student results (Student)
router.get("/results", auth([ROLES[2]]), getResults);
// Admin: Get all submissions for review
router.get("/submissions/admin", auth([ROLES[0]]), getSubmissionAdmin);
// Admin: Approve result
router.put("/approve-result/:id", auth([ROLES[0]]), approveResult);

export default router;
