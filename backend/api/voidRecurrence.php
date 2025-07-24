<?php

require_once __DIR__ . '/init.php';

header('Content-Type: application/json');

// Parse incoming JSON POST payload
$data = json_decode(file_get_contents('php://input'), true);
$payload = $data['payload'] ?? [];

// Extract and validate required fields
$paymentId = $payload['payment_id'] ?? null;
$credentials = $payload['credentials'] ?? null;

if (!$paymentId || !$credentials) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: payment_id or credentials']);
    exit;
}

// Initialize GoPay client using provided credentials
$gopay = initializeGoPay($credentials);

// Attempt to cancel recurrence
$response = $gopay->voidRecurrence($paymentId);

// Return API response
if ($response->hasSucceed()) {
    http_response_code(200);
    echo json_encode($response->json);
} else {
    http_response_code(400);
    echo json_encode([
        'error' => $response->json['errors'] ?? 'Failed to cancel recurrence'
    ]);
}
