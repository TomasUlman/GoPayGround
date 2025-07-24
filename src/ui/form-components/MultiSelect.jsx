import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

/**
 * Maximum number of options to show before enabling expand/collapse behavior
 */
const VISIBLE_COUNT = 8;

/**
 * MultiSelect input component with selectable tags and expand/collapse behavior.
 *
 * Props:
 * - options: array of strings or objects { value, label }
 * - label: optional label above the selector
 * - initialSelectedValues: array of selected values (strings)
 * - onChange: callback triggered on selection change
 */
function MultiSelect({ options = [], label, initialSelectedValues, onChange }) {
  /**
   * Controlled state holding selected values.
   * It’s initialized from props and updated via toggle/remove.
   */
  const [selectedValues, setSelectedValues] = useState(() =>
    Array.isArray(initialSelectedValues) ? [...initialSelectedValues] : [],
  );

  /**
   * Determines whether all options are shown or just the initial VISIBLE_COUNT.
   */
  const [expanded, setExpanded] = useState(false);

  /**
   * Normalize incoming options to always be in the format: { value, label }
   * Supports string[] as shorthand for { value, label }.
   */
  const preparedOptions = options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option,
  );

  /**
   * Subset of options that will be rendered based on `expanded` state.
   */
  const visibleOptions = expanded
    ? preparedOptions
    : preparedOptions.slice(0, VISIBLE_COUNT);

  /**
   * List of "extra" options hidden when collapsed, shown when expanded.
   */
  const hiddenOptions =
    preparedOptions.length > VISIBLE_COUNT
      ? preparedOptions.slice(VISIBLE_COUNT)
      : [];

  /**
   * Call the parent-provided onChange handler whenever selected values change.
   */
  useEffect(() => {
    onChange?.(selectedValues);
  }, [selectedValues]);

  /**
   * Toggles selection: adds value if not selected, removes if already selected.
   */
  function toggleValue(value) {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  /**
   * Removes a selected value explicitly (e.g. via "×" button).
   */
  function removeValue(value) {
    setSelectedValues((prev) => prev.filter((v) => v !== value));
  }

  return (
    <div className="w-full">
      {/* Optional label above the control */}
      {label && (
        <label className="text-secondary font-inter mb-1 ml-2 text-xs">
          {label}
        </label>
      )}

      {/* Display currently selected values as removable pills */}
      <div
        data-interactive
        className="border-secondary custom-scrollbar mb-2 flex max-h-25 min-h-[48px] flex-wrap gap-2 overflow-y-auto rounded border p-2"
      >
        {selectedValues.map((value) => {
          // Find matching label for this selected value
          const displayLabel =
            preparedOptions.find((opt) => opt.value === value)?.label || value;

          return (
            <div
              key={value}
              className="bg-primary text-dark font-inter flex items-center gap-2 rounded-full px-3 text-xs font-semibold"
            >
              {displayLabel}
              <button
                onClick={() => removeValue(value)}
                className="text-dark mb-0.5 cursor-pointer text-xl hover:text-red-600"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      {/* Render toggle buttons for each visible option */}
      <div className="flex flex-wrap gap-2">
        {visibleOptions.map(({ value, label }) => {
          const isSelected = selectedValues.includes(value);
          return (
            <button
              key={value}
              onClick={() => toggleValue(value)}
              className={`font-inter cursor-pointer rounded-full px-2 text-xs transition-all ${
                isSelected ? "bg-primary text-dark" : "bg-secondary text-dark"
              }`}
            >
              {label}
            </button>
          );
        })}

        {/* Show expand/collapse control only if there are hidden options */}
        {hiddenOptions.length > 0 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-secondary font-inter flex cursor-pointer items-center gap-1 rounded-full px-1 text-xs transition-all"
          >
            {expanded ? (
              <>
                Show less <ChevronUpIcon className="h-4 w-4" />
              </>
            ) : (
              <>
                Show more <ChevronDownIcon className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default MultiSelect;
