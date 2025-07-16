import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  login,
  grantExamPermission,
  logout
} from "../controllers/auth.js";
import { ROLES } from "../utils/SD.js";


router.post("/login", login);
router.get("/logout", logout);
// Admin: Grant/revoke exam-setting permission for lecturers
router.put("/grant-exam-permission/:id", auth([ROLES[0]]), grantExamPermission);

export default router;
