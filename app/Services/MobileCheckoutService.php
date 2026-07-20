<?php

namespace App\Services;

use App\Models\Coupon;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Validation\ValidationException;

class MobileCheckoutService
{
    public function quote(Collection $cartItems, User $user, ?string $couponCode, bool $useWallet): array
    {
        if ($cartItems->isEmpty()) {
            throw ValidationException::withMessages(['cart' => ['Your cart is empty.']]);
        }
        foreach ($cartItems as $item) {
            $product = $item->product;
            if (! $product || ! $product->is_available || ($product->inventory_tracked && $product->stock_quantity < $item->quantity)) {
                throw ValidationException::withMessages(['cart' => [($product?->name ?? 'A product').' is unavailable or has insufficient stock.']]);
            }
        }
        $subtotal = (int) $cartItems->sum(fn ($item) => $item->product->price * $item->quantity);
        $generalDiscount = min((int) SiteSetting::value('general_discount_cap', 3600), (int) round($subtotal * ((int) SiteSetting::value('general_discount_percent', 8) / 100)));
        $coupon = null;
        $couponDiscount = 0;
        if ($couponCode) {
            $coupon = Coupon::query()->whereRaw('UPPER(code) = ?', [strtoupper($couponCode)])->where('status', 'Active')->first();
            if (! $coupon || $subtotal < $coupon->min_order_amount || ($coupon->valid_till && now()->isAfter($coupon->valid_till))) {
                throw ValidationException::withMessages(['coupon_code' => ['This coupon is invalid or not eligible.']]);
            }
            $couponDiscount = $coupon->discount_type === 'percentage' ? (int) round($subtotal * ($coupon->discount_value / 100)) : (int) $coupon->discount_value;
            $couponDiscount = min($couponDiscount, max(0, $subtotal - $generalDiscount));
        }
        $shipping = (int) SiteSetting::value('shipping_fee', 0);
        $taxable = max(0, $subtotal - $generalDiscount - $couponDiscount);
        $tax = (int) round($taxable * ((int) SiteSetting::value('tax_percent', 0) / 100));
        $beforeWallet = $taxable + $shipping + $tax;
        $wallet = $useWallet ? min($user->wallet_balance, $beforeWallet) : 0;

        return ['subtotal' => $subtotal, 'general_discount' => $generalDiscount, 'coupon_discount' => $couponDiscount, 'discount' => $generalDiscount + $couponDiscount, 'shipping' => $shipping, 'tax' => $tax, 'wallet_deduction' => $wallet, 'payable' => $beforeWallet - $wallet, 'coupon' => $coupon];
    }
}
