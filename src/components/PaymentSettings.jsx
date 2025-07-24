import { Cog6ToothIcon } from "@heroicons/react/20/solid";

import ModalCard from "../ui/ModalCard";
import Checkbox from "../ui/form-components/Checkbox";
import Select from "../ui/form-components/Select";
import Input from "../ui/form-components/Input";

import { CURRENCIES, RECURRENCE_CYCLES, LANGS } from "../utils/constants";
import { handleSetField } from "../utils/helpers";

/**
 * Modal for configuring payment details such as currency, language,
 * order number, and optional preauthorization or recurring settings.
 *
 * Props:
 * - state: current payment_data object from reducer
 * - setField: dispatch wrapper for SET_PAYMENT_SETTINGS
 * - toggleRecurrence: enables/disables recurrence object in state
 * - setRecurrenceField: dispatch wrapper for SET_RECURRENCE_FIELD
 */
function PaymentSettings({
  state,
  setField,
  toggleRecurrence,
  setRecurrenceField,
}) {
  return (
    <ModalCard
      icon={<Cog6ToothIcon />}
      title="Payment settings"
      modalContent={
        <div className="flex flex-col items-center gap-4">
          {/* Currency and language selection */}
          <div className="flex gap-3">
            <Select
              options={CURRENCIES}
              label="Currency"
              id="currency"
              name="currency"
              value={state.currency}
              onChange={(e) => handleSetField(e, setField)}
            />
            <Select
              options={LANGS}
              label="Lang"
              id="lang"
              name="lang"
              value={state.lang}
              onChange={(e) => handleSetField(e, setField)}
            />
          </div>

          {/* Order number input */}
          <div className="w-46">
            <Input
              label="Order number"
              id="order_number"
              name="order_number"
              value={state.order_number}
              onChange={(e) => handleSetField(e, setField)}
            />
          </div>

          {/* Preauthorization and recurrence toggles */}
          <div className="border-divider flex w-full justify-center border-t py-1">
            <div className="mt-4 flex flex-col gap-4">
              <Checkbox
                label="Preauthorized payment"
                id="preauthorization"
                name="preauthorization"
                checked={state.preauthorization}
                onChange={(e) => handleSetField(e, setField)}
              />
              <Checkbox
                label="Recurrent payment"
                id="recurrence"
                name="recurrence"
                checked={state.recurrence}
                onChange={(e) => toggleRecurrence(e.target.checked)}
              />
            </div>
          </div>

          {/* Recurrence fields shown only if recurrence is enabled */}
          {state.recurrence && (
            <>
              <div className="border-divider w-full border-t"></div>
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold">Recurrence</h2>
                <div className="flex gap-4">
                  <Select
                    label="Cycle"
                    id="recurrence_cycle"
                    name="recurrence_cycle"
                    options={RECURRENCE_CYCLES}
                    value={state.recurrence.recurrence_cycle}
                    onChange={(e) => handleSetField(e, setRecurrenceField)}
                  />
                  <div className="w-16">
                    <Input
                      label="Period"
                      id="recurrence_period"
                      name="recurrence_period"
                      type="number"
                      value={state.recurrence.recurrence_period}
                      onChange={(e) => handleSetField(e, setRecurrenceField)}
                    />
                  </div>
                </div>
                <div>
                  <Input
                    label="Date to"
                    id="recurrence_date_to"
                    name="recurrence_date_to"
                    type="date"
                    value={state.recurrence.recurrence_date_to}
                    onChange={(e) => handleSetField(e, setRecurrenceField)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      }
    >
      {/* Default content shown in collapsed modal mode */}
      <div className="flex items-end justify-center gap-3 sm:px-6">
        <Select
          options={CURRENCIES}
          label="Currency"
          id="currency"
          name="currency"
          value={state.currency}
          onChange={(e) => handleSetField(e, setField)}
        />
        <Select
          options={LANGS}
          label="Lang"
          id="lang"
          name="lang"
          value={state.lang}
          onChange={(e) => handleSetField(e, setField)}
        />
        <div className="flex-1">
          <Input
            label="Order number"
            id="order_number"
            name="order_number"
            value={state.order_number}
            onChange={(e) => handleSetField(e, setField)}
          />
        </div>
      </div>
    </ModalCard>
  );
}

export default PaymentSettings;
