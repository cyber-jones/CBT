import Department from "../models/Department.js";

export const createDepartment = async (req, res, next) => {
  try {
    const department = new Department({ ...req.body });
    await department.save();

    res.status(201).json({ success: true, message: "Department created successfully", department });
  } catch (err) {
    next(err);
  }
};

export const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, departments });
  } catch (err) {
    next(err);
  }
};

export const updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(205).json({ success: true, message: "Department updated successfully", department });
  } catch (err) {
    next(err);
  }
};

export const deleteDepartment = async (req, res, next) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(204).json({ success: true, message: "Department deleted successfully" });
  } catch (err) {
    next(err);
  }
};

