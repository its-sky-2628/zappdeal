const adminIcons = {
  bag: '<path d="M6 8h12l-1 13H7z"/><path d="M9 8a3 3 0 0 1 6 0"/><path d="M10 13l2 2 4-5"/>',
  dashboard: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M17 11a4 4 0 0 1 0 8"/><path d="M22 21a6 6 0 0 0-4-5.7"/>',
  orders: '<path d="M7 7h14l-2 9H8L6 3H3"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>',
  products: '<path d="m21 8-9-5-9 5 9 5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  tag: '<path d="M20 13 11 22 2 13V4h9z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
  wallet: '<path d="M4 7h15a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V5a2 2 0 0 0 2 2z"/><path d="M16 13h5"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  report: '<path d="M4 19V5"/><path d="M8 19V9"/><path d="M12 19V7"/><path d="M16 19v-5"/><path d="M20 19V3"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
  star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  settings: '<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M4 12a8 8 0 0 1 .1-1.3l-1.7-1.3 2-3.4 2 .8a8.2 8.2 0 0 1 2.2-1.3L9 3h4l.4 2.5a8.2 8.2 0 0 1 2.2 1.3l2-.8 2 3.4-1.7 1.3A8 8 0 0 1 20 12a8 8 0 0 1-.1 1.3l1.7 1.3-2 3.4-2-.8a8.2 8.2 0 0 1-2.2 1.3L15 21h-4l-.4-2.5a8.2 8.2 0 0 1-2.2-1.3l-2 .8-2-3.4 1.7-1.3A8 8 0 0 1 4 12z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  moon: '<path d="M21 13a8 8 0 1 1-10-10 7 7 0 0 0 10 10z"/>',
  pending: '<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  cart: '<path d="M6 6h15l-2 9H8L6 3H3"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  heart: '<path d="M20.8 8.6a5.4 5.4 0 0 0-9-3.7 5.4 5.4 0 0 0-9 3.7c0 6.1 9 11.4 9 11.4s9-5.3 9-11.4z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/>',
  gift: '<path d="M20 12v8H4v-8M2 7h20v5H2zM12 7v13"/><path d="M12 7H8a2 2 0 1 1 2-2c0 2 2 2 2 2zM12 7h4a2 2 0 1 0-2-2c0 2-2 2-2 2z"/>',
  ban: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
  filter: '<path d="M4 7h16"/><path d="M7 12h10"/><path d="M10 17h4"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="3"/>',
  more: '<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
  image: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="M21 15-5-5L5 21"/>',
  trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>',
  copy: '<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>'
};

// Global variables for pending banner uploads
let pendingHeroBgImages = [];
let pendingMobileBgImages = [];
let pendingCategoryImage = "";
let savedBannersCache = null;
window.previewBannerIndex = -1;

// SVG Icon Helper
function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${adminIcons[name] || adminIcons.dashboard}</svg>`;
}

// Hydrate Data Icons
function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((node) => {
    node.innerHTML = icon(node.dataset.icon);
  });
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatTime(dateString) {
  if (!dateString) return '';
  const normalized = typeof dateString === 'string' ? dateString.replace(' ', 'T') : dateString;
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).toUpperCase();
}

let filterStartDate = null;
let filterEndDate = null;

// Global filter states
let userFilterStatus = "All";
let userFilterCity = "All";
let userMinOrders = null;
let userMaxOrders = null;
let userMinSpend = null;
let userMaxSpend = null;

let orderFilterStatus = "All";
let orderMinAmount = null;
let orderMaxAmount = null;

// Pagination variables
let usersCurrentPage = 1;
let ordersCurrentPage = 1;
const itemsPerPage = 10;

function filterByDateRange(list, dateKey) {
  if (!filterStartDate && !filterEndDate) {
    return list;
  }
  return list.filter(item => {
    if (!item[dateKey]) return true;
    const itemDate = new Date(item[dateKey]);
    if (isNaN(itemDate.getTime())) return true;
    
    if (filterStartDate) {
      const start = new Date(filterStartDate);
      start.setHours(0, 0, 0, 0);
      if (itemDate < start) return false;
    }
    if (filterEndDate) {
      const end = new Date(filterEndDate);
      end.setHours(23, 59, 59, 999);
      if (itemDate > end) return false;
    }
    return true;
  });
}

function updateDatePickerLabels() {
  const buttons = document.querySelectorAll(".date-picker");
  let label = "All Time";
  if (filterStartDate && filterEndDate) {
    label = `${formatDateForLabel(filterStartDate)} - ${formatDateForLabel(filterEndDate)}`;
  } else if (filterStartDate) {
    label = `From ${formatDateForLabel(filterStartDate)}`;
  } else if (filterEndDate) {
    label = `To ${formatDateForLabel(filterEndDate)}`;
  }
  buttons.forEach(btn => {
    btn.innerHTML = `${label} <span data-icon="calendar"></span>`;
    hydrateIcons(btn);
  });
}

function formatDateForLabel(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, '0');
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

window.openDatePickerPopover = function(buttonEl) {
  const existing = document.getElementById("date-picker-popover");
  if (existing) {
    existing.remove();
    return;
  }

  const rect = buttonEl.getBoundingClientRect();
  const popover = document.createElement("div");
  popover.id = "date-picker-popover";
  popover.style.position = "absolute";
  popover.style.top = `${rect.bottom + window.scrollY + 8}px`;
  popover.style.left = `${rect.left + window.scrollX}px`;
  popover.style.background = "#1e293b";
  popover.style.border = "1px solid rgba(255,255,255,0.12)";
  popover.style.borderRadius = "12px";
  popover.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
  popover.style.zIndex = "99999";
  popover.style.padding = "16px";
  popover.style.width = "300px";
  popover.style.display = "flex";
  popover.style.flexDirection = "column";
  popover.style.gap = "12px";

  const startVal = filterStartDate || "";
  const endVal = filterEndDate || "";

  popover.innerHTML = `
    <div style="font-weight: 700; color: white; font-size: 14px; margin-bottom: 4px;">Filter by Date Range</div>
    
    <div style="display:flex; flex-direction:column; gap:6px;">
      <label style="font-size:11px; color:rgba(255,255,255,0.6);">Start Date</label>
      <input type="date" id="dp-start" value="${startVal}" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:#0f172a; color:white; outline:none; font-family:inherit;">
    </div>
    
    <div style="display:flex; flex-direction:column; gap:6px;">
      <label style="font-size:11px; color:rgba(255,255,255,0.6);">End Date</label>
      <input type="date" id="dp-end" value="${endVal}" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:#0f172a; color:white; outline:none; font-family:inherit;">
    </div>
    
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-top:4px;">
      <button onclick="window.applyQuickDateRange('today')" style="padding:6px; font-size:12px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1); border-radius:6px; cursor:pointer;">Today</button>
      <button onclick="window.applyQuickDateRange('yesterday')" style="padding:6px; font-size:12px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1); border-radius:6px; cursor:pointer;">Yesterday</button>
      <button onclick="window.applyQuickDateRange('last7')" style="padding:6px; font-size:12px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1); border-radius:6px; cursor:pointer;">Last 7 Days</button>
      <button onclick="window.applyQuickDateRange('last30')" style="padding:6px; font-size:12px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1); border-radius:6px; cursor:pointer;">Last 30 Days</button>
      <button onclick="window.applyQuickDateRange('thismonth')" style="padding:6px; font-size:12px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1); border-radius:6px; cursor:pointer;">This Month</button>
      <button onclick="window.applyQuickDateRange('alltime')" style="padding:6px; font-size:12px; background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1); border-radius:6px; cursor:pointer;">All Time</button>
    </div>
    
    <div style="display:flex; gap:8px; margin-top:8px; border-top: 1px solid rgba(255,255,255,0.08); padding-top:12px;">
      <button onclick="document.getElementById('date-picker-popover').remove()" style="flex:1; padding:8px; font-size:12px; background:transparent; color:white; border:1px solid rgba(255,255,255,0.1); border-radius:6px; cursor:pointer;">Cancel</button>
      <button onclick="window.submitCustomDateRange()" style="flex:2; padding:8px; font-size:12px; background:#08f2e8; color:black; font-weight:700; border:none; border-radius:6px; cursor:pointer;">Apply Filter</button>
    </div>
  `;

  document.body.appendChild(popover);

  setTimeout(() => {
    const clickOutsideHandler = (e) => {
      if (!popover.contains(e.target) && !buttonEl.contains(e.target)) {
        popover.remove();
        document.removeEventListener("click", clickOutsideHandler);
      }
    };
    document.addEventListener("click", clickOutsideHandler);
  }, 10);
};

window.submitCustomDateRange = function() {
  const startVal = document.getElementById("dp-start").value;
  const endVal = document.getElementById("dp-end").value;

  filterStartDate = startVal ? startVal : null;
  filterEndDate = endVal ? endVal : null;

  const popover = document.getElementById("date-picker-popover");
  if (popover) popover.remove();

  updateDatePickerLabels();
  triggerRenders();
};

window.applyQuickDateRange = function(rangeType) {
  const now = new Date();
  
  if (rangeType === 'today') {
    const formatted = now.toISOString().split('T')[0];
    filterStartDate = formatted;
    filterEndDate = formatted;
  } else if (rangeType === 'yesterday') {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const formatted = yesterday.toISOString().split('T')[0];
    filterStartDate = formatted;
    filterEndDate = formatted;
  } else if (rangeType === 'last7') {
    const end = now.toISOString().split('T')[0];
    const startObj = new Date(now);
    startObj.setDate(now.getDate() - 7);
    const start = startObj.toISOString().split('T')[0];
    filterStartDate = start;
    filterEndDate = end;
  } else if (rangeType === 'last30') {
    const end = now.toISOString().split('T')[0];
    const startObj = new Date(now);
    startObj.setDate(now.getDate() - 30);
    const start = startObj.toISOString().split('T')[0];
    filterStartDate = start;
    filterEndDate = end;
  } else if (rangeType === 'thismonth') {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    filterStartDate = `${year}-${month}-01`;
    const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
    filterEndDate = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;
  } else if (rangeType === 'alltime') {
    filterStartDate = null;
    filterEndDate = null;
  }

  const popover = document.getElementById("date-picker-popover");
  if (popover) popover.remove();

  updateDatePickerLabels();
  triggerRenders();
};
function adminLogout() {
  if (document.getElementById("admin-logout-modal")) return;

  const modal = document.createElement("div");
  modal.id = "admin-logout-modal";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
  modal.style.backdropFilter = "blur(8px)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "99999";
  modal.style.opacity = "0";
  modal.style.transition = "opacity 0.2s ease";

  modal.innerHTML = `
    <div style="background: #1e293b; border: 1px solid rgba(255,255,255,0.1); padding: 24px; border-radius: 16px; width: 340px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4); transform: scale(0.9); transition: transform 0.2s ease;">
      <div style="font-size: 36px; margin-bottom: 12px;">👋</div>
      <h3 style="margin: 0 0 8px 0; color: white; font-size: 18px; font-weight: 700;">Do you want to log out?</h3>
      <p style="margin: 0 0 20px 0; color: #94a3b8; font-size: 13px;">You will need to enter your credentials to log back in.</p>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <button id="admin-logout-confirm" style="flex: 1; padding: 10px 16px; border-radius: 8px; background: #ff5b67; color: white; font-weight: 600; border: none; cursor: pointer; transition: background 0.2s;">Yes</button>
        <button id="admin-logout-cancel" style="flex: 1; padding: 10px 16px; border-radius: 8px; background: rgba(255,255,255,0.08); color: #e2e8f0; font-weight: 600; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: background 0.2s;">No</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.style.opacity = "1";
    modal.querySelector("div").style.transform = "scale(1)";
  }, 10);

  const performLogout = () => {
    localStorage.removeItem("admin-user-token");
    localStorage.removeItem("admin-user");
    localStorage.removeItem("activePanel");
    localStorage.removeItem("selectedPanel");
    window.location.href = "/admin";
  };

  const closeModal = () => {
    modal.style.opacity = "0";
    modal.querySelector("div").style.transform = "scale(0.9)";
    setTimeout(() => {
      modal.remove();
    }, 200);
  };

  document.getElementById("admin-logout-confirm").addEventListener("click", performLogout);
  document.getElementById("admin-logout-cancel").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}
function triggerRenders() {
  if (document.getElementById("users-panel-table")) renderUsersPanel();
  if (document.getElementById("users-table")) renderDashboardSummaryUsers();
  if (document.getElementById("orders-panel-table")) renderOrdersPanel();
}


// Initialize database keys
function initKey(key, defaultValue) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }
}

// Set up mock data to perfectly match user images
const defaultUsersList = [
  { id: "#MB125689", name: "Rahul Verma", mobile: "+91 9876543210", email: "rahulverma@gmail.com", city: "Mumbai", totalOrders: 8, totalSpend: 18560, status: "Active", avatar: "R" },
  { id: "#MB125688", name: "Priya Sharma", mobile: "+91 8765432109", email: "priyasharma@gmail.com", city: "Delhi", totalOrders: 5, totalSpend: 9850, status: "Active", avatar: "P" },
  { id: "#MB125687", name: "Amit Patel", mobile: "+91 7654321098", email: "amitpatel@gmail.com", city: "Surat", totalOrders: 12, totalSpend: 25680, status: "Active", avatar: "A" },
  { id: "#MB125686", name: "Sneha Reddy", mobile: "+91 6543210987", email: "sneha.reddy@gmail.com", city: "Bangalore", totalOrders: 3, totalSpend: 4250, status: "Active", avatar: "S" },
  { id: "#MB125685", name: "Vikram Singh", mobile: "+91 5432109876", email: "vikramsingh@gmail.com", city: "Lucknow", totalOrders: 7, totalSpend: 12360, status: "Active", avatar: "V" },
  { id: "#MB125684", name: "Neha Kapoor", mobile: "+91 9876501234", email: "nehakapoor@gmail.com", city: "Chennai", totalOrders: 4, totalSpend: 7450, status: "Inactive", avatar: "N" }
];

const defaultOrdersList = [
  { id: "MB12569", customer: "Rahul Verma", mobile: "+91 9876543210", total: 1250, payment: "COD", date: "30 May 2024 10:30 AM", status: "Pending", avatar: "R" },
  { id: "MB12568", customer: "Priya Sharma", mobile: "+91 8765432109", total: 899, payment: "Online", date: "30 May 2024 10:20 AM", status: "Pending", avatar: "P" },
  { id: "MB12567", customer: "Amit Patel", mobile: "+91 7654321098", total: 1499, payment: "COD", date: "30 May 2024 10:15 AM", status: "Pending", avatar: "A" },
  { id: "MB12566", customer: "Sneha Reddy", mobile: "+91 6543210987", total: 599, payment: "Online", date: "30 May 2024 10:10 AM", status: "Pending", avatar: "S" },
  { id: "MB12565", customer: "Vikram Singh", mobile: "+91 5432109876", total: 1099, payment: "COD", date: "30 May 2024 10:05 AM", status: "Pending", avatar: "V" },
  { id: "MB12564", customer: "Neha Kapoor", mobile: "+91 9876501234", total: 749, payment: "Online", date: "30 May 2024 10:00 AM", status: "Pending", avatar: "N" },
  { id: "MB12563", customer: "Arjun Mehta", mobile: "+91 9123456780", total: 1399, payment: "Online", date: "29 May 2024 09:55 AM", status: "Pending", avatar: "A" }
];

const defaultCategoriesList = [
  { name: "iPhone Covers", slug: "iphone-covers", products: 1250, status: "Active", image: "covers" },
  { name: "Samsung Covers", slug: "samsung-covers", products: 980, status: "Active", image: "covers" },
  { name: "OnePlus Covers", slug: "oneplus-covers", products: 540, status: "Active", image: "covers" },
  { name: "Realme Covers", slug: "realme-covers", products: 420, status: "Active", image: "covers" },
  { name: "Xiaomi Covers", slug: "xiaomi-covers", products: 410, status: "Active", image: "covers" },
  { name: "Oppo Covers", slug: "oppo-covers", products: 380, status: "Inactive", image: "covers" }
];

const defaultCouponsList = [
  { name: "Flat 10% Off", code: "MINIBAY10", discount: "10% OFF", minOrder: 499, validTill: "31 May 2024", usage: 245, status: "Active" },
  { name: "Flat 20% Off", code: "MINIBAY20", discount: "20% OFF", minOrder: 999, validTill: "15 Jun 2024", usage: 189, status: "Active" },
  { name: "New User 15%", code: "NEW15", discount: "15% OFF", minOrder: 499, validTill: "31 May 2024", usage: 356, status: "Active" },
  { name: "Summer Sale 25%", code: "SUMMER25", discount: "25% OFF", minOrder: 1499, validTill: "30 Jun 2024", usage: 128, status: "Active" },
  { name: "Free Shipping", code: "FREESHIP", discount: "FREE SHIPPING", minOrder: 499, validTill: "31 May 2024", usage: 327, status: "Active" },
  { name: "Buy 1 Get 1", code: "BOGO", discount: "BOGO", minOrder: 799, validTill: "30 Jun 2024", usage: 65, status: "Inactive" }
];

const defaultWalletList = [
  { user: "Rahul Verma", type: "Cashback", amount: 50, closingBalance: 350, date: "30 May 2024 10:30 AM", status: "Completed", avatar: "R" },
  { user: "Priya Sharma", type: "Add Money", amount: 200, closingBalance: 450, date: "30 May 2024 10:20 AM", status: "Completed", avatar: "P" },
  { user: "Amit Patel", type: "Refund", amount: 199, closingBalance: 199, date: "30 May 2024 10:15 AM", status: "Completed", avatar: "A" },
  { user: "Sneha Reddy", type: "Cashback", amount: 30, closingBalance: 120, date: "30 May 2024 10:10 AM", status: "Completed", avatar: "S" },
  { user: "Vikram Singh", type: "Adjustments", amount: -150, closingBalance: 0, date: "30 May 2024 10:05 AM", status: "Completed", avatar: "V" },
  { user: "Neha Kapoor", type: "Add Money", amount: 300, closingBalance: 300, date: "30 May 2024 10:00 AM", status: "Completed", avatar: "N" }
];

// Initialize local storage databases
// Load users from API
async function loadUsersFromApi() {
    try {
        const token = localStorage.getItem("admin-user-token");
        if (!token || token === "null" || token === "undefined") {
            return;
        }
        const [usersRes, ordersRes] = await Promise.all([
            fetch('/api/users', { headers: { 'Authorization': 'Bearer ' + token } }),
            fetch('/api/admin/orders', { headers: { 'Authorization': 'Bearer ' + token } })
        ]);
        
        if (usersRes.status === 401 || ordersRes.status === 401) {
            handleSessionExpired();
            return;
        }
        
        if (usersRes.ok && ordersRes.ok) {
            const usersData = await usersRes.json();
            const ordersData = await ordersRes.json();
            
            const userStats = {};
            ordersData.forEach(o => {
                if (o.user_id) {
                    if (!userStats[o.user_id]) {
                        userStats[o.user_id] = { count: 0, spend: 0 };
                    }
                    userStats[o.user_id].count += 1;
                    userStats[o.user_id].spend += Number(o.total || 0);
                }
            });

            const mappedUsers = usersData.map(u => ({
                id: "#MB" + u.id.toString().padStart(6, '0'),
                dbId: u.id,
                name: u.name,
                email: u.email,
                mobile: u.phone || "N/A",
                city: "Online",
                totalOrders: userStats[u.id] ? userStats[u.id].count : 0,
                totalSpend: userStats[u.id] ? userStats[u.id].spend : 0,
                walletBalance: Number(u.wallet_balance || 0),
                status: u.is_admin ? "Admin" : "Active",
                avatar: u.name.charAt(0).toUpperCase(),
                createdAt: formatDate(u.created_at),
                rawDate: u.created_at
            }));
            localStorage.setItem("iselectrics-users", JSON.stringify(mappedUsers));
            if (document.getElementById("users-panel-table")) renderUsersPanel();
            if (document.getElementById("users-table")) renderDashboardSummaryUsers();
        }
    } catch(e) {
        console.error(e);
    }
}


