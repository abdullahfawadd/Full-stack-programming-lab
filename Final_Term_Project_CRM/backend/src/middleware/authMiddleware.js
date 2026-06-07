import User from "../models/User.js";
import { clearAuthCookie, readToken, verifyToken } from "../utils/token.js";

export const protect = async (req, res, next) => {
  try {
    const token = readToken(req);

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      clearAuthCookie(res);
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = user;
    return next();
  } catch (_error) {
    clearAuthCookie(res);
    return res.status(401).json({ message: "Invalid or expired session" });
  }
};
