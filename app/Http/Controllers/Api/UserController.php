<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'id' => $user->id, 'name' => $user->name, 'email' => $user->email, 'phone' => $user->phone, 'is_admin' => (bool) $user->is_admin, 'is_super' => (bool) $user->is_super,
            'referral_code' => $user->referral_code, 'wallet_balance' => (int) $user->wallet_balance,
            'referrals_count' => Referral::where('user_id', $user->id)->where('status', 'Completed')->count(),
            'total_earnings' => (int) Referral::where('user_id', $user->id)->where('status', 'Completed')->sum('reward_amount'),
            'orders_count' => $user->orders()->count(),
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate(['name' => 'sometimes|string|max:255', 'email' => 'sometimes|nullable|email|max:255|unique:users,email,'.$request->user()->id, 'phone' => 'sometimes|nullable|string|max:20|unique:users,phone,'.$request->user()->id, 'password' => 'sometimes|nullable|string|min:8']);
        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        $request->user()->update($data);

        return response()->json(['message' => 'Profile updated successfully', 'user' => $request->user()->fresh()->makeHidden(['password', 'otp', 'otp_expires_at'])]);
    }

    public function addresses(Request $request): JsonResponse
    {
        return response()->json($request->user()->addresses()->orderByDesc('is_default')->orderByDesc('id')->get());
    }

    public function storeAddress(Request $request): JsonResponse
    {
        $data = $this->addressData($request);
        $address = DB::transaction(function () use ($request, $data) {
            if (($data['is_default'] ?? false) || ! $request->user()->addresses()->exists()) {
                $request->user()->addresses()->update(['is_default' => false]);
            }

return $request->user()->addresses()->create($data);
        });

        return response()->json($address, 201);
    }

    public function updateAddress(Request $request, UserAddress $address): JsonResponse
    {
        abort_unless($address->user_id === $request->user()->id, 404);
        $data = $this->addressData($request, true);
        DB::transaction(function () use ($request, $address, $data) {
            if ($data['is_default'] ?? false) {
                $request->user()->addresses()->whereKeyNot($address->id)->update(['is_default' => false]);
            }$address->update($data);
        });

        return response()->json($address->refresh());
    }

    public function deleteAddress(Request $request, UserAddress $address): JsonResponse
    {
        abort_unless($address->user_id === $request->user()->id, 404);
        $was = $address->is_default;
        $address->delete();
        if ($was) {
            $request->user()->addresses()->latest('id')->first()?->update(['is_default' => true]);
        }

return response()->json(['message' => 'Address deleted successfully']);
    }

    public function defaultAddress(Request $request, UserAddress $address): JsonResponse
    {
        abort_unless($address->user_id === $request->user()->id, 404);
        DB::transaction(function () use ($request, $address) {
            $request->user()->addresses()->update(['is_default' => false]);
            $address->update(['is_default' => true]);
        });

        return response()->json($address->refresh());
    }

    public function referrals(Request $request): JsonResponse
    {
        $rows = Referral::with('referredUser:id,name,email,phone')->where('user_id', $request->user()->id)->latest()->get();

        return response()->json($rows);
    }

    public function users(): JsonResponse
    {
        return response()->json(User::query()->latest()->get()->makeHidden(['password', 'otp', 'otp_expires_at', 'remember_token']));
    }

    public function deleteUser(User $user): JsonResponse
    {
        abort_if($user->is_super, 422, 'The super administrator cannot be deleted.');
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    private function addressData(Request $request, bool $partial = false): array
    {
        $p = $partial ? 'sometimes' : 'required';

        return $request->validate(['label' => "$p|string|max:255", 'name' => "$p|string|max:255", 'phone' => "$p|string|max:20", 'line' => "$p|string", 'house_no' => 'nullable|string|max:255', 'area' => 'nullable|string|max:255', 'landmark' => 'nullable|string|max:255', 'city' => 'nullable|string|max:255', 'state' => 'nullable|string|max:255', 'pincode' => 'nullable|string|max:20', 'is_default' => 'nullable|boolean']);
    }
}
