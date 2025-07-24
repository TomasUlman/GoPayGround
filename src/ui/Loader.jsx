/**
 * Fullscreen loading overlay with centered spinner.
 * Typically used to indicate async operation in progress.
 */
function Loader() {
  return (
    <div className="bg-secondary/10 absolute inset-0 z-100 flex items-center justify-center rounded-xl backdrop-blur-xs">
      {/* Spinner element styled via global CSS */}
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
