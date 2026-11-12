
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "customer"
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        console.log("Registration Data:", formData);

        alert("Registration form submitted successfully! Backend integration will be added later.");

        setFormData({
            fullName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            role: "customer"
        });

        navigate("/login");
    };

    return (
        <div className="register-page">

            <div className="register-container">

                {/* Register Header */}
                <div className="register-header">
                    <h1>GatherGrid</h1>
                    <h2>Create Your Account</h2>
                    <p>Join GatherGrid and explore amazing events.</p>
                </div>

                {/* Registration Form */}
                <form className="register-form" onSubmit={handleSubmit}>

                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Mobile Number</label>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your mobile number"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength="6"
                        required
                    />

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    {/* User Role */}
                    <label>Select Account Type</label>

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="customer">Customer</option>
                        <option value="organizer">Event Organizer</option>
                    </select>

                    {error && (
                        <p className="register-error">{error}</p>
                    )}

                    <button type="submit">
                        Create Account
                    </button>

                </form>

                {/* Login Link */}
                <div className="register-footer">
                    <p>
                        Already have an account?
                        <Link to="/login"> Login</Link>
                    </p>
                </div>

                <div className="register-home">
                    <Link to="/">
                        ← Back to Home
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Register;
