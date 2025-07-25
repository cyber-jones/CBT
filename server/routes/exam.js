import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  createExam,
  getAllExams,
  getExam,
  submitExam,
  approveResult,
  getLecturerExams,
  getStudentExams,
  toggleExamStart,
  DeleteExam,
  updateExam,
  getCourseExam,
  getSubmissions,
  getSubmission,
  getSubmissionsByExamId,
  getSubmissionsByLecturerId,
  getSubmissionsByStudentId,
  getSubmissionsByCourseId,
  toggleReleaseResult,
} from "../controllers/exam.js";
import { ROLES } from "../utils/SD.js";


router.post("/", auth([ROLES[1]]), createExam);
router.put("/", auth([ROLES[1]]), updateExam);
router.get("/", auth(ROLES), getAllExams);
router.get("/lecturer/:id", auth(ROLES), getLecturerExams);
router.get("/student/:id", auth(ROLES), getStudentExams);
router.get("/course/:id", auth(ROLES), getCourseExam);
router.get("/:id", auth(ROLES), getExam);
router.get("/toggle-start/:id", auth([ROLES[1]]), toggleExamStart);
router.get("/toggle-release-result/:id", auth([ROLES[0], ROLES[1]]), toggleReleaseResult);
router.get("/:id", auth([ROLES[1]]), DeleteExam);
router.post("/submit", auth([ROLES[2]]), submitExam);
router.get("/submissions", auth([ROLES[1]]), getSubmissions);
router.get("/submission/:id", auth(ROLES), getSubmission);
router.get("/submission-exam/:id", auth(ROLES), getSubmissionsByExamId);
router.get("/submissions/lecturer/:id", auth([ROLES[0], ROLES[1]]), getSubmissionsByLecturerId);
router.get("/submissions/student/:id", auth([ROLES[0], ROLES[2]]), getSubmissionsByStudentId);
router.get("/submissions/course/:id", auth(ROLES), getSubmissionsByCourseId);
router.put("/approve-result/:id", auth([ROLES[0]]), approveResult);

export default router;
