<?php

require_once __DIR__ . '/init.php';

header('Content-Type: application/json');

// Parse incoming JSON POST payload
$data = json_decode(file_get_contents('php://input'), true);
$payload = $data['payload'] ?? [];

// Extract fields
$paymentId = $payload['payment_id'] ?? null;
$credentials = $payload['credentials'] ?? null;
$paymentData = $payload['payment_data'] ?? null;

// Validate required fields
if (!$paymentId || !$credentials || !$paymentData) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: payment_id, credentials or payment_data']);
    exit;
}

// Initialize GoPay client using provided credentials
$gopay = initializeGoPay($credentials);

// Attempt to partially capture the authorized payment
$response = $gopay->captureAuthorizationPartial($paymentId, $paymentData);

// Return result
if ($response->hasSucceed()) {
    http_response_code(200);
    echo json_encode($response->json);
} else {
    http_response_code(400);
    echo json_encode([
        'error' => $response->json['errors'] ?? 'Unknown error during captureAuthorizationPartial'
    ]);
}

