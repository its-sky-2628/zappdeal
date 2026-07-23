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
    ]);

        $bulkOrder = BulkOrder::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Bulk order enquiry submitted successfully.',
            'data' => $bulkOrder
        ], 201);
    }
}