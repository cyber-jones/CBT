const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);