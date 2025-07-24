import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "motion/react";

/**
 * Reusable modal dialog component.
 *
 * Props:
 * - isOpen (boolean): whether the modal is shown
 * - onClose (function): called when modal should close (e.g. ESC or overlay click)
 * - title (string): modal title
 * - children (ReactNode): modal body content
 * - modalClassName (string): optional extra class names for modal container
 */
function Modal({ isOpen, onClose, title, children, modalClassName }) {
  // Adds ESC key support to close modal
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Dark overlay with blur and fade animation */}
          <motion.div
            className="absolute inset-0 z-40 bg-black/50 backdrop-blur-xs"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content container with enter/exit animation */}
          <motion.div
            className={`bg-secondary-dark relative z-50 flex max-h-[90vh] max-w-xl flex-col overflow-hidden rounded-xl shadow-xl sm:min-w-sm ${modalClassName}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1.05, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
          >
            {/* Header with title and close button */}
            <div className="border-b-divider flex items-center justify-between gap-4 border-b px-6 py-4">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="text-secondary hover:text-secondary/70 cursor-pointer"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable modal body content */}
            <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
