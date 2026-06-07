import express from "express";
import { z } from "zod";
import { login, logout, me, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

const authSchema = z.object({
  email: z.email("Enter a valid email").trim().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = authSchema.extend({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
});

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(authSchema), login);
router.post("/logout", logout);
router.get("/me", protect, me);

export default router;
