<?php

require_once __DIR__ . '/init.php';

header('Content-Type: application/json');

// Parse incoming JSON payload from POST body
$data = json_decode(file_get_contents('php://input'), true);
$payload = $data['payload'] ?? [];

// Extract required values
$paymentId = $payload['payment_id'] ?? null;
$credentials = $payload['credentials'] ?? null;

// Validate required fields
if (!$paymentId || !$credentials) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: payment_id or credentials']);
    exit;
}

// Initialize GoPay client using provided credentials
$gopay = initializeGoPay($credentials);

// Request payment status
$response = $gopay->getStatus($paymentId);

// Return API response
if ($response->hasSucceed()) {
    http_response_code(200);
    echo json_encode($response->json);
} else {
    http_response_code(400);
    echo json_encode([
        'error' => $response->json['errors'] ?? 'Failed to retrieve payment status'
    ]);
}
