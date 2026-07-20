<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return ['price' => 'integer', 'old_price' => 'integer', 'rating' => 'float', 'reviews' => 'integer', 'images' => 'array', 'colors' => 'array', 'models' => 'array', 'is_newly_launched' => 'boolean', 'is_recommended' => 'boolean', 'is_style' => 'boolean', 'inventory_tracked' => 'boolean', 'stock_quantity' => 'integer', 'is_available' => 'boolean'];
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function reviewEntries(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
