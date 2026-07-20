<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->createUsers();
        $this->createCatalog();
        $this->createCommerce();
        $this->createEngagement();
        $this->hardenExistingSchema();
    }

    private function createUsers(): void
    {
        if (! Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table): void {
                $table->increments('id');
                $table->string('name');
                $table->string('email')->nullable()->unique();
                $table->string('phone')->nullable()->unique();
                $table->string('otp')->nullable();
                $table->dateTime('otp_expires_at')->nullable();
                $table->timestamp('email_verified_at')->nullable();
                $table->string('password')->nullable();
                $table->boolean('is_admin')->default(false);
                $table->boolean('is_super')->default(false);
                $table->string('referral_code')->nullable()->unique();
                $table->unsignedInteger('referred_by_id')->nullable();
                $table->integer('wallet_balance')->default(0);
                $table->rememberToken();
                $table->timestamps();
                $table->foreign('referred_by_id')->references('id')->on('users')->nullOnDelete();
            });
        }

        if (! Schema::hasTable('personal_access_tokens')) {
            Schema::create('personal_access_tokens', function (Blueprint $table): void {
                $table->id();
                $table->morphs('tokenable');
                $table->string('name');
                $table->string('token', 64)->unique();
                $table->text('abilities')->nullable();
                $table->timestamp('last_used_at')->nullable();
                $table->timestamp('expires_at')->nullable();
                $table->timestamps();
            });
        }
    }

    private function createCatalog(): void
    {
        if (! Schema::hasTable('products')) {
            Schema::create('products', function (Blueprint $table): void {
                $table->increments('id');
                $table->string('name');
                $table->string('category');
                $table->integer('price');
                $table->integer('old_price')->nullable();
                $table->decimal('rating', 3, 2)->default(0);
                $table->integer('reviews')->default(0);
                $table->longText('image')->nullable();
                $table->longText('images')->nullable();
                $table->longText('video')->nullable();
                $table->text('colors')->nullable();
                $table->text('models')->nullable();
                $table->text('detail')->nullable();
                $table->boolean('is_newly_launched')->default(false);
                $table->boolean('is_recommended')->default(false);
                $table->boolean('is_style')->default(false);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('iphone_models')) {
            Schema::create('iphone_models', function (Blueprint $table): void {
                $table->increments('id');
                $table->string('name')->unique();
                $table->string('image');
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('shop_by_styles')) {
            Schema::create('shop_by_styles', function (Blueprint $table): void {
                $table->increments('id');
                $table->string('name');
                $table->string('search_term');
                $table->string('description')->nullable();
                $table->string('image')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('site_settings')) {
            Schema::create('site_settings', function (Blueprint $table): void {
                $table->increments('id');
                $table->string('setting_key')->unique();
                $table->longText('value')->nullable();
                $table->dateTime('updated_at')->nullable();
            });
        }
    }

    private function createCommerce(): void
    {
        if (! Schema::hasTable('orders')) {
            Schema::create('orders', function (Blueprint $table): void {
                $table->increments('id');
                $table->unsignedInteger('user_id');
                $table->unsignedInteger('product_id');
                $table->string('status')->default('Pending');
                $table->integer('qty')->default(1);
                $table->integer('total');
                $table->string('payment_method');
                $table->integer('wallet_deduction')->default(0);
                $table->text('shipping_address')->nullable();
                $table->string('email')->nullable();
                $table->string('coupon_code')->nullable();
                $table->integer('discount_amount')->default(0);
                $table->string('color')->nullable();
                $table->string('cashfree_order_id')->nullable()->unique();
                $table->timestamp('wallet_restored_at')->nullable();
                $table->timestamps();
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
                $table->foreign('product_id')->references('id')->on('products')->restrictOnDelete();
            });
        }

        if (! Schema::hasTable('coupons')) {
            Schema::create('coupons', function (Blueprint $table): void {
                $table->increments('id');
                $table->string('name');
                $table->string('code')->unique();
                $table->string('discount_type');
                $table->integer('discount_value');
                $table->integer('min_order_amount')->default(0);
                $table->string('valid_till')->nullable();
                $table->integer('usage_count')->default(0);
                $table->string('status')->default('Active');
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('user_addresses')) {
            Schema::create('user_addresses', function (Blueprint $table): void {
                $table->increments('id');
                $table->unsignedInteger('user_id');
                $table->string('label');
                $table->string('name');
                $table->string('phone');
                $table->text('line');
                $table->boolean('is_default')->default(false);
                $table->string('house_no')->nullable();
                $table->string('area')->nullable();
                $table->string('landmark')->nullable();
                $table->string('city')->nullable();
                $table->string('state')->nullable();
                $table->string('pincode', 20)->nullable();
                $table->timestamps();
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            });
        }
    }

    private function createEngagement(): void
    {
        if (! Schema::hasTable('referrals')) {
            Schema::create('referrals', function (Blueprint $table): void {
                $table->increments('id');
                $table->unsignedInteger('user_id');
                $table->unsignedInteger('referred_user_id');
                $table->integer('reward_amount')->default(0);
                $table->string('status')->default('Pending');
                $table->timestamps();
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
                $table->foreign('referred_user_id')->references('id')->on('users')->cascadeOnDelete();
            });
        }

        if (! Schema::hasTable('reviews')) {
            Schema::create('reviews', function (Blueprint $table): void {
                $table->increments('id');
                $table->unsignedInteger('product_id');
                $table->string('customer_name');
                $table->string('avatar', 10)->default('U');
                $table->integer('rating')->default(5);
                $table->boolean('verified')->default(false);
                $table->text('comment')->nullable();
                $table->integer('likes')->default(0);
                $table->boolean('visible')->default(true);
                $table->string('product_image')->nullable();
                $table->timestamps();
            });
        }

        foreach (['withdrawals', 'user_payout_methods'] as $tableName) {
            if (! Schema::hasTable($tableName)) {
                Schema::create($tableName, function (Blueprint $table) use ($tableName): void {
                    $table->increments('id');
                    $table->unsignedInteger('user_id');
                    if ($tableName === 'withdrawals') {
                        $table->integer('amount');
                    }
                    $table->string('method');
                    $table->string('bank_name')->nullable();
                    $table->string('account_name')->nullable();
                    $table->string('account_number')->nullable();
                    $table->string('ifsc_code')->nullable();
                    $table->longText('upi_qr_code')->nullable();
                    $table->string('upi_id')->nullable();
                    if ($tableName === 'withdrawals') {
                        $table->string('status')->default('Pending');
                    } else {
                        $table->boolean('is_default')->default(false);
                    }
                    $table->timestamps();
                });
            }
        }

        if (! Schema::hasTable('trigger_mail_deliveries')) {
            Schema::create('trigger_mail_deliveries', function (Blueprint $table): void {
                $table->id();
                $table->string('delivery_key')->unique();
                $table->string('delivery_type');
                $table->string('recipient_email')->index();
                $table->unsignedInteger('user_id')->nullable();
                $table->unsignedInteger('anchor_order_id')->nullable()->index();
                $table->unsignedInteger('cycle_number')->nullable();
                $table->string('status')->default('pending');
                $table->unsignedInteger('attempts')->default(0);
                $table->text('error_message')->nullable();
                $table->timestamp('sent_at')->nullable();
                $table->timestamps();
            });
        }

    }

    private function hardenExistingSchema(): void
    {
        if (Schema::hasTable('users') && ! Schema::hasColumn('users', 'is_super')) {
            Schema::table('users', fn (Blueprint $table) => $table->boolean('is_super')->default(false)->after('is_admin'));
        }
        if (Schema::hasTable('orders') && ! Schema::hasColumn('orders', 'cashfree_order_id')) {
            Schema::table('orders', fn (Blueprint $table) => $table->string('cashfree_order_id')->nullable()->unique()->after('color'));
        }
        if (Schema::hasTable('orders') && ! Schema::hasColumn('orders', 'wallet_restored_at')) {
            Schema::table('orders', fn (Blueprint $table) => $table->timestamp('wallet_restored_at')->nullable()->after('cashfree_order_id'));
        }

        $settingColumn = Schema::hasColumn('site_settings', 'setting_key') ? 'setting_key' : 'key';
        foreach ([
            'general_discount_percent' => '8',
            'general_discount_cap' => '3600',
            'referral_reward_percent' => '30',
        ] as $key => $value) {
            DB::table('site_settings')->updateOrInsert([$settingColumn => $key], ['value' => $value, 'updated_at' => now()]);
        }
    }

    public function down(): void
    {
        // This migration adopts production data. Rollback is intentionally a no-op;
        // use the required pre-cutover database backup for recovery.
    }
};
