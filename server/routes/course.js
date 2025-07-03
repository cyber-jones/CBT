import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  updateCourse,
  deleteCourse,
  getCourses,
  createCourse,
} from "../controllers/course.js";

router.post("/", auth(["Admin"]), createCourse);
router.get("/", auth(["Admin"]), getCourses);
router.put("/:id", auth(["Admin"]), updateCourse);
router.delete("/:id", auth(["Admin"]), deleteCourse);

export default router;
