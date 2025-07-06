import College from "../models/College.js";
import { CollegeValidator } from "../validator/validateSchema.js";

export const createCollege = async (req, res, next) => {
  const { error, value } = CollegeValidator.validate(req.body);

  if (error)
    return res.status(400).json({ success: false, message: error.message });
  try {
    const college = new College({ ...value });
    await college.save();

    res.status(201).json({
      success: true,
      message: "College created successfully",
      college,
    });
  } catch (err) {
    next(err);
  }
};

export const getColleges = async (req, res, next) => {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, colleges });
  } catch (err) {
    next(err);
  }
};

export const getCollege = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, college });
  } catch (err) {
    next(err);
  }
};

export const updateCollege = async (req, res, next) => {
  try {
    const college = await College.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(205).json({
      success: true,
      message: "College updated successfully",
      college,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCollege = async (req, res, next) => {
  try {
    await College.findByIdAndDelete(req.params.id);
    res
      .status(204)
      .json({ success: true, message: "College deleted successfully" });
  } catch (err) {
    next(err);
  }
};
