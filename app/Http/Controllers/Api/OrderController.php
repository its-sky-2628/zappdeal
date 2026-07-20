<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Referral;
use App\Models\SiteSetting;
use App\Models\UserAddress;
use App\Services\CashfreeService;
use App\Services\PricingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Throwable;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json($request->user()->orders()->with('product')->latest()->get()->map(fn (Order $o) => $this->legacyOrder($o)));
    }

    public function store(Request $request, PricingService $pricing, CashfreeService $cashfree): JsonResponse
    {
        $data = $request->validate(['product_id' => 'required|integer|exists:products,id', 'quantity' => 'required|integer|min:1|max:10', 'address_id' => 'nullable|integer', 'shipping_address' => 'nullable|string', 'email' => 'nullable|email', 'coupon_code' => 'nullable|string', 'use_wallet' => 'nullable|boolean', 'payment_method' => 'nullable|in:COD,Online', 'color' => 'nullable|string|max:100']);
        $user = $request->user();
        $product = Product::findOrFail($data['product_id']);
        $quote = $pricing->calculate($product, (int) $data['quantity'], $data['coupon_code'] ?? null);
        $address = null;
        if (! empty($data['address_id'])) {
            $address = UserAddress::where('user_id', $user->id)->find($data['address_id']);
        }
        $shipping = $address?->line ?? ($data['shipping_address'] ?? '');
        if (trim($shipping) === '') {
            throw ValidationException::withMessages(['shipping_address' => ['Please add and select a shipping address.']]);
        }

        $order = DB::transaction(function () use ($data, $user, $product, $quote, $shipping) {
            $locked = $user->newQuery()->lockForUpdate()->findOrFail($user->id);
            $afterDiscount = max(0, $quote['subtotal'] - $quote['generalDiscount'] - $quote['couponDiscount']);
            $wallet = ($data['use_wallet'] ?? false) ? min($locked->wallet_balance, $afterDiscount) : 0;
            $total = $afterDiscount - $wallet;
            $payment = $data['payment_method'] ?? 'COD';
            $order = Order::create(['user_id' => $locked->id, 'product_id' => $product->id, 'qty' => $data['quantity'], 'total' => $total, 'status' => $payment === 'Online' && $total > 0 ? 'Payment Pending' : 'Pending', 'payment_method' => $payment, 'wallet_deduction' => $wallet, 'shipping_address' => $shipping, 'email' => $data['email'] ?? $locked->email, 'coupon_code' => $data['coupon_code'] ?? null, 'discount_amount' => $quote['generalDiscount'] + $quote['couponDiscount'], 'color' => $data['color'] ?? null]);
            if ($wallet > 0) {
                $locked->decrement('wallet_balance', $wallet);
            }
            if ($quote['coupon']) {
                $quote['coupon']->increment('usage_count');
            }
            if ($payment === 'COD' || $total === 0) {
                $this->rewardReferral($order, $quote['subtotal']);
            }

            return $order;
        });

        if ($order->status === 'Payment Pending') {
            try {
                return response()->json($cashfree->createSession($order, $user));
            } catch (Throwable $e) {
                $this->failAndRestore($order);
                report($e);

                return response()->json(['message' => 'Unable to start payment. Please try again.'], 502);
            }
        }

        return response()->json($this->legacyOrder($order->load('product')), 201);
    }

    public function retry(Request $request, Order $order, CashfreeService $cashfree): JsonResponse
    {
        $this->owns($request, $order);
        abort_unless($order->status === 'Payment Pending', 422, 'Only payment-pending orders can be retried.');

        return response()->json($cashfree->createSession($order, $request->user()));
    }

    public function updateAddress(Request $request, Order $order): JsonResponse
    {
        $this->owns($request, $order);
        abort_unless(in_array($order->status, ['Pending', 'Payment Pending']), 422, 'This order address can no longer be changed.');
        $data = $request->validate(['address_id' => 'required|integer']);
        $address = $request->user()->addresses()->findOrFail($data['address_id']);
        $order->update(['shipping_address' => $address->line]);

        return response()->json($this->legacyOrder($order->load('product')));
    }

    public function cancel(Request $request, Order $order): JsonResponse
    {
        $this->owns($request, $order);
        DB::transaction(function () use ($order) {
            $fresh = Order::lockForUpdate()->findOrFail($order->id);
            abort_unless(in_array($fresh->status, ['Pending', 'Payment Pending']), 422, 'This order can no longer be cancelled.');
            $this->restoreWallet($fresh);
            $fresh->update(['status' => 'Cancelled']);
        });

        return response()->json(['message' => 'Order cancelled successfully', 'order' => $this->legacyOrder($order->fresh()->load('product'))]);
    }

    public function adminIndex(): JsonResponse
    {
        return response()->json(Order::with(['product', 'user'])->latest()->get()->map(fn ($o) => $this->legacyOrder($o)));
    }

    public function status(Request $request, Order $order): JsonResponse
    {
        $data = $request->validate(['status' => 'required|string|max:255']);
        $order->update(['status' => $data['status']]);

        return response()->json($this->legacyOrder($order->load('product')));
    }

    public function update(Request $request, Order $order): JsonResponse
    {
        $order->update($request->validate(['status' => 'sometimes|string', 'payment_method' => 'sometimes|string', 'shipping_address' => 'sometimes|string', 'email' => 'sometimes|nullable|email']));

        return response()->json($this->legacyOrder($order->load('product')));
    }

    private function rewardReferral(Order $order, int $subtotal): void
    {
        $prior = Order::where('user_id', $order->user_id)->whereKeyNot($order->id)->whereNotIn('status', ['Payment Pending', 'Cancelled', 'Failed'])->exists();
        if ($prior) {
            return;
        }$ref = Referral::where('referred_user_id', $order->user_id)->where('status', 'Pending')->lockForUpdate()->first();
        if (! $ref) {
            return;
        }$reward = (int) round($subtotal * ((int) SiteSetting::value('referral_reward_percent', 30) / 100));
        $ref->user()->increment('wallet_balance', $reward);
        $ref->update(['reward_amount' => $reward, 'status' => 'Completed']);
    }

    public function markPaid(Order $order): void
    {
        DB::transaction(function () use ($order) {
            $fresh = Order::lockForUpdate()->findOrFail($order->id);
            if ($fresh->status !== 'Payment Pending') {
                return;
            }$fresh->update(['status' => 'Pending']);
            $this->rewardReferral($fresh, $fresh->total + $fresh->wallet_deduction + $fresh->discount_amount);
        });
    }

    public function failAndRestore(Order $order): void
    {
        DB::transaction(function () use ($order) {
            $fresh = Order::lockForUpdate()->findOrFail($order->id);
            $this->restoreWallet($fresh);
            $fresh->update(['status' => 'Failed']);
        });
    }

    private function restoreWallet(Order $order): void
    {
        if ($order->wallet_deduction > 0 && ! $order->wallet_restored_at) {
            $order->user()->increment('wallet_balance', $order->wallet_deduction);
            $order->forceFill(['wallet_restored_at' => now()])->save();
        }
    }

    private function owns(Request $request, Order $order): void
    {
        abort_unless($order->user_id === $request->user()->id, 404);
    }

    private function legacyOrder(Order $o): array
    {
        $data = $o->toArray();
        foreach (['id', 'user_id', 'product_id', 'qty', 'total', 'wallet_deduction', 'discount_amount'] as $f) {
            $data[$f] = (int) ($data[$f] ?? 0);
        }if ($o->relationLoaded('product') && $o->product) {
            $data['product'] = ['id' => $o->product->id, 'name' => $o->product->name, 'price' => (int) $o->product->price, 'image' => $o->product->image];
        }

        return $data;
    }
}
