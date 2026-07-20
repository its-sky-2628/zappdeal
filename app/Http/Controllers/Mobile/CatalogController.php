<?php

namespace App\Http\Controllers\Mobile;

use App\Models\IphoneModel;
use App\Models\Product;
use App\Models\ShopByStyle;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CatalogController extends MobileController
{
    public function home(): JsonResponse
    {
        $settings = SiteSetting::query()->pluck('value', SiteSetting::keyColumn());

        return $this->ok([
            'banners' => json_decode($settings['home_banners'] ?? '[]', true) ?: [],
            'categories' => Product::query()->where('is_available', true)->distinct()->orderBy('category')->pluck('category'),
            'models' => IphoneModel::query()->orderBy('name')->get(),
            'styles' => ShopByStyle::query()->latest()->get(),
            'new_products' => $this->cards(Product::query()->where('is_available', true)->where('is_newly_launched', true)->latest()->limit(12)->get()),
            'recommendations' => $this->cards(Product::query()->where('is_available', true)->where('is_recommended', true)->latest()->limit(12)->get()),
            'featured_products' => $this->cards(Product::query()->where('is_available', true)->where('is_recommended', true)->latest()->limit(12)->get()),
        ]);
    }

    public function startup(): JsonResponse
    {
        $settings = SiteSetting::query()->pluck('value', SiteSetting::keyColumn());

        return $this->ok([
            'app' => ['name' => $settings['app_name'] ?? 'ZappDeal', 'maintenance' => filter_var($settings['maintenance_mode'] ?? false, FILTER_VALIDATE_BOOL), 'minimum_version' => $settings['minimum_android_version'] ?? '1.0.0', 'latest_version' => $settings['latest_android_version'] ?? '1.0.0', 'force_update' => filter_var($settings['force_update'] ?? false, FILTER_VALIDATE_BOOL), 'store_url' => $settings['android_store_url'] ?? null],
            'contact' => ['email' => $settings['support_email'] ?? null, 'phone' => $settings['support_phone'] ?? null, 'whatsapp' => $settings['whatsapp_number'] ?? null],
            'policies' => ['privacy' => $settings['privacy_policy'] ?? '', 'terms' => $settings['terms'] ?? '', 'shipping' => $settings['shipping_policy'] ?? '', 'returns' => $settings['return_policy'] ?? ''],
            'capabilities' => ['password_recovery' => false, 'returns' => false, 'replacements' => false, 'tracking_history' => false, 'notification_inbox' => false, 'product_variants' => false, 'reviews' => true, 'wallet' => true, 'referrals' => true, 'cashfree' => true],
            'filters' => ['sort' => ['newest', 'price_asc', 'price_desc', 'rating'], 'merchandising' => ['new', 'recommended']],
        ]);
    }

    public function suggestions(Request $request): JsonResponse
    {
        $q = trim($request->validate(['q' => 'required|string|min:2|max:100'])['q']);
        $items = Product::query()->where('is_available', true)->where(fn ($builder) => $builder->where('name', 'like', "%{$q}%")->orWhere('category', 'like', "%{$q}%"))->limit(8)->get(['id', 'name', 'category', 'image']);

        return $this->ok(['items' => $items]);
    }

    public function index(Request $request): JsonResponse
    {
        $data = $request->validate(['q' => 'nullable|string|max:100', 'category' => 'nullable|string|max:100', 'model' => 'nullable|string|max:100', 'style' => 'nullable|string|max:100', 'merchandising' => ['nullable', Rule::in(['new', 'recommended'])], 'sort' => ['nullable', Rule::in(['newest', 'price_asc', 'price_desc', 'rating'])], 'page' => 'nullable|integer|min:1', 'per_page' => 'nullable|integer|min:1|max:40']);
        $query = Product::query()->where('is_available', true);
        if ($q = $data['q'] ?? null) {
            $query->where(fn ($builder) => $builder->where('name', 'like', "%{$q}%")->orWhere('category', 'like', "%{$q}%"));
        }
        if ($category = $data['category'] ?? null) {
            $query->where('category', $category);
        }
        if ($model = $data['model'] ?? null) {
            $query->where('models', 'like', '%"'.$model.'"%');
        }
        if ($style = $data['style'] ?? null) {
            $query->where(fn ($builder) => $builder->where('name', 'like', "%{$style}%")->orWhere('detail', 'like', "%{$style}%"));
        }
        if (($data['merchandising'] ?? null) === 'new') {
            $query->where('is_newly_launched', true);
        }
        if (($data['merchandising'] ?? null) === 'recommended') {
            $query->where('is_recommended', true);
        }
        match ($data['sort'] ?? 'newest') {
            'price_asc' => $query->orderBy('price'), 'price_desc' => $query->orderByDesc('price'), 'rating' => $query->orderByDesc('rating'), default => $query->latest()
        };
        $page = $query->paginate($data['per_page'] ?? 20);

        return $this->ok(['items' => $this->cards(collect($page->items())), 'pagination' => ['page' => $page->currentPage(), 'per_page' => $page->perPage(), 'total' => $page->total(), 'last_page' => $page->lastPage()]]);
    }

    public function show(Product $product): JsonResponse
    {
        abort_unless($product->is_available, 404);

        return $this->ok($product->load(['reviewEntries' => fn ($q) => $q->where('visible', true)->latest()->limit(20)]));
    }

    private function cards($products): array
    {
        return $products->map(fn (Product $p) => $p->only(['id', 'name', 'category', 'price', 'old_price', 'rating', 'reviews', 'image', 'images', 'colors', 'models', 'is_newly_launched', 'is_recommended', 'stock_quantity', 'inventory_tracked']))->values()->all();
    }
}
