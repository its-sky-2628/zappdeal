<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('device_registrations')) {
            Schema::create('device_registrations', function (Blueprint $table): void {
                $table->id();
                $this->addMatchingIdColumn($table, 'user_id', 'users');
                $table->string('token', 512)->unique();
                $table->string('platform', 20)->default('android');
                $table->string('device_name')->nullable();
                $table->string('app_version', 50)->nullable();
                $table->boolean('active')->default(true)->index();
                $table->timestamp('last_seen_at')->nullable();
                $table->timestamps();
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            });
        }
        if (! Schema::hasColumn('users', 'anonymized_at')) {
            Schema::table('users', fn (Blueprint $table) => $table->timestamp('anonymized_at')->nullable()->index());
        }
    }

    private function addMatchingIdColumn(Blueprint $table, string $column, string $referencedTable): mixed
    {
        $type = strtolower(Schema::getColumnType($referencedTable, 'id', true));
        $unsigned = str_contains($type, 'unsigned');

        return match (true) {
            str_contains($type, 'bigint') => $unsigned
                ? $table->unsignedBigInteger($column)
                : $table->bigInteger($column),
            str_contains($type, 'mediumint') => $unsigned
                ? $table->unsignedMediumInteger($column)
                : $table->mediumInteger($column),
            str_contains($type, 'smallint') => $unsigned
                ? $table->unsignedSmallInteger($column)
                : $table->smallInteger($column),
            str_contains($type, 'tinyint') => $unsigned
                ? $table->unsignedTinyInteger($column)
                : $table->tinyInteger($column),
            default => $unsigned
                ? $table->unsignedInteger($column)
                : $table->integer($column),
        };
    }

    public function down(): void
    {
        // Production adoption rollback uses the pre-cutover backup.
    }
};
