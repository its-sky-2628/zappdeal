<?php

namespace Tests\Unit;

use App\Services\SmsService;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SmsServiceTest extends TestCase
{
    public function test_it_uses_the_configured_ca_bundle_and_accepts_a_successful_gateway_response(): void
    {
        config([
            'services.sms.driver' => 'vas_multimedia',
            'services.sms.ca_bundle' => __FILE__,
            'services.sms.template' => 'OTP: %s',
        ]);
        Http::fake(['*' => Http::response('success')]);

        $this->assertTrue(app(SmsService::class)->sendOtp('919876543210', '123456'));

        Http::assertSent(fn ($request) => $request->data()['mobile'] === '9876543210'
            && $request->data()['message'] === 'OTP: 123456');
    }

    public function test_it_returns_false_when_the_gateway_connection_fails(): void
    {
        config(['services.sms.driver' => 'vas_multimedia']);
        Http::fake(fn () => throw new ConnectionException('TLS failure'));

        $this->assertFalse(app(SmsService::class)->sendOtp('9876543210', '123456'));
    }
}
