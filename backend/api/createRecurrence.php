<?php

require_once __DIR__ . '/init.php';

header('Content-Type: application/json');

// Parse incoming JSON POST payload
$data = json_decode(file_get_contents('php://input'), true);
$payload = $data['payload'] ?? [];

// Extract and validate required fields
$paymentId = $payload['payment_id'] ?? null;
$credentials = $payload['credentials'] ?? null;
$payment = $payload['payment_data'] ?? null;

if (!$paymentId || !$credentials || !$payment) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: payment_id, credentials or payment_data']);
    exit;
}

// Initialize GoPay client using provided credentials
$gopay = initializeGoPay($credentials);

// Attempt to create recurrence payment
$response = $gopay->createRecurrence($paymentId, $payment);

// Return API response
if ($response->hasSucceed()) {
    http_response_code(200);
    echo json_encode($response->json);
} else {
    http_response_code(400);
    echo json_encode([
        'error' => $response->json['errors'] ?? 'Failed to create recurrence'
    ]);
}

