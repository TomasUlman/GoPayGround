import { useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

import Modal from "../ui/Modal";

/**
 * Clickable card that opens a modal with more detailed content.
 *
 * Props:
 * - icon (ReactNode): icon element rendered in the top-left corner
 * - title (string): title shown both on the card and inside the modal
 * - children (ReactNode): compact preview content shown in the card
 * - modalContent (ReactNode | function): full content rendered inside the modal.
 *    If a function, it's called with { onClose } to allow modal control.
 */
function ModalCard({ icon, title, children, modalContent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Handles opening the modal unless the user clicked an interactive element inside the card.
   * Prevents unintended modal triggers from interacting with inputs/buttons.
   */
  function handleOpenModal(e) {
    const tag = e.target.tagName;

    // Native interactive HTML tags
    const isNativeInteractiveTag = [
      "INPUT",
      "TEXTAREA",
      "SELECT",
      "BUTTON",
      "LABEL",
    ].includes(tag);

    // Custom interactive area (marked with [data-interactive])
    const isCustomInteractive = e.target.closest("[data-interactive]");

    // Exception for button that *should* open modal even if it's interactive
    const isCustomCredentialsBtn = e.target.id === "customCredentialsBtn";

    if (
      (isNativeInteractiveTag || isCustomInteractive) &&
      !isCustomCredentialsBtn
    )
      return;

    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      {/* Card surface that acts as modal trigger */}
      <div
        className="bg-secondary-dark hover:bg-secondary/10 relative flex flex-col rounded-xl px-2 py-2 transition duration-200 ease-in-out will-change-transform hover:scale-[1.01] sm:px-3 sm:py-4"
        onClick={handleOpenModal}
      >
        {/* Top-right icon suggesting external/open behavior */}
        <ArrowTopRightOnSquareIcon className="text-muted absolute top-4 right-4 h-4 w-4 cursor-pointer" />

        {/* Card header: icon + title */}
        <div className={`flex items-center gap-3 ${children && "mb-4"}`}>
          <div className="text-secondary/30 h-8 w-8">{icon}</div>
          <h2 className="cursor-default font-semibold">{title}</h2>
        </div>

        {/* Compact summary or preview content */}
        {children}
      </div>

      {/* Modal with expanded content */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
        {typeof modalContent === "function"
          ? modalContent({ onClose: handleCloseModal })
          : modalContent}
      </Modal>
    </>
  );
}

export default ModalCard;
