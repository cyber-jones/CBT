import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true } // Index of correct option
});

const examSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  questions: [questionSchema],
  time: { type: String, required: true },
}, { timestamps: true });

const Exam = mongoose.model('Exam', examSchema);

export default Exam;