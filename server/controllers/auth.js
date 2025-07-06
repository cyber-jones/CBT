import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';




export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { id: user._id, roles: user.roles, idNumber: user.idNumber },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const token = jwt.sign(
      { id: user._id, roles: user.roles, idNumber: user.idNumber },
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

    user.token = token;
    await user.save();

    res.cookie("jwt", token, cookieOpt);
    res.json({ success: true, accessToken, user });
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