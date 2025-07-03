import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  getStudents,
  createStudent,
  deactivateStudentAccount,
} from "../controllers/student.js";

router.get("/", auth(["Admin", "Lecturer"]), getStudents);
router.post("/", auth(["Admin"]), createStudent);
router.get("/deactivate-account", auth(["Admin"]), deactivateStudentAccount);

export default router;
