import { TableCellsIcon } from "@heroicons/react/24/outline";
import { ImSpinner9 } from "react-icons/im";
import { useState } from "react";

import { apiCall, downloadStatement } from "../utils/helpers";
import { CURRENCIES, FORMATS } from "../utils/constants";
import ModalCard from "../ui/ModalCard";
import Button from "../ui/Button";
import Select from "../ui/form-components/Select";
import Input from "../ui/form-components/Input";

/**
 * Returns today's date in YYYY-MM-DD format.
 */
const formatToday = () => {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
};

/**
 * UI for downloading an account statement based on selected parameters.
 *
 * Props:
 * - credentials: current API credentials
 * - setError: dispatch function to update global error state
 * - setResponse: dispatch function to update global response state
 */
function MovementsStatement({ credentials, setError, setResponse }) {
  const [currency, setCurrency] = useState("CZK");
  const [format, setFormat] = useState("PDF_A");
  const [dateFrom, setDateFrom] = useState(formatToday());
  const [dateTo, setDateTo] = useState(formatToday());
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Sends a request to the backend to download the account statement.
   * Handles loading, response and download logic.
   */
  async function handleDownloadStatement(onClose) {
    try {
      setError({});
      setResponse({});
      setIsLoading(true);

      const payload = {
        body: {
          date_from: dateFrom,
          date_to: dateTo,
          currency: currency,
          format: format,
        },
        credentials: credentials,
      };

      const data = await apiCall("/api/getAccountStatement.php", payload);
      if (data.error) throw data.error;

      downloadStatement(format, data); // Triggers file download
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
      onClose();
    }
  }

  return (
    <ModalCard
      icon={<TableCellsIcon />}
      title="Movements statement"
      // modalContent is a render function that receives `onClose`
      modalContent={({ onClose }) => (
        <div className="mx-auto grid grid-cols-2 gap-3 px-2">
          {/* Currency and format selectors */}
          <Select
            options={CURRENCIES}
            label="Currency"
            id="statement-currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
          <Select
            options={FORMATS}
            label="Format"
            id="statement-format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          />

          {/* Date pickers */}
          <Input
            type="date"
            label="Date from"
            id="statement-date-from"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <Input
            type="date"
            label="Date to"
            id="statement-date-to"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />

          {/* Download button */}
          <div className="col-span-2 mt-2 flex justify-center">
            <Button
              type="submit"
              onClick={() => handleDownloadStatement(onClose)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ImSpinner9 className="mx-auto h-5 w-5 animate-spin" />
              ) : (
                "Download statement"
              )}
            </Button>
          </div>
        </div>
      )}
    />
  );
}

export default MovementsStatement;
