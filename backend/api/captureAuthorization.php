<?php

require_once __DIR__ . '/init.php';

header('Content-Type: application/json');

// Parse incoming JSON POST payload
$data = json_decode(file_get_contents('php://input'), true);
$payload = $data['payload'] ?? [];

// Validate required fields
if (empty($payload['payment_id']) || empty($payload['credentials'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: payment_id or credentials']);
    exit;
}

$paymentId = $payload['payment_id'];
$credentials = $payload['credentials'];

// Initialize GoPay client using provided credentials
$gopay = initializeGoPay($credentials);

// Attempt to capture the authorized payment
$response = $gopay->captureAuthorization($paymentId);

// Return result
if ($response->hasSucceed()) {
    http_response_code(200);
    echo json_encode($response->json);
} else {
    http_response_code(400);
    echo json_encode([
        'error' => $response->json['errors'] ?? 'Unknown error during captureAuthorization'
    ]);
}
