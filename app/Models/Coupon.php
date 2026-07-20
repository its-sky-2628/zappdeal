<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return ['discount_value' => 'integer', 'min_order_amount' => 'integer', 'usage_count' => 'integer'];
    }
}
