
import React from "react";
import "./Button.css";

function Button({
    children,
    type = "button",
    variant = "primary",
    size = "medium",
    disabled = false,
    loading = false,
    onClick,
    className = ""
}) {
    return (
        <button
            type={type}
            className={`custom-btn ${variant} ${size} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? "Please wait..." : children}
        </button>
    );
}

export default Button;
