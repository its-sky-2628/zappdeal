
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>ZappDeal</title>
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/assets/favicons/favicon.ico?v=<?= filemtime(public_path('assets/favicons/favicon.ico')) ?>">
    <link rel="apple-touch-icon" href="/assets/favicons/favicon.ico?v=<?= filemtime(public_path('assets/favicons/favicon.ico')) ?>">

    <link rel="stylesheet" href="/styles.css?v=<?= filemtime(public_path('styles.css')) ?>">
    <link rel="stylesheet" href="/admin.css?v=<?= filemtime(public_path('admin.css')) ?>">
  </head>
  <body class="account-mode">
    <div id="login-container" style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: radial-gradient(circle at 50% 50%, #13191f, #06090d); color: white; padding: 20px;">
      <div class="panel" style="width: 100%; max-width: 400px; padding: 40px 30px; border-radius: 16px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #10f3ed, #0074d5); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px; box-shadow: 0 0 20px rgba(16, 243, 237, 0.35);">
            <svg viewBox="0 0 24 24" style="width: 32px; height: 32px; fill: black;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          </div>
          <h2 style="font-size: 24px; font-weight: 700; background: linear-gradient(to right, #ffffff, #8892b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">ZappDeal Admin TEST</h2>
          <p style="color: var(--muted); font-size: 14px; margin-top: 5px;">Sign in to manage ZappDeal</p>
        </div>
        <form id="admin-login-form" onsubmit="event.preventDefault(); handleLogin();">
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 13px; color: #8892b0; margin-bottom: 8px; font-weight: 500;">Email or Phone Number</label>
            <input type="text" id="login-identifier" placeholder="Enter email or phone number" required style="width: 100%; padding: 12px 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; font-size: 15px; outline: none; transition: border-color 0.2s;">
          </div>
          <div style="margin-bottom: 24px;">
            <label style="display: block; font-size: 13px; color: #8892b0; margin-bottom: 8px; font-weight: 500;">Password</label>
            <input type="password" id="login-password" placeholder="Enter password" required style="width: 100%; padding: 12px 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; font-size: 15px; outline: none; transition: border-color 0.2s;">
          </div>
          <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(90deg, #10f3ed, #0074d5); border: none; border-radius: 8px; color: black; font-size: 16px; font-weight: 700; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
            Sign In
          </button>
        </form>
      </div>
    </div>

    <div class="app-frame" id="admin-shell" style="display: none;">
      <aside class="account-sidebar" aria-label="Admin navigation">
        <div class="sidebar-profile">
          <div class="sidebar-avatar">A</div>
          <div class="sidebar-info">
            <h3 class="sidebar-name">Admin</h3>
            <p class="sidebar-email">admin@zappdeal.com</p>
          </div>
        </div>

        <nav class="side-nav">
          <button class="side-link is-active" data-panel="dashboard"><span data-icon="dashboard"></span>Dashboard TEST</button>
          <button class="side-link" data-panel="users"><span data-icon="users"></span>Customers</button>
          <button class="side-link" data-panel="payouts"><span data-icon="wallet"></span>Payouts <span class="nav-badge" id="payouts-nav-badge" style="display: none;">0</span></button>
          <button class="side-link" data-panel="orders"><span data-icon="orders"></span>Orders <span class="nav-badge" id="orders-nav-badge" style="display: none;">0</span></button>
          <button class="side-link" data-panel="products"><span data-icon="products"></span>Products</button>
          <button class="side-link" data-panel="categories"><span data-icon="grid"></span>Categories</button>
          <button class="side-link" data-panel="iphone-models"><span data-icon="phone"></span>iPhone Models</button>
          <button class="side-link" data-panel="shop-by-style"><span data-icon="grid"></span>Shop by Style</button>
          <button class="side-link" data-panel="coupons"><span data-icon="tag"></span>Coupons & Offers</button>
          <button class="side-link" data-panel="wallet"><span data-icon="wallet"></span>Wallet & Rewards <span class="nav-badge nav-badge--green" id="wallet-nav-badge" style="display: none;">0</span></button>
          <button class="side-link" data-panel="reviews"><span data-icon="star"></span>Reviews</button>
          <button class="side-link" data-panel="banner"><span data-icon="image"></span>Banner</button>
          <button class="side-link" data-panel="trigger-mail"><span data-icon="send"></span>Trigger Mail</button>
          <button class="side-link" id="email-template-nav" data-panel="email-template" style="display:none;"><span data-icon="mail"></span>Email Template</button>
          <button class="side-link" data-panel="settings"><span data-icon="settings"></span>Settings</button>
          <button class="side-link" data-panel="bulk-orders" id="bulk-orders-nav" style="display:none;"><span data-icon="box"></span>Bulk Orders</button>
          <button class="side-link logout-btn" onclick="adminLogout()"><span data-icon="close"></span>Logout</button>
        </nav>
      </aside>

      <div class="views-container">
        <div class="admin-header-bar" id="admin-mobile-header" style="display: flex; justify-content: space-between; align-items: center; padding: 20px 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 20px;">
          <div style="text-align: left;">
            <h1 id="admin-mobile-title" style="margin: 0; font-size: 24px; font-weight: 700; color: white;">Dashboard</h1>
            <div id="admin-breadcrumbs" style="font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 4px;">Dashboard</div>
          </div>
          <div id="admin-header-actions" style="display: flex; align-items: center; gap: 10px;"></div>
        </div>
        <div class="admin-content">
          <div id="panel-dashboard" class="admin-view is-active">
            <section class="metric-grid" aria-label="Dashboard metrics">
              <article class="metric-card purple">
                <span class="metric-icon" data-icon="users"></span>
                <small>Total Users</small>
                <strong id="dashboard-total-users">0</strong>
                <em>+18.6%</em>
                <span>vs Apr 1 - Apr 30</span>
              </article>
              <article class="metric-card blue">
                <span class="metric-icon" data-icon="bag"></span>
                <small>Total Orders</small>
                <strong id="dashboard-total-orders">0</strong>
                <em>+22.4%</em>
                <span>vs Apr 1 - Apr 30</span>
              </article>
              <article class="metric-card green">
                <span class="metric-icon rupee">Rs.</span>
                <small>Total Revenue</small>
                <strong id="dashboard-total-revenue">Rs.0</strong>
                <em>+28.7%</em>
                <span>vs Apr 1 - Apr 30</span>
              </article>
              <article class="metric-card orange">
                <span class="metric-icon" data-icon="pending"></span>
                <small>Pending Orders</small>
                <strong id="dashboard-pending-orders">0</strong>
                <em class="negative">-5.3%</em>
                <span>vs Apr 1 - Apr 30</span>
              </article>
              <article class="metric-card teal">
                <span class="metric-icon" data-icon="check"></span>
                <small>Delivered Orders</small>
                <strong id="dashboard-delivered-orders">0</strong>
                <em>+25.2%</em>
                <span>vs Apr 1 - Apr 30</span>
              </article>
              <article class="metric-card pink">
                <span class="metric-icon" data-icon="cart"></span>
                <small>Cart Abandoned</small>
                <strong id="dashboard-cart-abandoned">0</strong>
                <em>+12.8%</em>
                <span>vs Apr 1 - Apr 30</span>
              </article>
            </section>

        <section class="dashboard-grid">


          <article class="panel city-panel">
            <header class="panel-head">
              <h2>Users by City</h2>
            </header>
            <div class="donut-wrap">
              <div class="donut"><strong>25,689</strong><small>Total</small></div>
              <ul class="legend-list">
                <li><i class="mumbai"></i>Mumbai <span>28%</span></li>
                <li><i class="delhi"></i>Delhi <span>22%</span></li>
                <li><i class="bangalore"></i>Bangalore <span>18%</span></li>
                <li><i class="hyderabad"></i>Hyderabad <span>12%</span></li>
                <li><i class="chennai"></i>Chennai <span>9%</span></li>
                <li><i class="others"></i>Others <span>11%</span></li>
              </ul>
            </div>
          </article>

          <aside class="panel user-details">
            <header class="panel-head" style="display: flex; flex-direction: column; gap: 8px; align-items: stretch; height: auto; padding: 15px 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <h2 style="margin: 0; display: flex; align-items: center; gap: 8px;"><span data-icon="user"></span>User Details</h2>
                <button aria-label="Close" id="close-user-details" style="background: none; border: none; color: var(--muted); cursor: pointer; font-size: 18px;"><span data-icon="close"></span></button>
              </div>
              <select id="detail-user-select" style="width: 100%; padding: 8px; background: #12191f; color: white; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; font-size: 13px; outline: none; margin-top: 6px; cursor: pointer; font-family: inherit;">
                <option value="">-- Choose User --</option>
              </select>
            </header>
            <section class="detail-profile">
              <span class="large-avatar" id="detail-avatar">-</span>
              <div>
                <h3 id="detail-name-status">Loading...</h3>
                <p id="detail-contact-info">...</p>
                <small id="detail-user-id">User ID: ...</small>
                <small id="detail-registered">Registered: ...</small>
                <small>Last Login: N/A</small>
              </div>
            </section>
            <div class="detail-stats">
              <span><small>Total Orders</small><strong id="detail-total-orders">-</strong></span>
              <span><small>Total Spend</small><strong id="detail-total-spend">-</strong></span>
              <span><small>Wallet Balance</small><strong id="detail-wallet-balance">Rs.0</strong></span>
              <span><small>Reward Points</small><strong id="detail-reward-points">0</strong></span>
            </div>
            <section class="activity-block">
              <h3>User Activity</h3>
              <button class="is-active"><span data-icon="bag"></span>Order History</button>
              <button><span data-icon="clock"></span>Browsing History</button>
              <button id="detail-wishlist-btn"><span data-icon="heart"></span>Wishlist (12)</button>
              <button id="detail-cart-btn"><span data-icon="cart"></span>Cart History (4)</button>
              <button><span data-icon="search"></span>Search History</button>
              <button><span data-icon="target"></span>Reward History</button>
              <button><span data-icon="wallet"></span>Wallet Transactions</button>
            </section>
            <section class="quick-actions">
              <h3>Quick Actions</h3>
              <button><span data-icon="send"></span>Send Notification</button>
              <button><span data-icon="gift"></span>Add Reward Points</button>
              <button class="danger"><span data-icon="ban"></span>Block User</button>
            </section>
          </aside>

          <section class="panel users-panel">
            <header class="users-head">
              <div>
                <h2>All Users</h2>
                <span id="dashboard-total-users-sub">Total 25,689 users</span>
              </div>
              <label class="admin-search">
                <span data-icon="search"></span>
                <input type="search" placeholder="Search by name, mobile or email..." aria-label="Search users">
              </label>
              <button onclick="window.openUsersFilterPopover(this)"><span data-icon="filter"></span>Filter</button>
              <button onclick="window.openUsersMoreFiltersPopover(this)">More Filters <span data-icon="chevron"></span></button>
              <button class="export-btn-screenshot" onclick="window.exportUsersToExcel()"><span data-icon="download"></span>Export Excel</button>
            </header>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Total Orders</th>
                    <th>Total Spend</th>
                    <th>Status</th>
                    <th>Joined At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="users-table"></tbody>
              </table>
            </div>
          </section>
            </section>
          </div>

          <!-- Trigger Mail View -->
          <div id="panel-trigger-mail" class="admin-view">
            <div style="margin-bottom: 24px; display: flex; gap: 16px; justify-content: space-between; align-items: center; flex-wrap: wrap; background: rgba(30, 41, 59, 0.4); padding: 16px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); width: 100%; box-sizing: border-box;">
              <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <label style="font-size: 11px; font-weight: 700; color: #8892b0; text-transform: uppercase; letter-spacing: 0.5px;">Filter Days Since Purchase</label>
                  <div class="admin-search" style="width: 165px; height: 38px; display: inline-flex; align-items: center; gap: 8px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 0 12px; box-sizing: border-box;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #8892b0;">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <input type="number" id="trigger-mail-days-input" placeholder="Type days (e.g. 5)" min="0" style="width: 100%; color: white; background: transparent; border: 0; outline: 0; font-size: 13px; margin: 0; padding: 0;">
                  </div>
                </div>

                <div id="trigger-mail-automation-control" style="display:none; flex-direction:column; gap:6px;">
                  <label style="font-size:11px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:.5px;">Automatic Trigger</label>
                  <div style="display:flex;align-items:center;height:38px;border:1px solid rgba(139,92,246,.38);border-radius:8px;background:rgba(124,58,237,.08);overflow:hidden;box-sizing:border-box;">
                    <input type="number" id="trigger-mail-interval-days" value="90" min="1" max="3650" aria-label="Automatic trigger interval in days" style="width:72px;height:100%;padding:0 10px;color:white;background:transparent;border:0;outline:0;font-size:13px;font-weight:700;box-sizing:border-box;">
                    <span style="padding:0 9px;color:#a8b2c5;font-size:11px;border-left:1px solid rgba(139,92,246,.25);">days</span>
                    <button type="button" onclick="window.saveTriggerMailInterval()" style="align-self:stretch;padding:0 12px;border:0;border-left:1px solid rgba(139,92,246,.25);background:linear-gradient(135deg,#7c3aed,#4f46e5);color:white;font-size:11px;font-weight:800;cursor:pointer;">Save</button>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <label style="font-size: 11px; font-weight: 700; color: #8892b0; text-transform: uppercase; letter-spacing: 0.5px;">Search keyword</label>
                  <div class="admin-search" style="width: 240px; height: 38px; display: inline-flex; align-items: center; gap: 8px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 0 12px; box-sizing: border-box;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #8892b0;">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" id="trigger-mail-panel-search" placeholder="Search customer, item, email..." style="width: 100%; color: white; background: transparent; border: 0; outline: 0; font-size: 13px; margin: 0; padding: 0;">
                  </div>
                </div>
              </div>

              <div style="display: flex; align-items: flex-end; gap: 10px; margin-left: auto; flex-wrap: wrap; margin-top: 17px;">
                <button type="button" class="export-btn-screenshot" onclick="window.exportTriggerMailToExcel()"
                  style="padding: 10px 16px; font-size: 12px; background: rgba(255,255,255,0.02); color: #c4cdd6; border: 1px solid rgba(16, 243, 237, 0.25); border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s; height: 38px; box-sizing: border-box;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Export Excel
                </button>

                <button type="button" class="btn-teal" id="bulk-send-mail-btn" onclick="window.submitBulkTriggerMails()"
                  style="padding: 10px 18px; font-size: 12px; background: linear-gradient(90deg, #10f3ed, #0074d5); color: black; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s; box-shadow: 0 0 12px rgba(16, 243, 237, 0.25); height: 38px; box-sizing: border-box;">
                  <svg viewBox="0 0 24 24" aria-hidden="true" style="width:14px; height:14px; fill:currentColor;">
                    <path d="M2 17h20v2H2zm11-4V7h5l-6-6-5 6h4v6zm-9 2h16v2H4z" />
                  </svg>
                  Bulk Send Mail
                </button>
              </div>
            </div>

            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; padding: 0 4px;">
              <span id="trigger-mail-panel-count" style="color: #8892b0; font-size: 13px; font-weight: 600;"></span>
            </div>

            <div class="table-responsive" style="width: 100%; overflow-x: auto; background: #1e293b; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
              <table style="width: 100%; border-collapse: collapse; text-align: left; color: white; table-layout: auto;">
                <thead>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.25);">
                    <th style="padding: 10px 8px; font-size: 11px; font-weight: 700; color: #8892b0; width: 40px; text-align: center;">Sr. No.</th>
                    <th style="padding: 10px 8px; font-size: 11px; font-weight: 700; color: #8892b0; width: 100px;">Customer Name</th>
                    <th style="padding: 10px 8px; font-size: 11px; font-weight: 700; color: #8892b0; width: 140px;">Email Address</th>
                    <th style="padding: 10px 8px; font-size: 11px; font-weight: 700; color: #8892b0; width: 100px;">Mobile Number</th>
                    <th style="padding: 10px 8px; font-size: 11px; font-weight: 700; color: #8892b0; width: 140px;">Product Name</th>
                    <th style="padding: 10px 8px; font-size: 11px; font-weight: 700; color: #8892b0; width: 80px;">Order ID</th>
                    <th style="padding: 10px 8px; font-size: 11px; font-weight: 700; color: #8892b0; width: 85px;">Purchase Date</th>
                    <th style="padding: 10px 8px; font-size: 11px; font-weight: 700; color: #8892b0; width: 75px;">Days ago</th>
                    <th style="padding: 10px 8px; font-size: 11px; font-weight: 700; color: #8892b0; width: 80px;">Mail Status</th>
                    <th style="padding: 10px 8px; font-size: 11px; font-weight: 700; color: #8892b0; text-align: right; width: 80px;">Action</th>
                  </tr>
                </thead>
                <tbody id="trigger-mail-panel-table">
                </tbody>
              </table>
            </div>
          </div>

          <div id="panel-email-template" class="admin-view">
            <section class="panel trigger-template-panel">
              <div style="display:flex; justify-content:space-between; gap:16px; align-items:flex-start; flex-wrap:wrap; margin-bottom:22px;">
                <div>
                  <h2 style="margin:0 0 6px; color:white; font-size:20px;">Recurring Campaign Email</h2>
                  <p style="margin:0; color:#8892b0; font-size:13px;">This template is used for manual sends and the configured recurring campaign.</p>
                </div>
                <label style="display:flex; align-items:center; gap:9px; color:white; font-size:13px; font-weight:700; cursor:pointer;">
                  <input type="checkbox" id="trigger-template-enabled" style="width:18px;height:18px;accent-color:#10f3ed;"> Campaign enabled
                </label>
              </div>

              <div class="trigger-template-layout">
                <form id="trigger-template-form" onsubmit="event.preventDefault(); window.saveTriggerMailTemplate();" style="display:flex; flex-direction:column; gap:15px;">
                  <label style="display:block;color:#c4cdd6;font-size:12px;font-weight:700;">Subject
                    <input id="trigger-template-subject" required maxlength="255" style="display:block;width:100%;box-sizing:border-box;margin-top:7px;padding:11px 12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:white;outline:none;">
                  </label>
                  <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:7px;">
                      <label style="color:#c4cdd6;font-size:12px;font-weight:700;">Email body</label>
                      <div style="display:flex;gap:5px;">
                        <button type="button" onclick="document.execCommand('bold')" class="tab-btn" style="padding:5px 9px;"><strong>B</strong></button>
                        <button type="button" onclick="document.execCommand('italic')" class="tab-btn" style="padding:5px 9px;"><em>I</em></button>
                        <button type="button" onclick="document.execCommand('insertUnorderedList')" class="tab-btn" style="padding:5px 9px;">List</button>
                      </div>
                    </div>
                    <div id="trigger-template-body" contenteditable="true" role="textbox" aria-multiline="true" style="min-height:300px;max-height:440px;padding:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:10px;color:white;line-height:1.65;outline:none;overflow:auto;"></div>
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <label style="color:#c4cdd6;font-size:12px;font-weight:700;">CTA label
                      <input id="trigger-template-cta-label" required style="display:block;width:100%;box-sizing:border-box;margin-top:7px;padding:11px 12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:white;outline:none;">
                    </label>
                    <label style="color:#c4cdd6;font-size:12px;font-weight:700;">CTA URL
                      <input id="trigger-template-cta-url" required style="display:block;width:100%;box-sizing:border-box;margin-top:7px;padding:11px 12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:white;outline:none;">
                    </label>
                  </div>
                  <div style="padding:11px 12px;border-radius:8px;background:rgba(16,243,237,.06);color:#8da3b7;font-size:12px;line-height:1.6;">
                    Available placeholders: <code>{customer_name}</code>, <code>{product_name}</code>, <code>{order_id}</code>, <code>{shop_url}</code>
                  </div>
                  <div style="display:flex;gap:9px;flex-wrap:wrap;">
                    <button type="submit" class="btn-teal" style="border:0;padding:10px 18px;border-radius:8px;cursor:pointer;font-weight:700;">Save Template</button>
                    <button type="button" onclick="window.restoreDefaultTriggerTemplate()" class="tab-btn" style="padding:10px 16px;">Restore Defaults</button>
                  </div>
                </form>

                <div class="trigger-template-preview-column">
                  <div>
                    <div style="color:#c4cdd6;font-size:12px;font-weight:700;margin-bottom:7px;">Live preview</div>
                    <iframe id="trigger-template-preview" title="Trigger email preview"></iframe>
                  </div>
                  <div style="display:flex;gap:8px;">
                    <input type="email" id="trigger-template-test-email" placeholder="Test recipient email" style="flex:1;min-width:0;padding:10px 12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:white;outline:none;">
                    <button type="button" onclick="window.sendTriggerTemplateTest()" class="btn-teal" style="border:0;padding:10px 14px;border-radius:8px;cursor:pointer;font-weight:700;">Send Test</button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Users View -->
          <div id="panel-users" class="admin-view">
            <section class="metric-grid" aria-label="Customers metrics" style="margin: 20px 20px 0;">
              <article class="metric-card purple">
                <span class="metric-icon" data-icon="users"></span>
                <small>Total Customers</small>
                <strong id="users-total-users">25,689</strong>
                <em>+18.6%</em>
                <span>vs last month</span>
              </article>
              <article class="metric-card blue">
                <span class="metric-icon" data-icon="user"></span>
                <small>Active Customers</small>
                <strong id="users-active-users">21,542</strong>
                <em>+16.3%</em>
                <span>vs last month</span>
              </article>
              <article class="metric-card green">
                <span class="metric-icon" data-icon="user"></span>
                <small>New Customers</small>
                <strong id="users-new-users">1,245</strong>
                <em>+12.5%</em>
                <span>vs last month</span>
              </article>
              <article class="metric-card orange">
                <span class="metric-icon" data-icon="user"></span>
                <small>Inactive Customers</small>
                <strong id="users-inactive-users">3,147</strong>
                <em class="negative">-5.2%</em>
                <span>vs last month</span>
              </article>
            </section>
            <section class="panel users-panel" style="margin: 20px;">
              <header class="users-head">
                <div>
                  <h2>All Customers</h2>
                  <span id="users-panel-count"></span>
                </div>
                <div style="display:flex; gap:10px; align-items:center;">
                  <label class="admin-search">
                    <span data-icon="search"></span>
                    <input type="search" placeholder="Search by name, mobile or email..." id="users-panel-search">
                  </label>
                  <button onclick="window.openUsersFilterPopover(this)"><span data-icon="filter"></span>Filter</button>
                  <button onclick="window.openUsersMoreFiltersPopover(this)">More Filters <span data-icon="chevron"></span></button>
                  <button class="date-picker">01 May 2024 - 31 May 2024 <span data-icon="calendar"></span></button>
                </div>
              </header>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Mobile</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>Total Orders</th>
                      <th>Total Spend</th>
                      <th>Status</th>
                      <th>Joined At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody id="users-panel-table"></tbody>
                </table>
              </div>
              <div class="table-footer" id="users-panel-pagination"></div>
            </section>
          </div>

          <!-- Orders View -->
          <div id="panel-orders" class="admin-view">
            <section class="metric-grid" aria-label="Orders metrics" style="margin: 20px 20px 0;">
              <article class="metric-card purple">
                <span class="metric-icon" data-icon="orders"></span>
                <small>New Orders</small>
                <strong id="orders-total-count">0</strong>
                <em>+15.6%</em>
                <span>vs yesterday</span>
              </article>
              <article class="metric-card blue">
                <span class="metric-icon rupee">₹</span>
                <small>Order Amount</small>
                <strong id="orders-total-amount">₹0</strong>
                <em>+18.5%</em>
                <span>vs yesterday</span>
              </article>
              <article class="metric-card green">
                <span class="metric-icon" data-icon="check"></span>
                <small>COD Orders</small>
                <strong id="orders-cod-count">0</strong>
                <em>+12.4%</em>
                <span>vs yesterday</span>
              </article>
              <article class="metric-card orange">
                <span class="metric-icon" data-icon="pending"></span>
                <small>Online Orders</small>
                <strong id="orders-online-count">0</strong>
                <em>+10.3%</em>
                <span>vs yesterday</span>
              </article>
              <article class="metric-card pink">
                <span class="metric-icon" data-icon="users"></span>
                <small>Referral Orders</small>
                <strong id="orders-referral-count">0</strong>
                <em>+22.7%</em>
                <span>vs yesterday</span>
              </article>
            </section>
            <section class="panel users-panel" style="margin: 20px;">
              <div class="panel-subbar">
                <div class="filter-tabs" id="orders-filter-tabs">
                  <button class="tab-btn tab-btn-order is-active" data-filter="all">All</button>
                  <button class="tab-btn tab-btn-order" data-filter="COD">COD</button>
                  <button class="tab-btn tab-btn-order" data-filter="Online">Online</button>
                </div>
                <div style="display:flex; gap:10px; align-items:center;">
                  <label class="admin-search">
                    <span data-icon="search"></span>
                    <input type="search" placeholder="Search order ID, customer..." id="orders-panel-search">
                  </label>
                  <button onclick="window.openOrdersFilterPopover(this)"><span data-icon="filter"></span>Filter</button>
                </div>
              </div>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Product Name</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Referral Source</th>
                      <th>Order Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody id="orders-panel-table"></tbody>
                </table>
              </div>
              <div class="table-footer" id="orders-panel-pagination"></div>
            </section>
          </div>

          <!-- Products View -->
          <div id="panel-products" class="admin-view">
            <section class="metric-grid" aria-label="Products metrics" style="margin: 20px 20px 0;">
              <article class="metric-card purple">
                <span class="metric-icon" data-icon="products"></span>
                <small>Total Products</small>
                <strong>2,568</strong>
                <em>+12.5%</em>
                <span>vs last month</span>
              </article>
              <article class="metric-card blue">
                <span class="metric-icon" data-icon="check"></span>
                <small>Active Products</small>
                <strong>2,150</strong>
                <em>+10.3%</em>
                <span>vs last month</span>
              </article>
              <article class="metric-card orange">
                <span class="metric-icon" data-icon="pending"></span>
                <small>Out of Stock</small>
                <strong>258</strong>
                <em class="negative">-3.4%</em>
                <span>vs last month</span>
              </article>
              <article class="metric-card pink">
                <span class="metric-icon" data-icon="cart"></span>
                <small>Low Stock</small>
                <strong>160</strong>
                <em class="negative">-5.8%</em>
                <span>vs last month</span>
              </article>
            </section>
            <section class="panel users-panel" style="margin: 20px;">
              <header class="users-head">
                <div>
                  <h2>All Products</h2>
                  <span id="products-panel-count"></span>
                </div>
                <div style="display:flex; gap:10px; align-items:center;">
                  <label class="admin-search">
                    <span data-icon="search"></span>
                    <input type="search" placeholder="Search product name, SKU..." id="products-panel-search">
                  </label>
                  <button class="btn-teal" id="add-product-btn" onclick="openAddProductModal()"><span data-icon="plus">+</span> Add New Product</button>
                </div>
              </header>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Visible In</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody id="products-table"></tbody>
                </table>
              </div>
            </section>
          </div>

          <!-- Categories View -->
          <div id="panel-categories" class="admin-view">
            <div class="categories-grid">
              <section class="panel" style="margin:0;">
                <div class="table-wrap" style="padding:0;">
                  <table style="width:100%;">
                    <thead>
                      <tr>
                        <th>Category Name</th>
                        <th>Slug</th>
                        <th>Products</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody id="categories-panel-table"></tbody>
                  </table>
                </div>
              </section>
              <section class="panel" style="padding:20px; margin:0;">
                <h2 style="font-size:18px; font-weight:600; color:white; margin-bottom:20px;">Add New Category</h2>
                <form id="add-category-form" onsubmit="event.preventDefault(); handleAddCategory();">
                  <div style="margin-bottom:15px;">
                    <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Category Name</label>
                    <input type="text" id="cat-name" placeholder="Enter category name" required style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white;">
                  </div>
                  <div style="margin-bottom:15px;">
                    <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Slug</label>
                    <input type="text" id="cat-slug" placeholder="Enter slug (auto-generated)" required style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white;">
                  </div>
                  <div style="margin-bottom:15px;">
                    <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Parent Category (Optional)</label>
                    <select id="cat-parent" style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white;">
                      <option value="">Select parent category</option>
                      <option value="covers">Covers</option>
                      <option value="electronics">Electronics</option>
                    </select>
                  </div>
                  <div style="margin-bottom:15px;">
                    <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Category Image</label>
                    <div id="cat-image-drag-zone" style="border: 2px dashed rgba(139,92,246,0.35); border-radius: 8px; padding: 20px; text-align: center; background: rgba(255,255,255,0.02); cursor: pointer; transition: all 0.2s;">
                      <div style="font-size: 24px; margin-bottom: 4px;">📷</div>
                      <div style="color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 500;">Click to upload or <span style="color: var(--cyan); font-weight:700;">drag here</span></div>
                      <input type="file" id="cat-image-input" accept="image/*" style="display:none;">
                    </div>
                    <div id="cat-image-preview-wrap" style="display:none; margin-top:12px; position:relative;">
                      <img id="cat-image-preview" src="" alt="Category Preview" style="width:100%; border-radius:8px; border:1px solid rgba(255,255,255,0.1); max-height:150px; object-fit:cover;">
                      <button onclick="window.clearCategoryImage()" type="button" style="position:absolute; top:8px; right:8px; background:#ff5b67; border:none; color:white; width:26px; height:26px; border-radius:50%; cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center;">✕</button>
                    </div>
                  </div>
                  <div style="margin-bottom:20px; display:flex; align-items:center; justify-content:space-between;">
                    <span style="font-size:14px; color:#8892b0;">Status</span>
                    <label class="switch">
                      <input type="checkbox" id="cat-status" checked>
                      <span class="slider"></span>
                    </label>
                  </div>
                  <div style="display:flex; gap:10px;">
                    <button type="button" class="tab-btn" onclick="document.getElementById('add-category-form').reset();" style="flex:1; border:1px solid rgba(255,255,255,0.1); padding:10px; border-radius:6px; color:white;">Reset</button>
                    <button type="submit" class="btn-teal" style="flex:2; justify-content:center; padding:10px; border-radius:6px;">Add Category</button>
                  </div>
                </form>
              </section>
            </div>
          </div>

          <!-- iPhone Models View -->
          <div id="panel-iphone-models" class="admin-view">
            <section class="panel-subbar" style="display:flex; justify-content:space-between; align-items:center; margin: 20px 20px 0; border-bottom: none;">
              <div>
                <h2 style="font-size: 22px; font-weight: 700; color: white; margin: 0;">iPhone Models Management</h2>
                <p style="color: var(--muted); font-size: 13px; margin: 4px 0 0 0;">Customize the iPhone models displayed in the "Shop by iPhone Model" section on the home page. Add, remove, or change model images as needed.</p>
              </div>
            </section>

            <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 8px; padding: 12px 16px; margin: 16px 20px 0; font-size: 13px; color: var(--text);">
              💡 <strong>Image Size Guidelines:</strong> Square aspect ratio (1:1) is required. Ideal sizes are <strong>300x300 to 500x500 pixels</strong> (PNG format with transparent background is recommended for a perfect fit in both Mobile and Desktop views).
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px; align-items: start;">
              <!-- Add New Model -->
              <section class="panel" style="padding: 20px; border-radius: 12px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 16px;">
                <div>
                  <h3 style="font-size: 15px; font-weight: 700; color: white; margin: 0 0 4px 0;">Add New Model</h3>
                  <p style="font-size: 12px; color: var(--muted); margin: 0;">Select a predefined model or type a custom name.</p>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <label style="font-size: 12px; color: var(--muted); font-weight: 600;">Predefined Models</label>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                    <button type="button" onclick="window.addPredefinedModel('iPhone 17 Pro Max')" class="tab-btn" style="padding: 8px 12px; background: rgba(139,92,246,0.1); color: var(--cyan); border: 1px solid rgba(139,92,246,0.25); border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; text-align: left;">+ iPhone 17 Pro Max</button>
                    <button type="button" onclick="window.addPredefinedModel('iPhone 17 Pro')" class="tab-btn" style="padding: 8px 12px; background: rgba(139,92,246,0.1); color: var(--cyan); border: 1px solid rgba(139,92,246,0.25); border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; text-align: left;">+ iPhone 17 Pro</button>
                    <button type="button" onclick="window.addPredefinedModel('iPhone 17')" class="tab-btn" style="padding: 8px 12px; background: rgba(139,92,246,0.1); color: var(--cyan); border: 1px solid rgba(139,92,246,0.25); border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; text-align: left;">+ iPhone 17</button>
                    <button type="button" onclick="window.addPredefinedModel('iPhone 16 Series')" class="tab-btn" style="padding: 8px 12px; background: rgba(139,92,246,0.1); color: var(--cyan); border: 1px solid rgba(139,92,246,0.25); border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; text-align: left;">+ iPhone 16 Series</button>
                    <button type="button" onclick="window.addPredefinedModel('iPhone 15 Series')" class="tab-btn" style="padding: 8px 12px; background: rgba(139,92,246,0.1); color: var(--cyan); border: 1px solid rgba(139,92,246,0.25); border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; text-align: left;">+ iPhone 15 Series</button>
                    <button type="button" onclick="window.addPredefinedModel('iPhone 14')" class="tab-btn" style="padding: 8px 12px; background: rgba(139,92,246,0.1); color: var(--cyan); border: 1px solid rgba(139,92,246,0.25); border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; text-align: left;">+ iPhone 14</button>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.08);">
                  <label style="font-size: 12px; color: var(--muted); font-weight: 600;">Custom Model Name</label>
                  <input type="text" id="custom-model-input" placeholder="e.g. iPhone 13 Pro" style="padding: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; color: white; outline: none; font-size: 12px;">
                  
                  <label style="font-size: 12px; color: var(--muted); font-weight: 600; margin-top: 4px;">Model Image (Optional)</label>
                  <div style="display: flex; gap: 8px; align-items: center;">
                    <button type="button" onclick="document.getElementById('custom-model-image-file-input').click()" class="tab-btn" style="padding: 8px 12px; font-size: 11px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: white; cursor: pointer;">Upload Image</button>
                    <span id="custom-model-image-filename" style="font-size: 11px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 150px;">No file chosen</span>
                    <input type="file" id="custom-model-image-file-input" accept="image/*" style="display:none;" onchange="window.handleCustomModelImageSelect(event)">
                  </div>
                  
                  <button type="button" onclick="window.addCustomModel()" class="btn-teal" style="padding: 10px; font-size: 12px; font-weight: 700; border-radius: 6px; margin-top: 8px; border: none; background: var(--cyan); color: black;">Add Custom Model</button>
                </div>

                <button type="button" onclick="window.saveIphoneModels()" style="width: 100%; margin-top: 10px; padding: 12px; background: var(--cyan); color: black; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; box-shadow: 0 0 14px rgba(139,92,246,0.35); display: flex; align-items: center; justify-content: center; gap: 8px;">
                  💾 Save iPhone Models
                </button>
              </section>

              <!-- Currently Active Models -->
              <section class="panel" style="padding: 20px; border-radius: 12px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 16px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <h3 style="font-size: 15px; font-weight: 700; color: white; margin: 0;">Currently Active Models</h3>
                  <span id="iphone-models-panel-count" style="font-size:12px; color:var(--muted); font-weight:600;">(0 models)</span>
                </div>
                
                <div id="iphone-models-list" style="display: flex; flex-direction: column; gap: 8px; max-height: 400px; overflow-y: auto; padding-right: 4px;">
                  <span style="color: var(--muted); font-size: 12px; text-align: center; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 6px;">Loading models...</span>
                </div>

                <button type="button" onclick="window.clearAllModels()" style="width: 100%; padding: 10px; background: rgba(255,91,103,0.12); color: #ff5b67; border: 1px solid rgba(255,91,103,0.25); border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600;">Clear All Models</button>
                
                <!-- Hidden inputs for image upload -->
                <input type="file" id="model-image-file-input" accept="image/*" style="display:none;">
              </section>
            </div>
          </div>

          <!-- Shop by Style View -->
          <div id="panel-shop-by-style" class="admin-view">
            <section class="panel-subbar" style="display:flex; justify-content:space-between; align-items:center; margin: 20px 20px 0; border-bottom: none;">
              <div>
                <h2 style="font-size: 22px; font-weight: 700; color: white; margin: 0;">Shop by Style Management</h2>
                <p style="color: var(--muted); font-size: 13px; margin: 4px 0 0 0;">Customize the banners displayed in the "Shop by Style" section on the home page. Add, remove, or change style titles, search terms, descriptions, and images.</p>
              </div>
            </section>

            <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 8px; padding: 12px 16px; margin: 16px 20px 0; font-size: 13px; color: var(--text);">
              💡 <strong>Image Size Guidelines:</strong> Wide landscape orientation (approx. 5:1 aspect ratio) is recommended. Ideal dimensions are <strong>1200x240 pixels</strong> for Desktop and <strong>700x240 pixels</strong> for Mobile (PNG/JPG format).
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px; align-items: start;">
              <!-- Add New Style -->
              <section class="panel" style="padding: 20px; border-radius: 12px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 16px;">
                <div>
                  <h3 style="font-size: 15px; font-weight: 700; color: white; margin: 0 0 4px 0;">Add New Style</h3>
                  <p style="font-size: 12px; color: var(--muted); margin: 0;">Create a new style banner for the home page.</p>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <label style="font-size: 12px; color: var(--muted); font-weight: 600;">Style Name / Title</label>
                  <input type="text" id="style-name-input" placeholder="e.g. Clear Cases" style="padding: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; color: white; outline: none; font-size: 12px;">
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <label style="font-size: 12px; color: var(--muted); font-weight: 600;">Search Term (Triggered on click)</label>
                  <input type="text" id="style-search-input" placeholder="e.g. Clear" style="padding: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; color: white; outline: none; font-size: 12px;">
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <label style="font-size: 12px; color: var(--muted); font-weight: 600;">Style Image (Optional)</label>
                  <div style="display: flex; gap: 8px; align-items: center;">
                    <button type="button" onclick="document.getElementById('custom-style-image-file-input').click()" class="tab-btn" style="padding: 8px 12px; font-size: 11px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: white; cursor: pointer;">Upload Image</button>
                    <span id="custom-style-image-filename" style="font-size: 11px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 150px;">No file chosen</span>
                    <input type="file" id="custom-style-image-file-input" accept="image/*" style="display:none;" onchange="window.handleCustomStyleImageSelect(event)">
                  </div>
                </div>

                <button type="button" onclick="window.addStyleItem()" style="padding: 12px; font-size: 12px; font-weight: 700; border-radius: 6px; cursor: pointer; text-align: center; border: none; background: var(--cyan); color: black; font-family: inherit;">Add Style</button>

                <button type="button" onclick="window.saveShopByStyles()" style="width: 100%; margin-top: 10px; padding: 12px; background: var(--cyan); color: black; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; box-shadow: 0 0 14px rgba(139,92,246,0.35); display: flex; align-items: center; justify-content: center; gap: 8px;">
                  💾 Save Shop by Styles
                </button>
              </section>

              <!-- Currently Active Styles -->
              <section class="panel" style="padding: 20px; border-radius: 12px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 16px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <h3 style="font-size: 15px; font-weight: 700; color: white; margin: 0;">Currently Active Styles</h3>
                  <span id="shop-by-style-panel-count" style="font-size:12px; color:var(--muted); font-weight:600;">(0 styles)</span>
                </div>
                
                <div id="shop-by-style-list" style="display: flex; flex-direction: column; gap: 8px; max-height: 400px; overflow-y: auto; padding-right: 4px;">
                  <span style="color: var(--muted); font-size: 12px; text-align: center; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 6px;">Loading styles...</span>
                </div>

                <button type="button" onclick="window.clearAllStyles()" style="width: 100%; padding: 10px; background: rgba(255,91,103,0.12); color: #ff5b67; border: 1px solid rgba(255,91,103,0.25); border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600;">Clear All Styles</button>
                
                <!-- Hidden inputs for image upload -->
                <input type="file" id="style-image-file-input" accept="image/*" style="display:none;">
              </section>
            </div>
          </div>

          <!-- Coupons View -->
          <div id="panel-coupons" class="admin-view">
            <section class="metric-grid" aria-label="Coupons metrics" style="margin: 20px 20px 0;">
              <article class="metric-card purple">
                <span class="metric-icon" data-icon="tag"></span>
                <small>Total Coupons</small>
                <strong>85</strong>
                <em>+5.2%</em>
                <span>vs last month</span>
              </article>
              <article class="metric-card blue">
                <span class="metric-icon" data-icon="check"></span>
                <small>Active Coupons</small>
                <strong>32</strong>
                <em>+8.1%</em>
                <span>vs last month</span>
              </article>
              <article class="metric-card green">
                <span class="metric-icon" data-icon="users"></span>
                <small>Used Coupons</small>
                <strong>1,245</strong>
                <em>+18.7%</em>
                <span>vs last month</span>
              </article>
              <article class="metric-card orange">
                <span class="metric-icon rupee">₹</span>
                <small>Total Discount</small>
                <strong>₹2,48,560</strong>
                <em>+22.3%</em>
                <span>vs last month</span>
              </article>
            </section>
            <section class="panel users-panel" style="margin: 20px;">
              <header class="users-head">
                <div>
                  <h2>Coupons & Offers</h2>
                  <span id="coupons-panel-count"></span>
                </div>
                <div style="display:flex; gap:10px; align-items:center;">
                  <label class="admin-search">
                    <span data-icon="search"></span>
                    <input type="search" placeholder="Search coupon name or code..." id="coupons-panel-search">
                  </label>
                  <button class="btn-teal" id="add-coupon-btn" onclick="openCouponModal()"><span data-icon="plus">+</span> Create New Coupon</button>
                </div>
              </header>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Coupon Name</th>
                      <th>Coupon Code</th>
                      <th>Discount</th>
                      <th>Min. Order</th>
                      <th>Valid Till</th>
                      <th>Usage</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody id="coupons-panel-table"></tbody>
                </table>
              </div>
            </section>
          </div>

          <!-- Wallet View -->
          <div id="panel-wallet" class="admin-view">
            <section class="metric-grid" aria-label="Wallet metrics" style="margin: 20px 20px 0;">
              <article class="metric-card purple">
                <span class="metric-icon rupee">₹</span>
                <small>Total Wallet Balance</small>
                <strong id="wallet-metric-total-balance">₹0</strong>
                <span>Real-time DB balance</span>
              </article>
              <article class="metric-card blue">
                <span class="metric-icon">🎁</span>
                <small>Total Referral Rewards</small>
                <strong id="wallet-metric-total-rewards">₹0</strong>
                <span>Earned by referrers</span>
              </article>
              <article class="metric-card green">
                <span class="metric-icon">✅</span>
                <small>Successful Referrals</small>
                <strong id="wallet-metric-successful-referrals">0</strong>
                <span>Completed orders</span>
              </article>
              <article class="metric-card orange">
                <span class="metric-icon">⏳</span>
                <small>Pending Referrals</small>
                <strong id="wallet-metric-pending-referrals">0</strong>
                <span>Awaiting first purchase</span>
              </article>
            </section>
            <section class="panel users-panel" style="margin: 20px;">
              <div class="panel-subbar" style="display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; gap:10px; align-items:center;">
                  <input type="text" id="wallet-panel-search" placeholder="Search user, referral code..." oninput="renderWalletPanel()" style="padding:8px 12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none; font-size:13px; width:250px;">
                </div>
                <div id="wallet-panel-count" style="font-size:13px; color:#8892b0;">Showing 0 results</div>
              </div>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>User Details</th>
                      <th>Referral Code</th>
                      <th>Successful Referrals</th>
                      <th>Pending Referrals</th>
                      <th>Total Rewards Earned</th>
                      <th>Current Wallet Balance</th>
                      <th>Joined Date</th>
                    </tr>
                  </thead>
                  <tbody id="wallet-panel-table"></tbody>
                </table>
              </div>
            </section>
          </div>

          <!-- Payouts View -->
          <div id="panel-payouts" class="admin-view">
            <section class="metric-grid" aria-label="Payout metrics" style="margin: 20px 20px 0;">
              <article class="metric-card purple">
                <span class="metric-icon rupee">₹</span>
                <small>Total Requested Payouts</small>
                <strong id="payouts-metric-total-requested">₹0</strong>
                <span>All payout requests</span>
              </article>
              <article class="metric-card orange">
                <span class="metric-icon">⏳</span>
                <small>Pending Payouts</small>
                <strong id="payouts-metric-pending">₹0</strong>
                <span>Awaiting processing</span>
              </article>
              <article class="metric-card green">
                <span class="metric-icon">✅</span>
                <small>Approved Payouts</small>
                <strong id="payouts-metric-approved">₹0</strong>
                <span>Processed successfully</span>
              </article>
              <article class="metric-card red">
                <span class="metric-icon">❌</span>
                <small>Rejected Payouts</small>
                <strong id="payouts-metric-rejected">₹0</strong>
                <span>Cancelled or invalid</span>
              </article>
            </section>
            <section class="panel users-panel" style="margin: 20px;">
              <div class="panel-subbar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap: wrap; gap: 10px;">
                <div style="display:flex; gap:10px; align-items:center; flex-wrap: wrap;">
                  <input type="text" id="payouts-panel-search" placeholder="Search user..." oninput="renderPayoutsPanel()" style="padding:8px 12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none; font-size:13px; width:220px;">
                  <select id="payouts-panel-filter-status" onchange="renderPayoutsPanel()" style="padding:8px 12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none; font-size:13px; cursor:pointer;">
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <select id="payouts-panel-filter-method" onchange="renderPayoutsPanel()" style="padding:8px 12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none; font-size:13px; cursor:pointer;">
                    <option value="All">All Methods</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="upi">UPI QR Code</option>
                  </select>
                </div>
                <div id="payouts-panel-count" style="font-size:13px; color:#8892b0;">Showing 0 results</div>
              </div>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>User Details</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Payment details</th>
                      <th>Status</th>
                      <th>Requested Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="payouts-panel-table"></tbody>
                </table>
              </div>
            </section>
          </div>

          <!-- Reviews View -->
          <div id="panel-reviews" class="admin-view">
            <section class="metric-grid" aria-label="Reviews metrics" style="margin: 20px 20px 0;">
              <article class="metric-card purple">
                <span class="metric-icon">⭐</span>
                <small>Total Reviews</small>
                <strong id="reviews-total-count">0</strong>
                <span>All time</span>
              </article>
              <article class="metric-card blue">
                <span class="metric-icon">📈</span>
                <small>Average Rating</small>
                <strong id="reviews-avg-rating">0.0</strong>
                <span>Out of 5 stars</span>
              </article>
              <article class="metric-card green">
                <span class="metric-icon">✓</span>
                <small>Verified Purchases</small>
                <strong id="reviews-verified-count">0</strong>
                <span>Verified buyers</span>
              </article>
              <article class="metric-card orange">
                <span class="metric-icon">👁️</span>
                <small>Hidden Reviews</small>
                <strong id="reviews-hidden-count">0</strong>
                <span>Not visible on storefront</span>
              </article>
            </section>

            <section class="panel users-panel" style="margin: 20px;">
              <header class="users-head">
                <div>
                  <h2>Customer Reviews</h2>
                  <span id="reviews-panel-count">Manage ratings & feedback</span>
                </div>
                <div style="display:flex; gap:10px; align-items:center; flex-wrap: wrap;">
                  <label class="admin-search">
                    <span data-icon="search"></span>
                    <input type="search" placeholder="Search customer or text..." id="reviews-panel-search">
                  </label>
                  <select id="reviews-filter-stars" style="padding: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; color: white;">
                    <option value="all">All Stars</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                  <select id="reviews-filter-visibility" style="padding: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; color: white;">
                    <option value="all">All Status</option>
                    <option value="visible">Visible</option>
                    <option value="hidden">Hidden</option>
                  </select>
                  <button class="btn-teal" id="add-review-btn" onclick="openReviewModal();"><span data-icon="plus">+</span> Add Review</button>
                </div>
              </header>

              <!-- Reviews Layout Grid (Customer Review Cards) -->
              <div id="reviews-container-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; padding: 20px 0;">
                <!-- Review cards will be dynamically rendered here by admin.js -->
              </div>
          </div>

          <!-- Bulk Orders View -->
          <div id="panel-bulk-orders" class="admin-view">
            <div class="panel-subbar" style="display:flex; justify-content:space-between; align-items:center; margin: 20px 20px 0; border-bottom: none;">
              <div>
                <h2 style="font-size: 22px; font-weight: 700; color: white; margin: 0;">Bulk Order Requests</h2>
                <p style="color: var(--muted); font-size: 13px; margin: 4px 0 0 0;">Manage bulk / wholesale purchase requests submitted by customers.</p>
              </div>
            </div>

            <section class="metric-grid" aria-label="Bulk Orders metrics" style="margin: 20px 20px 0;">
              <article class="metric-card purple">
                <span class="metric-icon" data-icon="users"></span>
                <small>Total Requests</small>
                <strong id="bulk-orders-total">0</strong>
                <span>All time</span>
              </article>
              <article class="metric-card green">
                <span class="metric-icon" data-icon="check"></span>
                <small>Contacted</small>
                <strong id="bulk-orders-contacted">0</strong>
                <span>Followed up</span>
              </article>
              <article class="metric-card orange">
                <span class="metric-icon" data-icon="pending"></span>
                <small>Pending</small>
                <strong id="bulk-orders-pending">0</strong>
                <span>New inquiries</span>
              </article>
            </section>

            <section class="panel users-panel" style="margin: 20px;">
              <header class="users-head">
                <div>
                  <h2>All Bulk Order Requests</h2>
                  <span id="bulk-orders-panel-count">Manage customer inquiries</span>
                </div>
                <div style="display:flex; gap:10px; align-items:center; flex-wrap: wrap;">
                  <label class="admin-search">
                    <span data-icon="search"></span>
                    <input type="search" placeholder="Search name, email, phone..." id="bulk-orders-panel-search">
                  </label>
                </div>
              </header>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Company</th>
                      <th>Quantity</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody id="bulk-orders-panel-table">
                    <tr>
                      <td colspan="9" style="text-align: center; color: var(--muted); padding: 40px; font-style: italic;">
                        No bulk order requests yet. Customers will reach out via the Bulk Orders page.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <!-- Settings View -->
          <div id="panel-settings" class="admin-view">
            <section class="panel-subbar" style="display:flex; justify-content:space-between; align-items:center; margin: 20px 20px 0; border-bottom: none;">
              <div>
                <h2 style="font-size: 22px; font-weight: 700; color: white; margin: 0;">Settings & Administrators</h2>
                <p style="color: var(--muted); font-size: 13px; margin: 4px 0 0 0;">Manage administrative permissions and assign partnering administrators.</p>
              </div>
            </section>

            <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; padding: 20px;">
              
              <!-- Left Side: List of Current Admins -->
              <section class="panel" style="padding: 0; overflow: hidden; border-radius: 12px; border: 1px solid var(--line); display: flex; flex-direction: column;">
                <div class="admin-card-header" style="border-bottom: 1px solid var(--line); padding: 15px 20px;">
                  <h2 style="font-size: 16px; font-weight: 700; color: white; margin: 0;">Current Administrators</h2>
                </div>
                <div class="table-wrap" style="flex: 1;">
                  <table>
                    <thead>
                      <tr>
                        <th>Administrator Details</th>
                        <th>Role / Status</th>
                        <th style="text-align: right;">Action</th>
                      </tr>
                    </thead>
                    <tbody id="settings-admins-table">
                      <!-- Rendered dynamically by admin.js -->
                    </tbody>
                  </table>
                </div>
              </section>

              <!-- Right Side: Create Partnering Admin Form -->
              <section class="panel" style="padding: 20px; border-radius: 12px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 15px; height: fit-content;">
                <div class="admin-card-header" style="border-bottom: none; padding: 0; margin-bottom: 5px;">
                  <h2 style="font-size: 16px; font-weight: 700; color: white; margin: 0;">Invite Partnering Admin</h2>
                </div>
                <p style="color: var(--muted); font-size: 12px; margin: 0; line-height: 1.5;">
                  Create a new administrator account. The new administrator will receive an email containing their access credentials, the application URL, and temporary login password.
                </p>
                
                <form id="invite-admin-form" onsubmit="event.preventDefault(); window.submitAdminInvite();" style="display: flex; flex-direction: column; gap: 12px;">
                  <div style="display: flex; flex-direction: column; gap: 6px;">
                    <label for="new-admin-name" style="font-size: 12px; font-weight: 600; color: #8892b0;">Admin Full Name</label>
                    <input type="text" id="new-admin-name" placeholder="John Doe" required
                           style="width: 100%; padding: 10px 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; color: white; outline: none; font-size: 13px;">
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 6px;">
                    <label for="new-admin-email" style="font-size: 12px; font-weight: 600; color: #8892b0;">Email Address</label>
                    <input type="email" id="new-admin-email" placeholder="admin@domain.com" required
                           style="width: 100%; padding: 10px 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; color: white; outline: none; font-size: 13px;">
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 6px;">
                    <label for="new-admin-password" style="font-size: 12px; font-weight: 600; color: #8892b0;">Temporary Password</label>
                    <input type="password" id="new-admin-password" placeholder="••••••••" required minlength="6"
                           style="width: 100%; padding: 10px 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; color: white; outline: none; font-size: 13px;">
                  </div>

                  <button type="submit" class="btn-teal" style="width: 100%; justify-content: center; padding: 11px; font-size: 13px; margin-top: 10px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <span data-icon="plus"></span> Invite & Assign Admin
                  </button>
                </form>
              </section>

            </div>
          </div>
        </div>

          <!-- Banner Management Panel -->
          <div id="panel-banner" class="admin-view">
            <section class="panel-subbar" style="display:flex; justify-content:space-between; align-items:center; margin: 20px 20px 0; border-bottom: none;">
              <div>
                <h2 style="font-size: 22px; font-weight: 700; color: white; margin: 0;">Homepage Banners Management</h2>
                <p style="color: var(--muted); font-size: 13px; margin: 4px 0 0 0;">Create and manage multiple slides for the homepage hero carousel. Upload pre-made banners, add titles/descriptions, target product redirects, and customize CTAs.</p>
              </div>
            </section>

            <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 8px; padding: 12px 16px; margin: 16px 20px 0; font-size: 13px; color: var(--text);">
              💡 <strong>Image Size Guidelines:</strong>
              <ul style="margin: 4px 0 0 20px; padding: 0;">
                <li><strong>Desktop Banners:</strong> Ideal size is <strong>1920x600 pixels</strong> or <strong>1440x450 pixels</strong> (landscape orientation, approx. 3:1 aspect ratio).</li>
                <li><strong>Mobile Banners (Optional):</strong> Ideal size is <strong>800x600 pixels</strong> (landscape orientation, approx. 4:3 aspect ratio) or <strong>600x600 pixels</strong> (square) for optimal mobile layout fitting.</li>
              </ul>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 20px; padding: 20px; align-items: start;">
              <!-- Add New Banner Form -->
              <section class="panel" style="padding: 20px; border-radius: 12px; border: 1px solid var(--line);">
                <h3 style="font-size: 15px; font-weight: 700; color: white; margin: 0 0 16px 0;">Add Banner Images</h3>

                <!-- Banner Images Upload -->
                <div style="margin-bottom: 16px;">
                  <label style="font-size: 13px; color: var(--muted); font-weight: 600; display:block; margin-bottom:8px;">Banner Images</label>
                  <div id="hero-bg-drag-zone"
                       onclick="document.getElementById('hero-bg-file-input').click()"
                       style="border: 2px dashed rgba(139,92,246,0.35); border-radius: 10px; background: rgba(255,255,255,0.02); padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s;">
                    <div style="font-size: 24px; margin-bottom: 4px;">🖼️</div>
                    <div id="hero-bg-drag-text" style="color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 500;">Select multiple banner images or <span style="color: var(--cyan); font-weight:700;">drag here</span></div>
                    <input type="file" id="hero-bg-file-input" accept="image/*" multiple style="display:none;">
                  </div>
                  <div id="hero-bg-previews-grid" style="display: flex; gap: 12px; margin-top: 12px; flex-wrap: wrap; justify-content: flex-start;">
                    <!-- Dynamically populated image previews -->
                  </div>
                </div>

                <!-- Mobile Banner Images Upload -->
                <div style="margin-bottom: 16px;">
                  <label style="font-size: 13px; color: var(--muted); font-weight: 600; display:block; margin-bottom:8px;">Mobile Banner Images (Optional)</label>
                  <div id="add-mobile-bg-drag-zone"
                       onclick="document.getElementById('add-mobile-bg-file-input').click()"
                       style="border: 2px dashed rgba(139,92,246,0.35); border-radius: 10px; background: rgba(255,255,255,0.02); padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s;">
                    <div style="font-size: 24px; margin-bottom: 4px;">📱</div>
                    <div id="add-mobile-bg-drag-text" style="color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 500;">Select multiple mobile banner images or <span style="color: var(--cyan); font-weight:700;">drag here</span></div>
                    <input type="file" id="add-mobile-bg-file-input" accept="image/*" multiple style="display:none;">
                  </div>
                  <div id="add-mobile-bg-previews-grid" style="display: flex; gap: 12px; margin-top: 12px; flex-wrap: wrap; justify-content: flex-start;">
                    <!-- Dynamically populated image previews -->
                  </div>
                </div>

                <button id="save-banner-btn" onclick="window.addNewBannerSlide()" style="width:100%; margin-top:16px; padding:12px; background:var(--cyan); color:black; font-weight:700; border:none; border-radius:8px; cursor:pointer; font-size:14px; transition: all 0.2s; box-shadow: 0 0 14px rgba(139,92,246,0.35);">
                  💾 Save Banners
                </button>
              </section>

              <!-- Banners List & Preview -->
              <section class="panel" style="padding: 20px; border-radius: 12px; border: 1px solid var(--line); display:flex; flex-direction:column; gap:20px;">
                <div>
                  <h3 style="font-size: 15px; font-weight: 700; color: white; margin: 0 0 4px 0;">Active Banners</h3>
                  <p style="font-size:12px; color:var(--muted); margin:0;">Here are the active slides shown on the home page carousel.</p>
                </div>
                
                <div id="active-banners-list" style="display:flex; flex-direction:column; gap:12px; max-height: 400px; overflow-y: auto; padding-right: 4px;">
                  <!-- Active Banners List populated by JavaScript -->
                </div>

                <div>
                  <h3 style="font-size: 14px; font-weight: 700; color: white; margin: 10px 0 12px 0;">Live Preview</h3>
                  <div id="current-hero-display" style="border-radius:10px; border:1px solid rgba(255,255,255,0.08); overflow:hidden; background:rgba(255,255,255,0.03); min-height:200px; background-size: cover; background-position: center; background-repeat: no-repeat; position: relative; display: flex; align-items: center; justify-content: space-between; padding: 20px;">
                    <!-- Preview will be rendered here by JavaScript -->
                    <span style="color:var(--muted); font-size:13px;">No banner selected or added.</span>
                  </div>
                </div>

                <!-- Edit Slide Details Section -->
                <div id="banner-edit-section" style="display:none; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); flex-direction: column; gap: 12px;">
                  <h3 style="font-size: 15px; font-weight: 700; color: white; margin: 0 0 4px 0;">Edit Slide Details</h3>
                  <p style="font-size:12px; color:var(--muted); margin:0 0 10px 0;">Customize texts and assign a dedicated mobile banner image (visible on mobile only).</p>
                  
                  <input type="hidden" id="edit-banner-index">

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div>
                      <label style="font-size:12px; color:var(--muted); font-weight:600; display:block; margin-bottom:4px;">Badge</label>
                      <input type="text" id="edit-banner-badge" placeholder="e.g. NEW RELEASE" style="width:100%; padding:8px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:6px; outline:none; font-size:12px;">
                    </div>
                    <div>
                      <label style="font-size:12px; color:var(--muted); font-weight:600; display:block; margin-bottom:4px;">Title</label>
                      <input type="text" id="edit-banner-title" placeholder="e.g. CarbonShield MagCase" style="width:100%; padding:8px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:6px; outline:none; font-size:12px;">
                    </div>
                  </div>

                  <div>
                    <label style="font-size:12px; color:var(--muted); font-weight:600; display:block; margin-bottom:4px;">Subtitle / Description</label>
                    <textarea id="edit-banner-subtitle" placeholder="Description of the banner slide..." style="width:100%; height:60px; padding:8px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:6px; outline:none; font-size:12px; resize:none;"></textarea>
                  </div>

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div>
                      <label style="font-size:12px; color:var(--muted); font-weight:600; display:block; margin-bottom:4px;">CTA Text</label>
                      <input type="text" id="edit-banner-cta" placeholder="e.g. Shop Now" style="width:100%; padding:8px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:6px; outline:none; font-size:12px;">
                    </div>
                    <div>
                      <label style="font-size:12px; color:var(--muted); font-weight:600; display:block; margin-bottom:4px;">Banner Redirect URL</label>
                      <input type="text" id="edit-banner-redirect-url" placeholder="e.g. /#product?id=3 or external URL" style="width:100%; padding:8px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:6px; outline:none; font-size:12px;">
                    </div>
                  </div>

                  <!-- Desktop & Mobile Banner Images Edit Selector -->
                  <div style="margin-top: 8px; border-top: 1px solid rgba(255,255,255,0.04); padding-top: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <!-- Desktop Banner Image -->
                    <div>
                      <label style="font-size:12px; color:var(--muted); font-weight:600; display:block; margin-bottom:6px;">Desktop Banner Image</label>
                      <div style="display:flex; gap:12px; align-items:center;">
                        <div id="desktop-banner-drag-zone" style="flex:1; border: 2px dashed rgba(139,92,246,0.25); border-radius: 8px; background: rgba(255,255,255,0.02); padding: 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
                          <span id="desktop-banner-drag-text" style="color: rgba(255,255,255,0.7); font-size: 11px;">Change Desktop Banner</span>
                          <input type="file" id="desktop-banner-file-input" accept="image/*" style="display:none;">
                        </div>
                        <div id="desktop-banner-preview-wrap" style="display:none; position:relative; width:80px; height:50px; border-radius:6px; border:1px solid rgba(255,255,255,0.08); overflow:hidden;">
                          <img id="desktop-banner-preview" src="" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                      </div>
                    </div>

                    <!-- Mobile Banner Image -->
                    <div>
                      <label style="font-size:12px; color:var(--muted); font-weight:600; display:block; margin-bottom:6px;">Mobile Banner Image (Optional)</label>
                      <div style="display:flex; gap:12px; align-items:center;">
                        <div id="mobile-banner-drag-zone" style="flex:1; border: 2px dashed rgba(139,92,246,0.25); border-radius: 8px; background: rgba(255,255,255,0.02); padding: 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
                          <span id="mobile-banner-drag-text" style="color: rgba(255,255,255,0.7); font-size: 11px;">Upload Mobile Banner</span>
                          <input type="file" id="mobile-banner-file-input" accept="image/*" style="display:none;">
                        </div>
                        <div id="mobile-banner-preview-wrap" style="display:none; position:relative; width:80px; height:50px; border-radius:6px; border:1px solid rgba(255,255,255,0.08); overflow:hidden;">
                          <img id="mobile-banner-preview" src="" style="width:100%; height:100%; object-fit:cover;">
                          <button type="button" onclick="window.removeMobileBannerImage()" style="position:absolute; top:2px; right:2px; background:rgba(0,0,0,0.6); color:white; border:none; border-radius:50%; width:16px; height:16px; font-size:10px; cursor:pointer; display:flex; align-items:center; justify-content:center;">×</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button type="button" onclick="window.saveSelectedBannerDetails()" class="btn-teal" style="width:100%; margin-top:8px; justify-content:center; padding:10px; font-size:13px; font-weight:700;">
                    Update Slide Details
                  </button>
                </div>
              </section>
            </div>
          </div>

          </div>

        </div>
      </main>

      <div id="edit-modal" class="modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:999; align-items:center; justify-content:center; backdrop-filter: blur(4px);">
        <div class="panel" style="width: 500px; padding: 25px; max-height: 90vh; overflow-y: auto; border-radius: 16px; border: 1px solid var(--line-strong); box-shadow: var(--shadow);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="font-size: 20px; margin: 0; font-weight: 700; color: var(--cyan);">Manage Product</h2>
            <button onclick="document.getElementById('edit-modal').style.display='none'" style="padding: 6px 14px; border-radius: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: white; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s;">Cancel</button>
          </div>
          <input type="hidden" id="edit-id">
          
          <div style="margin-top: 12px;">
            <label style="font-size: 13px; color: var(--muted); font-weight: 600;">Product Name</label>
            <input type="text" id="edit-name" placeholder="e.g. Dell Inspiron" style="width:100%; padding:10px; margin-top:5px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:8px; outline:none;">
          </div>
          
          <div style="margin-top: 12px;">
            <label style="font-size: 13px; color: var(--muted); font-weight: 600; display: block; margin-bottom: 5px;">Product Thumbnail (Shown on list page)</label>
            <div id="thumbnail-drag-zone" style="border: 2px dashed rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 20px; text-align: center; background: rgba(255,255,255,0.02); color: #8892b0; cursor: pointer; transition: all 0.2s;">
              <div style="font-size: 24px; margin-bottom: 8px;">🖼️</div>
              <div id="thumbnail-drag-text" style="font-size: 13px; font-weight: 500;">Drag & drop thumbnail here, or <span style="color: var(--cyan);">browse</span></div>
              <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;">Supports PNG, JPG, JPEG, WEBP</div>
              <input type="file" id="thumbnail-file-input" accept="image/*" style="display: none;">
            </div>
            <div id="thumbnail-preview-wrap" style="display: none; margin-top: 10px; position: relative; width: 96px;">
              <img id="thumbnail-preview" src="" alt="Thumbnail preview" style="width: 96px; height: 96px; object-fit: cover; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(0,0,0,0.2);">
              <button type="button" id="thumbnail-remove-btn" style="position: absolute; top: 4px; right: 4px; width: 18px; height: 18px; border-radius: 50%; background: #ff5b67; border: none; color: white; font-size: 10px; font-weight: bold; cursor: pointer;">✕</button>
            </div>
          </div>
          
          <div style="margin-top: 12px; display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label style="font-size: 13px; color: var(--muted); font-weight: 600;">Selling Price (₹)</label>
              <input type="number" id="edit-price" placeholder="e.g. 199" style="width:100%; padding:10px; margin-top:5px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:8px; outline:none;">
            </div>
            <div style="flex: 1;">
              <label style="font-size: 13px; color: var(--muted); font-weight: 600;">Original Price (Slashed ₹)</label>
              <input type="number" id="edit-old-price" placeholder="e.g. 1399" style="width:100%; padding:10px; margin-top:5px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:8px; outline:none;">
            </div>
          </div>

          <div style="margin-top: 12px; display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label style="font-size: 13px; color: var(--muted); font-weight: 600;">Category</label>
              <select id="edit-category" style="width:100%; padding:10px; margin-top:5px; background:rgba(18, 25, 31, 0.98); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:8px; outline:none;">
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Audio">Audio</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          <!-- Product Image Variants (Model & Color) -->
          <div style="margin-top: 16px; padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px;">
            <label style="font-size: 14px; color: var(--cyan); font-weight: 700; display: block; margin-bottom: 4px;">📸 Product Image Variants</label>
            <div style="font-size: 11px; color: rgba(255,255,255,0.45); margin-bottom: 12px;">Upload different images for different model and color combinations. The first variant's image will automatically be used as the product cover image.</div>

            <div id="variants-list-container" style="display: flex; flex-direction: column; gap: 12px;">
              <!-- Dynamic variant rows rendered by admin.js -->
            </div>

            <button type="button" onclick="window.addNewVariantRow()" class="btn-teal" style="width: 100%; margin-top: 12px; padding: 10px; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px; background: rgba(16,243,237,0.15); color: var(--cyan); border: 1px dashed var(--cyan); border-radius: 8px; cursor: pointer;">
              ➕ Add More Model & Color
            </button>
          </div>

          <div style="margin-top: 12px;">
            <label style="font-size: 13px; color: var(--muted); font-weight: 600;">Product Video (9:16 Vertical Video)</label>
            <div style="display: flex; gap: 10px; margin-top: 5px; flex-direction: column;">
              <div id="video-drag-zone" style="border: 2px dashed rgba(255,255,255,0.15); border-radius: 8px; padding: 20px; text-align: center; background: rgba(255,255,255,0.02); color: #8892b0; cursor: pointer; transition: all 0.2s;">
                <div style="font-size: 24px; margin-bottom: 8px;">🎥</div>
                <div id="video-drag-text" style="font-size: 13px; font-weight: 500;">Drag & drop product video here, or <span style="color: var(--cyan);">browse</span></div>
                <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;">Supports MP4, WebM (base64)</div>
                <input type="file" id="video-file-input" accept="video/*" style="display: none;">
              </div>
              <div style="text-align: center; color: rgba(255,255,255,0.4); font-size: 11px; margin: 4px 0;">- OR ENTER FALLBACK URL -</div>
              <input type="text" id="edit-video" placeholder="e.g. https://assets.mixkit.co/...mp4" style="width:100%; padding:10px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:8px; outline:none;">
            </div>
            <div id="video-preview-container" style="display: none; margin-top: 10px; text-align: center;">
              <video id="video-preview" controls src="" style="max-height: 120px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);"></video>
            </div>
          </div>

          <div style="display: none;">
            <label style="font-size: 13px; color: var(--muted); font-weight: 600;">Colors (comma-separated)</label>
            <input type="text" id="edit-colors" placeholder="e.g. Lavender Blue, Cobalt Blue, Sky Blue" style="width:100%; padding:10px; margin-top:5px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:8px; outline:none;">
          </div>
            
          <!-- Color Catalog Helper -->
          <div style="margin-top: 10px; padding: 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px;">
            <span style="font-size: 12px; color: var(--cyan); font-weight: 700; display: block; margin-bottom: 8px;">🎨 Color Catalog Helper</span>
            
            <!-- Quick Select Buttons -->
            <div id="admin-color-catalog-list" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
              <!-- Dynamically populated default and custom colors -->
            </div>
            
            <!-- Add Custom Color Form -->
            <div style="display: flex; gap: 8px; align-items: center; background: rgba(0,0,0,0.25); padding: 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
              <input type="text" id="custom-color-name" placeholder="Color Name (e.g. Mint)" style="flex: 1; padding: 6px 10px; background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; font-size: 11px; outline: none;">
              <div style="position: relative; width: 28px; height: 28px; border-radius: 6px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); cursor: pointer; flex-shrink: 0;">
                <input type="color" id="custom-color-picker" value="#10f3ed" style="position: absolute; inset: -4px; width: 36px; height: 36px; cursor: pointer; border: none; padding: 0;">
              </div>
              <button type="button" onclick="window.addCustomColorToCatalog()" style="padding: 6px 12px; background: var(--cyan); color: black; border: none; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer; transition: transform 0.2s;">
                ➕ Add
              </button>
            </div>
          </div>

          <!-- Model Catalog Helper -->
          <div style="margin-top: 10px; padding: 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px;">
            <span style="font-size: 12px; color: var(--cyan); font-weight: 700; display: block; margin-bottom: 8px;">📱 Mobile Model Catalog Helper</span>
            <div style="display: flex; gap: 8px; align-items: center; background: rgba(0,0,0,0.25); padding: 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
              <input type="text" id="custom-model-name" placeholder="Model Name (e.g. iPhone 18 Pro)" style="flex: 1; padding: 6px 10px; background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; font-size: 11px; outline: none;">
              <button type="button" onclick="window.addCustomModelToCatalog()" style="padding: 6px 12px; background: var(--cyan); color: black; border: none; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer; transition: transform 0.2s; flex-shrink: 0;">
                ➕ Add Model
              </button>
            </div>
          </div>



          <div style="margin-top: 12px;">
            <label style="font-size: 13px; color: var(--muted); font-weight: 600;">Description Details</label>
            <textarea id="edit-detail" rows="3" placeholder="Enter product description detail here..." style="width:100%; padding:10px; margin-top:5px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:8px; outline:none; font-family:inherit; resize:vertical;"></textarea>
          </div>

          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.07);">
            <label style="font-size: 13px; color: var(--muted); font-weight: 700; display:block; margin-bottom:12px;">📍 Feature This Product In</label>
            <div style="display: flex; flex-wrap: wrap; gap: 12px;">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size: 13px; color: white; background: rgba(255,255,255,0.04); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); transition: all 0.2s;">
                <input type="checkbox" id="section-newly-launched" style="width:15px; height:15px; accent-color: var(--cyan);">
                🆕 Newly Launched
              </label>
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size: 13px; color: white; background: rgba(255,255,255,0.04); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); transition: all 0.2s;">
                <input type="checkbox" id="section-recommended" style="width:15px; height:15px; accent-color: var(--cyan);">
                ⭐ Recommended
              </label>
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size: 13px; color: white; background: rgba(255,255,255,0.04); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); transition: all 0.2s;">
                <input type="checkbox" id="section-style" style="width:15px; height:15px; accent-color: var(--cyan);">
                🎨 Shop by Style
              </label>
            </div>
          </div>

          <div style="margin-top: 24px; display:flex; gap:12px; justify-content: flex-end;">
            <button id="cancel-edit" style="padding:12px 22px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:8px; font-weight: 600; cursor:pointer; transition: all 0.2s;">Cancel</button>
            <button id="save-product" style="padding:12px 22px; background:var(--cyan); color:black; font-weight: 700; border-radius:8px; cursor:pointer; transition: all 0.2s; box-shadow: 0 0 15px rgba(139, 92, 246, 0.35);">Save Product</button>
          </div>
        </div>
      </div>

      <!-- Review Modal -->
      <div id="review-modal" class="modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center;">
        <div class="panel" style="width: 100%; max-width: 450px; padding: 25px; border-radius: 16px;">
          <h2 id="review-modal-title" style="margin-bottom: 20px; font-size: 20px; font-weight: 700;">Add Review</h2>
          <form id="review-form" onsubmit="event.preventDefault(); handleSaveReview();">
            <input type="hidden" id="review-id">

            <div style="margin-bottom: 15px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Select Product</label>
              <select id="review-product-id" required style="width:100%; padding:10px; background:rgba(18, 25, 31, 0.98); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
                <!-- Dynamically loaded by admin.js -->
              </select>
            </div>
            
            <div style="margin-bottom: 15px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Customer Name</label>
              <input type="text" id="review-customer-name" placeholder="Enter customer name" required style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
            </div>

            <div style="margin-bottom: 15px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Product Image</label>
              <!-- Hidden input stores the base64 data -->
              <input type="hidden" id="review-photo-url">
              <!-- Hidden file input -->
              <input type="file" id="review-image-file-input" accept="image/*" style="display:none;">
              <!-- Drag & Drop Zone -->
              <div id="review-image-drop-zone"
                   onclick="document.getElementById('review-image-file-input').click()"
                   style="border: 2px dashed rgba(139,92,246,0.3); border-radius: 10px; background: rgba(255,255,255,0.02); padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; position: relative; min-height: 90px; display: flex; align-items: center; justify-content: center;">
                <div id="review-image-drop-placeholder">
                  <div style="font-size: 26px; margin-bottom: 6px;">🖼️</div>
                  <div style="color: rgba(255,255,255,0.5); font-size: 13px;">Drag &amp; drop image here, or <span style="color: var(--cyan); font-weight:600;">browse</span></div>
                  <div style="color: rgba(255,255,255,0.3); font-size: 11px; margin-top:4px;">JPG, PNG, WEBP — max 5 MB</div>
                </div>
                <div id="review-image-preview-wrap" style="display:none; position:relative; width:100%;">
                  <img id="review-image-preview" src="" alt="preview" style="max-height:120px; max-width:100%; border-radius:8px; object-fit:contain;">
                  <button type="button" id="review-image-remove-btn"
                          onclick="event.stopPropagation(); clearReviewImage();"
                          style="position:absolute; top:-8px; right:-8px; width:22px; height:22px; border-radius:50%; background:#ff5b67; border:none; color:white; font-size:13px; line-height:1; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>
                </div>
              </div>
            </div>

            <div style="margin-bottom: 15px; display: flex; gap: 15px;">
              <div style="flex: 1;">
                <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Review Date</label>
                <input type="date" id="review-date" required style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
              </div>
              <div style="flex: 1;">
                <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Star Rating</label>
                <select id="review-stars" style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
                  <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                  <option value="4">⭐⭐⭐⭐ (4)</option>
                  <option value="3">⭐⭐⭐ (3)</option>
                  <option value="2">⭐⭐ (2)</option>
                  <option value="1">⭐ (1)</option>
                </select>
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Review Message</label>
              <textarea id="review-message" placeholder="Enter customer's review text..." required style="width:100%; height:80px; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; resize:none; outline:none;"></textarea>
            </div>

            <div style="margin-bottom: 20px; display:flex; gap: 20px;">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size: 13px; color: white;">
                <input type="checkbox" id="review-verified" checked style="width: 16px; height: 16px; accent-color: var(--cyan);">
                Verified Purchase
              </label>
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size: 13px; color: white;">
                <input type="checkbox" id="review-visible" checked style="width: 16px; height: 16px; accent-color: var(--cyan);">
                Visible
              </label>
            </div>

            <div style="display:flex; gap:10px;">
              <button type="button" class="tab-btn" onclick="document.getElementById('review-modal').style.display='none';" style="flex:1; border:1px solid rgba(255,255,255,0.1); padding:10px; border-radius:6px; color:white;">Cancel</button>
              <button type="submit" class="btn-teal" style="flex:2; justify-content:center; padding:10px; border-radius:6px;">Save Review</button>
            </div>
          </form>
        </div>
      </div>
      <!-- Coupon Modal -->
      <div id="coupon-modal" class="modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center; backdrop-filter: blur(4px);">
        <div class="panel" style="width: 100%; max-width: 450px; padding: 25px; border-radius: 16px; background: rgba(18, 25, 31, 0.98); border: 1px solid var(--line-strong); box-shadow: var(--shadow);">
          <h2 id="coupon-modal-title" style="margin-bottom: 20px; font-size: 20px; font-weight: 700; color: var(--cyan);">Create New Coupon</h2>
          <form id="coupon-form" onsubmit="event.preventDefault(); handleSaveCoupon();">
            <input type="hidden" id="coupon-id">

            <div style="margin-bottom: 15px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Coupon Name</label>
              <input type="text" id="coupon-name" placeholder="e.g. Summer discount 10%" required style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
            </div>

            <div style="margin-bottom: 15px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Coupon Code</label>
              <input type="text" id="coupon-code" placeholder="e.g. SUMMER10" required style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none; text-transform: uppercase;">
            </div>

            <div style="margin-bottom: 15px; display: flex; gap: 15px;">
              <div style="flex: 1;">
                <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Discount Type</label>
                <select id="coupon-discount-type" style="width:100%; padding:10px; background:rgba(18, 25, 31, 0.98); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
                  <option value="flat">Flat Amount (₹)</option>
                  <option value="percentage">Percentage (%)</option>
                </select>
              </div>
              <div style="flex: 1;">
                <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Discount Value</label>
                <input type="number" id="coupon-discount-value" placeholder="e.g. 100 or 10" required min="1" style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
              </div>
            </div>

            <div style="margin-bottom: 15px; display: flex; gap: 15px;">
              <div style="flex: 1;">
                <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Min Order Amount (₹)</label>
                <input type="number" id="coupon-min-order" placeholder="e.g. 499" value="0" min="0" style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
              </div>
              <div style="flex: 1;">
                <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Valid Till</label>
                <input type="text" id="coupon-valid-till" placeholder="DD/MM/YYYY" style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
              </div>
            </div>

            <div style="margin-bottom: 20px; display:flex; gap: 20px;">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size: 13px; color: white;">
                <input type="checkbox" id="coupon-status" checked style="width: 16px; height: 16px; accent-color: var(--cyan);">
                Active
              </label>
            </div>

            <div style="display:flex; gap:10px;">
              <button type="button" class="tab-btn" onclick="document.getElementById('coupon-modal').style.display='none';" style="flex:1; border:1px solid rgba(255,255,255,0.1); padding:10px; border-radius:6px; color:white; cursor:pointer; background:transparent;">Cancel</button>
              <button type="submit" class="btn-teal" style="flex:2; justify-content:center; padding:10px; border-radius:6px; cursor:pointer;">Save Coupon</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Order Edit Modal -->
      <div id="order-modal" class="modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center; backdrop-filter: blur(4px);">
        <div class="panel" style="width: 100%; max-width: 500px; padding: 25px; border-radius: 16px; background: rgba(18, 25, 31, 0.98); border: 1px solid var(--line-strong); box-shadow: var(--shadow); max-height: 90vh; overflow-y: auto;">
          <h2 id="order-modal-title" style="margin-bottom: 20px; font-size: 20px; font-weight: 700; color: var(--cyan);">Modify Order</h2>
          <form id="order-form" onsubmit="event.preventDefault(); handleSaveOrder();">
            <input type="hidden" id="order-db-id">

            <div style="margin-bottom: 15px; display: flex; gap: 15px;">
              <div style="flex: 1;">
                <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Order Status</label>
                <select id="order-status-select" style="width:100%; padding:10px; background:rgba(18, 25, 31, 0.98); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>
              <div style="flex: 1;">
                <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Contact Email</label>
                <input type="email" id="order-email-input" style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
              </div>
            </div>

            <div style="margin-bottom: 15px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Ordered Product</label>
              <input type="text" id="order-product-name-display" readonly style="width:100%; padding:10px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:6px; color:rgba(255,255,255,0.6); outline:none; font-weight:600; cursor:not-allowed;">
            </div>

            <div style="margin-bottom: 15px;" id="order-referrer-container">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Referred By</label>
              <input type="text" id="order-referrer-display" readonly style="width:100%; padding:10px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:6px; color:rgba(255,255,255,0.6); outline:none; font-weight:600; cursor:not-allowed;">
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Shipping Address</label>
              <textarea id="order-address-input" rows="3" required style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none; resize:vertical; font-family:inherit;"></textarea>
            </div>

            <div style="display:flex; gap:10px;">
              <button type="button" class="tab-btn" onclick="document.getElementById('order-modal').style.display='none';" style="flex:1; border:1px solid rgba(255,255,255,0.1); padding:10px; border-radius:6px; color:white; cursor:pointer; background:transparent;">Cancel</button>
              <button type="submit" class="btn-teal" style="flex:2; justify-content:center; padding:10px; border-radius:6px; cursor:pointer;">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Category Edit Modal -->
      <div id="category-modal" class="modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center; backdrop-filter: blur(4px);">
        <div class="panel" style="width: 100%; max-width: 500px; padding: 25px; border-radius: 16px; background: rgba(18, 25, 31, 0.98); border: 1px solid var(--line-strong); box-shadow: var(--shadow); max-height: 90vh; overflow-y: auto;">
          <h2 id="category-modal-title" style="margin-bottom: 20px; font-size: 20px; font-weight: 700; color: var(--cyan);">Modify Category</h2>
          <form id="edit-category-form" onsubmit="event.preventDefault(); handleSaveCategory();">
            <input type="hidden" id="edit-cat-index">
            
            <div style="margin-bottom: 15px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Category Name</label>
              <input type="text" id="edit-cat-name" placeholder="Enter category name" required style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
            </div>
            
            <div style="margin-bottom: 15px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Slug</label>
              <input type="text" id="edit-cat-slug" placeholder="Enter slug" required style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
            </div>

            <div style="margin-bottom: 20px; display:flex; align-items:center; justify-content:space-between;">
              <span style="font-size:14px; color:#8892b0;">Status</span>
              <label class="switch">
                <input type="checkbox" id="edit-cat-status">
                <span class="slider"></span>
              </label>
            </div>

            <div style="display:flex; gap:10px;">
              <button type="button" class="tab-btn" onclick="document.getElementById('category-modal').style.display='none';" style="flex:1; border:1px solid rgba(255,255,255,0.1); padding:10px; border-radius:6px; color:white; cursor:pointer; background:transparent;">Cancel</button>
              <button type="submit" class="btn-teal" style="flex:2; justify-content:center; padding:10px; border-radius:6px; cursor:pointer;">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <!-- iPhone Model Modal -->
      <div id="iphone-model-modal" class="modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center; backdrop-filter: blur(4px);">
        <div class="panel" style="width: 100%; max-width: 500px; padding: 25px; border-radius: 16px; background: rgba(18, 25, 31, 0.98); border: 1px solid var(--line-strong); box-shadow: var(--shadow); max-height: 90vh; overflow-y: auto;">
          <h2 id="iphone-model-modal-title" style="margin-bottom: 20px; font-size: 20px; font-weight: 700; color: var(--cyan);">Manage iPhone Model</h2>
          <form id="iphone-model-form" onsubmit="event.preventDefault(); window.handleSaveIphoneModel();">
            <input type="hidden" id="iphone-model-edit-id">
            
            <div style="margin-bottom: 15px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Model Name</label>
              <input type="text" id="iphone-model-name" placeholder="e.g. iPhone 15 Pro" required style="width:100%; padding:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none;">
            </div>
            
            <div style="margin-bottom: 15px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Model Image</label>
              <div id="iphone-model-drag-zone" style="border: 2px dashed rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 20px; text-align: center; background: rgba(255,255,255,0.02); color: #8892b0; cursor: pointer; transition: all 0.2s;">
                <div style="font-size: 24px; margin-bottom: 8px;">🖼️</div>
                <div id="iphone-model-drag-text" style="font-size: 13px; font-weight: 500;">Drag & drop model image here, or <span style="color: var(--cyan);">browse</span></div>
                <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px;">Supports PNG, JPG, JPEG, WEBP</div>
                <input type="file" id="iphone-model-file-input" accept="image/*" style="display: none;">
              </div>
              <div id="iphone-model-preview-wrap" style="display: none; margin-top: 10px; position: relative; width: 96px;">
                <img id="iphone-model-preview" src="" alt="Model preview" style="width: 96px; height: 96px; object-fit: cover; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(0,0,0,0.2);">
                <button type="button" id="iphone-model-remove-btn" onclick="window.removeIphoneModelImage()" style="position: absolute; top: 4px; right: 4px; width: 18px; height: 18px; border-radius: 50%; background: #ff5b67; border: none; color: white; font-size: 10px; font-weight: bold; cursor: pointer;">✕</button>
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display:block; font-size:13px; color:#8892b0; margin-bottom:6px;">Associate Products</label>
              <input type="text" id="iphone-model-products-search" placeholder="Filter products..." oninput="window.filterIphoneModelProducts()" style="width:100%; padding:8px 12px; margin-bottom:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:white; outline:none; font-size:12px;">
              <div id="iphone-model-products-checklist" style="display:flex; flex-direction:column; gap:8px; max-height:200px; overflow-y:auto; background:rgba(255,255,255,0.02); padding:10px; border:1px solid rgba(255,255,255,0.08); border-radius:8px;">
                <!-- Product checkboxes will be populated dynamically -->
              </div>
            </div>

            <div style="display:flex; gap:10px;">
              <button type="button" class="tab-btn" onclick="document.getElementById('iphone-model-modal').style.display='none';" style="flex:1; border:1px solid rgba(255,255,255,0.1); padding:10px; border-radius:6px; color:white; cursor:pointer; background:transparent;">Cancel</button>
              <button type="submit" class="btn-teal" style="flex:2; justify-content:center; padding:10px; border-radius:6px; cursor:pointer;">Save Model</button>
            </div>
          </form>
        </div>
      </div>

    </div>

      <!-- Admin Profile Modal -->
      <div id="admin-profile-modal" class="modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:999; align-items:center; justify-content:center; backdrop-filter: blur(4px);">
        <div class="panel" style="width: 450px; padding: 25px; max-height: 90vh; overflow-y: auto; border-radius: 16px; border: 1px solid var(--line-strong); box-shadow: var(--shadow);">
          <h2 style="font-size: 20px; margin-bottom: 20px; font-weight: 700; color: var(--cyan); display: flex; align-items: center; gap: 8px;">
            <span data-icon="user"></span> Edit Profile
          </h2>
          
          <form id="admin-profile-form" onsubmit="event.preventDefault(); window.submitAdminProfileUpdate();" style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label style="font-size: 13px; color: var(--muted); font-weight: 600; display: block; margin-bottom: 4px;">Full Name</label>
              <input type="text" id="admin-profile-name" required placeholder="Name" style="width:100%; padding:10px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:8px; outline:none;">
            </div>

            <div>
              <label style="font-size: 13px; color: var(--muted); font-weight: 600; display: block; margin-bottom: 4px;">Email Address</label>
              <input type="email" id="admin-profile-email" placeholder="admin@domain.com" style="width:100%; padding:10px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:8px; outline:none;">
            </div>

            <div>
              <label style="font-size: 13px; color: var(--muted); font-weight: 600; display: block; margin-bottom: 4px;">Phone Number</label>
              <input type="text" id="admin-profile-phone" required placeholder="+91 9999999999" style="width:100%; padding:10px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:8px; outline:none;">
            </div>

            <div>
              <label style="font-size: 13px; color: var(--muted); font-weight: 600; display: block; margin-bottom: 4px;">New Password (leave blank to keep current)</label>
              <input type="password" id="admin-profile-password" placeholder="••••••••" style="width:100%; padding:10px; background:rgba(255,255,255,0.03); color:white; border:1px solid rgba(255,255,255,0.08); border-radius:8px; outline:none;">
            </div>

            <div style="display:flex; gap:10px; margin-top: 10px;">
              <button type="button" class="tab-btn" onclick="document.getElementById('admin-profile-modal').style.display='none';" style="flex:1; border:1px solid rgba(255,255,255,0.1); padding:10px; border-radius:6px; color:white; cursor:pointer; background:transparent;">Cancel</button>
              <button type="submit" class="btn-teal" style="flex:2; justify-content:center; padding:10px; border-radius:6px; cursor:pointer; border: none; font-weight: 600;">Save Profile</button>
            </div>
          </form>
          
          <div style="margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; text-align: center;">
            <button type="button" onclick="window.adminLogout()" style="width: 100%; padding: 10px; border-radius: 6px; background: rgba(255, 91, 103, 0.1); border: 1px solid rgba(255, 91, 103, 0.2); color: #ff5b67; cursor: pointer; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px;">
              Sign Out / Log Out
            </button>
          </div>
        </div>
      </div>

      <div class="admin-toast" id="admin-toast" role="status" aria-live="polite"></div>
    <script src="/admin.js?v=<?= filemtime(public_path('admin.js')) ?>"></script>
  </body>
</html>
