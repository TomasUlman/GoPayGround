import { saveAs } from "file-saver";

/**
 * Generic input handler for both text inputs and checkboxes.
 * Automatically detects input type and sends correct payload to state setter.
 *
 * @param {Event} e – Synthetic React event
 * @param {Function} setField – Dispatch function (e.g. from useReducer)
 */
export function handleSetField(e, setField) {
    const { name, type, value, checked } = e.target;
    const payload = type === "checkbox" ? checked : value

    setField(name, payload)
}

/**
 * Recursively removes all empty strings from an object or array, without mutating the original input.
 * This ensures clean payloads are sent to the backend while preserving immutability.
 *
 * - All empty strings (`""`) are removed.
 * - Works on deeply nested objects and arrays.
 * - Arrays are cleaned as well – entries with empty string or nested empty values are omitted.
 * - Objects are rebuilt only with keys that contain meaningful values.
 *
 * @param {any} obj – Input value to clean (object, array, or primitive)
 * @returns {any} – New object/array/value without empty strings
 */
function removeEmptyStrings(obj) {
    // If it's an array, clean each item recursively and remove empty/null values
    if (Array.isArray(obj)) {
        return obj
            .map(removeEmptyStrings) // clean each item
            .filter((v) => v !== undefined); // remove empty entries
    }

    // If it's a non-null object, process all its keys recursively
    if (typeof obj === "object" && obj !== null) {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            const cleaned = removeEmptyStrings(value);
            // Only keep the property if it's not null or an empty string
            if (cleaned !== undefined) {
                acc[key] = cleaned;
            }
            return acc;
        }, {});
    }

    // Remove string values that are empty
    if (obj === "") return undefined;

    // Return all other primitives unchanged
    return obj;
}

/*
Legacy mutating version – modifies the input object directly.
Kept here as reference.

function removeEmptyStrings(obj) {
    for (const key in obj) {
        const value = obj[key];
        if (typeof value === "object" && value !== null) {
            removeEmptyStrings(value);
        } else if (value === "") {
            delete obj[key];
        }
    }
    return obj;
}
*/

/**
 * Sends a POST request with the provided payload and returns parsed JSON.
 * Automatically removes empty string fields from the payload.
 *
 * @param {string} endpoint – API endpoint (e.g. "/api/createPayment.php")
 * @param {Object} payload – Payload to send
 * @returns {Promise<Object>} – Parsed response data
 */
export async function apiCall(endopoint, payload) {
    const cleanedPayload = removeEmptyStrings(JSON.parse(JSON.stringify(payload)));

    const res = await fetch(endopoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "payload": cleanedPayload }),
    });

    const data = await res.json();

    return data;
}

/**
 * Generates a filename based on GoPay's format key.
 *
 * @param {string} format – Format string (e.g. "CSV_A", "PDF_A")
 * @returns {string} – Filename with appropriate extension
 */
export function generateStatementFilename(format) {
    let ext;
    if (format.startsWith('CSV_')) {
        ext = 'csv';
    } else if (format.startsWith('XLS_')) {
        ext = 'xls';
    } else if (format.startsWith('ABO_')) {
        ext = 'abo';
    } else if (format === 'PDF_A') {
        ext = 'pdf';
    } else {
        ext = 'dat';
    }
    return `statement.${ext}`;
}

/**
 * Converts a base64-encoded string to a downloadable file and triggers download.
 *
 * @param {string} format – GoPay format string (e.g. "CSV_A", "XLS_B")
 * @param {string} b64 – Base64-encoded file content
 */
export function downloadStatement(format, b64) {
    // Generate file name
    const filename = generateStatementFilename(format)

    // Decode Base64 to byte array
    const byteChars = atob(b64)
    const byteNumbers = Array.from(byteChars, c => c.charCodeAt(0))
    const byteArray = new Uint8Array(byteNumbers)

    // Determine MIME type based on extension
    const ext = filename.split('.').pop().toLowerCase()
    const mimeMap = {
        csv: 'text/csv',
        xls: 'application/vnd.ms-excel',
        pdf: 'application/pdf',
        abo: 'application/octet-stream',
        dat: 'application/octet-stream',
    }
    const mime = mimeMap[ext] || 'application/octet-stream'

    // Create blob and trigger download
    const blob = new Blob([byteArray], { type: `${mime};charset=utf-8` })
    saveAs(blob, filename)
}
