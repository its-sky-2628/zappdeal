<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TriggerMailDelivery extends Model
{
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return ['sent_at' => 'datetime', 'attempts' => 'integer', 'cycle_number' => 'integer'];
    }
}
