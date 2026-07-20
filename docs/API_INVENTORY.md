# API and public-interface inventory

All JSON validation errors use Laravel's standard `422` shape. Authentication failures return `401`, ownership lookups return `404`, and admin authorization failures return `403`. Existing successful payloads intentionally remain unwrapped because `app.js` and `admin.js` consume those legacy shapes.

## Public API

| Family | Endpoints |
|---|---|
| OTP/auth | `POST /api/register/send-otp`, `POST /api/register/verify-otp`, `POST /api/login`, `POST /api/login/verify-otp` |
| Catalog | `GET /api/products`, `GET /api/settings`, `GET /api/iphone-models`, `GET /api/shop-by-styles` |
| Reviews | `GET /api/reviews`, `GET/POST /api/products/{product}/reviews`, `POST/PATCH /api/reviews/{review}/like` |
| Coupons | `GET /api/coupons/validate` |
| Payments | `POST /api/payments/cashfree/webhook` |

## Authenticated customer API

`GET /api/user`, `PUT /api/user/profile`, `POST /api/logout`; order list/create/retry/address/cancel and invoice; address CRUD/default; referral summary; withdrawal list/create; payout-method CRUD/default; and customer image upload. The added compatibility endpoint is `POST /api/user/orders/{order}/cancel` and enforces ownership plus Pending/Payment Pending status.

## Admin API

Admin middleware protects product/settings CRUD, users, order/status management, wallets, withdrawals, coupons, reviews, uploads, iPhone models, styles, and trigger-mail controls. Super-admin middleware additionally protects role changes, admin creation, and password reset. Run `php artisan route:list --path=api` for the authoritative method/middleware table.

## Web/SEO compatibility

- `/`, `/admin`, `/ref/{code}`, product/category routes and other storefront paths
- `/reviews.php`, `/payment-response.php`, `/orders/invoice`, `/sitemap.xml`
- `/uploads/*`, `/assets/*`, `/app.js`, `/admin.js`, and existing CSS paths

## Contract examples

Existing token restoration:

```http
Authorization: Bearer {token-id}|{plain-token}
GET /api/user
```

Order creation ignores client totals and recalculates the payable server-side:

```json
{"product_id": 15, "quantity": 2, "shipping_address": "...", "coupon_code": "SAVE10", "use_wallet": true, "payment_method": "COD"}
```

Cashfree webhooks require the raw body signature headers. A unique Cashfree payment ID is persisted in `payment_attempts`; duplicate deliveries return `200` without processing the order twice.
