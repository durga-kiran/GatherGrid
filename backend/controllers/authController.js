
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { randomInt } from "node:crypto";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendVerificationEmail } from "../config/mailer.js";

// Generate a six-digit OTP
const generateOTP = () => {
  return randomInt(100000, 1000000).toString();
};

// REGISTER USER
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required"
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must contain at least 8 characters"
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail
  });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: existingUser.emailVerified
        ? "Email is already registered"
        : "An account already exists. Please request a new verification code."
    });
  }

  // Generate and hash OTP
  const otp = generateOTP();
  const otpHash = await bcrypt.hash(otp, 12);

  // Create an unverified account
  const user = await User.create({
    name,
    email: normalizedEmail,
    phone,
    password,
    emailVerified: false,
    emailVerificationCodeHash: otpHash,
    emailVerificationExpires: new Date(Date.now() + 10 * 60 * 1000),
    emailVerificationLastSentAt: new Date()
  });

  // Send verification email
  try {
    await sendVerificationEmail(user.email, user.name, otp);
  } catch (error) {
    console.error("Verification email error:", error.message);

    return res.status(503).json({
      success: false,
      message: "Account created, but verification email could not be sent. Please request a new code."
    });
  }

  return res.status(201).json({
    success: true,
    message: "Registration successful. Please check your email for the verification code.",
    email: user.email
  });
});


// VERIFY EMAIL
export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email and verification code are required"
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail
  }).select("+emailVerificationCodeHash");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Account not found"
    });
  }

  if (user.emailVerified) {
    return res.status(400).json({
      success: false,
      message: "Email is already verified"
    });
  }

  if (
    !user.emailVerificationCodeHash ||
    !user.emailVerificationExpires ||
    user.emailVerificationExpires < new Date()
  ) {
    return res.status(400).json({
      success: false,
      message: "Verification code expired. Please request a new code."
    });
  }

  // Compare submitted OTP with stored hash
  const isValidOTP = await bcrypt.compare(
    String(otp).trim(),
    user.emailVerificationCodeHash
  );

  if (!isValidOTP) {
    return res.status(400).json({
      success: false,
      message: "Invalid verification code"
    });
  }

  // Activate account
  user.emailVerified = true;
  user.emailVerificationCodeHash = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();

  // Generate token only after successful verification
  const token = generateToken(user._id);

  return res.status(200).json({
    success: true,
    message: "Email verified successfully. Your account is now active.",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});


// RESEND VERIFICATION OTP

export const resendVerificationCode = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail
  });

  if (!user || user.emailVerified) {
    return res.status(200).json({
      success: true,
      message: "If the account requires verification, a new code will be sent."
    });
  }

  // Check 60-second resend cooldown
  const lastSent = user.emailVerificationLastSentAt
    ? user.emailVerificationLastSentAt.getTime()
    : 0;

  const remainingTime = 60 - Math.floor(
    (Date.now() - lastSent) / 1000
  );

  if (remainingTime > 0) {
    return res.status(429).json({
      success: false,
      message: `Please wait ${remainingTime} seconds before requesting another code.`
    });
  }

  const otp = generateOTP();

  user.emailVerificationCodeHash = await bcrypt.hash(otp, 12);
  user.emailVerificationExpires = new Date(Date.now() + 10 * 60 * 1000);
  user.emailVerificationLastSentAt = new Date();

  await user.save();

  try {
    await sendVerificationEmail(user.email, user.name, otp);

    return res.status(200).json({
      success: true,
      message: "A new verification code has been sent to your email."
    });
  } catch (error) {
    console.error("Resend verification email failed:", error.message);

    return res.status(503).json({
      success: false,
      message: "Unable to send verification email. Please try again later."
    });
  }
});



// LOGIN USER
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail
  }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  if (!user.isActive) {
    return res.status(403).json({
      success: false,
      message: "Your account has been disabled"
    });
  }

  // Do not allow unverified users to log in
  if (!user.emailVerified) {
    return res.status(403).json({
      success: false,
      message: "Please verify your email before logging in."
    });
  }

  const token = generateToken(user._id);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});


// GET CURRENT LOGGED-IN USER
export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      profileImage: req.user.profileImage,
      emailVerified: req.user.emailVerified
    }
  });
});
