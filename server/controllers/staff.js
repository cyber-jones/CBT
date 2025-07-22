import Staff from "../models/Staff.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { StaffValidator } from "../validator/validateSchema.js";
import { ROLES } from "../utils/SD.js";


export const createStaff = async (req, res, next) => {
  const { error, value } = StaffValidator.validate(req.body);
  const { password, role, ...data } = value;

  if (error)
    return res.status(400).json({ success: false, message: error.message });

  try {
    const existingUser = await User.findOne({ idNumber: value.idNumber });
    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      password: hashedPassword,
      idNumber: value.idNumber,
      role: role,
    });
    const staff = new Staff({ user: user._id, ...data });

    await user.save();
    await staff.save();

    res
      .status(201)
      .json({ success: true, message: "Staff created successfully", staff });
  } catch (err) {
    next(err);
  }
};

export const getStaffs = async (req, res, next) => {
  try {
    const staffs = await Staff.find()
      .lean()
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, staffs });
  } catch (err) {
    next(err);
  }
};

export const getLecturers = async (req, res, next) => {
  try {
    const lecturers = (
      await Staff.find().lean().populate("user").sort({ createdAt: -1 })
    ).filter((lecturer) => lecturer.user.role === ROLES[1]);
    res.status(200).json({ success: true, lecturers });
  } catch (err) {
    next(err);
  }
};

export const getStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.params.id)
      .lean()
      .populate("user")

    res.status(200).json({ success: true, staff });
  } catch (err) {
    next(err);
  }
};

export const updateStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Staff updated successfully", staff });
  } catch (err) {
    next(err);
  }
};

export const deactivateStffAccount = async (req, res, next) => {
  try {
    await Staff.findByIdAndUpdate(req.params.id, {
      $set: { deactivated: true },
    });
    res.status(200).json({
      success: true,
      message: "Account deactivated successfully",
      staff,
    });
  } catch (err) {
    next(err);
  }
};
