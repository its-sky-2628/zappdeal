<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\IphoneModel;
use App\Models\Product;
use App\Models\ShopByStyle;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function products(): JsonResponse
    {
        return response()->json(Product::query()->orderBy('id')->get()->map(fn (Product $product) => $this->product($product)));
    }

    public function settings(): JsonResponse
    {
        $key = SiteSetting::keyColumn();

        return response()->json(SiteSetting::query()->pluck('value', $key));
    }

    public function updateSettings(Request $request): JsonResponse
    {
        $key = SiteSetting::keyColumn();
        foreach ($request->all() as $name => $value) {
            SiteSetting::query()->updateOrCreate([$key => $name], ['value' => is_array($value) ? json_encode($value) : $value, 'updated_at' => now()]);
        }

        return response()->json(['message' => 'Settings updated successfully']);
    }

    public function iphoneModels(): JsonResponse
    {
        return response()->json(IphoneModel::query()->orderBy('id')->get());
    }

    public function styles(): JsonResponse
    {
        return response()->json(ShopByStyle::query()->orderBy('id')->get());
    }

    public function storeProduct(Request $request): JsonResponse
    {
        $product = Product::create($this->validateProduct($request));

        return response()->json($this->product($product), 201);
    }

    public function updateProduct(Request $request, Product $product): JsonResponse
    {
        $product->update($this->validateProduct($request, true));

        return response()->json($this->product($product->refresh()));
    }

    public function deleteProduct(Product $product): JsonResponse
    {
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }

    private function validateProduct(Request $request, bool $partial = false): array
    {
        $prefix = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'name' => "$prefix|string|max:255", 'category' => "$prefix|string|max:255", 'price' => "$prefix|integer|min:0", 'old_price' => 'nullable|integer|min:0',
            'rating' => 'nullable|numeric|min:0|max:5', 'reviews' => 'nullable|integer|min:0', 'image' => 'nullable', 'images' => 'nullable|array', 'video' => 'nullable',
            'colors' => 'nullable|array', 'models' => 'nullable|array', 'detail' => 'nullable|string', 'is_newly_launched' => 'nullable|boolean', 'is_recommended' => 'nullable|boolean', 'is_style' => 'nullable|boolean',
        ]);
    }

    private function product(Product $product): array
    {
        $data = $product->toArray();
        foreach (['id', 'price', 'reviews', 'is_newly_launched', 'is_recommended', 'is_style'] as $field) {
            $data[$field] = (int) ($data[$field] ?? 0);
        }
        $data['old_price'] = $product->old_price === null ? null : (int) $product->old_price;
        $data['rating'] = (float) $product->rating;
        $data['image'] = $this->image($product);

        return $data;
    }

    private function image(Product $product): string
    {
        if (is_string($product->image) && $product->image !== '' && $product->image !== 'Array' && strlen($product->image) < 500) {
            return $product->image;
        }
        $first = $product->images[0] ?? null;

        return is_array($first) ? ($first['url'] ?? '/assets/placeholder.png') : ($first ?: '/assets/placeholder.png');
    }
}
