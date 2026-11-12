const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  as = "input",
  rows = 4,
}) => {
  const commonProps = {
    id: name,
    name,
    value,
    onChange,
    placeholder,
    required,
    className: `form-input ${error ? "input-error" : ""}`,
  };

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label} {required && <span>*</span>}
        </label>
      )}

      {as === "textarea" ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {error && <small className="field-error">{error}</small>}
    </div>
  );
};

export default InputField;