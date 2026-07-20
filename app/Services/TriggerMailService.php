<?php

namespace App\Services;

use App\Mail\TriggerMail;
use App\Models\Order;
use App\Models\SiteSetting;
use App\Models\TriggerMailDelivery;
use Illuminate\Support\Facades\Mail;

class TriggerMailService
{
    public function template(): array
    {
        $raw = SiteSetting::value('trigger_mail_template');
        $data = is_string($raw) ? json_decode($raw, true) : $raw;

        return array_merge(['enabled' => true, 'interval_days' => 90, 'subject' => 'We miss you at ZappDeal, {{name}}', 'body_html' => '<h1>Hello {{name}}</h1><p>It has been a while since your last ZappDeal order.</p>'], is_array($data) ? $data : []);
    }

    public function save(array $data): array
    {
        $template = array_merge($this->template(), $data);
        $template['body_html'] = strip_tags($template['body_html'], '<p><br><strong><b><em><i><h1><h2><h3><a><ul><ol><li>');
        $key = SiteSetting::keyColumn();
        SiteSetting::updateOrCreate([$key => 'trigger_mail_template'], ['value' => json_encode($template), 'updated_at' => now()]);

        return $template;
    }

    public function send(string $email, array $context, array $delivery): bool
    {
        $template = $this->template();
        $tokens = ['{{name}}' => $context['name'] ?? 'Customer', '{{email}}' => $email, '{{order_id}}' => (string) ($context['order_id'] ?? ''), '{{app_url}}' => config('app.url')];
        $subject = strtr($template['subject'], $tokens);
        $html = strtr($template['body_html'], $tokens);
        $key = $delivery['delivery_key'];
        $row = TriggerMailDelivery::firstOrCreate(['delivery_key' => $key], [...$delivery, 'recipient_email' => $email, 'status' => 'pending', 'attempts' => 0]);
        if ($row->status === 'sent') {
            return true;
        }try {
            Mail::to($email)->queue(new TriggerMail($subject, $html));
            $row->update(['status' => 'sent', 'attempts' => $row->attempts + 1, 'sent_at' => now(), 'error_message' => null]);

            return true;
        } catch (\Throwable $e) {
            $row->update(['status' => 'failed', 'attempts' => $row->attempts + 1, 'error_message' => 'Mail queue dispatch failed.']);
            report($e);

            return false;
        }
    }

    public function runDue(): array
    {
        $template = $this->template();
        if (! ($template['enabled'] ?? true)) {
            return ['sent' => 0, 'failed' => 0, 'skipped' => 0];
        }$days = max(1, (int) $template['interval_days']);
        $sent = 0;
        $failed = 0;
        $skipped = 0;
        $latest = Order::with('user')->whereNotNull('email')->whereNotIn('status', ['Cancelled', 'Failed', 'Payment Pending'])->orderByDesc('created_at')->get()->unique('user_id');
        foreach ($latest as $order) {
            $elapsed = $order->created_at?->diffInDays(now()) ?? 0;
            if ($elapsed < $days) {
                $skipped++;

                continue;
            }$cycle = (int) floor($elapsed / $days);
            $ok = $this->send($order->email ?: $order->user->email, ['name' => $order->user->name, 'order_id' => $order->id], ['delivery_key' => 'cycle_'.$order->user_id.'_'.$order->id.'_'.$cycle, 'delivery_type' => 'cycle', 'user_id' => $order->user_id, 'anchor_order_id' => $order->id, 'cycle_number' => $cycle]);
            $ok ? $sent++ : $failed++;
        }

return compact('sent','failed','skipped');
    }
}
