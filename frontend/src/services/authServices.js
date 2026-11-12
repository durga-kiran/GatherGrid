
import api from "./api";

// Register new user
const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Verify email using OTP
const verifyEmail = async (email, otp) => {
  const response = await api.post("/auth/verify-email", {
    email,
    otp,
  });

  return response.data;
};

// Resend email verification OTP
const resendVerification = async (email) => {
  const response = await api.post("/auth/resend-verification", {
    email,
  });

  return response.data;
};

// Login user
const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// Get currently logged-in user
const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Export authentication services
const authService = {
  register,
  verifyEmail,
  resendVerification,
  login,
  getCurrentUser,
};

export default authService;
