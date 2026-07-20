<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = ['id', 'is_admin', 'is_super', 'wallet_balance'];

    protected $hidden = ['password', 'remember_token', 'otp', 'otp_expires_at'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'otp_expires_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'is_super' => 'boolean',
            'wallet_balance' => 'integer',
            'anonymized_at' => 'datetime',
        ];
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function addresses(): HasMany
    {
        return $this->hasMany(UserAddress::class);
    }

    public function withdrawals(): HasMany
    {
        return $this->hasMany(Withdrawal::class);
    }

    public function payoutMethods(): HasMany
    {
        return $this->hasMany(UserPayoutMethod::class);
    }

    public function referrer(): BelongsTo
    {
        return $this->belongsTo(self::class, 'referred_by_id');
    }

    public function referrals(): HasMany
    {
        return $this->hasMany(Referral::class, 'user_id');
    }

    public function cart(): HasOne
    {
        return $this->hasOne(Cart::class);
    }

    public function wishlistItems(): HasMany
    {
        return $this->hasMany(WishlistItem::class);
    }

    public function deviceRegistrations(): HasMany
    {
        return $this->hasMany(DeviceRegistration::class);
    }
}
