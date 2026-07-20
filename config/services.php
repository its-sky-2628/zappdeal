<?php

return [

    'sms' => [
        'driver' => env('SMS_DRIVER', 'log'),
        'api_key' => env('VAS_SMS_API_KEY'),
        'sender' => env('VAS_SMS_SENDER', 'ZPDEAL'),
        'entity_id' => env('VAS_SMS_ENTITY_ID'),
        'template_id' => env('VAS_SMS_TEMPLATE_ID'),
        'template' => env('VAS_SMS_MESSAGE_TEMPLATE', 'Your ZappDeal OTP is %s'),
        'ca_bundle' => env('SMS_CA_BUNDLE'),
    ],

    'cashfree' => [
        'app_id' => env('CASHFREE_APP_ID'),
        'secret' => env('CASHFREE_SECRET_KEY'),
        'mode' => env('CASHFREE_MODE', 'sandbox'),
        'base_url' => env('CASHFREE_MODE', 'sandbox') === 'production' ? 'https://api.cashfree.com' : 'https://sandbox.cashfree.com',
    ],

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

];
