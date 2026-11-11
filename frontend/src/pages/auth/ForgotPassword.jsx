
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        // Backend email verification will be integrated later.
        console.log("Password reset requested for:", email);

        setMessage(
            "Your password reset request has been submitted. Email functionality will be connected soon."
        );

        setEmail("");
    };

    return (
        <div className="forgot-page">
            <div className="forgot-container">

                <div className="forgot-header">
                    <h1>GatherGrid</h1>
                    <h2>Forgot Password?</h2>
                    <p>
                        Don't worry! Enter your registered email address
                        and we'll help you reset your password.
                    </p>
                </div>

                <form className="forgot-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {error && (
                        <p className="forgot-error">{error}</p>
                    )}

                    {message && (
                        <p className="forgot-success">{message}</p>
                    )}

                    <button type="submit">
                        Send Reset Link
                    </button>
                </form>

                <div className="forgot-footer">
                    <Link to="/login">Back to Login</Link>
                </div>

                <div className="forgot-home">
                    <Link to="/">Back to Home</Link>
                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;
