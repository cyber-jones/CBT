const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');




const register = async (req, res, next) => {
  const { email, password, role } = req.body;
  console.log(req.body);
  if (!["Student", "Lecturer", "Admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
};

const grantExamPermission = async (req, res, next) => {
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

const lecturers = async (req, res) => {
  try {
    const lecturers = await User.find({ role: "Lecturer" }).select(
      "email canSetExams"
    );
    res.json(lecturers);
  } catch (err) {
    next(err);
  }
};



module.exports = { register, login, grantExamPermission, lecturers }