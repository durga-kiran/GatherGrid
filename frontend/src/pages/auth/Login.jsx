
import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import InputField from "../../components/InputField";
import ErrorMessage from "../../components/ErrorMessage";
function Login() {
    // const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
        setError("Please enter your email and password.");
        return;
    }

    setError("");

    console.log("Login Data:", formData);

    alert("Login form submitted. Backend authentication will be connected later.");

    setFormData({
        email: "",
        password: ""
    });
};

    return (
        <div className="login-page">
            <div className="login-container">
                <ErrorMessage message={error} />
                {/* Login Header */}
                <div className="login-header">
                    <h1>GatherGrid</h1>
                    <h2>Welcome Back!</h2>
                    <p>Login to explore and book amazing events.</p>
                </div>

                {/* Login Form */}
                <form className="login-form" onSubmit={handleSubmit}>

                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <div className="forgot-password">
                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit">
                        Login
                    </button>

                </form>

                {/* Register Link */}
                <div className="login-footer">
                    <p>
                        Don't have an account?
                        <Link to="/register"> Register</Link>
                    </p>
                </div>

                <div className="back-home">
                    <Link to="/">
                        ← Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Login;
