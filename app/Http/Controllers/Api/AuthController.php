<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use App\Models\User;
use App\Services\SmsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function registerOtp(Request $request, SmsService $sms): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20|unique:users,phone',
            'email' => 'required|email|max:255|unique:users,email',
            'referral_code' => 'nullable|string|exists:users,referral_code'
        ]);

        $data['phone'] = $this->phone($data['phone']);

        $otp = (string) random_int(100000, 999999);

        Cache::put(
            'signup_otp_' . $data['phone'],
            [...$data, 'otp_hash' => Hash::make($otp)],
            now()->addMinutes(5)
        );

        abort_unless(
            $sms->sendOtp($data['phone'], $otp),
            502,
            'Failed to send SMS OTP. Please try again.'
        );

        return response()->json([
            'message' => 'OTP sent to mobile number successfully',
            'phone'   => $data['phone'],
            'otp'     => app()->environment('local') ? $otp : null,
        ]);
    }

    public function verifyRegistration(Request $request): JsonResponse
    {
        $data = $request->validate([
            'phone' => 'required|string',
            'otp'   => 'required|digits:6'
        ]);

        $phone = $this->phone($data['phone']);

        $cached = Cache::get('signup_otp_' . $phone);

        if (!$cached || !Hash::check($data['otp'], $cached['otp_hash'])) {
            throw ValidationException::withMessages([
                'otp' => ['OTP is invalid or expired.']
            ]);
        }

        [$user, $token] = DB::transaction(function () use ($cached, $phone): array {
            $referrer = empty($cached['referral_code'])
                ? null
                : User::where('referral_code', strtoupper($cached['referral_code']))->first();

            $base = substr(
                strtoupper(preg_replace('/[^A-Z0-9]/i', '', $cached['name'])) ?: 'REF',
                0,
                8
            );

            do {
                $code = $base . random_int(10, 999);
            } while (User::where('referral_code', $code)->exists());

            $user = User::create([
                'name' => $cached['name'],
                'email' => $cached['email'],
                'phone' => $phone,
                'referral_code' => $code,
                'referred_by_id' => $referrer?->id
            ]);

            if ($referrer) {
                Referral::create([
                    'user_id' => $referrer->id,
                    'referred_user_id' => $user->id
                ]);
            }

            return [
                $user,
                $user->createToken('auth_token', ['*'], now()->addDays(90))->plainTextToken
            ];
        });

        Cache::forget('signup_otp_' . $phone);

        return response()->json([
            'access_token' => $token,
            'user' => $this->publicUser($user)
        ]);
    }
        public function login(Request $request, SmsService $sms): JsonResponse
    {
        if ($request->filled('email')) {
            $data = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string'
            ]);

            $user = User::where('email', $data['email'])->first();

            if (! $user || ! $user->password || ! Hash::check($data['password'], $user->password)) {
                abort(401, 'Invalid credentials');
            }

            return response()->json([
                'requires_otp' => false,
                'access_token' => $user->createToken('auth_token', ['*'], now()->addDays(90))->plainTextToken,
                'user' => $this->publicUser($user)
            ]);
        }

        $phone = $this->phone(
            $request->validate([
                'phone' => 'required|string'
            ])['phone']
        );

        $user = User::where('phone', $phone)->first();

        abort_unless(
            $user,
            404,
            'This phone number is not registered. Please sign up first.'
        );

        $otp = (string) random_int(100000, 999999);

        $user->forceFill([
            'otp' => Hash::make($otp),
            'otp_expires_at' => now()->addMinutes(5)
        ])->save();

        abort_unless(
            $sms->sendOtp($phone, $otp),
            502,
            'Failed to send SMS OTP. Please try again.'
        );

        return response()->json([
            'requires_otp' => true,
            'phone' => substr($phone, 0, 4) . '******' . substr($phone, -4),
            'phone_raw' => $phone,
            'otp' => app()->environment('local') ? $otp : null,
        ]);
    }

    public function verifyLogin(Request $request): JsonResponse
    {
        $data = $request->validate([
            'phone' => 'required|string',
            'otp' => 'required|digits:6'
        ]);

        $user = User::where('phone', $this->phone($data['phone']))->first();

        if (
            ! $user ||
            ! $user->otp ||
            ! $user->otp_expires_at?->isFuture() ||
            ! Hash::check($data['otp'], $user->otp)
        ) {
            throw ValidationException::withMessages([
                'otp' => ['OTP is invalid or expired.']
            ]);
        }

        $user->forceFill([
            'otp' => null,
            'otp_expires_at' => null
        ])->save();

        return response()->json([
            'access_token' => $user->createToken('auth_token', ['*'], now()->addDays(90))->plainTextToken,
            'user' => $this->publicUser($user)
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    private function phone(string $value): string
    {
        return preg_replace('/(?!^)\D/', '', trim($value));
    }

    private function publicUser(User $user): array
    {
        return $user
            ->makeHidden([
                'password',
                'remember_token',
                'otp',
                'otp_expires_at'
            ])
            ->toArray();
    }
}