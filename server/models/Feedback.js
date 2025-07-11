import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stakeholderType: { type: String, enum: ['Student', 'Lecturer'], required: true },
  category: { type: String, enum: ['Benefit', 'Challenge', 'Solution'], required: true },
  comment: { type: String, required: true }
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;