<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WebCompatibilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_storefront_admin_sitemap_and_product_seo_render(): void
    {
        $product = Product::create(['name' => 'Purple Case', 'category' => 'Mobile', 'price' => 199]);
        $this->get('/')->assertOk()->assertSee('ZappDeal');
        $this->get('/admin')->assertOk()->assertSee('Admin Portal');
        $this->get('/product/purple-case')->assertOk()->assertSee('Buy Purple Case Online');
        $this->get('/sitemap.xml')->assertOk()->assertHeader('Content-Type', 'application/xml')->assertSee('/product/purple-case');
    }
}