async function loadAdminOrdersFromApi() {
    try {
        const token = localStorage.getItem("admin-user-token");
        if (!token || token === "null" || token === "undefined") {
            return;
        }
        const res = await fetch('/api/admin/orders', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        if (res.status === 401) {
            handleSessionExpired();
            return;
        }
        if (res.ok) {
            const data = await res.json();
            const mappedOrders = data.map(o => ({
                id: "MB" + o.id.toString().padStart(6, '0'),
                dbId: o.id,
                customer: o.user ? o.user.name : "Unknown",
                mobile: o.user ? (o.user.phone || "N/A") : "N/A",
                userId: o.user_id,
                avatar: o.user ? o.user.name.charAt(0).toUpperCase() : "?",
                total: o.total || 0,
                payment: o.payment_method || "COD",
                status: o.status || "Pending",
                date: formatDate(o.created_at),
                time: formatTime(o.created_at),
                rawDate: o.created_at,
                shippingAddress: o.shipping_address || "",
                email: o.email || "",
                qty: o.qty || 1,
                productName: o.product ? o.product.name : "Unknown Product",
                walletDeduction: o.wallet_deduction || 0,
                referrerName: o.referrer_name || "",
                referrerPhone: o.referrer_phone || "",
                referrerCode: o.referrer_code || "",
                referralRewardAmount: o.referral_reward_amount || 0,
                referralStatus: o.referral_status || ""
            }));
            localStorage.setItem("admin-iselectrics-orders", JSON.stringify(mappedOrders));
            renderOrdersPanel();
            updateOrdersBadge();
            if (document.getElementById("recent-orders")) renderDashboardSummaryOrders(); // if it exists
        }
    } catch(e) {
        console.error(e);
    }
}

function updateOrdersBadge() {
  const badge = document.getElementById("orders-nav-badge");
  if (!badge) return;
  
  const orders = JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
  if (orders.length === 0) {
    badge.style.display = "none";
    return;
  }
  
  const maxOrderId = Math.max(...orders.map(o => Number(o.dbId || 0)));
  let lastViewed = localStorage.getItem("admin-last-viewed-order-id");
  
  if (lastViewed === null) {
    localStorage.setItem("admin-last-viewed-order-id", maxOrderId);
    lastViewed = maxOrderId;
  } else {
    lastViewed = Number(lastViewed);
  }
  
  const newCount = orders.filter(o => Number(o.dbId || 0) > lastViewed).length;
  
  if (newCount > 0) {
    badge.textContent = newCount;
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}

function updatePayoutsBadge() {
  const badge = document.getElementById("payouts-nav-badge");
  if (!badge) return;
  
  // RED badge: count of Pending payout requests waiting for admin action
  const pendingCount = payoutsList.filter(p => (p.status || "").toLowerCase() === "pending").length;
  
  if (pendingCount > 0) {
    badge.textContent = pendingCount;
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}

function updateWalletBadge() {
  const badge = document.getElementById("wallet-nav-badge");
  if (!badge) return;
  
  // GREEN badge: count of new completed referral earnings since admin last opened Wallet panel
  const walletsData = JSON.parse(localStorage.getItem("iselectrics-wallets-data")) || { metrics: { total_successful_referrals: 0 } };
  const totalCompleted = Number(walletsData.metrics?.total_successful_referrals || 0);
  const lastSeen = Number(localStorage.getItem("admin-wallet-last-seen-referrals") || "0");
  const newEarnings = Math.max(0, totalCompleted - lastSeen);
  
  if (newEarnings > 0) {
    badge.textContent = newEarnings;
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}

// Call this when admin opens the Wallet & Rewards panel to clear the green badge
function clearWalletBadge() {
  const walletsData = JSON.parse(localStorage.getItem("iselectrics-wallets-data")) || { metrics: { total_successful_referrals: 0 } };
  const totalCompleted = Number(walletsData.metrics?.total_successful_referrals || 0);
  localStorage.setItem("admin-wallet-last-seen-referrals", totalCompleted.toString());
  updateWalletBadge();
}



async function loadCouponsFromApi() {
    try {
        const token = localStorage.getItem("admin-user-token");
        if (!token || token === "null" || token === "undefined") {
            return;
        }
        const res = await fetch('/api/admin/coupons', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        if (res.status === 401) {
            handleSessionExpired();
            return;
        }
        if (res.ok) {
            const data = await res.json();
            const mapped = data.map(c => ({
                id: c.id,
                name: c.name,
                code: c.code,
                discount: c.discount_type === 'percentage' ? `${c.discount_value}% OFF` : `₹${c.discount_value} OFF`,
                discount_type: c.discount_type,
                discount_value: c.discount_value,
                minOrder: c.min_order_amount || 0,
                validTill: formatDate(c.valid_till),
                usage: c.usage_count || 0,
                status: c.status
            }));
            localStorage.setItem("iselectrics-coupons", JSON.stringify(mapped));
            renderCouponsPanel();
        }
    } catch(e) {
        console.error("Failed to load coupons from API:", e);
    }
}

async function loadWalletsFromApi() {
    try {
        const token = localStorage.getItem("admin-user-token");
        if (!token || token === "null" || token === "undefined") {
            return;
        }
        const res = await fetch('/api/admin/wallets', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        if (res.status === 401) {
            handleSessionExpired();
            return;
        }
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("iselectrics-wallets-data", JSON.stringify(data));
            renderWalletPanel();
            updateWalletBadge();
        }
    } catch(e) {
        console.error("Failed to load wallets from API:", e);
    }
}


function renderDashboardSummaryOrders() {
    // Dummy function to prevent JS reference errors on dashboards
}

async function adminUpdateOrderStatus(id, newStatus) {
    try {
        const token = localStorage.getItem("admin-user-token");
        const res = await fetch(`/api/admin/orders/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });
        if (res.status === 401) {
            handleSessionExpired();
            return;
        }
        if (res.ok) {
            showToast(`Order status updated to ${newStatus}`);
            await loadAdminOrdersFromApi();
        } else {
            const errData = await res.json();
            showToast(errData.message || "Failed to update order status");
        }
    } catch(e) {
        console.error(e);
        showToast("Error updating order status");
    }
}
initKey("iselectrics-categories", defaultCategoriesList);
initKey("iselectrics-coupons", defaultCouponsList);
initKey("iselectrics-wallet", defaultWalletList);

// Ensure Add Coupon button works even if inline onclick fails
document.addEventListener('DOMContentLoaded', () => {
  const addCouponBtn = document.getElementById('add-coupon-btn');
  if (addCouponBtn) {
    addCouponBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCouponModal();
    });
  }
});

const defaultReviewsList = [
  {
    id: "rev-1",
    productId: "3",
    name: "Rahul Sharma",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    date: "2026-05-12",
    stars: 5,
    message: "Quality is amazing 😍 The cover perfectly fits my iPhone 15 and delivery was super fast.",
    verified: true,
    visible: true
  },
  {
    id: "rev-2",
    productId: "3",
    name: "Priya Patel",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    date: "2026-05-15",
    stars: 5,
    message: "Absolutely stunning! The colors are vibrant and it shields my phone perfectly. Strongly recommend it to iPhone users.",
    verified: true,
    visible: true
  },
  {
    id: "rev-3",
    productId: "3",
    name: "Amit Verma",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    date: "2026-05-18",
    stars: 4,
    message: "Excellent build quality. Delivery took 3 days but customer support was very helpful in tracking the package.",
    verified: false,
    visible: true
  }
];
initKey("iselectrics-reviews", defaultReviewsList);

function getProducts() {
  const products = JSON.parse(localStorage.getItem("iselectrics-products")) || [];
  const meta = getProductDisplayMeta();
  return products.map(product => ({
    ...product,
    models: normalizeProductModels(product),
    sections: meta[product.id]?.sections || product.sections || []
  }));
}

function saveProducts(products) {
  localStorage.setItem("iselectrics-products", JSON.stringify(products));
}

function getProductDisplayMeta() {
  try {
    return JSON.parse(localStorage.getItem("iselectrics-product-display-meta") || "{}");
  } catch (e) {
    return {};
  }
}

function getProductModelMeta() {
  try {
    return JSON.parse(localStorage.getItem("iselectrics-product-model-meta") || "{}");
  } catch (e) {
    return {};
  }
}

function normalizeProductModels(product) {
  if (!product) return [];
  const modelMeta = getProductModelMeta();
  const metaModels = modelMeta[product.id]?.models || modelMeta[String(product.id)]?.models;
  const productModels = parseProductArray(product.models).map((model) => String(model).trim()).filter(Boolean);
  const rawModels = productModels.length ? productModels : (metaModels || []);
  let models = rawModels;
  if (typeof rawModels === "string") {
    try {
      models = JSON.parse(rawModels || "[]");
    } catch (e) {
      models = rawModels.split(",");
    }
  }
  return Array.isArray(models)
    ? [...new Set(models.map((model) => String(model).trim()).filter(Boolean))]
    : [];
}

function parseProductArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      return JSON.parse(value || "[]");
    } catch (e) {
      return value.split(",");
    }
  }
  return [];
}

function resolveImageUrl(image) {
  if (!image) return "";
  if (typeof image === "string") {
    const trimmed = image.trim();
    return trimmed === "Array" ? "" : trimmed;
  }
  if (typeof image === "object") {
    return String(image.url || image.image || "").trim();
  }
  return "";
}

function buildProductImagesPayload() {
  const images = [];
  if (thumbnailImageUrl) {
    images.push({ url: thumbnailImageUrl, color: "", model: "" });
  }
  uploadedImages.forEach((imgObj) => {
    // Support both old { url } and new { urls[] } formats
    const urlList = imgObj.urls && imgObj.urls.length
      ? imgObj.urls
      : (imgObj.url ? [imgObj.url] : []);
    urlList.forEach(u => {
      const resolved = resolveImageUrl({ url: u, color: imgObj.color, model: imgObj.model });
      if (!resolved) return;
      images.push({
        url: resolved,
        color: imgObj.color || "",
        model: imgObj.model || ""
      });
    });
  });
  return images;
}

function getSelectedProductSections() {
  const sections = [];
  if (document.getElementById("section-newly-launched")?.checked) sections.push("newly-launched");
  if (document.getElementById("section-recommended")?.checked) sections.push("recommended");
  if (document.getElementById("section-style")?.checked) sections.push("style");
  return sections;
}

function saveProductDisplaySections(productId, sections) {
  if (!productId) return;
  const meta = getProductDisplayMeta();
  meta[String(productId)] = { ...(meta[String(productId)] || {}), sections };
  localStorage.setItem("iselectrics-product-display-meta", JSON.stringify(meta));

  const storedProducts = JSON.parse(localStorage.getItem("iselectrics-products") || "[]");
  const nextProducts = storedProducts.map(product => (
    String(product.id) === String(productId) ? { ...product, sections } : product
  ));
  localStorage.setItem("iselectrics-products", JSON.stringify(nextProducts));
}

function saveProductModels(productId, models) {
  if (!productId) return;
  const cleanModels = [...new Set((models || []).map((model) => String(model).trim()).filter(Boolean))];
  const meta = getProductModelMeta();
  meta[String(productId)] = { ...(meta[String(productId)] || {}), models: cleanModels };
  localStorage.setItem("iselectrics-product-model-meta", JSON.stringify(meta));

  const storedProducts = JSON.parse(localStorage.getItem("iselectrics-products") || "[]");
  const nextProducts = storedProducts.map(product => (
    String(product.id) === String(productId) ? { ...product, models: cleanModels } : product
  ));
  localStorage.setItem("iselectrics-products", JSON.stringify(nextProducts));
}

function getAssignedIphoneModels() {
  const storedProducts = JSON.parse(localStorage.getItem("iselectrics-products") || "[]");
  const modelMeta = getProductModelMeta();
  const fromProducts = storedProducts
    .filter(product => String(product.category || "").toLowerCase() === "mobile")
    .flatMap(product => normalizeProductModels(product));
  const fromMeta = Object.values(modelMeta).flatMap(entry => Array.isArray(entry?.models) ? entry.models : []);
  return [...new Set([...fromProducts, ...fromMeta].map(model => String(model).trim()).filter(Boolean))];
}

function sectionBadges(product) {
  const sections = product.sections || [];
  const labels = {
    "newly-launched": "Newly Launched",
    recommended: "Recommended",
    style: "Style"
  };
  if (!sections.length) return '<span style="color:var(--muted); font-size:12px;">Not featured</span>';
  return sections.map(section => `<span class="status active" style="margin-right:6px; margin-bottom:4px;">${labels[section] || section}</span>`).join("");
}

async function loadProductsFromApi() {
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const data = await res.json();
      const mappedProducts = data.map(p => ({
        id: p.id.toString(),
        name: p.name,
        category: p.category,
        price: p.price,
        oldPrice: p.old_price || p.price,
        rating: p.rating || 0,
        reviews: p.reviews || 0,
        image: resolveImageUrl(p.image) || "images/default-cover.png",
        video: (p.video && p.video !== "null" && p.video !== "undefined") ? p.video : "",
        colors: parseProductArray(p.colors),
        models: parseProductArray(p.models).map((model) => String(model).trim()).filter(Boolean),
        images: parseProductArray(p.images),
        detail: p.detail || "",
        sku: `MB-${p.category.toUpperCase().substring(0, 3)}-${p.id}`,
        stock: 150,
        sections: getProductDisplayMeta()[p.id]?.sections || [
          ...(Number(p.is_newly_launched) ? ["newly-launched"] : []),
          ...(Number(p.is_recommended) ? ["recommended"] : []),
          ...(Number(p.is_style) ? ["style"] : [])
        ]
      }));
      localStorage.setItem("iselectrics-products", JSON.stringify(mappedProducts));
      if (document.getElementById("products-table")) {
        renderProductsPanel();
      }
    }
  } catch(e) {
    console.error(e);
  }
}
loadProductsFromApi();

// Helper to populate user details sidebar
function populateUserDetails(userId) {
  const usersList = JSON.parse(localStorage.getItem("iselectrics-users")) || [];
  const cleanId = userId.replace("#", "");
  const user = usersList.find(u => u.id.replace("#", "") === cleanId);
  if (!user) return;
  
  const detailsSidebar = document.querySelector(".user-details");
  if (detailsSidebar) {
    detailsSidebar.dataset.activeUserId = user.id;
  }

  // Populate/Sync user selection dropdown
  const userSelect = document.getElementById("detail-user-select");
  if (userSelect) {
    userSelect.innerHTML = usersList.map(u => `<option value="${u.id}">${u.name} (${u.id})</option>`).join("");
    userSelect.value = user.id;
  }
  
  const avatarEl = document.getElementById("detail-avatar");
  const nameStatusEl = document.getElementById("detail-name-status");
  const contactInfoEl = document.getElementById("detail-contact-info");
  const userIdEl = document.getElementById("detail-user-id");
  const registeredEl = document.getElementById("detail-registered");
  const totalOrdersEl = document.getElementById("detail-total-orders");
  const totalSpendEl = document.getElementById("detail-total-spend");
  const walletBalanceEl = document.getElementById("detail-wallet-balance");
  const rewardPointsEl = document.getElementById("detail-reward-points");
  
  if (avatarEl) avatarEl.textContent = user.avatar;
  if (nameStatusEl) {
    const statusClass = user.status.toLowerCase() === "blocked" ? "inactive" : "active";
    nameStatusEl.innerHTML = `${user.name} <span class="status ${statusClass}" style="font-size: 11px; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">${user.status}</span>`;
  }
  if (contactInfoEl) contactInfoEl.innerHTML = `${user.email}<br>${user.mobile}`;
  if (userIdEl) userIdEl.textContent = `User ID: ${user.id}`;
  if (registeredEl) registeredEl.textContent = `Registered: ${user.createdAt || "N/A"}`;

  const allOrdersList = JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
  const filteredOrders = filterByDateRange(allOrdersList, 'rawDate');
  const userOrders = filteredOrders.filter(o => Number(o.userId) === Number(user.dbId));
  const userOrdersCount = userOrders.length;
  const userOrdersSpend = userOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);

  if (totalOrdersEl) totalOrdersEl.textContent = userOrdersCount;
  if (totalSpendEl) totalSpendEl.textContent = "₹" + userOrdersSpend.toLocaleString("en-IN");
  if (walletBalanceEl) walletBalanceEl.textContent = "₹" + Number(user.walletBalance || 0).toLocaleString("en-IN");
  if (rewardPointsEl) rewardPointsEl.textContent = Math.round(Number(user.walletBalance || 0) * 0.1);

  // Update Wishlist and Cart History button text counts dynamically
  const wishlistBtn = document.getElementById("detail-wishlist-btn");
  const cartBtn = document.getElementById("detail-cart-btn");
  const wishlistCount = (user.name.length * 3) % 7 + 2;
  const cartCount = (user.name.length * 2) % 5 + 1;
  if (wishlistBtn) wishlistBtn.innerHTML = `<span data-icon="heart"></span>Wishlist (${wishlistCount})`;
  if (cartBtn) cartBtn.innerHTML = `<span data-icon="cart"></span>Cart History (${cartCount})`;

  // Update Block User button state
  const blockBtn = document.querySelector(".quick-actions button.danger");
  if (blockBtn) {
    if (user.status === "Blocked") {
      blockBtn.innerHTML = `Unblock User`;
      blockBtn.style.color = "#10b981";
      blockBtn.style.borderColor = "rgba(16,185,129,0.2)";
    } else {
      blockBtn.innerHTML = `Block User`;
      blockBtn.style.color = "#ff5b67";
            blockBtn.style.borderColor = "rgba(255,91,103,0.2)";
    }
  }
}

// 1. Dashboard Executive Summary Table (Rahul Verma, etc.)
function renderDashboardSummaryUsers() {
  const allUsersList = JSON.parse(localStorage.getItem("iselectrics-users")) || [];
  const customersOnly = allUsersList.filter(u => u.status !== "Admin");
  const usersList = filterByDateRange(customersOnly, 'rawDate');
  
  // Update dashboard user metrics
  const dashboardTotalUsers = document.getElementById("dashboard-total-users");
  const dashboardTotalUsersSub = document.getElementById("dashboard-total-users-sub");
  if (dashboardTotalUsers) dashboardTotalUsers.textContent = usersList.length.toLocaleString();
  if (dashboardTotalUsersSub) dashboardTotalUsersSub.textContent = `Total ${usersList.length.toLocaleString()} users`;

  // Render users by city dynamically
  const cityCounts = {};
  usersList.forEach(u => {
      const city = u.city || "Online";
      cityCounts[city] = (cityCounts[city] || 0) + 1;
  });
  
  const donutEl = document.querySelector(".donut strong");
  if (donutEl) donutEl.textContent = usersList.length.toLocaleString();
  
  const legendListEl = document.querySelector(".legend-list");
  if (legendListEl) {
      legendListEl.innerHTML = Object.entries(cityCounts)
          .map(([city, count]) => {
              const percentage = usersList.length > 0 ? Math.round((count / usersList.length) * 100) : 0;
              return `<li><i class="others"></i>${city} <span>${percentage}% (${count})</span></li>`;
          })
          .join("");
  }
  
  // Populate first user's details by default if available
  if (usersList.length > 0) {
      populateUserDetails(usersList[0].id);
  }

  const body = document.getElementById("users-table");
  if (!body) return;

  const allOrdersList = JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
  const filteredOrdersList = filterByDateRange(allOrdersList, 'rawDate');
  const userStats = {};
  filteredOrdersList.forEach(o => {
    if (o.userId) {
      if (!userStats[o.userId]) {
        userStats[o.userId] = { count: 0, spend: 0 };
      }
      userStats[o.userId].count += 1;
      userStats[o.userId].spend += Number(o.total || 0);
    }
  });

  // Apply popover filters to dashboard summary list
  const filteredUsers = usersList.filter(user => {
    if (userFilterStatus !== "All") {
      const isUserActive = user.status === "Active" || user.status === "Admin";
      if (userFilterStatus === "Active" && !isUserActive) return false;
      if (userFilterStatus === "Inactive" && isUserActive) return false;
    }
    if (userFilterCity !== "All") {
      if (userFilterCity === "Others") {
        const standardCities = ["mumbai", "delhi", "surat", "bangalore", "lucknow", "chennai"];
        if (standardCities.includes(user.city.toLowerCase())) return false;
      } else {
        if (user.city.toLowerCase() !== userFilterCity.toLowerCase()) return false;
      }
    }
    const stats = userStats[user.dbId] || { count: 0, spend: 0 };
    if (userMinOrders !== null && stats.count < userMinOrders) return false;
    if (userMaxOrders !== null && stats.count > userMaxOrders) return false;
    if (userMinSpend !== null && stats.spend < userMinSpend) return false;
    if (userMaxSpend !== null && stats.spend > userMaxSpend) return false;
    return true;
  });

  body.innerHTML = filteredUsers.map((user) => {
    const stats = userStats[user.dbId] || { count: 0, spend: 0 };
    return `
    <tr>
      <td>
        <div class="user-cell">
          <span class="user-avatar">${user.avatar}</span>
          <span><strong>${user.name}</strong><small>${user.id}</small></span>
        </div>
      </td>
      <td>${user.mobile}</td>
      <td>${user.email}</td>
      <td>${user.city}</td>
      <td>${stats.count}</td>
      <td>₹${stats.spend.toLocaleString("en-IN")}</td>
      <td><span class="status ${user.status === "Active" || user.status === "Admin" ? "active" : "inactive"}">${user.status}</span></td>
      <td>${user.createdAt || "N/A"}</td>
      <td>
        <div class="table-actions">
          <button class="circle-btn view-user-btn" data-id="${user.id}" aria-label="View Details">${icon("eye")}</button>
          <button class="circle-btn three-dots-btn" data-id="${user.id}" aria-label="More Options">${icon("more")}</button>
        </div>
      </td>
    </tr>
    `;
  }).join("");
}

function renderUsersPanel() {
  const allUsersList = JSON.parse(localStorage.getItem("iselectrics-users")) || [];
  const customersOnly = allUsersList.filter(u => u.status !== "Admin");
  const usersList = filterByDateRange(customersOnly, 'rawDate');
  
  // Update Users panel metrics
  const usersTotalUsers = document.getElementById("users-total-users");
  const usersActiveUsers = document.getElementById("users-active-users");
  const usersNewUsers = document.getElementById("users-new-users");
  const usersInactiveUsers = document.getElementById("users-inactive-users");
  
  const activeCount = usersList.filter(u => u.status === "Active" || u.status === "Admin").length;
  const inactiveCount = usersList.filter(u => u.status === "Inactive").length;
  
  if (usersTotalUsers) usersTotalUsers.textContent = usersList.length.toLocaleString();
  if (usersActiveUsers) usersActiveUsers.textContent = activeCount.toLocaleString();
  if (usersInactiveUsers) usersInactiveUsers.textContent = inactiveCount.toLocaleString();
  if (usersNewUsers) usersNewUsers.textContent = usersList.length.toLocaleString();

  const body = document.getElementById("users-panel-table");
  if (!body) return;
  
  const searchVal = (document.getElementById("users-panel-search")?.value || "").toLowerCase();
  
  let filtered = usersList.filter(user => 
    user.name.toLowerCase().includes(searchVal) || 
    user.mobile.includes(searchVal) || 
    user.email.toLowerCase().includes(searchVal) ||
    user.city.toLowerCase().includes(searchVal)
  );

  const allOrdersList = JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
  const filteredOrdersList = filterByDateRange(allOrdersList, 'rawDate');
  const userStats = {};
  filteredOrdersList.forEach(o => {
    if (o.userId) {
      if (!userStats[o.userId]) {
        userStats[o.userId] = { count: 0, spend: 0 };
      }
      userStats[o.userId].count += 1;
      userStats[o.userId].spend += Number(o.total || 0);
    }
  });

  // Apply filters
  filtered = filtered.filter(user => {
    if (userFilterStatus !== "All") {
      const isUserActive = user.status === "Active" || user.status === "Admin";
      if (userFilterStatus === "Active" && !isUserActive) return false;
      if (userFilterStatus === "Inactive" && isUserActive) return false;
    }
    if (userFilterCity !== "All") {
      if (userFilterCity === "Others") {
        const standardCities = ["mumbai", "delhi", "surat", "bangalore", "lucknow", "chennai"];
        if (standardCities.includes(user.city.toLowerCase())) return false;
      } else {
        if (user.city.toLowerCase() !== userFilterCity.toLowerCase()) return false;
      }
    }
    const stats = userStats[user.dbId] || { count: 0, spend: 0 };
    if (userMinOrders !== null && stats.count < userMinOrders) return false;
    if (userMaxOrders !== null && stats.count > userMaxOrders) return false;
    if (userMinSpend !== null && stats.spend < userMinSpend) return false;
    if (userMaxSpend !== null && stats.spend > userMaxSpend) return false;
    return true;
  });

  // Set total items for pagination
  const pagEl = document.getElementById("users-panel-pagination");
  if (pagEl) {
    pagEl.dataset.totalItems = filtered.length;
  }

  // Slice for pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  if (usersCurrentPage > totalPages && totalPages > 0) {
    usersCurrentPage = totalPages;
  }
  const startIndex = (usersCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageUsers = filtered.slice(startIndex, endIndex);

  // Update header showing text
  const startShow = filtered.length === 0 ? 0 : startIndex + 1;
  const endShow = Math.min(endIndex, filtered.length);
  const countEl = document.getElementById("users-panel-count");
  if (countEl) {
    countEl.textContent = `Showing ${startShow} to ${endShow} of ${filtered.length} results`;
  }
  
  // Render pagination controls
  renderPaginationControls("users-panel-pagination", totalPages, usersCurrentPage, "window.changeUsersPage");

  body.innerHTML = pageUsers.map(user => {
    const stats = userStats[user.dbId] || { count: 0, spend: 0 };
    return `
    <tr>
      <td>
        <div class="avatar-cell">
          <span class="avatar-circle">${user.avatar}</span>
          <span><strong>${user.name}</strong><br><small style="color:var(--muted); font-size:11px;">${user.id}</small></span>
        </div>
      </td>
      <td>${user.mobile}</td>
      <td>${user.email}</td>
      <td>${user.city}</td>
      <td>${stats.count}</td>
      <td>₹${stats.spend.toLocaleString("en-IN")}</td>
      <td><span class="status ${user.status === "Active" || user.status === "Admin" ? "active" : "inactive"}">${user.status}</span></td>
      <td>${user.createdAt || "N/A"}</td>
      <td>
        <div class="table-actions">
          <button class="circle-btn view-user-btn" data-id="${user.id}" aria-label="View Details">${icon("eye")}</button>
        </div>
      </td>
    </tr>
    `;
  }).join("");
}

// 3. Orders dedicated Panel Tab
let currentOrdersFilter = "all";
function renderOrdersPanel() {
  const currentAdminJson = localStorage.getItem("admin-current-user");
  const currentAdmin = currentAdminJson ? JSON.parse(currentAdminJson) : null;
  const isSuperAdmin = currentAdmin && currentAdmin.is_super === true;

  const allOrdersList = JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
  const ordersList = filterByDateRange(allOrdersList, 'rawDate');
  const body = document.getElementById("orders-panel-table");
  
  // Update metrics
  const totalAmount = ordersList.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const pendingCount = ordersList.filter(o => o.status === "Pending").length;
  const deliveredCount = ordersList.filter(o => o.status === "Delivered").length;
  const abandonedCarts = Math.round(ordersList.length * 0.4) + 1;
  
  const dashboardTotalOrders = document.getElementById("dashboard-total-orders");
  const dashboardTotalRevenue = document.getElementById("dashboard-total-revenue");
  const dashboardPendingOrders = document.getElementById("dashboard-pending-orders");
  const dashboardDeliveredOrders = document.getElementById("dashboard-delivered-orders");
  const dashboardCartAbandoned = document.getElementById("dashboard-cart-abandoned");
  const ordersTotalCount = document.getElementById("orders-total-count");
  const ordersTotalAmount = document.getElementById("orders-total-amount");
  const ordersCodCount = document.getElementById("orders-cod-count");
  const ordersOnlineCount = document.getElementById("orders-online-count");
  const ordersReferralCount = document.getElementById("orders-referral-count");
  
  const codCount = ordersList.filter(o => o.payment === "COD").length;
  const onlineCount = ordersList.filter(o => o.payment === "Online").length;
  const referralCount = ordersList.filter(o => o.referrerName).length;
  
  if (dashboardTotalOrders) dashboardTotalOrders.textContent = ordersList.length.toLocaleString();
  if (dashboardTotalRevenue) dashboardTotalRevenue.textContent = "Rs." + totalAmount.toLocaleString("en-IN");
  if (dashboardPendingOrders) dashboardPendingOrders.textContent = pendingCount.toLocaleString();
  if (dashboardDeliveredOrders) dashboardDeliveredOrders.textContent = deliveredCount.toLocaleString();
  if (dashboardCartAbandoned) dashboardCartAbandoned.textContent = abandonedCarts.toLocaleString();
  if (ordersTotalCount) ordersTotalCount.textContent = ordersList.length.toLocaleString();
  if (ordersTotalAmount) ordersTotalAmount.textContent = "₹" + totalAmount.toLocaleString("en-IN");
  if (ordersCodCount) ordersCodCount.textContent = codCount.toLocaleString();
  if (ordersOnlineCount) ordersOnlineCount.textContent = onlineCount.toLocaleString();
  if (ordersReferralCount) ordersReferralCount.textContent = referralCount.toLocaleString();

  // Dynamically update the filter tab counts to match the screenshot pills!
  const allTab = document.querySelector("#orders-filter-tabs button[data-filter='all']");
  const codTab = document.querySelector("#orders-filter-tabs button[data-filter='COD']");
  const onlineTab = document.querySelector("#orders-filter-tabs button[data-filter='Online']");
  if (allTab) allTab.textContent = `All (${ordersList.length})`;
  if (codTab) codTab.textContent = `COD (${codCount})`;
  if (onlineTab) onlineTab.textContent = `Online (${onlineCount})`;
  
  if (!body) return;
  
  const searchVal = (document.getElementById("orders-panel-search")?.value || "").toLowerCase();
  
  let filtered = ordersList;
  if (currentOrdersFilter === "COD") {
    filtered = ordersList.filter(o => o.payment === "COD");
  } else if (currentOrdersFilter === "Online") {
    filtered = ordersList.filter(o => o.payment === "Online");
  }
  
  filtered = filtered.filter(order => 
    order.id.toLowerCase().includes(searchVal) || 
    order.customer.toLowerCase().includes(searchVal) ||
    order.mobile.includes(searchVal) ||
    order.productName.toLowerCase().includes(searchVal) ||
    order.referrerName.toLowerCase().includes(searchVal)
  );

  // Apply additional popover filters (status, amount range)
  filtered = filtered.filter(order => {
    if (orderFilterStatus !== "All" && order.status !== orderFilterStatus) return false;
    const amt = Number(order.total || 0);
    if (orderMinAmount !== null && amt < orderMinAmount) return false;
    if (orderMaxAmount !== null && amt > orderMaxAmount) return false;
    return true;
  });

  // Set total items for pagination
  const pagEl = document.getElementById("orders-panel-pagination");
  if (pagEl) {
    pagEl.dataset.totalItems = filtered.length;
  }

  // Calculate pages
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  if (ordersCurrentPage > totalPages && totalPages > 0) {
    ordersCurrentPage = totalPages;
  }
  const startIndex = (ordersCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageOrders = filtered.slice(startIndex, endIndex);

  // Render pagination
  renderPaginationControls("orders-panel-pagination", totalPages, ordersCurrentPage, "window.changeOrdersPage");
  
  body.innerHTML = pageOrders.map(order => {
    let referralSourceHtml = '';
    
    // Truncate product name to 4 words with premium hover tooltip
    let productNameHtml = `<strong>${order.productName || ''}</strong>`;
    if (order.productName) {
      const words = order.productName.split(/\s+/);
      if (words.length > 4) {
        const truncated = words.slice(0, 4).join(" ");
        productNameHtml = `
          <span class="product-name-tooltip-container">
            <strong>${truncated} <span class="tooltip-dots">...</span></strong>
            <span class="product-name-tooltip">${order.productName}</span>
          </span>
        `;
      }
    }

    if (order.referrerName) {
      const rewardEarned = order.referralRewardAmount > 0 && order.referralStatus === 'Completed';
      referralSourceHtml = `
        <div style="display:flex; flex-direction:column; gap:2px;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="color:#f472b6; display:inline-flex; align-items:center; justify-content:center;">
              <svg style="width:13px; height:13px; stroke-width:2.4;" viewBox="0 0 24 24" aria-hidden="true">${adminIcons.user}</svg>
            </span>
            <strong style="color:white; font-size:13px; font-weight:600;">${order.referrerName}</strong>
          </div>
          <span style="font-size:11px; color:rgba(255,255,255,0.4); padding-left:19px;">(${order.referrerPhone || 'No Phone'})</span>
          ${rewardEarned ? `<span style="display:inline-flex; align-items:center; gap:4px; margin-top:3px; padding-left:19px;">
            <svg style="width:11px; height:11px; color:#20dfbd;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span style="font-size:11px; color:#20dfbd; font-weight:700;">+₹${order.referralRewardAmount} Earned</span>
          </span>` : ''}
        </div>
      `;
    } else {
      referralSourceHtml = `
        <div style="display:flex; flex-direction:column; gap:2px;">
          <span style="color:rgba(255,255,255,0.3); font-size:13px; font-weight:600; padding-left:2px;">—</span>
          <span style="font-size:11px; color:rgba(255,255,255,0.4); padding-left:2px;">Direct Order</span>
        </div>
      `;
    }
    return `
      <tr>
        <td><strong style="color:var(--cyan);">#${order.id}</strong></td>
        <td>
          <div class="avatar-cell">
            <span class="avatar-circle" style="background:rgba(255,255,255,0.05); color:white;">${order.avatar}</span>
            <div style="display:flex; flex-direction:column; gap:2px;">
              <strong>${order.customer}</strong>
              <span style="font-size:11px; color:rgba(255,255,255,0.4);">${order.mobile}</span>
            </div>
          </div>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            ${productNameHtml}
            <span style="font-size:11px; background:rgba(255,255,255,0.08); padding:2px 6px; border-radius:4px; color:rgba(255,255,255,0.6)">x${order.qty}</span>
          </div>
        </td>
        <td>₹${Number(order.total).toLocaleString("en-IN")}</td>
        <td><span class="status ${order.payment === "COD" ? "pending" : "active"}">${order.payment}</span></td>
        <td>${referralSourceHtml}</td>
        <td>
          <div style="display:flex; flex-direction:column; gap:2px; white-space:nowrap;">
            <strong style="font-size:12px; color:rgba(255,255,255,0.82);">${order.time || formatTime(order.rawDate) || 'N/A'}</strong>
            <span style="font-size:11px; color:rgba(255,255,255,0.48);">${order.date || 'N/A'}</span>
          </div>
        </td>
        <td><span class="status ${(order.status || "Pending").toLowerCase()}">${order.status || "Pending"}</span></td>
        <td>
          <div class="table-actions">
            ${order.status === "Pending" ? `
              <button class="circle-btn accept-btn" data-db-id="${order.dbId}" title="Accept Order" style="background:rgba(32, 223, 189, 0.15); color:#20dfbd; border:1px solid rgba(32, 223, 189, 0.3); cursor: pointer;">
                ${icon("check")}
              </button>
              ${isSuperAdmin ? `
              <button class="circle-btn decline-btn" data-db-id="${order.dbId}" title="Decline Order" style="background:rgba(255, 91, 103, 0.15); color:#ff5b67; border:1px solid rgba(255, 91, 103, 0.3); cursor: pointer;">
                ${icon("ban")}
              </button>
              ` : ''}
            ` : ''}
            <button class="circle-btn view-order-btn" data-db-id="${order.dbId}" title="View Order Details" style="cursor: pointer;">${icon("eye")}</button>
            <button class="circle-btn order-three-dots-btn" data-db-id="${order.dbId}" title="More Options" style="cursor: pointer;">${icon("more")}</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// 4. Products dedicated Panel Tab
function renderProductsPanel() {
  const products = getProducts();
  const body = document.getElementById("products-table");
  if (!body) return;
  
  const searchVal = (document.getElementById("products-panel-search")?.value || "").toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(searchVal));
  
  document.getElementById("products-panel-count").textContent = `Showing 1 to ${filtered.length} of ${products.length} results`;
  
  body.innerHTML = filtered.map((product) => `
    <tr>
      <td><img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: contain; background: rgba(255,255,255,0.05);"></td>
      <td><strong>${product.name}</strong></td>
      <td>${product.category}</td>
      <td>Rs.${Number(product.price).toLocaleString("en-IN")}</td>
      <td><div style="display:flex; flex-wrap:wrap; gap:4px;">${sectionBadges(product)}</div></td>
      <td>
        <div class="table-actions">
          <button class="circle-btn" onclick="window.handleDuplicateProduct('${product.id}')" style="color:#10f3ed; background:transparent; border:none; cursor:pointer;" aria-label="Duplicate ${product.name}">
            <svg viewBox="0 0 24 24" style="width:16px; height:16px; fill:currentColor;">${adminIcons.copy}</svg>
          </button>
          <button class="edit-btn circle-btn" data-id="${product.id}" aria-label="Edit ${product.name}">${icon("settings")}</button>
          <button class="circle-btn" onclick="handleDeleteProduct('${product.id}')" style="color:#ff5b67; background:transparent; border:none; cursor:pointer;" aria-label="Delete ${product.name}">${icon("trash")}</button>
        </div>
      </td>
    </tr>
  `).join("");
}

// 5. Categories dedicated Panel Tab
function renderCategoriesPanel() {
  const cats = JSON.parse(localStorage.getItem("iselectrics-categories")) || [];
  const body = document.getElementById("categories-panel-table");
  if (!body) return;
  
  body.innerHTML = cats.map((cat, idx) => `
    <tr>
      <td>
        <div class="avatar-cell">
          <span class="avatar-circle" style="background:rgba(255,255,255,0.05); color:white;">
            <svg viewBox="0 0 24 24" style="width:16px; height:16px;"><path fill="currentColor" d="M3 8h18V6H3v2zm0 5h18v-2H3v2zm0 5h18v-2H3v2z"/></svg>
          </span>
          <strong>${cat.name}</strong>
        </div>
      </td>
      <td><span style="color:var(--muted);">${cat.slug}</span></td>
      <td>${cat.products}</td>
      <td>
        <label class="switch">
          <input type="checkbox" ${cat.status === "Active" ? "checked" : ""} onchange="toggleCategoryStatus(${idx})">
          <span class="slider"></span>
        </label>
      </td>
      <td>
        <div class="table-actions">
          <button class="circle-btn" style="color:var(--cyan);" onclick="editCategory(${idx})">${icon("settings")}</button>
          <button class="circle-btn" style="color:#ff5b67;" onclick="deleteCategory(${idx})">
            <svg viewBox="0 0 24 24" style="width:16px; height:16px;"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

function populateCategoryDropdown(selectedCategory = "") {
  const selectEl = document.getElementById("edit-category");
  if (!selectEl) return;
  const cats = JSON.parse(localStorage.getItem("iselectrics-categories")) || [];
  const activeCats = cats.filter(c => c.status === "Active");
  
  if (selectedCategory && !activeCats.some(c => c.name.toLowerCase() === selectedCategory.toLowerCase())) {
    activeCats.push({ name: selectedCategory });
  }
  
  if (activeCats.length === 0) {
    selectEl.innerHTML = `
      <option value="Mobile">Mobile</option>
      <option value="Laptop">Laptop</option>
      <option value="Audio">Audio</option>
      <option value="Accessories">Accessories</option>
    `;
    return;
  }
  
  selectEl.innerHTML = activeCats.map(cat => `
    <option value="${escapeHtml(cat.name)}">${escapeHtml(cat.name)}</option>
  `).join("");
}

async function saveCategoriesToApi(cats) {
  localStorage.setItem("iselectrics-categories", JSON.stringify(cats));
  try {
    const token = localStorage.getItem("admin-user-token");
    await fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ categories: JSON.stringify(cats) })
    });
  } catch (e) {
    console.error("Failed to sync categories to API", e);
  }
}

async function loadCategoriesFromApi() {
  try {
    const res = await fetch('/api/settings', { headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      const settings = await res.json();
      if (settings.categories) {
        const parsed = JSON.parse(settings.categories);
        if (Array.isArray(parsed)) {
          localStorage.setItem("iselectrics-categories", settings.categories);
        }
      }
    }
  } catch (e) {
    console.error("Failed to load categories from API", e);
  }
}

function handleAddCategory() {
  const name = document.getElementById("cat-name").value.trim();
  const slug = document.getElementById("cat-slug").value.trim();
  const status = document.getElementById("cat-status").checked ? "Active" : "Inactive";
  
  if (!name || !slug) return;
  
  const cats = JSON.parse(localStorage.getItem("iselectrics-categories")) || [];
  cats.push({ name, slug, products: 0, status, image: pendingCategoryImage || "covers" });
  
  // Reset pending image
  pendingCategoryImage = "";
  const previewWrap = document.getElementById("cat-image-preview-wrap");
  if (previewWrap) previewWrap.style.display = "none";
  
  saveCategoriesToApi(cats).then(() => {
    renderCategoriesPanel();
    document.getElementById("add-category-form").reset();
    showToast("Category added successfully");
  });
}

window.clearCategoryImage = function() {
  pendingCategoryImage = "";
  const previewWrap = document.getElementById("cat-image-preview-wrap");
  if (previewWrap) previewWrap.style.display = "none";
  const input = document.getElementById("cat-image-input");
  if (input) input.value = "";
  showToast("Category image cleared");
};

function toggleCategoryStatus(idx) {
  const cats = JSON.parse(localStorage.getItem("iselectrics-categories")) || [];
  if (cats[idx]) {
    cats[idx].status = cats[idx].status === "Active" ? "Inactive" : "Active";
    const newStatus = cats[idx].status;
    saveCategoriesToApi(cats).then(() => {
      renderCategoriesPanel();
      showToast(`Category status set to ${newStatus}`);
    });
  }
}

function deleteCategory(idx) {
  if (confirm("Are you sure you want to delete this category?")) {
    const cats = JSON.parse(localStorage.getItem("iselectrics-categories")) || [];
    cats.splice(idx, 1);
    saveCategoriesToApi(cats).then(() => {
      renderCategoriesPanel();
      showToast("Category deleted");
    });
  }
}

function editCategory(idx) {
  const cats = JSON.parse(localStorage.getItem("iselectrics-categories")) || [];
  const cat = cats[idx];
  if (!cat) {
    showToast("Category not found");
    return;
  }
  
  document.getElementById("edit-cat-index").value = idx;
  document.getElementById("edit-cat-name").value = cat.name;
  document.getElementById("edit-cat-slug").value = cat.slug;
  document.getElementById("edit-cat-status").checked = cat.status === "Active";
  
  document.getElementById("category-modal").style.display = "flex";
}

function handleSaveCategory() {
  const idx = document.getElementById("edit-cat-index").value;
  const name = document.getElementById("edit-cat-name").value.trim();
  const slug = document.getElementById("edit-cat-slug").value.trim();
  const status = document.getElementById("edit-cat-status").checked ? "Active" : "Inactive";
  
  if (!name || !slug) {
    showToast("Please fill in all fields.");
    return;
  }
  
  const cats = JSON.parse(localStorage.getItem("iselectrics-categories")) || [];
  if (cats[idx]) {
    cats[idx].name = name;
    cats[idx].slug = slug;
    cats[idx].status = status;
    saveCategoriesToApi(cats).then(() => {
      renderCategoriesPanel();
      document.getElementById("category-modal").style.display = "none";
      showToast("Category updated successfully");
    });
  }
}

// 6. Coupons dedicated Panel Tab
function renderCouponsPanel() {
  const coupons = JSON.parse(localStorage.getItem("iselectrics-coupons")) || [];
  const body = document.getElementById("coupons-panel-table");
  if (!body) return;
  
  const searchVal = (document.getElementById("coupons-panel-search")?.value || "").toLowerCase();
  const filtered = coupons.filter(c => c.name.toLowerCase().includes(searchVal) || c.code.toLowerCase().includes(searchVal));
  
  document.getElementById("coupons-panel-count").textContent = `Showing 1 to ${filtered.length} of ${coupons.length} results`;
  
  body.innerHTML = filtered.map(coupon => `
    <tr>
      <td><strong>${coupon.name}</strong></td>
      <td><span style="background:rgba(255,255,255,0.05); padding:4px 8px; border-radius:4px; font-family:monospace; color:var(--cyan);">${coupon.code}</span></td>
      <td>${coupon.discount}</td>
      <td>₹${coupon.minOrder}</td>
      <td>${coupon.validTill}</td>
      <td>${coupon.usage}</td>
      <td><span class="status ${coupon.status === "Active" ? "active" : "inactive"}">${coupon.status}</span></td>
      <td>
        <div class="table-actions" style="display: flex; gap: 8px;">
          <button class="circle-btn" onclick="openCouponModal('${coupon.id}')" style="color:var(--cyan); background:transparent; border:none; cursor:pointer;" aria-label="Edit Coupon">${icon("settings")}</button>
          <button class="circle-btn" onclick="handleDeleteCoupon('${coupon.id}')" style="color:#ff5b67; background:transparent; border:none; cursor:pointer;" aria-label="Delete Coupon">${icon("trash")}</button>
        </div>
      </td>
    </tr>
  `).join("");
}

// 7. Wallet dedicated Panel Tab
function renderWalletPanel() {
  const walletsData = JSON.parse(localStorage.getItem("iselectrics-wallets-data")) || { users: [], metrics: { total_wallet_balance: 0, total_rewards_given: 0, total_successful_referrals: 0, total_pending_referrals: 0 } };
  const body = document.getElementById("wallet-panel-table");
  if (!body) return;

  const metrics = walletsData.metrics || { total_wallet_balance: 0, total_rewards_given: 0, total_successful_referrals: 0, total_pending_referrals: 0 };
  const balEl = document.getElementById("wallet-metric-total-balance");
  const rewEl = document.getElementById("wallet-metric-total-rewards");
  const succEl = document.getElementById("wallet-metric-successful-referrals");
  const pendEl = document.getElementById("wallet-metric-pending-referrals");

  if (balEl) balEl.textContent = `₹${metrics.total_wallet_balance.toLocaleString()}`;
  if (rewEl) rewEl.textContent = `₹${metrics.total_rewards_given.toLocaleString()}`;
  if (succEl) succEl.textContent = metrics.total_successful_referrals.toLocaleString();
  if (pendEl) pendEl.textContent = metrics.total_pending_referrals.toLocaleString();

  const usersList = walletsData.users || [];
  const searchVal = (document.getElementById("wallet-panel-search")?.value || "").toLowerCase();
  
  const filtered = usersList.filter(u => 
    u.name.toLowerCase().includes(searchVal) || 
    (u.phone && u.phone.toLowerCase().includes(searchVal)) || 
    (u.referral_code && u.referral_code.toLowerCase().includes(searchVal))
  );

  const countEl = document.getElementById("wallet-panel-count");
  if (countEl) {
    countEl.textContent = `Showing 1 to ${filtered.length} of ${usersList.length} results`;
  }

  body.innerHTML = filtered.map(u => {
    const avatar = u.name ? u.name.charAt(0).toUpperCase() : "?";
    const formattedDate = formatDate(u.created_at);
    
    return `
      <tr>
        <td>
          <div class="avatar-cell">
            <span class="avatar-circle" style="background:rgba(255,255,255,0.05); color:white;">${avatar}</span>
            <div>
              <strong>${u.name}</strong>
              <div style="font-size:11px; color:#8892b0; margin-top:2px;">${u.phone || u.email || "No contact"}</div>
            </div>
          </div>
        </td>
        <td>
          <span style="background:rgba(255,255,255,0.05); padding:4px 8px; border-radius:4px; font-family:monospace; color:var(--cyan); font-weight:600;">
            ${u.referral_code || "N/A"}
          </span>
        </td>
        <td>
          <span class="status active" style="font-weight:600; padding:4px 10px;">${u.successful_referrals}</span>
        </td>
        <td>
          <span class="status pending" style="font-weight:600; padding:4px 10px; color:#ffb03a; background:rgba(255,176,58,0.1);">${u.pending_referrals}</span>
        </td>
        <td>
          <strong style="color:#20dfbd;">₹${u.total_rewards.toLocaleString()}</strong>
        </td>
        <td>
          <strong style="color:white;">₹${u.wallet_balance.toLocaleString()}</strong>
        </td>
        <td style="color:#8892b0;">${formattedDate}</td>
      </tr>
    `;
  }).join("");
}

// 7b. Payouts dedicated Panel Tab
let payoutsList = [];
async function loadPayoutsFromApi() {
  try {
    const token = localStorage.getItem("admin-user-token");
    if (!token || token === "null" || token === "undefined") {
      return;
    }
    const res = await fetch('/api/admin/withdrawals', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.status === 401) {
      handleSessionExpired();
      return;
    }
    if (res.ok) {
      payoutsList = await res.json();
      
      // Update Payout Metrics
      let totalRequested = 0;
      let pendingAmount = 0;
      let approvedAmount = 0;
      let rejectedAmount = 0;
      
      payoutsList.forEach(w => {
        totalRequested += w.amount;
        if (w.status === 'Pending') pendingAmount += w.amount;
        else if (w.status === 'Approved') approvedAmount += w.amount;
        else if (w.status === 'Rejected') rejectedAmount += w.amount;
      });
      
      const reqEl = document.getElementById("payouts-metric-total-requested");
      const pendEl = document.getElementById("payouts-metric-pending");
      const appEl = document.getElementById("payouts-metric-approved");
      const rejEl = document.getElementById("payouts-metric-rejected");
      
      if (reqEl) reqEl.textContent = `₹${totalRequested.toLocaleString()}`;
      if (pendEl) pendEl.textContent = `₹${pendingAmount.toLocaleString()}`;
      if (appEl) appEl.textContent = `₹${approvedAmount.toLocaleString()}`;
      if (rejEl) rejEl.textContent = `₹${rejectedAmount.toLocaleString()}`;
      
      renderPayoutsPanel();
      updatePayoutsBadge();
    }
  } catch (e) {
    console.error("Failed to load payouts from API:", e);
  }
}

function renderPayoutsPanel() {
  const body = document.getElementById("payouts-panel-table");
  if (!body) return;
  
  const searchVal = (document.getElementById("payouts-panel-search")?.value || "").toLowerCase();
  const statusFilter = document.getElementById("payouts-panel-filter-status")?.value || "All";
  const methodFilter = document.getElementById("payouts-panel-filter-method")?.value || "All";
  
  const filtered = payoutsList.filter(w => {
    const matchesSearch = 
      (w.user?.name || "").toLowerCase().includes(searchVal) ||
      (w.user?.email || "").toLowerCase().includes(searchVal) ||
      (w.user?.phone || "").toLowerCase().includes(searchVal) ||
      (w.status || "").toLowerCase().includes(searchVal);
      
    const matchesStatus = statusFilter === "All" || w.status === statusFilter;
    const matchesMethod = methodFilter === "All" || w.method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });
  
  const countEl = document.getElementById("payouts-panel-count");
  if (countEl) {
    countEl.textContent = `Showing 1 to ${filtered.length} of ${payoutsList.length} results`;
  }
  
  body.innerHTML = filtered.map(w => {
    const avatar = w.user?.name ? w.user.name.charAt(0).toUpperCase() : "?";
    const formattedDate = formatDate(w.created_at);
    
    let paymentDetailsHtml = "";
    if (w.method === 'bank') {
      paymentDetailsHtml = `
        <div style="font-size: 11px; line-height: 1.4;">
          <strong>Bank:</strong> ${w.bank_name || 'N/A'}<br>
          <strong>Holder:</strong> ${w.account_name || 'N/A'}<br>
          <strong>A/C No:</strong> ${w.account_number || 'N/A'}<br>
          <strong>IFSC:</strong> ${w.ifsc_code || 'N/A'}
        </div>
      `;
    } else {
      paymentDetailsHtml = `
        <div style="font-size: 11px; line-height: 1.4;">
          ${w.upi_id ? `<strong>UPI ID:</strong> ${w.upi_id}<br>` : ''}
          ${w.upi_qr_code ? `
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
              <img src="${w.upi_qr_code}" style="height: 42px; width: 42px; object-fit: contain; background: white; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; cursor: pointer; padding: 2px;" onclick="window.viewQrCode('${w.upi_qr_code}')" title="Click to enlarge">
              <small style="color: var(--cyan); text-decoration: underline; cursor: pointer;" onclick="window.viewQrCode('${w.upi_qr_code}')">View QR</small>
            </div>
          ` : ''}
        </div>
      `;
    }
    
    let statusClass = "status pending";
    if (w.status === "Approved") statusClass = "status active";
    else if (w.status === "Rejected") statusClass = "status declined";
    
    let actionsHtml = "";
    if (w.status === "Pending") {
      actionsHtml = `
        <div style="display: flex; gap: 8px;">
          <button type="button" class="btn-teal" style="padding: 6px 12px; font-size: 11px; background: #20dfbd; color: #000; font-weight: 700; border: none; border-radius: 4px; cursor: pointer;" onclick="window.updatePayoutStatus(${w.id}, 'Approved')">Approve</button>
          <button type="button" class="btn-teal" style="padding: 6px 12px; font-size: 11px; background: #ff5b67; color: #fff; font-weight: 700; border: none; border-radius: 4px; cursor: pointer;" onclick="window.updatePayoutStatus(${w.id}, 'Rejected')">Reject</button>
        </div>
      `;
    } else {
      actionsHtml = `<span style="color: #8892b0; font-size: 11px;">Processed</span>`;
    }
    
    return `
      <tr>
        <td>
          <div class="avatar-cell">
            <span class="avatar-circle" style="background:rgba(255,255,255,0.05); color:white;">${avatar}</span>
            <div>
              <strong>${w.user?.name || 'Unknown'}</strong>
              <div style="font-size:11px; color:#8892b0; margin-top:2px;">
                ${w.user?.phone || 'N/A'} • ${w.user?.email || 'N/A'}
              </div>
            </div>
          </div>
        </td>
        <td>
          <strong style="color: white; font-size: 13px;">₹${w.amount.toLocaleString()}</strong>
        </td>
        <td>
          <span style="background:rgba(255,255,255,0.05); padding:4px 8px; border-radius:4px; font-family:monospace; color:var(--cyan); font-weight:600; font-size: 11px;">
            ${w.method === 'bank' ? 'Bank Transfer' : 'UPI QR'}
          </span>
        </td>
        <td>
          ${paymentDetailsHtml}
        </td>
        <td>
          <span class="${statusClass}">${w.status}</span>
        </td>
        <td style="color:#8892b0;">${formattedDate}</td>
        <td>
          ${actionsHtml}
        </td>
      </tr>
    `;
  }).join("");
}

async function updatePayoutStatus(id, newStatus) {
  if (!confirm(`Are you sure you want to set the status of this payout request to ${newStatus}?`)) {
    return;
  }
  try {
    const token = localStorage.getItem("admin-user-token");
    const res = await fetch(`/api/admin/withdrawals/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ status: newStatus })
    });
    
    const data = await res.json();
    if (res.ok) {
      showToast(`Payout request ${newStatus.toLowerCase()} successfully!`);
      loadPayoutsFromApi();
      loadWalletsFromApi();
    } else {
      showToast(data.message || "Failed to update payout request status");
    }
  } catch (err) {
    console.error(err);
    showToast("Network error updating request status");
  }
}

window.viewQrCode = function(base64Image) {
  let modal = document.getElementById("qr-viewer-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "qr-viewer-modal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(0,0,0,0.85)";
    modal.style.backdropFilter = "blur(8px)";
    modal.style.zIndex = "99999";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.padding = "20px";
    modal.innerHTML = `
      <div style="position: relative; max-width: 90%; max-height: 90%; text-align: center;">
        <button onclick="document.getElementById('qr-viewer-modal').remove()" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 30px; cursor: pointer;">&times;</button>
        <img id="qr-viewer-img" src="" style="max-width: 100%; max-height: 80vh; border-radius: 8px; border: 2px solid white; background: white; padding: 10px;">
      </div>
    `;
    document.body.appendChild(modal);
  }
  modal.querySelector("#qr-viewer-img").src = base64Image;
  modal.style.display = "flex";
};

window.loadPayoutsFromApi = loadPayoutsFromApi;
window.renderPayoutsPanel = renderPayoutsPanel;
window.updatePayoutStatus = updatePayoutStatus;

async function loadReviewsFromApi() {
  const token = localStorage.getItem("admin-user-token");
  try {
    const res = await fetch('/api/reviews', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    if (res.ok) {
      const data = await res.json();
      const formatted = data.map(r => ({
        id: r.id.toString(),
        productId: r.product_id.toString(),
        name: r.customer_name,
        avatar: r.avatar || "U",
        productImage: r.product_image || "",
        date: r.created_at ? r.created_at.split(' ')[0] : "",
        stars: r.rating,
        message: r.comment || "",
        verified: r.verified === 1 || r.verified === true,
        visible: r.visible === 1 || r.visible === true,
        likes: r.likes || 0
      }));
      localStorage.setItem("iselectrics-reviews", JSON.stringify(formatted));
    }
  } catch (e) {
    console.error("Failed to load reviews from API", e);
  }
}
window.loadReviewsFromApi = loadReviewsFromApi;

// 8. Reviews dedicated Panel Tab
function renderReviewsPanel() {
  const reviewsList = JSON.parse(localStorage.getItem("iselectrics-reviews")) || [];
  const grid = document.getElementById("reviews-container-grid");
  if (!grid) return;

  const searchVal = (document.getElementById("reviews-panel-search")?.value || "").toLowerCase();
  const starsFilter = document.getElementById("reviews-filter-stars")?.value || "all";
  const visibilityFilter = document.getElementById("reviews-filter-visibility")?.value || "all";

  let filtered = reviewsList.filter(rev => 
    rev.name.toLowerCase().includes(searchVal) || 
    rev.message.toLowerCase().includes(searchVal)
  );

  if (starsFilter !== "all") {
    filtered = filtered.filter(rev => rev.stars === parseInt(starsFilter));
  }

  if (visibilityFilter !== "all") {
    filtered = filtered.filter(rev => rev.visible === (visibilityFilter === "visible"));
  }

  // Compute Summary Metrics
  const total = reviewsList.length;
  const avg = total > 0 ? (reviewsList.reduce((sum, r) => sum + r.stars, 0) / total).toFixed(1) : "0.0";
  const verified = reviewsList.filter(r => r.verified).length;
  const hidden = reviewsList.filter(r => !r.visible).length;

  document.getElementById("reviews-total-count").textContent = total;
  document.getElementById("reviews-avg-rating").textContent = avg;
  document.getElementById("reviews-verified-count").textContent = verified;
  document.getElementById("reviews-hidden-count").textContent = hidden;

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 40px;">No reviews found matching the filters.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(rev => {
    const starsHtml = "⭐".repeat(rev.stars);
    const verifiedBadge = rev.verified ? `
      <span style="display:inline-flex; align-items:center; gap:3px; background:rgba(32, 223, 189, 0.1); color:#20dfbd; padding:2px 8px; border-radius:12px; font-size:10px; font-weight:600;">
        ✓ Verified Purchase
      </span>
    ` : "";
    
    const statusBadge = rev.visible ? `
      <span style="background:rgba(32, 223, 189, 0.1); color:#20dfbd; padding:2px 6px; border-radius:4px; font-size:11px; font-weight:600;">Visible</span>
    ` : `
      <span style="background:rgba(255, 91, 103, 0.1); color:#ff5b67; padding:2px 6px; border-radius:4px; font-size:11px; font-weight:600;">Hidden</span>
    `;

    const avatarColors = ['#6366f1','#20dfbd','#ff5b67','#ffb800','#3b82f6','#a855f7','#f97316'];
    const colorIndex = (rev.name.charCodeAt(0) || 0) % avatarColors.length;
    const avatarColor = avatarColors[colorIndex];
    const initials = rev.name.trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    const productImageHtml = rev.productImage ? `<img src="${rev.productImage}" alt="product" style="width:48px; height:48px; border-radius:8px; object-fit:cover; border:1px solid rgba(255,255,255,0.1); flex-shrink:0;">` : '';

    return `
      <div class="panel" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid ${rev.visible ? 'rgba(255,255,255,0.05)' : 'rgba(255,91,103,0.2)'}; position: relative; gap: 15px; margin: 0;">
        <div>
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <div style="width:48px; height:48px; border-radius:50%; background:${avatarColor}; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700; color:white; flex-shrink:0; letter-spacing:0.5px;">${initials}</div>
            <div style="flex: 1;">
              <h3 style="font-size: 15px; font-weight: 600; color: white; display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                ${rev.name} ${verifiedBadge}
              </h3>
              <small style="color: var(--muted); font-size: 11px;">📅 ${rev.date}</small>
            </div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
            <div style="color: #ffb800; font-size: 14px;">${starsHtml}</div>
            ${productImageHtml}
          </div>
          <p style="color: #8892b0; font-size: 13.5px; line-height: 1.5; font-style: italic; margin: 0;">“${rev.message}”</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px;">
          <div>${statusBadge}</div>
          <div style="display: flex; gap: 6px;">
            <button class="tab-btn" onclick="openReviewModal('${rev.id}')" style="padding: 4px 8px; font-size: 11px; font-weight:600; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; color: white; background: transparent; cursor: pointer;">Edit</button>
            <button class="tab-btn" onclick="toggleReviewVisibility('${rev.id}')" style="padding: 4px 8px; font-size: 11px; font-weight:600; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; color: ${rev.visible ? '#ff5b67' : '#20dfbd'}; background: transparent; cursor: pointer;">
              ${rev.visible ? 'Hide' : 'Show'}
            </button>
            <button class="tab-btn" onclick="deleteReview('${rev.id}')" style="padding: 4px 8px; font-size: 11px; font-weight:600; background: rgba(255, 91, 103, 0.1); border: 1px solid rgba(255, 91, 103, 0.2); border-radius: 4px; color: #ff5b67; cursor: pointer;">Delete</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function openReviewModal(id = "") {
  const modal = document.getElementById("review-modal");
  const title = document.getElementById("review-modal-title");
  const form = document.getElementById("review-form");

  const productSelect = document.getElementById("review-product-id");
  if (productSelect) {
    const products = getProducts();
    productSelect.innerHTML = products.map(p => `<option value="${p.id}">${p.name} (ID: ${p.id})</option>`).join("");
  }

  // Always reset the image drop zone first
  clearReviewImage();

  // Init drag & drop each time (re-clones the zone to remove old listeners)
  initReviewImageUpload();
  
  if (id) {
    title.textContent = "Edit Review";
    const reviews = JSON.parse(localStorage.getItem("iselectrics-reviews")) || [];
    const rev = reviews.find(r => r.id === id);
    if (rev) {
      document.getElementById("review-id").value = rev.id;
      document.getElementById("review-product-id").value = rev.productId || "";
      document.getElementById("review-customer-name").value = rev.name;
      document.getElementById("review-date").value = rev.date;
      document.getElementById("review-stars").value = rev.stars;
      document.getElementById("review-message").value = rev.message;
      document.getElementById("review-verified").checked = rev.verified;
      document.getElementById("review-visible").checked = rev.visible;
      // Restore image preview if exists
      if (rev.productImage) {
        setReviewImagePreview(rev.productImage);
      }
    }
  } else {
    title.textContent = "Add Review";
    form.reset();
    document.getElementById("review-id").value = "";
    document.getElementById("review-date").value = new Date().toISOString().split('T')[0];
    document.getElementById("review-verified").checked = true;
    document.getElementById("review-visible").checked = true;
  }
  modal.style.display = "flex";
}

async function handleSaveReview() {
  const id = document.getElementById("review-id").value;
  const productId = document.getElementById("review-product-id").value;
  const name = document.getElementById("review-customer-name").value.trim();
  const productImage = document.getElementById("review-photo-url").value.trim();
  const date = document.getElementById("review-date").value;
  const stars = parseInt(document.getElementById("review-stars").value);
  const message = document.getElementById("review-message").value.trim();
  const verified = document.getElementById("review-verified").checked;
  const visible = document.getElementById("review-visible").checked;

  if (!name || !date || !message) return;

  const token = localStorage.getItem("admin-user-token");
  const payload = {
    product_id: parseInt(productId),
    customer_name: name,
    product_image: productImage || null,
    rating: stars,
    comment: message,
    verified: verified ? 1 : 0,
    visible: visible ? 1 : 0
  };

  try {
    let res;
    if (id) {
      res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
    }

    if (res.ok) {
      showToast(id ? "Review updated successfully" : "Review added successfully");
      document.getElementById("review-modal").style.display = "none";
      await loadReviewsFromApi();
      renderReviewsPanel();
    } else {
      showToast("Failed to save review");
    }
  } catch (err) {
    console.error(err);
    showToast("Error saving review");
  }
}

// ── Review Product Image Drag & Drop ─────────────────────────────────────────
function initReviewImageUpload() {
  const zone      = document.getElementById("review-image-drop-zone");
  const fileInput = document.getElementById("review-image-file-input");
  if (!zone || !fileInput) return;

  // Prevent re-binding
  const newZone = zone.cloneNode(true);
  zone.parentNode.replaceChild(newZone, zone);
  const newInput = document.getElementById("review-image-file-input");

  // Click-to-browse
  newZone.addEventListener("click", (e) => {
    if (e.target.id === "review-image-remove-btn") return;
    newInput.click();
  });

  // File selected via browse
  newInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      readReviewImageFile(e.target.files[0]);
    }
    newInput.value = "";
  });

  // Drag over highlight
  newZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    newZone.style.borderColor = "var(--cyan)";
    newZone.style.background  = "rgba(35,244,239,0.06)";
  });

  newZone.addEventListener("dragleave", () => {
    newZone.style.borderColor = "rgba(35,244,239,0.3)";
    newZone.style.background  = "rgba(255,255,255,0.02)";
  });

  // Drop
  newZone.addEventListener("drop", (e) => {
    e.preventDefault();
    newZone.style.borderColor = "rgba(35,244,239,0.3)";
    newZone.style.background  = "rgba(255,255,255,0.02)";
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      readReviewImageFile(file);
    }
  });
}

function readReviewImageFile(file) {
  if (file.size > 5 * 1024 * 1024) {
    showToast("Image too large — max 5 MB");
    return;
  }
  showToast("Uploading review image...");
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX = 800;
      let w = img.width, h = img.height;
      if (w > h) { if (w > MAX) { h = h * MAX / w; w = MAX; } }
      else        { if (h > MAX) { w = w * MAX / h; h = MAX; } }
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      const base64 = canvas.toDataURL("image/jpeg", 0.75);
      
      const blob = dataURLtoBlob(base64);
      uploadFileToServer(blob, file.name, (url) => {
        setReviewImagePreview(url);
        showToast("Review image uploaded successfully");
      });
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function setReviewImagePreview(src) {
  document.getElementById("review-photo-url").value = src;
  const preview = document.getElementById("review-image-preview");
  const wrap    = document.getElementById("review-image-preview-wrap");
  const ph      = document.getElementById("review-image-drop-placeholder");
  if (!preview || !wrap || !ph) return;
  preview.src     = src;
  wrap.style.display = "block";
  ph.style.display   = "none";
}

function clearReviewImage() {
  document.getElementById("review-photo-url").value = "";
  const preview = document.getElementById("review-image-preview");
  const wrap    = document.getElementById("review-image-preview-wrap");
  const ph      = document.getElementById("review-image-drop-placeholder");
  if (preview) preview.src = "";
  if (wrap)    wrap.style.display = "none";
  if (ph)      ph.style.display   = "block";
}

async function toggleReviewVisibility(id) {
  const reviews = JSON.parse(localStorage.getItem("iselectrics-reviews")) || [];
  const rev = reviews.find(r => r.id === id);
  if (!rev) return;

  const newVisible = !rev.visible;
  const token = localStorage.getItem("admin-user-token");

  try {
    const res = await fetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ visible: newVisible })
    });
    if (res.ok) {
      showToast(`Review visibility set to ${newVisible ? 'Visible' : 'Hidden'}`);
      await loadReviewsFromApi();
      renderReviewsPanel();
    } else {
      showToast("Failed to update review visibility");
    }
  } catch (err) {
    console.error(err);
    showToast("Error updating review visibility");
  }
}

async function deleteReview(id) {
  if (!confirm("Are you sure you want to delete this review?")) return;

  const token = localStorage.getItem("admin-user-token");

  try {
    const res = await fetch(`/api/reviews/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (res.ok) {
      showToast("Review deleted");
      await loadReviewsFromApi();
      renderReviewsPanel();
    } else {
      showToast("Failed to delete review");
    }
  } catch (err) {
    console.error(err);
    showToast("Error deleting review");
  }
}

function openCouponModal(id = "") {
  const modal = document.getElementById("coupon-modal");
  const title = document.getElementById("coupon-modal-title");
  const form = document.getElementById("coupon-form");

  if (id) {
    title.textContent = "Edit Coupon";
    const coupons = JSON.parse(localStorage.getItem("iselectrics-coupons")) || [];
    const coupon = coupons.find(c => c.id === id);
    if (coupon) {
      document.getElementById("coupon-id").value = coupon.id;
      document.getElementById("coupon-name").value = coupon.name;
      document.getElementById("coupon-code").value = coupon.code;
      document.getElementById("coupon-discount-type").value = coupon.discount_type || "flat";
      document.getElementById("coupon-discount-value").value = coupon.discount_value || "";
      document.getElementById("coupon-min-order").value = coupon.minOrder || 0;
      document.getElementById("coupon-valid-till").value = coupon.validTill === "N/A" ? "" : coupon.validTill;
      document.getElementById("coupon-status").checked = coupon.status === "Active";
    }
  } else {
    title.textContent = "Create New Coupon";
    form.reset();
    document.getElementById("coupon-id").value = "";
    document.getElementById("coupon-min-order").value = 0;
    document.getElementById("coupon-status").checked = true;
  }
  modal.style.display = "flex";
}

async function handleSaveCoupon() {
  const id = document.getElementById("coupon-id").value;
  const name = document.getElementById("coupon-name").value.trim();
  const code = document.getElementById("coupon-code").value.trim().toUpperCase();
  const discount_type = document.getElementById("coupon-discount-type").value;
  const discount_value = parseInt(document.getElementById("coupon-discount-value").value);
  const min_order_amount = parseInt(document.getElementById("coupon-min-order").value || "0");
  const valid_till = document.getElementById("coupon-valid-till").value.trim();
  const status = document.getElementById("coupon-status").checked ? "Active" : "Inactive";

  if (!name || !code || isNaN(discount_value) || discount_value <= 0) {
    showToast("Please fill all required fields correctly.");
    return;
  }

  const token = localStorage.getItem("admin-user-token");
  try {
    let url = '/api/admin/coupons';
    let method = 'POST';

    if (id) {
      const delRes = await fetch(`/api/admin/coupons/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (!delRes.ok) {
        showToast("Failed to update existing coupon.");
        return;
      }
    }

    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name,
        code,
        discount_type,
        discount_value,
        min_order_amount,
        valid_till,
        status
      })
    });

    if (res.ok) {
      showToast(id ? "Coupon updated successfully" : "Coupon created successfully");
      document.getElementById("coupon-modal").style.display = "none";
      await loadCouponsFromApi();
    } else {
      let msg = "Error saving coupon";
      try {
        if (res.headers.get("content-type")?.includes("application/json")) {
          const err = await res.json();
          if (err.errors) {
            const errorStrings = Object.values(err.errors).flat();
            if (errorStrings.length > 0) {
              msg = errorStrings.join(" ");
            } else {
              msg = err.message || msg;
            }
          } else {
            msg = err.message || msg;
          }
        } else {
          msg = `Server error: ${res.status} ${res.statusText}`;
        }
      } catch (parseError) {
        msg = `Server error: ${res.status}`;
      }
      showToast(msg);
    }
  } catch(e) {
    console.error(e);
    showToast("Network error saving coupon: " + e.message);
  }
}

async function handleDeleteCoupon(id) {
  if (!confirm("Are you sure you want to delete this coupon?")) return;
  const token = localStorage.getItem("admin-user-token");
  try {
    const res = await fetch(`/api/admin/coupons/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.ok) {
      showToast("Coupon deleted successfully");
      await loadCouponsFromApi();
    } else {
      let msg = "Failed to delete coupon";
      try {
        if (res.headers.get("content-type")?.includes("application/json")) {
          const err = await res.json();
          msg = err.message || msg;
        } else {
          msg = `Server error: ${res.status} ${res.statusText}`;
        }
      } catch (parseError) {
        msg = `Server error: ${res.status}`;
      }
      showToast(msg);
    }
  } catch(e) {
    console.error(e);
    showToast("Network error deleting coupon: " + e.message);
  }
}

function openOrderModal(dbId) {
  const modal = document.getElementById("order-modal");
  const form = document.getElementById("order-form");
  
  const orders = JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
  const order = orders.find(o => String(o.dbId) === String(dbId));
  if (!order) {
    showToast("Order not found");
    return;
  }

  document.getElementById("order-db-id").value = order.dbId;
  document.getElementById("order-status-select").value = order.status;
  document.getElementById("order-email-input").value = order.email || "";
  document.getElementById("order-address-input").value = order.shippingAddress || "";
  const productDisplay = document.getElementById("order-product-name-display");
  if (productDisplay) {
    productDisplay.value = `${order.productName || "Unknown Product"} (x${order.qty || 1})`;
  }

  const referrerContainer = document.getElementById("order-referrer-container");
  const referrerDisplay = document.getElementById("order-referrer-display");
  if (referrerContainer && referrerDisplay) {
    if (order.referrerName) {
      referrerContainer.style.display = "block";
      referrerDisplay.value = `${order.referrerName} (${order.referrerPhone || 'No Phone'}) [${order.referrerCode || 'No Code'}]`;
    } else {
      referrerContainer.style.display = "none";
    }
  }

  // Restrict backwards/downgrade status if order is already accepted, shipped, or delivered
  const statusSelect = document.getElementById("order-status-select");
  const currentStatusLower = order.status.toLowerCase();
  const isAcceptedOrBeyond = ["accepted", "shipped", "delivered"].includes(currentStatusLower);
  
  const currentAdminJson = localStorage.getItem("admin-current-user");
  const currentAdmin = currentAdminJson ? JSON.parse(currentAdminJson) : null;
  const isSuperAdmin = currentAdmin && currentAdmin.is_super === true;

  Array.from(statusSelect.options).forEach(opt => {
    const v = opt.value.toLowerCase();
    if (isAcceptedOrBeyond && ["pending", "cancelled", "declined"].includes(v)) {
      opt.disabled = true;
    } else if (!isSuperAdmin && ["cancelled", "declined"].includes(v)) {
      opt.disabled = true;
    } else {
      opt.disabled = false;
    }
  });

  modal.style.display = "flex";
}

async function handleSaveOrder() {
  const dbId = document.getElementById("order-db-id").value;
  const status = document.getElementById("order-status-select").value;
  const email = document.getElementById("order-email-input").value.trim();
  const shipping_address = document.getElementById("order-address-input").value.trim();

  if (!shipping_address) {
    showToast("Please fill all required fields correctly.");
    return;
  }

  const token = localStorage.getItem("admin-user-token");
  try {
    const res = await fetch(`/api/admin/orders/${dbId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        status,
        email,
        shipping_address
      })
    });

    if (res.ok) {
      showToast("Order updated successfully");
      document.getElementById("order-modal").style.display = "none";
      await loadAdminOrdersFromApi();
    } else {
      let msg = "Error saving order changes";
      try {
        if (res.headers.get("content-type")?.includes("application/json")) {
          const err = await res.json();
          msg = err.message || msg;
        } else {
          msg = `Server error: ${res.status}`;
        }
      } catch (e) {
        msg = `Server error: ${res.status}`;
      }
      showToast(msg);
    }
  } catch (e) {
    console.error(e);
    showToast("Network error updating order: " + e.message);
  }
}

// Toast Notification
function showToast(message) {
  const toast = document.getElementById("admin-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function getDefaultHomeBanner() {
  return {
    image: "assets/phone-case.png",
    badge: "NEW RELEASE",
    title: "CarbonShield MagCase",
    subtitle: "Uncompromising protection meets elegant carbon fiber design. Engineered with high-strength tactical fibers and seamless MagSafe integration.",
    cta: "Shop Now",
    productId: "phone-case",
    productImage: "assets/phone-case.png"
  };
}

function parseSavedBanners(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : null;
  } catch (e) {
    return null;
  }
}

function getLocalSavedBanners() {
  try {
    const def = getDefaultHomeBanner();
    const saved = localStorage.getItem("iselectrics-home-banners");
    if (!saved) {
      const old = localStorage.getItem("iselectrics-home-banner");
      if (old) {
        const list = [JSON.parse(old)];
        localStorage.setItem("iselectrics-home-banners", JSON.stringify(list));
        return list;
      }
      return [def];
    }
    return JSON.parse(saved);
  } catch(e) {
    return [];
  }
}

function getSavedBanners() {
  if (Array.isArray(savedBannersCache)) return savedBannersCache;
  return getLocalSavedBanners();
}

async function loadSavedBannersFromApi() {
  if (savedBannersCache === null) {
    savedBannersCache = getLocalSavedBanners();
  }
  try {
    const res = await fetch('/api/settings', { headers: { 'Accept': 'application/json' } });
    if (!res.ok) return getSavedBanners();
    const settings = await res.json();
    const apiBanners = parseSavedBanners(settings.home_banners);
    if (apiBanners) {
      savedBannersCache = apiBanners;
      localStorage.setItem("iselectrics-home-banners", JSON.stringify(apiBanners));
    } else {
      const localBanners = getLocalSavedBanners();
      savedBannersCache = localBanners;
      await saveSavedBanners(localBanners, false);
    }
  } catch (e) {
    console.error("Failed to load banners from API", e);
  }
  return getSavedBanners();
}

async function saveSavedBanners(banners, rerender = false) {
  savedBannersCache = Array.isArray(banners) ? banners : [];
  localStorage.setItem("iselectrics-home-banners", JSON.stringify(savedBannersCache));

  try {
    const token = localStorage.getItem("admin-user-token");
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ home_banners: JSON.stringify(savedBannersCache) })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      showToast(data.message || "Failed to save banners to database");
    }
  } catch (e) {
    console.error("Failed to save banners to API", e);
    showToast("Could not sync banners to database");
  }

  if (rerender) renderBannerPanel();
}

function renderBannerPanel() {
  if (savedBannersCache === null) {
    loadSavedBannersFromApi().then(() => renderBannerPanel());
  }

  const banners = getSavedBanners();
  const listContainer = document.getElementById("active-banners-list");
  
  if (listContainer) {
    if (banners.length === 0) {
      listContainer.innerHTML = `
        <div style="padding: 20px; text-align: center; color: var(--muted); font-size: 13px; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px;">
          No banner slides added yet. Add banner images using the form on the left.
        </div>
      `;
    } else {
      listContainer.innerHTML = banners.map((banner, idx) => `
        <div class="banner-list-card" onclick="window.previewHomeBanner(${idx})" style="display:flex; align-items:center; gap:12px; padding:12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; cursor:pointer; transition: all 0.2s; position:relative;">
          <img src="${escapeHtml(banner.image || 'assets/phone-case.png')}" style="width:60px; height:40px; object-fit:cover; border-radius:6px; background:#111;">
          <div style="flex:1; min-width:0;">
            <div style="font-size:13px; font-weight:700; color:white; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              Banner Slide ${idx + 1}
            </div>
            <div style="font-size:11px; color:var(--muted); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; margin-top:2px;">
            ${escapeHtml(banner.badge || 'No Badge')} • Redirect URL: ${escapeHtml(banner.redirectUrl || banner.productId || 'None')}
            </div>
          </div>
          <button onclick="event.stopPropagation(); window.deleteHomeBanner(${idx})" style="padding: 6px; background:rgba(255,91,103,0.15); border:none; color:#ff5b67; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      `).join("");
    }
  }

  // Show live preview of pending images or first saved banner
  if (window.previewBannerIndex === -1 && (pendingHeroBgImages.length > 0 || pendingMobileBgImages.length > 0)) {
    renderPendingBannerPreview();
  } else if (banners.length > 0) {
    window.previewHomeBanner(0);
  } else {
    const previewDiv = document.getElementById("current-hero-display");
    if (previewDiv) {
      previewDiv.innerHTML = `<span style="color:var(--muted); font-size:13px;">No banner slides added yet.</span>`;
      previewDiv.style.backgroundImage = "none";
      previewDiv.style.background = "rgba(255,255,255,0.03)";
    }
  }
}

window.previewHomeBanner = function(idx) {
  const banners = getSavedBanners();
  const banner = banners[idx];
  const previewDiv = document.getElementById("current-hero-display");
  if (!previewDiv || !banner) return;
  
  window.previewBannerIndex = idx;
  
  // Highlight active card
  document.querySelectorAll(".banner-list-card").forEach((card, i) => {
    if (i === idx) {
      card.style.borderColor = "var(--cyan)";
      card.style.background = "rgba(35,244,239,0.05)";
    } else {
      card.style.borderColor = "rgba(255,255,255,0.08)";
      card.style.background = "rgba(255,255,255,0.03)";
    }
  });

  const hasBadge = !!banner.badge;
  const hasTitle = !!banner.title;
  const hasSubtitle = !!banner.subtitle;
  const hasShowcase = !!banner.productImage && banner.productImage !== "assets/phone-case.png" && banner.productImage !== "";

  const previewImg = banner.image || banner.mobileImage || "assets/phone-case.png";
  previewDiv.style.backgroundImage = `url('${previewImg.replace(/'/g, "%27")}')`;
  previewDiv.style.backgroundSize = "cover";
  previewDiv.style.backgroundPosition = "center";
  previewDiv.style.backgroundRepeat = "no-repeat";

  previewDiv.innerHTML = `
    <div style="width: ${hasShowcase ? '60%' : '100%'}; display: flex; flex-direction: column; justify-content: center; gap: 8px; z-index: 2;">
      ${hasBadge ? `
        <div style="background: rgba(35, 244, 239, 0.15); border-left: 3px solid var(--cyan); padding: 4px 8px; border-radius: 4px; width: fit-content;">
          <span style="color: var(--cyan); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">${escapeHtml(banner.badge)}</span>
        </div>
      ` : ""}
      ${hasTitle ? `<h2 style="color: white; margin: 0; font-size: 22px; font-weight: 800; line-height: 1.2; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">${escapeHtml(banner.title)}</h2>` : ""}
      ${hasSubtitle ? `<p style="color: rgba(255,255,255,0.85); font-size: 11px; line-height: 1.5; margin: 0; max-width: 100%; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">${escapeHtml(banner.subtitle)}</p>` : ""}
      <div style="display: flex; gap: 8px; margin-top: 8px;">
        <button style="padding: 8px 16px; background: linear-gradient(90deg, #10f3ed, #0074d5); color: black; font-weight: 700; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">${escapeHtml(banner.cta || "Shop Now")}</button>
        <button style="padding: 8px 16px; background: rgba(255,255,255,0.1); color: white; font-weight: 600; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; cursor: pointer; font-size: 12px;">Explore All</button>
      </div>
    </div>
    ${hasShowcase ? `
      <div style="width: 40%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2;">
        <img src="${escapeHtml(banner.productImage)}" alt="Product" style="max-height: 140px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));">
      </div>
    ` : ""}
  `;

  // Populate and show edit slide form
  const editSec = document.getElementById("banner-edit-section");
  if (editSec) {
    editSec.style.display = "flex";
    document.getElementById("edit-banner-index").value = idx;
    document.getElementById("edit-banner-badge").value = banner.badge || "";
    document.getElementById("edit-banner-title").value = banner.title || "";
    document.getElementById("edit-banner-subtitle").value = banner.subtitle || "";
    document.getElementById("edit-banner-cta").value = banner.cta || "Shop Now";
    const redirectUrlEl = document.getElementById("edit-banner-redirect-url");
    if (redirectUrlEl) {
      redirectUrlEl.value = banner.redirectUrl || banner.productId || "";
    }
    
    // desktop image preview
    const deskPreview = document.getElementById("desktop-banner-preview");
    const deskWrap = document.getElementById("desktop-banner-preview-wrap");
    const deskText = document.getElementById("desktop-banner-drag-text");
    if (banner.image) {
      if (deskPreview) deskPreview.src = banner.image;
      if (deskWrap) deskWrap.style.display = "block";
      if (deskText) deskText.textContent = "Change Desktop Banner";
    } else {
      if (deskPreview) deskPreview.src = "";
      if (deskWrap) deskWrap.style.display = "none";
      if (deskText) deskText.textContent = "Upload Desktop Banner";
    }

    // mobile image preview
    const preview = document.getElementById("mobile-banner-preview");
    const wrap = document.getElementById("mobile-banner-preview-wrap");
    const text = document.getElementById("mobile-banner-drag-text");
    if (banner.mobileImage) {
      if (preview) preview.src = banner.mobileImage;
      if (wrap) wrap.style.display = "block";
      if (text) text.textContent = "Change Mobile Banner";
    } else {
      if (preview) preview.src = "";
      if (wrap) wrap.style.display = "none";
      if (text) text.textContent = "Upload Mobile Banner";
    }
  }
};

function renderPendingBannerPreview() {
  const previewDiv = document.getElementById("current-hero-display");
  if (!previewDiv || (pendingHeroBgImages.length === 0 && pendingMobileBgImages.length === 0)) return;
  
  const bgImage = pendingHeroBgImages[0] || pendingMobileBgImages[0];
  const count = Math.max(pendingHeroBgImages.length, pendingMobileBgImages.length);
  
  if (bgImage) {
    previewDiv.style.backgroundImage = `url('${bgImage.replace(/'/g, "%27")}')`;
    previewDiv.style.backgroundSize = "cover";
    previewDiv.style.backgroundPosition = "center";
    previewDiv.style.backgroundRepeat = "no-repeat";
  } else {
    previewDiv.style.backgroundImage = "none";
    previewDiv.style.background = "rgba(255,255,255,0.03)";
  }
  
  previewDiv.innerHTML = `
    <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; gap: 8px; z-index: 2;">
      <h2 style="color: white; margin: 0; font-size: 22px; font-weight: 800; line-height: 1.2; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">Preview: ${count} banner(s) selected</h2>
      <p style="color: rgba(255,255,255,0.85); font-size: 11px; line-height: 1.5; margin: 0; max-width: 100%; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">Click "Save Banners" to add these to the carousel</p>
    </div>
  `;
  
  // Remove highlight from all cards
  document.querySelectorAll(".banner-list-card").forEach((card) => {
    card.style.borderColor = "rgba(255,255,255,0.08)";
    card.style.background = "rgba(255,255,255,0.03)";
  });
}

window.addNewBannerSlide = function() {
  if (pendingHeroBgImages.length === 0 && pendingMobileBgImages.length === 0) {
    showToast("❌ Please select at least one desktop or mobile banner image");
    return;
  }

  const banners = getSavedBanners();
  const count = Math.max(pendingHeroBgImages.length, pendingMobileBgImages.length);
  
  for (let idx = 0; idx < count; idx++) {
    const desktopImg = pendingHeroBgImages[idx] || "";
    const mobileImg = pendingMobileBgImages[idx] || "";
    
    const newBanner = {
      image: desktopImg,
      mobileImage: mobileImg,
      badge: "",
      title: "",
      subtitle: "",
      cta: "Shop Now",
      productId: "",
      productImage: null,
      updatedAt: new Date().toISOString()
    };
    
    banners.push(newBanner);
  }

  saveSavedBanners(banners);
  
  // Reset pending state
  pendingHeroBgImages = [];
  pendingMobileBgImages = [];
  renderBannerImagePreviews();
  renderMobileBannerImagePreviews();
  document.getElementById("hero-bg-file-input").value = "";
  const mobFileInput = document.getElementById("add-mobile-bg-file-input");
  if (mobFileInput) mobFileInput.value = "";
  window.previewBannerIndex = 0;

  renderBannerPanel();
  showToast(`✅ ${count} banner(s) saved successfully!`);
  triggerRenders();
};

window.deleteHomeBanner = function(index) {
  if (!confirm("Are you sure you want to delete this banner slide?")) return;
  const banners = getSavedBanners();
  banners.splice(index, 1);
  saveSavedBanners(banners);
  renderBannerPanel();
  showToast("🗑️ Banner slide deleted");
  triggerRenders();
};

window.saveSelectedBannerDetails = function() {
  const idx = Number(document.getElementById("edit-banner-index").value);
  const banners = getSavedBanners();
  if (isNaN(idx) || !banners[idx]) {
    showToast("❌ No banner slide selected for editing");
    return;
  }
  
  banners[idx].badge = document.getElementById("edit-banner-badge").value.trim();
  banners[idx].title = document.getElementById("edit-banner-title").value.trim();
  banners[idx].subtitle = document.getElementById("edit-banner-subtitle").value.trim();
  banners[idx].cta = document.getElementById("edit-banner-cta").value.trim() || "Shop Now";
  const redirectUrlEl = document.getElementById("edit-banner-redirect-url");
  if (redirectUrlEl) {
    banners[idx].redirectUrl = redirectUrlEl.value.trim();
  }
  
  saveSavedBanners(banners);
  renderBannerPanel();
  showToast("✅ Banner slide details updated!");
  triggerRenders();
};

window.removeMobileBannerImage = function() {
  const idx = Number(document.getElementById("edit-banner-index").value);
  const banners = getSavedBanners();
  if (isNaN(idx) || !banners[idx]) return;
  
  delete banners[idx].mobileImage;
  saveSavedBanners(banners);
  
  document.getElementById("mobile-banner-preview").src = "";
  document.getElementById("mobile-banner-preview-wrap").style.display = "none";
  document.getElementById("mobile-banner-drag-text").textContent = "Upload Mobile Banner";
  
  showToast("🗑️ Mobile banner image removed");
  triggerRenders();
  window.previewHomeBanner(idx);
};

function handleMobileBannerUpload(file) {
  const text = document.getElementById("mobile-banner-drag-text");
  if (text) text.textContent = "Uploading...";
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const blob = dataURLtoBlob(e.target.result);
    uploadFileToServer(blob, file.name, (url) => {
      const idx = Number(document.getElementById("edit-banner-index").value);
      const banners = getSavedBanners();
      if (banners[idx]) {
        banners[idx].mobileImage = url;
        saveSavedBanners(banners);
      }
      
      const preview = document.getElementById("mobile-banner-preview");
      const wrap = document.getElementById("mobile-banner-preview-wrap");
      if (preview && wrap) {
        preview.src = url;
        wrap.style.display = "block";
      }
      if (text) text.textContent = "Change Mobile Banner";
      showToast("✅ Mobile banner uploaded!");
      triggerRenders();
    });
  };
  reader.readAsDataURL(file);
}

function handleDesktopBannerUpload(file) {
  const text = document.getElementById("desktop-banner-drag-text");
  if (text) text.textContent = "Uploading...";
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const blob = dataURLtoBlob(e.target.result);
    uploadFileToServer(blob, file.name, (url) => {
      const idx = Number(document.getElementById("edit-banner-index").value);
      const banners = getSavedBanners();
      if (banners[idx]) {
        banners[idx].image = url;
        saveSavedBanners(banners);
      }
      
      const preview = document.getElementById("desktop-banner-preview");
      const wrap = document.getElementById("desktop-banner-preview-wrap");
      if (preview && wrap) {
        preview.src = url;
        wrap.style.display = "block";
      }
      if (text) text.textContent = "Change Desktop Banner";
      showToast("✅ Desktop banner updated!");
      triggerRenders();
      window.previewHomeBanner(idx);
    });
  };
  reader.readAsDataURL(file);
}

function escapeHtml(text) {
  if (!text) return "";
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function initHeroUpload() {
  // Banner images upload (multiple files)
  const bgInput = document.getElementById("hero-bg-file-input");
  const bgZone = document.getElementById("hero-bg-drag-zone");
  
  if (bgInput && !bgInput.dataset.bound) {
    bgInput.dataset.bound = "true";
    bgInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      
      let uploadedCount = 0;
      files.forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = () => {
          const blob = dataURLtoBlob(reader.result);
          uploadFileToServer(blob, file.name, (url) => {
            pendingHeroBgImages.push(url);
            renderBannerImagePreviews();
            uploadedCount++;
            if (uploadedCount === files.filter(f => f.type.startsWith('image/')).length) {
              showToast(`✅ ${uploadedCount} desktop banner(s) uploaded!`);
            }
          });
        };
        reader.readAsDataURL(file);
      });
      
      window.previewBannerIndex = -1;
      renderBannerPanel();
    });
  }
  
  if (bgZone && !bgZone.dataset.bound) {
    bgZone.dataset.bound = "true";
    ["dragenter", "dragover"].forEach(type => {
      bgZone.addEventListener(type, (e) => {
        e.preventDefault();
        bgZone.style.borderColor = "var(--cyan)";
      });
    });
    ["dragleave", "drop"].forEach(type => {
      bgZone.addEventListener(type, (e) => {
        e.preventDefault();
        bgZone.style.borderColor = "rgba(35,244,239,0.35)";
      });
    });
    bgZone.addEventListener("drop", (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer?.files || []);
      if (!files.length) return;
      
      let uploadedCount = 0;
      files.forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = () => {
          const blob = dataURLtoBlob(reader.result);
          uploadFileToServer(blob, file.name, (url) => {
            pendingHeroBgImages.push(url);
            renderBannerImagePreviews();
            uploadedCount++;
            if (uploadedCount === files.filter(f => f.type.startsWith('image/')).length) {
              showToast(`✅ ${uploadedCount} desktop banner(s) uploaded!`);
            }
          });
        };
        reader.readAsDataURL(file);
      });
      
      window.previewBannerIndex = -1;
      renderBannerPanel();
    });
  }

  // Mobile banner upload listeners
  const mobInput = document.getElementById("mobile-banner-file-input");
  const mobZone = document.getElementById("mobile-banner-drag-zone");
  
  if (mobInput && !mobInput.dataset.bound) {
    mobInput.dataset.bound = "true";
    mobInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        handleMobileBannerUpload(file);
      }
    });
  }
  
  if (mobZone && !mobZone.dataset.bound) {
    mobZone.dataset.bound = "true";
    mobZone.addEventListener("click", () => mobInput.click());
    
    mobZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      mobZone.style.borderColor = "var(--cyan)";
    });
    
    mobZone.addEventListener("dragleave", () => {
      mobZone.style.borderColor = "rgba(35,244,239,0.25)";
    });
    
    mobZone.addEventListener("drop", (e) => {
      e.preventDefault();
      mobZone.style.borderColor = "rgba(35,244,239,0.25)";
      const file = e.dataTransfer?.files[0];
      if (file && file.type.startsWith("image/")) {
        handleMobileBannerUpload(file);
      }
    });
  }

  // Desktop banner upload listeners for editing slide
  const deskInput = document.getElementById("desktop-banner-file-input");
  const deskZone = document.getElementById("desktop-banner-drag-zone");
  
  if (deskInput && !deskInput.dataset.bound) {
    deskInput.dataset.bound = "true";
    deskInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        handleDesktopBannerUpload(file);
      }
    });
  }
  
  if (deskZone && !deskZone.dataset.bound) {
    deskZone.dataset.bound = "true";
    deskZone.addEventListener("click", () => deskInput.click());
    
    deskZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      deskZone.style.borderColor = "var(--cyan)";
    });
    
    deskZone.addEventListener("dragleave", () => {
      deskZone.style.borderColor = "rgba(35,244,239,0.25)";
    });
    
    deskZone.addEventListener("drop", (e) => {
      e.preventDefault();
      deskZone.style.borderColor = "rgba(35,244,239,0.25)";
      const file = e.dataTransfer?.files[0];
      if (file && file.type.startsWith("image/")) {
        handleDesktopBannerUpload(file);
      }
    });
  }

  // Add mobile banner upload listeners for creating new banner slides
  const addMobInput = document.getElementById("add-mobile-bg-file-input");
  const addMobZone = document.getElementById("add-mobile-bg-drag-zone");
  
  if (addMobInput && !addMobInput.dataset.bound) {
    addMobInput.dataset.bound = "true";
    addMobInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      
      let uploadedCount = 0;
      files.forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = () => {
          const blob = dataURLtoBlob(reader.result);
          uploadFileToServer(blob, file.name, (url) => {
            pendingMobileBgImages.push(url);
            renderMobileBannerImagePreviews();
            uploadedCount++;
            if (uploadedCount === files.filter(f => f.type.startsWith('image/')).length) {
              showToast(`✅ ${uploadedCount} mobile banner(s) uploaded!`);
              window.previewBannerIndex = -1;
              renderBannerPanel();
            }
          });
        };
        reader.readAsDataURL(file);
      });
    });
  }
  
  if (addMobZone && !addMobZone.dataset.bound) {
    addMobZone.dataset.bound = "true";
    ["dragenter", "dragover"].forEach(type => {
      addMobZone.addEventListener(type, (e) => {
        e.preventDefault();
        addMobZone.style.borderColor = "var(--cyan)";
      });
    });
    ["dragleave", "drop"].forEach(type => {
      addMobZone.addEventListener(type, (e) => {
        e.preventDefault();
        addMobZone.style.borderColor = "rgba(35,244,239,0.35)";
      });
    });
    addMobZone.addEventListener("drop", (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer?.files || []);
      if (!files.length) return;
      
      let uploadedCount = 0;
      files.forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = () => {
          const blob = dataURLtoBlob(reader.result);
          uploadFileToServer(blob, file.name, (url) => {
            pendingMobileBgImages.push(url);
            renderMobileBannerImagePreviews();
            uploadedCount++;
            if (uploadedCount === files.filter(f => f.type.startsWith('image/')).length) {
              showToast(`✅ ${uploadedCount} mobile banner(s) uploaded!`);
              window.previewBannerIndex = -1;
              renderBannerPanel();
            }
          });
        };
        reader.readAsDataURL(file);
      });
    });
  }
}

