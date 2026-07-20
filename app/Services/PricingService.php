<?php

namespace App\Services;

use App\Models\Coupon;
use App\Models\Product;
use App\Models\SiteSetting;
use Illuminate\Validation\ValidationException;

class PricingService
{
    public function calculate(Product $product, int $quantity, ?string $couponCode): array
    {
        if ($quantity < 1 || $quantity > 10) {
            throw ValidationException::withMessages(['quantity' => ['The quantity must be between 1 and 10.']]);
        }

        $subtotal = $product->price * $quantity;
        $percent = (int) SiteSetting::value('general_discount_percent', 8);
        $cap = (int) SiteSetting::value('general_discount_cap', 3600);
        $generalDiscount = min($cap, (int) round($subtotal * ($percent / 100)));
        $couponDiscount = 0;
        $coupon = null;

        if ($couponCode) {
            $coupon = Coupon::query()->whereRaw('UPPER(code) = ?', [strtoupper($couponCode)])->where('status', 'Active')->first();
            if (! $coupon || $subtotal < $coupon->min_order_amount || ($coupon->valid_till && now()->isAfter($coupon->valid_till))) {
                throw ValidationException::withMessages(['coupon_code' => ['This coupon is invalid or not eligible for this order.']]);
            }
            $couponDiscount = $coupon->discount_type === 'percentage'
                ? (int) round($subtotal * ($coupon->discount_value / 100))
                : $coupon->discount_value;
            $couponDiscount = min($couponDiscount, max(0, $subtotal - $generalDiscount));
        }

        return compact('subtotal', 'generalDiscount', 'couponDiscount', 'coupon');
    }
}
