<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bulk_orders', function (Blueprint $table) {
            $table->id();

            $table->string('full_name');
            $table->string('mobile', 10);
            $table->string('email');
            $table->string('company_name')->nullable();

            $table->text('delivery_address');

            $table->string('product_name');

            $table->integer('quantity');

            $table->text('requirements')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bulk_orders');
    }
};