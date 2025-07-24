// List of supported payment methods.
// First empty value allows the default (no specific method selected).
export const PAYMENT_METHODS = [
    "",
    "PAYMENT_CARD",
    "BANK_ACCOUNT",
    "GPAY",
    "APPLE_PAY",
    "TWISTO",
    "SKIPPAY",
    "BITCOIN",
    "PAYPAL",
    "CLICK_TO_PAY",
    "MPAYMENT",
    "PRSMS",
    "PAYSAFECARD",
];

// List of SWIFT codes with corresponding display names (used for bank transfers).
export const SWIFTS = [
    { value: "", label: "" },
    { value: "QRPAYMENT", label: "QR Platba" },
    { value: "GIBACZPX", label: "Česká Spořitelna" },
    { value: "KOMBCZPP", label: "Komerční Banka" },
    { value: "CEKOCZPP", label: "ČSOB" },
    { value: "RZBCCZPP", label: "Raiffeisenbank" },
    { value: "BACXCZPP", label: "UniCredit Bank" },
    { value: "AGBACZPP", label: "Moneta Money Bank" },
    { value: "FIOBCZPP", label: "FIO Banka" },
    { value: "BREXCZPP", label: "mBank" },
    { value: "AIRACZPP", label: "AirBank" },
    { value: "INGBCZPP", label: "ING Bank" },
    { value: "OBKLCZ2X", label: "Oberbank" },
    { value: "SUBACZPP", label: "VÚB Praha" },
    { value: "BPPFCZP1", label: "Hello bank!" },
    { value: "CTASCZ22", label: "CREDITAS" },
    { value: "EXPNCZPP", label: "Max banka" },
    { value: "JTBPCZPP", label: "J&T Banka" },
    { value: "TATRSKBX", label: "Tatra Banka" },
    { value: "SUBASKBX", label: "VÚB" },
    { value: "UNCRSKBX", label: "UniCredit Bank SK" },
    { value: "GIBASKBX", label: "Slovenská Sporiteľňa" },
    { value: "CEKOSKBX", label: "ČSOB SK" },
    { value: "POBNSKBA", label: "Poštová Banka" },
    { value: "OTPVSKBX", label: "OTP Banka Slovensko" },
    { value: "KOMASK2X", label: "Prima Banka Slovensko" },
    { value: "CITISKBA", label: "Citibank Europe" },
    { value: "FIOZSKBA", label: "Fio banka SK" },
    { value: "BREXSKBX", label: "mBank SK" },
    { value: "INGBSKBX", label: "ING Bank SK" },
    { value: "JTBPSKBA", label: "J&T Banka SK" },
    { value: "OBKLSKBA", label: "Oberbank SK" },
    { value: "BSLOSK22", label: "Privatbanka" },
    { value: "BFKKSKBB", label: "BKS Bank" },
    { value: "TATRSKBXXXX", label: "Raiffeisenbank SK" },
    { value: "KOMBSKBA", label: "Komerční banka SK" },
];

// Recurrence cycle options used for recurrent payments.
export const RECURRENCE_CYCLES = ["DAY", "WEEK", "MONTH", "ON_DEMAND"];

// Supported currencies 
export const CURRENCIES = [
    "CZK",
    "EUR",
    "PLN",
    "USD",
    "GBP",
    "HUF",
    "RON",
    "BGN"
];

// Buy Now, Pay Later options.
export const BNPL_TYPES = ["", "DEFERRED_PAYMENT", "PAY_IN_THREE"];

// Supported languages for payment gateway UI.
export const LANGS = ["CS", "SK", "EN", "DE", "RU", "FR", "HU", "PL", "RO", "BG", "HR", "IT", "ES", "UK", "ET", "LT", "LV", "SL", "PT"];

// Maps payment states to Tailwind color classes used for UI status display.
export const PAYMENT_STATES_COLORS = {
    CREATED: "text-yellow-300",
    PAID: "text-green-500",
    CANCELED: "text-red-600",
    PAYMENT_METHOD_CHOSEN: "text-yellow-300",
    TIMEOUTED: "text-red-600",
    AUTHORIZED: "text-green-500",
    REFUNDED: "text-blue-500",
    PARTIALLY_REFUNDED: "text-blue-500"
};

// List of available actions that can be performed on a payment.
export const PAYMENT_ACTIONS = [
    "REFUND",
    "CREATE RECURRENCE",
    "CANCEL RECURRENCE",
    "CAPTURE AUTHORIZATION",
    "CANCEL AUTHORIZATION",
    "CAPTURE AUTH PARTIAL"
];

// Available formats for exporting account statements.
export const FORMATS = [
    "PDF_A",
    "CSV_A",
    "CSV_B",
    "CSV_C",
    "CSV_D",
    "CSV_E",
    "XLS_A",
    "XLS_B",
    "XLS_C",
    "ABO_A",
    "ABO_B",
];
