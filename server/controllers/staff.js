import Staff from '../models/Staff.js';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';


export const createStaff = async (req, res, next) => {
  const { password, role, email, ...data } = req.body;
  try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
          return res.status(400).json({ message: "User already exists" });
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ password: hashedPassword, email });
        const staff = new Staff({ user: user._id, email, ...data });
        user.roles.push(role);
        await user.save();
        await staff.save();
    
    res.status(201).json(staff);
  } catch (err) {
    next(err);
  }
};

export const getStaffs = async (req, res, next) => {
  try {
    const feedback = await Staff.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    next(err);
  }
};

export const updateStaff = async (req, res, next) => {
  try {
    const staff = Staff.findByIdAndUpdate(req.params.id, { $set: { ...req.body }}, { new: true }); 
    res.json(staff);
  } catch (err) {
    next(err);
  }
};

export const deactivateStffAccount = async (req, res, next) => {
  try {
    const staff = Staff.findByIdAndUpdate(req.params.id, { $set: { deactivated: true }}, { new: true }); 
    res.json(staff);
  } catch (err) {
    next(err);
  }
};
