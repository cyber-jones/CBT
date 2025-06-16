const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  level: { type: String, required: true },
  name: { type: String, required: true },
  general: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);