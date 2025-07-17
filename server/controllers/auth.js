import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { LoginValidator } from "../validator/validateSchema.js";
import Student from "../models/Student.js";
import Staff from "../models/Staff.js";

export const login = async (req, res, next) => {
  const { selectedUser, ...data } = req.body;
  const { error, value } = LoginValidator.validate(data);

  if (error)
    return res.status(400).json({ success: false, message: error.message });
  try {
    let user = null;
    if (selectedUser == "student")
      user = await Student.findOne({ idNumber: value.idNumber }).lean();
    else user = await Staff.findOne({ idNumber: value.idNumber }).lean();

    if (!user)
      return res.status(400).json({ success: false, message: "No user found" });

    const authUser = await User.findOne({ idNumber: user.idNumber });
    if (!authUser)
      return res
        .status(400)
        .json({ message: "Invalid Matirc No or ID number" });

    const isMatch = await bcrypt.compare(value.password, authUser.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });

    const accessToken = jwt.sign(
      { id: authUser._id, role: authUser.role, idNumber: authUser.idNumber },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const cookieToken = jwt.sign(
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

    authUser.token = cookieToken;
    await authUser.save();

    res.cookie("jwt", cookieToken, cookieOpt);
    res.json({ success: true, accessToken, authUser, user });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    //On client also delete the access token

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //Succuss No content
    const cookieToken = cookies.jwt;

    //Is refresh token in DB?
    const authUser = await User.findOne({ token: cookieToken }).exec();
    if (!authUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    //Delete refreshToken in DB
    authUser.token = "";
    await authUser.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
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
    res.status(200).json({
      message: `Exam-setting permission ${
        req.body.canSetExams ? "granted" : "revoked"
      }`,
    });
  } catch (err) {
    next(err);
  }
};
