<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\IphoneModel;
use App\Models\ShopByStyle;
use App\Models\User;
use App\Models\BulkOrder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AdminController extends Controller
{
    public function coupons(): JsonResponse
    {
        return response()->json(Coupon::latest()->get());
    }

    public function storeCoupon(Request $r): JsonResponse
    {
        $c = Coupon::create($this->coupon($r));

        return response()->json($c, 201);
    }

    public function updateCoupon(Request $r, Coupon $coupon): JsonResponse
    {
        $coupon->update($this->coupon($r, true));

        return response()->json($coupon->refresh());
    }

    public function deleteCoupon(Coupon $coupon): JsonResponse
    {
        $coupon->delete();

        return response()->json(['message' => 'Coupon deleted successfully']);
    }

    public function role(Request $r, User $user): JsonResponse
    {
        $d = $r->validate(['is_admin' => 'required|boolean', 'is_super' => 'nullable|boolean']);
        abort_if($user->is_super && ! ($d['is_super'] ?? false), 422, 'The last super administrator cannot be demoted.');
        $user->forceFill($d)->save();

        return response()->json($user->makeHidden(['password', 'otp']));
    }

    public function createAdmin(Request $r): JsonResponse
    {
        $d = $r->validate(['name' => 'required|string', 'email' => 'required|email|unique:users,email', 'phone' => 'nullable|string|unique:users,phone', 'password' => 'required|string|min:8']);
        $u = User::forceCreate([...$d, 'password' => Hash::make($d['password']), 'is_admin' => true]);

        return response()->json($u->makeHidden('password'), 201);
    }

    public function resetPassword(Request $r): JsonResponse
    {
        $d = $r->validate(['user_id' => 'required|integer|exists:users,id', 'password' => 'required|string|min:8']);
        User::findOrFail($d['user_id'])->update(['password' => Hash::make($d['password'])]);

        return response()->json(['message' => 'Password reset successfully']);
    }

    public function storeIphone(Request $r): JsonResponse
    {
        $m = IphoneModel::create($r->validate(['name' => 'required|string|unique:iphone_models,name', 'image' => 'required|string']));

        return response()->json($m, 201);
    }

    public function updateIphone(Request $r, IphoneModel $model): JsonResponse
    {
        $model->update($r->validate(['name' => 'sometimes|string|unique:iphone_models,name,'.$model->id, 'image' => 'sometimes|string']));

        return response()->json($model->refresh());
    }

    public function deleteIphone(IphoneModel $model): JsonResponse
    {
        $model->delete();

        return response()->json(['message' => 'iPhone model deleted successfully']);
    }

    public function batchIphone(Request $r): JsonResponse
    {
        $rows = $r->validate(['items' => 'required|array', 'items.*.name' => 'required|string', 'items.*.image' => 'required|string'])['items'];
        foreach ($rows as $row) {
            IphoneModel::updateOrCreate(['name' => $row['name']], $row);
        }

        return response()->json(IphoneModel::all());
    }

    public function storeStyle(Request $r): JsonResponse
    {
        $s = ShopByStyle::create($this->style($r));

        return response()->json($s, 201);
    }

    public function updateStyle(Request $r, ShopByStyle $style): JsonResponse
    {
        $style->update($this->style($r, true));

        return response()->json($style->refresh());
    }

    public function deleteStyle(ShopByStyle $style): JsonResponse
    {
        $style->delete();

        return response()->json(['message' => 'Style deleted successfully']);
    }

    public function batchStyle(Request $r): JsonResponse
    {
        $rows = $r->validate(['items' => 'required|array'])['items'];
        ShopByStyle::query()->delete();
        foreach ($rows as $row) {
            ShopByStyle::create($row);
        }

        return response()->json(ShopByStyle::all());
    }
    public function bulkOrders(): JsonResponse
    {
    return response()->json(
        BulkOrder::latest()->get()
    );
    }
    private function coupon(Request $r, bool $p = false): array
    {
        $x = $p ? 'sometimes' : 'required';

        return $r->validate(['name' => "$x|string", 'code' => "$x|string|unique:coupons,code".($p ? ','.$r->route('coupon')->id : ''), 'discount_type' => "$x|in:flat,percentage", 'discount_value' => "$x|integer|min:0", 'min_order_amount' => 'nullable|integer|min:0', 'valid_till' => 'nullable|string', 'status' => 'nullable|in:Active,Inactive']);
    }

    private function style(Request $r, bool $p = false): array
    {
        $x = $p ? 'sometimes' : 'required';

        return $r->validate(['name' => "$x|string", 'search_term' => "$x|string", 'description' => 'nullable|string', 'image' => 'nullable|string']);
    }
}
