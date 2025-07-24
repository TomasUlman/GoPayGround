import { UserIcon } from "@heroicons/react/20/solid";

import ModalCard from "../ui/ModalCard";
import Input from "../ui/form-components/Input";
import { handleSetField } from "../utils/helpers";

/**
 * Displays a form for editing payer contact information.
 *
 * Props:
 * - state: payer.contact object from reducer (first name, email, address, etc.)
 * - setField: dispatch wrapper for updating contact fields
 */
function Contact({ state, setField }) {
  return (
    <ModalCard
      icon={<UserIcon />}
      title="Contact"
      modalContent={
        <div className="mx-auto grid grid-cols-2 gap-3 px-2 sm:max-w-md">
          {/* Name fields */}
          <Input
            label="First name"
            id="first_name"
            name="first_name"
            value={state.first_name}
            onChange={(e) => handleSetField(e, setField)}
          />
          <Input
            label="Last name"
            id="last_name"
            name="last_name"
            value={state.last_name}
            onChange={(e) => handleSetField(e, setField)}
          />

          <div className="border-divider col-span-2 -mx-6 my-1 border-t"></div>

          {/* Email and phone */}
          <Input
            label="E-mail"
            id="email"
            name="email"
            type="email"
            value={state.email}
            onChange={(e) => handleSetField(e, setField)}
          />
          <Input
            label="Phone"
            id="phone_number"
            name="phone_number"
            type="phone"
            value={state.phone_number}
            onChange={(e) => handleSetField(e, setField)}
          />

          <div className="border-divider col-span-2 -mx-6 my-1 border-t"></div>

          {/* City and street */}
          <Input
            label="City"
            id="city"
            name="city"
            value={state.city}
            onChange={(e) => handleSetField(e, setField)}
          />
          <Input
            label="Street and number"
            id="street"
            name="street"
            value={state.street}
            onChange={(e) => handleSetField(e, setField)}
          />

          <div className="border-divider col-span-2 -mx-6 my-1 border-t"></div>

          {/* Postal code and country */}
          <Input
            label="Postal code"
            id="postal_code"
            name="postal_code"
            value={state.postal_code}
            onChange={(e) => handleSetField(e, setField)}
          />
          <Input
            label="Country code"
            id="country_code"
            name="country_code"
            value={state.country_code}
            onChange={(e) => handleSetField(e, setField)}
          />
        </div>
      }
    >
      {/* Minimal content when modal is collapsed */}
      <div className="flex items-end justify-center gap-3 sm:px-6">
        <Input
          label="First name"
          id="first_name"
          name="first_name"
          value={state.first_name}
          onChange={(e) => handleSetField(e, setField)}
        />
        <Input
          label="Last name"
          id="last_name"
          name="last_name"
          value={state.last_name}
          onChange={(e) => handleSetField(e, setField)}
        />
      </div>
    </ModalCard>
  );
}

export default Contact;
