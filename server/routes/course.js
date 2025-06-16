const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { updateCourse, deleteCourse, getCourses, createCourse } = require("../controllers/course");


router.post("/", auth(["Admin"]), createCourse);
router.get("/", auth(["Admin"]), getCourses);
router.put("/:id", auth(["Admin"]), updateCourse);
router.delete("/:id", auth(["Admin"]), deleteCourse);

module.exports = router;
