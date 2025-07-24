<?php

require_once __DIR__ . '/init.php';

header('Content-Type: application/json');

// Parse JSON payload from POST request
$data = json_decode(file_get_contents('php://input'), true);
$payload = $data['payload'] ?? [];

// Extract credentials and request body
$credentials = $payload['credentials'] ?? null;
$body = $payload['body'] ?? null;

// Validate required fields
if (!$credentials || !$body) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing credentials or request body']);
    exit;
}

// Initialize GoPay client using provided credentials
$gopay = initializeGoPay($credentials);

// Retrieve GOID from global variable (set during GoPay initialization)
$goid = $GLOBALS['gopay_goid'] ?? null;
if (!$goid) {
    http_response_code(500);
    echo json_encode(['error' => 'GOID not available']);
    exit;
}

// Append GOID to request body
$body['goid'] = $goid;

// Send request to GoPay to get account statement
$response = $gopay->getAccountStatement($body);

// Handle response
if ($response->hasSucceed()) {
    // Statement is returned as raw binary data, convert to Base64 string
    $content = $response->__toString();

    http_response_code(200);
    echo json_encode([base64_encode($content)]);
} else {
    http_response_code(400);
    echo json_encode([
        'error' => $response->json['errors'] ?? 'Failed to fetch account statement'
    ]);
}
