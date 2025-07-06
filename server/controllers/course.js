import Course from "../models/Course.js";
import { CourseValidator } from "../validator/validateSchema.js";

export const createCourse = async (req, res, next) => {
  const { error, value } = CourseValidator.validate(req.body);

  if (error)
    return res.status(400).json({ success: false, message: error.message });

  try {
    const course = new Course({ ...value });
    await course.save();

    res
      .status(201)
      .json({ success: true, message: "Course created successfully", course });
  } catch (err) {
    next(err);
  }
};

export const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, courses });
  } catch (err) {
    next(err);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).sort({ createdAt: -1 });
    res.status(200).json({ success: true, course });
  } catch (err) {
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    res
      .status(205)
      .json({ success: true, message: "Course updated successfully", course });
  } catch (err) {
    next(err);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (err) {
    next(err);
  }
};
