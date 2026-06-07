import User from "../models/User.js";
import { clearAuthCookie, createToken, setAuthCookie } from "../utils/token.js";

const userPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  title: user.title,
});

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "Admin",
      title: "CRM Operator",
    });
    const token = createToken(user._id);
    setAuthCookie(res, token);

    return res.status(201).json({ data: userPayload(user) });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken(user._id);
    setAuthCookie(res, token);

    return res.status(200).json({ data: userPayload(user) });
  } catch (error) {
    return next(error);
  }
};

export const logout = (_req, res) => {
  clearAuthCookie(res);
  return res.status(200).json({ message: "Logged out successfully" });
};

export const me = (req, res) => res.status(200).json({ data: userPayload(req.user) });
