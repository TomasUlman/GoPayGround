import { useReducer } from "react";

// Components
import Credentials from "./components/Credentials";
import Contact from "./components/Contact";
import Header from "./components/Header";
import PaymentMethods from "./components/PaymentMethods";
import PaymentSettings from "./components/PaymentSettings";
import JSONViewer from "./components/JSONViewer";
import PaymentActions from "./components/PaymentActions";
import MovementsStatement from "./components/MovementsStatement";
import CardActions from "./components/CardActions";
import Footer from "./components/Footer";

// UI
import Loader from "./ui/Loader";

// State management
import { defaultState, reducer, initState } from "./state/appReducer";
import { useReducerActions } from "./state/useReducerActions";

/**
 * Main application component.
 * It acts as the root coordinator for all state, layout, and components.
 */
function App() {
  // Global state using useReducer
  const [state, dispatch] = useReducer(reducer, defaultState, initState);

  // Action creators extracted into a custom hook
  const actions = useReducerActions(dispatch);

  /**
   * Redirects the browser to the given URL and persists current state in sessionStorage.
   * This is used to send the user to the payment gateway.
   *
   * @param {string} gw_url - The gateway URL to redirect to
   */
  function handleRedirect(gw_url) {
    sessionStorage.setItem("state", JSON.stringify(state));
    window.location.href = gw_url;
  }

  return (
    <main className="flex h-screen flex-col gap-2 p-2 lg:gap-5 lg:p-6">
      {/* Loader shown during async operations */}
      {state.isLoading && <Loader />}

      {/* Top bar with logo, amount input and payment creation function */}
      <Header
        state={state}
        setAmount={actions.setAmount}
        handleRedirect={handleRedirect}
        setResponse={actions.setResponse}
        setError={actions.setError}
        toggleIsLoading={actions.toggleIsLoading}
      />

      {/* 3-column layout for desktop */}
      <div className="flex flex-col gap-2 lg:mt-3 lg:grid lg:h-100 lg:grid-cols-3">
        {/* Left column – contains payment actions, card interactions, movements statement and footer */}
        <div className="order-3 flex flex-col gap-2 lg:order-1 lg:col-span-1">
          <PaymentActions
            response={state.response}
            credentials={state.credentials}
            setError={actions.setError}
            setResponse={actions.setResponse}
            toggleIsLoading={actions.toggleIsLoading}
          />
          <CardActions
            credentials={state.credentials}
            toggleIsLoading={actions.toggleIsLoading}
            setError={actions.setError}
            setResponse={actions.setResponse}
            responseCardId={state.response?.payer?.card_id}
          />
          <MovementsStatement
            credentials={state.credentials}
            setError={actions.setError}
            setResponse={actions.setResponse}
          />
          <Footer />
        </div>

        {/* Center column – visualizes request/response/error JSON */}
        <div className="order-1 flex h-64 min-h-0 flex-col lg:order-2 lg:col-span-1 lg:h-full">
          <JSONViewer
            paymentJSON={state.payment_data}
            responseJSON={state.response}
            errorJSON={state.error}
            handleRedirect={handleRedirect}
            setError={actions.setError}
            updatePaymentData={actions.updatePaymentData}
          />
        </div>

        {/* Right column – input fields for payment setup */}
        <div className="order-2 flex flex-col gap-2 lg:order-3 lg:col-span-1">
          <Credentials
            state={state.credentials}
            setField={actions.setCredentialsField}
          />
          <PaymentMethods
            state={state.payment_data.payer}
            setField={actions.setPaymentMethods}
            cardToken={state.response?.card_token}
          />
          <PaymentSettings
            state={state.payment_data}
            setField={actions.setPaymentSettings}
            toggleRecurrence={actions.toggleRecurrence}
            setRecurrenceField={actions.setRecurrenceField}
          />
          <Contact
            state={state.payment_data.payer.contact}
            setField={actions.setContactField}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
