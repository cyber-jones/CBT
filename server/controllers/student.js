const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const createStudent = async (req, res, next) => {
  const { password, role, ...data } = req.body;
  try {
    if (!["Student", "Lecturer", "Admin"].includes(role)) 
        return res.status(400).json({ message: "Invalid role" });

        const existingUser = await User.findOne({ email });
        if (existingUser)
          return res.status(400).json({ message: "User already exists" });
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ password: hashedPassword, role });
        const student = new Student({ user: user._id, ...data });

        await user.save();
        await Student.save();
    
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

const getStudents = async (req, res, next) => {
  try {
    const feedback = await Student.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    next(err);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const student = Student.findByIdAndUpdate(req.params.id, { $set: { ...req.body }}, { new: true }); 
    res.json(student);
  } catch (err) {
    next(err);
  }
};

const deactivateStudentAccount = async (req, res, next) => {
  try {
    const student = Student.findByIdAndUpdate(req.params.id, { $set: { deactivated: true }}, { new: true }); 
    res.json(student);
  } catch (err) {
    next(err);
  }
};


module.exports = { getStudents, updateStudent, createStudent, deactivateStudentAccount }
