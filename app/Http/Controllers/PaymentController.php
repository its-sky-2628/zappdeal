<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\OrderController;
use App\Models\Order;
use App\Models\PaymentAttempt;
use App\Services\CashfreeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function returned(Request $request, CashfreeService $cashfree, OrderController $orders): RedirectResponse
    {
        $data = $request->validate(['order_id' => 'required|integer', 'cf_order_id' => 'required|string']);
        $order = Order::find($data['order_id']);
        if (! $order || ! hash_equals((string) $order->cashfree_order_id, $data['cf_order_id'])) {
            return redirect('/?payment=failed');
        }
        try {
            $status = $cashfree->status($data['cf_order_id']);
            if (($status['order_status'] ?? null) === 'PAID') {
                $orders->markPaid($order);

                return redirect('/?payment=success&order_id='.$order->id);
            }
        } catch (\Throwable $e) {
            report($e);
        }
        $orders->failAndRestore($order);

        return redirect('/?payment=failed');
    }

    public function webhook(Request $request, CashfreeService $cashfree, OrderController $orders): Response
    {
        $raw = $request->getContent();
        $timestamp = (string) $request->header('x-webhook-timestamp');
        $signature = (string) $request->header('x-webhook-signature');
        abort_unless($cashfree->webhookIsValid($raw, $timestamp, $signature), 401);
        $payload = json_decode($raw, true);
        $gatewayId = $payload['data']['order']['order_id'] ?? null;
        $status = $payload['data']['payment']['payment_status'] ?? null;
        $order = $gatewayId ? Order::where('cashfree_order_id', $gatewayId)->first() : null;
        if (! $order) {
            return response('OK');
        }
        $eventId = (string) ($payload['data']['payment']['cf_payment_id'] ?? hash('sha256', $timestamp.$raw));
        $created = DB::transaction(function () use ($order, $eventId, $gatewayId, $status, $raw) {
            return PaymentAttempt::query()->insertOrIgnore(['order_id' => $order->id, 'gateway' => 'cashfree', 'gateway_event_id' => $eventId, 'gateway_order_id' => $gatewayId, 'status' => $status, 'payload_hash' => hash('sha256', $raw), 'processed_at' => now(), 'created_at' => now(), 'updated_at' => now()]);
        });
        if (! $created) {
            return response('OK');
        }
        if ($status === 'SUCCESS') {
            $orders->markPaid($order);
        } elseif (in_array($status, ['FAILED', 'USER_DROPPED'])) {
            $orders->failAndRestore($order);
        }

        return response('OK');
    }
}
