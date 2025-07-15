import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { LoginValidator } from "../validator/validateSchema.js";
import { ROLES } from "../utils/SD.js";
import Student from "../models/Student.js";
import Staff from "../models/Staff.js";

export const login = async (req, res, next) => {
  const { error, value } = LoginValidator.validate(req.body);

  if (error)
    return res.status(400).json({ success: false, message: error.message });
  try {
    const authUser = await User.findOne({ idNumber: value.idNumber });
    if (!authUser)
      return res
        .status(400)
        .json({ message: "Invalid Matirc No or ID number" });

    const isMatch = await bcrypt.compare(value.password, authUser.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    let user = null;
    if (authUser.role == ROLES[2])
      user = await Student.findById(authUser._id);
    else
      user = await Staff.findById(authUser._id);

    const accessToken = jwt.sign(
      { id: authUser._id, role: authUser.role, idNumber: authUser.idNumber },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const token = jwt.sign(
      { id: authUser._id, role: authUser.role, idNumber: authUser.idNumber },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const cookieOpt = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };

    authUser.token = token;
    await authUser.save();

    res.cookie("jwt", token, cookieOpt);
    res.json({ success: true, accessToken, authUser, user });
  } catch (err) {
    next(err);
  }
};

export const grantExamPermission = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== "Lecturer")
      return res.status(404).json({ message: "Lecturer not found" });
    user.canSetExams = req.body.canSetExams;
    await user.save();
    res.json({
      message: `Exam-setting permission ${
        req.body.canSetExams ? "granted" : "revoked"
      }`,
    });
  } catch (err) {
    next(err);
  }
};

export const lecturers = async (req, res) => {
  try {
    const lecturers = await User.find({ role: "Lecturer" }).select(
      "email canSetExams"
    );
    res.json(lecturers);
  } catch (err) {
    next(err);
  }
};
