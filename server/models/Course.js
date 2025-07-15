import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  level: { type: String, required: true },
  code: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  unit: { type: Number, required: true }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;