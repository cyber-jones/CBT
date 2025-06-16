const Course = require("../models/Course");

const createCourse = async (req, res, next) => {
  try {
    const course = new Course({ ...req.body });
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.json(course);
  } catch (err) {
    next(err);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(204);
  } catch (err) {
    next(err);
  }
};

module.exports = { getCourses, updateCourse, createCourse, deleteCourse };
