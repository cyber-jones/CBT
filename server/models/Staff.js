import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coursesTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    firstName: { type: String, required: true },
    LastName: { type: String, required: true },
    middleName: { type: String, required: true },
    title: { type: String, enum: ["Dr.", "Prof.", "Mr.", "Ms."], required: true },
    email: { type: String, required: true, unique: true },
    idNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    deactivated: { type: Boolean, default: false },
    gender: { type: String, enum: ["male", "female"], required: true },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
