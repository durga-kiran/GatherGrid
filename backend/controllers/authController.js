
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";

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

  const existingUser = await User.findOne({
    email: email.toLowerCase()
  });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email is already registered"
    });
  }

  const user = await User.create({
    name,
    email,
    phone,
    password
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  const user = await User.findOne({
    email: email.toLowerCase()
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

  const token = generateToken(user._id);

  res.status(200).json({
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

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      profileImage: req.user.profileImage
    }
  });
});
