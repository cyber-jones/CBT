import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const getRefresh = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    const userFromDb = await User.findOne({ token: cookies?.jwt });

    if (!userFromDb)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    jwt.verify(userFromDb.refreshToken, process.env.JWT_SECRET, (err, user) => {
      if (err || userFromDb._id.toString() !== user.id.toString())
        return res.status(403).json({ success: false, message: "Forbidden!" });

      const accessToken = jwt.sign(
        { id: user.id, email: user.email, roles: user.roles },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ success: true, accessToken, user: userFromDb });
    });
  } catch (err) {
    next(err);
  }
};
