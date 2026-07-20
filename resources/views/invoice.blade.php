<!doctype html><html><head><meta charset="utf-8"><title>Invoice #{{ $order->id }}</title><style>body{font-family:Arial,sans-serif;color:#111;padding:32px}.row{display:flex;justify-content:space-between}.card{border:1px solid #ddd;border-radius:8px;padding:20px;margin-top:20px}table{width:100%;border-collapse:collapse}th,td{padding:10px;border-bottom:1px solid #ddd;text-align:left}</style></head><body>
<div class="row"><img src="/assets/logo.png" alt="ZappDeal" height="42"><h1>Invoice #ZD{{ $order->created_at?->format('Y') }}{{ str_pad($order->id,5,'0',STR_PAD_LEFT) }}</h1></div>
<div class="card"><p><strong>Customer:</strong> {{ $order->user->name }}</p><p><strong>Address:</strong> {{ $order->shipping_address }}</p><p><strong>Status:</strong> {{ $order->status }}</p></div>
<table><thead><tr><th>Product</th><th>Quantity</th><th>Unit price</th><th>Total</th></tr></thead><tbody>
@forelse($order->items as $item)<tr><td>{{ $item->product_name }}</td><td>{{ $item->quantity }}</td><td>₹{{ $item->unit_price }}</td><td>₹{{ $item->line_total }}</td></tr>@empty
<tr><td>{{ $order->product?->name }}</td><td>{{ $order->qty }}</td><td>₹{{ $order->product?->price }}</td><td>₹{{ $order->total }}</td></tr>@endforelse
</tbody></table><div class="card"><strong>Payable: ₹{{ $order->payable_amount ?? $order->total }}</strong></div>
</body></html>
