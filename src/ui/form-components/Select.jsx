import { ChevronDownIcon } from "@heroicons/react/24/solid";

/**
 * Reusable select (dropdown) input component.
 *
 * Props:
 * - options: array of strings or objects ({ value, label })
 * - label: optional label displayed above the select
 * - id: HTML id for input (used for label association)
 * - name: name attribute of the select input
 * - value: current selected value (controlled component)
 * - onChange: callback triggered when selection changes
 */
function Select({ options, label, id, name, value, onChange }) {
  return (
    <div className="flex flex-col">
      {/* Optional label */}
      {label && (
        <label
          htmlFor={id}
          className="text-secondary font-inter mb-1 ml-2 text-xs"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Select input with custom styles */}
        <select
          id={id}
          name={name}
          className="font-inter bg-secondary text-dark focus:ring-primary w-full appearance-none rounded-full border px-4 py-1 pr-10 text-xs font-semibold transition-all duration-300 focus:ring-2 focus:outline-none sm:text-sm"
          value={value}
          onChange={onChange}
        >
          {/* Render both string and object option types */}
          {options.map((option, index) =>
            typeof option === "string" ? (
              <option key={index} value={option}>
                {option}
              </option>
            ) : (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ),
          )}
        </select>

        {/* Dropdown icon (disabled pointer events to not interfere with input) */}
        <div className="text-dark pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export default Select;
