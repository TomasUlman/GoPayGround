/**
 * Reusable checkbox input component.
 *
 * Props:
 * - label: optional label displayed next to the checkbox
 * - id: input element ID (also used for label association)
 * - name: input name attribute
 * - checked: boolean value for controlled checkbox
 * - onChange: callback triggered when checkbox is toggled
 */
function Checkbox({ label, id, name, checked, onChange }) {
  return (
    <div className="flex gap-2">
      {/* Checkbox input */}
      <input
        type="checkbox"
        className="accent-primary focus:ring-primary h-4 w-4 focus:ring focus:outline-none"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      ></input>

      {/* Optional label displayed next to the checkbox */}
      {label && (
        <label
          htmlFor={id}
          className="text-secondary font-inter text-xs font-medium"
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default Checkbox;
