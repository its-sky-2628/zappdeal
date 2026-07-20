<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

abstract class MobileController extends Controller
{
    protected function ok(mixed $data = null, string $message = 'OK', int $status = 200): JsonResponse
    {
        return response()->json(['success' => true, 'message' => $message, 'data' => $data, 'errors' => null], $status);
    }
}
