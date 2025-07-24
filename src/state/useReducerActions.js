/**
 * Wrapper function that returns all available action dispatchers
 * for use with the application reducer.
 * 
 * This helps keep the logic in components cleaner by abstracting dispatch details.
 * Each method here corresponds to an action type handled in the reducer.
 * 
 * @param {function} dispatch - React's dispatch function from useReducer
 * @returns {object} action creators
 */
export function useReducerActions(dispatch) {
    return {
        /**
         * Replaces the entire payment_data object
         */
        updatePaymentData: (json) =>
            dispatch({ type: "UPDATE_PAYMENT_DATA", payload: json }),

        /**
         * Sets a single field value in payer.contact
         */
        setContactField: (field, value) =>
            dispatch({ type: "SET_CONTACT_FIELD", field, payload: value }),

        /**
         * Sets the top-level amount value in payment_data
         */
        setAmount: (value) =>
            dispatch({ type: "SET_AMOUNT", payload: value }),

        /**
         * Sets a field (e.g. default_payment_instrument) in payment_data.payer
         */
        setPaymentMethods: (field, value) =>
            dispatch({ type: "SET_PAYMENT_METHODS", field, payload: value }),

        /**
         * Sets a top-level field in payment_data (e.g. currency, order_description)
         */
        setPaymentSettings: (field, value) =>
            dispatch({ type: "SET_PAYMENT_SETTINGS", field, payload: value }),

        /**
         * Toggles the presence of the recurrence object in payment_data
         */
        toggleRecurrence: (enabled) =>
            dispatch({ type: "TOGGLE_RECURRENCE", payload: enabled }),

        /**
         * Sets a single field in the recurrence object
         */
        setRecurrenceField: (field, value) =>
            dispatch({ type: "SET_RECURRENCE_FIELD", field, payload: value }),

        /**
         * Sets a field in the credentials object (e.g. source, client_id, goid, etc.)
         */
        setCredentialsField: (field, value) =>
            dispatch({ type: "SET_CREDENTIALS_FIELD", field, payload: value }),

        /**
         * Stores API response from gateway
         */
        setResponse: (response) =>
            dispatch({ type: "SET_RESPONSE", payload: response }),


        /**
         * Stores error payload
         */
        setError: (error) =>
            dispatch({ type: "SET_ERROR", payload: error }),

        /**
         * Toggles the global isLoading flag
         */
        toggleIsLoading: () =>
            dispatch({ type: "TOGGLE_IS_LOADING" })
    };
}


