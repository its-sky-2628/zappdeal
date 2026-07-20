<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TriggerMailDelivery;
use App\Services\TriggerMailService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TriggerMailController extends Controller
{
    public function show(TriggerMailService $s): JsonResponse
    {
        return response()->json($s->template());
    }

    public function update(Request $r, TriggerMailService $s): JsonResponse
    {
        return response()->json(['message' => 'Template saved successfully.', 'template' => $s->save($r->validate(['enabled' => 'nullable|boolean', 'interval_days' => 'nullable|integer|min:1', 'subject' => 'nullable|string|max:255', 'body_html' => 'nullable|string|max:50000']))]);
    }

    public function test(Request $r, TriggerMailService $s): JsonResponse
    {
        $email = $r->validate(['email' => 'required|email'])['email'];
        $sent = $s->send($email, ['name' => 'Test Customer'], ['delivery_key' => 'test_'.hash('sha256', $email.microtime()), 'delivery_type' => 'test']);

        return response()->json(['message' => $sent ? 'Test email queued successfully.' : 'Unable to queue test email.'], $sent ? 200 : 502);
    }

    public function deliveries(): JsonResponse
    {
        return response()->json(TriggerMailDelivery::latest()->limit(1000)->get());
    }

    public function send(Request $r, TriggerMailService $s): JsonResponse
    {
        $d = $r->validate(['email' => 'required|email', 'name' => 'nullable|string', 'order_id' => 'nullable|integer']);
        $sent = $s->send($d['email'], $d, ['delivery_key' => 'manual_'.hash('sha256', $d['email'].microtime()), 'delivery_type' => 'manual']);

        return response()->json(['message' => $sent ? 'Email queued successfully.' : 'Unable to queue email.'], $sent ? 200 : 502);
    }
}
