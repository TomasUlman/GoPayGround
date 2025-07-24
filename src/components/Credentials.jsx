import { KeyIcon } from "@heroicons/react/24/solid";
import { ImSpinner9 } from "react-icons/im";

import ModalCard from "../ui/ModalCard";
import Input from "../ui/form-components/Input";
import Checkbox from "../ui/form-components/Checkbox";
import Button from "../ui/Button";

import { apiCall, handleSetField } from "../utils/helpers";
import { useEffect, useState } from "react";

/**
 * Static messages for each credential source mode.
 */
const messages = {
  gopayground:
    "This account uses the sandbox GoID 8389910562. Credentials are already configured. You can create test payments right away.",
  techsupport:
    "This account uses the production GoID 8165258244. Credentials are already configured. You can create production payments right away.",
  custom: {
    default: "Please enter your custom credentials below",
    success: "✔ Credentials are valid",
    error: "❌ Wrong credentials",
  },
};

const messageColors = {
  default: "text-primary",
  success: "text-green-500",
  error: "text-red-600",
};

/**
 * Credentials modal component.
 * Allows users to choose a predefined or custom credential setup.
 * When using "custom", the user can enter client_id, secret, and goid.
 * Credentials can be validated against the backend.
 */
function Credentials({ state, setField }) {
  const [validateState, setValidateState] = useState("default");
  const [isLoading, setIsLoading] = useState(false);

  // Determine which message and color to show based on mode
  const message =
    state.source !== "custom"
      ? messages[state.source]
      : messages.custom[validateState];

  const messageColor =
    state.source !== "custom"
      ? messageColors.default
      : messageColors[validateState];

  // Reset validation state when custom credentials change
  useEffect(() => {
    if (state.source === "custom") {
      setValidateState("default");
    }
  }, [state.client_id, state.client_secret, state.goid]);

  /**
   * Sends current credentials to backend and updates validateState accordingly.
   */
  async function handleValidateCredentials() {
    try {
      setIsLoading(true);

      const payload = {
        credentials: state,
      };

      const data = await apiCall("/api/getAllPaymentInstruments.php", payload);
      if (data.error) throw data.error;

      setValidateState("success");
    } catch {
      setValidateState("error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalCard
      icon={<KeyIcon />}
      title="Credentials"
      modalContent={
        <div className="flex flex-col gap-4">
          {/* Button group for selecting credential source */}
          <div className="flex flex-wrap justify-center gap-3 px-2 sm:flex-nowrap">
            <Button
              className="w-34"
              variant={`${state.source === "gopayground" ? "filled" : "outline"}`}
              name="source"
              value="gopayground"
              onClick={(e) => handleSetField(e, setField)}
            >
              GoPayGround
            </Button>
            <Button
              className="w-34"
              variant={`${state.source === "techsupport" ? "filled" : "outline"}`}
              name="source"
              value="techsupport"
              onClick={(e) => handleSetField(e, setField)}
            >
              TechSupport
            </Button>
            <Button
              className="w-34"
              variant={`${state.source === "custom" ? "filled" : "outline"}`}
              name="source"
              value="custom"
              id="customCredentialsBtn"
              onClick={(e) => handleSetField(e, setField)}
            >
              Custom
            </Button>
          </div>

          {/* Contextual message */}
          <p
            className={`font-inter ${messageColor} mx-auto max-w-md text-center text-sm leading-relaxed font-bold`}
          >
            {message}
          </p>

          {/* Custom credentials input section */}
          {state.source === "custom" && (
            <>
              <div className="border-t-divider mx-auto grid grid-cols-2 gap-4 border-t px-2 pt-3 sm:max-w-sm">
                <Input
                  label="Client ID"
                  id="client_id"
                  name="client_id"
                  value={state.client_id}
                  onChange={(e) => handleSetField(e, setField)}
                />
                <Input
                  label="Client Secret"
                  id="client_secret"
                  name="client_secret"
                  value={state.client_secret}
                  onChange={(e) => handleSetField(e, setField)}
                />
                <Input
                  label="GoID"
                  id="goid"
                  name="goid"
                  value={state.goid}
                  onChange={(e) => handleSetField(e, setField)}
                />
                <div className="flex items-center justify-center">
                  <Checkbox
                    label="Test mode"
                    id="test_mode"
                    name="test_mode"
                    checked={state.test_mode}
                    onChange={(e) => handleSetField(e, setField)}
                  />
                </div>
                <div className="col-span-2 mt-2">
                  <Button
                    className="w-full"
                    onClick={handleValidateCredentials}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ImSpinner9 className="mx-auto h-5 w-5 animate-spin" />
                    ) : (
                      "Validate credentials"
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      }
    >
      {/* Default content shown when modal is collapsed */}
      <div className="flex flex-wrap justify-center gap-3 px-2 sm:flex-nowrap">
        <Button
          className="w-34"
          variant={`${state.source === "gopayground" ? "filled" : "outline"}`}
          name="source"
          value="gopayground"
          onClick={(e) => handleSetField(e, setField)}
        >
          GoPayGround
        </Button>
        <Button
          className="w-34"
          variant={`${state.source === "techsupport" ? "filled" : "outline"}`}
          name="source"
          value="techsupport"
          onClick={(e) => handleSetField(e, setField)}
        >
          TechSupport
        </Button>
        <Button
          className="w-34"
          variant={`${state.source === "custom" ? "filled" : "outline"}`}
          name="source"
          value="custom"
          id="customCredentialsBtn"
          onClick={(e) => handleSetField(e, setField)}
        >
          Custom
        </Button>
      </div>
    </ModalCard>
  );
}

export default Credentials;
