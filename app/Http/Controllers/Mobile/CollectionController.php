<?php

namespace App\Http\Controllers\Mobile;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CollectionController extends MobileController
{
    public function cart(Request $request): JsonResponse
    {
        return $this->ok($this->cartData($this->cartFor($request)));
    }

    public function addCart(Request $request): JsonResponse
    {
        $data = $request->validate(['product_id' => 'required|integer|exists:products,id', 'quantity' => 'required|integer|min:1', 'color' => 'nullable|string|max:100', 'model' => 'nullable|string|max:100']);
        $cart = $this->cartFor($request);
        $this->upsert($cart, $data);

        return $this->ok($this->cartData($cart), 'Cart updated', 201);
    }

    public function updateCart(Request $request, CartItem $item): JsonResponse
    {
        abort_unless($item->cart->user_id === $request->user()->id, 404);
        $max = (int) SiteSetting::value('max_cart_quantity', 10);
        $item->update($request->validate(['quantity' => "required|integer|min:1|max:{$max}"]));

        return $this->ok($this->cartData($item->cart), 'Cart updated');
    }

    public function removeCart(Request $request, CartItem $item): JsonResponse
    {
        abort_unless($item->cart->user_id === $request->user()->id, 404);
        $cart = $item->cart;
        $item->delete();

        return $this->ok($this->cartData($cart), 'Item removed');
    }

    public function clearCart(Request $request): JsonResponse
    {
        $cart = $this->cartFor($request);
        $cart->items()->delete();

        return $this->ok($this->cartData($cart), 'Cart cleared');
    }

    public function mergeCart(Request $request): JsonResponse
    {
        $items = $request->validate(['items' => 'array|max:100', 'items.*.product_id' => 'required|integer|exists:products,id', 'items.*.quantity' => 'required|integer|min:1', 'items.*.color' => 'nullable|string|max:100', 'items.*.model' => 'nullable|string|max:100'])['items'] ?? [];
        $cart = $this->cartFor($request);
        DB::transaction(function () use ($cart, $items) {
            foreach ($items as $item) {
                $this->upsert($cart, $item);
            }
        });

        return $this->ok($this->cartData($this->cartFor($request)), 'Guest cart merged');
    }

    public function wishlist(Request $request): JsonResponse
    {
        return $this->ok(['items' => $request->user()->wishlistItems()->with('product')->latest()->get()]);
    }

    public function addWishlist(Request $request): JsonResponse
    {
        $id = $request->validate(['product_id' => 'required|integer|exists:products,id'])['product_id'];
        $request->user()->wishlistItems()->firstOrCreate(['product_id' => $id]);

        return $this->wishlist($request);
    }

    public function removeWishlist(Request $request, Product $product): JsonResponse
    {
        $request->user()->wishlistItems()->where('product_id', $product->id)->delete();

        return $this->wishlist($request);
    }

    public function mergeWishlist(Request $request): JsonResponse
    {
        $ids = $request->validate(['product_ids' => 'array|max:100', 'product_ids.*' => 'integer|exists:products,id'])['product_ids'] ?? [];
        foreach (array_unique($ids) as $id) {
            $request->user()->wishlistItems()->firstOrCreate(['product_id' => $id]);
        }

        return $this->wishlist($request);
    }

    public function mergeCollections(Request $request): JsonResponse
    {
        $data = $request->validate(['cart' => 'array|max:100', 'cart.*.product_id' => 'required|integer|exists:products,id', 'cart.*.quantity' => 'required|integer|min:1', 'cart.*.color' => 'nullable|string|max:100', 'cart.*.model' => 'nullable|string|max:100', 'wishlist' => 'array|max:100', 'wishlist.*' => 'integer|exists:products,id']);
        $cart = $this->cartFor($request);
        DB::transaction(function () use ($request, $cart, $data) {
            foreach ($data['cart'] ?? [] as $item) {
                $this->upsert($cart, $item);
            }
            foreach (array_unique($data['wishlist'] ?? []) as $id) {
                $request->user()->wishlistItems()->firstOrCreate(['product_id' => $id]);
            }
        });

        return $this->ok(['cart' => $this->cartData($cart), 'wishlist' => $request->user()->wishlistItems()->with('product')->get()], 'Guest collections merged');
    }

    private function cartFor(Request $request): Cart
    {
        return Cart::firstOrCreate(['user_id' => $request->user()->id]);
    }

    private function upsert(Cart $cart, array $data): void
    {
        $product = Product::findOrFail($data['product_id']);
        $this->validateSelection($product, $data);
        $max = (int) SiteSetting::value('max_cart_quantity', 10);
        $item = $cart->items()->firstOrNew(['product_id' => $product->id, 'color' => $data['color'] ?? '', 'model' => $data['model'] ?? '']);
        $item->quantity = min($max, (int) $item->quantity + $data['quantity']);
        $item->save();
    }

    private function cartData(Cart $cart): array
    {
        $items = $cart->items()->with('product')->get();

        return ['items' => $items, 'count' => $items->sum('quantity'), 'subtotal' => $items->sum(fn ($i) => $i->quantity * ($i->product?->price ?? 0))];
    }

    private function validateSelection(Product $product, array $data): void
    {
        if (! $product->is_available || ($product->inventory_tracked && $product->stock_quantity < $data['quantity'])) {
            throw ValidationException::withMessages(['product_id' => ['Product is unavailable or has insufficient stock.']]);
        }
        if ($product->colors && ! in_array($data['color'] ?? null, $product->colors, true)) {
            throw ValidationException::withMessages(['color' => ['Select a valid color.']]);
        }
        if ($product->models && ! in_array($data['model'] ?? null, $product->models, true)) {
            throw ValidationException::withMessages(['model' => ['Select a valid model.']]);
        }
    }
}
