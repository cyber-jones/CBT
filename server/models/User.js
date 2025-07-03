import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], enum: ['Student', 'Lecturer', 'Admin'], required: true },
  canSetExams: { type: Boolean, default: false }, // For lecturers, controlled by admin
  token: { type: String, unique: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;