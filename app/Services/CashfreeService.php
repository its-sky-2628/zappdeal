<?php

namespace App\Services;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class CashfreeService
{
    private function client(): PendingRequest
    {
        return Http::baseUrl(config('services.cashfree.base_url'))
            ->acceptJson()->asJson()->timeout(30)
            ->withHeaders([
                'x-api-version' => '2023-08-01',
                'x-client-id' => config('services.cashfree.app_id'),
                'x-client-secret' => config('services.cashfree.secret'),
            ]);
    }

    public function createSession(Order $order, User $user): array
    {
        $gatewayId = 'ZF_ORD_'.$order->id.'_'.now()->timestamp;
        $response = $this->client()->post('/pg/orders', [
            'order_id' => $gatewayId,
            'order_amount' => (float) $order->total,
            'order_currency' => 'INR',
            'customer_details' => [
                'customer_id' => 'cust_'.$user->id,
                'customer_name' => $user->name ?: 'Customer',
                'customer_email' => $order->email ?: $user->email,
                'customer_phone' => substr(preg_replace('/\D/', '', $user->phone ?: '9999999999'), -10),
            ],
            'order_meta' => [
                'return_url' => route('payments.return', ['order_id' => $order->id, 'cf_order_id' => $gatewayId]),
                'notify_url' => route('payments.webhook'),
            ],
        ]);

        if (! $response->successful() || ! $response->json('payment_session_id')) {
            throw new RuntimeException($response->json('message', 'Unable to start payment. Please try again.'));
        }

        $order->update(['cashfree_order_id' => $gatewayId]);

        return [
            'status' => 'payment_pending',
            'payment_session_id' => $response->json('payment_session_id'),
            'cf_order_id' => $gatewayId,
            'order_id' => $order->id,
            'mode' => config('services.cashfree.mode'),
        ];
    }

    public function status(string $gatewayId): array
    {
        return $this->client()->get('/pg/orders/'.rawurlencode($gatewayId))->throw()->json();
    }

    public function webhookIsValid(string $rawBody, string $timestamp, string $signature): bool
    {
        $expected = base64_encode(hash_hmac('sha256', $timestamp.$rawBody, (string) config('services.cashfree.secret'), true));

        return $signature !== '' && hash_equals($expected, $signature);
    }
}