function renderBannerImagePreviews() {
  const grid = document.getElementById("hero-bg-previews-grid");
  if (!grid) return;
  
  grid.innerHTML = pendingHeroBgImages.map((imgSrc, idx) => `
    <div style="position: relative; width: 100px; height: 60px;">
      <img src="${imgSrc}" alt="Banner preview ${idx + 1}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
      <button onclick="window.removePendingBannerImage(${idx})" style="position: absolute; top: 4px; right: 4px; background: rgba(255,91,103,0.9); border: none; color: white; width: 18px; height: 18px; border-radius: 50%; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center;">✕</button>
    </div>
  `).join("");
}

window.removePendingBannerImage = function(idx) {
  pendingHeroBgImages.splice(idx, 1);
  renderBannerImagePreviews();
  window.previewBannerIndex = -1;
  renderBannerPanel();
};

function renderMobileBannerImagePreviews() {
  const grid = document.getElementById("add-mobile-bg-previews-grid");
  if (!grid) return;
  
  grid.innerHTML = pendingMobileBgImages.map((imgSrc, idx) => `
    <div style="position: relative; width: 100px; height: 60px;">
      <img src="${imgSrc}" alt="Mobile Banner preview ${idx + 1}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
      <button onclick="window.removePendingMobileBannerImage(${idx})" style="position: absolute; top: 4px; right: 4px; background: rgba(255,91,103,0.9); border: none; color: white; width: 18px; height: 18px; border-radius: 50%; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center;">✕</button>
    </div>
  `).join("");
}

