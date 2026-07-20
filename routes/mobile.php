<?php

use App\Http\Controllers\Mobile\AddressController;
use App\Http\Controllers\Mobile\AuthController;
use App\Http\Controllers\Mobile\CatalogController;
use App\Http\Controllers\Mobile\CheckoutController;
use App\Http\Controllers\Mobile\CollectionController;
use App\Http\Controllers\Mobile\EngagementController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register/otp', [AuthController::class, 'registerOtp'])->middleware('throttle:3,5');
Route::post('/auth/register/verify', [AuthController::class, 'verifyRegistration'])->middleware('throttle:5,5');
Route::post('/auth/login/otp', [AuthController::class, 'login'])->middleware('throttle:5,5');
Route::post('/auth/login/verify', [AuthController::class, 'verifyLogin'])->middleware('throttle:5,5');
Route::get('/home', [CatalogController::class, 'home']);
Route::get('/startup', [CatalogController::class, 'startup']);
Route::get('/search/suggestions', [CatalogController::class, 'suggestions']);
Route::get('/products', [CatalogController::class, 'index']);
Route::get('/products/{product}', [CatalogController::class, 'show']);
Route::get('/products/{product}/reviews', [EngagementController::class, 'reviews']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/session', [AuthController::class, 'session']);
    Route::put('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('/account', [AuthController::class, 'deleteAccount']);
    Route::get('/cart', [CollectionController::class, 'cart']);
    Route::post('/cart/items', [CollectionController::class, 'addCart']);
    Route::put('/cart/items/{item}', [CollectionController::class, 'updateCart']);
    Route::delete('/cart/items/{item}', [CollectionController::class, 'removeCart']);
    Route::delete('/cart', [CollectionController::class, 'clearCart']);
    Route::post('/cart/merge', [CollectionController::class, 'mergeCart']);
    Route::get('/wishlist', [CollectionController::class, 'wishlist']);
    Route::post('/wishlist', [CollectionController::class, 'addWishlist']);
    Route::delete('/wishlist/{product}', [CollectionController::class, 'removeWishlist']);
    Route::post('/wishlist/merge', [CollectionController::class, 'mergeWishlist']);
    Route::post('/collections/merge', [CollectionController::class, 'mergeCollections']);
    Route::apiResource('/addresses', AddressController::class)->except(['show']);
    Route::put('/addresses/{address}/default', [AddressController::class, 'makeDefault']);
    Route::post('/checkout/preview', [CheckoutController::class, 'preview']);
    Route::post('/checkout/place', [CheckoutController::class, 'place']);
    Route::post('/payments/cashfree/{order}/verify', [CheckoutController::class, 'verify']);
    Route::get('/orders', [CheckoutController::class, 'orders']);
    Route::get('/orders/{order}', [CheckoutController::class, 'order']);
    Route::post('/orders/{order}/cancel', [CheckoutController::class, 'cancel']);
    Route::post('/orders/{order}/retry-payment', [CheckoutController::class, 'retry']);
    Route::get('/orders/{order}/invoice', [CheckoutController::class, 'invoice']);
    Route::post('/products/{product}/reviews', [EngagementController::class, 'storeReview']);
    Route::post('/reviews/{review}/like', [EngagementController::class, 'likeReview']);
    Route::get('/wallet', [EngagementController::class, 'wallet']);
    Route::get('/referrals', [EngagementController::class, 'referrals']);
    Route::post('/devices', [EngagementController::class, 'registerDevice']);
    Route::delete('/devices', [EngagementController::class, 'deactivateDevice']);
});
