import Staff from "../models/Staff.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { StaffValidator } from "../validator/validateSchema.js";

export const createStaff = async (req, res, next) => {
  const { password, role, courseTaken, ...data } = req.body;
  const { error, value } = StaffValidator.validate(data);

  if (error)
    return res.status(400).json({ success: false, message: error.message });

  try {
    const existingUser = await User.findOne({ idNumber });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ password: hashedPassword, idNumber: value.idNumber });
    const staff = new Staff({ user: user._id, idNumber, ...value });

    user.roles.push(role);
    
    if (courseTaken) staff.coursesTaken.push(courseTaken);

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
    const staffs = await Staff.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, staffs });
  } catch (err) {
    next(err);
  }
};


export const getStaff = async (req, res, next) => {
  try {
    const student = await Staff.findById(req.params.id).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, student });
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
    res
      .status(200)
      .json({
        success: true,
        message: "Account deactivated successfully",
        staff,
      });
  } catch (err) {
    next(err);
  }
};
