import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  getStudents,
  getStudent,
  createStudent,
  deactivateStudentAccount,
} from "../controllers/student.js";
import { ROLES } from "../utils/SD.js";

router.get("/", auth([ROLES]), getStudents);
router.get("/:id", auth([ROLES]), getStudent);
router.post("/", auth([ROLES[0]]), createStudent);
router.get("/deactivate-account", auth([ROLES[0]]), deactivateStudentAccount);

export default router;
        