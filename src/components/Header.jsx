import Button from "../ui/Button";
import Input from "../ui/form-components/Input";
import Logo from "../ui/Logo";
import { apiCall } from "../utils/helpers";

/**
 * Header component that contains:
 * - App logo
 * - Input for setting payment amount
 * - Button to initiate payment
 *
 * On submit, it sends a request to the backend and redirects to the gateway.
 */
function Header({
  state,
  setAmount,
  handleRedirect,
  setResponse,
  setError,
  toggleIsLoading,
}) {
  /**
   * Handles form submit.
   * Prevents default browser reload and triggers createPayment().
   */
  function handleSubmit(e) {
    e.preventDefault();
    createPayment();
  }

  /**
   * Sends payment data and credentials to backend.
   * Receives the payment gateway URL and redirects the user.
   * Handles API errors and loading state.
   */
  async function createPayment() {
    try {
      toggleIsLoading();
      setError({});
      setResponse({});

      // Compose payload from current reducer state
      const payload = {
        payment_data: state.payment_data,
        credentials: state.credentials,
      };

      const data = await apiCall("/api/createPayment.php", payload);
      if (data.error) throw data.error;

      setResponse(data);
      handleRedirect(data.gw_url);
    } catch (err) {
      setError(err);
    } finally {
      toggleIsLoading();
    }
  }

  return (
    <header className="bg-secondary-dark flex flex-col items-center justify-between rounded-xl px-2 py-4 sm:flex-row sm:px-10 lg:py-6">
      <Logo />
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <div className="w-42">
          <Input
            type="number"
            value={state.payment_data.amount}
            onChange={(e) => setAmount(e.target.value)}
            required={true}
            className="px-4 py-2"
          />
        </div>
        <Button variant="primary" type="submit">
          Pay
        </Button>
      </form>
      <div className="sm:w-42"></div>
    </header>
  );
}

export default Header;