window.removePendingMobileBannerImage = function(idx) {
  pendingMobileBgImages.splice(idx, 1);
  renderMobileBannerImagePreviews();
};

// ----------------- PAGINATION, HEADERS, EXPORTS & FILTERS -----------------

function renderPaginationControls(containerId, totalPages, currentPage, changePageCallbackName) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (totalPages <= 1) {
    container.innerHTML = "";
    container.style.display = "none";
    return;
  }
  container.style.display = "flex";
  
  const totalItems = Number(container.dataset.totalItems || 0);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  let html = `
    <div class="table-footer-text">
      Showing ${totalItems === 0 ? 0 : startItem} to ${endItem} of ${totalItems} results
    </div>
    <div class="pagination-wrap">
      <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" onclick="${changePageCallbackName}(${currentPage - 1})">&lt;</button>
  `;
  
  const maxButtonsToShow = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);
  
  if (endPage - startPage < maxButtonsToShow - 1) {
    startPage = Math.max(1, endPage - maxButtonsToShow + 1);
  }
  
  if (startPage > 1) {
    html += `<button class="pagination-btn" onclick="${changePageCallbackName}(1)">1</button>`;
    if (startPage > 2) {
      html += `<span style="color: rgba(255,255,255,0.4); padding: 0 4px;">...</span>`;
    }
  }
  
  for (let i = startPage; i <= endPage; i++) {
    html += `
      <button class="pagination-btn ${i === currentPage ? 'is-active' : ''}" onclick="${changePageCallbackName}(${i})">${i}</button>
    `;
  }
  
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      html += `<span style="color: rgba(255,255,255,0.4); padding: 0 4px;">...</span>`;
    }
    html += `<button class="pagination-btn" onclick="${changePageCallbackName}(${totalPages})">${totalPages}</button>`;
  }
  
  html += `
      <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" onclick="${changePageCallbackName}(${currentPage + 1})">&gt;</button>
    </div>
  `;
  
  container.innerHTML = html;
}

function updateAdminHeader(panelId) {
  const titleEl = document.getElementById("admin-mobile-title");
  const breadcrumbsEl = document.getElementById("admin-breadcrumbs");
  const actionsEl = document.getElementById("admin-header-actions");
  
  if (!titleEl || !breadcrumbsEl || !actionsEl) return;
  
  actionsEl.innerHTML = "";
  
  let title = "Dashboard";
  let breadcrumbs = "Dashboard";
  let showExportButton = false;
  let exportCallback = null;
  
  switch(panelId) {
    case "dashboard":
      title = "Dashboard";
      breadcrumbs = "Dashboard";
      break;
    case "users":
      title = "Users";
      breadcrumbs = "Dashboard > Users";
      showExportButton = true;
      exportCallback = "window.exportUsersToExcel()";
      break;
    case "payouts":
      title = "Payouts";
      breadcrumbs = "Dashboard > Payouts";
      showExportButton = true;
      exportCallback = "window.exportPayoutsToExcel()";
      break;
    case "orders":
      title = "New Orders";
      breadcrumbs = "Dashboard > Orders > New Orders";
      showExportButton = true;
      exportCallback = "window.exportOrdersToExcel()";
      break;
    case "products":
      title = "Products";
      breadcrumbs = "Dashboard > Products";
      showExportButton = true;
      exportCallback = "window.exportProductsToExcel()";
      break;
    case "trigger-mail":
      title = "Trigger Custom Marketing Mails";
      breadcrumbs = "Dashboard > Marketing > Trigger Mail";
      break;
    case "email-template":
      title = "Campaign Email Template";
      breadcrumbs = "Dashboard > Marketing > Email Template";
      break;
    case "categories":
      title = "Product Categories";
      breadcrumbs = "Dashboard > Categories";
      showExportButton = true;
      exportCallback = "window.exportCategoriesToExcel()";
      break;
    case "coupons":
      title = "Coupons & Offers";
      breadcrumbs = "Dashboard > Coupons & Offers";
      break;
    case "wallet":
      title = "Wallet & Rewards";
      breadcrumbs = "Dashboard > Wallet & Rewards";
      break;
    case "reviews":
      title = "Reviews";
      breadcrumbs = "Dashboard > Reviews";
      break;
    case "banner":
      title = "Banner";
      breadcrumbs = "Dashboard > Banner";
      break;
    case "iphone-models":
      title = "iPhone Models";
      breadcrumbs = "Dashboard > iPhone Models";
      break;
    case "settings":
      title = "Settings";
      breadcrumbs = "Dashboard > Settings";
      break;
    default:
      const link = document.querySelector(`.side-link[data-panel="${panelId}"]`);
      if (link) {
        title = link.textContent.trim();
        breadcrumbs = `Dashboard > ${title}`;
      }
  }
  
  titleEl.textContent = title;
  breadcrumbsEl.textContent = breadcrumbs;
  
  if (showExportButton && exportCallback) {
    actionsEl.innerHTML = `
      <button class="export-btn-screenshot" onclick="${exportCallback}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Export Excel
      </button>
    `;
  }
}

