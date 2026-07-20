<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('carts')) {
            Schema::create('carts', function (Blueprint $table): void {
                $table->id();
                $this->addMatchingIdColumn($table, 'user_id', 'users')->unique();
                $table->timestamps();
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            });
        } else {
            $this->repairPartialCartsTable();
        }
        if (! Schema::hasTable('cart_items')) {
            Schema::create('cart_items', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('cart_id')->constrained()->cascadeOnDelete();
                $this->addMatchingIdColumn($table, 'product_id', 'products');
                $table->string('color')->default('');
                $table->string('model')->default('');
                $table->unsignedSmallInteger('quantity');
                $table->timestamps();
                $table->unique(['cart_id', 'product_id', 'color', 'model']);
                $table->foreign('product_id')->references('id')->on('products')->restrictOnDelete();
            });
        }
        if (! Schema::hasTable('wishlist_items')) {
            Schema::create('wishlist_items', function (Blueprint $table): void {
                $table->id();
                $this->addMatchingIdColumn($table, 'user_id', 'users');
                $this->addMatchingIdColumn($table, 'product_id', 'products');
                $table->timestamps();
                $table->unique(['user_id', 'product_id']);
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
                $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();
            });
        }
        if (! Schema::hasTable('order_items')) {
            Schema::create('order_items', function (Blueprint $table): void {
                $table->id();
                $this->addMatchingIdColumn($table, 'order_id', 'orders');
                $this->addMatchingIdColumn($table, 'product_id', 'products');
                $table->string('product_name');
                $table->integer('unit_price');
                $table->unsignedSmallInteger('quantity');
                $table->string('color')->nullable();
                $table->string('model')->nullable();
                $table->integer('line_total');
                $table->timestamps();
                $table->foreign('order_id')->references('id')->on('orders')->cascadeOnDelete();
                $table->foreign('product_id')->references('id')->on('products')->restrictOnDelete();
            });
        }
        $this->addProductFields();
        $this->addOrderFields();
        $this->addTokenFields();
        foreach (['shipping_fee' => '0', 'tax_percent' => '0', 'max_cart_quantity' => '10'] as $key => $value) {
            $column = Schema::hasColumn('site_settings', 'setting_key') ? 'setting_key' : 'key';
            DB::table('site_settings')->updateOrInsert([$column => $key], ['value' => $value, 'updated_at' => now()]);
        }
    }

    private function addProductFields(): void
    {
        foreach ([
            'inventory_tracked' => fn (Blueprint $t) => $t->boolean('inventory_tracked')->default(false),
            'stock_quantity' => fn (Blueprint $t) => $t->unsignedInteger('stock_quantity')->nullable(),
            'is_available' => fn (Blueprint $t) => $t->boolean('is_available')->default(true),
        ] as $column => $definition) {
            if (! Schema::hasColumn('products', $column)) {
                Schema::table('products', $definition);
            }
        }
    }

    private function addOrderFields(): void
    {
        foreach ([
            'subtotal' => fn (Blueprint $t) => $t->integer('subtotal')->nullable(),
            'shipping_amount' => fn (Blueprint $t) => $t->integer('shipping_amount')->default(0),
            'tax_amount' => fn (Blueprint $t) => $t->integer('tax_amount')->default(0),
            'payable_amount' => fn (Blueprint $t) => $t->integer('payable_amount')->nullable(),
            'payment_state' => fn (Blueprint $t) => $t->string('payment_state')->default('unpaid'),
            'idempotency_key' => fn (Blueprint $t) => $t->string('idempotency_key')->nullable()->unique(),
        ] as $column => $definition) {
            if (! Schema::hasColumn('orders', $column)) {
                Schema::table('orders', $definition);
            }
        }
    }

    private function addTokenFields(): void
    {
        if (! Schema::hasColumn('personal_access_tokens', 'revoked_at')) {
            Schema::table('personal_access_tokens', fn (Blueprint $table) => $table->timestamp('revoked_at')->nullable()->index());
        }
    }

    private function repairPartialCartsTable(): void
    {
        if (Schema::getColumnType('carts', 'user_id', true) !== Schema::getColumnType('users', 'id', true)) {
            Schema::table('carts', function (Blueprint $table): void {
                $this->addMatchingIdColumn($table, 'user_id', 'users')->change();
            });
        }

        $hasUniqueUser = collect(Schema::getIndexes('carts'))->contains(
            fn (array $index): bool => $index['unique'] && $index['columns'] === ['user_id']
        );
        if (! $hasUniqueUser) {
            Schema::table('carts', fn (Blueprint $table) => $table->unique('user_id'));
        }

        $hasUserForeignKey = collect(Schema::getForeignKeys('carts'))->contains(
            fn (array $key): bool => $key['columns'] === ['user_id']
                && $key['foreign_table'] === 'users'
                && $key['foreign_columns'] === ['id']
        );
        if (! $hasUserForeignKey) {
            Schema::table('carts', function (Blueprint $table): void {
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            });
        }
    }

    private function addMatchingIdColumn(Blueprint $table, string $column, string $referencedTable): mixed
    {
        $type = strtolower(Schema::getColumnType($referencedTable, 'id', true));
        $unsigned = str_contains($type, 'unsigned');

        return match (true) {
            str_contains($type, 'bigint') => $unsigned
                ? $table->unsignedBigInteger($column)
                : $table->bigInteger($column),
            str_contains($type, 'mediumint') => $unsigned
                ? $table->unsignedMediumInteger($column)
                : $table->mediumInteger($column),
            str_contains($type, 'smallint') => $unsigned
                ? $table->unsignedSmallInteger($column)
                : $table->smallInteger($column),
            str_contains($type, 'tinyint') => $unsigned
                ? $table->unsignedTinyInteger($column)
                : $table->tinyInteger($column),
            default => $unsigned
                ? $table->unsignedInteger($column)
                : $table->integer($column),
        };
    }

    public function down(): void
    {
        // Production adoption rollback uses the pre-cutover backup.
    }
};
