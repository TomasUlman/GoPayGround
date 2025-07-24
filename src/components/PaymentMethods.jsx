import { CreditCardIcon } from "@heroicons/react/20/solid";

import { BNPL_TYPES, PAYMENT_METHODS, SWIFTS } from "../utils/constants";
import { handleSetField } from "../utils/helpers";
import ModalCard from "../ui/ModalCard";
import Select from "../ui/form-components/Select";
import MultiSelect from "../ui/form-components/MultiSelect";
import Checkbox from "../ui/form-components/Checkbox";
import Input from "../ui/form-components/Input";

import { useEffect } from "react";

/**
 * Allows the user to configure payment methods
 * such as default and allowed instruments, swifts,
 * BNPL settings, and card tokenization.
 *
 * Props:
 * - state: payment_data.payer object from reducer
 * - setField: dispatch wrapper to update payer fields
 * - cardToken: optional token to prefill allowed_card_token field
 */
function PaymentMethods({ state, setField, cardToken }) {
  // If cardToken is present (returned from API), apply it to state and set request card token checkbox to false
  useEffect(() => {
    if (cardToken) {
      setField("allowed_card_token", cardToken);
      setField("request_card_token", false);
    }
  }, [cardToken]);

  return (
    <ModalCard
      icon={<CreditCardIcon />}
      title="Payment methods"
      modalContent={
        <div className="flex flex-col gap-4">
          {/* Default payment instrument */}
          <div className="flex">
            <Select
              options={PAYMENT_METHODS}
              label="Default payment instrument"
              id="default_payment_instrument"
              name="default_payment_instrument"
              value={state.default_payment_instrument}
              onChange={(e) => handleSetField(e, setField)}
            />
          </div>

          {/* Allowed payment instruments (multi-select) */}
          <MultiSelect
            options={PAYMENT_METHODS.slice(1)} // Skip first empty option – not valid for allowed list, only used for default selection
            label="Allowed payment instruments"
            initialSelectedValues={state.allowed_payment_instruments}
            onChange={(values) =>
              setField("allowed_payment_instruments", values)
            }
          />

          {/* SWIFT configuration */}
          <div className="border-divider mt-2 flex border-t pt-4">
            <Select
              options={SWIFTS}
              label="Default swift"
              id="default_swift"
              name="default_swift"
              value={state.default_swift}
              onChange={(e) => handleSetField(e, setField)}
            />
          </div>
          <MultiSelect
            options={SWIFTS.slice(1)} // Skip first empty option – not valid for allowed list, only used for default selection
            label="Allowed swifts"
            initialSelectedValues={state.allowed_swifts}
            onChange={(values) => setField("allowed_swifts", values)}
          />

          {/* BNPL configuration */}
          <div className="border-divider mt-2 flex border-t pt-4">
            <Select
              options={BNPL_TYPES}
              label="Default BNPL type"
              name="default_bnpl_type"
              id="default_bnpl_type"
              value={state.default_bnpl_type}
              onChange={(e) => handleSetField(e, setField)}
            />
          </div>
          <MultiSelect
            options={BNPL_TYPES.slice(1)} //Skip first empty option – not valid for allowed list, only used for default selection
            label="Allowed BNPL types"
            initialSelectedValues={state.allowed_bnpl_types}
            onChange={(values) => setField("allowed_bnpl_types", values)}
          />

          {/* Card token settings */}
          <div className="border-divider mt-2 flex items-center border-t pt-4">
            <div className="flex w-full">
              <Input
                label="Allowed card token"
                id="allowed_card_token"
                name="allowed_card_token"
                value={state.allowed_card_token}
                onChange={(e) => handleSetField(e, setField)}
              />
            </div>
            <div className="flex w-full items-center justify-center">
              <Checkbox
                label="Request card token"
                id="request_card_token"
                name="request_card_token"
                checked={state.request_card_token}
                onChange={(e) => handleSetField(e, setField)}
              />
            </div>
          </div>
        </div>
      }
    >
      {/* Collapsed modal content */}
      <div className="flex items-end justify-center gap-3 sm:px-6">
        <Select
          options={PAYMENT_METHODS}
          label="Default payment instrument"
          id="default_payment_instrument"
          name="default_payment_instrument"
          value={state.default_payment_instrument}
          onChange={(e) => handleSetField(e, setField)}
        />

        <Select
          options={SWIFTS}
          label="Default swift"
          id="default_swift"
          name="default_swift"
          value={state.default_swift}
          onChange={(e) => handleSetField(e, setField)}
        />
      </div>
    </ModalCard>
  );
}

export default PaymentMethods;
