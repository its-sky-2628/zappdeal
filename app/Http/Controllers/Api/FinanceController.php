<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserPayoutMethod;
use App\Models\Withdrawal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class FinanceController extends Controller
{
    public function wallets(): JsonResponse
    {
        return response()->json(User::select('id', 'name', 'email', 'phone', 'wallet_balance')->orderByDesc('wallet_balance')->get());
    }

    public function withdrawals(Request $r): JsonResponse
    {
        return response()->json($r->user()->withdrawals()->latest()->get());
    }

    public function storeWithdrawal(Request $r): JsonResponse
    {
        $d = $r->validate(['amount' => 'required|integer|min:1', 'method' => 'required|in:bank,upi', 'bank_name' => 'nullable|string', 'account_name' => 'nullable|string', 'account_number' => 'nullable|string', 'ifsc_code' => 'nullable|string', 'upi_qr_code' => 'nullable|string', 'upi_id' => 'nullable|string']);
        $w = DB::transaction(function () use ($r, $d) {
            $u = User::lockForUpdate()->findOrFail($r->user()->id);
            if ($u->wallet_balance < $d['amount']) {
                throw ValidationException::withMessages(['amount' => ['Insufficient wallet balance.']]);
            }$u->decrement('wallet_balance', $d['amount']);

            return $u->withdrawals()->create($d);
        });

        return response()->json($w, 201);
    }

    public function methods(Request $r): JsonResponse
    {
        return response()->json($r->user()->payoutMethods()->orderByDesc('is_default')->get());
    }

    public function storeMethod(Request $r): JsonResponse
    {
        $d = $this->methodData($r);
        $m = DB::transaction(function () use ($r, $d) {
            if (($d['is_default'] ?? false) || ! $r->user()->payoutMethods()->exists()) {
                $r->user()->payoutMethods()->update(['is_default' => false]);
            }

return $r->user()->payoutMethods()->create($d);
        });

        return response()->json($m, 201);
    }

    public function updateMethod(Request $r, UserPayoutMethod $method): JsonResponse
    {
        $this->owns($r, $method);
        $d = $this->methodData($r, true);
        DB::transaction(function () use ($r, $method, $d) {
            if ($d['is_default'] ?? false) {
                $r->user()->payoutMethods()->update(['is_default' => false]);
            }$method->update($d);
        });

        return response()->json($method->refresh());
    }

    public function deleteMethod(Request $r, UserPayoutMethod $method): JsonResponse
    {
        $this->owns($r, $method);
        $was = $method->is_default;
        $method->delete();
        if ($was) {
            $r->user()->payoutMethods()->latest()->first()?->update(['is_default' => true]);
        }

return response()->json(['message' => 'Payout method deleted successfully']);
    }

    public function defaultMethod(Request $r, UserPayoutMethod $method): JsonResponse
    {
        $this->owns($r, $method);
        DB::transaction(function () use ($r, $method) {
            $r->user()->payoutMethods()->update(['is_default' => false]);
            $method->update(['is_default' => true]);
        });

        return response()->json($method->refresh());
    }

    public function adminWithdrawals(): JsonResponse
    {
        return response()->json(Withdrawal::with('user:id,name,email,phone')->latest()->get());
    }

    public function updateWithdrawal(Request $r, Withdrawal $withdrawal): JsonResponse
    {
        $d = $r->validate(['status' => 'required|in:Pending,Approved,Rejected']);
        DB::transaction(function () use ($withdrawal, $d) {
            $fresh = Withdrawal::lockForUpdate()->findOrFail($withdrawal->id);
            if ($fresh->status === 'Rejected' && $d['status'] !== 'Rejected') {
                $fresh->user()->decrement('wallet_balance', $fresh->amount);
            }if ($fresh->status !== 'Rejected' && $d['status'] === 'Rejected') {
                $fresh->user()->increment('wallet_balance', $fresh->amount);
            }$fresh->update($d);
        });

        return response()->json($withdrawal->fresh());
    }

    private function methodData(Request $r, bool $partial = false): array
    {
        $p = $partial ? 'sometimes' : 'required';

        return $r->validate(['method' => "$p|in:bank,upi", 'bank_name' => 'nullable|string', 'account_name' => 'nullable|string', 'account_number' => 'nullable|string', 'ifsc_code' => 'nullable|string', 'upi_qr_code' => 'nullable|string', 'upi_id' => 'nullable|string', 'is_default' => 'nullable|boolean']);
    }

    private function owns(Request $r, UserPayoutMethod $m): void
    {
        abort_unless($m->user_id === $r->user()->id,404);
    }
}
