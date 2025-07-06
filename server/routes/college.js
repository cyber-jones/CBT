import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  updateCollege,
  deleteCollege,
  getColleges,
  getCollege,
  createCollege,
} from "../controllers/college.js";
import { ROLES } from "../utils/SD.js";

router.post("/", auth([ROLES[0]]), createCollege);
router.get("/", auth([ROLES]), getColleges);
router.get("/:id", auth([ROLES]), getCollege);
router.put("/:id", auth([ROLES[0]]), updateCollege);
router.delete("/:id", auth([ROLES[0]]), deleteCollege);

export default router;
