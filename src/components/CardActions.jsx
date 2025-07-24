import { CreditCardIcon } from "@heroicons/react/24/outline";

import { apiCall } from "../utils/helpers";
import ModalCard from "../ui/ModalCard";
import Button from "../ui/Button";
import Input from "../ui/form-components/Input";

import { useEffect, useState } from "react";

/**
 * Provides actions for interacting with a saved card via API.
 * Allows user to input card ID and:
 * - Fetch card details
 * - Delete the card
 *
 * Props:
 * - credentials: current API credentials (from reducer)
 * - toggleIsLoading: action to toggle global loading spinner
 * - setError: action to store error in reducer
 * - setResponse: action to store response in reducer
 * - responseCardId: card ID returned from a previous payment
 */
function CardActions({
  credentials,
  toggleIsLoading,
  setError,
  setResponse,
  responseCardId,
}) {
  const [cardId, setCardId] = useState(responseCardId || "");
  const [errorMessage, setErrorMessage] = useState("");

  // Keep local cardId in sync with latest response from API
  useEffect(() => {
    if (responseCardId) {
      setCardId(responseCardId);
    }
  }, [responseCardId]);

  /**
   * Sends a request to a specific API endpoint using the current card ID and credentials.
   * Closes the modal when finished.
   *
   * @param {string} endpoint - API endpoint path
   * @param {function} onClose - callback to close the modal
   */
  async function handleApiCall(endpoint, onClose) {
    if (!cardId) {
      setErrorMessage("Card ID required!");
      return;
    }

    try {
      setError({});
      setErrorMessage("");
      setResponse({});
      toggleIsLoading();

      const payload = {
        card_id: cardId,
        credentials,
      };

      const data = await apiCall(endpoint, payload);
      if (data.error) throw data.error;

      setResponse(data);
    } catch (err) {
      setError(err);
    } finally {
      toggleIsLoading();
      onClose(); // Close modal on completion
    }
  }

  return (
    <ModalCard
      icon={<CreditCardIcon />}
      title="Card actions"
      // modalContent is a render function that receives `onClose`
      modalContent={({ onClose }) => (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col">
            <Input
              type="number"
              label="Card ID"
              id="card_id"
              value={cardId}
              onChange={(e) => setCardId(e.target.value)}
            />
            {errorMessage && (
              <span className="font-inter ml-2 text-xs text-red-600">
                {errorMessage}
              </span>
            )}
          </div>

          {/* API buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => handleApiCall("/api/getCardDetails.php", onClose)}
            >
              Get card
            </Button>
            <Button
              onClick={() => handleApiCall("/api/deleteCard.php", onClose)}
            >
              Delete card
            </Button>
          </div>
        </div>
      )}
    />
  );
}

export default CardActions;
