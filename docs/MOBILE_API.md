# Mobile API v1

Base path: `/api/mobile/v1`. Every response uses:

```json
{"success":true,"message":"OK","data":{},"errors":null}
```

Validation failures return HTTP 422 with field arrays in `errors`. Authentication uses Sanctum bearer tokens and authenticated routes return 401 when the token is missing, expired, or revoked.

## Endpoint families

- Auth: registration OTP, login OTP, verification, session, profile and logout.
- Catalog: composed home, validated/paginated product search/filter/sort, and product detail.
- Collections: cart CRUD/clear/guest merge and wishlist CRUD/guest merge.
- Addresses: CRUD and default selection with ownership checks.
- Checkout: authoritative preview and idempotent placement using `Idempotency-Key`.
- Payments: server-side Cashfree verification.
- Orders: paginated history and owned order details with immutable line snapshots.
- Startup: public settings, policy content, version gates, filters, and explicit capability flags.
- Engagement: product reviews, wallet/referral summaries, native Android device registration, invoices, cancellation, and payment retry.
- Privacy: confirmed account deletion anonymizes customer profile data, removes saved addresses/collections/devices, and retains required order/payment records.

Run `php artisan route:list --path=api/mobile/v1` for the complete method table. Prices are whole INR rupees. Product color/model choices are validated but are not independently priced variants.

### Checkout example

```http
POST /api/mobile/v1/checkout/place
Authorization: Bearer 15|plain-token
Idempotency-Key: 018fb902-4c4d-7bc0-9911-c15e66be7d22
Content-Type: application/json

{"address_id":7,"coupon_code":"SAVE10","use_wallet":true,"payment_method":"CASHFREE"}
```

The backend reloads and locks the cart, products, inventory and customer balance, recalculates every amount, creates `order_items`, applies coupon/wallet effects atomically, and returns a server-created Cashfree session when payment is required.

### Mobile additions

Public: `GET /startup`, `GET /search/suggestions`, and `GET /products/{product}/reviews`.

Authenticated: `DELETE /account`, order cancel/retry/invoice routes, review submission/likes, `GET /wallet`, `GET /referrals`, and `POST|DELETE /devices`. Device payloads contain `token`, Android `platform`, optional device name, and app version. Logout deactivates all device registrations for the customer.

Order payloads include `available_actions`; currently return and replace are always false. Startup capabilities similarly mark password recovery, full tracking history, notification inbox, independently priced variants, returns, and replacements unavailable until Laravel implements those business workflows.
