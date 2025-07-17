import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  getStaffs,
  getStaff,
  createStaff,
  deactivateStffAccount,
  getLecturers,
  updateStaff,
} from "../controllers/staff.js";
import { ROLES } from "../utils/SD.js";

router.post("/", auth([ROLES[0]]), createStaff);
router.put("/", auth([ROLES[0]]), updateStaff);
router.get("/", auth([ROLES[0]]), getStaffs);
router.get("/lecturers", auth([ROLES[0]]), getLecturers);
router.get("/:id", auth([ROLES[0]]), getStaff);
router.get("/deactivate-account", auth([ROLES[0]]), deactivateStffAccount);

export default router;
