/**
 * Reusable input component with optional label.
 *
 * Props:
 * - type: input type (default: "text")
 * - id: unique input identifier
 * - label: optional text label displayed above input
 * - value: controlled input value
 * - onChange: callback function for change events
 * - className: optional custom styles to extend base input
 * - ...rest: any additional input props (e.g. placeholder, required)
 */
function Input({
  type = "text",
  id,
  label,
  value,
  onChange,
  className = "",
  ...rest
}) {
  // Base Tailwind style for input appearance
  const baseStyle =
    "w-full px-4 py-1 text-sm rounded-full font-inter border border-secondary-dark bg-secondary font-semibold text-secondary-dark transition-all duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:outline-none";

  return (
    <div className="flex flex-col">
      {/* Render label if provided */}
      {label && (
        <label
          htmlFor={id}
          className="text-secondary font-inter mb-1 ml-2 text-xs"
        >
          {label}
        </label>
      )}

      {/* Main input field */}
      <input
        type={type}
        className={`${baseStyle} ${className}`}
        value={value}
        onChange={onChange}
        id={id}
        {...rest}
      />
    </div>
  );
}

export default Input;
