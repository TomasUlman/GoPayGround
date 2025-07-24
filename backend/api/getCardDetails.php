<?php

require_once __DIR__ . '/init.php';

header('Content-Type: application/json');

// Parse JSON payload from POST request
$data = json_decode(file_get_contents('php://input'), true);
$payload = $data['payload'] ?? [];

// Extract credentials and card ID
$cardId = $payload['card_id'] ?? null;
$credentials = $payload['credentials'] ?? null;

// Validate required fields
if (!$cardId || !$credentials) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing card ID or credentials']);
    exit;
}

// Initialize GoPay client using provided credentials
$gopay = initializeGoPay($credentials);

// Fetch card details
$response = $gopay->getCardDetails($cardId);

// Handle API response
if ($response->hasSucceed()) {
    http_response_code(200);
    echo json_encode($response->json);
} else {
    http_response_code(400);
    echo json_encode([
        'error' => $response->json['errors'] ?? 'Failed to retrieve card details'
    ]);
}
