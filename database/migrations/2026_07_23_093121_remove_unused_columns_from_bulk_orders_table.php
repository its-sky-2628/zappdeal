<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bulk_orders', function (Blueprint $table) {
            $table->dropColumn([
                'delivery_address',
                'product_name',
                'quantity',
                'requirements',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('bulk_orders', function (Blueprint $table) {
            $table->text('delivery_address');
            $table->string('product_name');
            $table->integer('quantity');
            $table->text('requirements')->nullable();
        });
    }
};
