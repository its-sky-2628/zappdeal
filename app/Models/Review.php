<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return ['rating' => 'integer', 'verified' => 'boolean', 'visible' => 'boolean', 'likes' => 'integer'];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