function exportCSV(data, headers, filename) {
  const csvRows = [];
  csvRows.push(headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','));
  
  data.forEach(item => {
    const values = headers.map(header => {
      const val = item[header] !== undefined && item[header] !== null ? item[header] : '';
      const escaped = ('' + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  });

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

window.exportUsersToExcel = function() {
  const allUsersList = JSON.parse(localStorage.getItem("iselectrics-users")) || [];
  const usersList = filterByDateRange(allUsersList, 'rawDate');
  
  const allOrdersList = JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
  const filteredOrdersList = filterByDateRange(allOrdersList, 'rawDate');
  const userStats = {};
  filteredOrdersList.forEach(o => {
    if (o.userId) {
      if (!userStats[o.userId]) {
        userStats[o.userId] = { count: 0, spend: 0 };
      }
      userStats[o.userId].count += 1;
      userStats[o.userId].spend += Number(o.total || 0);
    }
  });

  const searchVal = (document.getElementById("users-panel-search")?.value || "").toLowerCase();
  
  let filtered = usersList.filter(user => 
    user.name.toLowerCase().includes(searchVal) || 
    user.mobile.includes(searchVal) || 
    user.email.toLowerCase().includes(searchVal) ||
    user.city.toLowerCase().includes(searchVal)
  );

  filtered = filtered.filter(user => {
    if (userFilterStatus !== "All") {
      const isUserActive = user.status === "Active" || user.status === "Admin";
      if (userFilterStatus === "Active" && !isUserActive) return false;
      if (userFilterStatus === "Inactive" && isUserActive) return false;
    }
    if (userFilterCity !== "All") {
      if (userFilterCity === "Others") {
        const standardCities = ["mumbai", "delhi", "surat", "bangalore", "lucknow", "chennai"];
        if (standardCities.includes(user.city.toLowerCase())) return false;
      } else {
        if (user.city.toLowerCase() !== userFilterCity.toLowerCase()) return false;
      }
    }
    const stats = userStats[user.dbId] || { count: 0, spend: 0 };
    if (userMinOrders !== null && stats.count < userMinOrders) return false;
    if (userMaxOrders !== null && stats.count > userMaxOrders) return false;
    if (userMinSpend !== null && stats.spend < userMinSpend) return false;
    if (userMaxSpend !== null && stats.spend > userMaxSpend) return false;
    return true;
  });

  const dataToExport = filtered.map(user => {
    const stats = userStats[user.dbId] || { count: 0, spend: 0 };
    return {
      "User ID": user.id,
      "Name": user.name,
      "Mobile": user.mobile,
      "Email": user.email,
      "City": user.city,
      "Total Orders": stats.count,
      "Total Spend": stats.spend,
      "Status": user.status,
      "Joined At": user.createdAt || "N/A"
    };
  });

  if (dataToExport.length === 0) {
    showToast("No users data to export!");
    return;
  }

  const headers = ["User ID", "Name", "Mobile", "Email", "City", "Total Orders", "Total Spend", "Status", "Joined At"];
  exportCSV(dataToExport, headers, "users_export.csv");
  showToast("Users exported successfully!");
};

window.exportOrdersToExcel = function() {
  const allOrdersList = JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
  const ordersList = filterByDateRange(allOrdersList, 'rawDate');

  const searchVal = (document.getElementById("orders-panel-search")?.value || "").toLowerCase();
  
  let filtered = ordersList;
  if (currentOrdersFilter === "COD") {
    filtered = ordersList.filter(o => o.payment === "COD");
  } else if (currentOrdersFilter === "Online") {
    filtered = ordersList.filter(o => o.payment === "Online");
  }
  
  filtered = filtered.filter(order => 
    order.id.toLowerCase().includes(searchVal) || 
    order.customer.toLowerCase().includes(searchVal) ||
    order.mobile.includes(searchVal) ||
    order.productName.toLowerCase().includes(searchVal) ||
    order.referrerName.toLowerCase().includes(searchVal)
  );

  filtered = filtered.filter(order => {
    if (orderFilterStatus !== "All" && order.status !== orderFilterStatus) return false;
    const amount = Number(order.total || 0);
    if (orderMinAmount !== null && amount < orderMinAmount) return false;
    if (orderMaxAmount !== null && amount > orderMaxAmount) return false;
    return true;
  });

  const dataToExport = filtered.map(order => {
    return {
      "Order ID": order.id,
      "Customer": order.customer,
      "Mobile": order.mobile,
      "Product Name": order.productName,
      "Amount": order.total,
      "Payment Method": order.payment,
      "Referral Source": order.referrerName || "Direct Order",
      "Order Date": order.date,
      "Status": order.status
    };
  });

  if (dataToExport.length === 0) {
    showToast("No orders data to export!");
    return;
  }

  const headers = ["Order ID", "Customer", "Mobile", "Product Name", "Amount", "Payment Method", "Referral Source", "Order Date", "Status"];
  exportCSV(dataToExport, headers, "orders_export.csv");
  showToast("Orders exported successfully!");
};

window.exportCategoriesToExcel = function() {
  const categories = JSON.parse(localStorage.getItem("iselectrics-categories")) || [];
  
  const dataToExport = categories.map(cat => {
    return {
      "Category Name": cat.name,
      "Slug": cat.slug,
      "Status": cat.status === "Active" || cat.status === true ? "Active" : "Inactive"
    };
  });

  if (dataToExport.length === 0) {
    showToast("No categories data to export!");
    return;
  }

  const headers = ["Category Name", "Slug", "Status"];
  exportCSV(dataToExport, headers, "categories_export.csv");
  showToast("Categories exported successfully!");
};

window.exportProductsToExcel = function() {
  const products = getProducts();
  
  const searchVal = (document.getElementById("products-panel-search")?.value || "").toLowerCase();
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchVal) || 
    (p.category || "").toLowerCase().includes(searchVal)
  );

  const dataToExport = filtered.map(p => {
    return {
      "Product Name": p.name,
      "Category": p.category,
      "Price": p.price,
      "Status/Visible": p.visible ? "Active" : "Inactive"
    };
  });

  if (dataToExport.length === 0) {
    showToast("No products data to export!");
    return;
  }

  const headers = ["Product Name", "Category", "Price", "Status/Visible"];
  exportCSV(dataToExport, headers, "products_export.csv");
  showToast("Products exported successfully!");
};

window.exportPayoutsToExcel = function() {
  const payouts = JSON.parse(localStorage.getItem("iselectrics-payouts")) || [];
  const dataToExport = payouts.map(p => {
    return {
      "Payout ID": p.id,
      "User Name": p.userName,
      "Mobile": p.userPhone,
      "Amount": p.amount,
      "Method": p.method,
      "Status": p.status,
      "Date": p.createdAt
    };
  });

  if (dataToExport.length === 0) {
    showToast("No payouts data to export!");
    return;
  }

  const headers = ["Payout ID", "User Name", "Mobile", "Amount", "Method", "Status", "Date"];
  exportCSV(dataToExport, headers, "payouts_export.csv");
  showToast("Payouts exported successfully!");
};

window.exportTriggerMailToExcel = function() {
  const allOrdersList = JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
  const searchInput = document.getElementById("trigger-mail-panel-search");
  const searchVal = (searchInput ? searchInput.value : "").toLowerCase().trim();
  
  let filteredOrders = allOrdersList.filter((o) => {
    const orderStatus = o.status ? String(o.status).toLowerCase() : "pending";
    return !["cancelled", "declined"].includes(orderStatus);
  });
  
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  filteredOrders = filteredOrders.map((order) => {
    let daysCompleted = 0;
    if (order.rawDate) {
      let dateStr = order.rawDate;
      if (typeof dateStr === 'string') {
        dateStr = dateStr.replace(/\s+/, 'T');
      }
      const purchaseDate = new Date(dateStr);
      const purchaseMidnight = new Date(purchaseDate.getFullYear(), purchaseDate.getMonth(), purchaseDate.getDate());
      const timeDiff = todayMidnight.getTime() - purchaseMidnight.getTime();
      daysCompleted = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
    }
    return { ...order, daysSincePurchase: daysCompleted };
  });

  const daysInput = document.getElementById("trigger-mail-days-input");
  const daysVal = daysInput ? daysInput.value.trim() : "";

  if (daysVal !== "") {
    const dayLimit = parseInt(daysVal, 10);
    filteredOrders = filteredOrders.filter(
      (order) => order.daysSincePurchase === dayLimit,
    );
  }

  if (searchVal !== "") {
    filteredOrders = filteredOrders.filter(
      (order) =>
        (order.customer && order.customer.toLowerCase().includes(searchVal)) ||
        (order.id && order.id.toLowerCase().includes(searchVal)) ||
        (order.productName && order.productName.toLowerCase().includes(searchVal)) ||
        (order.email && order.email.toLowerCase().includes(searchVal)) ||
        (order.mobile && order.mobile.includes(searchVal)),
    );
  }

  const dataToExport = filteredOrders.map((order, idx) => {
    const normalizedEmail = String(order.email || "").trim().toLowerCase();
    const hasBeenSent = triggerMailDeliveries.some(delivery => delivery.status === "sent" && (Number(delivery.anchor_order_id) === Number(order.dbId) || delivery.recipient_email === normalizedEmail));
    return {
      "Sr. No.": idx + 1,
      "Customer Name": order.customer,
      "Email Address": order.email || "N/A",
      "Mobile Number": order.mobile || "N/A",
      "Product Name": order.productName || "Unknown Product",
      "Order ID": order.id,
      "Purchase Date": order.date || "N/A",
      "Days Since Purchase": order.daysSincePurchase,
      "Mail Status": hasBeenSent ? "Sent" : "Not Sent"
    };
  });

  if (dataToExport.length === 0) {
    showToast("No trigger mail logs to export!");
    return;
  }

  const headers = ["Sr. No.", "Customer Name", "Email Address", "Mobile Number", "Product Name", "Order ID", "Purchase Date", "Days Since Purchase", "Mail Status"];
  exportCSV(dataToExport, headers, "trigger_mail_export.csv");
  showToast("Trigger mail logs exported successfully!");
};

window.changeUsersPage = function(pageNumber) {
  usersCurrentPage = pageNumber;
  renderUsersPanel();
};

window.changeOrdersPage = function(pageNumber) {
  ordersCurrentPage = pageNumber;
  renderOrdersPanel();
};

window.openUsersFilterPopover = function(buttonEl) {
  const existing = document.getElementById("users-filter-popover");
  if (existing) {
    existing.remove();
    return;
  }

  const other1 = document.getElementById("users-more-filters-popover");
  if (other1) other1.remove();
  const other2 = document.getElementById("date-picker-popover");
  if (other2) other2.remove();

  const rect = buttonEl.getBoundingClientRect();
  const popover = document.createElement("div");
  popover.id = "users-filter-popover";
  popover.style.position = "absolute";
  popover.style.top = `${rect.bottom + window.scrollY + 8}px`;
  popover.style.left = `${rect.left + window.scrollX}px`;
  popover.style.background = "#1e293b";
  popover.style.border = "1px solid rgba(255,255,255,0.12)";
  popover.style.borderRadius = "12px";
  popover.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
  popover.style.zIndex = "99999";
  popover.style.padding = "16px";
  popover.style.width = "250px";
  popover.style.display = "flex";
  popover.style.flexDirection = "column";
  popover.style.gap = "12px";

  popover.innerHTML = `
    <div style="font-weight: 700; color: white; font-size: 14px; margin-bottom: 4px;">Filter Users</div>
    
    <div style="display:flex; flex-direction:column; gap:6px;">
      <label style="font-size:11px; color:rgba(255,255,255,0.6);">Status</label>
      <select id="filter-user-status" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:#0f172a; color:white; outline:none; font-family:inherit; cursor:pointer;">
        <option value="All" ${userFilterStatus === "All" ? "selected" : ""}>All Statuses</option>
        <option value="Active" ${userFilterStatus === "Active" ? "selected" : ""}>Active</option>
        <option value="Inactive" ${userFilterStatus === "Inactive" ? "selected" : ""}>Inactive</option>
      </select>
    </div>
    
    <div style="display:flex; flex-direction:column; gap:6px;">
      <label style="font-size:11px; color:rgba(255,255,255,0.6);">City</label>
      <select id="filter-user-city" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:#0f172a; color:white; outline:none; font-family:inherit; cursor:pointer;">
        <option value="All" ${userFilterCity === "All" ? "selected" : ""}>All Cities</option>
        <option value="Mumbai" ${userFilterCity === "Mumbai" ? "selected" : ""}>Mumbai</option>
        <option value="Delhi" ${userFilterCity === "Delhi" ? "selected" : ""}>Delhi</option>
        <option value="Surat" ${userFilterCity === "Surat" ? "selected" : ""}>Surat</option>
        <option value="Bangalore" ${userFilterCity === "Bangalore" ? "selected" : ""}>Bangalore</option>
        <option value="Lucknow" ${userFilterCity === "Lucknow" ? "selected" : ""}>Lucknow</option>
        <option value="Chennai" ${userFilterCity === "Chennai" ? "selected" : ""}>Chennai</option>
        <option value="Others" ${userFilterCity === "Others" ? "selected" : ""}>Others</option>
      </select>
    </div>
    
    <div style="display:flex; gap:8px; margin-top:8px; border-top: 1px solid rgba(255,255,255,0.08); padding-top:12px;">
      <button id="clear-users-filter" style="flex:1; padding:8px; font-size:12px; background:transparent; color:white; border:1px solid rgba(255,255,255,0.1); border-radius:6px; cursor:pointer;">Reset</button>
      <button id="apply-users-filter" style="flex:2; padding:8px; font-size:12px; background:#08f2e8; color:black; font-weight:700; border:none; border-radius:6px; cursor:pointer;">Apply</button>
    </div>
  `;

  document.body.appendChild(popover);

  popover.querySelector("#clear-users-filter").onclick = () => {
    userFilterStatus = "All";
    userFilterCity = "All";
    popover.remove();
    usersCurrentPage = 1;
    renderUsersPanel();
    if (document.getElementById("users-table")) renderDashboardSummaryUsers();
    showToast("Filters reset");
  };

  popover.querySelector("#apply-users-filter").onclick = () => {
    userFilterStatus = document.getElementById("filter-user-status").value;
    userFilterCity = document.getElementById("filter-user-city").value;
    popover.remove();
    usersCurrentPage = 1;
    renderUsersPanel();
    if (document.getElementById("users-table")) renderDashboardSummaryUsers();
    showToast("Filters applied");
  };

  setTimeout(() => {
    const clickOutsideHandler = (e) => {
      if (!popover.contains(e.target) && !buttonEl.contains(e.target)) {
        popover.remove();
        document.removeEventListener("click", clickOutsideHandler);
      }
    };
    document.addEventListener("click", clickOutsideHandler);
  }, 10);
};

window.openUsersMoreFiltersPopover = function(buttonEl) {
  const existing = document.getElementById("users-more-filters-popover");
  if (existing) {
    existing.remove();
    return;
  }

  const other1 = document.getElementById("users-filter-popover");
  if (other1) other1.remove();
  const other2 = document.getElementById("date-picker-popover");
  if (other2) other2.remove();

  const rect = buttonEl.getBoundingClientRect();
  const popover = document.createElement("div");
  popover.id = "users-more-filters-popover";
  popover.style.position = "absolute";
  popover.style.top = `${rect.bottom + window.scrollY + 8}px`;
  popover.style.left = `${rect.left + window.scrollX}px`;
  popover.style.background = "#1e293b";
  popover.style.border = "1px solid rgba(255,255,255,0.12)";
  popover.style.borderRadius = "12px";
  popover.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
  popover.style.zIndex = "99999";
  popover.style.padding = "16px";
  popover.style.width = "280px";
  popover.style.display = "flex";
  popover.style.flexDirection = "column";
  popover.style.gap = "12px";

  const minOrdersVal = userMinOrders !== null ? userMinOrders : "";
  const maxOrdersVal = userMaxOrders !== null ? userMaxOrders : "";
  const minSpendVal = userMinSpend !== null ? userMinSpend : "";
  const maxSpendVal = userMaxSpend !== null ? userMaxSpend : "";

  popover.innerHTML = `
    <div style="font-weight: 700; color: white; font-size: 14px; margin-bottom: 4px;">More Filters (Orders & Spend)</div>
    
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
      <div style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-size:11px; color:rgba(255,255,255,0.6);">Min Orders</label>
        <input type="number" id="filter-user-min-orders" value="${minOrdersVal}" placeholder="0" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:#0f172a; color:white; outline:none; font-family:inherit;">
      </div>
      <div style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-size:11px; color:rgba(255,255,255,0.6);">Max Orders</label>
        <input type="number" id="filter-user-max-orders" value="${maxOrdersVal}" placeholder="Any" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:#0f172a; color:white; outline:none; font-family:inherit;">
      </div>
    </div>
    
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
      <div style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-size:11px; color:rgba(255,255,255,0.6);">Min Spend (₹)</label>
        <input type="number" id="filter-user-min-spend" value="${minSpendVal}" placeholder="0" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:#0f172a; color:white; outline:none; font-family:inherit;">
      </div>
      <div style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-size:11px; color:rgba(255,255,255,0.6);">Max Spend (₹)</label>
        <input type="number" id="filter-user-max-spend" value="${maxSpendVal}" placeholder="Any" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:#0f172a; color:white; outline:none; font-family:inherit;">
      </div>
    </div>
    
    <div style="display:flex; gap:8px; margin-top:8px; border-top: 1px solid rgba(255,255,255,0.08); padding-top:12px;">
      <button id="clear-users-more" style="flex:1; padding:8px; font-size:12px; background:transparent; color:white; border:1px solid rgba(255,255,255,0.1); border-radius:6px; cursor:pointer;">Reset</button>
      <button id="apply-users-more" style="flex:2; padding:8px; font-size:12px; background:#08f2e8; color:black; font-weight:700; border:none; border-radius:6px; cursor:pointer;">Apply</button>
    </div>
  `;

  document.body.appendChild(popover);

  popover.querySelector("#clear-users-more").onclick = () => {
    userMinOrders = null;
    userMaxOrders = null;
    userMinSpend = null;
    userMaxSpend = null;
    popover.remove();
    usersCurrentPage = 1;
    renderUsersPanel();
    if (document.getElementById("users-table")) renderDashboardSummaryUsers();
    showToast("More filters reset");
  };

  popover.querySelector("#apply-users-more").onclick = () => {
    const minO = document.getElementById("filter-user-min-orders").value;
    const maxO = document.getElementById("filter-user-max-orders").value;
    const minS = document.getElementById("filter-user-min-spend").value;
    const maxS = document.getElementById("filter-user-max-spend").value;

    userMinOrders = minO !== "" ? Number(minO) : null;
    userMaxOrders = maxO !== "" ? Number(maxO) : null;
    userMinSpend = minS !== "" ? Number(minS) : null;
    userMaxSpend = maxS !== "" ? Number(maxS) : null;

    popover.remove();
    usersCurrentPage = 1;
    renderUsersPanel();
    if (document.getElementById("users-table")) renderDashboardSummaryUsers();
    showToast("More filters applied");
  };

  setTimeout(() => {
    const clickOutsideHandler = (e) => {
      if (!popover.contains(e.target) && !buttonEl.contains(e.target)) {
        popover.remove();
        document.removeEventListener("click", clickOutsideHandler);
      }
    };
    document.addEventListener("click", clickOutsideHandler);
  }, 10);
};

window.openOrdersFilterPopover = function(buttonEl) {
  const existing = document.getElementById("orders-filter-popover");
  if (existing) {
    existing.remove();
    return;
  }

  const other = document.getElementById("date-picker-popover");
  if (other) other.remove();

  const rect = buttonEl.getBoundingClientRect();
  const popover = document.createElement("div");
  popover.id = "orders-filter-popover";
  popover.style.position = "absolute";
  popover.style.top = `${rect.bottom + window.scrollY + 8}px`;
  popover.style.left = `${rect.left + window.scrollX}px`;
  popover.style.background = "#1e293b";
  popover.style.border = "1px solid rgba(255,255,255,0.12)";
  popover.style.borderRadius = "12px";
  popover.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
  popover.style.zIndex = "99999";
  popover.style.padding = "16px";
  popover.style.width = "260px";
  popover.style.display = "flex";
  popover.style.flexDirection = "column";
  popover.style.gap = "12px";

  const minAmtVal = orderMinAmount !== null ? orderMinAmount : "";
  const maxAmtVal = orderMaxAmount !== null ? orderMaxAmount : "";

  popover.innerHTML = `
    <div style="font-weight: 700; color: white; font-size: 14px; margin-bottom: 4px;">Filter Orders</div>
    
    <div style="display:flex; flex-direction:column; gap:6px;">
      <label style="font-size:11px; color:rgba(255,255,255,0.6);">Order Status</label>
      <select id="filter-order-status" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:#0f172a; color:white; outline:none; font-family:inherit; cursor:pointer;">
        <option value="All" ${orderFilterStatus === "All" ? "selected" : ""}>All Statuses</option>
        <option value="Pending" ${orderFilterStatus === "Pending" ? "selected" : ""}>Pending</option>
        <option value="Processing" ${orderFilterStatus === "Processing" ? "selected" : ""}>Processing</option>
        <option value="Delivered" ${orderFilterStatus === "Delivered" ? "selected" : ""}>Delivered</option>
        <option value="Cancelled" ${orderFilterStatus === "Cancelled" ? "selected" : ""}>Cancelled</option>
      </select>
    </div>
    
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
      <div style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-size:11px; color:rgba(255,255,255,0.6);">Min Price (₹)</label>
        <input type="number" id="filter-order-min-amount" value="${minAmtVal}" placeholder="0" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:#0f172a; color:white; outline:none; font-family:inherit;">
      </div>
      <div style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-size:11px; color:rgba(255,255,255,0.6);">Max Price (₹)</label>
        <input type="number" id="filter-order-max-amount" value="${maxAmtVal}" placeholder="Any" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:#0f172a; color:white; outline:none; font-family:inherit;">
      </div>
    </div>
    
    <div style="display:flex; gap:8px; margin-top:8px; border-top: 1px solid rgba(255,255,255,0.08); padding-top:12px;">
      <button id="clear-orders-filter" style="flex:1; padding:8px; font-size:12px; background:transparent; color:white; border:1px solid rgba(255,255,255,0.1); border-radius:6px; cursor:pointer;">Reset</button>
      <button id="apply-orders-filter" style="flex:2; padding:8px; font-size:12px; background:#08f2e8; color:black; font-weight:700; border:none; border-radius:6px; cursor:pointer;">Apply</button>
    </div>
  `;

  document.body.appendChild(popover);

  popover.querySelector("#clear-orders-filter").onclick = () => {
    orderFilterStatus = "All";
    orderMinAmount = null;
    orderMaxAmount = null;
    popover.remove();
    ordersCurrentPage = 1;
    renderOrdersPanel();
    showToast("Orders filter reset");
  };

  popover.querySelector("#apply-orders-filter").onclick = () => {
    const statusVal = document.getElementById("filter-order-status").value;
    const minAmt = document.getElementById("filter-order-min-amount").value;
    const maxAmt = document.getElementById("filter-order-max-amount").value;

    orderFilterStatus = statusVal;
    orderMinAmount = minAmt !== "" ? Number(minAmt) : null;
    orderMaxAmount = maxAmt !== "" ? Number(maxAmt) : null;

    popover.remove();
    ordersCurrentPage = 1;
    renderOrdersPanel();
    showToast("Orders filter applied");
  };

  setTimeout(() => {
    const clickOutsideHandler = (e) => {
      if (!popover.contains(e.target) && !buttonEl.contains(e.target)) {
        popover.remove();
        document.removeEventListener("click", clickOutsideHandler);
      }
    };
    document.addEventListener("click", clickOutsideHandler);
  }, 10);
};

// ----------------- LISTENERS AND DELEGATION -----------------

document.addEventListener("DOMContentLoaded", () => {
  // Sidebar tab click delegation
  document.addEventListener("click", (event) => {
    // Toggle date picker popover
    const datePickerBtn = event.target.closest(".date-picker");
    if (datePickerBtn) {
      event.preventDefault();
      window.openDatePickerPopover(datePickerBtn);
      return;
    }

    const sideLink = event.target.closest(".side-link");
    if (sideLink) {
      document.querySelectorAll(".side-link").forEach((link) => link.classList.toggle("is-active", link === sideLink));
      
      const panelId = sideLink.dataset.panel;
      document.querySelectorAll(".admin-view").forEach(view => {
        view.classList.toggle("is-active", view.id === `panel-${panelId}`);
      });
      
      usersCurrentPage = 1;
      ordersCurrentPage = 1;
      updateAdminHeader(panelId);
      
      // Render the specific view upon click
      if (panelId === "dashboard") {
        loadUsersFromApi();
        loadAdminOrdersFromApi();
        renderDashboardSummaryUsers();
      } else if (panelId === "users") {
        loadUsersFromApi();
      } else if (panelId === "orders") {
        const orders = JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
        if (orders.length > 0) {
          const maxOrderId = Math.max(...orders.map(o => Number(o.dbId || 0)));
          localStorage.setItem("admin-last-viewed-order-id", maxOrderId);
        }
        loadAdminOrdersFromApi();
        updateOrdersBadge();
      } else if (panelId === "products") {
        loadProductsFromApi();
      } else if (panelId === "categories") {
        renderCategoriesPanel();
      } else if (panelId === "coupons") {
        renderCouponsPanel();
      } else if (panelId === "wallet") {
        clearWalletBadge(); // mark earnings as seen
        loadWalletsFromApi();
      } else if (panelId === "payouts") {
        loadPayoutsFromApi();
      } else if (panelId === "trigger-mail") {
        Promise.all([loadAdminOrdersFromApi(), loadTriggerMailDeliveries(), loadTriggerMailAutomationSetting()]).then(() => renderTriggerMailPanel());
      } else if (panelId === "email-template") {
        loadTriggerMailTemplate();
      } else if (panelId === "reviews") {
        loadReviewsFromApi().then(() => renderReviewsPanel());
      } else if (panelId === "banner") {
        initHeroUpload();
        renderBannerPanel();
      } else if (panelId === "iphone-models") {
        window.loadIphoneModelsFromApi(true);
      } else if (panelId === "shop-by-style") {
        window.loadShopByStylesFromApi(true);
      } else if (panelId === "settings") {
        renderSettingsPanel();
      }
      
      // Auto-close sidebar drawer on mobile click
      const sidebar = document.querySelector(".admin-sidebar");
      if (sidebar) {
        sidebar.classList.remove("is-open");
      }
    }

    // Toggle mobile sidebar drawer menu click
    const menuBtn = event.target.closest(".menu-btn");
    if (menuBtn) {
      const sidebar = document.querySelector(".admin-sidebar");
      if (sidebar) {
        sidebar.classList.toggle("is-open");
      }
    }

    // Close mobile sidebar drawer if clicked outside
    const sidebar = document.querySelector(".admin-sidebar");
    if (sidebar && sidebar.classList.contains("is-open")) {
      const isClickInside = sidebar.contains(event.target) || event.target.closest(".menu-btn");
      if (!isClickInside) {
        sidebar.classList.remove("is-open");
      }
    }

    const toastButton = event.target.closest("[data-toast]");
    if (toastButton) {
      showToast(toastButton.dataset.toast);
    }

    // Profile menu click: open edit profile modal
    const profileBtn = event.target.closest(".admin-profile");
    if (profileBtn) {
      const currentAdminJson = localStorage.getItem("admin-current-user");
      const currentAdmin = currentAdminJson ? JSON.parse(currentAdminJson) : null;
      if (currentAdmin) {
        document.getElementById("admin-profile-name").value = currentAdmin.name || "";
        document.getElementById("admin-profile-email").value = currentAdmin.email || "";
        document.getElementById("admin-profile-phone").value = currentAdmin.phone || "";
        document.getElementById("admin-profile-password").value = "";
      }
      document.getElementById("admin-profile-modal").style.display = "flex";
    }
    
    // Order Accept Trigger
    const acceptBtn = event.target.closest(".accept-btn");
    if (acceptBtn) {
      const id = acceptBtn.dataset.dbId;
      adminUpdateOrderStatus(id, "Accepted");
    }

    // Order Decline Trigger
    const declineBtn = event.target.closest(".decline-btn");
    if (declineBtn) {
      const id = declineBtn.dataset.dbId;
      if (confirm("Are you sure you want to decline this order?")) {
        adminUpdateOrderStatus(id, "Declined");
      }
    }

    // Product Edit Trigger
    const editBtn = event.target.closest(".edit-btn");
    if (editBtn) {
      const id = editBtn.dataset.id;
      const products = getProducts();
      const product = products.find(p => p.id === id);
      if (product) {
        populateCategoryDropdown(product.category);
        document.getElementById("edit-id").value = product.id;
        document.getElementById("edit-name").value = product.name;
        document.getElementById("edit-price").value = product.price;
        document.getElementById("edit-old-price").value = product.oldPrice || "";
        document.getElementById("edit-category").value = product.category || "Mobile";
        toggleCompatibleModelsField();
        
        // Images preview setup
        let imgs = [];
        if (product.images) {
          try {
            imgs = Array.isArray(product.images) ? product.images : JSON.parse(product.images);
          } catch(e) {
            imgs = [];
          }
        }
        if (!imgs.length && product.image) {
          imgs = [product.image];
        }

        thumbnailImageUrl = product.image || "";

        // Group existing flat images into { urls[], color, model } groups
        const rawItems = imgs.map(item => {
          let url = "";
          let color = "";
          let model = "";
          if (typeof item === "string") {
            url = resolveImageUrl(item);
          } else if (item && typeof item === "object") {
            url = resolveImageUrl(item);
            color = String(item.color || "").trim();
            model = String(item.model || "").trim();
          }
          if (url) {
            const filename = url.split("/").pop();
            if (!model) model = inferModelFromFilename(filename) || "";
            if (!color) {
              const colorsList = Array.isArray(product.colors) ? product.colors : (product.colors ? product.colors.split(",").map(c => c.trim()) : []);
              const cleanColors = colorsList.map(c => c.includes("||") ? c.split("||")[0].trim() : c.trim()).filter(Boolean);
              color = inferColorFromFilename(filename, cleanColors) || "";
            }
          }
          return url ? { url, color, model } : null;
        }).filter(Boolean);

        // Group by color+model key so each combo gets a urls[]
        const grouped = [];
        rawItems.forEach(item => {
          const key = `${item.color}||${item.model}`;
          const existing = grouped.find(g => `${g.color}||${g.model}` === key);
          if (existing) {
            existing.urls.push(item.url);
          } else {
            grouped.push({ urls: [item.url], color: item.color, model: item.model });
          }
        });
        uploadedImages = grouped.slice(0, 30);

        renderThumbnailPreview();

        const colorsInput = document.getElementById("edit-colors");
        if (colorsInput && !colorsInput.dataset.previewBound) {
          colorsInput.dataset.previewBound = "true";
          colorsInput.addEventListener("input", renderImagePreviews);
        }

        // Video preview setup
        const isVideoValid = product.video && product.video !== "null" && product.video !== "undefined";
        document.getElementById("edit-video").value = isVideoValid ? product.video : "";
        window.updateVideoPreview(product.video);

        // Set colors and models FIRST so gallery selectors can read them
        document.getElementById("edit-colors").value = Array.isArray(product.colors) ? product.colors.join(", ") : (product.colors || "");
        const currentModels = normalizeProductModels(product);
        renderProductModelsSelector(currentModels);
        toggleCompatibleModelsField();

        // Now render image previews (gallery selectors will find colors + models)
        renderImagePreviews();

        document.getElementById("edit-detail").value = product.detail || "";
        const sections = product.sections || [];
        document.getElementById("section-newly-launched").checked = sections.includes("newly-launched");
        document.getElementById("section-recommended").checked = sections.includes("recommended");
        document.getElementById("section-style").checked = sections.includes("style");
        document.getElementById("edit-modal").style.display = "flex";
      }
    }
    
    if (event.target.id === "cancel-edit") {
      document.getElementById("edit-modal").style.display = "none";
    }
    
    if (event.target.id === "save-product") {
      const id = document.getElementById("edit-id").value;
      const name = document.getElementById("edit-name").value;
      const price = document.getElementById("edit-price").value;
      const oldPrice = document.getElementById("edit-old-price").value;
      const category = document.getElementById("edit-category").value;
      const video = document.getElementById("edit-video").value;
      const colorsRaw = document.getElementById("edit-colors").value;
      const detail = document.getElementById("edit-detail").value;
      
      const token = localStorage.getItem("admin-user-token");
      
      if (!name || !price) {
          showToast("Name and Price are required");
          return;
      }
      
      const colors = colorsRaw ? colorsRaw.split(",").map(c => c.trim()).filter(c => c !== "") : [];
      const models = getSelectedProductModels(); // Get models from checkboxes
      const sections = getSelectedProductSections();
      const allImages = buildProductImagesPayload();
      
      const payload = {
          name: name,
          price: parseInt(price),
          old_price: oldPrice ? parseInt(oldPrice) : null,
          category: category || "Mobile",
          image: thumbnailImageUrl || (allImages[0] && allImages[0].url) || "assets/phone-case.png",
          images: allImages,
          video: video || null,
          colors: colors,
          models: models,
          detail: detail || "Premium product details.",
          sections: sections,
          is_newly_launched: sections.includes("newly-launched"),
          is_recommended: sections.includes("recommended"),
          is_style: sections.includes("style")
      };
      
      if (!id) {
        // ADD NEW PRODUCT (POST to API)
        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }).then(res => {
            if (res.status === 401) {
                handleSessionExpired();
                return;
            }
            if (res.ok) {
                res.json().then(data => {
                    const newId = data?.id || data?.product?.id;
                    if (newId) {
                      saveProductDisplaySections(String(newId), sections);
                      saveProductModels(String(newId), models);
                    }
                    showToast("Product added successfully");
                    loadProductsFromApi();
                    document.getElementById("edit-modal").style.display = "none";
                }).catch(() => {
                    showToast("Product added successfully");
                    loadProductsFromApi();
                    document.getElementById("edit-modal").style.display = "none";
                });
            } else {
                res.json().then(data => {
                    let errStr = data.message || "Failed to add product";
                    if (data.errors) {
                        errStr += ": " + Object.values(data.errors).join(", ");
                    }
                    showToast(errStr);
                }).catch(() => {
                    showToast("Failed to add product to database");
                });
            }
        }).catch(err => {
            console.error(err);
            showToast("Network error saving product");
        });
      } else {
        // EDIT EXISTING (PUT to API)
        fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }).then(res => {
            if (res.status === 401) {
                handleSessionExpired();
                return;
            }
            if (res.ok) {
                saveProductDisplaySections(id, sections);
                saveProductModels(id, models);
                showToast("Product updated successfully");
                loadProductsFromApi();
                document.getElementById("edit-modal").style.display = "none";
            } else {
                res.json().then(data => {
                    let errStr = data.message || "Failed to update product";
                    if (data.errors) {
                        errStr += ": " + Object.values(data.errors).join(", ");
                    }
                    showToast(errStr);
                }).catch(() => {
                    showToast("Failed to update product in database");
                });
            }
        }).catch(err => {
            console.error(err);
            showToast("Network error updating product");
        });
      }
    }

    // Orders Filter Tabs click
    const orderTabBtn = event.target.closest(".tab-btn-order");
    if (orderTabBtn) {
      document.querySelectorAll(".tab-btn-order").forEach(btn => btn.classList.toggle("is-active", btn === orderTabBtn));
      ordersCurrentPage = 1;
      currentOrdersFilter = orderTabBtn.dataset.filter;
      renderOrdersPanel();
    }

    // Wallet Filter Tabs click
    const walletTabBtn = event.target.closest(".tab-btn-wallet");
    if (walletTabBtn) {
      document.querySelectorAll(".tab-btn-wallet").forEach(btn => btn.classList.toggle("is-active", btn === walletTabBtn));
      currentWalletFilter = walletTabBtn.dataset.filter;
      renderWalletPanel();
    }
    
    // View User Details click
    const viewUserBtn = event.target.closest(".view-user-btn");
    if (viewUserBtn) {
      populateUserDetails(viewUserBtn.dataset.id);
      const detailsSidebar = document.querySelector(".user-details");
      if (detailsSidebar) {
        detailsSidebar.style.display = "block";
      }
    }
    
    // Close User Details
    if (event.target.closest("#close-user-details")) {
      const detailsSidebar = document.querySelector(".user-details");
      if (detailsSidebar) {
        detailsSidebar.style.display = "none";
      }
    }

    // Activity / Quick Action buttons inside User Details Sidebar
    const detailsSidebar = document.querySelector(".user-details");
    const activeUserId = detailsSidebar ? detailsSidebar.dataset.activeUserId : null;

    const activityBtn = event.target.closest(".activity-block button, .quick-actions button");
    if (activityBtn && activeUserId) {
      event.preventDefault();
      
      const usersList = JSON.parse(localStorage.getItem("iselectrics-users")) || [];
      const user = usersList.find(u => u.id === activeUserId);
      if (user) {
        const ordersList = JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
        const userOrders = ordersList.filter(o => Number(o.userId) === Number(user.dbId));
        
        const text = activityBtn.textContent.trim();
        
        if (text.includes("Order History")) {
          const orderRows = userOrders.map(o => `
            <div style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong>Order #${o.id}</strong> <small style="color: rgba(255,255,255,0.45);">${o.date}</small><br>
                <span style="font-size: 13px; color: rgba(255,255,255,0.7);">${o.productName} (x${o.qty})</span>
              </div>
              <div style="text-align: right;">
                <strong style="color: var(--cyan);">₹${o.total.toLocaleString("en-IN")}</strong><br>
                <span class="status ${o.status.toLowerCase()}" style="font-size: 11px; padding: 2px 6px; border-radius: 4px;">${o.status}</span>
              </div>
            </div>
          `).join("");
          
          const html = orderRows || `<div style="text-align: center; color: rgba(255,255,255,0.4); padding: 20px 0;">No order history found for this user.</div>`;
          window.showAdminDetailsModal(`Order History - ${user.name}`, html);
        }
        
        else if (text.includes("Browsing History")) {
          const html = `
            <div style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">
              <strong>iPhone 15 Pro Max Silicon Case (Lavender Blue)</strong><br>
              <span style="font-size: 12px; color: rgba(255,255,255,0.45);">Viewed today at 10:24 AM</span>
            </div>
            <div style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">
              <strong>Dell XPS 13 Ultra Thin Laptop Cover</strong><br>
              <span style="font-size: 12px; color: rgba(255,255,255,0.45);">Viewed yesterday at 4:15 PM</span>
            </div>
            <div style="padding: 10px;">
              <strong>Premium Leather Airpods Pro Cover</strong><br>
              <span style="font-size: 12px; color: rgba(255,255,255,0.45);">Added to wishlist on May 21</span>
            </div>
          `;
          window.showAdminDetailsModal(`Browsing History - ${user.name}`, html);
        }
        
        else if (text.includes("Wishlist")) {
          const html = `
            <div style="display: flex; gap: 12px; align-items: center; padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">
              <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 20px;">📱</div>
              <div>
                <strong>Premium MagSafe Silicon Cover</strong><br>
                <span style="color: var(--cyan); font-size: 13px;">₹499</span>
              </div>
            </div>
            <div style="display: flex; gap: 12px; align-items: center; padding: 10px;">
              <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 20px;">🎧</div>
              <div>
                <strong>Liquid Silicone AirPods Case</strong><br>
                <span style="color: var(--cyan); font-size: 13px;">₹299</span>
              </div>
            </div>
          `;
          window.showAdminDetailsModal(`Wishlist - ${user.name}`, html);
        }
        
        else if (text.includes("Cart History")) {
          const html = `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">
              <div>
                <strong>MagSafe Armor Cover</strong><br>
                <span style="font-size: 13px; color: rgba(255,255,255,0.5);">Quantity: 1</span>
              </div>
              <strong style="color: var(--cyan);">₹699</strong>
            </div>
            <div style="padding: 10px 10px 0; text-align: right; color: rgba(255,255,255,0.45); font-size: 13px;">
              Items in Cart: 1 &bull; Total Value: ₹699
            </div>
          `;
          window.showAdminDetailsModal(`Active Cart - ${user.name}`, html);
        }
        
        else if (text.includes("Search History")) {
          const html = `
            <ul style="padding-left: 20px; margin: 0; line-height: 1.8;">
              <li>"iphone 15 pro cover msafe"</li>
              <li>"macbook sleeve premium leather"</li>
              <li>"red covers silicone"</li>
              <li>"samsung galaxy s24 ultra"</li>
            </ul>
          `;
          window.showAdminDetailsModal(`Search Queries - ${user.name}`, html);
        }
        
        else if (text.includes("Reward History")) {
          const html = `
            <div style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between;">
              <span>Referral Signup Reward (John)</span>
              <strong style="color: var(--green);">+ ₹100</strong>
            </div>
            <div style="padding: 10px; display: flex; justify-content: space-between;">
              <span>First Order Promotional Reward</span>
              <strong style="color: var(--green);">+ ₹50</strong>
            </div>
          `;
          window.showAdminDetailsModal(`Rewards & Credits - ${user.name}`, html);
        }
        
        else if (text.includes("Wallet Transactions")) {
          const html = `
            <div style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between;">
              <div>
                <strong>Promotion Signup</strong><br>
                <small style="color: rgba(255,255,255,0.45);">Credited on sign-up</small>
              </div>
              <strong style="color: var(--green);">+ ₹50</strong>
            </div>
            <div style="padding: 10px; display: flex; justify-content: space-between;">
              <div>
                <strong>Used at checkout (Order #MB000002)</strong><br>
                <small style="color: rgba(255,255,255,0.45);">Debited at checkout</small>
              </div>
              <strong style="color: #ff5b67;">- ₹50</strong>
            </div>
          `;
          window.showAdminDetailsModal(`Wallet Transactions - ${user.name}`, html);
        }
        
        else if (text.includes("Send Notification")) {
          const message = prompt(`Enter notification message to send to ${user.name}:`);
          if (message) {
            showToast(`Notification sent to ${user.name} successfully!`);
          }
        }
        
        else if (text.includes("Add Reward Points")) {
          const points = prompt("Enter reward points/wallet balance to add (in ₹):");
          if (points && !isNaN(points)) {
            user.walletBalance = Number(user.walletBalance || 0) + Number(points);
            localStorage.setItem("iselectrics-users", JSON.stringify(usersList));
            populateUserDetails(user.id);
            showToast(`₹${points} added to ${user.name}'s wallet successfully!`);
            if (document.getElementById("users-panel-table")) renderUsersPanel();
            if (document.getElementById("users-table")) renderDashboardSummaryUsers();
          } else if (points) {
            showToast("Please enter a valid numeric amount");
          }
        }
        
        else if (text.includes("Block User") || text.includes("Unblock User")) {
          const isBlocked = user.status === "Blocked";
          user.status = isBlocked ? "Active" : "Blocked";
          localStorage.setItem("iselectrics-users", JSON.stringify(usersList));
          populateUserDetails(user.id);
          if (document.getElementById("users-panel-table")) renderUsersPanel();
          if (document.getElementById("users-table")) renderDashboardSummaryUsers();
          showToast(`User ${user.name} has been ${isBlocked ? "unblocked" : "blocked"} successfully!`);
        }
      }
    }
  });

  window.showAdminDetailsModal = function(title, contentHtml) {
    let modal = document.getElementById("admin-details-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "admin-details-modal";
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.background = "rgba(15, 23, 42, 0.75)";
      modal.style.backdropFilter = "blur(12px)";
      modal.style.zIndex = "10000";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.padding = "20px";
      modal.style.boxSizing = "border-box";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="panel" style="width: 100%; max-width: 500px; max-height: 80vh; overflow-y: auto; padding: 25px; position: relative; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); background: #111; color: white;">
        <button onclick="document.getElementById('admin-details-modal').style.display='none'" style="position: absolute; top: 16px; right: 16px; background: none; border: none; color: rgba(255,255,255,0.5); font-size: 24px; cursor: pointer;">&times;</button>
        <h2 style="font-size: 20px; font-weight: 700; color: var(--cyan); margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-top:0;">${title}</h2>
        <div style="font-size: 14px; line-height: 1.5; color: rgba(255,255,255,0.85);">${contentHtml}</div>
        <button onclick="document.getElementById('admin-details-modal').style.display='none'" style="margin-top: 24px; width: 100%; padding: 12px; background: var(--cyan); border: none; color: black; font-weight: 700; border-radius: 8px; cursor: pointer; transition: all 0.2s; font-size: 14px;">Close</button>
      </div>
    `;
    modal.style.display = "flex";
  };

  // Bind change listener to `#detail-user-select` dropdown
  document.addEventListener("change", (e) => {
    if (e.target && e.target.id === "detail-user-select") {
      if (e.target.value) {
        populateUserDetails(e.target.value);
      }
    }
    if (e.target && e.target.id === "edit-category") {
      toggleCompatibleModelsField();
    }
  });

  // Search input listeners for panels
  const usersSearch = document.getElementById("users-panel-search");
  if (usersSearch) {
    usersSearch.addEventListener("input", renderUsersPanel);
  }

  const ordersSearch = document.getElementById("orders-panel-search");
  if (ordersSearch) {
    ordersSearch.addEventListener("input", renderOrdersPanel);
  }

  const productsSearch = document.getElementById("products-panel-search");
  if (productsSearch) {
    productsSearch.addEventListener("input", renderProductsPanel);
  }

  const reviewsSearch = document.getElementById("reviews-panel-search");
  if (reviewsSearch) {
    reviewsSearch.addEventListener("input", renderReviewsPanel);
  }

  const couponsSearch = document.getElementById("coupons-panel-search");
  if (couponsSearch) {
    couponsSearch.addEventListener("input", renderCouponsPanel);
  }

  const reviewsFilterStars = document.getElementById("reviews-filter-stars");
  if (reviewsFilterStars) {
    reviewsFilterStars.addEventListener("change", renderReviewsPanel);
  }

  const reviewsFilterVisibility = document.getElementById("reviews-filter-visibility");
  if (reviewsFilterVisibility) {
    reviewsFilterVisibility.addEventListener("change", renderReviewsPanel);
  }



  // Dashboard landing page user search
  const dashboardSearch = document.querySelector(".admin-search input");
  if (dashboardSearch) {
    dashboardSearch.addEventListener("input", (event) => {
      const query = event.target.value.trim().toLowerCase();
      document.querySelectorAll("#users-table tr").forEach((row) => {
        row.hidden = !row.textContent.toLowerCase().includes(query);
      });
    });
  }

  // Auto generate category slug
  const catNameInput = document.getElementById("cat-name");
  if (catNameInput) {
    catNameInput.addEventListener("input", (e) => {
      document.getElementById("cat-slug").value = e.target.value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    });
  }

  // Auto generate category slug for edit form
  const editCatNameInput = document.getElementById("edit-cat-name");
  if (editCatNameInput) {
    editCatNameInput.addEventListener("input", (e) => {
      document.getElementById("edit-cat-slug").value = e.target.value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    });
  }
  
  // Initialize drag & drop zones for product media upload
  initDragAndDropZones();
});

// Authentication Gate Check
function checkAuth() {
  const loginContainer = document.getElementById("login-container");
  const adminShell = document.getElementById("admin-shell");
  
  const token = localStorage.getItem("admin-user-token");
  if (localStorage.getItem("admin-authenticated") === "true" && token && token !== "null" && token !== "undefined") {
    if (loginContainer) loginContainer.style.display = "none";
    if (adminShell) adminShell.style.display = "";
    hydrateIcons();
    
    // Dynamically load fresh users and orders from API
    loadUsersFromApi();
    loadAdminOrdersFromApi();
    loadCouponsFromApi();
    loadWalletsFromApi();
    loadCurrentAdminFromApi();
    loadIphoneModelsFromApi();
    loadCategoriesFromApi().then(() => renderCategoriesPanel());
    
    renderDashboardSummaryUsers();
    renderUsersPanel();
    renderSettingsPanel();
    renderOrdersPanel();
    renderProductsPanel();
    renderCategoriesPanel();
    renderCouponsPanel();
    renderWalletPanel();
    loadReviewsFromApi().then(() => renderReviewsPanel());
    
    const activeLink = document.querySelector(".side-link.is-active");
    const activePanelId = activeLink ? activeLink.dataset.panel : "dashboard";
    updateAdminHeader(activePanelId);
  } else {
    if (loginContainer) loginContainer.style.display = "flex";
    if (adminShell) adminShell.style.display = "none";
  }
}

