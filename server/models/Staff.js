import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    college: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    title: { type: String, enum: ["Dr.", "Prof.", "Mr.", "Ms."], required: true },
    email: { type: String, required: true, unique: true },
    idNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    deactivated: { type: Boolean, default: false },
    gender: { type: String, enum: ["Male", "Female"], required: true },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
