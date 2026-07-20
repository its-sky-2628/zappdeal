<?php

namespace App\Http\Controllers\Mobile;

use App\Models\UserAddress;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AddressController extends MobileController
{
    public function index(Request $request): JsonResponse
    {
        return $this->ok(['items' => $request->user()->addresses()->orderByDesc('is_default')->latest()->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->data($request);
        $address = DB::transaction(function () use ($request, $data) {
            if (($data['is_default'] ?? false) || ! $request->user()->addresses()->exists()) {
                $request->user()->addresses()->update(['is_default' => false]);
            }

return $request->user()->addresses()->create($data);
        });

        return $this->ok($address, 'Address created', 201);
    }

    public function update(Request $request, UserAddress $address): JsonResponse
    {
        $this->owns($request, $address);
        $data = $this->data($request, true);
        DB::transaction(function () use ($request, $address, $data) {
            if ($data['is_default'] ?? false) {
                $request->user()->addresses()->whereKeyNot($address->id)->update(['is_default' => false]);
            } $address->update($data);
        });

        return $this->ok($address->refresh(), 'Address updated');
    }

    public function destroy(Request $request, UserAddress $address): JsonResponse
    {
        $this->owns($request, $address);
        $default = $address->is_default;
        $address->delete();
        if ($default) {
            $request->user()->addresses()->latest()->first()?->update(['is_default' => true]);
        }

return $this->ok(null, 'Address deleted');
    }

    public function makeDefault(Request $request, UserAddress $address): JsonResponse
    {
        $this->owns($request, $address);
        DB::transaction(function () use ($request, $address) {
            $request->user()->addresses()->update(['is_default' => false]);
            $address->update(['is_default' => true]);
        });

        return $this->ok($address->refresh(), 'Default address updated');
    }

    private function owns(Request $request, UserAddress $address): void
    {
        abort_unless($address->user_id === $request->user()->id, 404);
    }

    private function data(Request $request, bool $partial = false): array
    {
        $r = $partial ? 'sometimes' : 'required';

        return $request->validate(['label' => "$r|string|max:50", 'name' => "$r|string|max:255", 'phone' => "$r|string|max:20", 'line' => "$r|string|max:1000", 'house_no' => 'nullable|string|max:100', 'area' => 'nullable|string|max:255', 'landmark' => 'nullable|string|max:255', 'city' => 'nullable|string|max:100', 'state' => 'nullable|string|max:100', 'pincode' => 'nullable|string|max:20', 'is_default' => 'nullable|boolean']);
    }
}
