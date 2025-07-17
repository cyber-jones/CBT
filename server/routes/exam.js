import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  createExam,
  getAllExams,
  getExam,
  submitExam,
  getSubmissionLecturer,
  getResults,
  getSubmissionAdmin,
  approveResult,
  getLecturerExams,
  getStudentExams,
  toggleExamStart,
  DeleteExam,
  updateExam,
} from "../controllers/exam.js";
import { ROLES } from "../utils/SD.js";


router.post("/", auth([ROLES[1]]), createExam);
router.put("/", auth([ROLES[1]]), updateExam);
router.get("/", auth(ROLES), getAllExams);
router.get("/lecturer/:id", auth(ROLES), getLecturerExams);
router.get("/student/:id", auth(ROLES), getStudentExams);
router.get("/:id", auth(ROLES), getExam);
router.get("/toggle-start/:id", auth([ROLES[1]]), toggleExamStart);
router.get("/:id", auth([ROLES[1]]), DeleteExam);
router.post("/submit", auth([ROLES[2]]), submitExam);
router.get("/submissions", auth([ROLES[1]]), getSubmissionLecturer);
// Grade submission (Lecturer)
// router.put("/grade/:id", auth([ROLES[1]]), gradeSubmission);
router.get("/results", auth([ROLES[2]]), getResults);
router.get("/submissions/admin", auth([ROLES[0]]), getSubmissionAdmin);
router.put("/approve-result/:id", auth([ROLES[0]]), approveResult);

export default router;
