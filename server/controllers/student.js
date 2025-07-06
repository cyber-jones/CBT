import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { ROLES } from "../utils/SD.js";
import { StudentValidator } from "../validator/validateSchema.js";

export const createStudent = async (req, res, next) => {
  const { error, value } = StudentValidator.validate(req.body);

  if (error)
    return res.status(400).json({ success: false, message: error.message });

  try {
    const existingUser = await User.findOne({ idNumber });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      password: hashedPassword,
      idNumber: value.idNumber,
    });
    const student = new Student({ user: user._id, ...value });
    user.roles.push(ROLES[2]);
    await user.save();
    await Student.save();

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (err) {
    next(err);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, students });
  } catch (err) {
    next(err);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, student });
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(205).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (err) {
    next(err);
  }
};

export const deactivateStudentAccount = async (req, res, next) => {
  try {
    const student = Student.findByIdAndUpdate(req.params.id, {
      $set: { deactivated: true },
    });
    res.status(200).json({
      success: true,
      message: "Account deactivated successfully",
      student,
    });
  } catch (err) {
    next(err);
  }
};
