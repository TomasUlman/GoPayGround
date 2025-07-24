import { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./Button";

/**
 * A modal component for editing a JSON object in raw text form.
 *
 * Props:
 * - isOpen: controls whether the modal is visible
 * - onClose: function to close the modal
 * - data: original JSON object to edit
 * - setError: function to report JSON parsing errors
 * - updatePaymentData: dispatch or state update with parsed JSON
 */
function JSONEditor({ isOpen, onClose, data, setError, onSave }) {
  const [text, setText] = useState("");

  // Load initial JSON into textarea whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setText(JSON.stringify(data, null, 2));
    }
  }, [isOpen, data]);

  /**
   * Attempts to parse the input and send it back to parent state.
   * If parsing fails, shows an error message.
   */
  function handleSave() {
    try {
      setError({});
      const parsedJson = JSON.parse(text);
      onSave(parsedJson); // Trigger onSave with parsed result, e.g. dispatch
    } catch {
      setError({ message: "invalid JSON" });
    } finally {
      onClose();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit JSON"
      modalClassName="w-full max-w-screen-2xl"
    >
      <div className="max-h-[65vh] overflow-auto sm:max-h-[75vh]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          className="border-divider bg-dark h-full min-h-[450px] w-full resize-none rounded-lg border p-4 font-mono text-sm text-white focus:outline-none"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="button" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
}

export default JSONEditor;
