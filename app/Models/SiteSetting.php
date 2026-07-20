<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class SiteSetting extends Model
{
    public $timestamps = false;

    protected $guarded = ['id'];

    public static function keyColumn(): string
    {
        return Schema::hasColumn('site_settings', 'setting_key') ? 'setting_key' : 'key';
    }

    public static function value(string $key, mixed $default = null): mixed
    {
        $row = static::query()->where(static::keyColumn(), $key)->first();

        return $row?->value ?? $default;
    }
}
