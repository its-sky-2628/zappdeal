<?php

namespace App\Console\Commands;

use App\Services\TriggerMailService;
use Illuminate\Console\Command;

class SendTriggerMails extends Command
{
    protected $signature = 'zappdeal:send-trigger-mails';

    protected $description = 'Queue due customer re-engagement emails';

    public function handle(TriggerMailService $service): int
    {
        $result = $service->runDue();
        $this->line(json_encode($result));

        return $result['failed'] ? self::FAILURE : self::SUCCESS;
    }
}
