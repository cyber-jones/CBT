const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Lecturer', 'Admin'], required: true },
  canSetExams: { type: Boolean, default: false } // For lecturers, controlled by admin
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);