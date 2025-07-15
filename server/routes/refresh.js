import express from "express";
import { getRefresh } from "../controllers/refresh.js";
const router = express.Router();


router.get("/refresh", getRefresh);

export default router;
