<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return ['qty' => 'integer', 'total' => 'integer', 'subtotal' => 'integer', 'shipping_amount' => 'integer', 'tax_amount' => 'integer', 'payable_amount' => 'integer', 'wallet_deduction' => 'integer', 'discount_amount' => 'integer', 'wallet_restored_at' => 'datetime'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
