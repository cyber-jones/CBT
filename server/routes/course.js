import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  updateCourse,
  deleteCourse,
  getCourses,
  getCourse,
  createCourse,
  getLecturerCourses,
} from "../controllers/course.js";
import { ROLES } from "../utils/SD.js";

router.post("/", auth([ROLES[0]]), createCourse);
router.get("/", auth(ROLES), getCourses);
router.get("/:id", auth([ROLES[0], ROLES[1]]), getCourse);
router.get("/lecturer/:id", auth([ROLES[0], ROLES[1]]), getLecturerCourses);
router.put("/:id", auth([ROLES[0]]), updateCourse);
router.delete("/:id", auth([ROLES[0]]), deleteCourse);

export default router;
