import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  updateDepartment,
  deleteDepartment,
  getDepartments,
  getDepartment,
  createDepartment,
} from "../controllers/department.js";
import { ROLES } from "../utils/SD.js";

router.post("/", auth([ROLES[0]]), createDepartment);
router.get("/", auth([ROLES]), getDepartments);
router.get("/:id", auth([ROLES]), getDepartment);
router.put("/:id", auth([ROLES[0]]), updateDepartment);
router.delete("/:id", auth([ROLES[0]]), deleteDepartment);

export default router;
