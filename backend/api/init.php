<?php

require_once __DIR__ . '/../vendor/autoload.php';

use GoPay\Definition\Language;
use Dotenv\Dotenv;

// Always return JSON from this script
header('Content-Type: application/json');

// Load credentials from local .env file
$dotenv = Dotenv::createImmutable(__DIR__, 'credentials.env');
$dotenv->load();

// Define constants for GoPay gateway URLs
define('GOPAY_SANDBOX_URL', 'https://gw.sandbox.gopay.com/api');
define('GOPAY_PROD_URL', 'https://gate.gopay.cz/api');

/**
 * Initializes and returns a configured GoPay client instance.
 *
 * @param array $credentialsInput Input credentials array with keys:
 *   - source: one of 'gopayground', 'techsupport', or 'custom'
 *   - goid, client_id, client_secret: required if source is 'custom'
 *   - test_mode: optional boolean for custom source
 *
 * @return \GoPay\Payments Configured GoPay client
 */
function initializeGoPay(array $credentialsInput)
{
    // Resolve credentials and gateway URL based on source
    switch ($credentialsInput['source']) {
        case 'gopayground':
            $goid = $_ENV['GOPAYGROUND_GOID'];
            $clientId = $_ENV['GOPAYGROUND_CLIENT_ID'];
            $clientSecret = $_ENV['GOPAYGROUND_CLIENT_SECRET'];
            $gatewayUrl = GOPAY_SANDBOX_URL;
            break;

        case 'techsupport':
            $goid = $_ENV['TECHSUPPORT_GOID'];
            $clientId = $_ENV['TECHSUPPORT_CLIENT_ID'];
            $clientSecret = $_ENV['TECHSUPPORT_CLIENT_SECRET'];
            $gatewayUrl = GOPAY_PROD_URL;
            break;

        case 'custom':
            // Validate custom credentials
            if (
                empty($credentialsInput['goid']) ||
                empty($credentialsInput['client_id']) ||
                empty($credentialsInput['client_secret'])
            ) {
                http_response_code(400);
                echo json_encode([
                    'error' => [
                        'message' => 'Missing custom credentials'
                    ]
                ]);
                exit;
            }

            $goid = $credentialsInput['goid'];
            $clientId = $credentialsInput['client_id'];
            $clientSecret = $credentialsInput['client_secret'];

            // Choose test or production URL
            $gatewayUrl = $credentialsInput['test_mode'] === true
                ? GOPAY_SANDBOX_URL
                : GOPAY_PROD_URL;
            break;

        default:
            http_response_code(400);
            echo json_encode(['error' => 'Unknown credentials source: ' . $credentialsInput['source']]);
            exit;
    }

    // Make GOID available globally (used elsewhere)
    $GLOBALS['gopay_goid'] = $goid;

    // Initialize and return GoPay client
    return GoPay\payments([
        'goid' => $goid,
        'clientId' => $clientId,
        'clientSecret' => $clientSecret,
        'gatewayUrl' => $gatewayUrl,
        'language' => Language::CZECH
    ]);
}
