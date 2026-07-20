<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class WebController extends Controller
{
    public function storefront(Request $request)
    {
        $parts = array_values(array_filter(explode('/', $request->path())));
        $product = null;
        $categoryName = '';
        $isProduct = false;
        if (count($parts) === 2 && ($parts[0] === 'product' || ! in_array($parts[0], ['account', 'policies', 'collections']))) {
            $slug = $parts[1];
            $product = Product::query()->get()->first(fn ($p) => (string) $p->id === $slug || Str::slug($p->name) === $slug);
            $isProduct = (bool) $product;
        }
        if (count($parts) === 2 && $parts[0] === 'collections') {
            $categoryName = in_array(strtolower($parts[1]), ['iphone-covers', 'iphone-cases', 'mobile']) ? 'iPhone Covers' : ($parts[1] === 'all' ? '' : Str::headline($parts[1]));
        }
        $appUrl = rtrim(config('app.url'), '/');
        $currentUrl = $appUrl.'/'.ltrim($request->path(), '/');
        if ($isProduct) {
            $currentUrl = $appUrl.'/product/'.Str::slug($product->name);
            $title = 'Buy '.$product->name.' Online at Best Price | ZappDeal';
            $description = 'Buy '.$product->name.' from ZappDeal. Premium quality mobile cover with precise cutouts, camera protection and comfortable grip. Fast delivery across India with Cash on Delivery.';
            $keywords = $product->name.', iPhone cover, iPhone case, mobile cover, phone accessories';
            $image = $product->image ? (Str::startsWith($product->image, 'http') ? $product->image : $appUrl.$product->image) : '';
        } else {
            $title = $categoryName ? 'Buy iPhone Mobile Covers Online | Premium Cases for All iPhone Models | ZappDeal' : 'ZappDeal - Premium Mobile Covers & Cases for iPhone | Cash on Delivery';
            $description = $categoryName ? 'Shop premium iPhone mobile covers online at ZappDeal. Available for every iPhone model. Fast shipping and Cash on Delivery.' : 'Buy premium mobile covers for every iPhone model at ZappDeal. Shockproof, transparent, silicone, MagSafe compatible and designer cases.';
            $keywords = 'mobile covers, iphone covers, iphone cases, mobile case, phone accessories';
            $image = '';
        }

        return view('storefront', ['seo_title' => $title, 'seo_description' => $description, 'seo_keywords' => $keywords, 'seo_image' => $image, 'is_product_page' => $isProduct, 'product' => $product?->toArray(), 'category_name' => $categoryName, 'appUrl' => $appUrl, 'currentUrl' => $currentUrl]);
    }

    public function admin()
    {
        return view('admin');
    }

    public function reviews(Request $request)
    {
        $product = Product::findOrFail($request->integer('productId'));
        $reviews = $product->reviewEntries()->where('visible', true)->latest()->get()->toArray();
        $distribution = [5 => 0, 4 => 0, 3 => 0, 2 => 0, 1 => 0];
        foreach ($reviews as $r) {
            $distribution[(int) $r['rating']]++;
        }
        $name = e($product->name);
        $image = e($product->image ? (Str::startsWith($product->image, 'http') ? $product->image : '/'.ltrim($product->image, '/')) : '/assets/dell-laptop.png');

        return view('reviews', ['product' => $product->toArray(), 'reviews' => $reviews, 'totalReviews' => count($reviews), 'avgScore' => $product->rating ? round($product->rating, 1) : 5.0, 'distribution' => $distribution, 'appUrl' => config('app.url'), 'productName' => $name, 'productImage' => $image, 'productUrl' => '/product/'.Str::slug($product->name)]);
    }

    public function upload(string $path): BinaryFileResponse
    {
        abort_if(str_contains($path, '..'), 404);
        $file = base_path('../uploads/'.$path);
        abort_unless(is_file($file), 404);

        return response()->file($file);
    }
}
