/**
 * Default application state used for initializing useReducer.
 * 
 * This represents the full structure of payment data, user credentials,
 * loading status, and API response or error objects.
 */
export const defaultState = {
    payment_data: {
        payer: {
            default_payment_instrument: "",
            allowed_payment_instruments: [],
            default_swift: "",
            allowed_swifts: [],
            default_bnpl_type: "",
            allowed_bnpl_types: [],
            request_card_token: false,
            allowed_card_token: "",
            contact: {
                first_name: "Jan",
                last_name: "Novák",
                email: "jan.novak@gopay.cz",
                phone_number: "+420774123456",
                city: "České Budějovice",
                street: "Testovací 1",
                postal_code: "37001",
                country_code: "CZE"
            }
        },
        amount: 100,
        currency: "CZK",
        order_number: `Test_1234/${new Date().getFullYear()}`,
        order_description: "Test payment",
        items: [{ name: 'item01', amount: 50 }, { name: 'item02', amount: 100 }],
        additional_params: [{ name: "invoicenumber", value: "2015001003" }],
        callback: {
            return_url: "http://localhost:5173/",
            notification_url: ""
        },
        lang: "CS",
        preauthorization: false,
    },
    credentials: {
        source: "gopayground",
        client_id: "",
        client_secret: "",
        goid: "",
        test_mode: true
    },
    error: {
    },
    response: {
    },
    isLoading: false,
}