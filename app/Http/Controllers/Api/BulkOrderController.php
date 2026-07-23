<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BulkOrder;
use Illuminate\Http\Request;

class BulkOrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'mobile' => 'required|digits:10',
            'email' => 'required|email',
            'company_name' => 'nullable|regex:/^[A-Za-z ]+$/',
            'delivery_address' => 'required|string',
            'product_name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'requirements' => 'nullable|string',
        ]);

        $bulkOrder = BulkOrder::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Bulk order enquiry submitted successfully.',
            'data' => $bulkOrder
        ], 201);
    }
}