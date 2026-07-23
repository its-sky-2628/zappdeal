<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BulkOrder extends Model
{
    protected $fillable = [
        'full_name',
        'mobile',
        'email',
        'company_name',
        'delivery_address',
        'product_name',
        'quantity',
        'requirements',
    ];
}