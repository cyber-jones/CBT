const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coursesTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    firstName: { type: String, required: true },
    LastName: { type: String, required: true },
    middleName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    staffIdNumber: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    deactivated: { type: String, required: false },
    gender: { type: String, enum: ["male", "female"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
