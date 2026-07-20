<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WebController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

Route::get('/admin', [WebController::class, 'admin']);
Route::get('/reviews.php', [WebController::class, 'reviews']);
Route::get('/payment-response.php', [PaymentController::class, 'returned'])->name('payments.return');
Route::get('/uploads/{path}', [WebController::class, 'upload'])->where('path', '.*');
Route::get('/sitemap.xml', function () {
    $urls = [['loc' => url('/'), 'priority' => '1.0']];
    foreach (Product::select('name', 'updated_at')->get() as $product) {
        $urls[] = ['loc' => url('/product/'.Str::slug($product->name)), 'lastmod' => optional($product->updated_at)->toAtomString(), 'priority' => '0.8'];
    }
    $xml = view('sitemap', compact('urls'))->render();

    return response($xml, 200, ['Content-Type' => 'application/xml']);
});
Route::get('/{path?}', [WebController::class, 'storefront'])->where('path','.*');
