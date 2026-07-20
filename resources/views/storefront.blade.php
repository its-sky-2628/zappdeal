<!doctype html>
<html lang="en">
  <head>
    <script>
      window.APP_BASE_PATH = '/';
    </script>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5SBHR8ZF');</script>
    <!-- Microsoft Clarity -->
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "xiohedxs9k");
    </script>
    <!-- End Microsoft Clarity -->

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title><?= htmlspecialchars($seo_title) ?></title>
    <meta name="description" content="<?= htmlspecialchars($seo_description) ?>">
    <meta name="keywords" content="<?= htmlspecialchars($seo_keywords) ?>">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="<?= htmlspecialchars($currentUrl) ?>">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/assets/favicons/favicon.ico?v=<?= filemtime(public_path('assets/favicons/favicon.ico')) ?>">
    <link rel="apple-touch-icon" href="/assets/favicons/favicon.ico?v=<?= filemtime(public_path('assets/favicons/favicon.ico')) ?>">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="<?= $is_product_page ? 'product' : 'website' ?>">
    <meta property="og:title" content="<?= htmlspecialchars($seo_title) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($seo_description) ?>">
    <meta property="og:url" content="<?= htmlspecialchars($currentUrl) ?>">
    @if ($seo_image)
    <meta property="og:image" content="<?= htmlspecialchars($seo_image) ?>">
    @endif

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= htmlspecialchars($seo_title) ?>">
    <meta name="twitter:description" content="<?= htmlspecialchars($seo_description) ?>">
    @if ($seo_image)
    <meta name="twitter:image" content="<?= htmlspecialchars($seo_image) ?>">
    @endif

    <!-- Organization Schema -->
    @if (!$is_product_page && $category_name === '')
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org",
      "@type": "Organization",
      "name": "ZappDeal",
      "url": "<?= htmlspecialchars($appUrl) ?>/",
      "logo": "<?= htmlspecialchars($appUrl) ?>/assets/logo.png"
    }
    </script>
    @endif

    <!-- Product Schema -->
    @if ($is_product_page && $product)
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org/",
      "@type": "Product",
      "name": "<?= htmlspecialchars($product['name']) ?>",
      "image": "<?= htmlspecialchars($seo_image) ?>",
      "description": "<?= htmlspecialchars($seo_description) ?>",
      "brand": {
        "@type": "Brand",
        "name": "ZappDeal"
      },
      "offers": {
        "@type": "Offer",
        "url": "<?= htmlspecialchars($currentUrl) ?>",
        "priceCurrency": "INR",
        "price": "<?= htmlspecialchars($product['price']) ?>",
        "priceValidUntil": "<?= date('Y-12-31', strtotime('+1 year')) ?>",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "124",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "<?= htmlspecialchars($appUrl) ?>/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "iPhone Covers",
          "item": "<?= htmlspecialchars($appUrl) ?>/iphone-covers"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "<?= htmlspecialchars($product['name']) ?>",
          "item": "<?= htmlspecialchars($currentUrl) ?>"
        }
      ]
    }
    </script>
    @endif

    <!-- Preconnect to Google Fonts CDN -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Preload Inter font for fast LCP -->
    <link rel="preload" href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2" as="font" type="font/woff2" crossorigin>
    <!-- Inter font from Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.min.css?v=<?= filemtime(public_path('styles.min.css')) ?>">
    @if ($pixelId = env('META_PIXEL_ID'))
    <!-- Meta Pixel Code -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '<?= $pixelId ?>');
      fbq('track', 'PageView');
    </script>
    <noscript>
      <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=<?= $pixelId ?>&ev=PageView&noscript=1"/>
    </noscript>
    <!-- End Meta Pixel Code -->
    @endif
  </head>
  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5SBHR8ZF"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div class="site-shell">
      <header class="desktop-header" aria-label="Site header">
        <a class="desktop-brand" href="/" data-nav="home" aria-label="ZappDeal home">
          <img src="/assets/logo.png?v=<?= filemtime(public_path('assets/logo.png')) ?>" alt="ZappDeal Logo" style="height: 38px; display: block; object-fit: contain;">
        </a>
        <nav class="desktop-nav" aria-label="Desktop navigation">
          <a href="/" data-nav="home">Home</a>
          <a href="/collections/all" data-nav="categories">Shop</a>
          <a href="/account/orders" data-nav="orders">Orders</a>
          <a href="/support" data-nav="support">Support</a>
        </nav>
        <label class="desktop-search">
          <span data-icon="search"></span>
          <input data-search-input type="search" placeholder="Search gadgets, brands, models..." aria-label="Search products">
        </label>
        <div class="desktop-actions">
          <button class="icon-btn" data-nav="wishlist" aria-label="Wishlist" style="position: relative;">
            <span data-icon="heart"></span>
            <b class="cart-badge" id="desktop-wishlist-badge" style="position: absolute; top: -5px; right: -5px; background: #ff5b67; color: white; font-size: 10px; font-weight: 800; min-width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(255, 91, 103, 0.4); display: none;">0</b>
          </button>
          <button class="icon-btn" data-nav="account" aria-label="Account"><span data-icon="user"></span></button>
          <button class="icon-btn" data-nav="cart" aria-label="Cart" style="position: relative;">
            <span data-icon="cart"></span>
            <b class="cart-badge" id="desktop-cart-badge" style="position: absolute; top: -5px; right: -5px; background: var(--cyan); color: #0f172a; font-size: 10px; font-weight: 800; min-width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px var(--cyan-glow); display: none;">0</b>
          </button>
        </div>
      </header>

      <main class="app-frame" aria-live="polite">
        <aside class="account-sidebar" id="account-sidebar"></aside>
        <section class="view" id="login-view" data-view="login"></section>
        <section class="view" id="signup-view" data-view="signup"></section>
        <section class="view is-active" id="home-view" data-view="home"></section>
        <section class="view" id="categories-view" data-view="categories"></section>
        <section class="view" id="search-view" data-view="search"></section>
        <section class="view" id="account-view" data-view="account"></section>
        <section class="view" id="referral-view" data-view="referral"></section>
        <section class="view" id="wallet-view" data-view="wallet"></section>
        <section class="view" id="orders-view" data-view="orders"></section>
        <section class="view" id="addresses-view" data-view="addresses"></section>
        <section class="view" id="payout-view" data-view="payout"></section>
        <section class="view" id="wishlist-view" data-view="wishlist"></section>
        <section class="view" id="recent-view" data-view="recent"></section>
        <section class="view" id="settings-view" data-view="settings"></section>
        <section class="view" id="cart-view" data-view="cart"></section>
        <section class="view" id="product-view" data-view="product"></section>
        <section class="view" id="support-view" data-view="support"></section>
        <section class="view" id="checkout-view" data-view="checkout"></section>
        <section class="view" id="thankyou-view" data-view="thankyou"></section>
        <section class="view" id="policy-view" data-view="policy"></section>


        <!-- Product Options Drawer (Sidebar) -->
        <div id="options-drawer" class="options-drawer" aria-hidden="true">
          <div class="drawer-overlay" data-close-drawer></div>
          <div class="drawer-panel">
            <div class="drawer-header">
              <h3>Select Options</h3>
              <button class="close-drawer-btn" data-close-drawer aria-label="Close options drawer">&times;</button>
            </div>
            <div class="drawer-body" id="options-drawer-body">
              <!-- Dynamically populated via JS -->
            </div>
          </div>
        </div>

        <!-- Image Lightbox (beside drawer) -->
        <div id="img-lightbox" class="img-lightbox" role="dialog" aria-label="Product image viewer" aria-modal="true">
          <div class="img-lightbox-card">
            <button class="img-lightbox-close" id="img-lightbox-close" aria-label="Close image viewer">&times;</button>
            <div class="img-lightbox-stage">
              <img id="img-lightbox-img" src="" alt="Product image" />
            </div>
            <div class="img-lightbox-nav">
              <button class="img-lightbox-arrow" id="img-lightbox-prev" aria-label="Previous image">&#8592;</button>
              <span class="img-lightbox-counter" id="img-lightbox-counter">1 / 1</span>
              <button class="img-lightbox-arrow" id="img-lightbox-next" aria-label="Next image">&#8594;</button>
            </div>
            <div class="img-lightbox-dots" id="img-lightbox-dots"></div>
          </div>
        </div>
      </main>

      <footer class="desktop-footer" aria-label="Footer">
        <div class="footer-grid">
          <div class="footer-about">
            <div class="footer-brand small" style="display: flex; align-items: center; gap: 10px;">
              <img src="/assets/logo.png?v=<?= filemtime(public_path('assets/logo.png')) ?>" alt="ZappDeal Logo" style="height: 30px; display: block; object-fit: contain;">
            </div>
            <p>Your one-stop destination for premium mobile accessories and smart gadgets.</p>
            <div class="social-row" aria-label="Social links">
              <a href="https://www.instagram.com/zappdeal_india/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" style="width: 15px; height: 15px; fill: currentColor;"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="https://www.facebook.com/zappdeal.india" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" style="width: 15px; height: 15px; fill: currentColor;"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
              </a>
            </div>
          </div>

          <nav class="footer-links" aria-label="Shop">
            <h2>Shop</h2>
            <a href="/collections/all" data-category="All">All Products</a>
            <a href="/collections/iphone-covers" data-category="Mobile">Mobile</a>
            <a href="/collections/laptop" data-category="Laptop">Laptop</a>
            <a href="/collections/television" data-category="Television">Television</a>
            <a href="/collections/radio" data-category="Radio">Radio</a>
            <a href="/collections/accessories" data-category="Accessories">Accessories</a>
          </nav>

          <nav class="footer-links" aria-label="Customer Service">
            <h2>Customer Service</h2>
            <a href="/account/orders" data-nav="orders">My Orders</a>
            <a href="/account/orders" data-nav="orders">Track Order</a>
            <a href="/policies/returns" data-policy="returns">Returns & Refunds</a>
            <a href="/policies/shipping" data-policy="shipping">Shipping Policy</a>
            <a href="/policies/returns" data-policy="returns">Warranty Policy</a>
            <a href="/policies/faq" data-policy="faq">FAQs</a>
          </nav>

          <nav class="footer-links" aria-label="Account">
            <h2>My Account</h2>
            <a href="/account" data-nav="account">My Account</a>
            <a href="/account/wishlist" data-nav="wishlist">Wishlist</a>
            <a href="/account/recent" data-nav="recent">Recently Viewed</a>
            <a href="/account/addresses" data-nav="addresses">Addresses</a>
            <a href="/account/wallet" data-nav="wallet">Wallet</a>
            <a href="/" data-logout>Logout</a>
          </nav>

          <nav class="footer-links" aria-label="Help and Support">
            <h2>Help & Support</h2>
            <a href="/support" data-nav="support">Help Center</a>
            <a href="/bulk-orders" data-nav="bulk-orders">Bulk Orders</a>
            <a href="/policies/contact" data-policy="contact">Contact Us</a>
            <a href="/policies/terms" data-policy="terms">Terms & Conditions</a>
            <a href="/policies/privacy" data-policy="privacy">Privacy Policy</a>
            <a href="/support" data-nav="support">About Us</a>
          </nav>

          <div class="footer-contact">
            <h2>Get In Touch</h2>
            <p><span class="round-icon" data-icon="mail"></span><span><a href="mailto:support@zappdeal.com" onclick="event.preventDefault(); if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){ window.location.href='mailto:support@zappdeal.com'; }else{ window.open('https://mail.google.com/mail/?view=cm&fs=1&to=support@zappdeal.com', '_blank'); }" target="_blank" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">support@zappdeal.com</a><small>We reply within 24 hours</small></span></p>
            <p><span class="round-icon" data-icon="pin"></span><span>209 2nd floor Evershine Mall, Malad, Chincholi Bunder, Malad West, Malad, Mumbai, Maharashtra 400064</span></p>
          </div>
        </div>

        <div class="footer-trust">
          <span><i data-icon="shield"></i> 100% Secure Payment</span>
          <span><i data-icon="truck"></i> Free Shipping</span>
          <span><i data-icon="refresh"></i> 7 Days Returns</span>
          <span><i data-icon="spark"></i> Premium Quality</span>
        </div>

        <div class="footer-bottom">
           <span>© 2026 ZappDeal. All Rights Reserved.</span>
          <span>Visa&nbsp;&nbsp; Mastercard&nbsp;&nbsp; UPI&nbsp;&nbsp; Paytm&nbsp;&nbsp; GPay</span>
          <div style="display: flex; gap: 15px; align-items: center;">
            <span>Managed by <a href="https://tcongsinfotech.com/index.html" target="_blank" style="color: inherit; text-decoration: none;">Tcongs Infotech</a></span>
            <span>India (IN)</span>
          </div>
        </div>
      </footer>
    </div>

    <nav class="bottom-nav" aria-label="Primary">
      <button class="nav-btn is-active" data-nav="home" aria-label="Home"><span data-icon="home"></span><small>Home</small></button>
      <button class="nav-btn" data-nav="search" aria-label="Search"><span data-icon="search"></span><small>Search</small></button>
      <button class="nav-btn nav-btn-earn" data-nav="referral" aria-label="Earn"><span data-icon="gift"></span><small>Earn ₹</small></button>
      <button class="nav-btn" data-nav="orders" aria-label="Orders"><span data-icon="box"></span><small>Orders</small></button>
      <button class="nav-btn" data-nav="account" aria-label="Account"><span data-icon="user"></span><small>Account</small></button>
    </nav>

    <!-- Purchase loading overlay -->
    <div id="purchase-loading-overlay" role="status" aria-live="polite" aria-label="Processing your order">
      <div class="purchase-spinner-ring"></div>
      <p class="purchase-loading-text">Placing your order…</p>
      <p class="purchase-loading-sub">Please don't close this page</p>
    </div>

    <div class="toast" id="toast" role="status" aria-live="polite"></div>
    <!-- Cashfree JS SDK v3 -->
    <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
    <script src="/app.js?v=<?= filemtime(public_path('app.js')) ?>"></script>
  </body>
</html>
