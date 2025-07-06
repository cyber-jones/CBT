import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  getStaffs,
  getStaff,
  createStaff,
  deactivateStffAccount,
} from "../controllers/staff.js";
import { ROLES } from "../utils/SD.js";

router.post("/", auth([ROLES[0]]), createStaff);
router.get("/", auth([ROLES]), getStaffs);
router.get("/:id", auth([ROLES]), getStaff);
router.get("/deactivate-account", auth([ROLES[0]]), deactivateStffAccount);

export default router;
