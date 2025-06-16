const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    level: { type: String, required: true },
    firstName: { type: String, required: true },
    LastName: { type: String, required: true },
    middleName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    matricNumber: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    deactivated: { type: String, required: false },
    gender: { type: String, enum: ["male", "female"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
