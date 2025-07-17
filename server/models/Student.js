import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    college: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
    level: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    deactivated: { type: Boolean, default: false },
    gender: { type: String, enum: ["Male", "Female"], required: true },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema); 

export default Student;
