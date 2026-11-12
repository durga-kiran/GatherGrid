
import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { MailCheck, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

import authService from "../../services/authServices.js";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/common/Button";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const inputRefs = useRef([]);
  const autoResendAttempted = useRef(false);

  const { login } = useAuth();

  // Get email from navigation state or URL query parameters.
  const email =
    location.state?.email || searchParams.get("email") || "";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // ==========================================
  // AUTOMATIC OTP RESEND
  // ==========================================

  useEffect(() => {
    if (
      !email ||
      location.state?.resendOtp !== true ||
      autoResendAttempted.current
    ) {
      return;
    }

    // Prevent duplicate automatic requests.
    autoResendAttempted.current = true;

    // Clear the navigation flag.
    navigate(
      `${location.pathname}${location.search}`,
      {
        replace: true,
        state: { email },
      }
    );

    const sendOTP = async () => {
      try {
        setResending(true);

        const response =
          await authService.resendVerification(email);

        setCode(["", "", "", "", "", ""]);

        toast.success(
          response.message ||
          "A new verification code has been sent."
        );

      } catch (error) {
        toast.error(
          error.response?.data?.message ||
          "Unable to send verification code. Please try again."
        );
      } finally {
        setResending(false);
      }
    };

    sendOTP();

  }, [
    email,
    location.state?.resendOtp,
    location.pathname,
    location.search,
    navigate,
  ]);

  // ==========================================
  // OTP INPUT HANDLING
  // ==========================================

  const handleChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedCode = [...code];
    updatedCode[index] = digit;

    setCode(updatedCode);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ==========================================
  // BACKSPACE HANDLING
  // ==========================================

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !code[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ==========================================
  // OTP PASTE HANDLING
  // ==========================================

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedCode = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedCode) return;

    const updatedCode = [...code];

    pastedCode.split("").forEach((digit, index) => {
      updatedCode[index] = digit;
    });

    setCode(updatedCode);

    inputRefs.current[
      Math.min(pastedCode.length, 5)
    ]?.focus();
  };

  // ==========================================
  // VERIFY EMAIL
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email address is missing.");
      return;
    }

    const otp = code.join("");

    if (!/^\d{6}$/.test(otp)) {
      toast.error("Please enter all six digits.");
      return;
    }

    try {
      setLoading(true);

      const response =
        await authService.verifyEmail(email, otp);

      const { token, user } = response;

      if (!token || !user) {
        throw new Error(
          "Invalid verification response from server."
        );
      }

      // Save authentication details.
      login(token, user);

      toast.success("Your email has been verified!");

      // Navigate according to user role.
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Email verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // MANUAL RESEND OTP
  // ==========================================

  const handleResend = async () => {
    if (!email) {
      toast.error("Email address is missing.");
      return;
    }

    try {
      setResending(true);

      const response =
        await authService.resendVerification(email);

      setCode(["", "", "", "", "", ""]);

      inputRefs.current[0]?.focus();

      toast.success(
        response.message ||
        "A new verification code has been sent."
      );

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to resend verification code."
      );
    } finally {
      setResending(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="verification-page">
      <div className="verification-card">

        {/* BRAND */}
        <Link to="/" className="auth-brand">
          venuza<span>.</span>
        </Link>

        {/* VERIFICATION ICON */}
        <div className="verification-icon">
          <MailCheck size={36} />
        </div>

        <span className="section-eyebrow">
          EMAIL VERIFICATION
        </span>

        <h2>Verify your email</h2>

        <p className="verification-description">
          Enter the six-digit verification code sent to:
        </p>

        <strong className="verification-email">
          {email || "Email address unavailable"}
        </strong>

        {/* OTP FORM */}
        <form
          onSubmit={handleSubmit}
          className="verification-form"
        >

          <label>Enter verification code</label>

          <div
            className="otp-boxes"
            onPaste={handlePaste}
          >
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={
                  index === 0
                    ? "one-time-code"
                    : "off"
                }
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                className="otp-box"
                disabled={!email || loading}
                aria-label={`Verification digit ${index + 1}`}
              />
            ))}
          </div>

          {/* VERIFY BUTTON */}
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="auth-submit"
            disabled={
              !email ||
              code.join("").length !== 6 ||
              loading ||
              resending
            }
          >
            {loading ? "Verifying..." : "Verify Email"}
          </Button>

        </form>

        {/* RESEND OTP */}
        <div className="resend-section">

          <p>Didn't receive the code?</p>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending || !email || loading}
            className="resend-button"
          >
            {resending
              ? "Sending..."
              : "Resend verification code"}
          </button>

        </div>

        {/* SECURITY MESSAGE */}
        <div className="verification-security">
          <ShieldCheck size={17} />

          <span>
            Your account is protected with email verification.
          </span>
        </div>

        {/* BACK TO REGISTER */}
        <Link
          to="/register"
          className="auth-back-home"
        >
          ← Back to registration
        </Link>

      </div>
    </div>
  );
}

export default VerifyEmail;