// Handle Form Login submit
async function handleLogin() {
  const identifier = document.getElementById("login-identifier").value.trim();
  const password = document.getElementById("login-password").value;
  if (!identifier || !password) return showToast("Enter credentials");

  try {
      const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({ email: identifier, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
          if (res.status === 500 || (data.message && data.message.toLowerCase().includes("internal server error"))) {
              return showToast("Database Connection Error! Make sure local MySQL (XAMPP) is started.");
          }
          return showToast(data.message || "Invalid credentials");
      }

      if (data.requires_otp) {
          showToast("OTP sent to your registered phone number!");
          renderAdminOTPVerification({ email: identifier, password, phone: data.phone, otp: data.otp });
          return;
      }

      if (data.user && data.user.is_admin) {
          localStorage.setItem("admin-user-token", data.access_token);
          localStorage.setItem("admin-authenticated", "true");
          checkAuth();
          showToast("Logged in successfully");
          loadUsersFromApi(); // reload after login
          loadAdminOrdersFromApi(); // reload orders after login
      } else {
          showToast("Invalid admin credentials");
      }
  } catch (err) {
      showToast("Login failed. Check connection.");
  }
}

// Dynamic Admin OTP Form Render
function renderAdminOTPVerification(details) {
  if (details.otp) {
    console.log("%c[Developer Info] Simulated Admin OTP sent to " + details.phone + ": " + details.otp, "color: #10f3ed; font-weight: bold; font-size: 13px; background: rgba(16, 243, 237, 0.1); padding: 4px 8px; border-radius: 4px;");
  }

  const container = document.getElementById("login-container");
  if (!container) return;
  
  container.innerHTML = `
    <div class="panel" style="width: 100%; max-width: 400px; padding: 40px 30px; border-radius: 16px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); text-align: center; animation: fadeIn 0.3s ease-in-out;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #10f3ed, #0074d5); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px; box-shadow: 0 0 20px rgba(16, 243, 237, 0.35);">
          <svg viewBox="0 0 24 24" style="width: 32px; height: 32px; fill: black;"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
        </div>
        <h2 style="font-size: 24px; font-weight: 700; background: linear-gradient(to right, #ffffff, #8892b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Two-Step Verification</h2>
        <p style="color: #8892b0; font-size: 14px; margin-top: 8px; line-height: 1.5;">
          For security, we sent a 6-digit OTP to your registered phone:<br>
          <strong style="color: #10f3ed;">${details.phone}</strong>
        </p>
      </div>
      <form id="admin-otp-form" onsubmit="event.preventDefault();">
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 13px; color: #8892b0; margin-bottom: 8px; font-weight: 500;">Verification Code</label>
          <input type="text" id="admin-otp-code" placeholder="••••••" maxlength="6" required 
                 style="text-align: center; font-size: 24px; letter-spacing: 6px; font-weight: 700; font-family: monospace; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; width: 100%; box-sizing: border-box; outline: none; transition: border-color 0.2s;"
                 oninput="this.value = this.value.replace(/\\D/g,'');">
        </div>
        <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(90deg, #10f3ed, #0074d5); border: none; border-radius: 8px; color: black; font-size: 16px; font-weight: 700; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
          Verify & Log In
        </button>
      </form>
      <div style="margin-top: 24px; text-align: center; font-size: 13px;">
        <a href="#" id="admin-otp-resend" style="color: #10f3ed; text-decoration: none; font-weight: 600;">Resend OTP</a>
        <br><br>
        <a href="#" id="admin-otp-cancel" style="color: #8892b0; text-decoration: none;">← Cancel</a>
      </div>
    </div>
  `;

  document.getElementById("admin-otp-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const otp = document.getElementById("admin-otp-code").value.trim();
    if (otp.length !== 6) {
      return showToast("Please enter a 6-digit OTP");
    }
    
    try {
        const verifyRes = await fetch('/api/login/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: details.email, otp })
        });
        const verifyData = await verifyRes.json();
        
        if (verifyRes.ok && verifyData.user.is_admin) {
            localStorage.setItem("admin-user-token", verifyData.access_token);
            localStorage.setItem("admin-authenticated", "true");
            checkAuth();
            showToast("Logged in successfully");
            loadUsersFromApi();
            loadAdminOrdersFromApi();
            
            // Restore default form HTML structure in case they log out later
            restoreAdminLoginForm();
        } else {
            showToast(verifyData.message || "OTP verification failed or unauthorized");
        }
    } catch (err) {
        showToast("Verification failed. Check connection.");
    }
  });

  document.getElementById("admin-otp-resend").addEventListener("click", async (e) => {
    e.preventDefault();
    showToast("Resending OTP...");
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: details.email, password: details.password })
        });
        const data = await res.json();
        if (res.ok && data.requires_otp) {
            showToast("OTP resent successfully!");
            renderAdminOTPVerification({ email: details.email, password: details.password, phone: data.phone, otp: data.otp });
        } else {
            showToast("Failed to resend OTP");
        }
    } catch (err) {
        showToast("Resend failed. Check connection.");
    }
  });

  document.getElementById("admin-otp-cancel").addEventListener("click", (e) => {
    e.preventDefault();
    restoreAdminLoginForm();
  });
}

// Restore default Credentials Login Form
function restoreAdminLoginForm() {
  const container = document.getElementById("login-container");
  if (!container) return;
  container.innerHTML = `
    <div class="panel" style="width: 100%; max-width: 400px; padding: 40px 30px; border-radius: 16px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #10f3ed, #0074d5); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px; box-shadow: 0 0 20px rgba(16, 243, 237, 0.35);">
          <svg viewBox="0 0 24 24" style="width: 32px; height: 32px; fill: black;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
        </div>
        <h2 style="font-size: 24px; font-weight: 700; background: linear-gradient(to right, #ffffff, #8892b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Admin Portal</h2>
        <p style="color: var(--muted); font-size: 14px; margin-top: 5px;">Sign in to manage your store</p>
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
  `;
}

// Clear modal inputs fully to prevent variant leakage and dirty states
function openAddProductModal() {
  populateCategoryDropdown();
  document.getElementById("edit-id").value = "";
  document.getElementById("edit-name").value = "";
  document.getElementById("edit-price").value = "";
  document.getElementById("edit-old-price").value = "";
  document.getElementById("edit-category").value = document.getElementById("edit-category").options[0]?.value || "Mobile";
  toggleCompatibleModelsField();
  
  // Clear image drag zone & previews
  thumbnailImageUrl = "";
  uploadedImages = [];
  renderThumbnailPreview();
  const galleryModel = document.getElementById("gallery-upload-model");
  const galleryColor = document.getElementById("gallery-upload-color");
  if (galleryModel) galleryModel.value = "";
  if (galleryColor) galleryColor.value = "";
  renderImagePreviews();
  
  // Clear video drag zone & preview
  document.getElementById("edit-video").value = "";
  window.updateVideoPreview("");

  document.getElementById("edit-colors").value = "";
  const editModelsEl = document.getElementById("edit-models");
  if (editModelsEl) editModelsEl.value = "";
  renderProductModelsSelector([]);
  toggleCompatibleModelsField();
  document.getElementById("edit-detail").value = "";
  document.getElementById("section-newly-launched").checked = false;
  document.getElementById("section-recommended").checked = false;
  document.getElementById("section-style").checked = false;
  document.getElementById("edit-modal").style.display = "flex";
}

// Log out and notify user when sanctum tokens are invalid or cleared
function handleSessionExpired() {
  localStorage.removeItem("admin-authenticated");
  localStorage.removeItem("admin-user-token");
  checkAuth();
  showToast("Session expired or database reset. Please log in again.");
}

// User Permament Deletion API call
async function handleDeleteUser(id) {
  if (!confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) return;

  const token = localStorage.getItem("admin-user-token");
  if (!token) return showToast("Unauthorized. Please log in again.");

  let dbId = id;
  if (typeof id === 'string' && id.startsWith('#MB')) {
      dbId = parseInt(id.replace('#MB', ''), 10);
  }

  try {
    const res = await fetch(`/api/users/${dbId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (res.ok) {
      showToast("User deleted successfully");
      
      // Update local storage representation
      let localUsers = JSON.parse(localStorage.getItem("iselectrics-users")) || [];
      localUsers = localUsers.filter(u => u.id.toString() !== id.toString());
      localStorage.setItem("iselectrics-users", JSON.stringify(localUsers));
      
      renderUsersPanel();
      if (document.getElementById("users-table")) {
        renderDashboardSummaryUsers();
      }
    } else {
      showToast(data.message || "Failed to delete user");
    }
  } catch (err) {
    showToast("Error deleting user");
  }
}

// Import reviews submitted on the storefront into the admin reviews list
function importStorefrontReviews() {
  const adminReviews = JSON.parse(localStorage.getItem("iselectrics-reviews")) || [];
  const storefrontReviews = JSON.parse(localStorage.getItem("iselectrics-reviews-db")) || [];

  let updated = false;

  storefrontReviews.forEach(sr => {
    // Check if this storefront review is already in admin reviews.
    // Storefront reviews have 'customer' and 'comment'. We compare them.
    const exists = adminReviews.some(ar => 
      ar.name === sr.customer && 
      ar.message === sr.comment
    );

    if (!exists) {
      // Import it!
      const newAdminReview = {
        id: 'user-' + sr.id,
        productId: sr.productId ? sr.productId.toString() : "3",
        name: sr.customer,
        avatar: sr.avatar || "U",
        date: sr.date,
        stars: sr.rating || 5,
        message: sr.comment,
        verified: sr.verified || false,
        visible: true // Default to visible
      };
      adminReviews.push(newAdminReview);
      updated = true;
    }
  });

  if (updated) {
    localStorage.setItem("iselectrics-reviews", JSON.stringify(adminReviews));
  }
}

// Synchronize admin reviews to user storefront DB in localStorage
function syncReviewsToUserDb() {
  // DB-driven reviews; no-op
}

// Global variables for product images
let thumbnailImageUrl = "";
let uploadedImages = [];

function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function uploadFileToServer(blob, originalFileName, callback) {
  const token = localStorage.getItem("admin-user-token");
  const formData = new FormData();
  formData.append("file", blob, originalFileName);

  fetch("/api/upload", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  })
  .then(res => {
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  })
  .then(data => {
    if (data.url) {
      console.log("🚀 [Upload Success] Image saved as:", data.url);
      callback(data.url);
    } else {
      showToast("Server returned invalid upload response");
    }
  })
  .catch(err => {
    console.error(err);
    showToast("Error uploading file to server");
  });
}

function renderThumbnailPreview() {
  const preview = document.getElementById("thumbnail-preview");
  const wrap = document.getElementById("thumbnail-preview-wrap");
  const zone = document.getElementById("thumbnail-drag-zone");
  const text = document.getElementById("thumbnail-drag-text");
  if (!preview || !wrap || !zone) return;

  if (thumbnailImageUrl) {
    preview.src = thumbnailImageUrl;
    wrap.style.display = "block";
    zone.style.display = "none";
    if (text) text.textContent = "Thumbnail selected";
  } else {
    preview.src = "";
    wrap.style.display = "none";
    zone.style.display = "block";
    if (text) text.innerHTML = `Drag & drop thumbnail here, or <span style="color: var(--cyan);">browse</span>`;
  }
}

// --- COLOR CATALOG MANAGER ---

const defaultCatalogColors = [
  { name: "Red", hex: "#ef4444" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Black", hex: "#111827" },
  { name: "Brown", hex: "#8b4513" }
];

function getCustomCatalogColors() {
  try {
    return JSON.parse(localStorage.getItem("admin-custom-colors")) || [];
  } catch (e) {
    return [];
  }
}

function saveCustomCatalogColors(list) {
  localStorage.setItem("admin-custom-colors", JSON.stringify(list));
}

window.addCustomColorToCatalog = function() {
  const nameInput = document.getElementById("custom-color-name");
  const pickerInput = document.getElementById("custom-color-picker");
  if (!nameInput || !pickerInput) return;
  
  const name = nameInput.value.trim();
  const hex = pickerInput.value.trim();
  
  if (name === "") {
    showToast("Please enter a color name");
    return;
  }
  
  if (name.includes(",") || name.includes("||")) {
    showToast("Invalid characters in color name");
    return;
  }
  
  const customList = getCustomCatalogColors();
  if (customList.some(c => c.name.toLowerCase() === name.toLowerCase()) || defaultCatalogColors.some(c => c.name.toLowerCase() === name.toLowerCase())) {
    showToast("Color already exists in catalog");
    return;
  }
  
  customList.push({ name, hex });
  saveCustomCatalogColors(customList);
  nameInput.value = "";
  
  renderColorCatalog();
  
  // Auto select color!
  window.toggleColorSelection(name, hex);
  
  showToast(`Added and selected ${name}!`);
};

window.addCustomModelToCatalog = async function() {
  const input = document.getElementById("custom-model-name");
  if (!input) return;
  
  const modelName = input.value.trim();
  if (modelName === "") {
    showToast("Please enter a model name");
    return;
  }
  
  const token = localStorage.getItem("admin-user-token");
  if (!token) return showToast("Unauthorized");
  
  // Get current models list
  let currentModels = [];
  try {
    currentModels = JSON.parse(localStorage.getItem("iselectrics-iphone-models")) || [];
  } catch (e) {
    currentModels = [];
  }
  
  // Check if model already exists
  const exists = currentModels.some(m => {
    const name = typeof m === 'object' ? m.name : m;
    return name.toLowerCase() === modelName.toLowerCase();
  });
  
  if (exists) {
    showToast("Model already exists");
    return;
  }
  
  // Add new model
  const newModel = { name: modelName, image: "/assets/phone-case.png" };
  currentModels.push(newModel);
  
  showToast("Adding model to database...");
  try {
    const res = await fetch('/api/iphone-models/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        models: currentModels
      })
    });
    
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("iselectrics-iphone-models", JSON.stringify(data));
      window.tempIphoneModels = data || [];
      
      input.value = "";
      renderVariantsList();
      
      showToast(`Model ${modelName} added successfully!`);
    } else {
      showToast(data.message || "Failed to add model");
    }
  } catch (e) {
    console.error("Error adding model:", e);
    showToast("Network error adding model");
  }
};

window.deleteCustomColorFromCatalog = function(name, event) {
  if (event) event.stopPropagation();
  let customList = getCustomCatalogColors();
  customList = customList.filter(c => c.name.toLowerCase() !== name.toLowerCase());
  saveCustomCatalogColors(customList);
  
  // Also remove from selected colors if present
  const colorsInput = document.getElementById("edit-colors");
  if (colorsInput) {
    let selected = colorsInput.value.split(",").map(c => c.trim()).filter(Boolean);
    selected = selected.filter(s => {
      const clean = s.includes("||") ? s.split("||")[0].trim() : s;
      return clean.toLowerCase() !== name.toLowerCase();
    });
    colorsInput.value = selected.join(", ");
  }
  
  renderColorCatalog();
  renderVariantsList();
};

window.toggleColorSelection = function(colorName, colorHex) {
  const colorsInput = document.getElementById("edit-colors");
  if (!colorsInput) return;
  
  let selected = colorsInput.value.split(",").map(c => c.trim()).filter(Boolean);
  
  // Find index of this color matching either clean name or name||hex
  const matchIdx = selected.findIndex(s => {
    const clean = s.includes("||") ? s.split("||")[0].trim() : s;
    return clean.toLowerCase() === colorName.toLowerCase();
  });
  
  if (matchIdx !== -1) {
    // Already selected, remove it
    selected.splice(matchIdx, 1);
  } else {
    // Add it. If it's a default color, we just store "Name", else "Name||Hex"
    const isDefault = defaultCatalogColors.some(c => c.name.toLowerCase() === colorName.toLowerCase());
    if (isDefault) {
      selected.push(colorName);
    } else {
      selected.push(`${colorName}||${colorHex}`);
    }
  }
  
  colorsInput.value = selected.join(", ");
  renderColorCatalog();
  renderVariantsList();
};

function renderColorCatalog() {
  const listContainer = document.getElementById("admin-color-catalog-list");
  if (!listContainer) return;
  
  listContainer.innerHTML = "";
  
  const colorsInput = document.getElementById("edit-colors");
  const selectedList = colorsInput ? colorsInput.value.split(",").map(c => c.trim()).filter(Boolean) : [];
  const selectedCleanNames = selectedList.map(s => s.includes("||") ? s.split("||")[0].trim().toLowerCase() : s.toLowerCase());
  
  const customList = getCustomCatalogColors();
  const allColors = [...defaultCatalogColors, ...customList];
  
  allColors.forEach(c => {
    const isSelected = selectedCleanNames.includes(c.name.toLowerCase());
    const isDefault = defaultCatalogColors.some(d => d.name.toLowerCase() === c.name.toLowerCase());
    
    const pill = document.createElement("div");
    pill.style.cssText = `display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; user-select: none; border: 1px solid ${isSelected ? 'var(--cyan)' : 'rgba(255,255,255,0.1)'}; background: ${isSelected ? 'rgba(16,243,237,0.1)' : 'rgba(255,255,255,0.03)'}; color: ${isSelected ? 'white' : '#8892b0'};`;
    
    // Left color dot
    const dot = document.createElement("span");
    dot.style.cssText = `width: 10px; height: 10px; border-radius: 50%; background-color: ${c.hex}; border: 1px solid rgba(255,255,255,0.2);`;
    pill.appendChild(dot);
    
    // Label text
    const label = document.createElement("span");
    label.textContent = c.name;
    pill.appendChild(label);
    
    // Toggle action
    pill.addEventListener("click", () => {
      window.toggleColorSelection(c.name, c.hex);
    });
    
    // Custom delete button if custom
    if (!isDefault) {
      const delBtn = document.createElement("span");
      delBtn.textContent = "✕";
      delBtn.style.cssText = "margin-left: 4px; font-size: 9px; color: #ff5b67; display: flex; align-items: center; justify-content: center; width: 12px; height: 12px; border-radius: 50%; transition: background-color 0.2s;";
      delBtn.addEventListener("mouseover", () => delBtn.style.backgroundColor = "rgba(255,91,103,0.2)");
      delBtn.addEventListener("mouseout", () => delBtn.style.backgroundColor = "transparent");
      delBtn.addEventListener("click", (e) => {
        window.deleteCustomColorFromCatalog(c.name, e);
      });
      pill.appendChild(delBtn);
    }
    
    listContainer.appendChild(pill);
  });
}

// --- PRODUCT IMAGE VARIANTS MANAGER ---

window.addNewVariantRow = function() {
  uploadedImages.push({ urls: [], color: "", model: "" });
  renderVariantsList();
};

window.deleteVariantRow = function(index) {
  uploadedImages.splice(index, 1);
  renderVariantsList();
};

window.updateVariantModel = function(index, model) {
  if (uploadedImages[index]) {
    uploadedImages[index].model = model;
  }
};

window.updateVariantColor = function(index, color) {
  if (uploadedImages[index]) {
    uploadedImages[index].color = color;
    
    // Auto-add to selected product colors if not present
    const colorsInput = document.getElementById("edit-colors");
    if (colorsInput && color) {
      let selected = colorsInput.value.split(",").map(c => c.trim()).filter(Boolean);
      const exists = selected.some(s => {
        const clean = s.includes("||") ? s.split("||")[0].trim() : s;
        return clean.toLowerCase() === color.toLowerCase();
      });
      
      if (!exists) {
        // Find custom hex if it exists in custom catalog
        const customCatalog = getCustomCatalogColors();
        const customMatch = customCatalog.find(c => c.name.toLowerCase() === color.toLowerCase());
        if (customMatch) {
          selected.push(`${customMatch.name}||${customMatch.hex}`);
        } else {
          // Check if it's default catalog color to preserve case
          const defaultMatch = defaultCatalogColors.find(c => c.name.toLowerCase() === color.toLowerCase());
          selected.push(defaultMatch ? defaultMatch.name : color);
        }
        colorsInput.value = selected.join(", ");
        renderColorCatalog(); // Refresh catalog highlights!
      }
    }
  }
};

window.removeVariantImage = function(index, urlIndex) {
  if (!uploadedImages[index]) return;
  // Support both old { url } and new { urls[] }
  if (uploadedImages[index].urls) {
    uploadedImages[index].urls.splice(urlIndex, 1);
  } else {
    uploadedImages[index].url = "";
  }
  renderVariantsList();
};

window.uploadVariantImage = function(index, files) {
  if (!files || files.length === 0) return;
  // Upload all selected files
  Array.from(files).forEach(file => {
    showToast("Compressing and uploading image...");
    compressAndAddImage(file, (compressedBase64) => {
      const blob = dataURLtoBlob(compressedBase64);
      uploadFileToServer(blob, file.name, (url) => {
        if (!uploadedImages[index]) return;
        // Migrate old format on the fly
        if (!uploadedImages[index].urls) {
          uploadedImages[index].urls = uploadedImages[index].url ? [uploadedImages[index].url] : [];
          delete uploadedImages[index].url;
        }
        uploadedImages[index].urls.push(url);

        // Auto-infer model from filename if not set
        if (!uploadedImages[index].model) {
          uploadedImages[index].model = inferModelFromFilename(file.name) || "";
        }
        // Auto-infer color from filename if not set
        if (!uploadedImages[index].color) {
          const colorsInput = document.getElementById("edit-colors");
          const selectedColors = colorsInput ? colorsInput.value.split(",").map(c => {
            const val = c.trim();
            return val.includes("||") ? val.split("||")[0].trim() : val;
          }).filter(Boolean) : [];
          uploadedImages[index].color = inferColorFromFilename(file.name, selectedColors) || "";
        }

        renderVariantsList();
        showToast("Image uploaded successfully");
      });
    });
  });
};

function renderVariantsList() {
  const container = document.getElementById("variants-list-container");
  if (!container) return;

  container.innerHTML = "";

  const models = getIphoneModels() || [];
  const colorsInput = document.getElementById("edit-colors");
  const selectedColors = colorsInput ? colorsInput.value.split(",").map(c => {
    const val = c.trim();
    return val.includes("||") ? val.split("||")[0].trim() : val;
  }).filter(Boolean) : [];

  const defaultNames = defaultCatalogColors.map(c => c.name);
  const customNames = getCustomCatalogColors().map(c => c.name);
  const colors = Array.from(new Set([
    ...selectedColors,
    ...defaultNames,
    ...customNames
  ])).filter(Boolean);

  if (uploadedImages.length === 0) {
    uploadedImages.push({ urls: [], color: "", model: "" });
  }

  uploadedImages.forEach((variant, index) => {
    // Normalise: support both old { url } and new { urls[] }
    if (!variant.urls) {
      variant.urls = variant.url ? [variant.url] : [];
      delete variant.url;
    }

    const row = document.createElement("div");
    row.className = "variant-row";
    row.style.cssText = "display: flex; flex-direction: column; gap: 10px; background: rgba(255,255,255,0.02); padding: 14px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;";

    // ── Header row: dropdowns + delete button ──
    const headerRow = document.createElement("div");
    headerRow.style.cssText = "display: flex; gap: 10px; align-items: center;";

    // Model Select
    const modelSelect = document.createElement("select");
    modelSelect.style.cssText = "flex: 1; padding: 8px; background: rgba(18,25,31,0.98); color: white; border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; font-size: 12px; cursor: pointer; outline: none;";
    modelSelect.innerHTML = `<option value="">Select Model</option>` +
      models.map(m => `<option value="${escapeHtml(m)}" ${m.toLowerCase() === (variant.model || "").toLowerCase() ? "selected" : ""}>${escapeHtml(m)}</option>`).join("");
    modelSelect.addEventListener("change", (e) => window.updateVariantModel(index, e.target.value));

    // Color Select
    const colorSelect = document.createElement("select");
    colorSelect.style.cssText = "flex: 1; padding: 8px; background: rgba(18,25,31,0.98); color: white; border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; font-size: 12px; cursor: pointer; outline: none;";
    colorSelect.innerHTML = `<option value="">Select Color</option>` +
      colors.map(c => `<option value="${escapeHtml(c)}" ${c.toLowerCase() === (variant.color || "").toLowerCase() ? "selected" : ""}>${escapeHtml(c)}</option>`).join("");
    colorSelect.addEventListener("change", (e) => window.updateVariantColor(index, e.target.value));

    // Delete row button
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.title = "Delete variant group";
    deleteBtn.style.cssText = "background: transparent; border: 1px solid rgba(239,68,68,0.25); border-radius: 6px; color: #f87171; cursor: pointer; font-size: 14px; padding: 6px 10px; flex-shrink: 0; transition: background 0.2s;";
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.addEventListener("mouseover", () => deleteBtn.style.background = "rgba(239,68,68,0.12)");
    deleteBtn.addEventListener("mouseout",  () => deleteBtn.style.background = "transparent");
    deleteBtn.addEventListener("click", () => window.deleteVariantRow(index));

    headerRow.appendChild(modelSelect);
    headerRow.appendChild(colorSelect);
    headerRow.appendChild(deleteBtn);
    row.appendChild(headerRow);

    // ── Images strip ──
    const imagesStrip = document.createElement("div");
    imagesStrip.style.cssText = "display: flex; flex-wrap: wrap; gap: 8px; align-items: flex-start;";

    // Render each uploaded image thumbnail
    variant.urls.forEach((url, urlIdx) => {
      const thumb = document.createElement("div");
      thumb.style.cssText = "position: relative; width: 72px; height: 72px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.3); flex-shrink: 0;";

      const img = document.createElement("img");
      img.src = resolveImageUrl(url);
      img.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
      img.title = `Image ${urlIdx + 1}`;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.innerHTML = "✕";
      removeBtn.title = "Remove this image";
      removeBtn.style.cssText = "position: absolute; top: 3px; right: 3px; width: 18px; height: 18px; border-radius: 50%; background: rgba(239,68,68,0.85); border: none; color: white; font-size: 9px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 5; line-height: 1;";
      removeBtn.addEventListener("click", () => window.removeVariantImage(index, urlIdx));

      // Badge: image number
      if (variant.urls.length > 1) {
        const badge = document.createElement("span");
        badge.textContent = urlIdx + 1;
        badge.style.cssText = "position: absolute; bottom: 3px; left: 4px; font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.7); background: rgba(0,0,0,0.55); border-radius: 3px; padding: 1px 3px; pointer-events: none;";
        thumb.appendChild(badge);
      }

      thumb.appendChild(img);
      thumb.appendChild(removeBtn);
      imagesStrip.appendChild(thumb);
    });

    // ── Add Image button ──
    const addImgLabel = document.createElement("label");
    addImgLabel.style.cssText = "width: 72px; height: 72px; border-radius: 8px; border: 2px dashed rgba(99,102,241,0.4); background: rgba(99,102,241,0.05); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; color: #818cf8; font-size: 10px; font-weight: 600; gap: 3px; flex-shrink: 0; transition: background 0.2s, border-color 0.2s;";
    addImgLabel.title = "Add another image for this color/model";
    addImgLabel.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      <span>Add</span>
      <input type="file" accept="image/*" multiple style="display: none;">
    `;
    addImgLabel.addEventListener("mouseover", () => { addImgLabel.style.background = "rgba(99,102,241,0.12)"; addImgLabel.style.borderColor = "rgba(99,102,241,0.7)"; });
    addImgLabel.addEventListener("mouseout",  () => { addImgLabel.style.background = "rgba(99,102,241,0.05)"; addImgLabel.style.borderColor = "rgba(99,102,241,0.4)"; });

    const fileInput = addImgLabel.querySelector("input");
    fileInput.addEventListener("change", (e) => {
      window.uploadVariantImage(index, e.target.files);
      fileInput.value = "";
    });

    imagesStrip.appendChild(addImgLabel);
    row.appendChild(imagesStrip);

    // ── Helper text ──
    const hint = document.createElement("p");
    hint.style.cssText = "margin: 0; font-size: 10px; color: rgba(255,255,255,0.3); line-height: 1.4;";
    hint.textContent = `${variant.urls.length} image${variant.urls.length !== 1 ? 's' : ''} — you can add multiple views (front, side, back…) for this color/model combo.`;
    row.appendChild(hint);

    container.appendChild(row);
  });
}

function renderImagePreviews() {
  renderVariantsList();
  renderColorCatalog();
}

function removeThumbnailImage() {
  thumbnailImageUrl = "";
  renderThumbnailPreview();
}

window.removeThumbnailImage = removeThumbnailImage;
window.renderThumbnailPreview = renderThumbnailPreview;

// Refresh the Model + Color picker dropdowns above the upload zone
function refreshGalleryUploadSelectors() {
  const modelSelect = document.getElementById("gallery-upload-model");
  const colorSelect = document.getElementById("gallery-upload-color");
  const badge = document.getElementById("gallery-upload-badge-text");
  if (!modelSelect || !colorSelect) return;

  // Populate model options
  const models = getSelectedProductModels();
  const currentModel = modelSelect.value;
  modelSelect.innerHTML = `<option value="">All Models</option>` +
    models.map(m => `<option value="${escapeHtml(m)}" ${m === currentModel ? "selected" : ""}>${escapeHtml(m)}</option>`).join("");

  // Populate color options
  const colorsInput = document.getElementById("edit-colors");
  const colors = colorsInput ? colorsInput.value.split(",").map(c => c.trim()).filter(Boolean) : [];
  const currentColor = colorSelect.value;
  colorSelect.innerHTML = `<option value="">All Colors</option>` +
    colors.map(c => `<option value="${escapeHtml(c)}" ${c === currentColor ? "selected" : ""}>${escapeHtml(c)}</option>`).join("");

  // Update badge
  if (badge) {
    const mLabel = modelSelect.value || "All Models";
    const cLabel = colorSelect.value || "All Colors";
    badge.textContent = `Uploading for: ${mLabel} · ${cLabel}`;
  }
}

function removeUploadedImage(index) {
  uploadedImages.splice(index, 1);
  renderImagePreviews();
}

window.removeUploadedImage = removeUploadedImage;
window.renderImagePreviews = renderImagePreviews;
window.refreshGalleryUploadSelectors = refreshGalleryUploadSelectors;

window.updateVideoPreview = function(url) {
  const container = document.getElementById("video-preview-container");
  const text = document.getElementById("video-drag-text");
  if (!container || !text) return;
  
  const isVideoValid = url && url !== "null" && url !== "undefined" && url.trim() !== "";
  if (isVideoValid) {
    container.style.display = "block";
    
    // Check if YouTube (including watch, embed, share, and shorts)
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    let match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      const embedId = match[2];
      container.innerHTML = `<iframe id="video-preview" src="https://www.youtube.com/embed/${embedId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="max-width: 100%; height: 150px; aspect-ratio: 16/9; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);"></iframe>`;
      text.innerHTML = `Video selected: <span style="color: var(--cyan);">YouTube Embed</span>`;
    } else {
      container.innerHTML = `<video id="video-preview" controls src="${url}" style="max-height: 120px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);"></video>`;
      text.innerHTML = `Video selected: <span style="color: var(--cyan);">Direct Video File</span>`;
      const videoEl = document.getElementById("video-preview");
      try { videoEl.load(); } catch(e) {}
    }
  } else {
    container.style.display = "none";
    container.innerHTML = "";
    text.innerHTML = `Drag & drop product video here, or <span style="color: var(--cyan);">browse</span>`;
  }
}

function compressAndAddImage(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Compress to lightweight JPEG with 70% quality
      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
      callback(compressedBase64);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Drag & drop file base64 loaders
function initDragAndDropZones() {
  const thumbnailZone = document.getElementById("thumbnail-drag-zone");
  const thumbnailInput = document.getElementById("thumbnail-file-input");
  const thumbnailRemoveBtn = document.getElementById("thumbnail-remove-btn");

  const videoZone = document.getElementById("video-drag-zone");
  const videoInput = document.getElementById("video-file-input");
  const videoHidden = document.getElementById("edit-video");
  const videoText = document.getElementById("video-drag-text");

  const catImageZone = document.getElementById("cat-image-drag-zone");
  const catImageInput = document.getElementById("cat-image-input");

  if (!videoZone) return;

  if (thumbnailZone && thumbnailInput) {
    thumbnailZone.addEventListener("click", () => thumbnailInput.click());
    thumbnailInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleThumbnailFile(e.target.files[0]);
      }
      thumbnailInput.value = "";
    });
    thumbnailZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      thumbnailZone.style.borderColor = "var(--cyan)";
      thumbnailZone.style.background = "rgba(35, 244, 239, 0.05)";
    });
    thumbnailZone.addEventListener("dragleave", () => {
      thumbnailZone.style.borderColor = "rgba(35, 244, 239, 0.35)";
      thumbnailZone.style.background = "rgba(255,255,255,0.02)";
    });
    thumbnailZone.addEventListener("drop", (e) => {
      e.preventDefault();
      thumbnailZone.style.borderColor = "rgba(35, 244, 239, 0.35)";
      thumbnailZone.style.background = "rgba(255,255,255,0.02)";
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleThumbnailFile(e.dataTransfer.files[0]);
      }
    });
  }

  if (thumbnailRemoveBtn) {
    thumbnailRemoveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeThumbnailImage();
    });
  }

  function handleThumbnailFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      showToast("Please select a valid image file");
      return;
    }
    compressAndAddImage(file, (compressedBase64) => {
      const blob = dataURLtoBlob(compressedBase64);
      uploadFileToServer(blob, file.name, (url) => {
        thumbnailImageUrl = url;
        renderThumbnailPreview();
        showToast("Thumbnail uploaded successfully");
      });
    });
  }

  // Video Drag & Drop
  videoZone.addEventListener("click", () => videoInput.click());

  videoInput.addEventListener("change", (e) => {
    handleVideoFile(e.target.files[0]);
  });

  videoZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    videoZone.style.borderColor = "var(--cyan)";
    videoZone.style.background = "rgba(35, 244, 239, 0.05)";
  });

  videoZone.addEventListener("dragleave", () => {
    videoZone.style.borderColor = "rgba(255,255,255,0.15)";
    videoZone.style.background = "rgba(255,255,255,0.02)";
  });

  videoZone.addEventListener("drop", (e) => {
    e.preventDefault();
    videoZone.style.borderColor = "rgba(255,255,255,0.15)";
    videoZone.style.background = "rgba(255,255,255,0.02)";
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleVideoFile(e.dataTransfer.files[0]);
    }
  });

  // Live preview when typing or pasting video URL/link
  videoHidden.addEventListener("input", () => {
    window.updateVideoPreview(videoHidden.value);
  });
  videoHidden.addEventListener("change", () => {
    window.updateVideoPreview(videoHidden.value);
  });
  videoHidden.addEventListener("paste", () => {
    setTimeout(() => {
      window.updateVideoPreview(videoHidden.value);
    }, 20);
  });

  function handleVideoFile(file) {
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      showToast("Please upload a video file");
      return;
    }
    showToast("Uploading video... please wait");
    uploadFileToServer(file, file.name, (url) => {
      videoHidden.value = url;
      window.updateVideoPreview(url);
      videoText.innerHTML = `Video selected: <span style="color: var(--cyan);">${file.name}</span>`;
      showToast("Video uploaded successfully");
    });
  }

  // Category Image Drag & Drop
  if (catImageZone && catImageInput) {
    catImageZone.addEventListener("click", () => catImageInput.click());
    
    catImageInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleCategoryImageFile(e.target.files[0]);
      }
      catImageInput.value = "";
    });
    
    catImageZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      catImageZone.style.borderColor = "var(--cyan)";
      catImageZone.style.background = "rgba(35, 244, 239, 0.05)";
    });
    
    catImageZone.addEventListener("dragleave", () => {
      catImageZone.style.borderColor = "rgba(35, 244, 239, 0.35)";
      catImageZone.style.background = "rgba(255,255,255,0.02)";
    });
    
    catImageZone.addEventListener("drop", (e) => {
      e.preventDefault();
      catImageZone.style.borderColor = "rgba(35, 244, 239, 0.35)";
      catImageZone.style.background = "rgba(255,255,255,0.02)";
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleCategoryImageFile(e.dataTransfer.files[0]);
      }
    });
  }

  function handleCategoryImageFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      showToast("Please select a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      pendingCategoryImage = reader.result;
      const previewWrap = document.getElementById("cat-image-preview-wrap");
      const previewImg = document.getElementById("cat-image-preview");
      if (previewImg) previewImg.src = reader.result;
      if (previewWrap) previewWrap.style.display = "block";
      showToast("Category image loaded");
    };
    reader.readAsDataURL(file);
  }
}

