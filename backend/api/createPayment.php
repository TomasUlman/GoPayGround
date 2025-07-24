<?php
// Dev server (run from /backend): php -S localhost:8000

require_once __DIR__ . '/init.php';

header('Content-Type: application/json');

// Parse incoming JSON POST payload
$data = json_decode(file_get_contents('php://input'), true);
$payload = $data['payload'] ?? [];

// Extract fields from payload
$paymentData = $payload['payment_data'] ?? null;
$credentials = $payload['credentials'] ?? null;

// Validate required fields
if (!$paymentData || !$credentials) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: payment_data or credentials']);
    exit;
}

// Initialize GoPay client using provided credentials
$gopay = initializeGoPay($credentials);

// Create payment using provided data
$response = $gopay->createPayment($paymentData);

// Handle and return result
if ($response->hasSucceed()) {
    http_response_code(200);
    echo json_encode($response->json);
} else {
    http_response_code(400);
    echo json_encode([
        'error' => $response->json['errors'] ?? 'Failed to create payment.',
    ]);
}
