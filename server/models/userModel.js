// import { Schema, model } from "mongoose";




// const userSchema = new Schema({
//     email: {
//         required: true,
//         unique: true,
//         type: String
//     },
//     password: {
//         required: true,
//         unique: true,
//         type: String
//     },
//     roles: {
//         type: [String],
//         enum: ["admin", "doctor", "staff", "patient"],
//         default: ["user"],
//     },
//     accType: {
//         required: true,
//         type: String
//     },
//     refreshToken: {
//         type: String,
//     },
//     user_Profile_Id: {
//         unique: true,
//         type: String
//     }
// }, { timestamps: true });

// const User = model("User", userSchema);

// export default User;