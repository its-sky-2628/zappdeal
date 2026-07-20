<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Api\OrderController as LegacyOrderController;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Services\CashfreeService;
use App\Services\MobileCheckoutService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckoutController extends MobileController
{
    public function preview(Request $request, MobileCheckoutService $pricing): JsonResponse
    {
        $data = $request->validate(['coupon_code' => 'nullable|string|max:50', 'use_wallet' => 'nullable|boolean']);
        $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);
        $quote = $pricing->quote($cart->items()->with('product')->get(), $request->user(), $data['coupon_code'] ?? null, $data['use_wallet'] ?? false);
        unset($quote['coupon']);

        return $this->ok($quote);
    }

    public function place(Request $request, MobileCheckoutService $pricing, CashfreeService $cashfree): JsonResponse
    {
        $data = $request->validate(['address_id' => 'required|integer', 'coupon_code' => 'nullable|string|max:50', 'use_wallet' => 'nullable|boolean', 'payment_method' => 'required|in:COD,CASHFREE']);
        $key = $request->header('Idempotency-Key');
        abort_unless(is_string($key) && strlen($key) >= 12 && strlen($key) <= 100, 422, 'A valid Idempotency-Key header is required.');
        if ($existing = Order::where('user_id', $request->user()->id)->where('idempotency_key', $key)->first()) {
            return $this->ok($existing->load('items.product'), 'Order already placed');
        }
        $address = $request->user()->addresses()->findOrFail($data['address_id']);
        $order = DB::transaction(function () use ($request, $pricing, $data, $key, $address) {
            $user = User::lockForUpdate()->findOrFail($request->user()->id);
            $cart = Cart::where('user_id', $user->id)->lockForUpdate()->firstOrFail();
            $items = $cart->items()->with('product')->lockForUpdate()->get();
            foreach ($items as $item) {
                $item->setRelation('product', Product::lockForUpdate()->findOrFail($item->product_id));
            }
            $quote = $pricing->quote($items, $user, $data['coupon_code'] ?? null, $data['use_wallet'] ?? false);
            $first = $items->first();
            $order = Order::create(['user_id' => $user->id, 'product_id' => $first->product_id, 'qty' => $items->sum('quantity'), 'total' => $quote['payable'], 'subtotal' => $quote['subtotal'], 'discount_amount' => $quote['discount'], 'shipping_amount' => $quote['shipping'], 'tax_amount' => $quote['tax'], 'payable_amount' => $quote['payable'], 'wallet_deduction' => $quote['wallet_deduction'], 'status' => $data['payment_method'] === 'CASHFREE' && $quote['payable'] > 0 ? 'Payment Pending' : 'Pending', 'payment_state' => $data['payment_method'] === 'CASHFREE' && $quote['payable'] > 0 ? 'pending' : 'unpaid', 'payment_method' => $data['payment_method'], 'shipping_address' => $address->line, 'email' => $user->email, 'coupon_code' => $data['coupon_code'] ?? null, 'idempotency_key' => $key]);
            foreach ($items as $item) {
                $product = $item->product;
                $order->items()->create(['product_id' => $product->id, 'product_name' => $product->name, 'unit_price' => $product->price, 'quantity' => $item->quantity, 'color' => $item->color ?: null, 'model' => $item->model ?: null, 'line_total' => $product->price * $item->quantity]);
                if ($product->inventory_tracked) {
                    $product->decrement('stock_quantity', $item->quantity);
                }
            }
            if ($quote['wallet_deduction']) {
                $user->decrement('wallet_balance', $quote['wallet_deduction']);
            }
            if ($quote['coupon']) {
                $quote['coupon']->increment('usage_count');
            }
            $cart->items()->delete();

            return $order;
        });
        if ($order->status === 'Payment Pending') {
            return $this->ok(['order' => $order->load('items.product'), 'payment' => $cashfree->createSession($order, $request->user())], 'Payment session created', 201);
        }

        return $this->ok($order->load('items.product'), 'Order placed', 201);
    }

    public function verify(Request $request, Order $order, CashfreeService $cashfree, LegacyOrderController $legacy): JsonResponse
    {
        $this->owns($request, $order);
        abort_unless($order->cashfree_order_id, 422, 'No payment session exists for this order.');
        $gateway = $cashfree->status($order->cashfree_order_id);
        if (($gateway['order_status'] ?? null) === 'PAID') {
            $legacy->markPaid($order);
        }

        return $this->ok(['order' => $order->fresh()->load('items.product'), 'gateway_status' => $gateway['order_status'] ?? 'UNKNOWN']);
    }

    public function orders(Request $request): JsonResponse
    {
        $page = $request->user()->orders()->with('items.product')->latest()->paginate(min(40, max(1, $request->integer('per_page', 20))));

        return $this->ok(['items' => collect($page->items())->map(fn (Order $order) => $this->withActions($order))->all(), 'pagination' => ['page' => $page->currentPage(), 'total' => $page->total(), 'last_page' => $page->lastPage()]]);
    }

    public function order(Request $request, Order $order): JsonResponse
    {
        $this->owns($request, $order);

        return $this->ok($this->withActions($order->load('items.product')));
    }

    public function cancel(Request $request, Order $order, LegacyOrderController $legacy): JsonResponse
    {
        $this->owns($request, $order);
        $response = $legacy->cancel($request, $order);

        return $this->ok($response->getData(true)['order'] ?? null, 'Order cancelled');
    }

    public function retry(Request $request, Order $order, CashfreeService $cashfree): JsonResponse
    {
        $this->owns($request, $order);
        abort_unless($order->status === 'Payment Pending', 422, 'Only payment-pending orders can be retried.');

        return $this->ok(['order' => $this->withActions($order), 'payment' => $cashfree->createSession($order, $request->user())], 'Payment session created');
    }

    public function invoice(Request $request, Order $order)
    {
        $this->owns($request, $order);

        return response()->view('invoice', ['order' => $order->load(['items.product', 'user'])])->header('Content-Disposition', 'attachment; filename="Invoice-'.$order->id.'.html"');
    }

    private function withActions(Order $order): array
    {
        $data = $order->toArray();
        $data['available_actions'] = ['cancel' => in_array($order->status, ['Pending', 'Payment Pending'], true), 'retry_payment' => $order->status === 'Payment Pending', 'invoice' => ! in_array($order->status, ['Payment Pending', 'Failed'], true), 'return' => false, 'replace' => false];

        return $data;
    }

    private function owns(Request $request, Order $order): void
    {
        abort_unless($order->user_id === $request->user()->id, 404);
    }
}
