
import React from "react";
import "./InputField.css";

function InputField({
    label,
    name,
    type = "text",
    placeholder = "",
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    icon,
    ...rest
}) {
    return (
        <div className="input-field-container">

            {label && (
                <label htmlFor={name}>
                    {label}
                    {required && <span className="required-star"> *</span>}
                </label>
            )}

            <div className="input-wrapper">
                {icon && (
                    <span className="input-icon">
                        {icon}
                    </span>
                )}

                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={error ? "input-error" : ""}
                    aria-invalid={Boolean(error)}
                    {...rest}
                />
            </div>

            {error && (
                <span className="input-error-message">
                    {error}
                </span>
            )}

        </div>
    );
}

export default InputField;