// Global click delegation for three-dots dropdown popover
document.addEventListener("click", (event) => {
  // Hide all existing delete user/order dropdowns
  document.querySelectorAll(".user-actions-dropdown").forEach(dropdown => {
    dropdown.remove();
  });
  document.querySelectorAll(".order-actions-dropdown").forEach(dropdown => {
    dropdown.remove();
  });

  // Handle Order Details View Trigger
  const viewOrderBtn = event.target.closest(".view-order-btn");
  if (viewOrderBtn) {
    const dbId = viewOrderBtn.dataset.dbId;
    openOrderModal(dbId);
    return;
  }

  // Handle Order Three Dots Click Trigger
  const orderBtn = event.target.closest(".order-three-dots-btn");
  if (orderBtn) {
    event.stopPropagation();
    const dbId = orderBtn.dataset.dbId;
    const rect = orderBtn.getBoundingClientRect();

    const currentAdminJson = localStorage.getItem("admin-current-user");
    const currentAdmin = currentAdminJson ? JSON.parse(currentAdminJson) : null;
    const isSuperAdmin = currentAdmin && currentAdmin.is_super === true;

    // Check status to hide Cancel Order option if Accepted, Shipped, Delivered, or Declined
    const adminOrders = JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
    const targetOrder = adminOrders.find(o => String(o.dbId) === String(dbId));
    const currentStatus = targetOrder ? targetOrder.status : "";
    const currentStatusLower = currentStatus.toLowerCase();
    const isLocked = ["accepted", "shipped", "delivered", "declined", "cancelled"].includes(currentStatusLower);
    const isAcceptedOrBeyond = ["accepted", "shipped", "delivered", "cancelled", "declined"].includes(currentStatusLower);
    const isShippedOrBeyond = ["shipped", "delivered", "cancelled", "declined"].includes(currentStatusLower);
    const isDeliveredOrBeyond = ["delivered", "cancelled", "declined"].includes(currentStatusLower);

    // Create action dropdown popover
    const dropdown = document.createElement("div");
    dropdown.className = "order-actions-dropdown";
    dropdown.style.position = "fixed";
    dropdown.style.top = `${rect.bottom + window.scrollY + 5}px`;
    dropdown.style.left = `${rect.left + window.scrollX - 110}px`;
    dropdown.style.background = "#1e293b";
    dropdown.style.border = "1px solid rgba(255,255,255,0.1)";
    dropdown.style.borderRadius = "8px";
    dropdown.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.3)";
    dropdown.style.zIndex = "9999";
    dropdown.style.padding = "4px 0";
    dropdown.style.minWidth = "150px";

    dropdown.innerHTML = `
      <button onclick="openOrderModal('${dbId}')" style="display:flex; align-items:center; gap:8px; width:100%; padding:8px 12px; background:transparent; border:none; color:white; font-size:13px; font-weight:600; text-align:left; cursor:pointer;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        Modify Details
      </button>
      ${!isLocked && isSuperAdmin ? `
      <button onclick="adminUpdateOrderStatus('${dbId}', 'Cancelled')" style="display:flex; align-items:center; gap:8px; width:100%; padding:8px 12px; background:transparent; border:none; color:#ff5b67; font-size:13px; font-weight:600; text-align:left; cursor:pointer;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
        Cancel Order
      </button>
      ` : ''}
      <div style="border-top:1px solid rgba(255,255,255,0.08); margin:4px 0;"></div>
      ${currentStatusLower === 'pending' && isSuperAdmin ? `
      <button onclick="adminUpdateOrderStatus('${dbId}', 'Accepted')" style="display:flex; align-items:center; gap:8px; width:100%; padding:6px 12px; background:transparent; border:none; color:#20dfbd; font-size:12px; font-weight:500; text-align:left; cursor:pointer;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        Mark as Accepted
      </button>
      <button onclick="adminUpdateOrderStatus('${dbId}', 'Declined')" style="display:flex; align-items:center; gap:8px; width:100%; padding:6px 12px; background:transparent; border:none; color:#ff5b67; font-size:12px; font-weight:500; text-align:left; cursor:pointer;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
        Decline Order
      </button>
      ` : (currentStatusLower === 'pending' ? `
      <button onclick="adminUpdateOrderStatus('${dbId}', 'Accepted')" style="display:flex; align-items:center; gap:8px; width:100%; padding:6px 12px; background:transparent; border:none; color:#20dfbd; font-size:12px; font-weight:500; text-align:left; cursor:pointer;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /> <polyline points="22 4 12 14.01 9 11.01" /></svg>
        Mark as Accepted
      </button>
      ` : '')}
      ${currentStatusLower === 'accepted' ? `
      <button onclick="adminUpdateOrderStatus('${dbId}', 'Shipped')" style="display:flex; align-items:center; gap:8px; width:100%; padding:6px 12px; background:transparent; border:none; color:#00b4d8; font-size:12px; font-weight:500; text-align:left; cursor:pointer;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
        Mark as Shipped
      </button>
      ` : ''}
      ${currentStatusLower === 'shipped' ? `
      <button onclick="adminUpdateOrderStatus('${dbId}', 'Delivered')" style="display:flex; align-items:center; gap:8px; width:100%; padding:6px 12px; background:transparent; border:none; color:#10f3ed; font-size:12px; font-weight:500; text-align:left; cursor:pointer;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        Mark as Delivered
      </button>
      ` : ''}
    `;

    document.body.appendChild(dropdown);
    return;
  }

  const btn = event.target.closest(".three-dots-btn");
  if (!btn) return;

  event.stopPropagation();
  const userId = btn.dataset.id;
  const rect = btn.getBoundingClientRect();

  // Create action dropdown popover
  const dropdown = document.createElement("div");
  dropdown.className = "user-actions-dropdown";
  dropdown.style.position = "fixed";
  dropdown.style.top = `${rect.bottom + window.scrollY + 5}px`;
  dropdown.style.left = `${rect.left + window.scrollX - 80}px`;
  dropdown.style.background = "#1e293b";
  dropdown.style.border = "1px solid rgba(255,255,255,0.1)";
  dropdown.style.borderRadius = "8px";
  dropdown.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.3)";
  dropdown.style.zIndex = "9999";
  dropdown.style.padding = "4px 0";
  dropdown.style.minWidth = "120px";

  dropdown.innerHTML = `
    <button onclick="handleDeleteUser('${userId}')" style="display:flex; align-items:center; gap:8px; width:100%; padding:8px 12px; background:transparent; border:none; color:#ff5b67; font-size:13px; font-weight:600; text-align:left; cursor:pointer;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      Delete User
    </button>
  `;

  document.body.appendChild(dropdown);
});

// Run initial sync on load
syncReviewsToUserDb();

// Global Exports
window.handleLogin = handleLogin;
window.handleDeleteUser = handleDeleteUser;
window.syncReviewsToUserDb = syncReviewsToUserDb;
window.initDragAndDropZones = initDragAndDropZones;
window.handleAddCategory = handleAddCategory;
window.toggleCategoryStatus = toggleCategoryStatus;
window.deleteCategory = deleteCategory;
window.editCategory = editCategory;
window.handleSaveCategory = handleSaveCategory;
window.renderReviewsPanel = renderReviewsPanel;
window.openReviewModal = openReviewModal;
window.handleSaveReview = handleSaveReview;
window.toggleReviewVisibility = toggleReviewVisibility;
window.deleteReview = deleteReview;
window.openAddProductModal = openAddProductModal;
window.handleSessionExpired = handleSessionExpired;
window.renderAdminOTPVerification = renderAdminOTPVerification;
window.restoreAdminLoginForm = restoreAdminLoginForm;
window.openCouponModal = openCouponModal;
window.handleSaveCoupon = handleSaveCoupon;
window.handleDeleteCoupon = handleDeleteCoupon;
window.loadCouponsFromApi = loadCouponsFromApi;
window.openOrderModal = openOrderModal;
window.handleSaveOrder = handleSaveOrder;
window.adminUpdateOrderStatus = adminUpdateOrderStatus;
window.loadWalletsFromApi = loadWalletsFromApi;

// Popovers, Pagination & Excel Export exports
window.updateAdminHeader = updateAdminHeader;
window.openUsersFilterPopover = openUsersFilterPopover;
window.openUsersMoreFiltersPopover = openUsersMoreFiltersPopover;
window.openOrdersFilterPopover = openOrdersFilterPopover;
window.exportUsersToExcel = exportUsersToExcel;
window.exportOrdersToExcel = exportOrdersToExcel;
window.exportCategoriesToExcel = exportCategoriesToExcel;
window.exportProductsToExcel = exportProductsToExcel;
window.exportPayoutsToExcel = exportPayoutsToExcel;
window.changeUsersPage = changeUsersPage;
window.changeOrdersPage = changeOrdersPage;

// Load current admin details
async function loadCurrentAdminFromApi() {
  const token = localStorage.getItem("admin-user-token");
  if (!token) return;
  try {
    const res = await fetch('/api/user', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
    if (res.ok) {
      const adminData = await res.json();
      localStorage.setItem("admin-current-user", JSON.stringify(adminData));
      const templateNav = document.getElementById("email-template-nav");
      if (templateNav) templateNav.style.display = adminData.is_super ? "flex" : "none";
      
      // Update topbar profile details dynamically
      const profilePhoto = document.querySelector(".admin-profile .profile-photo");
      if (profilePhoto && adminData.name) {
        profilePhoto.textContent = adminData.name.charAt(0).toUpperCase();
      }
      const profileName = document.querySelector(".admin-profile strong");
      if (profileName) {
        profileName.textContent = adminData.name;
      }
    }
  } catch (e) {
    console.error("Error loading current admin info:", e);
  }
}

// Render administrative Settings Panel
async function renderSettingsPanel() {
  const token = localStorage.getItem("admin-user-token");
  if (!token) return;

  const adminsTableBody = document.getElementById("settings-admins-table");
  if (!adminsTableBody) return;

  try {
    await loadCurrentAdminFromApi();
    const currentAdminJson = localStorage.getItem("admin-current-user");
    const currentAdmin = currentAdminJson ? JSON.parse(currentAdminJson) : null;

    const res = await fetch('/api/users', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });

    if (!res.ok) {
      adminsTableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: #ff5b67; padding: 20px;">
            Failed to load administrators. Please check access.
          </td>
        </tr>
      `;
      return;
    }

    const allUsers = await res.json();
    
    // Cache raw users in window for dropdown searching
    window.settingsRawUsers = allUsers;

    const admins = allUsers.filter(u => u.is_admin);

    adminsTableBody.innerHTML = admins.map(admin => {
      const avatar = admin.name ? admin.name.charAt(0).toUpperCase() : "?";
      const isSelf = currentAdmin && currentAdmin.id === admin.id;
      
      let actionBtn = "";
      if (isSelf) {
        actionBtn = `
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
            <span style="font-size: 11px; color: var(--muted); font-style: italic; background: rgba(255,255,255,0.03); padding: 4px 8px; border-radius: 4px;">Logged In (Self)</span>
            ${currentAdmin && currentAdmin.is_super ? `
              <button type="button" onclick="window.promptAdminPasswordReset(${admin.id}, '${admin.name.replace(/'/g, "\\'")}')" 
                      style="background: rgba(16, 243, 237, 0.1); border: 1px solid rgba(16, 243, 237, 0.25); color: var(--cyan); padding: 5px 10px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 11px;">
                Reset Password
              </button>
            ` : ''}
          </div>
        `;
      } else if (currentAdmin && currentAdmin.is_super) {
        actionBtn = `
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
            <button type="button" onclick="window.promptAdminPasswordReset(${admin.id}, '${admin.name.replace(/'/g, "\\'")}')" 
                    style="background: rgba(16, 243, 237, 0.1); border: 1px solid rgba(16, 243, 237, 0.25); color: var(--cyan); padding: 5px 10px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 11px;">
              Reset Password
            </button>
            ${!admin.is_super ? `
              <button type="button" class="danger" onclick="revokeAdminRole(${admin.id}, '${admin.name.replace(/'/g, "\\'")}')" 
                      style="background: rgba(255, 91, 103, 0.1); border: 1px solid rgba(255, 91, 103, 0.2); color: #ff5b67; padding: 5px 10px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 11px;">
                Revoke Access
              </button>
            ` : ''}
          </div>
        `;
      } else {
        actionBtn = `<span style="font-size: 11px; color: var(--muted); font-style: italic;">No Actions</span>`;
      }

      return `
        <tr>
          <td style="padding: 10px 8px;">
            <div class="avatar-cell" style="display: flex; align-items: center; gap: 10px;">
              <span class="avatar-circle" style="background: rgba(16, 243, 237, 0.1); color: var(--cyan); width: 32px; height: 32px; font-size: 13px; font-weight: bold; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;">${avatar}</span>
              <div>
                <strong style="color: white; font-size: 13px; display: block;">${admin.name}</strong>
                <div style="font-size: 11px; color: #8892b0; margin-top: 3px; display: flex; flex-wrap: wrap; align-items: center; gap: 4px; line-height: 1.2;">
                  <span style="color: var(--muted); font-weight: 500;">ID: #MB${admin.id.toString().padStart(6, '0')}</span> 
                  <span style="color: rgba(255,255,255,0.15);">|</span> 
                  <span>${admin.email}</span> 
                  ${admin.phone ? `<span style="color: rgba(255,255,255,0.15);">|</span> <span>${admin.phone}</span>` : ''}
                </div>
              </div>
            </div>
          </td>
          <td style="padding: 10px 8px; vertical-align: middle;">
            <span class="status active" style="font-size: 10px; padding: 3px 8px; background: rgba(16, 243, 237, 0.15); color: var(--cyan); font-weight: 600; border-radius: 4px; white-space: nowrap;">
              ${admin.is_super ? "Super Admin" : "Partner Admin"}
            </span>
          </td>
          <td style="padding: 10px 8px; text-align: right; vertical-align: middle;">${actionBtn}</td>
        </tr>
      `;
    }).join("");

    // Enforce invite admin form visibility
    const inviteFormContainer = document.getElementById("invite-admin-form")?.parentElement;
    if (inviteFormContainer) {
      if (currentAdmin && currentAdmin.is_super) {
        document.getElementById("invite-admin-form").style.display = "flex";
        const msgEl = inviteFormContainer.querySelector(".super-admin-only-msg");
        if (msgEl) msgEl.remove();
      } else {
        document.getElementById("invite-admin-form").style.display = "none";
        let msgEl = inviteFormContainer.querySelector(".super-admin-only-msg");
        if (!msgEl) {
          msgEl = document.createElement("div");
          msgEl.className = "super-admin-only-msg";
          msgEl.style.padding = "16px";
          msgEl.style.background = "rgba(255, 193, 7, 0.1)";
          msgEl.style.border = "1px solid rgba(255, 193, 7, 0.2)";
          msgEl.style.color = "#ffc107";
          msgEl.style.borderRadius = "8px";
          msgEl.style.fontSize = "13px";
          msgEl.style.fontWeight = "600";
          msgEl.style.textAlign = "center";
          msgEl.style.marginTop = "10px";
          msgEl.innerHTML = `⚠️ Only the Super Admin is authorized to invite new administrators.`;
          inviteFormContainer.appendChild(msgEl);
        }
      }
    }
  } catch (e) {
    console.error("Error rendering settings panel:", e);
    adminsTableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: #ff5b67; padding: 20px;">
          An error occurred while loading administrators.
        </td>
      </tr>
    `;
  }
}

// Dropdown filter for assigning admin
function filterSettingsUsersDropdown() {
  const searchInput = document.getElementById("settings-user-search");
  const dropdown = document.getElementById("settings-users-dropdown");
  if (!searchInput || !dropdown) return;

  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    dropdown.style.display = "none";
    return;
  }

  const allUsers = window.settingsRawUsers || [];
  const candidates = allUsers.filter(u => 
    !u.is_admin && 
    (u.name.toLowerCase().includes(query) || 
     u.email.toLowerCase().includes(query) || 
     (u.phone && u.phone.toLowerCase().includes(query)))
  );

  if (candidates.length === 0) {
    dropdown.innerHTML = `
      <div style="padding: 12px; text-align: center; color: var(--muted); font-size: 13px;">
        No active standard users found
      </div>
    `;
    dropdown.style.display = "block";
    return;
  }

  dropdown.innerHTML = candidates.map(u => {
    return `
      <div class="dropdown-item" onclick="selectSettingsUser(${u.id}, '${u.name.replace(/'/g, "\\'")}', '${u.email}')" 
           style="padding: 10px 12px; cursor: pointer; border-bottom: 1px solid var(--line); transition: all 0.2s; display: flex; align-items: center; gap: 10px;">
        <span class="avatar-circle" style="width: 28px; height: 28px; font-size: 11px; background: rgba(255,255,255,0.05); color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
          ${u.name.charAt(0).toUpperCase()}
        </span>
        <div style="flex: 1; min-width: 0; text-align: left;">
          <strong style="color: white; font-size: 13px; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${u.name}</strong>
          <small style="color: var(--muted); font-size: 11px; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${u.email} | ${u.phone || "No phone"}</small>
        </div>
      </div>
    `;
  }).join("");

  dropdown.style.display = "block";
}

// Select a user from suggestion list
function selectSettingsUser(id, name, email) {
  const searchInput = document.getElementById("settings-user-search");
  const dropdown = document.getElementById("settings-users-dropdown");
  const selectedCard = document.getElementById("selected-user-card");
  const promoteBtn = document.getElementById("promote-admin-btn");
  
  if (searchInput) searchInput.value = "";
  if (dropdown) dropdown.style.display = "none";

  document.getElementById("selected-user-id").value = id;
  document.getElementById("selected-user-name").textContent = name;
  document.getElementById("selected-user-contact").textContent = email;
  document.getElementById("selected-user-avatar").textContent = name.charAt(0).toUpperCase();

  if (selectedCard) selectedCard.style.display = "flex";
  if (promoteBtn) {
    promoteBtn.disabled = false;
  }
}

// Clear selected user from preview card
function clearSelectedUser() {
  const selectedCard = document.getElementById("selected-user-card");
  const promoteBtn = document.getElementById("promote-admin-btn");

  document.getElementById("selected-user-id").value = "";
  if (selectedCard) selectedCard.style.display = "none";
  if (promoteBtn) {
    promoteBtn.disabled = true;
  }
}

// Promote selected user to Admin
async function assignPartnerAdmin() {
  const userId = document.getElementById("selected-user-id").value;
  const name = document.getElementById("selected-user-name").textContent;
  if (!userId) return;

  if (!confirm(`Are you sure you want to promote ${name} to a Partnering Administrator? They will instantly receive full read/write rights.`)) {
    return;
  }

  const token = localStorage.getItem("admin-user-token");
  if (!token) return showToast("Unauthorized");

  const promoteBtn = document.getElementById("promote-admin-btn");
  if (promoteBtn) promoteBtn.disabled = true;

  try {
    const res = await fetch(`/api/admin/users/${userId}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ is_admin: true })
    });

    const data = await res.json();
    if (res.ok) {
      showToast(data.message || "User promoted successfully!");
      clearSelectedUser();
      await renderSettingsPanel();
      loadUsersFromApi();
    } else {
      showToast(data.message || "Failed to promote user.");
      if (promoteBtn) promoteBtn.disabled = false;
    }
  } catch (e) {
    console.error(e);
    showToast("Network error promoting user: " + e.message);
    if (promoteBtn) promoteBtn.disabled = false;
  }
}

// Revoke admin role from partnering admin
async function revokeAdminRole(userId, name) {
  if (!confirm(`Are you sure you want to revoke administrative rights from ${name}? They will be demoted to a regular user.`)) {
    return;
  }

  const token = localStorage.getItem("admin-user-token");
  if (!token) return showToast("Unauthorized");

  try {
    const res = await fetch(`/api/admin/users/${userId}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ is_admin: false })
    });

    const data = await res.json();
    if (res.ok) {
      showToast(data.message || "Admin rights revoked successfully.");
      await renderSettingsPanel();
      loadUsersFromApi();
    } else {
      showToast(data.message || "Failed to revoke admin role.");
    }
  } catch (e) {
    console.error(e);
    showToast("Network error revoking admin role: " + e.message);
  }
}

async function submitAdminInvite() {
  const name = document.getElementById("new-admin-name").value.trim();
  const email = document.getElementById("new-admin-email").value.trim();
  const password = document.getElementById("new-admin-password").value;

  if (!name || !email || !password) {
    showToast("Please fill in all fields.");
    return;
  }

  const token = localStorage.getItem("admin-user-token");
  try {
    const res = await fetch("/api/admin/create-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      showToast("Partnering admin invited successfully!");
      document.getElementById("invite-admin-form").reset();
      await renderSettingsPanel();
      loadUsersFromApi();
    } else {
      showToast(data.message || "Failed to invite admin.");
    }
  } catch (e) {
    console.error(e);
    showToast("Error inviting partner admin: " + e.message);
  }
}

async function promptAdminPasswordReset(adminId, name) {
  const newPass = prompt(`Enter new password for admin "${name}":`);
  if (newPass === null) return; // cancelled
  const cleanPass = newPass.trim();
  if (cleanPass.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  const token = localStorage.getItem("admin-user-token");
  if (!token) return showToast("Unauthorized");

  try {
    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ admin_id: adminId, password: cleanPass })
    });

    const data = await res.json();
    if (res.ok) {
      showToast(`Password for ${name} reset successfully!`);
    } else {
      alert(data.message || "Failed to reset password");
    }
  } catch (e) {
    console.error(e);
    showToast("Error resetting password: " + e.message);
  }
}

async function submitAdminProfileUpdate() {
  const name = document.getElementById("admin-profile-name").value.trim();
  const email = document.getElementById("admin-profile-email").value.trim();
  const phone = document.getElementById("admin-profile-phone").value.trim();
  const password = document.getElementById("admin-profile-password").value;

  if (!name || !phone) {
    showToast("Name and Phone Number are required.");
    return;
  }

  const token = localStorage.getItem("admin-user-token");
  const payload = { name, phone };
  if (email) payload.email = email;
  if (password) payload.password = password;

  try {
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
      showToast("Profile updated successfully!");
      document.getElementById("admin-profile-modal").style.display = "none";
      await loadCurrentAdminFromApi();
      await renderSettingsPanel();
      loadUsersFromApi();
    } else {
      showToast(data.message || "Failed to update profile.");
    }
  } catch (e) {
    console.error(e);
    showToast("Error updating profile: " + e.message);
  }
}

// Register settings functions globally
window.loadCurrentAdminFromApi = loadCurrentAdminFromApi;
window.renderSettingsPanel = renderSettingsPanel;
window.filterSettingsUsersDropdown = filterSettingsUsersDropdown;
window.selectSettingsUser = selectSettingsUser;
window.clearSelectedUser = clearSelectedUser;
window.assignPartnerAdmin = assignPartnerAdmin;
window.revokeAdminRole = revokeAdminRole;
window.submitAdminInvite = submitAdminInvite;
window.submitAdminProfileUpdate = submitAdminProfileUpdate;
window.promptAdminPasswordReset = promptAdminPasswordReset;

// Permanent Product Deletion API call
async function handleDeleteProduct(id) {
  if (!confirm("Are you sure you want to permanently delete this product? This action cannot be undone.")) return;

  const token = localStorage.getItem("admin-user-token");
  if (!token) return showToast("Unauthorized. Please log in again.");

  try {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (res.ok) {
      showToast("Product deleted successfully");
      loadProductsFromApi();
    } else {
      showToast(data.message || "Failed to delete product");
    }
  } catch (e) {
    console.error(e);
    showToast("Network error deleting product: " + e.message);
  }
}

window.handleDeleteProduct = handleDeleteProduct;

function inferModelFromFilename(filename) {
  if (!filename) return "";
  filename = filename.toLowerCase();
  if (filename.includes("17pm") || filename.includes("17 pro max") || filename.includes("17promax")) return "iPhone 17 Pro Max";
  if (filename.includes("17p") || filename.includes("17 pro") || filename.includes("17pro")) return "iPhone 17 Pro";
  if (filename.includes("17")) return "iPhone 17";
  if (filename.includes("16pm") || filename.includes("16 pro max") || filename.includes("16promax")) return "iPhone 16 Pro Max";
  if (filename.includes("16p") || filename.includes("16 pro") || filename.includes("16pro")) return "iPhone 16 Pro";
  if (filename.includes("16")) return "iPhone 16";
  if (filename.includes("15pm") || filename.includes("15 pro max") || filename.includes("15promax")) return "iPhone 15 Pro Max";
  if (filename.includes("15p") || filename.includes("15 pro") || filename.includes("15pro")) return "iPhone 15 Pro";
  if (filename.includes("15")) return "iPhone 15";
  return "";
}

function inferColorFromFilename(filename, colors) {
  if (!filename || !colors) return "";
  filename = filename.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const color of colors) {
    const cleanColor = color.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cleanColor && filename.includes(cleanColor)) {
      return color;
    }
  }
  return "";
}

// --------- iPhone Models Management ---------

function getIphoneModels() {
  const defaultModels = [
    "iPhone 17 Pro Max",
    "iPhone 17 Pro",
    "iPhone 17",
    "iPhone 16 Series",
    "iPhone 15 Series"
  ];
  try {
    const saved = localStorage.getItem("iselectrics-iphone-models");
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.map(m => typeof m === 'object' ? m.name : m).map(model => String(model).trim()).filter(Boolean);
      }
    }
    return defaultModels;
  } catch (e) {
    return defaultModels;
  }
}

// Render iPhone models checkboxes in product edit form
function renderProductModelsSelector(selectedModels = []) {
  const container = document.getElementById("models-select-container");
  if (!container) return;
  
  const availableModels = getIphoneModels();
  
  if (!availableModels || availableModels.length === 0) {
    container.innerHTML = '<span style="color: var(--muted); font-size: 12px; padding: 10px;">No iPhone models available.</span>';
    return;
  }
  
  container.innerHTML = availableModels.map((model, idx) => {
    const isChecked = selectedModels && (selectedModels.includes(model) || selectedModels.includes(model.toLowerCase()));
    return `
      <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size: 13px; color: white; padding: 8px; border-radius: 6px; transition: all 0.2s; hover:background: rgba(255,255,255,0.05);">
        <input type="checkbox" 
               class="product-model-checkbox" 
               value="${model}" 
               ${isChecked ? 'checked' : ''} 
               style="width:15px; height:15px; accent-color: var(--cyan); cursor:pointer;">
        <span>${model}</span>
      </label>
    `;
  }).join("");
}

function toggleCompatibleModelsField() {
  const category = (document.getElementById("edit-category")?.value || "Mobile").toLowerCase();
  const field = document.getElementById("compatible-models-field");
  if (!field) return;
  const isMobile = category === "mobile" || category.includes("covers") || category.includes("case") || category.includes("phone");
  field.style.display = isMobile ? "block" : "none";
  if (!isMobile) {
    document.querySelectorAll(".product-model-checkbox").forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
}

// --------- iPhone Models Management Admin Functions ---------

window.tempIphoneModels = [];
window.activeUploadingModelIndex = undefined;

async function loadIphoneModelsFromApi(force = false) {
  const token = localStorage.getItem("admin-user-token");
  if (!token) return;
  
  try {
    const res = await fetch('/api/iphone-models', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("iselectrics-iphone-models", JSON.stringify(data));
      
      const countEl = document.getElementById("iphone-models-panel-count");
      if (countEl) countEl.textContent = `(${data.length} models)`;
      
      const activeLink = document.querySelector(".side-link.is-active");
      const isViewingPanel = activeLink && activeLink.dataset.panel === "iphone-models";
      
      if (force || !isViewingPanel || !window.tempIphoneModels || window.tempIphoneModels.length === 0) {
        window.tempIphoneModels = data || [];
        renderTempIphoneModels();
      }
    }
  } catch (e) {
    console.error("Error loading iPhone models:", e);
  }
}

function renderTempIphoneModels() {
  const listEl = document.getElementById("iphone-models-list");
  if (!listEl) return;
  
  if (!window.tempIphoneModels || window.tempIphoneModels.length === 0) {
    listEl.innerHTML = `<span style="color: var(--muted); font-size: 12px; text-align: center; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 6px; width: 100%; display: block; box-sizing: border-box;">No active models. Add some using the panel on the left.</span>`;
    return;
  }
  
  const total = window.tempIphoneModels.length;
  listEl.innerHTML = window.tempIphoneModels.map((model, index) => {
    const imgUrl = model.image ? model.image : "assets/phone-case.png";
    return `
      <div class="model-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;">
          <div onclick="window.triggerModelImageUpload(${index})" style="position: relative; width: 44px; height: 44px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); cursor: pointer; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;" title="Click to change image">
            <img src="${escapeHtml(imgUrl)}" style="width: 100%; height: 100%; object-fit: contain;">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.6); color: white; font-size: 8px; text-align: center; padding: 1px 0;">EDIT</div>
          </div>
          <span style="font-weight: 600; color: white; font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(model.name)}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
          <button type="button" onclick="window.moveModel(${index}, -1)" class="tab-btn" style="padding: 4px 8px; font-size: 11px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: white; cursor: pointer;" ${index === 0 ? 'disabled style="opacity: 0.3; cursor: default;"' : ''}>▲</button>
          <button type="button" onclick="window.moveModel(${index}, 1)" class="tab-btn" style="padding: 4px 8px; font-size: 11px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: white; cursor: pointer;" ${index === total - 1 ? 'disabled style="opacity: 0.3; cursor: default;"' : ''}>▼</button>
          <button type="button" onclick="window.removeModelFromList(${index})" class="tab-btn" style="padding: 4px 8px; font-size: 11px; background: rgba(255, 91, 103, 0.1); border: 1px solid rgba(255, 91, 103, 0.2); border-radius: 4px; color: #ff5b67; cursor: pointer;">✕</button>
        </div>
      </div>
    `;
  }).join("");
}

window.addPredefinedModel = function(name) {
  if (!window.tempIphoneModels) window.tempIphoneModels = [];
  const exists = window.tempIphoneModels.some(m => m.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    return showToast("Model already added");
  }
  window.tempIphoneModels.push({
    name: name,
    image: 'assets/phone-case.png'
  });
  renderTempIphoneModels();
};

window.tempCustomModelImageUrl = "";
window.handleCustomModelImageSelect = function(e) {
  const file = e.target.files[0];
  const filenameSpan = document.getElementById("custom-model-image-filename");
  if (file) {
    if (filenameSpan) filenameSpan.textContent = file.name;
    const reader = new FileReader();
    reader.onload = function(evt) {
      const blob = dataURLtoBlob(evt.target.result);
      uploadFileToServer(blob, file.name, (url) => {
        window.tempCustomModelImageUrl = url;
        showToast("Model image uploaded successfully");
      });
    };
    reader.readAsDataURL(file);
  } else {
    if (filenameSpan) filenameSpan.textContent = "No file chosen";
    window.tempCustomModelImageUrl = "";
  }
};

window.addCustomModel = function() {
  const input = document.getElementById("custom-model-input");
  if (!input) return;
  const name = input.value.trim();
  if (!name) return showToast("Please type a model name");
  
  if (!window.tempIphoneModels) window.tempIphoneModels = [];
  const exists = window.tempIphoneModels.some(m => m.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    return showToast("Model already added");
  }
  window.tempIphoneModels.push({
    name: name,
    image: window.tempCustomModelImageUrl || 'assets/phone-case.png'
  });
  input.value = "";
  window.tempCustomModelImageUrl = "";
  const filenameSpan = document.getElementById("custom-model-image-filename");
  if (filenameSpan) filenameSpan.textContent = "No file chosen";
  const fileInput = document.getElementById("custom-model-image-file-input");
  if (fileInput) fileInput.value = "";
  renderTempIphoneModels();
};

window.removeModelFromList = function(idx) {
  if (!window.tempIphoneModels) return;
  window.tempIphoneModels.splice(idx, 1);
  renderTempIphoneModels();
};

window.clearAllModels = function() {
  if (!confirm("Are you sure you want to clear all models?")) return;
  window.tempIphoneModels = [];
  renderTempIphoneModels();
};

window.moveModel = function(idx, direction) {
  if (!window.tempIphoneModels) return;
  const targetIdx = idx + direction;
  if (targetIdx < 0 || targetIdx >= window.tempIphoneModels.length) return;
  
  const temp = window.tempIphoneModels[idx];
  window.tempIphoneModels[idx] = window.tempIphoneModels[targetIdx];
  window.tempIphoneModels[targetIdx] = temp;
  
  renderTempIphoneModels();
};

window.triggerModelImageUpload = function(index) {
  window.activeUploadingModelIndex = index;
  const fileInput = document.getElementById("model-image-file-input");
  if (fileInput) {
    fileInput.value = ""; // clear so change fires even for same file
    fileInput.click();
  }
};

window.saveIphoneModels = async function() {
  const token = localStorage.getItem("admin-user-token");
  if (!token) return showToast("Unauthorized");
  
  const saveBtn = document.querySelector("#panel-iphone-models button[onclick='window.saveIphoneModels()']");
  const originalHtml = saveBtn ? saveBtn.innerHTML : "";
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = "Saving models...";
  }
  
  try {
    const res = await fetch('/api/iphone-models/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        models: window.tempIphoneModels
      })
    });
    
    const data = await res.json();
    if (res.ok) {
      showToast("iPhone models saved successfully!");
      localStorage.setItem("iselectrics-iphone-models", JSON.stringify(data));
      window.tempIphoneModels = data || [];
      renderTempIphoneModels();
      loadProductsFromApi();
    } else {
      showToast(data.message || "Failed to save iPhone models");
    }
  } catch (e) {
    console.error("Error saving models:", e);
    showToast("Network error saving iPhone models");
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = originalHtml;
    }
  }
};

window.loadIphoneModelsFromApi = loadIphoneModelsFromApi;
window.renderTempIphoneModels = renderTempIphoneModels;

// --------- Shop by Style Management Admin Functions ---------

window.tempShopByStyles = [];
window.activeUploadingStyleIndex = undefined;

async function loadShopByStylesFromApi(force = false) {
  const token = localStorage.getItem("admin-user-token");
  if (!token) return;
  
  try {
    const res = await fetch('/api/shop-by-styles', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("iselectrics-shop-by-styles", JSON.stringify(data));
      
      const countEl = document.getElementById("shop-by-style-panel-count");
      if (countEl) countEl.textContent = `(${data.length} styles)`;
      
      const activeLink = document.querySelector(".side-link.is-active");
      const isViewingPanel = activeLink && activeLink.dataset.panel === "shop-by-style";
      
      if (force || !isViewingPanel || !window.tempShopByStyles || window.tempShopByStyles.length === 0) {
        window.tempShopByStyles = data || [];
        renderTempShopByStyles();
      }
    }
  } catch (e) {
    console.error("Error loading shop by styles:", e);
  }
}

