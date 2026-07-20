<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Customer Reviews - <?= $productName ?> | ZappDeal</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/assets/favicons/favicon.ico?v=<?= filemtime(public_path('assets/favicons/favicon.ico')) ?>">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32-whitebg.png?v=<?= filemtime(public_path('assets/favicons/favicon-32x32-whitebg.png')) ?>">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16-whitebg.png?v=<?= filemtime(public_path('assets/favicons/favicon-16x16-whitebg.png')) ?>">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png?v=<?= filemtime(public_path('assets/favicons/apple-touch-icon.png')) ?>">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    
    <style>
      :root {
        --bg: #06090d;
        --bg-panel: rgba(255, 255, 255, 0.02);
        --line: rgba(255, 255, 255, 0.08);
        --text: #f3f4f6;
        --soft: #9ca3af;
        --muted: #6b7280;
        --cyan: #20dfbd;
        --orange: #f59e0b;
        --shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      }
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        background-color: var(--bg);
        background-image: radial-gradient(circle at 50% 50%, #131924 0%, #06090d 100%);
        background-attachment: fixed;
        color: var(--text);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        padding: 24px 16px;
        min-height: 100vh;
      }
      
      @media (max-width: 900px) {
        body {
          padding-top: 80px;
        }
      }
      
      .container {
        max-width: 680px;
        margin: 0 auto;
      }
      
      /* Back button style - Sticky on left side of viewport */
      .back-btn-container {
        position: fixed;
        left: 30px;
        top: 30px;
        z-index: 100;
      }
      
      .back-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--cyan);
        text-decoration: none;
        font-size: 13px;
        font-weight: 700;
        background: rgba(18, 22, 28, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 10px 16px;
        border-radius: 30px;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
      }
      
      .back-btn:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.2);
        color: #fff;
        transform: translateY(-2px);
      }
      
      @media (max-width: 900px) {
        .back-btn-container {
          left: 16px;
          top: 16px;
        }
      }
      
      /* Product Header Section */
      .product-bar {
        display: flex;
        align-items: center;
        gap: 16px;
        background: var(--bg-panel);
        border: 1px solid var(--line);
        border-radius: 16px;
        padding: 16px;
        margin-bottom: 24px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }
      
      .product-img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: #111;
      }
      
      .product-info {
        flex: 1;
        min-width: 0;
      }
      
      .product-title {
        font-size: 16px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .rating-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: var(--soft);
      }
      
      .stars {
        color: var(--orange);
        letter-spacing: -1px;
        font-size: 15px;
      }
      
      .rating-score {
        font-weight: 700;
        color: #fff;
      }
      
      /* Main Header */
      .header-title {
        font-size: 20px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #fff;
        margin-bottom: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .badge {
        font-size: 12px;
        background: rgba(32, 223, 189, 0.1);
        color: var(--cyan);
        padding: 4px 10px;
        border-radius: 20px;
        border: 1px solid rgba(32, 223, 189, 0.25);
      }
      
      /* Stack layout reviews */
      .reviews-stack {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 40px;
      }
      
      .review-card {
        background: rgba(255, 255, 255, 0.015);
        border: 1px solid var(--line);
        border-radius: 16px;
        padding: 20px;
        transition: transform 0.2s ease, border-color 0.2s ease;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .review-card:hover {
        border-color: rgba(255, 255, 255, 0.15);
        transform: translateY(-2px);
      }
      
      .review-header {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .avatar {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 13.5px;
        color: #fff;
      }
      
      .meta {
        flex: 1;
        min-width: 0;
      }
      
      .meta-top {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 2px;
      }
      
      .customer-name {
        font-size: 13.5px;
        font-weight: 700;
        color: #fff;
      }
      
      .verified-tag {
        font-size: 10px;
        font-weight: 700;
        background: rgba(32, 223, 189, 0.1);
        color: var(--cyan);
        padding: 1px 6px;
        border-radius: 4px;
        border: 1px solid rgba(32, 223, 189, 0.2);
      }
      
      .date {
        font-size: 11px;
        color: var(--muted);
      }
      
      .card-stars {
        color: var(--orange);
        font-size: 12.5px;
        letter-spacing: -0.5px;
      }
      
      .comment {
        font-size: 13.5px;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.85);
        word-break: break-word;
        white-space: pre-wrap;
      }
      
      .review-image {
        max-height: 140px;
        max-width: 100%;
        border-radius: 10px;
        object-fit: cover;
        border: 1px solid rgba(255, 255, 255, 0.1);
        align-self: flex-start;
      }
      
      .review-footer {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: var(--muted);
        border-top: 1px solid rgba(255, 255, 255, 0.04);
        padding-top: 10px;
      }
      
      .likes-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--soft);
        font-weight: 600;
      }
      
      .heart-icon {
        color: #ff5b67;
        font-size: 14px;
      }
      
      .empty-state {
        text-align: center;
        padding: 60px 20px;
        background: var(--bg-panel);
        border: 1px dashed var(--line);
        border-radius: 16px;
      }
      
      .empty-state p {
        color: var(--soft);
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Back Button -->
      <div class="back-btn-container">
        <a href="<?= htmlspecialchars($productUrl) ?>" class="back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Product
        </a>
      </div>

      <!-- Product Header Bar -->
      <div class="product-bar">
        <img class="product-img" src="<?= $productImage ?>" alt="<?= $productName ?>" onerror="this.src='/assets/dell-laptop.png'">
        <div class="product-info">
          <h1 class="product-title"><?= $productName ?></h1>
          <div class="rating-row">
            <span class="stars">
              <?php for ($i = 0; $i < 5; $i++): ?>
                <span style="color: <?= $i < round($avgScore) ? 'var(--orange)' : 'var(--line)' ?>;">★</span>
              <?php endfor; ?>
            </span>
            <span><strong class="rating-score"><?= $avgScore ?></strong> (<?= $totalReviews ?> reviews)</span>
          </div>
        </div>
      </div>
      
      <!-- Breakdown Summary Box -->
      <div class="reviews-summary-panel" style="margin-bottom: 24px; background: rgba(255,255,255,0.015); border: 1px solid var(--line); border-radius: 16px; padding: 20px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">
        <div class="reviews-overall-score" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 120px; flex: 1;">
          <h3 style="font-size: 48px; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 8px;"><?= $avgScore ?></h3>
          <div class="stars-rating" style="color: var(--orange); font-size: 18px; letter-spacing: -1px; margin-bottom: 6px;">
            <?php for ($i = 0; $i < 5; $i++): ?>
              <span style="color: <?= $i < round($avgScore) ? 'var(--orange)' : 'var(--muted)' ?>;">★</span>
            <?php endfor; ?>
          </div>
          <span style="font-size: 13px; color: var(--soft);"><?= $totalReviews ?> ratings</span>
        </div>
        
        <div class="reviews-distribution-list" style="flex: 2; min-width: 220px; display: flex; flex-direction: column; gap: 8px;">
          <?php foreach ([5, 4, 3, 2, 1] as $stars): ?>
            <?php
            $count = $distribution[$stars] ?? 0;
            $pct = $totalReviews ? round(($count / $totalReviews) * 100) : 0;
            ?>
            <div class="reviews-distribution-row" style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text);">
              <span style="min-width: 10px; font-weight: 600;"><?= $stars ?></span>
              <span style="color: var(--soft); font-size: 14px;">★</span>
              <div class="reviews-distribution-bar-bg" style="flex: 1; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; position: relative;">
                <div class="reviews-distribution-bar-fill" style="height: 100%; width: <?= $pct ?>%; background: linear-gradient(90deg, var(--orange), #ffb236); border-radius: 3px;"></div>
              </div>
              <span style="min-width: 35px; text-align: right; color: var(--soft);"><?= $pct ?>%</span>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
      
      <!-- Section Header -->
      <h2 class="header-title">
        <span>All Reviews</span>
        <span class="badge"><?= $totalReviews ?> Reviews</span>
      </h2>
      
      <!-- Reviews List Stack -->
      <div class="reviews-stack">
        <?php if ($totalReviews > 0): ?>
          <?php foreach ($reviews as $r): ?>
            <?php
            $avatarColors = ['#6366f1','#20dfbd','#ff5b67','#ffb800','#3b82f6','#a855f7','#f97316'];
            $colorIndex = (isset($r['customer_name']) ? ord($r['customer_name'][0] ?? 'A') : 0) % count($avatarColors);
            $avatarBg = $avatarColors[$colorIndex];
            
            $avatarChar = '?';
            if (!empty($r['avatar'])) {
                $avatarChar = htmlspecialchars($r['avatar']);
            } elseif (!empty($r['customer_name'])) {
                $avatarChar = htmlspecialchars(strtoupper($r['customer_name'][0]));
            }
            
            $rImage = '';
            if (!empty($r['product_image'])) {
                $rImage = htmlspecialchars(strpos($r['product_image'], 'http') === 0 ? $r['product_image'] : '/' . ltrim($r['product_image'], '/'));
            }
            ?>
            <div class="review-card">
              <div class="review-header">
                <div class="avatar" style="background: <?= $avatarBg ?>;"><?= $avatarChar ?></div>
                <div class="meta">
                  <div class="meta-top">
                    <span class="customer-name"><?= htmlspecialchars($r['customer_name'] ?? 'Anonymous') ?></span>
                    <?php if (!empty($r['verified']) && ($r['verified'] == 1 || $r['verified'] === true)): ?>
                      <span class="verified-tag">✓ Verified</span>
                    <?php endif; ?>
                  </div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="card-stars">
                      <?php for ($i = 0; $i < 5; $i++): ?>
                        <span style="color: <?= $i < ($r['rating'] ?? 5) ? 'var(--orange)' : 'rgba(255,255,255,0.08)' ?>;">★</span>
                      <?php endfor; ?>
                    </span>
                    <span class="date"><?= date('d M Y', strtotime($r['created_at'] ?? 'now')) ?></span>
                  </div>
                </div>
              </div>
              <p class="comment">&ldquo;<?= htmlspecialchars($r['comment'] ?? '') ?>&rdquo;</p>
              <?php if ($rImage !== ''): ?>
                <img class="review-image" src="<?= $rImage ?>" alt="Review attachment">
              <?php endif; ?>
              <div class="review-footer">
                <span class="likes-badge">
                  <span class="heart-icon">♥</span> <?= (int)($r['likes'] ?? 0) ?> people liked this review
                </span>
              </div>
            </div>
          <?php endforeach; ?>
        <?php else: ?>
          <div class="empty-state">
            <p>No reviews yet for this product.</p>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </body>
</html>
