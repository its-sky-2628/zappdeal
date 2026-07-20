# ZappDeal Laravel 13 backend

This directory is the staging-ready replacement for the legacy PHP application. It preserves the current storefront/admin assets and legacy `/api/*` contracts while moving business logic to Laravel controllers, models, policies/middleware, services, jobs, mailables, and idempotent migrations. The legacy application outside this directory is intentionally unchanged for rollback and contract comparison. The React Native project is out of scope for this phase.

## Requirements

- PHP 8.3 or newer with `pdo_mysql`, `mbstring`, `openssl`, `fileinfo`, `curl`, `intl`, and `zip`
- Composer 2.8+
- MySQL 8 or compatible Hostinger MySQL
- A cron entry and a long-running queue worker (or Hostinger cron-based queue processing)

## Local setup

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --force
php artisan storage:link
php artisan serve
```

Point `DB_*` at a backup/sanitized copy of the existing database. The adoption migration creates tables only on a fresh database and only adds missing compatibility/security columns on an existing database. Its rollback is deliberately a no-op.

Run verification with:

```bash
php artisan route:list
php artisan test
vendor/bin/pint --test
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

On this Windows development machine SQLite is not enabled globally, so the equivalent contract-test command is `php -d extension=pdo_sqlite vendor/bin/phpunit`.

See [docs/API_INVENTORY.md](docs/API_INVENTORY.md) and [docs/HOSTINGER_STAGING.md](docs/HOSTINGER_STAGING.md).
