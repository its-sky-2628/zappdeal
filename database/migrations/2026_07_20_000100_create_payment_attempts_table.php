<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('payment_attempts')) {
            return;
        }

        Schema::create('payment_attempts', function (Blueprint $table): void {
            $table->id();
            $table->unsignedInteger('order_id')->index();
            $table->string('gateway')->default('cashfree');
            $table->string('gateway_event_id')->unique();
            $table->string('gateway_order_id')->nullable()->index();
            $table->string('status')->nullable();
            $table->string('payload_hash', 64);
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // Payment audit records are retained; restore from the pre-cutover backup.
    }
};
