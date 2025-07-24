import { useEffect, useState } from "react";
import { BoltIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import {
  PAYMENT_STATES_COLORS,
  PAYMENT_ACTIONS,
  CURRENCIES,
} from "../utils/constants";
import { apiCall } from "../utils/helpers";
import Button from "../ui/Button";
import Input from "../ui/form-components/Input";
import Select from "../ui/form-components/Select";

/**
 * Component for testing and performing API operations
 * on a specific payment: refund, recurrence, etc.
 *
 * Props:
 * - response: latest payment API response (used to prefill values)
 * - credentials: API credentials from reducer
 * - setResponse: dispatch to store new API response
 * - setError: dispatch to store API error
 * - toggleIsLoading: toggles global loading spinner
 */
function PaymentActions({
  response,
  credentials,
  setResponse,
  setError,
  toggleIsLoading,
}) {
  const [paymentId, setPaymentId] = useState("");
  const [paymentState, setPaymentState] = useState("");
  const [action, setAction] = useState("REFUND");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("CZK");
  const [errorMessage, setErrorMessage] = useState("");

  // Autofill local fields when a response is received
  useEffect(() => {
    if (response.state) setPaymentState(response.state);
    if (response.id) setPaymentId(response.id);
    if (response.amount) setAmount(response.amount);
    if (response.currency) setCurrency(response.currency);
  }, [response]);

  // Read ?id=... from URL and fetch status if present
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const idFromUrl = searchParams.get("id");

    async function getStatusData() {
      await getStatus(idFromUrl);
    }

    if (idFromUrl) {
      getStatusData();

      // Remove "id" param from URL after loading
      const url = new URL(window.location);
      url.searchParams.delete("id");
      window.history.replaceState({}, "", url);
    }
  }, []);

  /**
   * Calls the getStatus endpoint for a given payment ID.
   */
  async function getStatus(paymentId) {
    try {
      toggleIsLoading();
      setError({});
      setResponse({});

      const payload = {
        credentials,
        payment_id: paymentId,
      };

      const data = await apiCall("/api/getStatus.php", payload);
      if (data.error) throw data.error;

      setResponse(data);
      return data.state;
    } catch (err) {
      setError(err);
    } finally {
      toggleIsLoading();
    }
  }

  /**
   * Performs an action (refund, recurrence, etc.) and immediately checks the status.
   */
  async function executeActionAndGetStatus(payload, endpoint) {
    try {
      toggleIsLoading();
      setError({});
      setResponse({});

      const refundData = await apiCall(endpoint, payload);
      if (refundData.error) throw refundData.error;

      const statusData = await apiCall("/api/getStatus.php", payload);
      if (statusData.error) throw statusData.error;

      setResponse(refundData);
      setPaymentState(statusData.state);
    } catch (err) {
      setError(err);
    } finally {
      toggleIsLoading();
    }
  }

  /**
   * Handles submission of the "Get status" form.
   */
  async function handleSubmitStatusForm(e, id = paymentId) {
    e.preventDefault();
    const state = await getStatus(id);
    setPaymentState(state);
  }

  /**
   * Handles submission of action form (refund, recurrence, etc.)
   */
  async function handleSubmitActionsForm(e) {
    e.preventDefault();

    if (!paymentId) {
      setErrorMessage("Payment ID required!");
      return;
    }

    switch (action) {
      case "REFUND": {
        await executeActionAndGetStatus(
          {
            credentials,
            payment_id: paymentId,
            amount,
          },
          "/api/refundPayment.php",
        );
        break;
      }

      case "CREATE RECURRENCE": {
        await executeActionAndGetStatus(
          {
            credentials,
            payment_id: paymentId,
            payment_data: {
              amount,
              currency,
              order_number: "123",
              order_description: "Test recurrence",
            },
          },
          "/api/createRecurrence.php",
        );
        break;
      }

      case "CANCEL RECURRENCE": {
        await executeActionAndGetStatus(
          {
            credentials,
            payment_id: paymentId,
          },
          "/api/voidRecurrence.php",
        );
        break;
      }

      case "CAPTURE AUTHORIZATION": {
        await executeActionAndGetStatus(
          {
            credentials,
            payment_id: paymentId,
          },
          "/api/captureAuthorization.php",
        );
        break;
      }

      case "CANCEL AUTHORIZATION": {
        await executeActionAndGetStatus(
          {
            credentials,
            payment_id: paymentId,
          },
          "/api/voidAuthorization.php",
        );
        break;
      }

      case "CAPTURE AUTH PARTIAL": {
        await executeActionAndGetStatus(
          {
            credentials,
            payment_id: paymentId,
            payment_data: {
              amount,
            },
          },
          "/api/captureAuthorizationPartial.php",
        );
        break;
      }

      default:
        alert("Unknown action selected.");
        break;
    }
  }

  return (
    <div className="bg-secondary-dark relative flex flex-col gap-4 rounded-xl px-2 py-2 sm:px-3 sm:py-4">
      <div className="flex items-center gap-3">
        <BoltIcon className="text-secondary/30 h-8 w-8" />
        <h2 className="cursor-default font-semibold sm:text-xl">
          Payment actions
        </h2>
      </div>
      <div className="ml-3 flex flex-col items-start gap-2">
        {/* Status form */}
        <form
          className="flex items-end gap-2"
          onSubmit={handleSubmitStatusForm}
        >
          <div className="relative w-1/2">
            <Input
              type="number"
              placeholder="ID:"
              label="Payment ID"
              id="payment-id"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              required={true}
            />
            {errorMessage && (
              <span className="font-inter absolute left-2 text-xs text-red-600">
                {errorMessage}
              </span>
            )}
          </div>
          <Button type="submit">Get status</Button>
        </form>

        {/* Status display */}
        <div className="font-inter mt-3 ml-2 flex items-center gap-2 text-sm">
          <span className="flex gap-1">
            <InformationCircleIcon className="text-secondary/30 h-5" />
            Status:
          </span>
          <span className={`${PAYMENT_STATES_COLORS[paymentState] || ""}`}>
            {paymentState || "N/A"}
          </span>
        </div>

        {/* Divider and action form */}
        <div className="border-divider my-2 -ml-2 w-full border-t"></div>
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={handleSubmitActionsForm}
        >
          {/* Action selector */}
          <Select
            options={PAYMENT_ACTIONS}
            label="Action"
            id="action"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          />

          {/* Conditional fields: amount and currency */}
          {/* TODO: add JSON edit for payment data via JSONEditor.jsx for create recurrence */}
          <div className="flex w-full items-end gap-2">
            {action !== "CANCEL RECURRENCE" &&
              action !== "CANCEL AUTHORIZATION" &&
              action !== "CAPTURE AUTHORIZATION" && (
                <div className="w-1/3">
                  <Input
                    id="action-amount"
                    label="Amount"
                    type="number"
                    required={true}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              )}

            {action === "CREATE RECURRENCE" && (
              <div>
                <Select
                  label="Currency"
                  id="recurrence-currency"
                  required={true}
                  value={currency}
                  options={CURRENCIES}
                  onChange={(e) => setCurrency(e.target.value)}
                />
              </div>
            )}
            <Button type="submit">Execute</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentActions;
