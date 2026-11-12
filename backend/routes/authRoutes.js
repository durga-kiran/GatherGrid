
import express from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  verifyEmail,
  resendVerificationCode
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Registration and email verification
router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationCode);

// Login
router.post("/login", loginUser);

// Logged-in user
router.get("/me", authMiddleware, getCurrentUser);

export default router;
