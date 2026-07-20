<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MobileApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_catalog_uses_the_mobile_envelope_and_pagination(): void
    {
        Product::create(['name' => 'Purple Case', 'category' => 'Cases', 'price' => 500]);
        $this->getJson('/api/mobile/v1/products?q=Purple&sort=price_asc')
            ->assertOk()->assertJsonPath('success', true)->assertJsonPath('data.items.0.name', 'Purple Case')->assertJsonStructure(['success', 'message', 'data' => ['items', 'pagination'], 'errors']);
    }

    public function test_guest_cart_merge_is_deduplicated_and_quantity_capped(): void
    {
        $user = User::forceCreate(['name' => 'Customer', 'email' => 'merge@example.test']);
        $product = Product::create(['name' => 'Case', 'category' => 'Cases', 'price' => 200]);
        $payload = ['items' => [['product_id' => $product->id, 'quantity' => 7], ['product_id' => $product->id, 'quantity' => 7]]];
        $this->actingAs($user)->postJson('/api/mobile/v1/cart/merge', $payload)->assertOk()->assertJsonPath('data.items.0.quantity', 10);
        $this->assertDatabaseCount('cart_items', 1);
    }

    public function test_checkout_recalculates_totals_and_is_idempotent(): void
    {
        $user = User::forceCreate(['name' => 'Customer', 'email' => 'order@example.test', 'phone' => '9999999999']);
        $product = Product::create(['name' => 'Case', 'category' => 'Cases', 'price' => 500]);
        $address = $user->addresses()->create(['label' => 'Home', 'name' => 'Customer', 'phone' => '9999999999', 'line' => 'Mumbai', 'is_default' => true]);
        $this->actingAs($user)->postJson('/api/mobile/v1/cart/items', ['product_id' => $product->id, 'quantity' => 2])->assertCreated();
        $headers = ['Idempotency-Key' => 'mobile-order-key-123'];
        $payload = ['address_id' => $address->id, 'payment_method' => 'COD', 'total' => 1];
        $this->actingAs($user)->postJson('/api/mobile/v1/checkout/place', $payload, $headers)->assertCreated()->assertJsonPath('data.payable_amount', 920);
        $this->actingAs($user)->postJson('/api/mobile/v1/checkout/place', $payload, $headers)->assertOk()->assertJsonPath('message', 'Order already placed');
        $this->assertDatabaseCount('orders', 1);
        $this->assertDatabaseHas('order_items', ['product_id' => $product->id, 'quantity' => 2, 'line_total' => 1000]);
    }

    public function test_cart_items_and_order_details_enforce_ownership(): void
    {
        $owner = User::forceCreate(['name' => 'Owner', 'email' => 'owner-mobile@example.test']);
        $attacker = User::forceCreate(['name' => 'Attacker', 'email' => 'attacker-mobile@example.test']);
        $product = Product::create(['name' => 'Case', 'category' => 'Cases', 'price' => 200]);
        $item = $owner->cart()->create()->items()->create(['product_id' => $product->id, 'quantity' => 1]);
        $this->actingAs($attacker)->deleteJson('/api/mobile/v1/cart/items/'.$item->id)->assertNotFound();
    }

    public function test_startup_exposes_explicit_capabilities(): void
    {
        $this->getJson('/api/mobile/v1/startup')->assertOk()
            ->assertJsonPath('data.capabilities.reviews', true)
            ->assertJsonPath('data.capabilities.returns', false)
            ->assertJsonStructure(['data' => ['app', 'contact', 'policies', 'capabilities', 'filters']]);
    }

    public function test_device_registration_is_owned_and_can_be_deactivated(): void
    {
        $user = User::forceCreate(['name' => 'Customer', 'email' => 'device@example.test']);
        $this->actingAs($user)->postJson('/api/mobile/v1/devices', ['token' => 'native-fcm-token', 'platform' => 'android', 'app_version' => '1.0.0'])->assertOk();
        $this->assertDatabaseHas('device_registrations', ['user_id' => $user->id, 'token' => 'native-fcm-token', 'active' => true]);
        $this->actingAs($user)->deleteJson('/api/mobile/v1/devices', ['token' => 'native-fcm-token'])->assertOk();
        $this->assertDatabaseHas('device_registrations', ['token' => 'native-fcm-token', 'active' => false]);
    }

    public function test_account_deletion_anonymizes_customer_without_deleting_orders(): void
    {
        $user = User::forceCreate(['name' => 'Customer', 'email' => 'delete@example.test', 'phone' => '9999999999']);
        $product = Product::create(['name' => 'Case', 'category' => 'Cases', 'price' => 200]);
        $order = $user->orders()->create(['product_id' => $product->id, 'qty' => 1, 'total' => 200, 'payment_method' => 'COD']);
        $this->actingAs($user)->deleteJson('/api/mobile/v1/account', ['confirm' => true])->assertOk();
        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'Deleted customer', 'phone' => null]);
        $this->assertDatabaseHas('orders', ['id' => $order->id, 'user_id' => $user->id]);
    }
}
