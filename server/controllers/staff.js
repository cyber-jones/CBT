const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const createStaff = async (req, res, next) => {
  const { password, role, ...data } = req.body;
  try {
    if (!["Staff", "Lecturer", "Admin"].includes(role)) 
        return res.status(400).json({ message: "Invalid role" });

        const existingUser = await User.findOne({ email });
        if (existingUser)
          return res.status(400).json({ message: "User already exists" });
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ password: hashedPassword, role });
        const staff = new Staff({ user: user._id, ...data });

        await user.save();
        await staff.save();
    
    res.status(201).json(staff);
  } catch (err) {
    next(err);
  }
};

const getStaffs = async (req, res, next) => {
  try {
    const feedback = await Staff.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    next(err);
  }
};

const updateStaff = async (req, res, next) => {
  try {
    const staff = Staff.findByIdAndUpdate(req.params.id, { $set: { ...req.body }}, { new: true }); 
    res.json(staff);
  } catch (err) {
    next(err);
  }
};

const deactivateStffAccount = async (req, res, next) => {
  try {
    const staff = Staff.findByIdAndUpdate(req.params.id, { $set: { deactivated: true }}, { new: true }); 
    res.json(staff);
  } catch (err) {
    next(err);
  }
};


module.exports = { getStaffs, updateStaff, createStaff, deactivateStffAccount }
