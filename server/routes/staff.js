import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  getStaffs,
  createStaff,
  deactivateStffAccount,
} from "../controllers/staff.js";

router.post("/", auth(["Admin"]), getStaffs);
router.get("/", auth(["Admin"]), createStaff);
router.get("/deactivate-account", auth(["Admin"]), deactivateStffAccount);

export default router;
