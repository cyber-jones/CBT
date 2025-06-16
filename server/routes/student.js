const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getStudents, createStudent, deactivateStudentAccount } = require("../controllers/student");



router.get("/", auth(["Admin", "Lecturer"]), getStudents);
router.post("/", auth(["Admin"]), createStudent);
router.get("/deactivate-account", auth(["Admin"]), deactivateStudentAccount);

module.exports = router; 