function renderTempShopByStyles() {
  const listEl = document.getElementById("shop-by-style-list");
  if (!listEl) return;
  
  if (!window.tempShopByStyles || window.tempShopByStyles.length === 0) {
    listEl.innerHTML = `<span style="color: var(--muted); font-size: 12px; text-align: center; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 6px; width: 100%; display: block; box-sizing: border-box;">No active styles. Add some using the panel on the left.</span>`;
    return;
  }
  
  const total = window.tempShopByStyles.length;
  listEl.innerHTML = window.tempShopByStyles.map((styleItem, index) => {
    const imgUrl = styleItem.image ? styleItem.image : "assets/phone-case.png";
    return `
      <div class="style-item-admin" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;">
          <div onclick="window.triggerStyleImageUpload(${index})" style="position: relative; width: 55px; height: 44px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); cursor: pointer; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;" title="Click to change image">
            <img src="${escapeHtml(imgUrl)}" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.6); color: white; font-size: 8px; text-align: center; padding: 1px 0;">EDIT</div>
          </div>
          <div style="display: flex; flex-direction: column; overflow: hidden; min-width: 0;">
            <span style="font-weight: 700; color: white; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${escapeHtml(styleItem.name)}</span>
            <span style="color: var(--muted); font-size: 11px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">Search: ${escapeHtml(styleItem.search_term)} | ${escapeHtml(styleItem.description || '')}</span>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
          <button type="button" onclick="window.moveStyle(${index}, -1)" class="tab-btn" style="padding: 4px 8px; font-size: 11px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: white; cursor: pointer;" ${index === 0 ? 'disabled style="opacity: 0.3; cursor: default;"' : ''}>▲</button>
          <button type="button" onclick="window.moveStyle(${index}, 1)" class="tab-btn" style="padding: 4px 8px; font-size: 11px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: white; cursor: pointer;" ${index === total - 1 ? 'disabled style="opacity: 0.3; cursor: default;"' : ''}>▼</button>
          <button type="button" onclick="window.removeStyleFromList(${index})" class="tab-btn" style="padding: 4px 8px; font-size: 11px; background: rgba(255, 91, 103, 0.1); border: 1px solid rgba(255, 91, 103, 0.2); border-radius: 4px; color: #ff5b67; cursor: pointer;">✕</button>
        </div>
      </div>
    `;
  }).join("");
}

window.tempCustomStyleImageUrl = "";
window.handleCustomStyleImageSelect = function(e) {
  const file = e.target.files[0];
  const filenameSpan = document.getElementById("custom-style-image-filename");
  if (file) {
    if (filenameSpan) filenameSpan.textContent = file.name;
    const reader = new FileReader();
    reader.onload = function(evt) {
      const blob = dataURLtoBlob(evt.target.result);
      uploadFileToServer(blob, file.name, (url) => {
        window.tempCustomStyleImageUrl = url;
        showToast("Style image uploaded successfully");
      });
    };
    reader.readAsDataURL(file);
  } else {
    if (filenameSpan) filenameSpan.textContent = "No file chosen";
    window.tempCustomStyleImageUrl = "";
  }
};

window.addStyleItem = function() {
  const nameInput = document.getElementById("style-name-input");
  const searchInput = document.getElementById("style-search-input");
  const descInput = document.getElementById("style-desc-input");
  
  if (!nameInput || !searchInput) return;
  const name = nameInput.value.trim();
  const search_term = searchInput.value.trim();
  const description = descInput ? descInput.value.trim() : "";
  
  if (!name) return showToast("Please type a style name");
  if (!search_term) return showToast("Please type a search term");
  
  if (!window.tempShopByStyles) window.tempShopByStyles = [];
  const exists = window.tempShopByStyles.some(s => s.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    return showToast("Style already added");
  }
  
  window.tempShopByStyles.push({
    name: name,
    search_term: search_term,
    description: description,
    image: window.tempCustomStyleImageUrl || ''
  });
  
  nameInput.value = "";
  searchInput.value = "";
  if (descInput) descInput.value = "";
  
  window.tempCustomStyleImageUrl = "";
  const filenameSpan = document.getElementById("custom-style-image-filename");
  if (filenameSpan) filenameSpan.textContent = "No file chosen";
  const fileInput = document.getElementById("custom-style-image-file-input");
  if (fileInput) fileInput.value = "";
  
  renderTempShopByStyles();
};

window.removeStyleFromList = function(idx) {
  if (!window.tempShopByStyles) return;
  window.tempShopByStyles.splice(idx, 1);
  renderTempShopByStyles();
};

window.clearAllStyles = function() {
  if (!confirm("Are you sure you want to clear all styles?")) return;
  window.tempShopByStyles = [];
  renderTempShopByStyles();
};

window.moveStyle = function(idx, direction) {
  if (!window.tempShopByStyles) return;
  const targetIdx = idx + direction;
  if (targetIdx < 0 || targetIdx >= window.tempShopByStyles.length) return;
  
  const temp = window.tempShopByStyles[idx];
  window.tempShopByStyles[idx] = window.tempShopByStyles[targetIdx];
  window.tempShopByStyles[targetIdx] = temp;
  
  renderTempShopByStyles();
};

window.triggerStyleImageUpload = function(index) {
  window.activeUploadingStyleIndex = index;
  const fileInput = document.getElementById("style-image-file-input");
  if (fileInput) {
    fileInput.value = "";
    fileInput.click();
  }
};

window.saveShopByStyles = async function() {
  const token = localStorage.getItem("admin-user-token");
  if (!token) return showToast("Unauthorized");
  
  const saveBtn = document.querySelector("#panel-shop-by-style button[onclick='window.saveShopByStyles()']");
  const originalHtml = saveBtn ? saveBtn.innerHTML : "";
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = "Saving styles...";
  }
  
  try {
    const res = await fetch('/api/shop-by-styles/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        styles: window.tempShopByStyles
      })
    });
    
    const data = await res.json();
    if (res.ok) {
      showToast("Shop by Styles saved successfully!");
      localStorage.setItem("iselectrics-shop-by-styles", JSON.stringify(data));
      window.tempShopByStyles = data || [];
      renderTempShopByStyles();
    } else {
      showToast(data.message || "Failed to save Shop by Styles");
    }
  } catch (e) {
    console.error("Error saving styles:", e);
    showToast("Network error saving Shop by Styles");
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = originalHtml;
    }
  }
};

window.loadShopByStylesFromApi = loadShopByStylesFromApi;
window.renderTempShopByStyles = renderTempShopByStyles;

// Listen for model and style image file uploads
document.addEventListener("DOMContentLoaded", () => {
  const triggerMailSearch = document.getElementById("trigger-mail-panel-search");
  if (triggerMailSearch) {
    triggerMailSearch.addEventListener("input", renderTriggerMailPanel);
  }
  const triggerMailDays = document.getElementById("trigger-mail-days-input");
  if (triggerMailDays) {
    triggerMailDays.addEventListener("input", renderTriggerMailPanel);
  }
  
  // Listen for checkbox changes to update variant options list live
  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("product-model-checkbox")) {
      renderImagePreviews();
    }
  });
  
  // Refresh variants color selector dropdowns when colors input changes
  const editColorsInput = document.getElementById("edit-colors");
  if (editColorsInput) {
    editColorsInput.addEventListener("input", () => {
      renderImagePreviews();
    });
  }
  const fileInput = document.getElementById("model-image-file-input");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          const blob = dataURLtoBlob(evt.target.result);
          uploadFileToServer(blob, file.name, (url) => {
            const idx = window.activeUploadingModelIndex;
            if (idx !== undefined && window.tempIphoneModels && window.tempIphoneModels[idx]) {
              window.tempIphoneModels[idx].image = url;
              renderTempIphoneModels();
              showToast("Model image updated");
            }
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const styleFileInput = document.getElementById("style-image-file-input");
  if (styleFileInput) {
    styleFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          const blob = dataURLtoBlob(evt.target.result);
          uploadFileToServer(blob, file.name, (url) => {
            const idx = window.activeUploadingStyleIndex;
            if (idx !== undefined && window.tempShopByStyles && window.tempShopByStyles[idx]) {
              window.tempShopByStyles[idx].image = url;
              renderTempShopByStyles();
              showToast("Style image updated");
            }
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }
});


function getSelectedProductModels() {
  const category = (document.getElementById("edit-category")?.value || "Mobile").toLowerCase();
  const isMobile = category === "mobile" || category.includes("covers") || category.includes("case") || category.includes("phone");
  if (!isMobile) return [];
  
  const uniqueModels = new Set();
  uploadedImages.forEach(variant => {
    if (variant.model && variant.model.trim() !== "") {
      uniqueModels.add(variant.model.trim());
    }
  });
  return Array.from(uniqueModels);
}

// Poll APIs for fresh data every 5 seconds to keep the admin side perfectly real-time
setInterval(() => {
  const token = localStorage.getItem("admin-user-token");
  if (document.getElementById("trigger-mail-panel-table")) {
    renderTriggerMailPanel();
  }
  if (localStorage.getItem("admin-authenticated") === "true" && token && token !== "null" && token !== "undefined") {
    loadUsersFromApi();
    loadAdminOrdersFromApi();
    loadProductsFromApi();
    loadCouponsFromApi();
    loadWalletsFromApi();
    loadPayoutsFromApi();
    loadIphoneModelsFromApi();
    loadShopByStylesFromApi();
  }
}, 5000);

checkAuth();
updateOrdersBadge();
updatePayoutsBadge();
updateWalletBadge();

// Prevent pinch-to-zoom gestures (zooming using two fingers) on any device
document.addEventListener('touchstart', function (e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchmove', function (e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

// Prevent Safari/macOS native gestures
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('gesturechange', function (e) {
  e.preventDefault();
}, { passive: false });

// Prevent desktop trackpad pinch-to-zoom (wheel + ctrlKey)
document.addEventListener('wheel', function (e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
}, { passive: false });

const DEFAULT_TRIGGER_MAIL_TEMPLATE = {
  enabled: true,
  interval_days: 90,
  subject: "Fresh New Mobile Cover Designs Just Landed at ZappDeal! ✨",
  body_html: '<p>Hi <strong>{customer_name}</strong>,</p><p>Thank you for shopping with <strong>ZappDeal</strong>. ❤️</p><p>We have added fresh mobile-cover designs to our collection, including stylish, protective and affordable options.</p><ul><li>Fresh trending designs</li><li>Premium quality protection</li><li>Cash on Delivery available</li><li>Fast delivery across India</li></ul><p>As a returning customer, we would love to have you back.</p>',
  cta_label: "Shop the Latest Collection",
  cta_url: "{shop_url}/collections/iphone-covers"
};

let triggerMailDeliveries = [];
let triggerMailTemplateCache = null;

function adminApiHeaders(json = false) {
  const headers = { Accept: "application/json", Authorization: "Bearer " + localStorage.getItem("admin-user-token") };
  if (json) headers["Content-Type"] = "application/json";
  return headers;
}

async function loadTriggerMailDeliveries() {
  const currentAdmin = JSON.parse(localStorage.getItem("admin-current-user") || "null");
  if (!currentAdmin?.is_super) {
    triggerMailDeliveries = [];
    return;
  }
  try {
    const res = await fetch("/api/admin/trigger-mail-deliveries", { headers: adminApiHeaders() });
    if (res.ok) triggerMailDeliveries = await res.json();
  } catch (error) {
    console.error("Unable to load trigger-mail delivery status", error);
  }
}

function currentTriggerTemplateFromForm() {
  return {
    enabled: document.getElementById("trigger-template-enabled")?.checked === true,
    interval_days: Number(document.getElementById("trigger-mail-interval-days")?.value || triggerMailTemplateCache?.interval_days || 90),
    subject: document.getElementById("trigger-template-subject")?.value.trim() || "",
    body_html: document.getElementById("trigger-template-body")?.innerHTML.trim() || "",
    cta_label: document.getElementById("trigger-template-cta-label")?.value.trim() || "",
    cta_url: document.getElementById("trigger-template-cta-url")?.value.trim() || ""
  };
}

function populateTriggerTemplateForm(template) {
  triggerMailTemplateCache = { ...DEFAULT_TRIGGER_MAIL_TEMPLATE, ...template };
  document.getElementById("trigger-template-enabled").checked = template.enabled === true;
  document.getElementById("trigger-template-subject").value = template.subject || "";
  document.getElementById("trigger-template-body").innerHTML = template.body_html || "";
  document.getElementById("trigger-template-cta-label").value = template.cta_label || "";
  document.getElementById("trigger-template-cta-url").value = template.cta_url || "";
  const intervalInput = document.getElementById("trigger-mail-interval-days");
  if (intervalInput) intervalInput.value = template.interval_days || 90;
  updateTriggerTemplatePreview();
}

function updateTriggerTemplatePreview() {
  const frame = document.getElementById("trigger-template-preview");
  if (!frame) return;
  const template = currentTriggerTemplateFromForm();
  const replaceTokens = value => String(value || "")
    .replaceAll("{customer_name}", "Test Customer")
    .replaceAll("{product_name}", "iPhone Cover")
    .replaceAll("{order_id}", "TEST-001")
    .replaceAll("{shop_url}", window.location.origin);
  const safeUrl = replaceTokens(template.cta_url).replace(/"/g, "&quot;");
  frame.srcdoc = `<!doctype html><html><head><style>html{scrollbar-width:thin;scrollbar-color:#7c3aed #e5e9f0}html::-webkit-scrollbar{width:10px}html::-webkit-scrollbar-track{background:#e5e9f0}html::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#10bfc5,#7c3aed);border:2px solid #e5e9f0;border-radius:999px}html::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,#10d9dc,#925cff)}</style></head><body style="margin:0;background:#090d16;font-family:Arial,sans-serif"><div style="padding:24px 12px"><div style="max-width:600px;margin:auto;background:white;border-radius:16px;overflow:hidden"><div style="padding:25px;background:#312e81;color:white"><h1 style="margin:0">ZappDeal</h1></div><div style="padding:28px;color:#172033;line-height:1.65">${replaceTokens(template.body_html)}<p style="margin-top:26px"><a href="${safeUrl}" style="display:inline-block;padding:12px 20px;background:#7c3aed;color:white;text-decoration:none;border-radius:8px;font-weight:bold">${replaceTokens(template.cta_label)}</a></p></div></div></div></body></html>`;
}

async function loadTriggerMailTemplate() {
  const currentAdmin = JSON.parse(localStorage.getItem("admin-current-user") || "null");
  if (!currentAdmin?.is_super) {
    showToast("Access denied: Super Admin only.");
    return;
  }
  try {
    const res = await fetch("/api/admin/trigger-mail-template", { headers: adminApiHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Unable to load template");
    populateTriggerTemplateForm(data);
  } catch (error) {
    showToast("❌ " + error.message);
  }
}

async function loadTriggerMailAutomationSetting() {
  const currentAdmin = JSON.parse(localStorage.getItem("admin-current-user") || "null");
  const control = document.getElementById("trigger-mail-automation-control");
  if (!currentAdmin?.is_super) {
    if (control) control.style.display = "none";
    return;
  }
  if (control) control.style.display = "flex";
  try {
    const res = await fetch("/api/admin/trigger-mail-template", { headers: adminApiHeaders() });
    const template = await res.json();
    if (!res.ok) throw new Error(template.message || "Unable to load automatic trigger interval");
    triggerMailTemplateCache = { ...DEFAULT_TRIGGER_MAIL_TEMPLATE, ...template };
    const input = document.getElementById("trigger-mail-interval-days");
    if (input) input.value = triggerMailTemplateCache.interval_days || 90;
    return triggerMailTemplateCache;
  } catch (error) {
    showToast("Unable to load automatic trigger interval.");
    return null;
  }
}

window.saveTriggerMailInterval = async function () {
  const currentAdmin = JSON.parse(localStorage.getItem("admin-current-user") || "null");
  if (!currentAdmin?.is_super) return showToast("Access denied: Super Admin only.");
  const input = document.getElementById("trigger-mail-interval-days");
  const intervalDays = Number(input?.value);
  if (!Number.isInteger(intervalDays) || intervalDays < 1 || intervalDays > 3650) {
    return showToast("Enter an interval between 1 and 3650 days.");
  }
  try {
    if (!triggerMailTemplateCache) {
      const loadedTemplate = await loadTriggerMailAutomationSetting();
      if (!loadedTemplate) throw new Error("Load the current campaign settings before saving.");
    }
    const payload = { ...DEFAULT_TRIGGER_MAIL_TEMPLATE, ...triggerMailTemplateCache, interval_days: intervalDays };
    const res = await fetch("/api/admin/trigger-mail-template", { method: "PUT", headers: adminApiHeaders(true), body: JSON.stringify(payload) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Unable to save interval");
    triggerMailTemplateCache = data.template;
    input.value = data.template.interval_days;
    showToast(`Automatic campaign interval updated to ${data.template.interval_days} days.`);
  } catch (error) {
    showToast(error.message || "Unable to save automatic trigger interval.");
  }
};

window.saveTriggerMailTemplate = async function () {
  try {
    const res = await fetch("/api/admin/trigger-mail-template", { method: "PUT", headers: adminApiHeaders(true), body: JSON.stringify(currentTriggerTemplateFromForm()) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Unable to save template");
    populateTriggerTemplateForm(data.template);
    showToast("✅ Template saved successfully.");
  } catch (error) {
    showToast("❌ " + error.message);
  }
};

window.restoreDefaultTriggerTemplate = function () {
  if (!confirm("Restore the default campaign template? Save afterward to make it active.")) return;
  populateTriggerTemplateForm(DEFAULT_TRIGGER_MAIL_TEMPLATE);
};

window.sendTriggerTemplateTest = async function () {
  const email = document.getElementById("trigger-template-test-email")?.value.trim();
  if (!email) return showToast("Enter a test recipient email.");
  try {
    const res = await fetch("/api/admin/trigger-mail-template/test", { method: "POST", headers: adminApiHeaders(true), body: JSON.stringify({ email }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Test delivery failed");
    showToast("✅ " + data.message);
  } catch (error) {
    showToast("❌ " + error.message);
  }
};

document.addEventListener("input", event => {
  if (event.target.closest("#panel-email-template")) updateTriggerTemplatePreview();
});

window.currentSelectedDaysFilter = "all"; // Core global tracking property status

function formatProductNameWithTooltip(productName) {
  if (!productName) return "N/A";
  const words = productName.trim().split(/\s+/);
  if (words.length <= 3) {
    return escapeHtml(productName);
  }
  const shortened = words.slice(0, 3).join(" ");
  return `
    <span class="product-name-tooltip-container">
      ${escapeHtml(shortened)}<span class="tooltip-dots">...</span>
      <span class="product-name-tooltip">${escapeHtml(productName)}</span>
    </span>
  `;
}

// 9. Trigger Mail dedicated Panel Tab
function renderTriggerMailPanel() {
  const allOrdersList =
    JSON.parse(localStorage.getItem("admin-iselectrics-orders")) || [];
  const body = document.getElementById("trigger-mail-panel-table");
  if (!body) return;

  const searchInput = document.getElementById("trigger-mail-panel-search");
  const searchVal = (searchInput ? searchInput.value : "").toLowerCase().trim();

  const daysInput = document.getElementById("trigger-mail-days-input");
  const daysVal = daysInput ? daysInput.value.trim() : "";

  console.log("[TriggerMail] Active filter by days limit:", daysVal === "" ? "All Days" : daysVal);

  // Filter out cancelled or declined orders safely
  let filteredOrders = allOrdersList.filter((o) => {
    const orderStatus = o.status ? String(o.status).toLowerCase() : "pending";
    return !["cancelled", "declined"].includes(orderStatus);
  });

  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Map contextual target arrays parsing days runtime intervals properties details first
  filteredOrders = filteredOrders.map((order) => {
    let daysCompleted = 0;
    if (order.rawDate) {
      // Ensure cross-browser standard ISO date parsing (converts space separator to T)
      let dateStr = order.rawDate;
      if (typeof dateStr === 'string') {
        dateStr = dateStr.replace(/\s+/, 'T');
      }
      const purchaseDate = new Date(dateStr);
      const purchaseMidnight = new Date(purchaseDate.getFullYear(), purchaseDate.getMonth(), purchaseDate.getDate());
      const timeDiff = todayMidnight.getTime() - purchaseMidnight.getTime();
      daysCompleted = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
    }
    return { ...order, daysSincePurchase: daysCompleted };
  });

  console.log("[TriggerMail] Calculated days list:", filteredOrders.map(o => o.daysSincePurchase));

  // Filter A: Filter by typed purchase interval day limit
  if (daysVal !== "") {
    const dayLimit = parseInt(daysVal, 10);
    filteredOrders = filteredOrders.filter(
      (order) => order.daysSincePurchase === dayLimit,
    );
  }

  console.log("[TriggerMail] Length after filtering:", filteredOrders.length);

  // Filter B: Apply structural keyword parameter searches execution channels
  if (searchVal !== "") {
    filteredOrders = filteredOrders.filter(
      (order) =>
        (order.customer && order.customer.toLowerCase().includes(searchVal)) ||
        (order.id && order.id.toLowerCase().includes(searchVal)) ||
        (order.productName &&
          order.productName.toLowerCase().includes(searchVal)) ||
        (order.email && order.email.toLowerCase().includes(searchVal)) ||
        (order.mobile && order.mobile.includes(searchVal)),
    );
  }

  // Cache current processed list view states locally on the window context route scope for bulk access
  window.currentlyRenderedBulkMailQueue = filteredOrders;

  // Manage disabled visual state for bulk actions button properties dynamically
  const bulkBtn = document.getElementById("bulk-send-mail-btn");
  if (bulkBtn) {
    bulkBtn.disabled = filteredOrders.length === 0;
    bulkBtn.style.opacity = filteredOrders.length === 0 ? "0.5" : "1";
    bulkBtn.style.cursor =
      filteredOrders.length === 0 ? "not-allowed" : "pointer";
  }

  const countEl = document.getElementById("trigger-mail-panel-count");
  if (countEl) {
    countEl.textContent = `Showing 1 to ${filteredOrders.length} of ${filteredOrders.length} results matching filter criteria`;
  }

  if (filteredOrders.length === 0) {
    body.innerHTML = `<tr><td colspan="10" style="text-align: center; color: var(--muted); padding: 40px; font-style: italic;">No buyer records matched your selections filter parameters.</td></tr>`;
    return;
  }

  body.innerHTML = filteredOrders
    .map((order, idx) => {
      const avatar = order.customer
        ? order.customer.charAt(0).toUpperCase()
        : "?";
      const normalizedEmail = String(order.email || "").trim().toLowerCase();
      const matchingDeliveries = triggerMailDeliveries.filter(delivery =>
        delivery.status === "sent" &&
        (Number(delivery.anchor_order_id) === Number(order.dbId) || delivery.recipient_email === normalizedEmail)
      );
      const hasBeenSent = matchingDeliveries.length > 0;

      const statusBadgeHtml = hasBeenSent
        ? `<span class="status active" style="font-weight:600; padding:4px 8px; background:rgba(16, 243, 237, 0.15); color:var(--cyan);">Sent</span>`
        : `<span class="status pending" style="font-weight:600; padding:4px 8px; background:rgba(255,176,58,0.1); color:#ffb03a;">Not Sent</span>`;

      return `
      <tr>
        <td style="padding: 8px 6px; color: var(--muted); font-weight: 600; text-align: center; font-size: 11px;">${idx + 1}</td>
        <td style="padding: 8px 6px; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          <div class="avatar-cell" style="display: flex; align-items: center; gap: 6px;">
            <span class="avatar-circle" style="width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); color: white; border-radius: 50%; font-size: 10px; font-weight: bold;">${avatar}</span>
            <strong style="color: white; font-size: 11px;" title="${escapeHtml(order.customer)}">${escapeHtml(order.customer)}</strong>
          </div>
        </td>
        <td style="padding: 8px 6px; color: #8892b0; font-size: 11px; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(order.email || "N/A")}">${escapeHtml(order.email || "N/A")}</td>
        <td style="padding: 8px 6px; color: #8892b0; font-size: 11px; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(order.mobile || "N/A")}</td>
        <td style="padding: 8px 6px; font-weight: 600; color: white; font-size: 11px; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${formatProductNameWithTooltip(order.productName)}</td>
        <td style="padding: 8px 6px; font-size: 11px; max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><strong style="color: var(--cyan);">#${order.id}</strong></td>
        <td style="padding: 8px 6px; color: #8892b0; font-size: 11px; max-width: 85px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${order.date || "N/A"}</td>
        <td style="padding: 8px 6px; font-size: 11px; max-width: 75px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          <span style="font-weight:600; color: white;">${order.daysSincePurchase} days</span>
        </td>
        <td style="padding: 8px 6px; font-size: 11px; max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${statusBadgeHtml}</td>
        <td style="padding: 8px 6px; text-align: right; max-width: 80px;">
          <button type="button" class="btn-teal" 
                  style="padding: 4px 8px; font-size: 10px; background: #10f3ed; color: #000; font-weight: 700; border: none; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s;" 
                  onclick="window.submitTriggerMail('${order.dbId}', '${order.userId || "guest"}', '${order.customer.replace(/'/g, "\\'")}', '${order.email}')">
            <svg viewBox="0 0 24 24" aria-hidden="true" style="width:10px; height:10px; fill:currentColor;">${adminIcons.send}</svg> Send
          </button>
        </td>
      </tr>
    `;
    })
    .join("");
}

// Global programmatic function processing block collection loops dispatches concurrently
window.legacySubmitBulkTriggerMails = async function () {
  const currentAdminJson = localStorage.getItem("admin-current-user");
  const currentAdmin = currentAdminJson ? JSON.parse(currentAdminJson) : null;
  const isSuperAdmin = currentAdmin && currentAdmin.is_super === true;

  if (!isSuperAdmin) {
    alert("Access Denied: Only the Super Admin is authorized to send bulk emails.");
    return;
  }

  const targetsQueue = window.currentlyRenderedBulkMailQueue || [];
  if (targetsQueue.length === 0) {
    showToast("❌ No target recipients listed in the current list.");
    return;
  }

  const validRecipients = targetsQueue.filter(
    (o) => o.email && o.email !== "null" && o.email.trim() !== "",
  );
  if (validRecipients.length === 0) {
    showToast(
      "❌ All listed customers are missing functional email parameters profile records.",
    );
    return;
  }

  const defaultUrl = window.location.origin;
  const bulkUrl = prompt("Enter the shop URL to include in ALL bulk emails:", defaultUrl);
  if (bulkUrl === null) {
    // Admin cancelled the popup
    return;
  }
  const finalBulkUrl = bulkUrl.trim() || defaultUrl;

  if (
    !confirm(
      `Are you sure you want to trigger campaign delivery directly to ALL ${validRecipients.length} matching customers listed inside this view container?`,
    )
  ) {
    return;
  }

  showToast(`⏳ Triggering bulk delivery engine loops processing...`);

  let successCount = 0;
  // Sequential iterative mapping loop handling request tracking over shared interfaces
  for (const clientRecord of validRecipients) {
    try {
      // Direct pass link wrapper to standard execution framework handler
      await window.submitTriggerMail(
        clientRecord.dbId,
        clientRecord.userId || "guest",
        clientRecord.customer,
        clientRecord.email,
        finalBulkUrl
      );
      successCount++;
    } catch (e) {
      console.error("Bulk process iteration catch hook tracking failure:", e);
    }
  }

  showToast(
    `🏁 Campaign loop completed! successfully notified ${successCount} customers.`,
  );
  renderTriggerMailPanel();
};

// Fixed transactional marketing delivery email dispatcher logic wrapper channel
async function legacySubmitTriggerMail(orderDbId, userId, customerName, email, customUrl = null) {
  const currentAdminJson = localStorage.getItem("admin-current-user");
  const currentAdmin = currentAdminJson ? JSON.parse(currentAdminJson) : null;
  const isSuperAdmin = currentAdmin && currentAdmin.is_super === true;

  if (!isSuperAdmin) {
    alert("Access Denied: Only the Super Admin is authorized to send emails.");
    return;
  }

  if (!email || email === "null" || email.trim() === "") {
    showToast(`❌ Cannot send template. No email found for ${customerName}.`);
    return;
  }

  const defaultUrl = window.location.origin;
  let finalUrl = customUrl;

  if (!finalUrl) {
    const userInput = prompt(`Enter the shop URL to include in the email for ${customerName}:`, defaultUrl);
    if (userInput === null) {
      // Admin cancelled the popup
      return;
    }
    finalUrl = userInput.trim() || defaultUrl;
  }

  const emailBody = `Hi ${customerName},

Thank you for shopping with **ZappDeal**. ❤️

Since you're one of our valued customers, we wanted to let you know that we've added **new mobile cover designs** to our collection.

Whether you're looking for something stylish, protective, or unique, there's something new waiting for you.

✨ What's new?
• Fresh trending designs
• Premium quality protection
• Affordable prices
• Cash on Delivery available
• Fast delivery across India

As a returning customer, we'd love to have you back.

👉 **Shop the Latest Collection:** ${finalUrl}

Thank you for choosing ZappDeal. We look forward to serving you again!`;

  const token = localStorage.getItem("admin-user-token");

  const updateLogsLocalCache = () => {
    const sentLogs =
      JSON.parse(localStorage.getItem("admin-triggered-emails-log")) || {};
    sentLogs[`${orderDbId}_${userId}`] = true;
    localStorage.setItem(
      "admin-triggered-emails-log",
      JSON.stringify(sentLogs),
    );
  };

  try {
    const res = await fetch("/api/admin/send-trigger-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        order_id: orderDbId,
        email: email,
        subject: "Fresh New Mobile Cover Designs Just Landed at ZappDeal! ✨",
        message: emailBody,
      }),
    });

    if (res.ok) {
      updateLogsLocalCache();
    } else {
      console.log(
        `%c[Marketing Dispatch Payload to ${email}]\n` + emailBody,
        "color: #10f3ed; font-family: monospace;",
      );
      updateLogsLocalCache();
    }
  } catch (err) {
    updateLogsLocalCache();
    console.log(
      `%c[Network Failover Simulation To ${email}]\n` + emailBody,
      "color: #10f3ed; font-family: monospace;",
    );
  }
}

async function submitTriggerMail(orderDbId, userId, customerName, email, quiet = false) {
  const currentAdmin = JSON.parse(localStorage.getItem("admin-current-user") || "null");
  if (!currentAdmin?.is_super) {
    alert("Access Denied: Only the Super Admin is authorized to send emails.");
    return false;
  }
  if (!email || email === "null" || !email.trim()) {
    if (!quiet) showToast(`Cannot send template. No email found for ${customerName}.`);
    return false;
  }
  try {
    const res = await fetch("/api/admin/send-trigger-mail", {
      method: "POST",
      headers: adminApiHeaders(true),
      body: JSON.stringify({ order_id: orderDbId, email, customer_name: customerName })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Email delivery failed");
    await loadTriggerMailDeliveries();
    renderTriggerMailPanel();
    if (!quiet) showToast(`✅ Campaign email sent to ${email}.`);
    return true;
  } catch (error) {
    console.error("Trigger-mail delivery failed", error);
    if (!quiet) showToast(`❌ ${error.message}`);
    return false;
  }
}

window.submitBulkTriggerMails = async function () {
  const currentAdmin = JSON.parse(localStorage.getItem("admin-current-user") || "null");
  if (!currentAdmin?.is_super) {
    alert("Access Denied: Only the Super Admin is authorized to send bulk emails.");
    return;
  }
  const recipients = new Map();
  (window.currentlyRenderedBulkMailQueue || []).forEach(order => {
    const email = String(order.email || "").trim().toLowerCase();
    if (email && !recipients.has(email)) recipients.set(email, order);
  });
  const queue = [...recipients.values()];
  if (!queue.length) return showToast("No valid recipients are listed in the current view.");
  if (!confirm(`Send the saved campaign template to ${queue.length} unique customer(s)?`)) return;
  let sentCount = 0;
  for (const order of queue) {
    if (await submitTriggerMail(order.dbId, order.userId || "guest", order.customer, order.email, true)) sentCount++;
  }
  await loadTriggerMailDeliveries();
  renderTriggerMailPanel();
  showToast(`Campaign completed: ${sentCount} of ${queue.length} email(s) delivered.`);
};

// Global duplicate product function handler
window.handleDuplicateProduct = async function(productId) {
  const products = getProducts();
  const product = products.find(p => String(p.id) === String(productId));
  if (!product) {
    showToast("❌ Product not found");
    return;
  }

  if (!confirm(`Are you sure you want to duplicate "${product.name}"?`)) {
    return;
  }

  showToast("⏳ Duplicating product...");

  let colors = product.colors;
  if (typeof colors === 'string') {
    try { colors = JSON.parse(colors); } catch(e) { colors = []; }
  }
  if (!Array.isArray(colors)) colors = [];

  let models = product.models;
  if (typeof models === 'string') {
    try { models = JSON.parse(models); } catch(e) { models = []; }
  }
  if (!Array.isArray(models)) models = [];

  let images = product.images;
  if (typeof images === 'string') {
    try { images = JSON.parse(images); } catch(e) { images = []; }
  }
  if (!Array.isArray(images)) images = [];

  const payload = {
    name: `${product.name} (Copy)`,
    category: product.category || "Mobile",
    price: parseInt(product.price) || 0,
    old_price: product.old_price ? parseInt(product.old_price) : null,
    rating: parseFloat(product.rating) || 0.0,
    reviews: parseInt(product.reviews) || 0,
    image: product.image || "assets/phone-case.png",
    images: images,
    video: product.video || null,
    colors: colors,
    models: models,
    detail: product.detail || "",
    is_newly_launched: !!product.is_newly_launched,
    is_recommended: !!product.is_recommended,
    is_style: !!product.is_style
  };

  const token = localStorage.getItem("admin-user-token");

  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (res.status === 401) {
      handleSessionExpired();
      return;
    }

    if (res.ok) {
      const data = await res.json();
      const newId = data?.id || data?.product?.id;
      if (newId) {
        if (typeof saveProductDisplaySections === 'function') {
          saveProductDisplaySections(String(newId), product.sections || []);
        }
        if (typeof saveProductModels === 'function') {
          saveProductModels(String(newId), models);
        }
      }
      showToast("Product duplicated successfully!");
      
      // Reload and automatically open the edit modal for the newly created duplicate
      await loadProductsFromApi();
      if (newId) {
        setTimeout(() => {
          const editBtn = document.querySelector(`.edit-btn[data-id="${newId}"]`);
          if (editBtn) {
            editBtn.click();
          } else {
            if (typeof openEditModal === 'function') {
              openEditModal(newId);
            }
          }
        }, 300);
      }
    } else {
      const errData = await res.json();
      showToast("Failed to duplicate product: " + (errData.message || ""));
    }
  } catch (err) {
    console.error(err);
    showToast("Network error duplicating product");
  }
};

// Maintain global visibility rules structures exports context maps
window.renderTriggerMailPanel = renderTriggerMailPanel;
window.submitTriggerMail = submitTriggerMail;
