
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";
import authService from "../../services/authServices.js";
// import useAuth from "../../hooks/useAuth.js";
import Button from "../../components/common/Button";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!formData.email.trim() || !formData.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // Call login API once
      const response = await authService.login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      // authService returns response.data directly
      const { token, user } = response;

      if (!token || !user) {
        throw new Error("Invalid login response from server.");
      }

      // Save authentication details in AuthContext
      login(token, user);

      toast.success("Welcome back!");

      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        const destination = location.state?.from;
        navigate(destination || "/dashboard", { replace: true });
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-visual">
          <div className="auth-visual-content">
            <span className="auth-eyebrow">
              YOUR NEXT EXPERIENCE
            </span>

            <h1>
              Moments that
              <br />
              become memories.
            </h1>

            <p>
              Discover extraordinary events, connect with people,
              and make every experience unforgettable.
            </p>

            <div className="auth-visual-bottom">
              <span>Discover. Experience. Remember.</span>
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
                WELCOME BACK
              </span>

              <h2>Sign in to your account</h2>

              <p>
                Enter your details to continue your Venuza journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">

              <div className="form-group">
                <label htmlFor="email">Email address</label>

                <div className="auth-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="email"
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
                <label htmlFor="password">Password</label>

                <div className="auth-input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
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

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="auth-submit"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

            </form>

            <p className="auth-switch">
              Don't have an account?
              <Link to="/register"> Create an account</Link>
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

export default Login;
