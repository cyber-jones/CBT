import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Lecturer', 'Admin']},
  canSetExams: { type: Boolean, default: false }, // For lecturers, controlled by admin
  token: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;