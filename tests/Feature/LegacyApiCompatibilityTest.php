<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LegacyApiCompatibilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_products_keep_the_legacy_array_contract(): void
    {
        Product::create(['name' => 'Case', 'category' => 'Mobile', 'price' => 199, 'images' => [['url' => '/uploads/case.jpg']], 'colors' => ['Black'], 'models' => ['iPhone 15']]);
        $this->getJson('/api/products')->assertOk()->assertJsonPath('0.name', 'Case')->assertJsonPath('0.price', 199)->assertJsonPath('0.colors.0', 'Black');
    }

    public function test_existing_sanctum_shaped_tokens_authenticate(): void
    {
        $user = User::forceCreate(['name' => 'Customer', 'email' => 'c@example.test', 'phone' => '9999999999']);
        $plain = 'existing-plain-token';
        $tokenId = DB::table('personal_access_tokens')->insertGetId(['tokenable_type' => User::class, 'tokenable_id' => $user->id, 'name' => 'auth_token', 'token' => hash('sha256', $plain), 'abilities' => '["*"]', 'expires_at' => now()->addDay(), 'created_at' => now(), 'updated_at' => now()]);
        $this->withToken($tokenId.'|'.$plain)->getJson('/api/user')->assertOk()->assertJsonPath('id', $user->id);
    }

    public function test_admin_routes_reject_customers(): void
    {
        $user = User::forceCreate(['name' => 'Customer', 'email' => 'customer@example.test']);
        $this->actingAs($user)->getJson('/api/admin/orders')->assertForbidden();
    }

    public function test_order_total_is_recalculated_and_client_total_is_ignored(): void
    {
        $user = User::forceCreate(['name' => 'Customer', 'email' => 'customer@example.test', 'phone' => '9999999999']);
        $product = Product::create(['name' => 'Case', 'category' => 'Mobile', 'price' => 200]);
        $response = $this->actingAs($user)->postJson('/api/orders', ['product_id' => $product->id, 'quantity' => 2, 'total_amount' => 1, 'shipping_address' => 'A valid delivery address', 'payment_method' => 'COD']);
        $response->assertCreated()->assertJsonPath('total', 368);
        $this->assertDatabaseHas('orders', ['user_id' => $user->id, 'total' => 368, 'discount_amount' => 32]);
    }

    public function test_customer_cannot_cancel_another_customers_order(): void
    {
        $owner = User::forceCreate(['name' => 'Owner', 'email' => 'owner@example.test']);
        $attacker = User::forceCreate(['name' => 'Attacker', 'email' => 'attacker@example.test']);
        $product = Product::create(['name' => 'Case', 'category' => 'Mobile', 'price' => 200]);
        $order = Order::create(['user_id' => $owner->id, 'product_id' => $product->id, 'qty' => 1, 'total' => 200, 'payment_method' => 'COD', 'status' => 'Pending']);
        $this->actingAs($attacker)->postJson('/api/user/orders/'.$order->id.'/cancel')->assertNotFound();
        $this->assertDatabaseHas('orders', ['id' => $order->id, 'status' => 'Pending']);
    }

    public function test_admin_password_login_keeps_legacy_response_shape(): void
    {
        User::forceCreate(['name' => 'Admin', 'email' => 'admin@example.test', 'password' => Hash::make('secret-pass'), 'is_admin' => true]);
        $this->postJson('/api/login', ['email' => 'admin@example.test', 'password' => 'secret-pass'])->assertOk()->assertJsonStructure(['requires_otp', 'access_token', 'user' => ['id', 'email', 'is_admin']]);
    }

    public function test_expired_access_tokens_are_rejected(): void
    {
        $user = User::forceCreate(['name' => 'Customer', 'email' => 'expired@example.test']);
        $plain = 'expired-token';
        $tokenId = DB::table('personal_access_tokens')->insertGetId(['tokenable_type' => User::class, 'tokenable_id' => $user->id, 'name' => 'auth_token', 'token' => hash('sha256', $plain), 'abilities' => '["*"]', 'expires_at' => now()->subMinute(), 'created_at' => now(), 'updated_at' => now()]);
        $this->withToken($tokenId.'|'.$plain)->getJson('/api/user')->assertUnauthorized();
    }

    public function test_cashfree_webhooks_require_signatures_and_are_idempotent(): void
    {
        Config::set('services.cashfree.secret', 'webhook-secret');
        $user = User::forceCreate(['name' => 'Customer', 'email' => 'payer@example.test', 'wallet_balance' => 100]);
        $product = Product::create(['name' => 'Case', 'category' => 'Mobile', 'price' => 200]);
        $order = Order::create(['user_id' => $user->id, 'product_id' => $product->id, 'qty' => 1, 'total' => 100, 'payment_method' => 'Online', 'status' => 'Payment Pending', 'wallet_deduction' => 100, 'cashfree_order_id' => 'CF-123']);
        $payload = json_encode(['data' => ['order' => ['order_id' => 'CF-123'], 'payment' => ['cf_payment_id' => 'PAY-123', 'payment_status' => 'SUCCESS']]], JSON_THROW_ON_ERROR);
        $timestamp = '1721450000';
        $signature = base64_encode(hash_hmac('sha256', $timestamp.$payload, 'webhook-secret', true));

        $this->call('POST', '/api/payments/cashfree/webhook', [], [], [], [], $payload)->assertUnauthorized();
        $headers = ['x-webhook-timestamp' => $timestamp, 'x-webhook-signature' => $signature, 'content-type' => 'application/json'];
        $this->call('POST', '/api/payments/cashfree/webhook', [], [], [], $this->transformHeadersToServerVars($headers), $payload)->assertOk();
        $this->call('POST', '/api/payments/cashfree/webhook', [], [], [], $this->transformHeadersToServerVars($headers), $payload)->assertOk();

        $this->assertDatabaseHas('orders', ['id' => $order->id, 'status' => 'Pending']);
        $this->assertDatabaseCount('payment_attempts', 1);
    }
}
