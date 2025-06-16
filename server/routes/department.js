const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { updateDepartment, deleteDepartment, getDepartments, createDepartment } = require("../controllers/department");


router.post("/", auth(["Admin"]), createDepartment);
router.get("/", auth(["Admin"]), getDepartments);
router.put("/:id", auth(["Admin"]), updateDepartment);
router.delete("/:id", auth(["Admin"]), deleteDepartment);

module.exports = router;
