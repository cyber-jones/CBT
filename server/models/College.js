import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  examMode: { type: Boolean, default: false }
}, { timestamps: true });

const College = mongoose.model('College', collegeSchema);

export default College;