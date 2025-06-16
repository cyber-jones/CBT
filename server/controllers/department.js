const Department = require("../models/Department");

const createDepartment = async (req, res, next) => {
  try {
    const department = new Department({ ...req.body });
    await department.save();

    res.status(201).json(department);
  } catch (err) {
    next(err);
  }
};

const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json(departments);
  } catch (err) {
    next(err);
  }
};

const updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.json(department);
  } catch (err) {
    next(err);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDepartments,
  updateDepartment,
  createDepartment,
  deleteDepartment,
};
