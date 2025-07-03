import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  updateDepartment,
  deleteDepartment,
  getDepartments,
  createDepartment,
} from "../controllers/department.js";

router.post("/", auth(["Admin"]), createDepartment);
router.get("/", auth(["Admin"]), getDepartments);
router.put("/:id", auth(["Admin"]), updateDepartment);
router.delete("/:id", auth(["Admin"]), deleteDepartment);

export default router;
