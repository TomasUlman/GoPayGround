/**
 * Reusable button component with support for multiple visual variants.
 *
 * Props:
 * - children: content inside the button (text, icon, etc.)
 * - type: button type (default: "button")
 * - variant: visual style preset ('base', 'primary', 'outline', 'filled')
 * - onClick: click handler
 * - className: optional style overrides
 * - ...rest: any other props passed to <button>
 */
function Button({
  children,
  type = "button",
  variant = "base",
  onClick,
  className = "",
  ...rest
}) {
  /**
   * Shared base styles applied to all buttons regardless of variant.
   * Handles basic shape, typography, cursor, and focus behavior.
   */
  const baseStyle =
    "cursor-pointer rounded-full font-semibold inline-block transition-colors duration-300 focus:outline-none focus:ring focus:ring-offset-0";

  /**
   * Style presets based on variant prop.
   */
  const variants = {
    base: "bg-primary text-dark hover:bg-primary-darker focus:ring-primary-darker px-2 py-1 text-sm",
    primary:
      "bg-primary text-dark hover:bg-primary-darker focus:ring-primary-darker px-4 py-2",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-dark px-2 py-1 text-sm",
    filled:
      "border-2 border-transparent bg-primary text-dark px-2 py-1 text-sm",
  };

  /**
   * Combine base styles with the selected variant and any user overrides.
   */
  const finalClass = `${baseStyle} ${variants[variant]} ${className}`;

  return (
    <button type={type} onClick={onClick} className={finalClass} {...rest}>
      {children}
    </button>
  );
}

export default Button;
