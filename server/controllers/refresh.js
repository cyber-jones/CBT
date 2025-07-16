import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ROLES } from "../utils/SD.js";
import Student from "../models/Student.js";
import Staff from "../models/Staff.js";

export const getRefresh = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt)
      return res.status(401).json({ success: false, message: "Unauthorized: invalid cookie!" });

    const authUser = await User.findOne({ token: cookies?.jwt });
    let theUser = null;
    if (authUser.role == ROLES[2]) theUser = await Student.findOne({ idNumber: authUser.idNumber }).lean();
    else theUser = await Staff.findOne({ idNumber: authUser.idNumber }).lean();

    if (!authUser)
      return res.status(401).json({ success: false, message: "Unauthorized: token not found!" });

    jwt.verify(authUser.token, process.env.JWT_SECRET, (err, user) => {
      if (err || authUser._id.toString() !== user.id.toString())
        return res.status(403).json({ success: false, message: "Forbidden!" });

      const accessToken = jwt.sign(
        { id: user.id, idNumber: user.idNumber, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ success: true, accessToken, authUser, user: theUser });
    });
  } catch (err) {
    next(err);
  }
};
