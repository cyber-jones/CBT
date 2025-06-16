const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {  getStaffs, createStaff, deactivateStffAccount } = require("../controllers/staff");


router.post("/", auth(["Admin"]), getStaffs);
router.get("/", auth(["Admin"]), createStaff);
router.get("/deactivate-account", auth(["Admin"]), deactivateStffAccount);

module.exports = router;
