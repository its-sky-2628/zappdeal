<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BulkOrderController;
use App\Http\Controllers\Api\CatalogController;
use App\Http\Controllers\Api\FinanceController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\TriggerMailController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\PaymentController;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('mobile/v1')->group(base_path('routes/mobile.php'));

Route::post('/register/send-otp', [AuthController::class, 'registerOtp'])->middleware('throttle:3,5');
Route::post('/register/verify-otp', [AuthController::class, 'verifyRegistration'])->middleware('throttle:5,5');
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,5');
Route::post('/login/verify-otp', [AuthController::class, 'verifyLogin'])->middleware('throttle:5,5');
Route::get('/products', [CatalogController::class, 'products']);
Route::get('/settings', [CatalogController::class, 'settings']);
Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/products/{product}/reviews', [ReviewController::class, 'product']);
Route::post('/products/{product}/reviews', [ReviewController::class, 'store']);
Route::post('/bulk-order', [BulkOrderController::class, 'store']);
Route::post('/reviews/{review}/like', [ReviewController::class, 'like']);
Route::patch('/reviews/{review}', [ReviewController::class, 'like']);
Route::get('/coupons/validate', function (Request $request) {
    $data = $request->validate(['code' => 'required|string', 'subtotal' => 'required|numeric|min:0']);
    $coupon = Coupon::whereRaw('UPPER(code) = ?', [strtoupper($data['code'])])->first();
    abort_unless($coupon, 404, 'Coupon code not found.');
    abort_unless($coupon->status === 'Active' && $data['subtotal'] >= $coupon->min_order_amount, 400, 'This coupon is not eligible.');

    return response()->json(['valid' => true, 'code' => $coupon->code, 'discount_type' => $coupon->discount_type, 'discount_value' => (int) $coupon->discount_value, 'min_order_amount' => (int) $coupon->min_order_amount]);
});
Route::get('/iphone-models', [CatalogController::class, 'iphoneModels']);
Route::get('/shop-by-styles', [CatalogController::class, 'styles']);
Route::post('/payments/cashfree/webhook', [PaymentController::class, 'webhook'])->name('payments.webhook');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'show']);
    Route::put('/user/profile', [UserController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::post('/user/orders/{order}/pay', [OrderController::class, 'retry']);
    Route::put('/user/orders/{order}/address', [OrderController::class, 'updateAddress']);
    Route::post('/user/orders/{order}/cancel', [OrderController::class, 'cancel']);
    Route::get('/orders/invoice', function (Request $request) {
        $order = $request->user()->orders()->with(['product', 'user'])->findOrFail($request->integer('id'));

        return response()->view('invoice', compact('order'))->header('Content-Disposition', 'attachment; filename="Invoice-'.$order->id.'.html"');
    });
    Route::get('/user/addresses', [UserController::class, 'addresses']);
    Route::post('/user/addresses', [UserController::class, 'storeAddress']);
    Route::put('/user/addresses/{address}', [UserController::class, 'updateAddress']);
    Route::delete('/user/addresses/{address}', [UserController::class, 'deleteAddress']);
    Route::put('/user/addresses/{address}/default', [UserController::class, 'defaultAddress']);
    Route::get('/user/referrals', [UserController::class, 'referrals']);
    Route::get('/user/withdrawals', [FinanceController::class, 'withdrawals']);
    Route::post('/user/withdrawals', [FinanceController::class, 'storeWithdrawal']);
    Route::get('/user/payout-methods', [FinanceController::class, 'methods']);
    Route::post('/user/payout-methods', [FinanceController::class, 'storeMethod']);
    Route::put('/user/payout-methods/{method}', [FinanceController::class, 'updateMethod']);
    Route::delete('/user/payout-methods/{method}', [FinanceController::class, 'deleteMethod']);
    Route::put('/user/payout-methods/{method}/default', [FinanceController::class, 'defaultMethod']);
    Route::post('/user/upload', UploadController::class);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/bulk-orders', [AdminController::class, 'bulkOrders']);
    Route::get('/admin/trigger-mail-template', [TriggerMailController::class, 'show']);
    Route::put('/admin/trigger-mail-template', [TriggerMailController::class, 'update']);
    Route::post('/admin/trigger-mail-template/test', [TriggerMailController::class, 'test']);
    Route::get('/admin/trigger-mail-deliveries', [TriggerMailController::class, 'deliveries']);
    Route::post('/admin/send-trigger-mail', [TriggerMailController::class, 'send']);
    Route::put('/settings', [CatalogController::class, 'updateSettings']);
    Route::post('/upload', UploadController::class);
    Route::post('/products', [CatalogController::class, 'storeProduct']);
    Route::put('/products/{product}', [CatalogController::class, 'updateProduct']);
    Route::delete('/products/{product}', [CatalogController::class, 'deleteProduct']);
    Route::get('/users', [UserController::class, 'users']);
    Route::delete('/users/{user}', [UserController::class, 'deleteUser']);
    Route::get('/admin/orders', [OrderController::class, 'adminIndex']);
    Route::put('/admin/orders/{order}/status', [OrderController::class, 'status']);
    Route::put('/admin/orders/{order}', [OrderController::class, 'update']);
    Route::get('/admin/wallets', [FinanceController::class, 'wallets']);
    Route::get('/admin/withdrawals', [FinanceController::class, 'adminWithdrawals']);
    Route::put('/admin/withdrawals/{withdrawal}/status', [FinanceController::class, 'updateWithdrawal']);
    Route::get('/admin/coupons', [AdminController::class, 'coupons']);
    Route::post('/admin/coupons', [AdminController::class, 'storeCoupon']);
    Route::put('/admin/coupons/{coupon}', [AdminController::class, 'updateCoupon']);
    Route::delete('/admin/coupons/{coupon}', [AdminController::class, 'deleteCoupon']);
    Route::put('/reviews/{review}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);
    Route::post('/iphone-models', [AdminController::class, 'storeIphone']);
    Route::put('/iphone-models/{model}', [AdminController::class, 'updateIphone']);
    Route::delete('/iphone-models/{model}', [AdminController::class, 'deleteIphone']);
    Route::post('/iphone-models/batch', [AdminController::class, 'batchIphone']);
    Route::post('/shop-by-styles', [AdminController::class, 'storeStyle']);
    Route::put('/shop-by-styles/{style}', [AdminController::class, 'updateStyle']);
    Route::delete('/shop-by-styles/{style}', [AdminController::class, 'deleteStyle']);
    Route::post('/shop-by-styles/batch', [AdminController::class, 'batchStyle']);
});
Route::middleware(['auth:sanctum', 'super'])->group(function () {
    Route::put('/admin/users/{user}/role', [AdminController::class, 'role']);
    Route::post('/admin/create-admin', [AdminController::class, 'createAdmin']);
    Route::post('/admin/reset-password', [AdminController::class, 'resetPassword']);
});
