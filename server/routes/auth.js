const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  register,
  login,
  grantExamPermission,
  lecturers,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
// Admin: Grant/revoke exam-setting permission for lecturers
router.put("/grant-exam-permission/:id", auth(["Admin"]), grantExamPermission);
// Admin: Get all lecturers
router.get("/lecturers", auth(["Admin"]), lecturers);

module.exports = router;
