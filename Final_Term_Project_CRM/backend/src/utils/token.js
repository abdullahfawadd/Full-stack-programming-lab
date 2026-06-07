import jwt from "jsonwebtoken";

const TOKEN_COOKIE = "crm_access_token";
const JWT_EXPIRES_IN = "7d";

export const createToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required");
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const setAuthCookie = (res, token) => {
  res.cookie(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie(TOKEN_COOKIE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

export const readToken = (req) =>
  req.cookies?.[TOKEN_COOKIE] ||
  req.header("Authorization")?.replace("Bearer ", "");

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

export { TOKEN_COOKIE };
