import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true } // Index of correct option
});

const examSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  questions: [questionSchema],
  time: { type: String, required: true },
  instruction: { type: String, required: true },
  totalMark: { type: Number, required: true },
  start: { type: Boolean, default: false },
  written: { type: Boolean, default: false },
  allowedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student'}]
}, { timestamps: true });

const Exam = mongoose.model('Exam', examSchema);

export default Exam;