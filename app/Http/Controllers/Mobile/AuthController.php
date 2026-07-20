<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Api\AuthController as LegacyAuthController;
use App\Services\SmsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthController extends MobileController
{
    public function registerOtp(Request $request, SmsService $sms, LegacyAuthController $legacy): JsonResponse
    {
        return $this->legacy($legacy->registerOtp($request, $sms));
    }

    public function verifyRegistration(Request $request, LegacyAuthController $legacy): JsonResponse
    {
        return $this->legacy($legacy->verifyRegistration($request));
    }

    public function login(Request $request, SmsService $sms, LegacyAuthController $legacy): JsonResponse
    {
        return $this->legacy($legacy->login($request, $sms));
    }

    public function verifyLogin(Request $request, LegacyAuthController $legacy): JsonResponse
    {
        return $this->legacy($legacy->verifyLogin($request));
    }

    public function session(Request $request): JsonResponse
    {
        return $this->ok(['user' => $request->user()->fresh()]);
    }

    public function profile(Request $request): JsonResponse
    {
        $data = $request->validate(['name' => 'sometimes|string|max:255', 'email' => 'sometimes|nullable|email|max:255|unique:users,email,'.$request->user()->id]);
        $request->user()->update($data);

        return $this->ok(['user' => $request->user()->fresh()], 'Profile updated');
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->deviceRegistrations()->update(['active' => false]);
        $request->user()->currentAccessToken()->delete();

        return $this->ok(null, 'Logged out successfully');
    }

    public function deleteAccount(Request $request): JsonResponse
    {
        $request->validate(['confirm' => 'accepted']);
        DB::transaction(function () use ($request): void {
            $user = $request->user()->newQuery()->lockForUpdate()->findOrFail($request->user()->id);
            $suffix = $user->id.'-'.Str::lower(Str::random(10));
            $user->deviceRegistrations()->delete();
            $user->addresses()->delete();
            $user->payoutMethods()->delete();
            $user->wishlistItems()->delete();
            $user->cart?->delete();
            $user->tokens()->delete();
            $user->forceFill(['name' => 'Deleted customer', 'email' => "deleted-{$suffix}@invalid.local", 'phone' => null, 'password' => null, 'otp' => null, 'referral_code' => null, 'anonymized_at' => now()])->save();
        });

        return $this->ok(null, 'Account deleted');
    }

    private function legacy(JsonResponse $response): JsonResponse
    {
        return $this->ok($response->getData(true), $response->getData(true)['message'] ?? 'OK', $response->getStatusCode());
    }
}
