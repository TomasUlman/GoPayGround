import { defaultState } from "./defaultState";

/**
 * Main reducer function handling all application state mutations.
 * Each case updates a specific part of the state depending on the dispatched action.
 */
function reducer(state, action) {
    switch (action.type) {
        /**
         * Replaces entire payment_data object.
         * Used when resetting or changing JSON from JSONViewer > JSONEditor.
         */
        case 'UPDATE_PAYMENT_DATA':
            return {
                ...state,
                payment_data: {
                    ...action.payload
                }
            };

        /**
         * Updates a single field in the nested contact object inside payer.
         * action.field: the name of the field (e.g. 'email')
         * action.payload: the new value
         */
        case 'SET_CONTACT_FIELD':
            return {
                ...state,
                payment_data: {
                    ...state.payment_data,
                    payer: {
                        ...state.payment_data.payer,
                        contact: {
                            ...state.payment_data.payer.contact,
                            [action.field]: action.payload
                        }
                    }
                }
            };

        /**
         * Sets the total payment amount.
         */
        case 'SET_AMOUNT':
            return { ...state, payment_data: { ...state.payment_data, amount: action.payload } };

        /**
         * Updates a payment method field inside payer.
         * Examples: default_payment_instrument, allowed_swifts, etc.
         */
        case 'SET_PAYMENT_METHODS':
            return {
                ...state,
                payment_data: {
                    ...state.payment_data,
                    payer: {
                        ...state.payment_data.payer,
                        [action.field]: action.payload
                    }
                }
            };

        /**
         * Sets a top-level property of payment_data (e.g. currency, order_description, etc.)
         */
        case 'SET_PAYMENT_SETTINGS':
            return {
                ...state,
                payment_data: {
                    ...state.payment_data,
                    [action.field]: action.payload
                }
            };

        /**
         * Adds or removes the recurrence object inside payment_data.
         * If payload is true, recurrence is enabled with default values.
         * If false, recurrence is removed entirely.
         */
        case 'TOGGLE_RECURRENCE':
            if (action.payload)
                return {
                    ...state,
                    payment_data: {
                        ...state.payment_data,
                        recurrence: {
                            recurrence_cycle: "ON_DEMAND",
                            recurrence_period: "1",
                            recurrence_date_to: "2030-12-31"
                        }
                    }
                };

            return {
                ...state,
                // Removes the 'recurrence' key from payment_data if present
                payment_data: Object.fromEntries(
                    Object.entries(state.payment_data).filter(([key]) => key !== 'recurrence')
                )
            };

        /**
         * Updates a single property inside the recurrence object.
         */
        case 'SET_RECURRENCE_FIELD':
            return {
                ...state,
                payment_data: {
                    ...state.payment_data,
                    recurrence: {
                        ...state.payment_data.recurrence,
                        [action.field]: action.payload
                    }
                }
            };

        /**
         * Updates source of credentials to be selected from on backend
         * If source is custom, updates credentials (client_id, secret, etc.)
         */
        case 'SET_CREDENTIALS_FIELD':
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    [action.field]: action.payload
                }
            };


        /**
         * Stores API response from GoPay.
         */
        case "SET_RESPONSE":
            return {
                ...state,
                response: action.payload
            }

        /**
         * Stores error response from GoPay.
         */
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            }

        /**
         * Toggles global loading state (used for showing/hiding spinners).
         */
        case 'TOGGLE_IS_LOADING':
            return {
                ...state,
                isLoading: !state.isLoading
            }

        default:
            return state;
    }
}


/**
 * Loads and returns a previously saved JSON state from sessionStorage, if valid.
 * This is used to persist state between gateway redirections.
 *
 * @param {object} defaultState - The fallback state to use if no valid session state is found.
 * @returns {object} - Either parsed state from storage or the default state.
 */
function initState(defaultState) {
    const savedState = sessionStorage.getItem('state');
    sessionStorage.removeItem('state'); // Clear after loading
    if (savedState) {
        try {
            return JSON.parse(savedState);
        } catch (e) {
            console.warn('Invalid session state:', e);
        }
    }
    return defaultState;
}

export { reducer, defaultState, initState };