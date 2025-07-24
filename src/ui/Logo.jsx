/**
 * Brand logo component.
 * Displays the static "GoPayGround" text with color highlighting.
 * Not interactive – purely visual/semantic.
 */
function Logo() {
  return (
    <div className="mb-4 cursor-default text-xl tracking-widest sm:mb-0 sm:text-2xl">
      {/* Primary-colored part of the logo */}
      <span className="text-primary">GoPay</span>
      {/* Secondary-colored part of the logo */}
      <span className="text-secondary">Ground</span>
    </div>
  );
}

export default Logo;
