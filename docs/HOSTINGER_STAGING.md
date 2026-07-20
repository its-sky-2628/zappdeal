# Hostinger staging and cutover runbook

## Before staging

1. Confirm Hostinger offers PHP 8.3+ and enable the required PHP extensions.
2. Export the current MySQL database and archive the current web files. Test restoring both backups.
3. Create a separate staging database/user and import a sanitized production copy.
4. Deploy this directory outside `public_html`; make `laravel/public` the staging document root. If document-root changes are unavailable, place only the contents of `public/` in `public_html` and adjust its `index.php` paths to the parent Laravel directory. Never expose `.env`, `vendor`, `storage`, or the legacy PHP scripts.
5. Copy existing `uploads/` into `public/uploads/` (or mount/share the same directory) without changing filenames. Static assets are already in `public/assets`.

## Configure and deploy

```bash
composer install --no-dev --classmap-authoritative
php artisan key:generate
php artisan migrate --force
php artisan storage:link
php artisan optimize
```

Set production-safe `.env` values: `APP_ENV=production`, `APP_DEBUG=false`, HTTPS `APP_URL`, MySQL, database cache/session, database queue, SMTP, SMS, and Cashfree keys. Start with `CASHFREE_MODE=sandbox`. Never put service secrets in JavaScript or committed files.

Storage paths `storage/` and `bootstrap/cache/` must be writable by PHP. Run a worker such as `php artisan queue:work --sleep=3 --tries=3 --timeout=120`. If Hostinger cannot supervise a worker, schedule a short queue command appropriate to the hosting plan.

Cron (once per minute):

```cron
* * * * * cd /home/ACCOUNT/zappdeal && php artisan schedule:run >> /dev/null 2>&1
```

The scheduler dispatches deduplicated trigger-mail jobs. Confirm mail in staging before enabling production recipients.

## Staging checklist

- Test registration/login OTP and restoration of a pre-existing `{id}|{plain-token}` Sanctum token.
- Exercise storefront/admin CRUD and authorization with customer, admin, and super-admin accounts.
- Verify product images/uploads, addresses/defaults, reviews, coupons, COD, invoice, referrals, wallets, withdrawals, sitemap, canonical/product SEO, and trigger mail.
- In Cashfree sandbox, test success, failure, cancellation, retry, invalid signatures, and repeated webhooks. Confirm the backend status lookup—not browser callbacks—marks payment successful.
- Check `storage/logs/laravel.log` contains no credentials, OTP values, stack traces in HTTP responses, or customer secrets.
- Run tests and browser smoke tests at desktop and mobile widths before requesting a live maintenance window.

## Live cutover and rollback

Live cutover is deliberately not performed by this package. During an authorized maintenance window: enable maintenance mode, take fresh file/MySQL backups, deploy the tagged release, run idempotent migrations, warm caches, switch the document root, and perform health/payment checks before reopening traffic.

If acceptance fails, restore the prior Git/files release and the pre-cutover MySQL backup, then point the document root back. Do not rely on migration `down()` or leave legacy raw PHP publicly reachable. The adoption migration does not drop business data and its rollback is intentionally a no-op.
