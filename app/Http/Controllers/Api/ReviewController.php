<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Review::query()->latest()->get());
    }

    public function product(Product $product): JsonResponse
    {
        return response()->json($product->reviewEntries()->where('visible', true)->latest()->get());
    }

    public function store(Request $request, Product $product): JsonResponse
    {
        $data = $request->validate(['customer_name' => 'required|string|max:255', 'avatar' => 'nullable|string|max:10', 'rating' => 'required|integer|min:1|max:5', 'comment' => 'required|string|max:3000', 'product_image' => 'nullable|string|max:512']);
        $review = $product->reviewEntries()->create($data);
        $product->update(['reviews' => $product->reviewEntries()->count(), 'rating' => $product->reviewEntries()->avg('rating') ?: 0]);

        return response()->json($review, 201);
    }

    public function like(Review $review): JsonResponse
    {
        $review->increment('likes');

        return response()->json($review->refresh());
    }

    public function update(Request $request, Review $review): JsonResponse
    {
        abort_unless($request->user()?->is_admin, 403);
        $review->update($request->validate(['rating' => 'sometimes|integer|min:1|max:5', 'comment' => 'sometimes|string|max:3000', 'visible' => 'sometimes|boolean']));

        return response()->json($review->refresh());
    }

    public function destroy(Request $request, Review $review): JsonResponse
    {
        abort_unless($request->user()?->is_admin, 403);
        $review->delete();

        return response()->json(['message' => 'Review deleted successfully']);
    }
}
