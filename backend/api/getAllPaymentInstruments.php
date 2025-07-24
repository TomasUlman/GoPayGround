<?php

require_once __DIR__ . '/init.php';

header('Content-Type: application/json');

// Parse incoming JSON payload from POST body
$data = json_decode(file_get_contents('php://input'), true);
$payload = $data['payload'] ?? [];

// Extract credentials
$credentials = $payload['credentials'] ?? null;

// Validate presence of credentials and GOID
if (!$credentials || empty($credentials['goid'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing credentials or GOID']);
    exit;
}

// Initialize GoPay client using provided credentials
$gopay = initializeGoPay($credentials);

// Call GoPay API to get all available payment instruments for the GOID
$response = $gopay->getPaymentInstrumentsALL($credentials['goid']);

// Return API response
if ($response->hasSucceed()) {
    http_response_code(200);
    echo json_encode($response->json);
} else {
    http_response_code(400);
    echo json_encode([
        'error' => $response->json['errors'] ?? 'Failed to fetch payment instruments'
    ]);
}
