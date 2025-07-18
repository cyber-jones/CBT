import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  selectedOption: { type: String, required: true }
});

const submissionSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  answers: [answerSchema],
  percentage: { type: Number, required: true },
  score: { type: Number, required: true },
  approved: { type: Boolean, default: false }, // Admin approval for result release
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;