import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  login,
  grantExamPermission,
  lecturers,
} from "../controllers/auth.js";
import { ROLES } from "../utils/SD.js";


router.post("/login", login);
// Admin: Grant/revoke exam-setting permission for lecturers
router.put("/grant-exam-permission/:id", auth([ROLES[0]]), grantExamPermission);
// Admin: Get all lecturers
router.get("/lecturers", auth([ROLES[0]]), lecturers);

export default router;
