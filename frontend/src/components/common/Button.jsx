const Button = ({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;