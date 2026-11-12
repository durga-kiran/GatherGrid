
import React from "react";
import { AlertCircle } from "lucide-react";
import "./ErrorMessage.css";

function ErrorMessage({ message, className = "" }) {
    if (!message) return null;

    return (
        <div className={`error-message ${className}`} role="alert">
            <AlertCircle size={16} />
            <span>{message}</span>
        </div>
    );
}

export default ErrorMessage;
