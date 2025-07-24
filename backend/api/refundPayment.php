<?php

require_once __DIR__ . '/init.php';

header('Content-Type: application/json');

// Parse incoming JSON payload from POST body
$data = json_decode(file_get_contents('php://input'), true);
$payload = $data['payload'] ?? [];

// Extract required values
$paymentId = $payload['payment_id'] ?? null;
$amount = $payload['amount'] ?? null;
$credentials = $payload['credentials'] ?? null;

// Validate required fields
if (!$paymentId || !$amount || !$credentials) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: payment_id, amount or credentials']);
    exit;
}

// Initialize GoPay client using provided credentials
$gopay = initializeGoPay($credentials);

// Perform refund request
$response = $gopay->refundPayment($paymentId, $amount);

// Return API response
if ($response->hasSucceed()) {
    http_response_code(200);
    echo json_encode($response->json);
} else {
    http_response_code(400);
    echo json_encode([
        'error' => $response->json['errors'] ?? 'Failed to refund payment'
    ]);
}
