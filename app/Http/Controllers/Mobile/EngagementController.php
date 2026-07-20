<?php

namespace App\Http\Controllers\Mobile;

use App\Models\DeviceRegistration;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EngagementController extends MobileController
{
    public function reviews(Product $product): JsonResponse
    {
        return $this->ok(['items' => $product->reviewEntries()->where('visible', true)->latest()->get()]);
    }

    public function storeReview(Request $request, Product $product): JsonResponse
    {
        $data = $request->validate(['rating' => 'required|integer|min:1|max:5', 'comment' => 'required|string|max:3000', 'product_image' => 'nullable|string|max:512']);
        $review = $product->reviewEntries()->create([...$data, 'customer_name' => $request->user()->name, 'avatar' => mb_strtoupper(mb_substr($request->user()->name, 0, 1)) ?: 'U']);
        $product->update(['reviews' => $product->reviewEntries()->count(), 'rating' => $product->reviewEntries()->avg('rating') ?: 0]);

        return $this->ok($review, 'Review submitted', 201);
    }

    public function likeReview(Review $review): JsonResponse
    {
        abort_unless($review->visible, 404);
        $review->increment('likes');

        return $this->ok($review->refresh());
    }

    public function wallet(Request $request): JsonResponse
    {
        return $this->ok(['balance' => (int) $request->user()->wallet_balance, 'currency' => 'INR', 'withdrawals' => $request->user()->withdrawals()->latest()->get()]);
    }

    public function referrals(Request $request): JsonResponse
    {
        $rows = $request->user()->referrals()->with('referredUser:id,name')->latest()->get();

        return $this->ok(['code' => $request->user()->referral_code, 'completed' => $rows->where('status', 'Completed')->count(), 'earnings' => (int) $rows->where('status', 'Completed')->sum('reward_amount'), 'items' => $rows]);
    }

    public function registerDevice(Request $request): JsonResponse
    {
        $data = $request->validate(['token' => 'required|string|max:512', 'platform' => 'required|in:android', 'device_name' => 'nullable|string|max:255', 'app_version' => 'nullable|string|max:50']);
        $device = DeviceRegistration::updateOrCreate(['token' => $data['token']], [...$data, 'user_id' => $request->user()->id, 'active' => true, 'last_seen_at' => now()]);

        return $this->ok($device, 'Device registered');
    }

    public function deactivateDevice(Request $request): JsonResponse
    {
        $token = $request->validate(['token' => 'required|string|max:512'])['token'];
        DeviceRegistration::where('user_id', $request->user()->id)->where('token', $token)->update(['active' => false, 'last_seen_at' => now()]);

        return $this->ok(null, 'Device deactivated');
    }
}
