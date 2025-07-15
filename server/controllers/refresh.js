import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ROLES } from "../utils/SD.js";

export const getRefresh = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    console.log(cookies);

    if (!cookies?.jwt)
      return res.status(401).json({ success: false, message: "Unauthorized: invalid cookie!" });

    const authUser = await User.findOne({ token: cookies?.jwt });
    let user = null;
    if (authUser.role == ROLES[2]) user = await Student.findById(authUser._id);
    else user = await Staff.findById(authUser._id);

    if (!authUser)
      return res.status(401).json({ success: false, message: "Unauthorized: token not found!" });

    jwt.verify(authUser.refreshToken, process.env.JWT_SECRET, (err, user) => {
      if (err || authUser._id.toString() !== user.id.toString())
        return res.status(403).json({ success: false, message: "Forbidden!" });

      const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ success: true, accessToken, authUser, user });
    });
  } catch (err) {
    next(err);
  }
};
