<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsService
{
    public function sendOtp(string $phone, string $otp): bool
    {
        $driver = config('services.sms.driver', 'log');
        if ($driver === 'log') {
            Log::info('OTP dispatched using log driver', ['phone_suffix' => substr($phone, -4)]);

            return true;
        }

        if ($driver !== 'vas_multimedia') {
            Log::warning('Unsupported SMS driver', ['driver' => $driver]);

            return false;
        }

        $cleanPhone = substr(preg_replace('/\D/', '', $phone), -10);
        $request = Http::timeout(15);
        $caBundle = config('services.sms.ca_bundle');
        if (is_string($caBundle) && $caBundle !== '') {
            $request = $request->withOptions(['verify' => $caBundle]);
        }

        try {
            $response = $request->get('https://vas.themultimedia.in/domestic/sendsms/bulksms_v2.php', [
                'apikey' => config('services.sms.api_key'),
                'type' => 'TEXT',
                'sender' => config('services.sms.sender'),
                'entityId' => config('services.sms.entity_id'),
                'templateId' => config('services.sms.template_id'),
                'mobile' => $cleanPhone,
                'message' => sprintf(config('services.sms.template'), $otp),
            ]);
        } catch (ConnectionException $exception) {
            Log::error('SMS gateway request failed', [
                'exception' => $exception::class,
                'phone_suffix' => substr($cleanPhone, -4),
            ]);

            return false;
        }

        return $response->successful() && preg_match('/success|submitted|sent|ok|^[\da-f-]+$/i', trim($response->body()));
    }
}
