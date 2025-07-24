import { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
import {
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

import JSONEditor from "../ui/JSONEditor";

/**
 * Custom theme for JSONPretty output styling
 */
const myTheme = {
  main: "background: var(--color-dark); padding: 1rem; font-family: var(--font-inter)",
  key: "color: var(--color-primary); font-weight: bold;",
  string: "color: var(--color-secondary);",
  number: "color: var(--color-secondary);",
  boolean: "color: var(--color-secondary);",
  null: "color: var(--color-secondary);",
  punctuation: "color: var(--color-secondary);",
};

/**
 * Theme variant for rendering errors
 */
const warningTheme = {
  ...myTheme,
  key: "color: var(--color-warning); font-weight: bold;",
};

/**
 * Displays interactive JSON viewer for:
 * - current payment request (input)
 * - API response (output)
 * - error payload (if present)
 *
 * Allows user to edit the JSON via a modal and redirect if gw_url is returned.
 *
 * Props:
 * - paymentJSON: request payload
 * - responseJSON: response from gateway
 * - errorJSON: error object (if any)
 * - handleRedirect: function to redirect to response.gw_url
 * - setError: action to update error state
 * - updatePaymentData: action to replace paymentJSON
 */
function JSONViewer({
  paymentJSON,
  responseJSON,
  errorJSON,
  handleRedirect,
  setError,
  updatePaymentData,
}) {
  const [activeTab, setActiveTab] = useState("payment_JSON");
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const hasResponse = Object.keys(responseJSON).length > 0;
  const hasError = Object.keys(errorJSON).length > 0;

  // Automatically set the active tab based on available data
  useEffect(() => {
    if (Object.keys(errorJSON).length > 0) {
      setActiveTab("error_JSON");
    } else if (Object.keys(responseJSON).length > 0) {
      setActiveTab("response_JSON");
    } else {
      setActiveTab("payment_JSON");
    }
  }, [errorJSON, responseJSON]);

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-xl">
      {/* Tab bar */}
      <div className="bg-secondary-dark flex justify-between rounded-t-xl">
        <div className="flex">
          {/* Always show Payment JSON tab */}
          <button
            onClick={() => setActiveTab("payment_JSON")}
            disabled={!hasResponse && !hasError}
            className={`${
              activeTab === "payment_JSON" ? "bg-dark border-t border-l" : ""
            } font-inter border-divider cursor-pointer rounded-tl-xl border-r px-3 py-2 text-sm transition-colors duration-300 disabled:cursor-default disabled:opacity-50`}
          >
            Payment JSON
          </button>

          {/* Conditionally show response tab */}
          {hasResponse && (
            <button
              onClick={() => setActiveTab("response_JSON")}
              className={`${
                activeTab === "response_JSON" ? "bg-dark border-t" : ""
              } font-inter border-divider cursor-pointer border-r px-3 py-2 text-sm transition-colors duration-300`}
            >
              API Response
            </button>
          )}

          {/* Conditionally show error tab with icon */}
          {hasError && (
            <button
              onClick={() => setActiveTab("error_JSON")}
              className={`${
                activeTab === "error_JSON" ? "bg-dark border-t" : ""
              } font-inter border-divider flex cursor-pointer gap-1 border-r px-3 py-2 text-sm transition-colors duration-300`}
            >
              <ExclamationTriangleIcon className="text-warning h-5 w-5" />
              <span>Error</span>
            </button>
          )}
        </div>

        {/* Action icons in tab bar */}
        <div className="mr-3 flex items-center">
          {/* Redirect icon if gw_url is available */}
          {activeTab === "response_JSON" && responseJSON.gw_url && (
            <div className="group relative inline-block">
              <PaperAirplaneIcon
                className="text-secondary/40 hover:text-secondary h-4 cursor-pointer"
                onClick={() => handleRedirect(responseJSON.gw_url)}
              />
              <div className="font-inter absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                Redirect to gw_url
              </div>
            </div>
          )}

          {/* Edit JSON icon (only on payment tab) */}
          {activeTab === "payment_JSON" && (
            <div className="group relative inline-block">
              <PencilSquareIcon
                className="text-secondary/40 hover:text-secondary h-4 cursor-pointer"
                onClick={() => setIsEditorOpen(true)}
              />
              <div className="font-inter absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                Edit JSON
              </div>
            </div>
          )}

          {/* JSON editor modal */}
          <JSONEditor
            isOpen={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
            data={paymentJSON}
            setError={setError}
            onSave={updatePaymentData}
          />
        </div>
      </div>

      {/* JSON display content */}
      <div className="border-divider custom-scrollbar flex-1 overflow-auto rounded-b-xl border-x border-b text-xs">
        {activeTab === "payment_JSON" && (
          <JSONPretty data={paymentJSON} theme={myTheme} />
        )}
        {activeTab === "response_JSON" && (
          <JSONPretty data={responseJSON} theme={myTheme} />
        )}
        {activeTab === "error_JSON" && (
          <JSONPretty data={errorJSON} theme={warningTheme} />
        )}
      </div>
    </div>
  );
}

export default JSONViewer;
