
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "react-toastify";

import authService from "../../services/authServices.js";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const email = formData.email.trim().toLowerCase();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const registrationData = {
        name: formData.name.trim(),
        email,
        phone: formData.phone.trim(),
        password: formData.password,
      };

      const response = await authService.register(
        registrationData
      );

      if (response.success === false) {
        throw new Error(
          response.message || "Registration failed."
        );
      }

      toast.success(
        response.message || "Verification code sent to your email."
      );

      navigate(
        `/verify-email?email=${encodeURIComponent(email)}`,
        {
          replace: true,
          state: { email },
        }
      );

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";

      // Existing but unverified account
      if (
        error.response?.status === 409 &&
        message.toLowerCase().includes("verification")
      ) {
        toast.info(
          "Your account already exists. Continue to email verification."
        );

        navigate(
          `/verify-email?email=${encodeURIComponent(email)}`,
          {
            replace: true,
            state: {
              email,
              resendOtp: true,
            },
          }
        );

        return;
      }

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-visual register-visual">
          <div className="auth-visual-content">
            <span className="auth-eyebrow">
              JOIN THE EXPERIENCE
            </span>

            <h1>
              Your story
              <br />
              starts here.
            </h1>

            <p>
              Create your Venuza account and explore experiences
              worth remembering.
            </p>

            <div className="auth-visual-bottom">
              <span>One account. Endless experiences.</span>
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-wrapper">

            <Link to="/" className="auth-brand">
              venuza<span>.</span>
            </Link>

            <div className="auth-heading">
              <span className="section-eyebrow">
                GET STARTED
              </span>

              <h2>Create your account</h2>

              <p>
                Sign up to discover and book amazing events.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="auth-form"
            >

              <div className="form-group">
                <label htmlFor="name">Full name</label>

                <div className="auth-input-wrapper">
                  <User size={18} />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="register-email">
                  Email address
                </label>

                <div className="auth-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="register-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone number</label>

                <div className="auth-input-wrapper">
                  <Phone size={18} />

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="register-password">
                  Password
                </label>

                <div className="auth-input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <div className="auth-input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="admin-primary-btn auth-submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

            </form>

            <p className="auth-switch">
              Already have an account?
              <Link to="/login"> Sign in</Link>
            </p>

            <Link to="/" className="auth-back-home">
              ← Back to home
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
