const defaultProducts = [
  {
    id: "dell-laptop",
    name: "Dell Inspiron Laptop",
    category: "Laptop",
    price: 86599,
    oldPrice: 92999,
    rating: 4.8,
    reviews: 245,
    image: "assets/dell-laptop.png",
    colors: ["Graphite", "Silver", "Mist"],
    models: ["i5 12th Gen", "i7 13th Gen", "Ryzen 7", "Studio"],
    detail: "A slim everyday laptop with fast storage, sharp display, and long battery life."
  },
  {
    id: "headphones",
    name: "Pulse Wireless Headphones",
    category: "Audio",
    price: 8999,
    oldPrice: 12999,
    rating: 4.7,
    reviews: 198,
    image: "assets/headphones.png",
    colors: ["Black", "Blue", "Sand"],
    models: ["ANC", "Studio", "Travel", "Lite"],
    detail: "Deep bass, active noise cancellation, and cushioned comfort for daily listening."
  },
  {
    id: "sony-laptop",
    name: "Sony Vaio Laptop",
    category: "Laptop",
    price: 99599,
    oldPrice: 111999,
    rating: 4.6,
    reviews: 126,
    image: "assets/sony-laptop.png",
    colors: ["Pearl", "Silver", "Black"],
    models: ["14 inch", "15 inch", "OLED", "Pro"],
    detail: "Premium lightweight performance for creative work, streaming, and travel."
  },
  {
    id: "phone-case",
    name: "Shockproof Armor Case",
    category: "Mobile",
    price: 599,
    oldPrice: 999,
    rating: 4.8,
    reviews: 425,
    image: "assets/phone-case.png",
    colors: ["Black", "Clear", "Orange"],
    models: ["iPhone 15", "iPhone 15 Pro", "iPhone 15 Plus", "Samsung S24"],
    detail: "Raised edges, magnetic ring support, and textured grip for everyday protection."
  },
  {
    id: "smart-tv",
    name: "4K Smart Television",
    category: "Television",
    price: 42999,
    oldPrice: 52999,
    rating: 4.5,
    reviews: 87,
    image: "assets/smart-tv.png",
    colors: ["Black", "Silver"],
    models: ["43 inch", "50 inch", "55 inch", "65 inch"],
    detail: "Bright 4K display with streaming apps, voice control, and cinematic audio."
  },
  {
    id: "retro-radio",
    name: "Retro Digital Radio",
    category: "Radio",
    price: 3499,
    oldPrice: 4999,
    rating: 4.4,
    reviews: 72,
    image: "assets/retro-radio.png",
    colors: ["Teal", "Walnut", "Cream"],
    models: ["Classic", "Bluetooth", "Mini", "Plus"],
    detail: "Vintage style with modern Bluetooth, FM tuning, and a rechargeable battery."
  },
  {
    id: "earbuds",
    name: "Noise Free Earbuds",
    category: "Audio",
    price: 1299,
    oldPrice: 2499,
    rating: 4.6,
    reviews: 316,
    image: "assets/earbuds.png",
    colors: ["White", "Black", "Blue"],
    models: ["Air", "Air Pro", "Bass", "Sport"],
    detail: "Pocket-size earbuds with clear calls, punchy bass, and fast USB-C charging."
  },
  {
    id: "charger",
    name: "20W Fast Charger",
    category: "Accessories",
    price: 599,
    oldPrice: 1199,
    rating: 4.5,
    reviews: 203,
    image: "assets/charger.png",
    colors: ["White", "Black"],
    models: ["USB-C", "Dual Port", "Mini", "Travel"],
    detail: "Compact fast charger with smart temperature control and wide device support."
  }
];

let products = JSON.parse(localStorage.getItem("iselectrics-products") || "[]");
if (!Array.isArray(products) || products.length === 0) {
  products = defaultProducts;
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

function getBaseModel(model) {
  if (!model) return "";
  // Match "iPhone X", "iPhone SE", "iPhone 11", "iPhone 12", etc.
  const match = model.match(/^(iPhone\s+(?:\d+|[X|S|R|E]+))/i);
  return match ? match[1] : model;
}

function groupProductModels(allModels) {
  const groups = {};
  const sortedModels = [...allModels].sort((a, b) => {
    const aIphone = String(a).match(/^iPhone\s+(\d+)/i);
    const bIphone = String(b).match(/^iPhone\s+(\d+)/i);

    if (aIphone && !bIphone) return -1;
    if (!aIphone && bIphone) return 1;
    if (aIphone && bIphone && Number(aIphone[1]) !== Number(bIphone[1])) {
      return Number(bIphone[1]) - Number(aIphone[1]);
    }

    const aBase = getBaseModel(a);
    const bBase = getBaseModel(b);
    if (aBase.toLowerCase() === bBase.toLowerCase()) {
      if (String(a).toLowerCase() === aBase.toLowerCase()) return -1;
      if (String(b).toLowerCase() === bBase.toLowerCase()) return 1;
    }

    return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
  });

  sortedModels.forEach(model => {
    const base = getBaseModel(model);
    if (!groups[base]) {
      groups[base] = [];
    }
    groups[base].push(model);
  });
  return groups;
}

window.selectVariantAndBase = function(baseModel, variant) {
  state.selectedBaseModel = baseModel;
  window.selectProductModel(variant);
};

function normalizeProductModels(product) {
  if (!product) return [];
  const modelMeta = getProductModelMeta();
  const metaModels = modelMeta[product.id]?.models || modelMeta[String(product.id)]?.models;
  const productModels = parseProductArray(product.models).map((model) => String(model).trim()).filter(Boolean);
  
  // Extract models from variant images
  const variantModels = [];
  if (product.images && Array.isArray(product.images)) {
    product.images.forEach(img => {
      if (img && img.model && img.model.trim() !== "") {
        variantModels.push(img.model.trim());
      }
    });
  }
  
  const rawModels = [...productModels, ...variantModels, ...(metaModels || [])];
  let models = rawModels;
  if (typeof rawModels === "string") {
    try {
      models = JSON.parse(rawModels || "[]");
    } catch (e) {
      models = rawModels.split(",");
    }
  }
  let resolvedModels = Array.isArray(models)
    ? [...new Map(
        models
          .map((model) => String(model).trim())
          .filter(Boolean)
          .map((model) => [model.toLowerCase(), model])
      ).values()]
    : [];

  return resolvedModels;
}

function getProductColorsForModel(product, selectedModel) {
  if (!product) return [];
  const globalColors = Array.isArray(product.colors) ? product.colors : parseProductArray(product.colors);
  
  if (!selectedModel) {
    return globalColors;
  }
  
  const rawImages = getProductRawImages(product);
  
  // Find images matching the selected model
  const modelImages = rawImages.filter(img => 
    img.model && img.model.toLowerCase() === selectedModel.toLowerCase()
  );
  
  // Extract unique lowercase colors for the model
  const modelColorNames = [...new Set(
    modelImages
      .map(img => img.color ? img.color.trim().toLowerCase() : "")
      .filter(Boolean)
  )];
  
  if (modelColorNames.length > 0) {
    // Match them back to globalColors to preserve hex codes (e.g. "Blue||#0000ff")
    const matchedColors = [];
    modelColorNames.forEach(cName => {
      const match = globalColors.find(gColor => {
        const namePart = gColor.includes("||") ? gColor.split("||")[0].trim() : gColor.trim();
        return namePart.toLowerCase() === cName;
      });
      if (match) {
        matchedColors.push(match);
      } else {
        matchedColors.push(cName); // fallback to plain name if not in globalColors
      }
    });
    return matchedColors;
  }
  
  return globalColors;
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
  let url = "";
  if (typeof image === "string") {
    url = image.trim();
    if (url === "Array") return "";
  } else if (typeof image === "object") {
    url = String(image.url || image.image || "").trim();
  }
  if (!url) return "";
  if (url && !url.startsWith('/') && !url.startsWith('http')) {
    url = '/' + url;
  }
  if (url.startsWith('/uploads/')) {
    url = `${url}?v=1.0.2`;
  }
  return url;
}

function getProductImageList(product) {
  let productImages = [];
  if (product?.images) {
    try {
      productImages = Array.isArray(product.images) ? product.images : JSON.parse(product.images);
    } catch (e) {
      productImages = [];
    }
  }
  const resolved = productImages.map(resolveImageUrl).filter(Boolean);
  if (resolved.length) return resolved;
  const cover = resolveImageUrl(product?.image);
  return cover ? [cover] : [];
}

function getProductRawImages(product) {
  let productImages = [];
  if (product?.images) {
    try {
      productImages = Array.isArray(product.images) ? product.images : JSON.parse(product.images);
    } catch (e) {
      productImages = [];
    }
  }
  const globalColors = product ? (Array.isArray(product.colors) ? product.colors : parseProductArray(product.colors)) : [];

  const mapped = productImages.map(item => {
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
    
    if (url && !color) {
      const lowerUrl = url.toLowerCase().replace(/[^a-z0-9]/g, "");
      for (const gColor of globalColors) {
        const colorName = gColor.includes("||") ? gColor.split("||")[0].trim() : gColor.trim();
        const cleanColorName = colorName.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (cleanColorName && lowerUrl.includes(cleanColorName)) {
          color = colorName;
          break;
        }
      }
    }
    
    if (url) {
      return { url, color, model };
    }
    return null;
  }).filter(item => item && item.url && item.url !== "Array");

  if (mapped.length) return mapped;
  const cover = resolveImageUrl(product?.image);
  return cover ? [{ url: cover, color: "", model: "" }] : [];
}

function getProductSlides(product, selectedColor = state.selectedColor, selectedModel = state.selectedModel) {
  const isMobile = isMobileProduct(product);
  const coverImage = resolveImageUrl(product.image) || "assets/phone-case.png";

  if (isMobile && !selectedModel) {
    const slides = [{ type: 'image', url: coverImage, thumb: coverImage, color: "", model: "" }];
    if (product.video) {
      slides.push({ type: 'video', url: product.video, thumb: coverImage });
    }
    return slides;
  }

  const rawImages = getProductRawImages(product);
  let filteredImages = rawImages;

  // 1. Filter by model if selected
  if (selectedModel) {
    filteredImages = filteredImages.filter(img => {
      return img.model && img.model.toLowerCase() === selectedModel.toLowerCase();
    });
  }

  // 2. Filter by color if selected
  if (selectedColor) {
    const hasColorSpecificImage = filteredImages.some(img => img.color && img.color.toLowerCase() === selectedColor.toLowerCase());
    filteredImages = filteredImages.filter(img => {
      if (hasColorSpecificImage) {
        return img.color && img.color.toLowerCase() === selectedColor.toLowerCase();
      } else {
        return !img.color; // fallback to generic model images
      }
    });
  }

  const slides = [];
  
  // Add all matching images
  filteredImages.forEach((imgObj) => {
    slides.push({ type: 'image', url: imgObj.url, thumb: imgObj.url, color: imgObj.color, model: imgObj.model });
  });

  // Fallback to cover image if list is empty
  if (slides.length === 0) {
    slides.push({ type: 'image', url: coverImage, thumb: coverImage, color: "", model: "" });
  }

  // Add video at the very end
  if (product.video) {
    slides.push({ type: 'video', url: product.video, thumb: coverImage });
  }

  return slides;
}

function getProductSelectedVariantImage(product, selectedColor = state.selectedColor, selectedModel = state.selectedModel) {
  const slides = getProductSlides(product, selectedColor, selectedModel);
  const firstImage = slides.find(s => s.type === 'image');
  return firstImage ? firstImage.url : (resolveImageUrl(product.image) || "assets/phone-case.png");
}
window.getProductSelectedVariantImage = getProductSelectedVariantImage;


function isMobileProduct(product) {
  if (!product) return false;
  const cat = String(product.category || "").toLowerCase();
  const isMobileCat = cat === "mobile" || cat.includes("covers") || cat.includes("case") || cat.includes("phone");
  if (isMobileCat) return true;

  if (product.models && Array.isArray(product.models) && product.models.length > 0) {
    return true;
  }

  if (product.images && Array.isArray(product.images)) {
    const hasVariantModels = product.images.some(img => img && img.model && img.model.trim() !== "");
    if (hasVariantModels) return true;
  }

  return false;
}

async function loadProductsFromApi() {
    try {
        const res = await fetch('/api/products');
        if (res.ok) {
            productsApiLoaded = true;
            products = await res.json();
            const displayMeta = getProductDisplayMeta();
            const mappedProducts = products.map(p => ({
                id: p.id.toString(),
                name: p.name,
                category: p.category,
                price: p.price,
                oldPrice: p.old_price || p.price,
                rating: p.rating,
                reviews: p.reviews,
                image: resolveImageUrl(p.image) || "assets/dell-laptop.png",
                images: parseProductArray(p.images),
                video: (p.video && p.video !== "null" && p.video !== "undefined") ? p.video : "",
                colors: parseProductArray(p.colors),
                models: parseProductArray(p.models).map((model) => String(model).trim()).filter(Boolean),
                detail: p.detail,
                sections: displayMeta[p.id]?.sections || displayMeta[p.id?.toString()]?.sections || p.sections || [
                  ...(Number(p.is_newly_launched) ? ["newly-launched"] : []),
                  ...(Number(p.is_recommended) ? ["recommended"] : []),
                  ...(Number(p.is_style) ? ["style"] : [])
                ]
            }));
            if (!mappedProducts.length) return;
            products = mappedProducts;
            localStorage.setItem("iselectrics-products", JSON.stringify(products));

            // Remove cart entries whose products were deleted from the live
            // catalog. The cart itself is persisted, so it can otherwise keep
            // an obsolete product ID indefinitely.
            const availableProductIds = new Set(products.map((product) => String(product.id)));
            let cartChanged = false;
            Object.keys(state.cart).forEach((key) => {
              const productId = key.split(":")[0];
              if (!availableProductIds.has(String(productId))) {
                delete state.cart[key];
                cartChanged = true;
              }
            });
            if (cartChanged) persistCart();
            
            // Re-resolve clean path route now that products are loaded from API
            const pathView = resolvePathRoute();
            if (pathView && state.view === "home" && !(pathView === "home" && window.location.hash)) {
                setView(pathView, true);
                return;
            }
            const legacyView = parseHashView();
            if (legacyView === "product" && state.productId && state.view === "home") {
                const legacyProduct = products.find(product => String(product.id) === String(state.productId));
                if (legacyProduct) {
                    setView("product", true);
                    history.replaceState(null, "", canonicalUrlForView("product"));
                    return;
                }
            }
            
            if (window.__iselectricsStateReady && state.view === "home") renderHome();
            if (window.__iselectricsStateReady && state.view === "categories") renderCategories();
            if (window.__iselectricsStateReady && ["cart", "checkout"].includes(state.view)) renderAll();
        }
    } catch (e) {
        console.error("Failed to load products from API", e);
    }
}
let productsApiLoaded = false;
const initialProductsLoadPromise = loadProductsFromApi();

async function loadIphoneModelsFromApi() {
    try {
        const res = await fetch('/api/iphone-models');
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("iselectrics-iphone-models", JSON.stringify(data));
            if (window.__iselectricsStateReady && state.view === "home") renderHome();
        }
    } catch (e) {
        console.error("Failed to load iPhone models from API", e);
    }
}
loadIphoneModelsFromApi();

async function loadShopByStylesFromApi() {
    try {
        const res = await fetch('/api/shop-by-styles');
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("iselectrics-shop-by-styles", JSON.stringify(data));
            if (window.__iselectricsStateReady && state.view === "home") renderHome();
        }
    } catch (e) {
        console.error("Failed to load shop by styles from API", e);
    }
}
loadShopByStylesFromApi();

function getShopByStyles() {
    const cached = localStorage.getItem("iselectrics-shop-by-styles");
    if (cached) {
        try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed)) {
                // If admin explicitly cleared the list, return empty (hide section)
                return parsed;
            }
        } catch (e) {
            // fallback
        }
    }
    // No API data — show defaults so homepage isn't blank on first visit
    return [
        { name: "Clear Cases", search_term: "Clear", description: "Yellow-resistant ultra clear", image: "" },
        { name: "Leather Cases", search_term: "Leather", description: "Genuine premium leather", image: "" },
        { name: "Rugged Armor", search_term: "Rugged", description: "Heavy duty drop protection", image: "" },
        { name: "Silicone Covers", search_term: "Silicone", description: "Silky soft-touch feel", image: "" }
    ];
}

let categories = ["All", "Mobile", "Laptop", "Television", "Radio", "Audio", "Accessories"];

function updateCategoriesList() {
  const defaultCats = ["All", "Mobile", "Laptop", "Television", "Radio", "Audio", "Accessories"];
  try {
    const saved = localStorage.getItem("iselectrics-categories");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const activeCats = parsed.filter(c => c.status === "Active").map(c => c.name);
        categories = ["All", ...activeCats];
        return;
      }
    }
  } catch (e) {
    console.error("Failed to parse saved categories", e);
  }
  categories = defaultCats;
}

updateCategoriesList();

let orders = JSON.parse(localStorage.getItem("iselectrics-orders")) || [];

async function loadOrdersFromApi() {
    const token = localStorage.getItem("customer-user-token");
    if (!token) {
        orders = [];
        return;
    }
    
    // Clear old mock data
    orders = [];
    localStorage.removeItem("iselectrics-orders");
    
    try {
        const res = await fetch('/api/orders', {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        if (res.ok) {
            const data = await res.json();
            orders = data.map(o => ({
                id: "MB" + o.id.toString().padStart(6, '0'),
                dbId: o.id,
                productId: o.product_id.toString(),
                status: o.status || "Pending",
                date: formatDate(o.created_at),
                qty: o.qty || 1,
                total: o.total,
                shippingAddress: o.shipping_address,
                email: o.email,
                color: o.color || "",
                product: o.product // Optional: embed product data if returned
            }));
            localStorage.setItem("iselectrics-orders", JSON.stringify(orders));
            updateNavButtons();
            if (state.view === "orders") renderOrders();
        }
    } catch (e) {
        console.error("Failed to load orders from API", e);
    }
}
loadOrdersFromApi();
let addresses = [];
async function loadAddressesFromApi() {
    const token = localStorage.getItem("customer-user-token");
    if (!token) {
        addresses = [];
        return;
    }
    try {
        const res = await fetch('/api/user/addresses', {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        if (res.ok) {
            addresses = await res.json();
            if (state.view === "addresses") renderAddresses();
            if (state.view === "checkout") renderCheckout();
        }
    } catch (e) {
        console.error("Failed to load addresses from API", e);
    }
}
loadAddressesFromApi();

let userReferralsList = [];
async function loadUserReferralsFromApi() {
    const token = localStorage.getItem("customer-user-token");
    if (!token) {
        userReferralsList = [];
        return;
    }
    try {
        const res = await fetch('/api/user/referrals', {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        if (res.ok) {
            userReferralsList = await res.json();
            if (state.view === "wallet") renderWallet();
        }
    } catch (e) {
        console.error("Failed to load referrals from API", e);
    }
}
loadUserReferralsFromApi();

const transactions = [];
let wishlistIds = [];
const recentIds = ["phone-case", "earbuds", "charger", "retro-radio", "dell-laptop", "sony-laptop"];

let payoutMethods = [];
let payoutViewMode = 'list'; // 'list', 'add', 'edit'
let payoutCurrentTab = 'bank'; // 'bank', 'upi'
let payoutEditingMethod = null;
let payoutQrBase64 = '';
let payoutEditQrBase64 = '';

function getWishlistKey() {
  const token = localStorage.getItem("customer-user-token");
  const isAuthenticated = localStorage.getItem("user-authenticated") === "true" && token && token !== "null" && token !== "undefined";
  if (isAuthenticated) {
    const userPhone = localStorage.getItem("user-phone") || "authenticated";
    return `wishlist-${userPhone}`;
  }
  return "guest-wishlist";
}

function loadWishlist() {
  const key = getWishlistKey();
  wishlistIds = JSON.parse(localStorage.getItem(key) || "[]");
}

function persistWishlist() {
  const key = getWishlistKey();
  localStorage.setItem(key, JSON.stringify(wishlistIds));
}

function toggleWishlist(productId) {
  loadWishlist();
  const idx = wishlistIds.indexOf(productId);
  if (idx > -1) {
    wishlistIds.splice(idx, 1);
    showToast("Removed from wishlist");
  } else {
    wishlistIds.push(productId);
    showToast("Added to wishlist");
  }
  persistWishlist();
  renderAll();
}

function mergeGuestWishlist(userPhone) {
  const guestKey = "guest-wishlist";
  const guestWish = JSON.parse(localStorage.getItem(guestKey) || "[]");
  if (guestWish.length > 0) {
    const userKey = `wishlist-${userPhone}`;
    let userWish = JSON.parse(localStorage.getItem(userKey) || "[]");
    userWish = [...new Set([...userWish, ...guestWish])];
    localStorage.setItem(userKey, JSON.stringify(userWish));
    localStorage.removeItem(guestKey);
  }
}

// Initial load
loadWishlist();

let userProfile = null;
async function loadUserProfile() {
    const token = localStorage.getItem("customer-user-token");
    if (!token) {
        userProfile = null;
        return;
    }
    try {
        const res = await fetch('/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        if (res.ok) {
            userProfile = await res.json();
            localStorage.setItem("user-referral-code", userProfile.referral_code || "");
            localStorage.setItem("user-wallet-balance", userProfile.wallet_balance || "0");
            localStorage.setItem("user-name", userProfile.name);
            localStorage.setItem("user-email", userProfile.email || "");
            localStorage.setItem("user-phone", userProfile.phone || "");
        }
    } catch (e) {
        console.error("Failed to load user profile", e);
    }
}
function getAppBaseUrl() {
  let path = window.location.pathname;
  path = path.replace(/\/(index\.php|admin\.php|admin|index|ref\/.*)$/i, '/');
  if (!path.endsWith('/')) {
    path += '/';
  }
  return window.location.origin + path;
}

function cleanReferralCode(str) {
  if (!str) return "";
  str = str.trim();
  
  // 1. Try to extract from URL if present (e.g. ?ref=CODE or /ref/CODE)
  const urlMatch = str.match(/(?:ref[=/])([A-Za-z0-9]+)/i);
  let matchedStr = "";
  if (urlMatch && urlMatch[1]) {
    matchedStr = urlMatch[1];
  } else {
    // 2. If it is a whole message, look for a word that matches the referral code pattern.
    const words = str.split(/[\s\*,!:\?]+/);
    // Find a word containing digits and letters first
    for (let word of words) {
      word = word.replace(/[^A-Za-z0-9]/g, '');
      if (word.length >= 5) {
        if (/[A-Za-z]/.test(word) && /[0-9]/.test(word)) {
          matchedStr = word;
          break;
        }
      }
    }
    
    // Fallback to any suitable word if none has both letters and digits
    if (!matchedStr) {
      const excludeWords = ["HTTP", "HTTPS", "ISELECTRICS", "SIGN", "UP", "CODE", "REFERRAL", "GET", "REWARDS", "AMAZING", "MOBILE", "COVERS", "PLAY", "FOR"];
      for (let word of words) {
        word = word.replace(/[^A-Za-z0-9]/g, '');
        if (word.length >= 6 && word.length <= 10) {
          const upperWord = word.toUpperCase();
          if (!excludeWords.includes(upperWord) && !upperWord.startsWith('HTTP')) {
            matchedStr = word;
            break;
          }
        }
      }
    }
  }
  
  if (!matchedStr) {
    matchedStr = str.replace(/[^A-Za-z0-9]/g, '');
  }
  
  // Clean up any metadata words joined at start or end
  let cleaned = matchedStr.replace(/^(use|code|ref)/i, '');
  cleaned = cleaned.replace(/(use|code|ref)$/i, '');
  
  return cleaned.toUpperCase() || matchedStr.toUpperCase();
}

loadUserProfile();
const state = {
  view: "home",
  selectedCategory: "All",
  search: "",
  cart: JSON.parse(localStorage.getItem("iselectrics-cart") || "{}"),
  productId: products[0].id,
  payment: "UPI",
  paymentMethod: "Online",
  checkoutStep: 1,
  urlReferralCode: null,
  lastPlacedOrder: null,
  checkoutRedirect: false,
  drawerProductId: null,
  drawerSelectedColor: "",
  drawerSelectedModel: "",
  drawerQty: 1
};
window.__iselectricsStateReady = true;

const views = [...document.querySelectorAll(".view")].reduce((acc, view) => {
  acc[view.dataset.view] = view;
  return acc;
}, {});

// Gmail web compose — opens directly in browser, works on ALL devices without any email app
const SUPPORT_EMAIL = "support@zappdeal.com";
const SUPPORT_GMAIL_URL = "https://mail.google.com/mail/?view=cm&fs=1&to=support%40zappdeal.com&su=Support%20Request&body=Hi%20Support%20Team%2C%0A%0AI%20need%20help%20with%3A%0A%0A-------------------------%0AName%3A%0APhone%3A%0AIssue%20Description%3A%0A%0A-------------------------%0A%0AThanks.";

function getSupportUrl() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  if (isMobile) {
    return "mailto:support@zappdeal.com?subject=Support%20Request&body=Hi%20Support%20Team%2C%0A%0AI%20need%20help%20with%3A%0A%0A-------------------------%0AName%3A%0APhone%3A%0AIssue%20Description%3A%0A%0A-------------------------%0A%0AThanks.";
  }
  return SUPPORT_GMAIL_URL;
}

// Open support email — triggers native mail client or web compose
window.openMailto = function(url) {
  if (url.startsWith("mailto:")) {
    window.location.href = url;
  } else {
    window.open(url, '_blank');
  }
};

const icons = {
  home: '<path d="M3 10.5 12 3l9 7.5v8a2 2 0 0 1-2 2h-4.5v-6h-5v6H5a2 2 0 0 1-2-2z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  cart: '<path d="M6 6h15l-2 9H8L6 3H3"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>',
  settings: '<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M4 12a8 8 0 0 1 .1-1.3l-1.7-1.3 2-3.4 2 .8a8.2 8.2 0 0 1 2.2-1.3L9 3h4l.4 2.5a8.2 8.2 0 0 1 2.2 1.3l2-.8 2 3.4-1.7 1.3A8 8 0 0 1 20 12a8 8 0 0 1-.1 1.3l1.7 1.3-2 3.4-2-.8a8.2 8.2 0 0 1-2.2 1.3L15 21h-4l-.4-2.5a8.2 8.2 0 0 1-2.2-1.3l-2 .8-2-3.4 1.7-1.3A8 8 0 0 1 4 12z"/>',
  filter: '<path d="M4 7h10"/><path d="M18 7h2"/><circle cx="16" cy="7" r="2"/><path d="M4 17h2"/><path d="M10 17h10"/><circle cx="8" cy="17" r="2"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  lightning: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" stroke="none"/>',
  bag: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  back: '<path d="M15 18 9 12l6-6"/>',
  heart: '<path d="M20.8 8.6a5.4 5.4 0 0 0-9-3.7 5.4 5.4 0 0 0-9 3.7c0 6.1 9 11.4 9 11.4s9-5.3 9-11.4z"/>',
  trash: '<path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M6 7l1 14h10l1-14"/><path d="M9 7V4h6v3"/>',
  shield: '<path d="M12 3 5 6v5c0 5 3.5 8.5 7 10 3.5-1.5 7-5 7-10V6z"/><path d="m9 12 2 2 4-5"/>',
  truck: '<path d="M3 6h11v10H3z"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2"/><path d="M3 12A9 9 0 0 1 18.5 5.8"/><path d="M3 19v-5h5"/><path d="M21 5v5h-5"/>',
  spark: '<path d="m12 3 2.2 6.4L21 12l-6.8 2.6L12 21l-2.2-6.4L3 12l6.8-2.6z"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 5.2 12 19.8 19.8 0 0 1 2.1 3.4 2 2 0 0 1 4.1 1h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 8.7a16 16 0 0 0 7.3 7.3l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/>',
  pin: '<path d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  box: '<path d="m21 8-9-5-9 5 9 5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
  wallet: '<path d="M4 7h15a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V5a2 2 0 0 0 2 2z"/><path d="M16 13h5"/>',
  support: '<path d="M12 3a8 8 0 0 0-8 8v3a3 3 0 0 0 3 3h1v-6H5a7 7 0 0 1 14 0h-3v6h1a3 3 0 0 1-3 3h-2"/><path d="M12 20h2"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  gift: '<path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  bank: '<path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2 2 7h20z"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  slash: '<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>',
  'credit-card': '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.spark}</svg>`;
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

function parseColorAndModel(colorStr) {
  if (!colorStr) return { color: "", model: "" };
  const match = colorStr.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    return {
      color: match[1].trim(),
      model: match[2].trim()
    };
  }
  if (colorStr.startsWith("(")) {
    return {
      color: "",
      model: colorStr.slice(1, -1).trim()
    };
  }
  return {
    color: colorStr.trim(),
    model: ""
  };
}

function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function restrictPhoneInput(input) {
  if (!input) return;
  input.placeholder = "9876543210";
  input.setAttribute("maxlength", "10");

  // Only manage the disabled state if the submit button started as disabled
  // (login/signup forms). Address form button has no disabled attr so we skip it.
  const form = input.closest('form');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  const managedBtn = (submitBtn && submitBtn.hasAttribute('disabled')) ? submitBtn : null;

  function syncBtn() {
    if (managedBtn) {
      managedBtn.disabled = (input.value.replace(/\D/g, '').length !== 10);
    }
  }

  // Set initial state
  syncBtn();

  input.addEventListener("keypress", function (e) {
    if (e.key < "0" || e.key > "9") {
      e.preventDefault();
    }
  });

  input.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
    syncBtn();
  });

  input.addEventListener("focus", function () {
    this.dataset.placeholder = this.placeholder;
    this.placeholder = "";
  });

  input.addEventListener("blur", function () {
    this.placeholder = this.dataset.placeholder || "9876543210";
  });
}

function money(value) {
  return `Rs.${Number(value).toLocaleString("en-IN")}`;
}

function persistCart() {
  localStorage.setItem("iselectrics-cart", JSON.stringify(state.cart));
}

function cartCount() {
  return Object.values(state.cart).reduce((sum, qty) => sum + qty, 0);
}

function cartItems() {
  return Object.entries(state.cart)
    .map(([key, qty]) => {
      const parts = key.split(":");
      const id = parts[0];
      const color = parts[1] || "";
      const model = parts[2] || "";
      const baseProduct = products.find((p) => p.id === id);
      if (!baseProduct) return null;
      return { 
        ...baseProduct, 
        cartKey: key, 
        selectedColor: color, 
        selectedModel: model, 
        qty 
      };
    })
    .filter(Boolean);
}

function cartTotal() {
  return cartItems().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerHTML = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function filteredProducts() {
  const query = state.search.trim().toLowerCase();
  return products.filter((product) => {
    const inCategory = state.selectedCategory === "All" || product.category === state.selectedCategory;
    const modelText = normalizeProductModels(product).join(" ");
    const inSearch = !query || `${product.name} ${product.category} ${product.detail} ${modelText}`.toLowerCase().includes(query);
    return inCategory && inSearch;
  });
}

function productCard(product) {
  const isWish = wishlistIds.includes(product.id);
  return `
    <article class="product-card" data-open-product="${product.id}">
      <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
      <h3>${product.name}</h3>
      <div class="price-line">
        <span class="price">${money(product.price)}</span>
        <span class="strike">${money(product.oldPrice)}</span>
      </div>
      <div class="rating">★ ${product.rating} <span>(${product.reviews})</span></div>
      
      <!-- Select Option Button positioned in the bottom-left -->
      <button class="select-option-btn-card" data-open-drawer="${product.id}">Select Option</button>
      
      <button class="mini-share" data-share-product="${product.id}" data-share-name="${product.name.replace(/'/g, "\\'")}" aria-label="Share ${product.name}">
        ${icon("share")}
      </button>
      <button class="mini-cart" data-open-drawer="${product.id}" aria-label="Select options for ${product.name}">${icon("cart")}</button>
    </article>
  `;
}

function categoryChips() {
  return `
    <div class="chip-row" role="list" aria-label="Categories">
      ${categories.map((category) => `
        <button class="chip ${state.selectedCategory === category ? "is-active" : ""}" data-category="${category}">
          ${category === "All" ? icon("grid") : ""}
          ${category}
        </button>
      `).join("")}
    </div>
  `;
}

function renderAccountSidebar() {
  const sidebar = document.getElementById("account-sidebar");
  if (!sidebar) return;

  const defaultUserName = localStorage.getItem("user-name") || "Guest User";
  const defaultUserEmail = localStorage.getItem("user-email") || "No email added";
  const initials = defaultUserName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  const currentView = state.view;

  const menuItems = [
    { icon: "user", title: "Dashboard", view: "account" },
    { icon: "spark", title: "Referral Program", view: "referral" },
    { icon: "wallet", title: "My Wallet", view: "wallet" },
    { icon: "box", title: "My Orders", view: "orders" },
    { icon: "pin", title: "My Addresses", view: "addresses" },
    { icon: "bank", title: "Payout Methods", view: "payout" },
    { icon: "heart", title: "Wishlist", view: "wishlist", badge: wishlistIds.length },
    { icon: "refresh", title: "Recently Viewed", view: "recent", badge: recentIds.length },
    { icon: "settings", title: "Account Settings", view: "settings" },
    { icon: "support", title: "Help & Support", view: "support" }
  ];

  const menuHtml = menuItems.map(item => {
    const isActive = currentView === item.view;
    const badgeHtml = item.badge ? `<b class="sidebar-badge">${item.badge}</b>` : "";
    return `
      <button class="sidebar-link ${isActive ? 'is-active' : ''}" onclick="setView('${item.view}')">
        <span class="sidebar-icon">${icon(item.icon)}</span>
        <span class="sidebar-text">${item.title}</span>
        ${badgeHtml}
      </button>
    `;
  }).join("");

  sidebar.innerHTML = `
    <div class="sidebar-profile">
      <div class="sidebar-avatar">${initials}</div>
      <div class="sidebar-info">
        <h3 class="sidebar-name">${defaultUserName}</h3>
        <p class="sidebar-email">${defaultUserEmail}</p>
      </div>
    </div>
    <nav class="sidebar-nav">
      ${menuHtml}
      <button class="sidebar-link sidebar-logout-btn" onclick="window.customerLogout()">
        <span class="sidebar-icon">${icon("home")}</span>
        <span class="sidebar-text">Logout</span>
      </button>
    </nav>
    <div class="sidebar-banner" onclick="setView('referral')" style="cursor:pointer;">
      <img src="assets/referral_friends.png" alt="Refer Friends">
      <div class="banner-content">
        <h4>Refer Friends &amp; Earn</h4>
        <p>Get up to ₹500 per referral</p>
      </div>
    </div>
  `;
}

function renderHeader(title = "ZappDeal", subtitle = "") {
  const count = cartCount();
  const titleHtml = title === "ZappDeal" 
    ? `<img src="/assets/logo.png" alt="ZappDeal Logo" style="height: 30px; display: block; object-fit: contain;">`
    : `<strong style="font-weight: 800; letter-spacing: -0.5px; font-size: 28px;">${title}</strong>`;
  return `
    <div class="top-bar">
      <button class="icon-btn" data-nav="account" aria-label="Account">${icon("user")}</button>
      <div class="brand-stack">
        ${titleHtml}
      </div>
      <button class="icon-btn" data-nav="cart" aria-label="Cart" style="position: relative;">
        ${icon("cart")}
        <b class="cart-badge" id="cart-badge" style="position: absolute; top: -5px; right: -5px; background: var(--cyan); color: #0f172a; font-size: 10px; font-weight: 800; min-width: 16px; height: 16px; border-radius: 50%; display: ${count > 0 ? 'flex' : 'none'}; align-items: center; justify-content: center;">${count}</b>
      </button>
    </div>
  `;
}

function renderBackBar(title, right = "") {
  const count = cartCount();
  const defaultRight = `
    <button class="icon-btn" data-nav="cart" aria-label="Cart" style="position: relative;">
      ${icon("cart")}
      <b class="cart-badge" id="backbar-cart-badge" style="position: absolute; top: -5px; right: -5px; background: var(--cyan); color: #0f172a; font-size: 10px; font-weight: 800; min-width: 16px; height: 16px; border-radius: 50%; display: ${count > 0 ? 'flex' : 'none'}; align-items: center; justify-content: center;">${count}</b>
    </button>
  `;
  return `
    <div class="detail-bar">
      <button class="icon-btn" data-back aria-label="Back">${icon("back")}</button>
      <h2>${title}</h2>
      ${right || defaultRight}
    </div>
  `;
}

function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function getProduct(id) {
  return products.find((product) => product.id === id) || products[0];
}

function normalizeProductSections(product) {
  const sections = Array.isArray(product?.sections) ? product.sections : [];
  return {
    newlyLaunched: sections.includes("newly-launched") || product?.newlyLaunched === true,
    recommended: sections.includes("recommended") || product?.recommended === true,
    style: sections.includes("style") || product?.style === true
  };
}

function productsForSection(sectionKey, fallback = []) {
  // Do NOT filter by category here — products tagged with a section key
  // (newly-launched, recommended, style) should always appear on the home screen
  // regardless of what category they belong to.
  const allProducts = products.filter((product) => product);
  const matched = allProducts.filter((product) => normalizeProductSections(product)[sectionKey]);
  if (allProducts.length > 0) {
    return matched;
  }
  return fallback.filter((product) => product);
}

function getRecommendedItemsForProduct(product) {
  if (!product) return [];
  const recItems = productsForSection("recommended", products)
    .filter(p => p && p.id !== product.id && categories.includes(p.category));
  const activeProducts = products.filter(p => p && p.id !== product.id && categories.includes(p.category));
  return recItems.length ? recItems : activeProducts.slice(0, 6);
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

let homeBannersCache = null;

function parseHomeBannersValue(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : null;
  } catch (e) {
    return null;
  }
}

async function loadHomeBannersFromApi() {
  try {
    const res = await fetch('/api/settings', { headers: { 'Accept': 'application/json' } });
    if (!res.ok) return;
    const settings = await res.json();
    const apiBanners = parseHomeBannersValue(settings.home_banners);
    if (apiBanners) {
      homeBannersCache = apiBanners;
      localStorage.setItem("iselectrics-home-banners", JSON.stringify(apiBanners));
    }
    if (settings.categories) {
      const parsedCats = JSON.parse(settings.categories);
      if (Array.isArray(parsedCats)) {
        localStorage.setItem("iselectrics-categories", settings.categories);
        updateCategoriesList();
      }
    }
    if (window.__iselectricsStateReady) {
      renderAll();
    }
  } catch (e) {
    console.error("Failed to load settings from API", e);
  }
}

function getHomeBanners() {
  try {
    const def = getDefaultHomeBanner();
    if (Array.isArray(homeBannersCache)) return homeBannersCache;

    const saved = localStorage.getItem("iselectrics-home-banners");
    if (!saved) {
      const old = localStorage.getItem("iselectrics-home-banner");
      if (old) {
        return [JSON.parse(old)];
      }
      return [def];
    }
    return JSON.parse(saved);
  } catch(e) {
    return [];
  }
}

loadHomeBannersFromApi();

function getHomeBannersFiltered() {
  const banners = getHomeBanners();
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    // Keep banners that have either a mobile image or a desktop image
    return banners.filter(b => (b.image && b.image !== "") || (b.mobileImage && b.mobileImage !== ""));
  } else {
    // Keep only banners that have a desktop image
    return banners.filter(b => b.image && b.image !== "none" && b.image !== "");
  }
}

function getMobileBgUrl(banner) {
  if (!banner) return "none";
  const mob = banner.mobileImage;
  const hasMobile = mob && mob !== "null" && mob !== "undefined" && mob !== "";
  const bg = hasMobile ? mob : banner.image;
  return bg ? `url('${bg.replace(/'/g, "%27")}')` : "none";
}

window.changeHeroSlide = function(idx) {
  const banners = getHomeBannersFiltered();
  if (!banners.length) return;
  state.activeBannerIndex = idx;
  
  const heroSec = document.querySelector(".premium-hero");
  if (heroSec) {
    const banner = banners[state.activeBannerIndex];
    if (banner.image || (banner.mobileImage && banner.mobileImage !== "null" && banner.mobileImage !== "undefined" && banner.mobileImage !== "")) {
      const desktopBgUrl = banner.image ? `url('${banner.image.replace(/'/g, "%27")}')` : "none";
      const mobileBgUrl = getMobileBgUrl(banner);
      heroSec.style.setProperty('--desktop-bg', desktopBgUrl);
      heroSec.style.setProperty('--mobile-bg', mobileBgUrl);
    } else {
      heroSec.style.setProperty('--desktop-bg', 'none');
      heroSec.style.setProperty('--mobile-bg', 'none');
    }

    if (banner.redirectUrl) {
      heroSec.style.cursor = 'pointer';
      heroSec.onclick = (e) => {
        if (!e.target.closest('button') && !e.target.closest('.hero-carousel-dots')) {
          window.location.href = banner.redirectUrl;
        }
      };
    } else {
      heroSec.style.cursor = 'default';
      heroSec.onclick = null;
    }
    
    const hasBadge = !!banner.badge;
    const hasTitle = !!banner.title;
    const hasSubtitle = !!banner.subtitle;
    const hasShowcase = !!banner.productImage && banner.productImage !== "assets/phone-case.png" && banner.productImage !== "";

    heroSec.innerHTML = `
      <div class="hero-glow"></div>
      <div class="hero-content" style="${!hasShowcase ? 'grid-column: 1 / -1; width: 100%; max-width: 100%;' : ''}">
        ${hasBadge ? `<span class="hero-badge">${banner.badge}</span>` : ""}
        ${hasTitle ? `<h1>${banner.title}</h1>` : ""}
        ${hasSubtitle ? `<p>${banner.subtitle}</p>` : ""}
        <div class="hero-actions">
          <button class="primary-btn neon-btn" onclick="state.selectedCategory='All'; state.search=''; renderAll(); setView('categories');">${banner?.cta || "Shop Now"}</button>
          <button class="secondary-btn" data-nav="categories">Explore All</button>
        </div>
      </div>
      ${hasShowcase ? `
        <div class="hero-image-wrapper">
          <div class="hero-image-glow"></div>
          <img class="hero-product-img" src="${banner.productImage}" alt="${banner.title || "Showcase"}">
        </div>
      ` : ""}
      ${banners.length > 1 ? `
        <div class="hero-carousel-dots">
          ${banners.map((_, i) => `
            <span onclick="event.stopPropagation(); window.changeHeroSlide(${i})" class="hero-carousel-dot ${i === idx ? 'is-active' : ''}"></span>
          `).join("")}
        </div>
      ` : ""}
    `;
  }
  
  startHeroAutoSlide(banners);
};

function startHeroAutoSlide(banners) {
  if (window.__bannerInterval) clearInterval(window.__bannerInterval);
  if (banners && banners.length > 1) {
    window.__bannerInterval = setInterval(() => {
      const nextIdx = (state.activeBannerIndex + 1) % banners.length;
      window.changeHeroSlide(nextIdx);
    }, 3000);
  }
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
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

function getIphoneModels() {
  const defaultModels = [
    { name: "iPhone 17 Pro Max", image: "assets/phone-case.png" },
    { name: "iPhone 17 Pro", image: "assets/phone-case.png" },
    { name: "iPhone 17", image: "assets/phone-case.png" },
    { name: "iPhone 16 Series", image: "assets/phone-case.png" },
    { name: "iPhone 15 Series", image: "assets/phone-case.png" }
  ];
  try {
    const saved = localStorage.getItem("iselectrics-iphone-models");
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        // If admin explicitly saved an empty list, honour that (hide section)
        return parsed;
      }
    }
    // No API data ever loaded — show defaults so homepage isn't blank
    return defaultModels;
  } catch (e) {
    return defaultModels;
  }
}

function renderIphoneModelsCarousel() {
  const models = getIphoneModels();
  if (!models || models.length === 0) {
    return '';
  }
  
  const displayModels = models;
  
  return `
    <div class="iphone-models-carousel-wrapper">
      <div class="iphone-models-carousel">
        ${displayModels.map(model => {
          const imgUrl = resolveImageUrl(model.image) || "assets/phone-case.png";
          const modelName = model.name;
          return `
            <div class="iphone-model-card-item" onclick="state.search='${modelName.replace(/'/g, "\\'")}'; setView('search');">
              <div class="iphone-model-card-image-wrap">
                <img src="${imgUrl}" alt="${modelName}">
              </div>
              <div class="iphone-model-card-title">${modelName}</div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderIphoneModelsChips() {
  const models = getIphoneModels();
  if (!models || models.length === 0) {
    return '';
  }
  
  return models.map(model => {
    const modelName = model.name;
    return `
      <button class="model-chip" onclick="state.search='${modelName.replace(/'/g, "\\'")}'; setView('search');">
        <span>${modelName}</span>
        <span class="chevron">${icon("arrow")}</span>
      </button>
    `;
  }).join("");
}

function renderHome() {
  const coverProducts = products.filter(p => p.category === 'Mobile').slice(0, 4);
  const newlyLaunched = productsForSection("newlyLaunched", coverProducts.length > 0 ? coverProducts : products.slice(0, 4)).slice(0, 4);
  const recommendedProducts = productsForSection("recommended", products.slice(0, 4)).slice(0, 4);
  const styleProducts = productsForSection("style", coverProducts.length > 0 ? coverProducts : products.slice(0, 4)).slice(0, 4);
  
  const banners = getHomeBannersFiltered();
  if (state.activeBannerIndex === undefined || state.activeBannerIndex >= banners.length) {
    state.activeBannerIndex = 0;
  }
  const activeBanner = banners[state.activeBannerIndex];
  const desktopBgUrl = activeBanner?.image ? `url('${activeBanner.image.replace(/'/g, "%27")}')` : "none";
  const mobileBgUrl = getMobileBgUrl(activeBanner);
  const cursorStyle = activeBanner?.redirectUrl ? 'pointer' : 'default';
  const heroStyle = `style="--desktop-bg: ${desktopBgUrl}; --mobile-bg: ${mobileBgUrl}; cursor: ${cursorStyle};"`;

  const hasBadge = !!activeBanner?.badge;
  const hasTitle = !!activeBanner?.title;
  const hasSubtitle = !!activeBanner?.subtitle;
  const hasShowcase = !!activeBanner?.productImage && activeBanner.productImage !== "assets/phone-case.png" && activeBanner.productImage !== "";
  const isMobileView = window.innerWidth <= 768;

  const iphoneModels = getIphoneModels();
  const hasIphoneModels = iphoneModels && iphoneModels.length > 0;
  
  const styles = getShopByStyles();
  const hasStyles = styles && styles.length > 0;

  views.home.innerHTML = `
    ${renderHeader()}
    
    <!-- iPhone Models Section (Mobile Only) -->
    ${hasIphoneModels ? `
    <div class="mobile-models-carousel-container">
      ${renderIphoneModelsCarousel()}
    </div>
    ` : ""}
    
    <!-- Premium Hero Section -->
    <section class="premium-hero" ${heroStyle} onclick="if (!event.target.closest('button') && !event.target.closest('.hero-carousel-dots') && '${activeBanner?.redirectUrl || ''}') window.location.href='${activeBanner?.redirectUrl || ''}';">
      <div class="hero-glow"></div>
      <div class="hero-content" style="${isMobileView ? 'text-align: center; margin: 0 auto;' : ''} ${!hasShowcase ? 'grid-column: 1 / -1; width: 100%; max-width: 100%;' : ''}">
        ${hasBadge ? `<span class="hero-badge">${activeBanner.badge}</span>` : ""}
        ${hasTitle ? `<h1>${activeBanner.title}</h1>` : ""}
        ${hasSubtitle ? `<p>${activeBanner.subtitle}</p>` : ""}
        <div class="hero-actions" style="${isMobileView ? 'justify-content: center;' : ''}">
          <button class="primary-btn neon-btn" onclick="state.selectedCategory='All'; state.search=''; renderAll(); setView('categories');">${activeBanner?.cta || "Shop Now"}</button>
          ${!isMobileView ? `<button class="secondary-btn" data-nav="categories">Explore All</button>` : ''}
        </div>
      </div>
      ${hasShowcase ? `
        <div class="hero-image-wrapper">
          <div class="hero-image-glow"></div>
          <img class="hero-product-img" src="${activeBanner.productImage}" alt="${activeBanner.title || "Showcase"}">
        </div>
      ` : ""}
      ${banners.length > 1 ? `
        <div class="hero-carousel-dots">
          ${banners.map((_, i) => `
            <span onclick="event.stopPropagation(); window.changeHeroSlide(${i})" class="hero-carousel-dot ${i === state.activeBannerIndex ? 'is-active' : ''}"></span>
          `).join("")}
        </div>
      ` : ""}
    </section>
 
    <!-- Desktop Trust Indicators Row (4 columns) -->
    <div class="trust-indicators-grid desktop-only">
      <div class="trust-item">
        <div class="trust-icon">${icon("truck")}</div>
        <div class="trust-text">
          <strong>Free Express Shipping</strong>
          <span>Same day dispatch in metros</span>
        </div>
      </div>
      <div class="trust-item">
        <div class="trust-icon">${icon("shield")}</div>
        <div class="trust-text">
          <strong>1 Year Warranty</strong>
          <span>Instant replacement policy</span>
        </div>
      </div>
      <div class="trust-item">
        <div class="trust-icon">${icon("refresh")}</div>
        <div class="trust-text">
          <strong>7-Day Easy Returns</strong>
          <span>Hassle-free reverse pick up</span>
        </div>
      </div>
      <div class="trust-item">
        <div class="trust-icon">${icon("lock")}</div>
        <div class="trust-text">
          <strong>Secure Payment</strong>
          <span>100% SSL encrypted</span>
        </div>
      </div>
    </div>

    <!-- Mobile Trust Indicators Row (4 columns, row layout, split-word labels) -->
    <div class="trust-indicators-grid mobile-only">
      <div class="trust-item">
        <div class="trust-icon">${icon("shield")}</div>
        <div class="trust-text">
          <strong>Premium</strong>
          <strong>Quality</strong>
        </div>
      </div>
      <div class="trust-item">
        <div class="trust-icon">${icon("truck")}</div>
        <div class="trust-text">
          <strong>Free</strong>
          <strong>Shipping</strong>
        </div>
      </div>
      <div class="trust-item">
        <div class="trust-icon">${icon("refresh")}</div>
        <div class="trust-text">
          <strong>Easy</strong>
          <strong>Returns</strong>
        </div>
      </div>
      <div class="trust-item">
        <div class="trust-icon">${icon("lock")}</div>
        <div class="trust-text">
          <strong>Secure</strong>
          <strong>Payment</strong>
        </div>
      </div>
    </div>

    <!-- Shop by iPhone Model Section (Desktop Only) -->
    ${hasIphoneModels ? `
    <div class="desktop-models-grid-container">
      <div class="section-head">
        <h2>Shop by iPhone Model</h2>
      </div>
      <div class="iphone-models-slider-wrapper">
        <button class="iphone-slide-arrow iphone-slide-prev" onclick="document.querySelector('.desktop-models-grid-container .iphone-models-carousel').scrollBy({left: -280, behavior: 'smooth'})" aria-label="Previous models">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        ${renderIphoneModelsCarousel()}
        <button class="iphone-slide-arrow iphone-slide-next" onclick="document.querySelector('.desktop-models-grid-container .iphone-models-carousel').scrollBy({left: 280, behavior: 'smooth'})" aria-label="Next models">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
    ` : ""}

    <!-- Newly Launched Cases -->
    ${newlyLaunched.length > 0 ? `
    <div class="section-head">
      <h2>Newly Launched Cases</h2>
      <button class="link-btn" data-nav="categories">View All ${icon("arrow")}</button>
    </div>
    <div class="product-grid">
      ${newlyLaunched.map(productCard).join("")}
    </div>
    ` : ""}

    <!-- Recommended Products -->
    ${recommendedProducts.length > 0 ? `
    <div class="section-head">
      <h2>Recommended</h2>
      <button class="link-btn" data-nav="categories">View All ${icon("arrow")}</button>
    </div>
    <div class="product-grid">
      ${recommendedProducts.map(productCard).join("")}
    </div>
    ` : ""}

    <!-- Shop by Style (Banners Grid) -->
    ${hasStyles ? `
    <div class="section-head">
      <h2>Shop by Style</h2>
    </div>
    <div class="styles-banners-grid">
      ${styles.map(styleItem => {
        const bgStyle = styleItem.image ? `style="background-image: url('${styleItem.image.replace(/'/g, "%27")}');"` : "";
        const styleClass = styleItem.search_term.toLowerCase() === 'clear' ? 'clear-case' :
                           styleItem.search_term.toLowerCase() === 'leather' ? 'leather-case' :
                           styleItem.search_term.toLowerCase() === 'rugged' ? 'rugged-case' :
                           styleItem.search_term.toLowerCase() === 'silicone' ? 'silicone-case' : '';
        return `
          <div class="style-banner ${styleClass}" ${bgStyle} onclick="state.search='${styleItem.search_term.replace(/'/g, "\\'")}'; setView('search');">
            <div class="banner-overlay"></div>
            <div class="banner-text">
              <h3>${styleItem.name}</h3>
              <p>${styleItem.description || ""}</p>
            </div>
          </div>
        `;
      }).join("")}
    </div>
    ` : ""}

    <!-- Style Picks -->
    ${styleProducts.length > 0 ? `
    <div class="section-head">
      <h2>Style Picks</h2>
      <button class="link-btn" data-nav="categories">View All ${icon("arrow")}</button>
    </div>
    <div class="product-grid">
      ${styleProducts.map(productCard).join("")}
    </div>
    ` : ""}

    <!-- Customer Reviews Section -->
    <div class="section-head">
      <h2>What Customers Say</h2>
    </div>
    <div class="customer-reviews-strip">
      <div class="review-card">
        <div class="review-stars">★★★★★</div>
        <p class="review-comment">"The CarbonShield MagCase fits perfectly. The carbon texture feels incredibly premium and MagSafe connection is super solid!"</p>
        <div class="review-author">
          <div class="avatar-small">SM</div>
          <div>
            <strong>Sudhanshu M.</strong>
            <span>Verified Buyer</span>
          </div>
        </div>
      </div>
      <div class="review-card">
        <div class="review-stars">★★★★★</div>
        <p class="review-comment">"Bought the ClearGlow case. It's been two months and there is absolutely zero yellowing. Buttons are clicky and tactile."</p>
        <div class="review-author">
          <div class="avatar-small">RV</div>
          <div>
            <strong>Rahul V.</strong>
            <span>Verified Buyer</span>
          </div>
        </div>
      </div>
      <div class="review-card">
        <div class="review-stars">★★★★★</div>
        <p class="review-comment">"The saddle brown leather case ages beautifully. Getting a gorgeous patina. Fits my 17 Pro Max like a glove!"</p>
        <div class="review-author">
          <div class="avatar-small">PS</div>
          <div>
            <strong>Priya S.</strong>
            <span>Verified Buyer</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recently Viewed Section -->
    <div class="section-head">
      <h2>Recently Viewed</h2>
      <button class="link-btn" data-nav="recent">View History ${icon("arrow")}</button>
    </div>
    <div class="product-strip">
      ${recentIds.map(getProduct).filter(Boolean).slice(0, 4).map(productCard).join("")}
    </div>
  `;
  startHeroAutoSlide(banners);
}

function renderCategories() {
  const list = filteredProducts();
  views.categories.innerHTML = `
    ${renderBackBar("Shop")}
    <div class="search-row">
      <label class="search-box">
        ${icon("search")}
        <input data-search-input type="search" placeholder="Search products..." value="${state.search}">
      </label>
      <button class="filter-btn" data-clear-filter aria-label="Clear filters">${icon("refresh")}</button>
    </div>
    ${categoryChips()}
    <div class="section-head">
      <h2>${state.selectedCategory === "All" ? "All Products" : state.selectedCategory}</h2>
      <span class="eyebrow">${list.length} items</span>
    </div>
    ${list.length ? `<div class="product-grid">${list.map(productCard).join("")}</div>` : emptyState("search", "No products found", "Try a different category or search term.")}
  `;
}

function renderSearch() {
  views.search.innerHTML = `
    ${renderBackBar("Search")}
    <div class="support-hero">
      <h1>Find your next gadget</h1>
      <div class="search-row">
        <label class="search-box">
          ${icon("search")}
          <input data-search-input autofocus type="search" placeholder="Search for laptop, mobile, audio..." value="${state.search}">
        </label>
      </div>
    </div>
    ${categoryChips()}
    <div class="product-grid">${filteredProducts().map(productCard).join("")}</div>
  `;
}

// Color mapping utility
function getColorHex(colorName) {
  if (!colorName) return '#6366f1';
  const name = colorName.trim().toLowerCase();
  const map = {
    'lavender blue': '#a4b1e6',
    'cobalt blue': '#1e40af',
    'sky blue': '#7dd3fc',
    'graphite': '#374151',
    'silver': '#d1d5db',
    'mist': '#f3f4f6',
    'black': '#111827',
    'blue': '#A855F7',
    'sand': '#f59e0b',
    'clear': 'rgba(255,255,255,0.2)',
    'orange': '#f97316',
    'white': '#ffffff',
    'teal': '#14b8a6',
    'walnut': '#78350f',
    'cream': '#fef3c7',
    'pearl': '#f5f5f4',
    'brown': '#8b4513',
    'red': '#ef4444',
    'green': '#22c55e',
    'yellow': '#eab308',
    'pink': '#ec4899',
    'purple': '#a855f7',
    'gray': '#6b7280',
    'grey': '#6b7280'
  };
  return map[name] || colorName;
}

function getColorNameAndHex(colorStr) {
  if (!colorStr) return { name: "", hex: "#6366f1" };
  if (colorStr.includes("||")) {
    const parts = colorStr.split("||");
    return { name: parts[0].trim(), hex: parts[1].trim() };
  }
  const name = colorStr.trim();
  return { name: name, hex: getColorHex(name) };
}

// Product reviews database helper
function getProductReviews(productId) {
  let reviewsDb = JSON.parse(localStorage.getItem("iselectrics-reviews-db"));
  if (!reviewsDb) {
    reviewsDb = [
      {
        id: 1,
        productId: "3", // Racing Stripe Car Silicone Case
        customer: "Rahul Verma",
        avatar: "RV",
        rating: 5,
        verified: true,
        date: "May 19, 2026",
        comment: "Absolutely brilliant case! The racing stripes look super sporty and the silicone feel is top-notch. Highly recommended!",
        likes: 24
      },
      {
        id: 2,
        productId: "3",
        customer: "Priya Sharma",
        avatar: "PS",
        rating: 5,
        verified: true,
        date: "May 18, 2026",
        comment: "Beautiful texture, very tactile buttons, and offers full-coverage drop protection. Worth every rupee!",
        likes: 18
      },
      {
        id: 3,
        productId: "3",
        customer: "Vikram Singh",
        avatar: "VS",
        rating: 4,
        verified: true,
        date: "May 15, 2026",
        comment: "Excellent cover, premium packaging. It feels very sturdy and the colors look vibrant under light.",
        likes: 9
      },
      {
        id: 4,
        productId: "1", // Dell Laptop
        customer: "Aarav Mehta",
        avatar: "AM",
        rating: 5,
        verified: true,
        date: "May 10, 2026",
        comment: "Outstanding laptop for this price range. Super smooth multitasking and battery lasts all day.",
        likes: 31
      },
      {
        id: 5,
        productId: "2", // Pulse Headphones
        customer: "Sneha Reddy",
        avatar: "SR",
        rating: 5,
        verified: true,
        date: "May 12, 2026",
        comment: "Amazing sound quality and active noise cancellation works wonders in loud environments. Very comfortable cushions.",
        likes: 42
      }
    ];
    localStorage.setItem("iselectrics-reviews-db", JSON.stringify(reviewsDb));
  }
  
  // Robust lookup supporting both numeric string database ids and alphanumeric mock ids
  return reviewsDb.filter(r => 
    r.productId.toString() === productId.toString() ||
    (productId === "3" && r.productId === "phone-case") ||
    (productId === "phone-case" && r.productId === "3") ||
    (productId === "1" && r.productId === "dell-laptop") ||
    (productId === "dell-laptop" && r.productId === "1") ||
    (productId === "2" && r.productId === "headphones") ||
    (productId === "headphones" && r.productId === "2")
  );
}

// Global methods for product page state manipulation
window.updateProductQty = function(change) {
  state.productQty = Math.max(1, (state.productQty || 1) + change);
  renderProduct();
};

window.selectProductModel = function(model) {
  state.selectedModel = model;

  const product = products.find((item) => item.id === state.productId) || products[0];
  const availableColors = getProductColorsForModel(product, model);
  
  if (availableColors.length === 1) {
    const cleanColor = getColorNameAndHex(availableColors[0]).name;
    state.selectedColor = cleanColor;
  } else {
    const cleanAvailableColors = availableColors.map(c => getColorNameAndHex(c).name.toLowerCase());
    if (state.selectedColor && !cleanAvailableColors.includes(state.selectedColor.toLowerCase())) {
      state.selectedColor = "";
    }
  }

  // Find the index of the first image slide that matches the selected model exactly
  const slides = getProductSlides(product, state.selectedColor, model);
  const matchingIdx = slides.findIndex(slide => slide.type === 'image' && slide.model && slide.model.toLowerCase() === model.toLowerCase());
  if (matchingIdx !== -1) {
    state.mediaSlideIndex = matchingIdx;
  } else {
    state.mediaSlideIndex = 0;
  }

  renderProduct();
};

window.addCustomProductModel = function() {
  const input = document.getElementById("custom-product-model");
  const model = input?.value.trim();
  if (!model) {
    showToast("Enter an iPhone model");
    return;
  }

  const product = products.find((item) => item.id === state.productId);
  if (!product || !isMobileProduct(product)) return;

  const nextModels = [...new Set([...normalizeProductModels(product), model])];
  product.models = nextModels;
  state.selectedModel = model;
  localStorage.setItem("iselectrics-products", JSON.stringify(products));

  const meta = getProductModelMeta();
  meta[String(product.id)] = { ...(meta[String(product.id)] || {}), models: nextModels };
  localStorage.setItem("iselectrics-product-model-meta", JSON.stringify(meta));

  let configuredModels = [];
  try {
    configuredModels = JSON.parse(localStorage.getItem("iselectrics-iphone-models") || "[]");
  } catch (e) {
    configuredModels = [];
  }
  if (!configuredModels.includes(model)) {
    localStorage.setItem("iselectrics-iphone-models", JSON.stringify([...configuredModels, model]));
  }

  renderProduct();
  showToast("Model added");
};

window.handleProductAddToCart = function(productId, qty, isBuyNow) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const isMobile = isMobileProduct(product);
  const models = normalizeProductModels(product);

  const isModelMissing = isMobile && models.length > 0 && !state.selectedModel;
  const isColorMissing = product && product.colors && product.colors.length > 0 && !state.selectedColor;

  // Buy Now keeps the customer on the product page and jumps to the first missing option.
  if (isBuyNow && (isModelMissing || isColorMissing)) {
    const section = document.getElementById(isModelMissing ? "model-selection-section" : "color-selection-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
      section.animate(
        [
          { boxShadow: "0 0 0 0 rgba(168, 85, 247, 0)" },
          { boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.65)" },
          { boxShadow: "0 0 0 0 rgba(168, 85, 247, 0)" }
        ],
        { duration: 900, easing: "ease-out" }
      );
      window.setTimeout(() => {
        section.querySelector("select, button")?.focus({ preventScroll: true });
      }, 350);
    }
    return;
  }

  // Keep the existing quick-selection drawer for Add to Cart.
  if (isModelMissing || isColorMissing) {
    window.openOptionsDrawer(productId);
    return;
  }

  addToCart(productId, qty);
  if (typeof fbq === "function") {
    fbq('track', 'AddToCart', {
      content_name: product.name,
      content_ids: [product.id.toString()],
      content_type: 'product',
      value: product.price * qty,
      currency: 'INR'
    });
  }
  if (isBuyNow) {
    setView('checkout');
  }
};

window.selectProductColor = function(color) {
  state.selectedColor = color;
  
  // Find the index of the first image slide that matches the selected color exactly
  const product = products.find((item) => item.id === state.productId) || products[0];
  const slides = getProductSlides(product, color, state.selectedModel);
  const matchingIdx = slides.findIndex(slide => slide.type === 'image' && slide.color && slide.color.toLowerCase() === color.toLowerCase());
  if (matchingIdx !== -1) {
    state.mediaSlideIndex = matchingIdx;
  } else {
    state.mediaSlideIndex = 0;
  }
  
  renderProduct();
};

window.toggleMediaSlide = function(dir) {
  const product = products.find((item) => item.id === state.productId) || products[0];
  const slides = getProductSlides(product, state.selectedColor, state.selectedModel);
  const count = slides.length || 1;
  
  if (dir === 'next') {
    state.mediaSlideIndex = (state.mediaSlideIndex + 1) % count;
  } else {
    state.mediaSlideIndex = (state.mediaSlideIndex - 1 + count) % count;
  }
  renderProduct();
};

window.setMediaSlide = function(index) {
  state.mediaSlideIndex = index;
  renderProduct();
};

window.prevMediaSlide = function(e) {
  if (e) e.stopPropagation();
  window.toggleMediaSlide('prev');
};

window.nextMediaSlide = function(e) {
  if (e) e.stopPropagation();
  window.toggleMediaSlide('next');
};

function renderRecommendedProductCard(product) {
  const discountPercent = Math.round((1 - product.price / product.oldPrice) * 100) || 0;
  return `
    <article class="rec-product-vertical-card" data-open-product="${product.id}" style="cursor:pointer;">
      <div class="rec-product-image-container-vertical">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="rec-product-details-vertical">
        <h3 class="rec-product-title-vertical">${product.name}</h3>
        <p class="rec-product-desc-vertical">${product.detail || "Premium product with high quality guarantee and warranty support."}</p>
        <div class="rec-product-price-row-vertical">
          <span class="rec-product-price-vertical">${money(product.price)}</span>
          ${product.oldPrice && product.oldPrice > product.price ? `
            <span class="rec-product-strike-vertical">${money(product.oldPrice)}</span>
            <span class="rec-product-discount-badge-vertical">-${discountPercent}%</span>
          ` : ''}
        </div>
        <button class="primary-btn rec-product-buy-btn" data-open-product="${product.id}">
          Buy Now ${icon("arrow")}
        </button>
      </div>
    </article>
  `;
}

function renderRecommendedSliderOnly() {
  const container = document.getElementById("recommended-product-slider");
  if (!container) return;
  
  const product = products.find((item) => item.id === state.productId) || products[0];
  const recommendedItems = getRecommendedItemsForProduct(product);

  const recommendedChunks = [];
  for (let i = 0; i < recommendedItems.length; i += 2) {
    const chunk = [recommendedItems[i]];
    if (i + 1 < recommendedItems.length) {
      chunk.push(recommendedItems[i + 1]);
    } else {
      chunk.push(recommendedItems[0]);
    }
    recommendedChunks.push(chunk);
  }

  if (typeof state.recommendedSlideIndex === "undefined") {
    state.recommendedSlideIndex = 0;
  }
  if (state.recommendedSlideIndex >= recommendedChunks.length) {
    state.recommendedSlideIndex = 0;
  }

  const activeChunk = recommendedChunks[state.recommendedSlideIndex];
  if (!activeChunk) return;

  container.innerHTML = `
    <div class="rec-product-grid-two">
      ${activeChunk.map(prod => renderRecommendedProductCard(prod)).join("")}
    </div>
  `;
  
  // Update dots active class
  const dotsContainer = document.querySelector(".recommended-slider-dots");
  if (dotsContainer) {
    dotsContainer.innerHTML = recommendedChunks.map((_, idx) => `
      <span class="rec-dot-indicator ${state.recommendedSlideIndex === idx ? 'is-active' : ''}" onclick="window.setRecommendedSlide(${idx})"></span>
    `).join("");
  }
}

window.runRecommendedAutoSlide = function() {
  if (state.view === "product" && state.productId) {
    const product = products.find((item) => item.id === state.productId) || products[0];
    const recommendedItems = getRecommendedItemsForProduct(product);
    
    const recommendedChunks = [];
    for (let i = 0; i < recommendedItems.length; i += 2) {
      const chunk = [recommendedItems[i]];
      if (i + 1 < recommendedItems.length) {
        chunk.push(recommendedItems[i + 1]);
      } else {
        chunk.push(recommendedItems[0]);
      }
      recommendedChunks.push(chunk);
    }

    if (recommendedChunks.length > 1) {
      if (typeof state.recommendedSlideIndex === "undefined") {
        state.recommendedSlideIndex = 0;
      }
      state.recommendedSlideIndex = (state.recommendedSlideIndex + 1) % recommendedChunks.length;
      renderRecommendedSliderOnly();
    }
  }
};

window.setRecommendedSlide = function(idx) {
  state.recommendedSlideIndex = idx;
  
  if (window.recommendedProductAutoSlideInterval) clearInterval(window.recommendedProductAutoSlideInterval);
  window.recommendedProductAutoSlideInterval = setInterval(window.runRecommendedAutoSlide, 3000);
  
  renderRecommendedSliderOnly();
};

window.toggleVideoPlay = function() {
  const video = document.getElementById("product-detail-video");
  const overlay = document.getElementById("video-play-overlay");
  if (!video) return;
  if (video.paused) {
    video.play().catch(() => {});
    if (overlay) overlay.style.display = "none";
  } else {
    video.pause();
    if (overlay) overlay.style.display = "flex";
  }
};

window.handleSliderTouchStart = function(e) {
  window.sliderTouchStartX = e.touches[0].clientX;
  window.sliderTouchStartY = e.touches[0].clientY;
};

window.handleSliderTouchEnd = function(e) {
  if (typeof window.sliderTouchStartX === 'undefined') return;
  const diffX = e.changedTouches[0].clientX - window.sliderTouchStartX;
  const diffY = e.changedTouches[0].clientY - window.sliderTouchStartY;
  
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
    if (diffX > 0) {
      window.toggleMediaSlide('prev');
    } else {
      window.toggleMediaSlide('next');
    }
  }
};

window.handleSliderMouseDown = function(e) {
  window.sliderMouseStartX = e.clientX;
  window.sliderMouseStartY = e.clientY;
  window.sliderIsMouseDown = true;
};

window.handleSliderMouseUp = function(e) {
  if (!window.sliderIsMouseDown) return;
  window.sliderIsMouseDown = false;
  const diffX = e.clientX - window.sliderMouseStartX;
  const diffY = e.clientY - window.sliderMouseStartY;
  
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
    if (diffX > 0) {
      window.toggleMediaSlide('prev');
    } else {
      window.toggleMediaSlide('next');
    }
  }
};

window.shareProduct = function(productId, productName) {
  const matched = products.find(p => p.id === productId);
  let url = window.location.origin + appPath('/collections/all');
  if (matched) {
    const productSlug = slugify(matched.name);
    url = window.location.origin + appPath('/product/' + productSlug);
  }
  const shareText = `Check out ${productName} on ZappDeal!`;

  // Remove existing modal if any
  const existing = document.getElementById('product-share-modal');
  if (existing) { existing.remove(); }

  // Create new modal overlay
  const modal = document.createElement('div');
  modal.id = 'product-share-modal';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.65); display: flex; align-items: center;
    justify-content: center; z-index: 99999; backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  `;

  // Create modal content box
  const content = document.createElement('div');
  content.style.cssText = `
    background: #0b0e1a; border: 1.5px solid rgba(35, 244, 239, 0.3);
    border-radius: 20px; padding: 24px; width: 90%; max-width: 400px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5); position: relative;
    color: #fff; font-family: sans-serif;
  `;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h3 style="margin: 0; font-size: 18px; font-weight: 800; color: #fff;">Share Product</h3>
      <button onclick="document.getElementById('product-share-modal').remove()" style="background: none; border: none; color: rgba(255,255,255,0.6); font-size: 24px; cursor: pointer; line-height: 1;">&times;</button>
    </div>
    
    <p style="font-size: 13px; color: rgba(255,255,255,0.7); margin-bottom: 14px;">Copy the product link to share it with your friends:</p>
    
    <div style="display: flex; gap: 8px; margin-bottom: 20px;">
      <input type="text" id="share-link-input" value="${url}" readonly style="flex: 1; height: 44px; padding: 0 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: #8B5CF6; font-size: 13px; outline: none;">
      <button onclick="window.copyShareLinkToClipboard()" style="height: 44px; padding: 0 16px; border-radius: 8px; border: none; background: #8B5CF6; color: #0b0e1a; font-weight: 700; cursor: pointer; transition: opacity 0.2s; white-space: nowrap;">Copy</button>
    </div>

    <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
      <span style="font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 12px;">Share directly</span>
      <div style="display: flex; gap: 12px; justify-content: space-around;">
        <button onclick="window.open('https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}','_blank'); document.getElementById('product-share-modal').remove();" style="background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 6px;">
          <div style="background: #25D366; width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.397 1.453 5.24 1.454 5.277 0 9.585-4.302 9.588-9.589.002-2.561-1.0-4.97-2.824-6.795-1.824-1.823-4.25-2.827-6.816-2.827-5.285 0-9.593 4.303-9.596 9.592-.001 1.943.5 3.829 1.458 5.485L2.64 21.054l4.007-1.9z"/></svg>
          </div>
          <span style="font-size: 10px; color: rgba(255,255,255,0.7);">WhatsApp</span>
        </button>
        <button onclick="window.open('https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}','_blank'); document.getElementById('product-share-modal').remove();" style="background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 6px;">
          <div style="background: #2AABEE; width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.014 9.488c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.29 14.617l-2.95-.924c-.64-.203-.653-.64.136-.95l11.5-4.433c.537-.194 1.006.131.586 1.938z"/></svg>
          </div>
          <span style="font-size: 10px; color: rgba(255,255,255,0.7);">Telegram</span>
        </button>
      </div>
    </div>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Close modal when clicking outside of it
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
};

window.copyShareLinkToClipboard = function() {
  const input = document.getElementById('share-link-input');
  if (input) {
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value).then(() => {
      showToast("Link copied to clipboard!");
      const modal = document.getElementById('product-share-modal');
      if (modal) modal.remove();
    }).catch(() => {
      showToast("Failed to copy link");
    });
  }
};

window.likeReview = async function(reviewId) {
  try {
    const res = await fetch(`/api/reviews/${reviewId}/like`, { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      // Update the local cached review likes count
      const reviewsDb = JSON.parse(localStorage.getItem("iselectrics-reviews-db")) || [];
      const review = reviewsDb.find(r => r.id === reviewId);
      if (review) {
        review.likes = data.likes;
        localStorage.setItem("iselectrics-reviews-db", JSON.stringify(reviewsDb));
      }
      renderProduct();
      showToast("Review liked!");
    }
  } catch (e) {
    // Fallback to local only
    const reviewsDb = JSON.parse(localStorage.getItem("iselectrics-reviews-db")) || [];
    const review = reviewsDb.find(r => r.id === reviewId);
    if (review) {
      review.likes = (review.likes || 0) + 1;
      localStorage.setItem("iselectrics-reviews-db", JSON.stringify(reviewsDb));
      renderProduct();
    }
  }
};

window.scrollToReviews = function() {
  const reviewsEl = document.querySelector(".reviews-container-box");
  if (reviewsEl) {
    reviewsEl.scrollIntoView({ behavior: 'smooth' });
  }
};

// ── Review Full-Text Modal ──────────────────────────────────────
window.showReviewModal = function(reviewId) {
  // Build reviews list from local cache or defaults
  const allReviews = JSON.parse(localStorage.getItem("iselectrics-reviews-db")) || [];
  const r = allReviews.find(rev => String(rev.id) === String(reviewId));
  if (!r) return;

  const avatarColors = ['#6366f1','#A855F7','#ff5b67','#ffb800','#A855F7','#a855f7','#f97316'];
  const colorIndex = ((r.avatar || r.customer || '').charCodeAt(0) || 0) % avatarColors.length;
  const avatarBg = avatarColors[colorIndex];
  const starsHtml = Array.from({length: 5}).map((_, i) =>
    `<span style="color:${i < r.rating ? '#ff8a17' : 'rgba(255,255,255,0.12)'};">★</span>`
  ).join('');
  const verifiedBadge = r.verified
    ? `<span class="review-card-verified-badge">✓ Verified</span>`
    : '';

  // Remove existing modal if any
  const existing = document.getElementById('review-full-modal');
  if (existing) existing.remove();

  const backdrop = document.createElement('div');
  backdrop.id = 'review-full-modal';
  backdrop.className = 'review-modal-backdrop';
  backdrop.innerHTML = `
    <div class="review-modal-box" role="dialog" aria-modal="true" aria-label="Full Review">
      <button class="review-modal-close" onclick="window.closeReviewModal()" aria-label="Close">&times;</button>
      <div class="review-modal-header">
        <div class="review-modal-avatar" style="background:${avatarBg};">${r.avatar || '?'}</div>
        <div class="review-modal-meta">
          <h4>${r.customer} ${verifiedBadge}</h4>
          <div class="review-modal-stars">${starsHtml}</div>
          <span>${r.date}</span>
        </div>
      </div>
      <hr class="review-modal-divider">
      <p class="review-modal-comment">&ldquo;${r.comment}&rdquo;</p>
    </div>
  `;

  document.body.appendChild(backdrop);

  // Animate in on next frame
  requestAnimationFrame(() => requestAnimationFrame(() => {
    backdrop.classList.add('is-active');
  }));

  // Close on backdrop click (outside the box)
  backdrop.addEventListener('click', function(e) {
    if (e.target === backdrop) window.closeReviewModal();
  });

  // Close on Escape key
  const onKeyDown = function(e) {
    if (e.key === 'Escape') { window.closeReviewModal(); document.removeEventListener('keydown', onKeyDown); }
  };
  document.addEventListener('keydown', onKeyDown);
};

window.closeReviewModal = function() {
  const backdrop = document.getElementById('review-full-modal');
  if (!backdrop) return;
  backdrop.classList.remove('is-active');
  backdrop.addEventListener('transitionend', () => backdrop.remove(), { once: true });
};

window.setReviewRatingPicker = function(rating) {
  state.reviewRating = rating;
  for (let i = 1; i <= 5; i++) {
    const starBtn = document.getElementById(`picker-star-${i}`);
    if (starBtn) {
      starBtn.classList.toggle("selected", i <= rating);
    }
  }
};

async function loadReviewsForProduct(productId) {
  try {
    const res = await fetch(`/api/products/${productId}/reviews`);
    if (res.ok) {
      const data = await res.json();
      const formatted = data.map(r => ({
        id: r.id,
        productId: r.product_id.toString(),
        customer: r.customer_name,
        avatar: r.avatar || (r.customer_name ? r.customer_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : "U"),
        rating: r.rating,
        verified: r.verified === 1 || r.verified === true,
        date: r.created_at ? r.created_at.split(' ')[0] : "",
        comment: r.comment || "",
        likes: r.likes || 0,
        visible: r.visible === 1 || r.visible === true
      }));
      // Replace reviews for this product in localStorage (don't merge stale data)
      let reviewsDb = JSON.parse(localStorage.getItem("iselectrics-reviews-db")) || [];
      reviewsDb = reviewsDb.filter(r => r.productId !== productId.toString());
      reviewsDb = [...formatted, ...reviewsDb];
      localStorage.setItem("iselectrics-reviews-db", JSON.stringify(reviewsDb));
    }
  } catch (e) {
    console.error("Failed to load reviews for product", e);
  }
}
window.loadReviewsForProduct = loadReviewsForProduct;

window.submitUserReview = async function(event) {
  event.preventDefault();

  const token = localStorage.getItem("customer-user-token");
  if (!token) {
    showToast("Please log in to submit a review.");
    return;
  }

  const hasPurchased = orders && orders.some(o =>
    o.productId.toString() === state.productId.toString() &&
    o.status.toLowerCase() !== 'cancelled' &&
    o.status.toLowerCase() !== 'declined'
  );
  if (!hasPurchased) {
    showToast("Only verified buyers of this product can submit a review.");
    return;
  }

  const nameInput    = document.getElementById("review-author-name");
  const commentText  = document.getElementById("review-comment-text");
  const editIdInput  = document.getElementById("review-edit-id");
  if (!nameInput || !commentText) return;

  const name    = nameInput.value.trim();
  const comment = commentText.value.trim();
  if (!name || !comment) {
    showToast("Please fill in your name and comment.");
    return;
  }

  const editId = editIdInput ? editIdInput.value.trim() : "";
  const isEditing = editId && editId !== "";

  try {
    let res;
    if (isEditing) {
      // PATCH to edit own review
      res = await fetch(`/api/reviews/${editId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: state.reviewRating || 5,
          comment: comment
        })
      });
    } else {
      // POST new review
      res = await fetch(`/api/products/${state.productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          customer_name: name,
          rating: state.reviewRating || 5,
          comment: comment,
          verified: 1,
          avatar: name.split(" ").map(n => n[0]).join("").toUpperCase()
        })
      });
    }

    if (res.ok) {
      showToast(isEditing ? "Review updated successfully!" : "Review submitted successfully!");
      nameInput.value = "";
      commentText.value = "";
      state.reviewRating = 5;
      await loadProductsFromApi();
      await loadReviewsForProduct(state.productId);
      renderProduct();
    } else {
      const data = await res.json();
      showToast(data.message || (isEditing ? "Failed to update review" : "Failed to submit review"));
    }
  } catch (err) {
    console.error(err);
    showToast("Error saving review");
  }
};

// Setup Live Viewer fluctuation interval (15 to 35)
if (window.liveViewersInterval) clearInterval(window.liveViewersInterval);
window.liveViewersInterval = setInterval(() => {
  const el = document.getElementById("live-viewers-count");
  if (el) {
    const count = Math.floor(Math.random() * 21) + 15;
    el.textContent = count.toString();
  }
}, 4000);

// Product image auto-slide disabled as per user request to allow manual navigation only

// Setup recommended product auto-slide interval (every 3 seconds)
if (window.recommendedProductAutoSlideInterval) clearInterval(window.recommendedProductAutoSlideInterval);
window.recommendedProductAutoSlideInterval = setInterval(window.runRecommendedAutoSlide, 3000);

function renderProduct() {
  const product = products.find((item) => item.id === state.productId) || products[0];
  
  // Dynamic buyers count based on product ID and current hour (max 20, changes every 1 hour)
  const hr = new Date().getHours();
  const idNum = typeof product.id === 'number' ? product.id : (product.id.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0));
  const dynamicBuyersCount = 5 + ((hr * 7 + idNum * 13) % 16); // ranges from 5 to 20

  const productModels = normalizeProductModels(product);
  const showModelSelector = isMobileProduct(product) && productModels.length > 0;
  
  // State Initialization for new product navigation
  if (state.lastProductId !== state.productId) {
    state.lastProductId = state.productId;
    state.selectedModel = "";
    state.selectedBaseModel = "";
    state.selectedColor = "";
    state.productQty = 1;
    state.mediaSlideIndex = 0;
    state.reviewRating = 5;
    state.recommendedSlideIndex = 0;
  }

  const groups = groupProductModels(productModels);
  const baseModels = Object.keys(groups);

  if (state.selectedModel) {
    const base = getBaseModel(state.selectedModel);
    if (baseModels.includes(base)) {
      state.selectedBaseModel = base;
    }
  }

  const discountPercent = Math.round((1 - product.price / product.oldPrice) * 100) || 0;
  const slides = getProductSlides(product, state.selectedColor);

  if (state.mediaSlideIndex >= slides.length) {
    state.mediaSlideIndex = 0;
  }

  const currentSlide = slides[state.mediaSlideIndex] || slides[0];

  // Recommended products calculations for this view
  const recommendedItems = getRecommendedItemsForProduct(product);

  const recommendedChunks = [];
  for (let i = 0; i < recommendedItems.length; i += 2) {
    const chunk = [recommendedItems[i]];
    if (i + 1 < recommendedItems.length) {
      chunk.push(recommendedItems[i + 1]);
    } else {
      chunk.push(recommendedItems[0]);
    }
    recommendedChunks.push(chunk);
  }

  if (typeof state.recommendedSlideIndex === "undefined") {
    state.recommendedSlideIndex = 0;
  }
  if (state.recommendedSlideIndex >= recommendedChunks.length) {
    state.recommendedSlideIndex = 0;
  }
  const activeRecProductChunk = recommendedChunks[state.recommendedSlideIndex] || recommendedChunks[0] || [];

  let mediaHtml = "";
  if (currentSlide.type === 'video') {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    let match = currentSlide.url.match(regExp);
    
    if (match && match[2].length === 11) {
      const embedId = match[2];
      mediaHtml = `
        <iframe id="product-detail-video" class="product-video-element" src="https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1&loop=1&playlist=${embedId}&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; aspect-ratio:9/16; border-radius:12px; border:none; display:block;"></iframe>
      `;
    } else {
      mediaHtml = `
        <video id="product-detail-video" class="product-video-element" autoplay loop muted playsinline src="${currentSlide.url}" onclick="window.toggleVideoPlay()"></video>
        <div id="video-play-overlay" class="video-play-btn-overlay" style="display: none;" onclick="window.toggleVideoPlay()">
          <div class="play-icon-circle">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      `;
    }
  } else {
    mediaHtml = `
      <img src="${currentSlide.url}" alt="${product.name}" draggable="false" style="cursor: zoom-in; user-select:none;" onclick="window.openPdpFullscreen(${state.mediaSlideIndex})">
    `;
  }
  
  // Reviews Calculations
  const reviews = getProductReviews(product.id);
  const totalReviews = reviews.length;
  const avgScore = totalReviews ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1) : "5.0";
  
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    const rounded = Math.round(r.rating);
    if (distribution[rounded] !== undefined) distribution[rounded]++;
  });
  
  const defaultUserName = localStorage.getItem("user-name") || "";

  const isWish = wishlistIds.includes(product.id);

  views.product.innerHTML = `
    ${renderBackBar("", `
      <div style="display:flex;gap:8px">
        <button class="icon-btn" data-nav="cart" aria-label="Cart" style="position: relative;">
          ${icon("cart")}
          <b class="cart-badge" style="position: absolute; top: -5px; right: -5px; background: var(--cyan); color: #0f172a; font-size: 10px; font-weight: 800; min-width: 16px; height: 16px; border-radius: 50%; display: ${cartCount() > 0 ? 'flex' : 'none'}; align-items: center; justify-content: center;">${cartCount()}</b>
        </button>
      </div>
    `)}
    
    <!-- Amazon/Flipkart Premium Media Viewer -->
    <div class="product-media-viewer">
      <!-- Desktop Vertical Thumbnails (hidden on mobile) -->
      <div class="desktop-thumbnails">
        ${slides.map((slide, idx) => `
          <button class="thumb-btn ${state.mediaSlideIndex === idx ? 'is-active' : ''}" onclick="window.setMediaSlide(${idx})">
            ${slide.type === 'video' ? '<div class="thumb-video-icon">▶</div>' : ''}
            <img src="${slide.thumb}" alt="Slide ${idx + 1}">
          </button>
        `).join("")}
      </div>
 
      <!-- Main Viewport -->
      <div class="main-viewport-container" 
           ontouchstart="window.handleSliderTouchStart(event)" 
           ontouchend="window.handleSliderTouchEnd(event)"
           onmousedown="window.handleSliderMouseDown(event)"
           onmouseup="window.handleSliderMouseUp(event)">
        ${mediaHtml}
        
        ${slides.length > 1 ? `
          <button class="slider-arrow prev-arrow" onclick="window.prevMediaSlide(event)" aria-label="Previous Slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button class="slider-arrow next-arrow" onclick="window.nextMediaSlide(event)" aria-label="Next Slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        ` : ''}
        
        <!-- Mobile Swipe Dots (hidden on desktop) -->
        <div class="mobile-swipe-dots">
          ${slides.map((slide, idx) => `
            <span class="dot-indicator ${state.mediaSlideIndex === idx ? 'is-active' : ''}" onclick="window.setMediaSlide(${idx})"></span>
          `).join("")}
        </div>
        
        <!-- Premium Overlays -->
        <button class="video-overlay-share" onclick="window.shareProduct('${product.id}', '${product.name.replace(/'/g, "\\'")}')" aria-label="Share">
          ${icon("share")}
        </button>
      </div>
    </div>
    
    <!-- Unified Details & Purchase actions column -->
    <div class="product-details-column">
      <!-- Title, Category, Rating -->
      <div style="margin-bottom: 8px;">
        <div style="font-size: 11px; text-transform: uppercase; color: var(--cyan); font-weight: 800; letter-spacing: 1px;">
          ${product.category} Showcase
        </div>
        <h1 style="font-size: 20px; font-weight: 800; margin: 2px 0 4px 0; line-height: 1.3;">${product.name}</h1>
        
        <!-- Reviews & Rating (placed right below title/price) -->
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span class="rating" onclick="window.scrollToReviews()" style="font-size: 13.5px; font-weight: 700; color: var(--orange); cursor: pointer;" title="Scroll to reviews">★ ${avgScore} (${totalReviews} Verified Reviews)</span>
        </div>
      </div>

      <!-- Price Section -->
      <div class="price-line" style="margin-bottom: 8px; align-items: center;">
        <span class="price" style="font-size: 26px; font-weight: 800; color: var(--cyan);">${money(product.price)}</span>
        <span class="strike" style="font-size: 16px; color: var(--soft); text-decoration: line-through;">${money(product.oldPrice)}</span>
        <span class="chip" style="padding: 4px 8px; font-size: 11px; font-weight: 700; border-radius: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);">Save ${discountPercent}%</span>
      </div>

      <!-- Description -->
      <p style="font-size: 13.5px; line-height: 1.5; color: var(--muted); margin: 0 0 8px 0;">${product.detail}</p>

      <!-- Desktop-only purchase badges -->
      <div class="badge-pills-row pdp-desktop-only-badges" style="margin: 6px 0 10px 0;">
        <span class="badge-pill">🚚 Free Delivery</span>
        <span class="badge-pill">💵 COD Available</span>
        <span class="badge-pill">🔒 100% Secure Checkout</span>
      </div>

      <!-- Model & Variant Selection Row -->
      ${showModelSelector ? `
        <div class="model-selection-section" id="model-selection-section" style="margin-bottom: 12px; border-radius: 10px;">
          <h2 style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text); margin: 0 0 6px 0;">Select Model</h2>
          
          <!-- Base Model Dropdowns Row -->
          <div class="base-models-pills" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 8px; scrollbar-width: none; -webkit-overflow-scrolling: touch;">
            ${baseModels.map((base) => {
              const isActive = state.selectedBaseModel === base;
              const variants = groups[base] || [];
              return `
                <div class="model-pill-select-container ${isActive ? 'is-active' : ''}">
                  <select class="model-pill-select" onchange="window.selectVariantAndBase('${base.replace(/'/g, "\\'")}', this.value)">
                    ${isActive ? '' : `<option value="" disabled selected hidden>${base}</option>`}
                    ${variants.map((variant) => {
                      const isVariantSelected = state.selectedModel === variant;
                      return `<option value="${variant}" ${isVariantSelected ? "selected" : ""}>${variant}</option>`;
                    }).join("")}
                  </select>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Color Selection & Quantity Selection Row -->
      <div class="color-qty-row" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
        <!-- Left Column: Color Selection -->
        <div id="color-selection-section" style="flex: 1; min-width: 0; border-radius: 10px;">
          <h2 style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text); margin: 0 0 4px 0;">Color: <span style="color: var(--cyan); text-transform: none; font-weight: 600;">${state.selectedColor || 'None'}</span></h2>
          <div class="color-circles-row">
            ${getProductColorsForModel(product, state.selectedModel).map((colorStr) => {
              const { name: colorName, hex: colorHex } = getColorNameAndHex(colorStr);
              const isActive = state.selectedColor.toLowerCase() === colorName.toLowerCase();
              return `
                <div style="position: relative; display: inline-block; margin-top: 2px; flex-shrink: 0;">
                  ${isActive ? `
                    <div class="color-tooltip" style="bottom: calc(100% + 8px);">
                      ${colorName}
                      <div class="color-tooltip-arrow"></div>
                    </div>
                  ` : ''}
                  <button class="color-circle-btn ${isActive ? 'is-active' : ''}" 
                          style="background-color: ${colorHex}; display: flex; align-items: center; justify-content: center;" 
                          title="${colorName}"
                          onclick="window.selectProductColor('${colorName}')"
                          aria-label="Select color ${colorName}">
                    ${isActive ? `
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 1.5px 2px rgba(0,0,0,0.85));">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ` : ''}
                  </button>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Right Column: Quantity & Availability side-by-side with 80px gap -->
        <div class="pdp-right-col" style="display: flex; align-items: flex-end; gap: 80px; flex-shrink: 0; margin-right: 20px;">
          <!-- Quantity Counter -->
          <div class="pdp-qty-container" style="display: flex; flex-direction: column; align-items: flex-start;">
            <label style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text); margin-bottom: 4px;">Quantity</label>
            <div class="qty-control" style="margin: 0;">
              <button onclick="window.updateProductQty(-1)">-</button>
              <span style="font-size: 14px; font-weight: 700; min-width: 24px; text-align: center;">${state.productQty || 1}</span>
              <button onclick="window.updateProductQty(1)">+</button>
            </div>
          </div>

          <!-- Availability Section -->
          <div class="pdp-availability-container" style="display: flex; flex-direction: column; align-items: flex-start;">
            <label style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text); margin-bottom: 4px;">Availability</label>
            <div style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #22c55e; background: rgba(34, 197, 94, 0.1); padding: 5px 10px; border-radius: 6px; border: 1px solid rgba(34, 197, 94, 0.2); height: 32px; box-sizing: border-box; white-space: nowrap;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #22c55e; display: inline-block; box-shadow: 0 0 6px #22c55e;"></span>
              In Stock
            </div>
          </div>
        </div>
      </div>

      <!-- Checkout Dock -->
      <div class="action-dock" style="margin-top: 10px; margin-bottom: 8px;">
        <button class="pdp-add-to-cart" onclick="window.handleProductAddToCart('${product.id}', ${state.productQty || 1}, false)">${icon("cart")} Add to Cart</button>
        <button class="pdp-buy-now" onclick="window.handleProductAddToCart('${product.id}', ${state.productQty || 1}, true)">${icon("lightning")} Buy Now</button>
      </div>

      <!-- Live Sales Stat -->
      <div style="margin-top: 8px; margin-bottom: 8px; font-size: 13.5px; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 6px; padding: 2px 0;">
        <span>🔥 ${dynamicBuyersCount} people bought this product in last 6 hours</span>
      </div>


    </div>
    
    <!-- Dynamic Reviews & Ratings Engine + Recommended Slider Container -->
    <div class="reviews-and-recommended-section ${totalReviews === 0 ? 'no-reviews' : ''}">
      ${totalReviews > 0 ? `
      <div class="reviews-container-box" style="margin-top: 0; padding-top: 0; border-top: none;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; width:100%;">
          <h2 style="font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin: 0;">Customer Reviews</h2>
          ${totalReviews > 0 ? `
            <a href="/reviews.php?productId=${product.id}" style="color: var(--cyan); font-size: 13px; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 4px;">
              View All ${icon("arrow")}
            </a>
          ` : ''}
        </div>

        
        <!-- Write / Edit a Review Form -->
        ${(() => {
          const token = localStorage.getItem("customer-user-token");
          if (!token) {
            return `
              <div class="write-review-card-form" style="text-align: center; padding: 24px; border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 12px; background: rgba(255,255,255,0.02);">
                <span style="font-size: 28px; display: block; margin-bottom: 8px;">🔒</span>
                <h4 style="margin: 0 0 6px 0; color: #fff; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Login to Write a Review</h4>
                <p style="margin: 0 0 14px 0; font-size: 12px; color: var(--muted); line-height: 1.4;">Only verified customers who purchased this item can leave a review.</p>
                <button onclick="setView('login')" class="auth-btn" style="padding: 8px 16px; font-size: 12px; font-weight: 700; text-transform: uppercase;">Login Now</button>
              </div>
            `;
          }

          const hasPurchased = orders && orders.some(o =>
            o.productId.toString() === product.id.toString() &&
            o.status.toLowerCase() !== 'cancelled' &&
            o.status.toLowerCase() !== 'declined'
          );
          if (!hasPurchased) {
            return `
              <div class="write-review-card-form" style="text-align: center; padding: 24px; border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 12px; background: rgba(255,255,255,0.02);">
                <span style="font-size: 28px; display: block; margin-bottom: 8px;">🛒</span>
                <h4 style="margin: 0 0 6px 0; color: #fff; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Verified Buyers Only</h4>
                <p style="margin: 0; font-size: 12px; color: var(--muted); line-height: 1.4;">Only customers who purchased this item can leave a review. If you already bought it, make sure the order status is active.</p>
              </div>
            `;
          }

          // Check if this user already has a review for this product
          const userName = localStorage.getItem("user-name") || "";
          const existingUserReview = reviews.find(r =>
            r.customer && userName &&
            r.customer.trim().toLowerCase() === userName.trim().toLowerCase()
          );

          if (existingUserReview) {
            return "";
          }

          // New review form
          return `
            <div class="write-review-card-form">
              <h3>Write a Verified Review</h3>
              <form onsubmit="window.submitUserReview(event)">
                <input type="hidden" id="review-edit-id" value="">
                <div style="margin-bottom: 12px;">
                  <label style="display:block; font-size:12px; font-weight:700; color:var(--muted); margin-bottom:6px; text-transform:uppercase;">Your Name</label>
                  <input type="text" id="review-author-name" value="${defaultUserName}" placeholder="Enter your full name" required
                         style="width:100%; padding:10px 12px; background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.08); border-radius:8px; color:white; outline:none;">
                </div>
                <div style="margin-bottom: 12px;">
                  <label style="display:block; font-size:12px; font-weight:700; color:var(--muted); margin-bottom:6px; text-transform:uppercase;">Rating</label>
                  <div class="rating-stars-picker-row">
                    ${[1,2,3,4,5].map(val => `
                      <button type="button" id="picker-star-${val}" class="rating-star-picker-btn ${val <= state.reviewRating ? 'selected' : ''}"
                              onclick="window.setReviewRatingPicker(${val})">★</button>
                    `).join("")}
                  </div>
                </div>
                <div style="margin-bottom: 15px;">
                  <label style="display:block; font-size:12px; font-weight:700; color:var(--muted); margin-bottom:6px; text-transform:uppercase;">Your Comment</label>
                  <textarea id="review-comment-text" rows="3" placeholder="Tell other buyers about this ${product.name}..." required
                            style="width:100%; padding:10px 12px; background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.08); border-radius:8px; color:white; outline:none; font-family:inherit; resize:vertical;"></textarea>
                </div>
                <button type="submit" class="auth-btn" style="padding: 10px 15px; font-size: 13.5px;">Submit Review</button>
              </form>
            </div>
          `;
        })()}
        
        <div style="height:20px;"></div>
        
        <!-- Review Cards List -->
        ${totalReviews ? `
          <div class="reviews-list-block">
            ${reviews.slice(0, 5).map(r => {
              const avatarColors = ['#6366f1','#A855F7','#ff5b67','#ffb800','#A855F7','#a855f7','#f97316'];
              const colorIndex = ((r.avatar || r.customer || '').charCodeAt(0) || 0) % avatarColors.length;
              const avatarBg = avatarColors[colorIndex];
              const productImgHtml = r.productImage
                ? `<div style="margin-top:10px;">
                    <img src="${r.productImage}" alt="product" style="max-height:90px; max-width:100%; border-radius:8px; object-fit:cover; border:1px solid rgba(255,255,255,0.1); display:block;">
                  </div>`
                : '';
              return `
              <div class="review-card-item">
                <div class="review-card-header">
                  <div class="review-card-avatar" style="background:${avatarBg}; color:#fff;">${r.avatar}</div>
                  <div class="review-card-meta">
                    <h4>
                      <span>${r.customer}</span>
                      ${r.verified ? `<span class="review-card-verified-badge">✓ Verified</span>` : ""}
                    </h4>
                    <div class="review-card-rating">
                      ${Array.from({length: 5}).map((_, idx) => `<span style="color: ${idx < r.rating ? 'var(--orange)' : 'rgba(255,255,255,0.1)'};">★</span>`).join("")}
                    </div>
                    <span>${r.date}</span>
                  </div>
                </div>
                <p class="review-card-comment" style="font-size:12px; line-height:1.5; margin:0 0 6px;">${r.comment || ''}</p>
                ${productImgHtml}
                <div class="review-card-footer">
                  <button class="review-card-like-btn" onclick="window.likeReview(${r.id})">
                    ${icon("heart")} ${r.likes || 0}
                  </button>
                </div>
              </div>
            `;
            }).join("")}
          </div>
        ` : `
          <div class="empty-state" style="padding: 32px 16px; text-align: center; width: 100%; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <p style="font-size: 13.5px; color: var(--soft); margin: 0; text-align: center; width: 100%;">No customer reviews yet. Be the first to share your thoughts!</p>
          </div>
        `}
      </div>
      ` : ''}
      
      <!-- Recommended Product Slider wrapper (70% on desktop) -->
      <div class="recommended-slider-wrapper">
        <h2 style="font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 15px;">Recommended Products</h2>
        <div id="recommended-product-slider" class="recommended-product-slider-card">
          <div class="rec-product-grid-two">
            ${activeRecProductChunk.map(prod => renderRecommendedProductCard(prod)).join("")}
          </div>
        </div>
        
        <!-- Dots for pagination indicators -->
        <div class="recommended-slider-dots">
          ${recommendedChunks.map((_, idx) => `
            <span class="rec-dot-indicator ${state.recommendedSlideIndex === idx ? 'is-active' : ''}" onclick="window.setRecommendedSlide(${idx})"></span>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderCart() {
  const items = cartItems();
  const subtotal = cartTotal();
  const discount = items.length ? Math.min(3600, Math.round(subtotal * 0.08)) : 0;
  const total = subtotal - discount;
  views.cart.innerHTML = `
    <div class="cart-bg-glows">
      <div class="glow-shape glow-1"></div>
      <div class="glow-shape glow-2"></div>
    </div>

    <div class="cart-premium-shell">

      <!-- Breadcrumb -->
      <nav class="cart-breadcrumb" aria-label="Breadcrumb">
        <button class="crumb-home" data-nav="home">${icon("home")}<span>Home</span></button>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <span class="crumb-current">Your Cart</span>
      </nav>

      <!-- Page header -->
      <div class="cart-page-head">
        <div class="cart-head-left">
          <h1>Your Cart</h1>
          <p>Review your items and proceed to checkout</p>
        </div>
        <div class="cart-head-right">
          <div class="cart-secure-badge-top">
            ${icon("lock")}
            <span>100% Secure Checkout</span>
          </div>
          ${items.length ? `<button class="link-btn cart-remove-all-btn" data-clear-cart>Remove all</button>` : ""}
        </div>
      </div>

      <!-- Main cart layout -->
      <div class="cart-layout">

        <section class="cart-left" aria-label="Cart products">
          ${items.length ? `
          <div class="cart-table-head">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>` : ''}

          <div class="cart-list">
            ${items.length ? items.map((item) => `
              <article class="cart-item">

                <div class="product-col">
                  <img src="${window.getProductSelectedVariantImage(item, item.selectedColor, item.selectedModel)}" alt="${item.name}">

                  <div class="product-info">
                    <h3>${item.name}</h3>
                    ${(item.selectedColor || item.selectedModel) ? `
                      <div style="font-size: 11px; color: rgba(255,255,255,0.5); margin: 3px 0 6px 0; display: flex; gap: 8px; flex-wrap: wrap;">
                        ${item.selectedModel ? `<span>Model: <strong style="color: var(--cyan);">${item.selectedModel}</strong></span>` : ''}
                        ${item.selectedColor ? `<span>Color: <strong style="color: var(--cyan);">${item.selectedColor}</strong></span>` : ''}
                      </div>
                    ` : ''}
                    <div class="price-line">
                      <span class="price">${money(item.price)}</span>
                      <span class="strike">${money(item.oldPrice)}</span>
                    </div>
                    <small class="stock-line">${icon("shield")} In stock.</small>
                  </div>
                </div>

                <div class="price-col" data-label="Price">
                  ${money(item.price)}
                </div>

                <div class="qty-col" data-label="Quantity">
                  <div class="qty-control">
                    <button data-cart-dec="${item.cartKey}" aria-label="Decrease ${item.name} quantity">-</button>
                    <span>${item.qty}</span>
                    <button data-cart-inc="${item.cartKey}" aria-label="Increase ${item.name} quantity">+</button>
                  </div>
                </div>

                <div class="total-col" data-label="Total">
                  ${money(item.price * item.qty)}
                </div>

                <button class="remove-btn" data-cart-remove="${item.cartKey}" aria-label="Remove ${item.name}">
                  ${icon("trash")}
                </button>

              </article>
            `).join("") : `
              <div class="premium-empty-cart-card">
                <div class="illustration-container">
                  <div class="cart-icon-glow">
                    ${icon("cart")}
                  </div>
                  <div class="sparkles">
                    <span class="sparkle sparkle-1">+</span>
                    <span class="sparkle sparkle-2">✦</span>
                    <span class="sparkle sparkle-3">+</span>
                    <span class="sparkle sparkle-4">✦</span>
                  </div>
                </div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.<br>Explore our products and find something you'll love.</p>
                <button class="premium-gradient-btn" data-nav="categories">
                  ${icon("bag")}
                  <span>Shop Products</span>
                  ${icon("arrow")}
                </button>
              </div>
            `}
          </div>

          ${items.length ? `
            <div class="cart-panel-actions">
              <button class="secondary-btn continue-shopping-btn" data-nav="categories">${icon("back")} Continue Shopping</button>
            </div>
          ` : ""}
        </section>

        ${items.length ? `
        <aside class="cart-right">
          <section class="checkout-total">
            <h2>Order Summary</h2>

            <div class="summary-row">
              <span>Subtotal (${items.length} ${items.length === 1 ? "item" : "items"})</span>
              <strong>${money(subtotal)}</strong>
            </div>

            <div class="summary-row">
              <span>Discount</span>
              <strong class="discount-value">
                - ${money(discount)}
              </strong>
            </div>

            <div class="summary-row total">
              <strong>Total Amount</strong>
              <strong class="price">${money(total)}</strong>
            </div>

            <button
              class="primary-btn full"
              data-nav="checkout"
              ${items.length ? "" : "disabled"}
            >
              Checkout ${icon("arrow")}
            </button>

            <p class="secure-note">${icon("shield")} Secure checkout. Your data is protected.</p>
          </section>
        </aside>
        ` : ""}

      </div>

      <!-- Feature benefit cards — always visible, inside the main shell -->
      <section class="cart-benefits" aria-label="Shopping benefits">
        <div class="cart-benefit">
          <span class="round-icon">${icon("shield")}</span>
          <div class="benefit-text">
            <strong>Secure Payments</strong>
            <small>100% secure and encrypted payments</small>
          </div>
        </div>
        <div class="cart-benefit">
          <span class="round-icon">${icon("truck")}</span>
          <div class="benefit-text">
            <strong>Fast Delivery</strong>
            <small>Quick delivery at your doorstep</small>
          </div>
        </div>

        <div class="cart-benefit">
          <span class="round-icon">${icon("support")}</span>
          <div class="benefit-text">
            <strong>24/7 Support</strong>
            <small>We're here to help anytime</small>
          </div>
        </div>
      </section>

    </div>
  `;
}


function renderAccount() {
  const pendingCount = orders.filter(o => o.status.toLowerCase() === "pending").length;
  const confirmedCount = orders.filter(o => ["accepted", "confirmed"].includes(o.status.toLowerCase())).length;
  const shippedCount = orders.filter(o => o.status.toLowerCase() === "shipped").length;
  const balance = parseInt(localStorage.getItem("user-wallet-balance") || "0");
  const totalEarnings = userProfile ? userProfile.total_earnings : 0;
  
  const defaultUserName = localStorage.getItem("user-name") || "Guest User";
  const defaultUserEmail = localStorage.getItem("user-email") || "No email added";
  const initials = defaultUserName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  views.account.innerHTML = `
    ${renderBackBar("My Account", `<button class="icon-btn" data-nav="settings" aria-label="Settings">${icon("settings")}</button>`)}
    
    <!-- Profile Card Section -->
    <section class="profile-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; box-sizing: border-box; display: flex; align-items: center; gap: 16px; margin: 12px 0 16px;">
      <div class="avatar" style="width: 68px; height: 68px; border-radius: 50%; background: #00d2ff; color: #000; font-size: 26px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${initials}</div>
      <div style="flex: 1; min-width: 0; text-align: left;">
        <h2 style="margin: 0 0 2px 0; font-size: 20px; font-weight: 700; color: #fff; text-transform: lowercase;">${defaultUserName}</h2>
        <p style="margin: 0 0 10px 0; font-size: 13px; color: rgba(255,255,255,0.6); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${defaultUserEmail}</p>
        <button class="secondary-btn" style="min-height: 32px; padding: 4px 16px; font-size: 12px; font-weight: 600; border-radius: 20px; border: 1px solid rgba(255,255,255,0.25); background: transparent; color: #fff; cursor: pointer; transition: all 0.2s;" onclick="setView('settings')">Edit Profile</button>
      </div>
    </section>

    <!-- Wallet Balance Card Section -->
    <div class="premium-wallet-card" onclick="setView('wallet')" style="cursor: pointer;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 9px; font-weight: 800; text-transform: uppercase; color: #A855F7; background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); padding: 4px 8px; border-radius: 4px; letter-spacing: 0.5px;">YOUR EARNINGS</span>
        <button style="background: rgba(255,255,255,0.06); border: none; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; font-size: 14px;">➔</button>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 20px;">
        <img src="assets/wallet_3d.png" style="width: 76px; height: 76px; object-fit: contain; flex-shrink: 0;" alt="Wallet 3D">
        <div style="flex: 1; text-align: left; padding: 0 4px;">
          <div style="font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 2px;">Wallet Balance</div>
          <div style="font-size: 32px; font-weight: 900; color: #A855F7; line-height: 1.1; margin-bottom: 4px;">₹${balance}</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 4px;">
            Total Referral Earnings: ₹${totalEarnings} 
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.15); font-size: 8px; color: white; cursor: help;" title="Total earnings accumulated from referrals.">ℹ</span>
          </div>
          <div style="font-size: 10px; color: #A855F7; display: flex; align-items: center; gap: 4px; margin-top: 4px; font-weight: 500;">
            <span style="font-size: 11px;">✓</span> Credited on successful referral
          </div>
        </div>
        <img src="assets/gift_3d.png" style="width: 76px; height: 76px; object-fit: contain; flex-shrink: 0;" alt="Gift 3D">
      </div>
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px; cursor: pointer;" onclick="setView('wallet');">
        <div style="text-align: left;">
          <div style="font-size: 11px; font-weight: 700; color: #fff; margin-bottom: 1px;">Withdraw your wallet balance</div>
          <div style="font-size: 9.5px; color: rgba(255,255,255,0.4);">Move eligible earnings to bank or UPI.</div>
        </div>
        <button class="primary-btn" onclick="event.stopPropagation(); setView('wallet');" style="background: linear-gradient(135deg, #00d2ff 0%, #0072ff 50%, #9b51e0 100%); color: white; font-weight: 700; font-size: 10.5px; padding: 6px 14px; border-radius: 8px; border: none; cursor: pointer; display: flex; align-items: center; gap: 4px; flex-shrink: 0; min-height: unset; width: auto; box-shadow: 0 4px 12px rgba(0, 114, 255, 0.3);">
          Withdraw <span style="font-size: 11px;">➔</span>
        </button>
      </div>
    </div>

    <!-- 2x2 Order Status Grid -->
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;">
      <div onclick="setView('orders'); state.selectedOrderStatusFilter = 'pending'; renderOrders();" style="cursor: pointer; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.25); transition: all 0.2s;">
        <span style="color: #00d2ff; font-size: 20px; display: inline-flex; align-items: center; justify-content: center;">${icon("box")}</span>
        <div>
          <div style="font-size: 13px; font-weight: 700; color: #fff;">Pending</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px;">${pendingCount} ${pendingCount === 1 ? 'order' : 'orders'}</div>
        </div>
      </div>
      <div onclick="setView('orders'); state.selectedOrderStatusFilter = 'confirmed'; renderOrders();" style="cursor: pointer; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.25); transition: all 0.2s;">
        <span style="color: #00d2ff; font-size: 20px; display: inline-flex; align-items: center; justify-content: center;">${icon("shield")}</span>
        <div>
          <div style="font-size: 13px; font-weight: 700; color: #fff;">Confirmed</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px;">${confirmedCount} ${confirmedCount === 1 ? 'order' : 'orders'}</div>
        </div>
      </div>
      <div onclick="setView('orders'); state.selectedOrderStatusFilter = 'shipped'; renderOrders();" style="cursor: pointer; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.25); transition: all 0.2s;">
        <span style="color: #00d2ff; font-size: 20px; display: inline-flex; align-items: center; justify-content: center;">${icon("truck")}</span>
        <div>
          <div style="font-size: 13px; font-weight: 700; color: #fff;">Shipped</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px;">${shippedCount} active</div>
        </div>
      </div>
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.25); transition: all 0.2s;">
        <span style="color: #00d2ff; font-size: 20px; display: inline-flex; align-items: center; justify-content: center;">${icon("refresh")}</span>
        <div>
          <div style="font-size: 13px; font-weight: 700; color: #fff;">Returns</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px;">Easy refund</div>
        </div>
      </div>
    </div>

    <!-- Referral Program Banner -->
    <div onclick="setView('referral')" style="cursor: pointer; background: rgba(0, 210, 255, 0.04); border: 1px solid rgba(0, 210, 255, 0.15); border-radius: 14px; padding: 12px; display: flex; align-items: center; gap: 12px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(0, 210, 255, 0.06);">
      <img src="assets/referral_friends.png" style="width: 58px; height: 58px; object-fit: cover; border-radius: 8px; flex-shrink: 0;" alt="Referral Friends">
      <div style="flex: 1; text-align: left;">
        <h4 style="margin: 0 0 2px 0; font-size: 12px; font-weight: 800; color: #fff;">Refer Friends & Earn Rewards!</h4>
        <p style="margin: 0; font-size: 10px; color: rgba(255,255,255,0.5); line-height: 1.3;">Invite your friends and earn exciting cash rewards in your wallet.</p>
      </div>
      <div style="border: 1.5px solid #A855F7; border-radius: 8px; padding: 6px; text-align: center; background: rgba(168, 85, 247, 0.05); flex-shrink: 0; min-width: 76px; box-sizing: border-box; box-shadow: 0 0 10px rgba(168, 85, 247, 0.2);">
        <div style="font-size: 7px; font-weight: 700; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.5px;">EARN UP TO</div>
        <div style="font-size: 15px; font-weight: 900; color: #A855F7; line-height: 1.1; margin: 1px 0;">₹500</div>
        <div style="font-size: 6px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase;">PER REFERRAL</div>
      </div>
    </div>

    <h2 style="font-size: 16px; font-weight: 700; color: white; text-align: left; margin: 0 0 12px 0;">Account Menu</h2>
    <div class="list-panel" style="margin-bottom: 24px;">
      ${accountRow("spark", "Referral Program", "Invite and earn rewards", "referral")}
      ${accountRow("wallet", "Wallet", "Balance, transactions and more", "wallet")}
      ${accountRow("box", "My Orders", "Track and manage orders", "orders")}
      ${accountRow("pin", "My Addresses", "Manage delivery addresses", "addresses")}
      ${accountRow("bank", "Payout Methods", "Bank account, UPI &amp; QR for withdrawals", "payout")}
      ${accountRow("heart", `Wishlist (${wishlistIds.length})`, "Your saved items", "wishlist")}
      ${accountRow("refresh", `Recently Viewed (${recentIds.length})`, "Products you viewed", "recent")}
      ${accountRow("settings", "Account Settings", "Security and preferences", "settings")}
      ${accountRow("support", "Help &amp; Support", "FAQs, contact us", "support")}
    </div>
  `;
}


function accountRow(iconName, title, subtitle, nav = "") {
  const isExternal = nav && (nav.startsWith("mailto:") || nav.startsWith("tel:") || nav.startsWith("http"));
  if (isExternal) {
    return `
      <button class="list-row" onclick="event.stopPropagation(); event.preventDefault(); window.openMailto('${nav}'); return false;">
        <span class="round-icon">${icon(iconName)}</span>
        <span style="flex:1;"><strong>${title}</strong><small>${subtitle}</small></span>
        ${icon("arrow")}
      </button>
    `;
  }
  return `
    <button class="list-row" ${nav ? `data-nav="${nav}"` : ""}>
      <span class="round-icon">${icon(iconName)}</span>
      <span><strong>${title}</strong><small>${subtitle}</small></span>
      ${icon("arrow")}
    </button>
  `;
}

function renderReferral() {
  const code = localStorage.getItem("user-referral-code") || "NOCODE";
  const referralsCount = userProfile ? userProfile.referrals_count : 0;
  const totalEarnings = userProfile ? userProfile.total_earnings : 0;

  views.referral.innerHTML = `
    ${renderBackBar("Referral Program")}
    <section class="reward-hero">
      <div>
        <h1>Refer & Earn</h1>
        <p>Invite your friends and earn 30% of their first order!</p>
      </div>
      <span class="round-icon">${icon("spark")}</span>
    </section>
    <section class="code-card">
      <p>Your Referral Code</p>
      <div>
        <strong>${code}</strong>
        <button class="icon-btn" id="copy-ref-code-btn" aria-label="Copy referral code">${icon("box")}</button>
      </div>
    </section>
    <button class="primary-btn full" id="share-ref-btn">${icon("send")} Share Now</button>
    <section class="list-panel stat-panel">
      <div class="summary-row"><span>Successful Referrals</span><strong>${referralsCount}</strong></div>
      <div class="summary-row"><span>Total Earnings</span><strong>${money(totalEarnings)}</strong></div>
    </section>
    <h2>How it works?</h2>
    <div class="list-panel">
      ${accountRow("send", "1. Share your referral code", "Share the code with your friends")}
      ${accountRow("cart", "2. They place an order", "Your friend places their first order")}
      ${accountRow("wallet", "3. You earn rewards", "You get 30% of their order total in your wallet")}
    </div>
  `;

  // Attach dynamic copy
  document.getElementById("copy-ref-code-btn")?.addEventListener("click", () => {
    navigator.clipboard.writeText(code);
    showToast("Referral code copied!");
  });

  // Attach Web Share API
  document.getElementById("share-ref-btn")?.addEventListener("click", () => {
    const text = `Use my referral ${code}`;
    const shareUrl = `${getAppBaseUrl()}?ref=${code}`;
    if (navigator.share) {
      navigator.share({
        title: 'ZappDeal Referral',
        text: text,
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${shareUrl}`);
      showToast("Referral link copied to clipboard!");
    }
  });
}

let userWithdrawalsList = [];
async function loadUserWithdrawalsFromApi() {
  const token = localStorage.getItem("customer-user-token");
  if (!token) {
    userWithdrawalsList = [];
    return;
  }
  try {
    const res = await fetch('/api/user/withdrawals', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    if (res.ok) {
      userWithdrawalsList = await res.json();
      if (state.view === "wallet") renderWallet();
    }
  } catch (e) {
    console.error("Failed to load withdrawals from API", e);
  }
}

window.handleWithdrawalClick = function() {
  window.openWithdrawalModal();
};

// ── Payout Manager: accessible from My Account page ──
window.openPayoutManagerModal = function() {
  const existing = document.getElementById("payout-manager-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "payout-manager-modal";
  modal.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.78);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;box-sizing:border-box;";

  let savedMethods = [];
  let isLoading = true;
  let viewMode = 'list'; // 'list', 'add', 'edit'
  let currentTab = 'bank';
  let editingMethod = null;
  let qrBase64 = '';
  let editQrBase64 = '';

  const closeModal = () => {
    delete window.pmSelectProfile;
    delete window.pmSetDefault;
    delete window.pmEditProfile;
    delete window.pmDeleteProfile;
    delete window.pmViewQr;
    modal.remove();
  };

  // ESC to close
  const onKey = (e) => { if (e.key === 'Escape') { document.removeEventListener('keydown', onKey); closeModal(); } };
  document.addEventListener('keydown', onKey);

  // QR zoom viewer
  window.pmViewQr = (src) => {
    const z = document.createElement('div');
    z.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;z-index:10001;padding:20px;box-sizing:border-box;";
    z.innerHTML = `<div style="position:relative;max-width:100%;max-height:100%;"><button type="button" onclick="this.parentElement.parentElement.remove()" style="position:absolute;top:-40px;right:0;background:transparent;border:none;color:white;font-size:28px;cursor:pointer;line-height:1;">×</button><img src="${src}" style="max-width:100%;max-height:80vh;border-radius:8px;border:4px solid white;background:white;"></div>`;
    document.body.appendChild(z);
  };

  const fetchMethods = async () => {
    try {
      const token = localStorage.getItem("customer-user-token");
      const res = await fetch('/api/user/payout-methods', { headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' } });
      if (res.ok) {
        savedMethods = await res.json();
        viewMode = savedMethods.length > 0 ? 'list' : 'add';
      }
    } catch(e) {} finally {
      isLoading = false;
      render();
    }
  };

  const setDefaultMethod = async (id) => {
    const token = localStorage.getItem("customer-user-token");
    const res = await fetch(`/api/user/payout-methods/${id}/default`, { method: 'PUT', headers: { 'Authorization': `Bearer ${token}` } });
    if (res.ok) { showToast("Default updated"); await fetchMethods(); }
    else showToast("Failed to update default");
  };

  const deleteMethod = async (id) => {
    if (!confirm("Delete this payout profile?")) return;
    const token = localStorage.getItem("customer-user-token");
    const res = await fetch(`/api/user/payout-methods/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    if (res.ok) { showToast("Profile deleted"); await fetchMethods(); }
    else showToast("Failed to delete");
  };

  const saveNewMethod = async () => {
    const token = localStorage.getItem("customer-user-token");
    let body = {};
    if (currentTab === 'bank') {
      const bankName = modal.querySelector('#pm-bank-name')?.value.trim();
      const accountName = modal.querySelector('#pm-account-name')?.value.trim();
      const accountNumber = modal.querySelector('#pm-account-number')?.value.trim();
      const ifsc = modal.querySelector('#pm-ifsc')?.value.trim();
      if (!bankName || !accountName || !accountNumber || !ifsc) return showToast("Please fill all bank details");
      body = { method: 'bank', bank_name: bankName, account_name: accountName, account_number: accountNumber, ifsc_code: ifsc };
    } else {
      const upiId = modal.querySelector('#pm-upi-id')?.value.trim();
      if (!upiId && !qrBase64) return showToast("Please enter a UPI ID or upload a QR image");
      body = { method: 'upi', upi_id: upiId || undefined, upi_qr_code: qrBase64 || undefined };
    }
    try {
      const res = await fetch('/api/user/payout-methods', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) { showToast("Payout method saved!"); qrBase64 = ''; await fetchMethods(); }
      else { const d = await res.json(); showToast(d.message || "Failed to save"); }
    } catch(e) { showToast("Network error"); }
  };

  const saveEditMethod = async () => {
    const token = localStorage.getItem("customer-user-token");
    let body = { method: editingMethod.method };
    if (editingMethod.method === 'bank') {
      body.bank_name = modal.querySelector('#pm-edit-bank-name')?.value.trim();
      body.account_name = modal.querySelector('#pm-edit-account-name')?.value.trim();
      body.account_number = modal.querySelector('#pm-edit-account-number')?.value.trim();
      body.ifsc_code = modal.querySelector('#pm-edit-ifsc')?.value.trim();
      if (!body.bank_name || !body.account_name || !body.account_number || !body.ifsc_code) return showToast("Please fill all bank details");
    } else {
      body.upi_id = modal.querySelector('#pm-edit-upi-id')?.value.trim() || undefined;
      body.upi_qr_code = editQrBase64 || undefined;
      if (!body.upi_id && !body.upi_qr_code) return showToast("Please enter a UPI ID or upload a QR image");
    }
    try {
      const res = await fetch(`/api/user/payout-methods/${editingMethod.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) { showToast("Profile updated!"); editingMethod = null; editQrBase64 = ''; await fetchMethods(); }
      else { const d = await res.json(); showToast(d.message || "Failed to update"); }
    } catch(e) { showToast("Network error"); }
  };

  const render = () => {
    let content = '';

    if (isLoading) {
      content = `<div style="text-align:center;padding:40px 0;color:white;">
        <div style="border:3px solid rgba(255,255,255,0.1);border-top:3px solid var(--cyan);border-radius:50%;width:36px;height:36px;animation:pmSpin 1s linear infinite;margin:0 auto 16px;"></div>
        <p style="font-size:14px;opacity:0.8;">Loading payout methods…</p>
      </div>`;
    } else if (viewMode === 'list') {
      content = `
        ${savedMethods.length === 0 ? `<p style="color:rgba(255,255,255,0.5);font-size:13px;text-align:center;padding:16px 0;">No payout methods saved yet.</p>` : `
          <div style="display:flex;flex-direction:column;gap:10px;max-height:320px;overflow-y:auto;padding-right:4px;margin-bottom:16px;">
            ${savedMethods.map(m => `
              <div style="padding:12px;border-radius:10px;border:1px solid ${m.is_default ? 'var(--cyan)' : 'rgba(255,255,255,0.08)'};background:${m.is_default ? 'rgba(35,244,239,0.03)' : 'rgba(255,255,255,0.02)'};">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                  <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0;">
                    <span style="font-size:20px;">${m.method === 'bank' ? '🏦' : '⚡'}</span>
                    <div style="min-width:0;">
                      <div style="font-size:13px;font-weight:600;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        ${m.method === 'bank' ? `${m.bank_name} •• ${m.account_number.slice(-4)}` : (m.upi_id || 'UPI QR Code')}
                      </div>
                      <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:2px;">
                        ${m.method === 'bank' ? m.account_name : 'UPI Payout'}
                        ${m.is_default ? '<span style="margin-left:6px;font-size:9px;font-weight:700;color:var(--cyan);border:1px solid var(--cyan);background:rgba(35,244,239,0.1);padding:1px 5px;border-radius:4px;text-transform:uppercase;">Default</span>' : ''}
                      </div>
                      ${m.method === 'upi' && m.upi_qr_code ? `
                        <div style="margin-top:6px;display:flex;align-items:center;gap:6px;">
                          <img src="${m.upi_qr_code}" style="height:28px;width:28px;border-radius:4px;object-fit:cover;border:1px solid rgba(255,255,255,0.2);background:white;cursor:pointer;" onclick="window.pmViewQr('${m.upi_qr_code}')">
                          <span style="font-size:10px;color:var(--cyan);text-decoration:underline;cursor:pointer;" onclick="window.pmViewQr('${m.upi_qr_code}')">View QR</span>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
                    ${!m.is_default ? `<button type="button" style="background:transparent;border:none;color:rgba(255,255,255,0.4);cursor:pointer;font-size:11px;padding:2px 4px;" onclick="window.pmSetDefault(${m.id})">Set Default</button>` : ''}
                    <button type="button" style="background:rgba(255,255,255,0.06);border:none;color:white;border-radius:6px;padding:5px 9px;font-size:11px;cursor:pointer;" onclick="window.pmEditProfile(${m.id})">Edit</button>
                    <button type="button" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);color:#ef4444;border-radius:6px;padding:5px 9px;font-size:11px;cursor:pointer;" onclick="window.pmDeleteProfile(${m.id})">Delete</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
        <button type="button" id="pm-btn-add" style="background:rgba(255,255,255,0.04);border:1px dashed rgba(255,255,255,0.2);border-radius:8px;width:100%;padding:11px;color:rgba(255,255,255,0.8);font-size:13px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:all 0.2s;">
          ➕ Add New Payout Method
        </button>
      `;
    } else if (viewMode === 'add') {
      content = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          ${savedMethods.length > 0 ? `<button type="button" id="pm-btn-back" style="background:transparent;border:none;color:var(--cyan);font-weight:600;font-size:12px;cursor:pointer;padding:0;">← Back</button>` : '<span></span>'}
          <span style="font-size:11px;color:rgba(255,255,255,0.4);">New Payout Profile</span>
        </div>
        <div style="display:flex;background:rgba(255,255,255,0.05);padding:4px;border-radius:8px;margin-bottom:16px;gap:4px;">
          <button type="button" id="pm-tab-bank" style="flex:1;padding:8px;border:none;border-radius:6px;background:${currentTab==='bank'?'var(--cyan)':'transparent'};color:${currentTab==='bank'?'black':'white'};font-weight:600;cursor:pointer;font-size:13px;">🏦 Bank Details</button>
          <button type="button" id="pm-tab-upi" style="flex:1;padding:8px;border:none;border-radius:6px;background:${currentTab==='upi'?'var(--cyan)':'transparent'};color:${currentTab==='upi'?'black':'white'};font-weight:600;cursor:pointer;font-size:13px;">⚡ UPI / QR</button>
        </div>
        ${currentTab === 'bank' ? `
          <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px;">
            <div><label style="font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-bottom:6px;">Bank Name</label><input type="text" id="pm-bank-name" placeholder="e.g. SBI, HDFC, ICICI" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:white;outline:none;box-sizing:border-box;"></div>
            <div><label style="font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-bottom:6px;">Account Holder Name</label><input type="text" id="pm-account-name" placeholder="Name as in bank record" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:white;outline:none;box-sizing:border-box;"></div>
            <div><label style="font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-bottom:6px;">Account Number</label><input type="text" id="pm-account-number" placeholder="Enter bank account number" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:white;outline:none;box-sizing:border-box;"></div>
            <div><label style="font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-bottom:6px;">IFSC Code</label><input type="text" id="pm-ifsc" placeholder="e.g. SBIN0001234" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:white;outline:none;box-sizing:border-box;"></div>
          </div>
        ` : `
          <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px;">
            <div>
              <label style="font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-bottom:6px;">UPI ID</label>
              <input type="text" id="pm-upi-id" placeholder="e.g. name@upi" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:white;outline:none;box-sizing:border-box;">
              <small style="color:rgba(255,255,255,0.35);font-size:10px;margin-top:3px;display:block;">Or upload a QR code image below (at least one required)</small>
            </div>
            <div>
              <label style="font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-bottom:6px;">UPI QR Code Image</label>
              <div id="pm-qr-dropzone" style="border:2px dashed rgba(255,255,255,0.25);border-radius:12px;padding:18px;text-align:center;cursor:pointer;background:rgba(255,255,255,0.02);">
                <input type="file" id="pm-qr-file" accept="image/*" style="display:none;">
                <div id="pm-qr-text" style="display:${qrBase64?'none':'flex'};flex-direction:column;align-items:center;gap:8px;color:rgba(255,255,255,0.5);">
                  <span style="font-size:24px;">📤</span>
                  <span style="font-size:12px;">Tap to browse or drag &amp; drop</span>
                </div>
                <div id="pm-qr-preview" style="display:${qrBase64?'flex':'none'};flex-direction:column;align-items:center;gap:8px;">
                  <img id="pm-qr-img" src="${qrBase64}" style="max-height:90px;border-radius:6px;border:2px solid white;background:white;padding:2px;">
                  <button type="button" id="pm-qr-remove" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;">Remove</button>
                </div>
              </div>
            </div>
          </div>
        `}
        <button type="button" id="pm-btn-save-new" class="primary-btn full" style="background:var(--cyan);color:black;font-weight:700;border:none;border-radius:8px;padding:12px;cursor:pointer;width:100%;">
          Save Payout Method
        </button>
      `;
    } else if (viewMode === 'edit') {
      content = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <button type="button" id="pm-btn-cancel-edit" style="background:transparent;border:none;color:rgba(255,255,255,0.6);font-weight:600;font-size:12px;cursor:pointer;padding:0;">← Cancel</button>
          <span style="font-size:11px;color:var(--cyan);font-weight:700;text-transform:uppercase;">Modify Profile</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px;">
          ${editingMethod.method === 'bank' ? `
            <div><label style="font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-bottom:6px;">Bank Name</label><input type="text" id="pm-edit-bank-name" value="${editingMethod.bank_name || ''}" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:white;outline:none;box-sizing:border-box;"></div>
            <div><label style="font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-bottom:6px;">Account Holder Name</label><input type="text" id="pm-edit-account-name" value="${editingMethod.account_name || ''}" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:white;outline:none;box-sizing:border-box;"></div>
            <div><label style="font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-bottom:6px;">Account Number</label><input type="text" id="pm-edit-account-number" value="${editingMethod.account_number || ''}" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:white;outline:none;box-sizing:border-box;"></div>
            <div><label style="font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-bottom:6px;">IFSC Code</label><input type="text" id="pm-edit-ifsc" value="${editingMethod.ifsc_code || ''}" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:white;outline:none;box-sizing:border-box;"></div>
          ` : `
            <div><label style="font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-bottom:6px;">UPI ID</label><input type="text" id="pm-edit-upi-id" value="${editingMethod.upi_id || ''}" placeholder="e.g. name@upi" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:white;outline:none;box-sizing:border-box;"></div>
            <div>
              <label style="font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-bottom:6px;">UPI QR Code Image</label>
              <div id="pm-qr-dropzone-edit" style="border:2px dashed rgba(255,255,255,0.25);border-radius:12px;padding:18px;text-align:center;cursor:pointer;background:rgba(255,255,255,0.02);">
                <input type="file" id="pm-qr-file-edit" accept="image/*" style="display:none;">
                <div id="pm-qr-text-edit" style="display:${editQrBase64?'none':'flex'};flex-direction:column;align-items:center;gap:8px;color:rgba(255,255,255,0.5);">
                  <span style="font-size:24px;">📤</span><span style="font-size:12px;">Tap to browse or drag &amp; drop</span>
                </div>
                <div id="pm-qr-preview-edit" style="display:${editQrBase64?'flex':'none'};flex-direction:column;align-items:center;gap:8px;">
                  <img id="pm-qr-img-edit" src="${editQrBase64}" style="max-height:90px;border-radius:6px;border:2px solid white;background:white;padding:2px;">
                  <button type="button" id="pm-qr-remove-edit" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;">Remove</button>
                </div>
              </div>
            </div>
          `}
        </div>
        <button type="button" id="pm-btn-save-edit" class="primary-btn full" style="background:var(--cyan);color:black;font-weight:700;border:none;border-radius:8px;padding:12px;cursor:pointer;width:100%;">
          Save Changes
        </button>
      `;
    }

    modal.innerHTML = `
      <style>@keyframes pmSpin{to{transform:rotate(360deg)}}</style>
      <div style="background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;width:100%;max-width:460px;position:relative;box-shadow:0 20px 40px rgba(0,0,0,0.5);box-sizing:border-box;max-height:90vh;overflow-y:auto;">
        <button type="button" onclick="window.pmCloseModal()" style="position:absolute;top:14px;right:14px;background:transparent;border:none;color:white;cursor:pointer;font-size:22px;line-height:1;z-index:10;">×</button>
        <h3 style="margin:0 0 18px 0;font-size:18px;color:#fff;display:flex;align-items:center;gap:8px;">
          ${icon("bank")} Payout Methods
        </h3>
        <div>${content}</div>
      </div>
    `;

    window.pmCloseModal = closeModal;

    if (isLoading) return;

    // Wire up buttons
    if (viewMode === 'list') {
      modal.querySelector('#pm-btn-add')?.addEventListener('click', () => { viewMode = 'add'; currentTab = 'bank'; render(); });
      window.pmSetDefault = async (id) => { await setDefaultMethod(id); };
      window.pmEditProfile = (id) => {
        const m = savedMethods.find(x => x.id === id);
        if (m) { editingMethod = m; editQrBase64 = m.method === 'upi' ? (m.upi_qr_code || '') : ''; viewMode = 'edit'; render(); }
      };
      window.pmDeleteProfile = async (id) => { await deleteMethod(id); };
    }

    if (viewMode === 'add') {
      modal.querySelector('#pm-tab-bank')?.addEventListener('click', () => { currentTab = 'bank'; render(); });
      modal.querySelector('#pm-tab-upi')?.addEventListener('click', () => { currentTab = 'upi'; render(); });
      modal.querySelector('#pm-btn-back')?.addEventListener('click', () => { viewMode = 'list'; render(); });
      modal.querySelector('#pm-btn-save-new')?.addEventListener('click', saveNewMethod);

      if (currentTab === 'upi') {
        const dropzone = modal.querySelector('#pm-qr-dropzone');
        const fileInput = modal.querySelector('#pm-qr-file');
        const qrText = modal.querySelector('#pm-qr-text');
        const qrPreview = modal.querySelector('#pm-qr-preview');
        const qrImg = modal.querySelector('#pm-qr-img');
        const removeBtn = modal.querySelector('#pm-qr-remove');

        const handleFile = async (file) => {
          if (!file.type.startsWith('image/')) return showToast('Please select a valid image file');
          try {
            const url = await uploadUserQrImage(file);
            qrBase64 = url;
            qrImg.src = url;
            qrText.style.display = 'none';
            qrPreview.style.display = 'flex';
          } catch(e) { showToast('Error processing image'); }
        };
        dropzone?.addEventListener('click', () => fileInput?.click());
        fileInput?.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); });
        dropzone?.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.style.borderColor = 'var(--cyan)'; });
        dropzone?.addEventListener('dragleave', () => { dropzone.style.borderColor = 'rgba(255,255,255,0.25)'; });
        dropzone?.addEventListener('drop', (e) => { e.preventDefault(); dropzone.style.borderColor = 'rgba(255,255,255,0.25)'; if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
        removeBtn?.addEventListener('click', (e) => { e.stopPropagation(); qrBase64 = ''; qrText.style.display = 'flex'; qrPreview.style.display = 'none'; });
      }
    }

    if (viewMode === 'edit') {
      modal.querySelector('#pm-btn-cancel-edit')?.addEventListener('click', () => { viewMode = 'list'; editingMethod = null; render(); });
      modal.querySelector('#pm-btn-save-edit')?.addEventListener('click', saveEditMethod);

      if (editingMethod.method === 'upi') {
        const dropzone = modal.querySelector('#pm-qr-dropzone-edit');
        const fileInput = modal.querySelector('#pm-qr-file-edit');
        const qrText = modal.querySelector('#pm-qr-text-edit');
        const qrPreview = modal.querySelector('#pm-qr-preview-edit');
        const qrImg = modal.querySelector('#pm-qr-img-edit');
        const removeBtn = modal.querySelector('#pm-qr-remove-edit');

        const handleFile = async (file) => {
          if (!file.type.startsWith('image/')) return showToast('Please select a valid image file');
          try {
            const url = await uploadUserQrImage(file);
            editQrBase64 = url;
            qrImg.src = url;
            qrText.style.display = 'none';
            qrPreview.style.display = 'flex';
          } catch(e) { showToast('Error processing image'); }
        };
        dropzone?.addEventListener('click', () => fileInput?.click());
        fileInput?.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); });
        dropzone?.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.style.borderColor = 'var(--cyan)'; });
        dropzone?.addEventListener('dragleave', () => { dropzone.style.borderColor = 'rgba(255,255,255,0.25)'; });
        dropzone?.addEventListener('drop', (e) => { e.preventDefault(); dropzone.style.borderColor = 'rgba(255,255,255,0.25)'; if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
        removeBtn?.addEventListener('click', (e) => { e.stopPropagation(); editQrBase64 = ''; qrText.style.display = 'flex'; qrPreview.style.display = 'none'; });
      }
    }
  };

  document.body.appendChild(modal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  fetchMethods();
};

function compressAndConvertQR(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        const maxDim = 800;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round(height * maxDim / width);
            width = maxDim;
          } else {
            width = Math.round(width * maxDim / height);
            height = maxDim;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Invalid image file'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('File reading error'));
    reader.readAsDataURL(file);
  });
}

function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], { type: mime });
}

async function uploadUserQrImage(file) {
  const token = localStorage.getItem("customer-user-token");
  if (!token) throw new Error("Missing auth token");
  const dataUrl = await compressAndConvertQR(file);
  const blob = dataURLtoBlob(dataUrl);
  const formData = new FormData();
  const safeName = (file.name || "upi-qr.jpg").replace(/\.[^.]+$/, "") + ".jpg";
  formData.append("file", blob, safeName);

  const res = await fetch('/api/user/upload', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) {
    throw new Error(data.message || "Upload failed");
  }
  return data.url;
}

window.openWithdrawalModal = function() {
  const existing = document.getElementById("withdrawal-modal");
  if (existing) {
    existing.remove();
    if (window.closeWithdrawalModal) window.closeWithdrawalModal();
  }

  const modal = document.createElement("div");
  modal.id = "withdrawal-modal";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.background = "rgba(0,0,0,0.75)";
  modal.style.backdropFilter = "blur(12px)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "9999";
  modal.style.padding = "20px";
  modal.style.boxSizing = "border-box";

  // Modal State
  let savedMethods = [];
  let isLoading = true;
  let viewMode = 'list'; // 'list', 'add', 'edit'
  let currentTab = 'bank'; // 'bank', 'upi'
  let editingMethod = null;
  let selectedMethodId = null;
  let qrBase64 = '';
  let editQrBase64 = '';

  const cleanup = () => {
    delete window.selectPayoutProfile;
    delete window.setDefaultPayoutProfile;
    delete window.editPayoutProfile;
    delete window.deletePayoutProfile;
    delete window.closeWithdrawalModal;
    delete window.viewQrCodeFromStorefront;
  };

  const closeModal = () => {
    cleanup();
    modal.remove();
  };

  window.closeWithdrawalModal = closeModal;

  // Storefront QR Viewer Modal
  window.viewQrCodeFromStorefront = (base64Image) => {
    const zoomModal = document.createElement("div");
    zoomModal.style.position = "fixed";
    zoomModal.style.top = "0";
    zoomModal.style.left = "0";
    zoomModal.style.width = "100%";
    zoomModal.style.height = "100%";
    zoomModal.style.background = "rgba(0,0,0,0.85)";
    zoomModal.style.display = "flex";
    zoomModal.style.alignItems = "center";
    zoomModal.style.justifyContent = "center";
    zoomModal.style.zIndex = "10000";
    zoomModal.style.padding = "20px";
    zoomModal.style.boxSizing = "border-box";
    zoomModal.innerHTML = `
      <div style="position: relative; max-width: 100%; max-height: 100%;">
        <button type="button" onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: -40px; right: 0; background: transparent; border: none; color: white; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">×</button>
        <img src="${base64Image}" style="max-width: 100%; max-height: 80vh; border-radius: 8px; border: 4px solid white; background: white;">
      </div>
    `;
    document.body.appendChild(zoomModal);
  };

  // Fetch saved payout methods from API
  const fetchPayoutMethods = async () => {
    try {
      const token = localStorage.getItem("customer-user-token");
      const res = await fetch('/api/user/payout-methods', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (res.ok) {
        savedMethods = await res.json();
        // Pre-select default profile
        const defaultMethod = savedMethods.find(m => m.is_default);
        if (defaultMethod) {
          selectedMethodId = defaultMethod.id;
        } else if (savedMethods.length > 0) {
          selectedMethodId = savedMethods[0].id;
        }
        viewMode = savedMethods.length > 0 ? 'list' : 'add';
      }
    } catch (e) {
      console.error("Failed to fetch payout methods", e);
    } finally {
      isLoading = false;
      render();
    }
  };

  const setDefaultMethod = async (id) => {
    try {
      const token = localStorage.getItem("customer-user-token");
      const res = await fetch(`/api/user/payout-methods/${id}/default`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showToast("Default payout method updated");
        await fetchPayoutMethods();
      } else {
        const d = await res.json();
        showToast(d.message || "Failed to update default");
      }
    } catch (e) {
      showToast("Network error");
    }
  };

  const deleteMethod = async (id) => {
    if (!confirm("Are you sure you want to delete this payout profile?")) return;
    try {
      const token = localStorage.getItem("customer-user-token");
      const res = await fetch(`/api/user/payout-methods/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showToast("Payout profile deleted");
        if (selectedMethodId === id) selectedMethodId = null;
        await fetchPayoutMethods();
      } else {
        const d = await res.json();
        showToast(d.message || "Failed to delete");
      }
    } catch (e) {
      showToast("Network error");
    }
  };

  const render = () => {
    const balance = parseInt(localStorage.getItem("user-wallet-balance") || "0");
    let contentHtml = '';

    if (isLoading) {
      contentHtml = `
        <div style="text-align: center; padding: 40px 0; color: white;">
          <style>
            @keyframes modalSpin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
          <div class="spinner" style="border: 3px solid rgba(255,255,255,0.1); border-top: 3px solid var(--cyan); border-radius: 50%; width: 36px; height: 36px; animation: modalSpin 1s linear infinite; margin: 0 auto 16px auto;"></div>
          <p style="font-size: 14px; opacity: 0.8;">Loading saved payout options...</p>
        </div>
      `;
    } else if (viewMode === 'list') {
      contentHtml = `
        <div style="margin-bottom: 20px;">
          <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 8px;">Withdrawal Amount (₹)</label>
          <input type="number" id="withdraw-amount" placeholder="Minimum ₹10" required min="10" max="${balance}" value="${balance}" style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
          <small style="color: rgba(255,255,255,0.4); font-size: 11px; margin-top: 4px; display: block;">Available balance: ₹${balance}</small>
        </div>
        
        <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 8px;">Select Payout Profile</label>
        <div style="display: flex; flex-direction: column; gap: 10px; max-height: 240px; overflow-y: auto; padding-right: 4px; margin-bottom: 20px;">
          ${savedMethods.map(m => {
            const isSelected = selectedMethodId === m.id;
            return `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border-radius: 10px; border: 1px solid ${isSelected ? 'var(--cyan)' : 'rgba(255,255,255,0.08)'}; background: ${isSelected ? 'rgba(35, 244, 239, 0.03)' : 'rgba(255,255,255,0.02)'}; cursor: pointer; transition: all 0.2s;" onclick="window.selectPayoutProfile(${m.id})">
                <div style="display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;">
                  <input type="radio" name="selected_profile" value="${m.id}" ${isSelected ? 'checked' : ''} style="accent-color: var(--cyan); margin: 0; cursor: pointer;">
                  <span style="font-size: 16px; color: ${isSelected ? 'var(--cyan)' : 'rgba(255,255,255,0.6)'};">
                    ${m.method === 'bank' ? '🏦' : '⚡'}
                  </span>
                  <div style="min-width: 0;">
                    <div style="font-size: 13px; font-weight: 600; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${m.method === 'bank' ? `${m.bank_name} (${m.account_number.slice(-4).padStart(m.account_number.length, '*')})` : (m.upi_id || 'UPI QR Code')}
                    </div>
                    <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px;">
                      ${m.method === 'bank' ? m.account_name : 'UPI Payout'}
                      ${m.method === 'upi' && m.upi_qr_code ? `
                        <div style="margin-top: 4px; display: flex; align-items: center; gap: 6px;" onclick="event.stopPropagation();">
                          <img src="${m.upi_qr_code}" style="height: 28px; width: 28px; border-radius: 4px; object-fit: cover; border: 1px solid rgba(255,255,255,0.2); background: white; cursor: pointer;" onclick="window.viewQrCodeFromStorefront('${m.upi_qr_code}')">
                          <span style="font-size: 10px; color: var(--cyan); text-decoration: underline; cursor: pointer;" onclick="window.viewQrCodeFromStorefront('${m.upi_qr_code}')">Click to view QR</span>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 6px;" onclick="event.stopPropagation();">
                  ${m.is_default ? `
                    <span style="font-size: 9px; font-weight: 700; color: var(--cyan); border: 1px solid var(--cyan); background: rgba(35, 244, 239, 0.1); padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">Default</span>
                  ` : `
                    <button type="button" style="background: transparent; border: none; color: rgba(255,255,255,0.4); cursor: pointer; font-size: 11px; padding: 2px 4px;" onclick="window.setDefaultPayoutProfile(${m.id})">Make Default</button>
                  `}
                  <button type="button" style="background: rgba(255,255,255,0.06); border: none; color: white; border-radius: 6px; padding: 6px 8px; font-size: 11px; cursor: pointer;" onclick="window.editPayoutProfile(${m.id})">Edit</button>
                  <button type="button" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #ef4444; border-radius: 6px; padding: 6px 8px; font-size: 11px; cursor: pointer;" onclick="window.deletePayoutProfile(${m.id})">Delete</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        
        <button type="button" id="btn-add-profile" style="background: rgba(255,255,255,0.04); border: 1px dashed rgba(255,255,255,0.15); border-radius: 8px; width: 100%; padding: 10px; color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s; margin-bottom: 20px;">
          <span>➕</span> Add New Payout Method
        </button>

        <button type="submit" id="btn-submit-withdrawal" class="primary-btn full" style="background: var(--cyan); color: black; font-weight: 700; border: none; border-radius: 8px; padding: 12px; cursor: pointer; transition: all 0.2s; width: 100%;">
          Submit Withdrawal Request
        </button>
      `;
    } else if (viewMode === 'add') {
      contentHtml = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          ${savedMethods.length > 0 ? `
            <button type="button" id="btn-back-to-list" style="background: transparent; border: none; color: var(--cyan); font-weight: 600; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 0;">
              ← Back to Saved List
            </button>
          ` : '<div></div>'}
          <span style="font-size: 11px; color: rgba(255,255,255,0.4);">New Profile</span>
        </div>

        <div style="display: flex; background: rgba(255,255,255,0.05); padding: 4px; border-radius: 8px; margin-bottom: 16px; gap: 4px;">
          <button type="button" id="tab-btn-bank" style="flex: 1; padding: 8px; border: none; border-radius: 6px; background: ${currentTab === 'bank' ? 'var(--cyan)' : 'transparent'}; color: ${currentTab === 'bank' ? 'black' : 'white'}; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 13px;">
            Bank Details
          </button>
          <button type="button" id="tab-btn-upi" style="flex: 1; padding: 8px; border: none; border-radius: 6px; background: ${currentTab === 'upi' ? 'var(--cyan)' : 'transparent'}; color: ${currentTab === 'upi' ? 'black' : 'white'}; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 13px;">
            UPI / QR Code
          </button>
        </div>

        <div style="margin-bottom: 14px;">
          <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Withdrawal Amount (₹)</label>
          <input type="number" id="withdraw-amount" placeholder="Minimum ₹10" required min="10" max="${balance}" value="${balance}" style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
          <small style="color: rgba(255,255,255,0.4); font-size: 11px; margin-top: 4px; display: block;">Available balance: ₹${balance}</small>
        </div>

        ${currentTab === 'bank' ? `
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Bank Name</label>
            <input type="text" id="withdraw-bank-name" placeholder="e.g. SBI, HDFC, ICICI" required style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Account Holder Name</label>
            <input type="text" id="withdraw-account-name" placeholder="Name as in bank record" required style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Account Number</label>
            <input type="text" id="withdraw-account-number" placeholder="Enter bank account number" required style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">IFSC Code</label>
            <input type="text" id="withdraw-ifsc" placeholder="e.g. SBIN0001234" required style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
          </div>
        ` : `
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Enter UPI ID</label>
            <input type="text" id="withdraw-upi-id" placeholder="e.g. name@upi" style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
            <small style="color: rgba(255,255,255,0.35); font-size: 10px; margin-top: 3px; display: block;">Or upload your QR Code image below</small>
          </div>
          <div style="margin-bottom: 12px;">
            <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Upload UPI QR Code Scanner Image</label>
            
            <div id="qr-dropzone" style="border: 2px dashed rgba(255,255,255,0.25); border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; background: rgba(255,255,255,0.02); transition: all 0.2s;">
              <input type="file" id="qr-file-input" accept="image/*" style="display: none;">
              <div id="dropzone-text" style="display: flex; flex-direction: column; align-items: center; gap: 8px; color: rgba(255,255,255,0.5);">
                <span style="font-size: 24px;">📤</span>
                <span style="font-size: 12px; font-weight: 500;">Drag & drop your UPI QR image here or <span style="color: var(--cyan); text-decoration: underline;">browse</span></span>
                <span style="font-size: 10px; color: rgba(255,255,255,0.35);">PNG, JPG, JPEG</span>
              </div>
              <div id="dropzone-preview" style="display: ${qrBase64 ? 'flex' : 'none'}; flex-direction: column; align-items: center; gap: 10px;">
                <img id="qr-preview-img" src="${qrBase64}" style="max-height: 100px; border-radius: 6px; border: 2px solid white; background: white; padding: 2px;">
                <span id="qr-filename" style="font-size: 11px; color: var(--cyan); font-weight: 600; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Uploaded</span>
                <button type="button" id="remove-qr-btn" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; border-radius: 6px; padding: 4px 10px; font-size: 11px; cursor: pointer;">Remove Image</button>
              </div>
            </div>
          </div>
        `}

        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px;">
          <input type="checkbox" id="save-profile-checkbox" checked style="accent-color: var(--cyan); cursor: pointer; width: 16px; height: 16px;">
          <label for="save-profile-checkbox" style="font-size: 12px; color: rgba(255,255,255,0.7); cursor: pointer; user-select: none;">Save this payout method for future use</label>
        </div>

        <button type="submit" id="btn-submit-withdrawal" class="primary-btn full" style="background: var(--cyan); color: black; font-weight: 700; border: none; border-radius: 8px; padding: 12px; cursor: pointer; transition: all 0.2s; width: 100%;">
          Submit Withdrawal Request
        </button>
      `;
    } else if (viewMode === 'edit') {
      contentHtml = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <button type="button" id="btn-cancel-edit" style="background: transparent; border: none; color: rgba(255,255,255,0.6); font-weight: 600; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 0;">
            ← Cancel
          </button>
          <span style="font-size: 11px; color: var(--cyan); font-weight: bold; text-transform: uppercase;">Modify Profile</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${editingMethod.method === 'bank' ? `
            <div style="margin-bottom: 0;">
              <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Bank Name</label>
              <input type="text" id="edit-bank-name" value="${editingMethod.bank_name || ''}" required style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
            </div>
            <div style="margin-bottom: 0;">
              <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Account Holder Name</label>
              <input type="text" id="edit-account-name" value="${editingMethod.account_name || ''}" required style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
            </div>
            <div style="margin-bottom: 0;">
              <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Account Number</label>
              <input type="text" id="edit-account-number" value="${editingMethod.account_number || ''}" required style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
            </div>
            <div style="margin-bottom: 0;">
              <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">IFSC Code</label>
              <input type="text" id="edit-ifsc" value="${editingMethod.ifsc_code || ''}" required style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
            </div>
          ` : `
            <div style="margin-bottom: 0;">
              <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Enter UPI ID</label>
              <input type="text" id="edit-upi-id" value="${editingMethod.upi_id || ''}" placeholder="e.g. name@upi" style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
            </div>
            <div style="margin-bottom: 0;">
              <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Upload UPI QR Code Image (optional if UPI ID is entered)</label>
              
              <div id="qr-dropzone-edit" style="border: 2px dashed rgba(255,255,255,0.25); border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; background: rgba(255,255,255,0.02); transition: all 0.2s;">
                <input type="file" id="qr-file-input-edit" accept="image/*" style="display: none;">
                <div id="dropzone-text-edit" style="display: ${editQrBase64 ? 'none' : 'flex'}; flex-direction: column; align-items: center; gap: 8px; color: rgba(255,255,255,0.5);">
                  <span style="font-size: 24px;">📤</span>
                  <span style="font-size: 12px; font-weight: 500;">Drag & drop your UPI QR image here or <span style="color: var(--cyan); text-decoration: underline;">browse</span></span>
                  <span style="font-size: 10px; color: rgba(255,255,255,0.35);">PNG, JPG, JPEG</span>
                </div>
                <div id="dropzone-preview-edit" style="display: ${editQrBase64 ? 'flex' : 'none'}; flex-direction: column; align-items: center; gap: 10px;">
                  <img id="qr-preview-img-edit" src="${editQrBase64}" style="max-height: 100px; border-radius: 6px; border: 2px solid white; background: white; padding: 2px;">
                  <span id="qr-filename-edit" style="font-size: 11px; color: var(--cyan); font-weight: 600; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Saved QR Code</span>
                  <button type="button" id="remove-qr-btn-edit" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; border-radius: 6px; padding: 4px 10px; font-size: 11px; cursor: pointer;">Remove Image</button>
                </div>
              </div>
            </div>
          `}

          <button type="button" id="btn-save-edit" class="primary-btn full" style="background: var(--cyan); color: black; font-weight: 700; border: none; border-radius: 8px; padding: 12px; cursor: pointer; transition: all 0.2s; width: 100%; margin-top: 10px;">
            Save Payout Profile Changes
          </button>
        </div>
      `;
    }

    modal.innerHTML = `
      <div style="background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; width: 100%; max-width: 440px; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.5); box-sizing: border-box;">
        <button type="button" onclick="window.closeWithdrawalModal()" style="position: absolute; top: 16px; right: 16px; background: transparent; border: none; color: white; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; line-height: 1; z-index: 10;">×</button>
        
        <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #fff; display: flex; align-items: center; gap: 8px;">
          ${icon("wallet")} Withdraw Wallet Balance
        </h3>
        
        <form id="withdrawal-modal-form" style="display: flex; flex-direction: column;">
          ${contentHtml}
        </form>
      </div>
    `;

    // Hook listeners after inserting HTML
    if (isLoading) return;

    if (viewMode === 'list') {
      const btnAdd = modal.querySelector("#btn-add-profile");
      if (btnAdd) {
        btnAdd.addEventListener("click", () => {
          viewMode = 'add';
          currentTab = 'bank';
          render();
        });
      }

      // Add selection event handlers to profile list rows
      window.selectPayoutProfile = (id) => {
        selectedMethodId = id;
        render();
      };

      window.setDefaultPayoutProfile = async (id) => {
        await setDefaultMethod(id);
      };

      window.editPayoutProfile = (id) => {
        const method = savedMethods.find(m => m.id === id);
        if (method) {
          editingMethod = method;
          editQrBase64 = method.method === 'upi' ? method.upi_qr_code : '';
          viewMode = 'edit';
          render();
        }
      };

      window.deletePayoutProfile = async (id) => {
        await deleteMethod(id);
      };
    }

    if (viewMode === 'add') {
      const tabBank = modal.querySelector("#tab-btn-bank");
      const tabUpi = modal.querySelector("#tab-btn-upi");
      const btnBack = modal.querySelector("#btn-back-to-list");

      if (tabBank) {
        tabBank.addEventListener("click", () => {
          currentTab = 'bank';
          render();
        });
      }
      if (tabUpi) {
        tabUpi.addEventListener("click", () => {
          currentTab = 'upi';
          render();
        });
      }
      if (btnBack) {
        btnBack.addEventListener("click", () => {
          viewMode = 'list';
          render();
        });
      }

      if (currentTab === 'upi') {
        const dropzone = modal.querySelector("#qr-dropzone");
        const fileInput = modal.querySelector("#qr-file-input");
        const dropzoneText = modal.querySelector("#dropzone-text");
        const dropzonePreview = modal.querySelector("#dropzone-preview");
        const previewImg = modal.querySelector("#qr-preview-img");
        const filenameEl = modal.querySelector("#qr-filename");
        const removeBtn = modal.querySelector("#remove-qr-btn");

        const processFile = async (file) => {
          if (!file.type.startsWith('image/')) {
            showToast('Please select a valid image file');
            return;
          }
          try {
            filenameEl.textContent = 'Processing...';
            dropzoneText.style.display = 'none';
            dropzonePreview.style.display = 'flex';
            
            const url = await uploadUserQrImage(file);
            qrBase64 = url;
            previewImg.src = url;
            filenameEl.textContent = file.name;
          } catch (e) {
            console.error(e);
            showToast('Failed to process image');
            qrBase64 = '';
            dropzoneText.style.display = 'flex';
            dropzonePreview.style.display = 'none';
          }
        };

        dropzone.addEventListener("click", (e) => {
          if (e.target !== removeBtn && !removeBtn.contains(e.target)) {
            fileInput.click();
          }
        });

        fileInput.addEventListener("change", (e) => {
          if (e.target.files.length > 0) {
            processFile(e.target.files[0]);
          }
        });

        dropzone.addEventListener("dragover", (e) => {
          e.preventDefault();
          dropzone.style.borderColor = "var(--cyan)";
          dropzone.style.background = "rgba(16, 243, 237, 0.05)";
        });

        dropzone.addEventListener("dragleave", (e) => {
          e.preventDefault();
          dropzone.style.borderColor = "rgba(255,255,255,0.25)";
          dropzone.style.background = "rgba(255,255,255,0.02)";
        });

        dropzone.addEventListener("drop", (e) => {
          e.preventDefault();
          dropzone.style.borderColor = "rgba(255,255,255,0.25)";
          dropzone.style.background = "rgba(255,255,255,0.02)";
          if (e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0]);
          }
        });

        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          qrBase64 = '';
          fileInput.value = '';
          dropzoneText.style.display = 'flex';
          dropzonePreview.style.display = 'none';
        });
      }
    }

    if (viewMode === 'edit') {
      const btnCancel = modal.querySelector("#btn-cancel-edit");
      const btnSave = modal.querySelector("#btn-save-edit");

      if (btnCancel) {
        btnCancel.addEventListener("click", () => {
          viewMode = 'list';
          editingMethod = null;
          render();
        });
      }

      if (btnSave) {
        btnSave.addEventListener("click", async () => {
          const body = {};
          const token = localStorage.getItem("customer-user-token");

          if (editingMethod.method === 'bank') {
            body.bank_name = modal.querySelector("#edit-bank-name").value.trim();
            body.account_name = modal.querySelector("#edit-account-name").value.trim();
            body.account_number = modal.querySelector("#edit-account-number").value.trim();
            body.ifsc_code = modal.querySelector("#edit-ifsc").value.trim();

            if (!body.bank_name || !body.account_name || !body.account_number || !body.ifsc_code) {
              showToast("All fields are required");
              return;
            }
          } else {
            const editUpiId = modal.querySelector("#edit-upi-id").value.trim();
            if (!editUpiId && !editQrBase64) {
              showToast("Please enter a UPI ID or upload a UPI QR code image");
              return;
            }
            body.upi_id = editUpiId;
            body.upi_qr_code = editQrBase64 || "";
          }

          try {
            const res = await fetch(`/api/user/payout-methods/${editingMethod.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(body)
            });

            if (res.ok) {
              showToast("Payout profile updated successfully");
              viewMode = 'list';
              editingMethod = null;
              await fetchPayoutMethods();
            } else {
              const d = await res.json();
              showToast(d.message || "Failed to update profile");
            }
          } catch (err) {
            showToast("Network error");
          }
        });
      }

      if (editingMethod.method === 'upi') {
        const dropzone = modal.querySelector("#qr-dropzone-edit");
        const fileInput = modal.querySelector("#qr-file-input-edit");
        const dropzoneText = modal.querySelector("#dropzone-text-edit");
        const dropzonePreview = modal.querySelector("#dropzone-preview-edit");
        const previewImg = modal.querySelector("#qr-preview-img-edit");
        const filenameEl = modal.querySelector("#qr-filename-edit");
        const removeBtn = modal.querySelector("#remove-qr-btn-edit");

        const processFile = async (file) => {
          if (!file.type.startsWith('image/')) {
            showToast('Please select a valid image file');
            return;
          }
          try {
            filenameEl.textContent = 'Processing...';
            dropzoneText.style.display = 'none';
            dropzonePreview.style.display = 'flex';
            
            const url = await uploadUserQrImage(file);
            editQrBase64 = url;
            previewImg.src = url;
            filenameEl.textContent = file.name;
          } catch (e) {
            console.error(e);
            showToast('Failed to process image');
            editQrBase64 = '';
            dropzoneText.style.display = 'flex';
            dropzonePreview.style.display = 'none';
          }
        };

        dropzone.addEventListener("click", (e) => {
          if (e.target !== removeBtn && !removeBtn.contains(e.target)) {
            fileInput.click();
          }
        });

        fileInput.addEventListener("change", (e) => {
          if (e.target.files.length > 0) {
            processFile(e.target.files[0]);
          }
        });

        dropzone.addEventListener("dragover", (e) => {
          e.preventDefault();
          dropzone.style.borderColor = "var(--cyan)";
          dropzone.style.background = "rgba(16, 243, 237, 0.05)";
        });

        dropzone.addEventListener("dragleave", (e) => {
          e.preventDefault();
          dropzone.style.borderColor = "rgba(255,255,255,0.25)";
          dropzone.style.background = "rgba(255,255,255,0.02)";
        });

        dropzone.addEventListener("drop", (e) => {
          e.preventDefault();
          dropzone.style.borderColor = "rgba(255,255,255,0.25)";
          dropzone.style.background = "rgba(255,255,255,0.02)";
          if (e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0]);
          }
        });

        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          editQrBase64 = '';
          fileInput.value = '';
          dropzoneText.style.display = 'flex';
          dropzonePreview.style.display = 'none';
        });
      }
    }

    // Modal submit listener (for either list or add mode withdrawal requests)
    const withdrawalForm = modal.querySelector("#withdrawal-modal-form");
    withdrawalForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (viewMode === 'edit') return; // Handled separately by btnSave click

      if (balance === 0) {
        showToast("You cannot submit a withdrawal request when your balance is ₹0.");
        return;
      }

      const amountInput = modal.querySelector("#withdraw-amount");
      const amount = parseInt(amountInput.value);
      if (isNaN(amount) || amount < 10) {
        showToast("Minimum withdrawal is ₹10");
        return;
      }
      if (amount > balance) {
        showToast("Insufficient wallet balance");
        return;
      }

      const body = { amount: amount };

      if (viewMode === 'list') {
        if (!selectedMethodId) {
          showToast("Please select a payout profile");
          return;
        }
        const profile = savedMethods.find(m => m.id === selectedMethodId);
        if (!profile) {
          showToast("Selected payout profile not found");
          return;
        }
        body.method = profile.method;
        if (profile.method === 'bank') {
          body.bank_name = profile.bank_name;
          body.account_name = profile.account_name;
          body.account_number = profile.account_number;
          body.ifsc_code = profile.ifsc_code;
        } else {
          body.upi_id = profile.upi_id || "";
          body.upi_qr_code = profile.upi_qr_code || "";
        }
      } else if (viewMode === 'add') {
        body.method = currentTab;
        const saveProfile = modal.querySelector("#save-profile-checkbox").checked;

        if (currentTab === 'bank') {
          body.bank_name = modal.querySelector("#withdraw-bank-name").value.trim();
          body.account_name = modal.querySelector("#withdraw-account-name").value.trim();
          body.account_number = modal.querySelector("#withdraw-account-number").value.trim();
          body.ifsc_code = modal.querySelector("#withdraw-ifsc").value.trim();

          if (!body.bank_name || !body.account_name || !body.account_number || !body.ifsc_code) {
            showToast("All bank fields are required");
            return;
          }
        } else {
          const upiId = modal.querySelector("#withdraw-upi-id").value.trim();
          if (!upiId && !qrBase64) {
            showToast("Please enter a UPI ID or upload a UPI QR code scanner image");
            return;
          }
          body.upi_id = upiId;
          body.upi_qr_code = qrBase64 || "";
        }

        if (!saveProfile) {
          body.skip_save = true;
        }
      }

      try {
        const token = localStorage.getItem("customer-user-token");
        const res = await fetch('/api/user/withdrawals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(body)
        });

        const data = await res.json();
        if (res.ok) {
          showToast("Withdrawal request submitted successfully!");
          closeModal();
          await loadUserProfile();
          await loadUserWithdrawalsFromApi();
        } else {
          showToast(data.message || "Failed to submit withdrawal request");
        }
      } catch (err) {
        console.error(err);
        showToast("Network error submitting request");
      }
    });
  };

  fetchPayoutMethods();
  document.body.appendChild(modal);
};

function renderWallet() {
  const balance = parseInt(localStorage.getItem("user-wallet-balance") || "0");
  
  views.wallet.innerHTML = `
    ${renderBackBar("Wallet")}
    <section class="wallet-card">
      <div>
        <p>Wallet Balance</p>
        <h1>${money(balance)}</h1>
      </div>
      <span class="round-icon">${icon("wallet")}</span>
    </section>
    
      <div class="section-head">
        <h2>Withdrawal Options</h2>
      </div>
      <div class="list-panel" style="margin-bottom: 24px;">
        <div class="list-row compact-row" onclick="window.handleWithdrawalClick()" style="cursor: pointer;">
          <span class="round-icon">${icon("bank")}</span>
          <span><strong>Withdraw Referral Amount</strong><small>Withdraw earnings to bank or UPI QR</small></span>
          <span style="color: rgba(255,255,255,0.4); font-weight: bold; font-size: 16px; margin-left: auto;">&gt;</span>
        </div>
      </div>
    
    <div class="section-head">
      <h2>Transactions</h2>
    </div>
    <div class="list-panel" style="margin-bottom: 24px;">
      ${(userProfile && userProfile.total_earnings > 0) || (userWithdrawalsList && userWithdrawalsList.length > 0) ? `
        ${userProfile && userProfile.total_earnings > 0 ? `
          <div class="list-row compact-row">
            <span class="round-icon">${icon("plus")}</span>
            <span><strong>Referral Earnings</strong><small>Credited on successful referral</small></span>
            <strong class="green">+ ${money(userProfile.total_earnings)}</strong>
          </div>
        ` : ''}
        ${userWithdrawalsList ? userWithdrawalsList.map(w => `
          <div class="list-row compact-row">
            <span class="round-icon" style="background: rgba(255, 91, 103, 0.1); color: #ff5b67;">${icon("minus")}</span>
            <span style="flex: 1; margin-left: 10px;">
              <strong>Withdrawal (${w.method === 'bank' ? 'Bank' : 'UPI QR'})</strong>
              <small style="display: block; margin-top: 2px;">Status: <span class="${w.status === 'Approved' ? 'green' : w.status === 'Pending' ? 'orange' : 'red'}" style="font-weight:600;">${w.status}</span> • ${formatDate(w.created_at)}</small>
            </span>
            <strong class="red" style="color: #ff5b67;">- ${money(w.amount)}</strong>
          </div>
        `).join('') : ''}
      ` : `
        <div style="padding: 24px; text-align: center; color: var(--muted); font-size: 14px;">
          No transactions yet.
        </div>
      `}
    </div>

    <div class="section-head">
      <h2>Referrals History</h2>
    </div>
    <div class="list-panel">
      ${userReferralsList && userReferralsList.length > 0 ? userReferralsList.map(ref => `
        <div class="list-row compact-row" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px;">
          <div>
            <strong style="display: block; color: white;">${ref.name}</strong>
            <small style="color: rgba(255,255,255,0.5); font-size: 12px;">${ref.phone} • Joined ${formatDate(ref.created_at)}</small>
          </div>
          <div style="text-align: right;">
            <strong class="${ref.status === 'Completed' ? 'green' : 'orange'}" style="display: block; font-size: 14px;">
              ${ref.status === 'Completed' ? `+ ${money(ref.reward_amount)}` : 'Pending'}
            </strong>
            <small style="color: ${ref.status === 'Completed' ? '#A855F7' : '#f59e0b'}; font-size: 11px; text-transform: uppercase; font-weight: 600;">
              ${ref.status}
            </small>
          </div>
        </div>
      `).join('') : `
        <div style="padding: 24px; text-align: center; color: var(--muted); font-size: 14px;">
          No referrals yet. Share your code or referral link!
        </div>
      `}
    </div>
  `;
}

function renderOrders() {
  const activeFilter = state.selectedOrderStatusFilter || "All";
  
  const filteredOrders = orders.filter((order) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Pending") {
      return ["pending", "payment pending"].includes(order.status.toLowerCase());
    }
    if (activeFilter === "Confirmed") {
      return ["accepted", "confirmed"].includes(order.status.toLowerCase());
    }
    return order.status.toLowerCase() === activeFilter.toLowerCase();
  });

  views.orders.innerHTML = `
    ${renderBackBar("My Orders")}
    <div class="chip-row">
      ${["All", "Pending", "Confirmed", "Shipped", "Delivered"].map((item) => {
        const isActive = item === activeFilter;
        return `<button class="chip ${isActive ? "is-active" : ""}" onclick="state.selectedOrderStatusFilter='${item}'; renderOrders();">${item}</button>`;
      }).join("")}
    </div>
    <div class="order-list">
      ${filteredOrders.length ? filteredOrders.map((order) => {
        const catalogProduct = products.find((item) => String(item.id) === String(order.productId));
        const product = { ...(catalogProduct || {}), ...(order.product || {}) };
        const normalizedStatus = String(order.status || "").trim().toLowerCase();
        const isPaymentPending = normalizedStatus === "payment pending";
        const isTrackable = !["cancelled", "declined", "payment pending"].includes(normalizedStatus);
        const totalLabel = isPaymentPending ? "Amount Due" : normalizedStatus === "cancelled" ? "Order Total" : "Total Paid";
        const { color, model } = parseColorAndModel(order.color);
        const variantImage = window.getProductSelectedVariantImage(product, color, model);
        return `
          <article class="order-card">
            <div class="summary-row">
              <div><strong>Order #${order.id}</strong><small>${order.date}</small></div>
              <span class="status-pill ${statusClass(order.status)}">${order.status}</span>
            </div>
            <div class="order-product" data-open-product="${product.id}" style="cursor:pointer;" title="View product page">
              <img src="${variantImage}" alt="${product.name}">
              <div>
                <h3>${product.name}</h3>
                ${(color || model) ? `
                  <div style="font-size: 11px; color: rgba(255,255,255,0.45); margin: 3px 0 6px 0; display: flex; gap: 8px; flex-wrap: wrap;">
                    ${model ? `<span>Model: <strong style="color: var(--cyan);">${model}</strong></span>` : ''}
                    ${color ? `<span>Color: <strong style="color: var(--cyan);">${color}</strong></span>` : ''}
                  </div>
                ` : ''}
                ${product.category ? `<p>${product.category}</p>` : ''}
                <strong>${money(product.price)}</strong>
              </div>
              <span>Qty: ${order.qty}</span>
            </div>
            <div class="order-footer">
              <span>${totalLabel}: <strong style="color: var(--cyan);">${money(order.total || (product.price * order.qty))}</strong></span>
              <div class="order-footer-buttons">
                ${isPaymentPending ? `
                <button id="pay-now-order-${order.dbId}" onclick="window.payNow(${order.dbId})"
                        style="background: linear-gradient(135deg, #8b5cf6, #a855f7); border: 1.5px solid #a855f7; color: #fff; border-radius: 20px; padding: 6px 18px; font-size: 12px; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s;">
                  ${icon("wallet")} Pay Now
                </button>
                ` : isTrackable ? `
                <button onclick="window.trackOrder(${order.dbId})"
                        style="background: transparent; border: 1.5px solid var(--cyan); color: var(--cyan); border-radius: 20px; padding: 6px 16px; font-size: 12px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s;"
                        onmouseover="this.style.background='rgba(0, 210, 255, 0.05)'"
                        onmouseout="this.style.background='transparent'">
                  <span style="display: flex; align-items: center; justify-content: center; width: 14px; height: 14px; color: var(--cyan); fill: none; stroke: currentColor;">${icon("pin")}</span> Track Order
                </button>
                ` : ''}
                <button onclick="window.showOrderDetailsModal(${order.dbId})"
                        style="background: rgba(255, 255, 255, 0.15); border: none; color: #fff; border-radius: 20px; padding: 6px 16px; font-size: 12px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s;"
                        onmouseover="this.style.background='rgba(255, 255, 255, 0.25)'"
                        onmouseout="this.style.background='rgba(255, 255, 255, 0.15)'">
                  View Details
                </button>
              </div>
            </div>
          </article>
        `;
      }).join("") : emptyState("box", "No orders found", `You have no ${activeFilter !== 'All' ? activeFilter.toLowerCase() : ''} orders yet.`)}
    </div>
  `;
}

window.showOrderDetailsModal = function(dbId) {
  const order = orders.find(o => o.dbId === dbId);
  if (!order) return showToast("Order not found");

  const product = order.product || getProduct(order.productId);
  const isLocked = ["shipped", "delivered", "cancelled"].includes(order.status.toLowerCase());
  
  let modal = document.getElementById("order-details-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "order-details-modal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(15, 23, 42, 0.75)";
    modal.style.backdropFilter = "blur(12px)";
    modal.style.zIndex = "1000";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.padding = "20px";
    modal.style.boxSizing = "border-box";
    document.body.appendChild(modal);
  }

  const renderModalContent = () => {
        const { color: orderColor, model: orderModel } = parseColorAndModel(order.color);
        const variantImage = window.getProductSelectedVariantImage(product, orderColor, orderModel);
        
        modal.innerHTML = `
      <div class="auth-card" style="width: 100%; max-width: 480px; padding: 24px; position: relative; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
        <button onclick="document.getElementById('order-details-modal').style.display='none'" style="position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--text-dim); font-size: 24px; cursor: pointer;">&times;</button>
        
        <h2 style="font-size: 20px; margin-bottom: 4px;">Order Details</h2>
        <p style="color: var(--text-dim); font-size: 13px; margin-bottom: 20px;">Order ID: #${order.id}</p>
        
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.04); padding: 12px 16px; border-radius: 12px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.06);">
          <span style="font-size: 14px; color: var(--text-dim);">Status</span>
          <span class="status-pill ${statusClass(order.status)}">${order.status}</span>
        </div>
        
        <div style="display: flex; gap: 16px; background: rgba(255,255,255,0.02); padding: 14px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px;">
          <img src="${variantImage}" alt="${product.name}" style="width: 70px; height: 70px; object-fit: contain; background: rgba(255,255,255,0.05); border-radius: 12px; padding: 4px;">
          <div style="flex: 1;">
            <h3 style="font-size: 15px; margin: 0 0 4px; color: white;">${product.name}</h3>
            ${(orderColor || orderModel) ? `
              <div style="font-size: 11px; color: rgba(255,255,255,0.45); margin: 3px 0 8px 0; display: flex; gap: 8px; flex-wrap: wrap;">
                ${orderModel ? `<span>Model: <strong style="color: var(--cyan);">${orderModel}</strong></span>` : ''}
                ${orderColor ? `<span>Color: <strong style="color: var(--cyan);">${orderColor}</strong></span>` : ''}
              </div>
            ` : ''}
            <p style="font-size: 12px; color: var(--text-dim); margin: 0 0 8px;">${product.category}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color: var(--cyan); font-size: 14px;">${money(product.price)}</strong>
              <span style="font-size: 13px; color: var(--text-dim);">Qty: ${order.qty}</span>
            </div>
          </div>
        </div>
        
        <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px; font-size: 14px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-dim);">Subtotal</span>
            <span>${money(product.price * order.qty)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: 700; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 8px;">
            <span>Total Paid</span>
            <span style="color: var(--cyan);">${money(order.total || (product.price * order.qty))}</span>
          </div>
        </div>
        
        <div style="background: rgba(255,255,255,0.02); padding: 16px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h4 style="margin: 0; font-size: 14px; font-weight: 600; color: white;">Shipping Address</h4>
            ${!isLocked ? `<button id="edit-details-addr-btn" style="background: none; border: none; color: var(--cyan); font-size: 13px; font-weight: 600; cursor: pointer;">Edit</button>` : ''}
          </div>
          
          <div id="modal-address-container">
            <p id="modal-address-text" style="margin: 0; font-size: 13px; color: var(--text-dim); line-height: 1.5; white-space: pre-line;">${order.shippingAddress || 'No address specified'}</p>
          </div>
          
          ${isLocked ? `
            <div style="display: flex; gap: 8px; margin-top: 12px; color: var(--orange); font-size: 12px; align-items: flex-start; line-height: 1.4;">
              <span style="font-size: 16px; line-height: 1;">&#9888;</span>
              <span>Address updates are locked because the order has already been ${order.status.toLowerCase()}.</span>
            </div>
          ` : ''}
        </div>
        
        ${order.status.toLowerCase() === 'pending' ? `
          <button
            id="cancel-order-btn"
            style="
              width: 100%; padding: 14px; border-radius: 12px;
              background: rgba(239, 68, 68, 0.08);
              border: 1.5px solid rgba(239, 68, 68, 0.35);
              color: #f87171; font-weight: 700; font-size: 14px;
              cursor: pointer; display: flex; align-items: center;
              justify-content: center; gap: 8px; margin-bottom: 10px;
              transition: all 0.2s ease;
            "
            onmouseover="this.style.background='rgba(239,68,68,0.16)'"
            onmouseout="this.style.background='rgba(239,68,68,0.08)'"
            onclick="window.cancelOrder(${order.dbId})"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            Cancel Order
          </button>
        ` : ''}
        <button onclick="document.getElementById('order-details-modal').style.display='none'" class="primary-btn full">Close Details</button>
      </div>
    `;
    
    const editBtn = modal.querySelector("#edit-details-addr-btn");
    if (editBtn) {
      editBtn.addEventListener("click", () => {
        const container = modal.querySelector("#modal-address-container");
        const currentAddr = order.shippingAddress || '';
        container.innerHTML = `
          <textarea id="modal-address-input" style="width: 100%; height: 80px; padding: 10px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: white; font-size: 13px; line-height: 1.5; resize: none; outline: none; margin-bottom: 10px; font-family: inherit;">${currentAddr}</textarea>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button id="cancel-details-addr-btn" style="padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.15); background: none; color: white; font-size: 12px; font-weight: 600; cursor: pointer;">Cancel</button>
            <button id="save-details-addr-btn" style="padding: 6px 12px; border-radius: 6px; border: none; background: var(--cyan); color: #0f172a; font-size: 12px; font-weight: 600; cursor: pointer;">Save</button>
          </div>
        `;
        
        editBtn.style.display = 'none';
        
        modal.querySelector("#cancel-details-addr-btn").addEventListener("click", () => {
          renderModalContent();
        });
        
        modal.querySelector("#save-details-addr-btn").addEventListener("click", async () => {
          const newAddr = modal.querySelector("#modal-address-input").value.trim();
          if (!newAddr) return showToast("Address cannot be empty");
          
          const token = localStorage.getItem("customer-user-token");
          if (!token) return;
          
          try {
            const res = await fetch(`/api/user/orders/${order.dbId}/address`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ shipping_address: newAddr })
            });
            
            const data = await res.json();
            if (res.ok) {
              showToast("Address updated successfully");
              order.shippingAddress = newAddr;
              localStorage.setItem("iselectrics-orders", JSON.stringify(orders));
              renderModalContent();
              if (state.view === "orders") renderOrders();
            } else {
              showToast(data.message || "Failed to update address");
            }
          } catch (e) {
            showToast("Error updating address");
          }
        });
      });
    }
  };

  renderModalContent();
  modal.style.display = "flex";
};

window.cancelOrder = async function(dbId) {
  const order = orders.find(o => o.dbId === dbId);
  if (!order) return showToast("Order not found");

  if (order.status.toLowerCase() !== 'pending') {
    return showToast("Only pending orders can be cancelled.");
  }

  const confirmed = confirm("Are you sure you want to cancel this order? This cannot be undone.");
  if (!confirmed) return;

  const token = localStorage.getItem("customer-user-token");
  if (!token) return showToast("Please log in to cancel orders.");

  const btn = document.getElementById("cancel-order-btn");
  if (btn) { btn.disabled = true; btn.textContent = "Cancelling…"; }

  try {
    const res = await fetch(`/api/user/orders/${dbId}/cancel`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (res.ok) {
      // Update local state
      order.status = 'Cancelled';
      localStorage.setItem("iselectrics-orders", JSON.stringify(orders));
      showToast("Order cancelled successfully.");
      // Close modal and refresh orders view
      const modal = document.getElementById('order-details-modal');
      if (modal) modal.style.display = 'none';
      if (state.view === 'orders') renderOrders();
    } else {
      showToast(data.message || "Failed to cancel order.");
      if (btn) { btn.disabled = false; btn.textContent = "Cancel Order"; }
    }
  } catch (e) {
    showToast("Network error. Please try again.");
    if (btn) { btn.disabled = false; btn.textContent = "Cancel Order"; }
  }
};

window.payNow = async function(dbId) {
  const order = orders.find((item) => item.dbId === dbId);
  if (!order) return showToast("Order not found");
  if (String(order.status || "").trim().toLowerCase() !== "payment pending") {
    return showToast("Payment is not pending for this order.");
  }

  const token = localStorage.getItem("customer-user-token");
  if (!token) return showToast("Please log in to continue payment.");

  const button = document.getElementById(`pay-now-order-${dbId}`);
  if (button) {
    button.disabled = true;
    button.textContent = "Starting payment...";
  }

  try {
    const response = await fetch(`/api/user/orders/${dbId}/pay`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Unable to start payment.");
    if (!data.payment_session_id || typeof Cashfree !== "function") {
      throw new Error("Payment service is unavailable. Please try again.");
    }

    const cashfree = Cashfree({ mode: data.mode || "production" });
    await cashfree.checkout({ paymentSessionId: data.payment_session_id });
  } catch (error) {
    showToast(error.message || "Unable to start payment. Please try again.");
    if (button) {
      button.disabled = false;
      button.innerHTML = `${icon("wallet")} Pay Now`;
    }
  }
};

window.trackOrder = function(dbId) {
  const order = orders.find(o => o.dbId === dbId);
  if (!order) return showToast("Order not found");
  
  const status = (order.status || "").toLowerCase();
  if (status === "pending") {
    showToast("Order is pending approval. Tracking details will be updated once shipped.");
  } else if (status === "confirmed") {
    showToast("Order confirmed. We are packing your items for dispatch!");
  } else if (status === "shipped") {
    showToast(`Order has been shipped! Tracking ID: ZD${order.id}IN via Delhivery.`);
  } else if (status === "delivered") {
    showToast("Order delivered successfully!");
  } else {
    showToast(`Order status: ${order.status}`);
  }
};

function getAddresses() {
  return addresses;
}

window.deleteAddress = async function(id) {
  const token = localStorage.getItem("customer-user-token");
  if (!token) return;
  if (!confirm("Are you sure you want to delete this address?")) return;
  try {
    const res = await fetch(`/api/user/addresses/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      showToast("Address deleted successfully");
      await loadAddressesFromApi();
      renderAddresses();
    } else {
      showToast("Failed to delete address");
    }
  } catch(e) {
    showToast("Error deleting address");
  }
};

window.setDefaultAddress = async function(id) {
  const token = localStorage.getItem("customer-user-token");
  if (!token) return;
  try {
    const res = await fetch(`/api/user/addresses/${id}/default`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      showToast("Default address updated");
      await loadAddressesFromApi();
      renderAddresses();
    } else {
      showToast("Failed to set default address");
    }
  } catch(e) {
    showToast("Error setting default address");
  }
};

window.closeAddressModal = function() {
  const backdrop = document.getElementById("address-modal-backdrop");
  const overlay = document.getElementById("address-modal-overlay");
  if (backdrop && overlay) {
    backdrop.classList.remove("active");
    overlay.classList.remove("active");
    setTimeout(() => {
      backdrop.remove();
      overlay.remove();
    }, 300);
  }
};

window.openAddressModal = function(titleHtml, formContentHtml, onSubmitFn) {
  const existingBackdrop = document.getElementById("address-modal-backdrop");
  const existingOverlay = document.getElementById("address-modal-overlay");
  if (existingBackdrop) existingBackdrop.remove();
  if (existingOverlay) existingOverlay.remove();

  const backdrop = document.createElement("div");
  backdrop.id = "address-modal-backdrop";
  backdrop.className = "address-backdrop";
  backdrop.onclick = window.closeAddressModal;

  const overlay = document.createElement("div");
  overlay.id = "address-modal-overlay";
  overlay.className = "address-overlay";
  
  overlay.innerHTML = `
    <button onclick="window.closeAddressModal()" style="position: absolute; top: 16px; right: 16px; background: transparent; border: none; color: white; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; line-height: 1; z-index: 10;">&times;</button>
    <h3 style="margin: 0 0 20px 0; font-size: 18px; color: #fff; display: flex; align-items: center; gap: 8px;">
      ${titleHtml}
    </h3>
    <form id="address-modal-form" class="address-form-grid">
      ${formContentHtml}
    </form>
  `;

  document.body.appendChild(backdrop);
  document.body.appendChild(overlay);

  // Force reflow
  overlay.offsetHeight;

  backdrop.classList.add("active");
  overlay.classList.add("active");

  const form = document.getElementById("address-modal-form");
  if (form && typeof onSubmitFn === "function") {
    form.addEventListener("submit", onSubmitFn);
  }

  restrictPhoneInput(document.getElementById("addr-phone"));
  const pincodeEl = document.getElementById("addr-pincode");
  if (pincodeEl) {
    pincodeEl.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 6);
    });
  }
};

function getAddressFormHtml(labelVal, nameVal, phoneVal, houseNoVal, areaVal, landmarkVal, cityVal, stateVal, pincodeVal, isDefaultChecked) {
  return `
    <div style="margin-bottom: 0;">
      <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Address Label (e.g. Home, Office, Other)</label>
      <input type="text" id="addr-label" placeholder="Home" required value="${labelVal}" style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
    </div>

    <div class="address-form-row-2">
      <div style="margin-bottom: 0;">
        <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Recipient Name</label>
        <input type="text" id="addr-name" placeholder="John Doe" required value="${nameVal}" style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
      </div>
      <div style="margin-bottom: 0;">
        <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Recipient Phone Number</label>
        <div style="display: flex; gap: 0; align-items: stretch;">
          <span style="display: flex; align-items: center; padding: 0 12px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px 0 0 8px; color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 700; border-right: none;">+91</span>
          <input type="tel" id="addr-phone" placeholder="98765 43210" required value="${phoneVal.replace(/\D/g, '').slice(-10)}" style="border-radius: 0 8px 8px 0; flex: 1; margin: 0; padding: 10px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: white; outline: none; box-sizing: border-box;">
        </div>
      </div>
    </div>

    <div style="margin-bottom: 0;">
      <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Flat, House no., Building, Company, Apartment</label>
      <input type="text" id="addr-house-no" placeholder="e.g. Flat 101, Sky Heights" required value="${houseNoVal}" style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
    </div>

    <div style="margin-bottom: 0;">
      <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Area, Street, Sector, Village</label>
      <input type="text" id="addr-area" placeholder="e.g. Sector 15, MG Road" required value="${areaVal}" style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
    </div>

    <div style="margin-bottom: 0;">
      <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Landmark (Optional)</label>
      <input type="text" id="addr-landmark" placeholder="e.g. near Apollo Hospital" value="${landmarkVal}" style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
    </div>

    <div class="address-form-row-3">
      <div style="margin-bottom: 0;">
        <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Town/City</label>
        <input type="text" id="addr-city" placeholder="Mumbai" required value="${cityVal}" style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
      </div>
      <div style="margin-bottom: 0;">
        <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">State</label>
        <input type="text" id="addr-state" placeholder="Maharashtra" required value="${stateVal}" style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
      </div>
      <div style="margin-bottom: 0;">
        <label style="font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 6px;">Pincode</label>
        <input type="text" id="addr-pincode" placeholder="400001" required value="${pincodeVal}" style="width:100%; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:white; outline:none; box-sizing:border-box;">
      </div>
    </div>

    <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
      <input type="checkbox" id="addr-default" ${isDefaultChecked ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: #6366f1; cursor: pointer;">
      <label for="addr-default" style="font-size: 13px; color: rgba(255,255,255,0.8); cursor: pointer;">Set as Default Address</label>
    </div>

    <button type="submit" style="padding: 12px; border-radius: 8px; background: #6366f1; color: white; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin-top: 10px;">
      Save Address
    </button>
  `;
}

window.showAddAddressModal = function() {
  const defaultName = localStorage.getItem("user-name") || "";
  const defaultPhone = localStorage.getItem("user-phone") || "";

  const titleHtml = `${icon("pin")} Add New Address`;
  const formHtml = getAddressFormHtml("Home", defaultName, defaultPhone, "", "", "", "", "", "", true);
  window.openAddressModal(titleHtml, formHtml, window.submitNewAddress);
};

window.submitNewAddress = async function(event) {
  event.preventDefault();
  // submitNewAddress event fired
  
  try {
    const label = document.getElementById("addr-label").value.trim();
    const name = document.getElementById("addr-name").value.trim();
    const rawPhone = document.getElementById("addr-phone").value.trim();
    const house_no = document.getElementById("addr-house-no").value.trim();
    const area = document.getElementById("addr-area").value.trim();
    const landmark = document.getElementById("addr-landmark").value.trim();
    const city = document.getElementById("addr-city").value.trim();
    const state = document.getElementById("addr-state").value.trim();
    const pincode = document.getElementById("addr-pincode").value.trim();
    const is_default = document.getElementById("addr-default").checked;

    // Form values: { label, name, rawPhone, house_no, area, landmark, city, state, pincode, is_default });

    if (!rawPhone || rawPhone.length !== 10) {
      showToast(`Phone number must be 10 digits (current: ${rawPhone.length} digits)`);
      return;
    }
    if (!pincode || pincode.length !== 6) {
      showToast(`Pincode must be 6 digits (current: ${pincode.length} digits)`);
      return;
    }
    const phone = "+91" + rawPhone;

    const token = localStorage.getItem("customer-user-token");
    if (!token) {
      showToast("Error: Missing user authentication token!");
      return;
    }

    showToast("Saving address...");
    const res = await fetch('/api/user/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ label, name, phone, house_no, area, landmark, city, state, pincode, is_default })
    });
    
    if (res.ok) {
      showToast("Address saved successfully");
      window.closeAddressModal();
      await loadAddressesFromApi();
      renderAddresses();
      if (state.view === "checkout") renderCheckout();
    } else {
      const err = await res.json();
      showToast(err.message || "Failed to save address");
    }
  } catch(e) {
    showToast("Error reading form data: " + e.message);
    console.error(e);
  }
};

window.showEditAddressModal = function(addr) {
  const titleHtml = `${icon("pin")} Edit Address`;
  const formHtml = getAddressFormHtml(
    addr.label || '', 
    addr.name || '', 
    addr.phone || '', 
    addr.house_no || addr.line || '', 
    addr.area || '', 
    addr.landmark || '', 
    addr.city || '', 
    addr.state || '', 
    addr.pincode || '', 
    !!addr.is_default
  );
  window.openAddressModal(titleHtml, formHtml, (event) => window.submitEditAddress(event, addr.id));
};

window.submitEditAddress = async function(event, addressId) {
  event.preventDefault();
  // submitEditAddress event fired for ID: addressId
  
  try {
    const label = document.getElementById("addr-label").value.trim();
    const name = document.getElementById("addr-name").value.trim();
    const rawPhone = document.getElementById("addr-phone").value.trim();
    const house_no = document.getElementById("addr-house-no").value.trim();
    const area = document.getElementById("addr-area").value.trim();
    const landmark = document.getElementById("addr-landmark").value.trim();
    const city = document.getElementById("addr-city").value.trim();
    const state = document.getElementById("addr-state").value.trim();
    const pincode = document.getElementById("addr-pincode").value.trim();
    const is_default = document.getElementById("addr-default").checked;

    // Form values (edit): { label, name, rawPhone, house_no, area, landmark, city, state, pincode, is_default });

    if (!rawPhone || rawPhone.length !== 10) {
      showToast(`Phone number must be 10 digits (current: ${rawPhone.length} digits)`);
      return;
    }
    if (!pincode || pincode.length !== 6) {
      showToast(`Pincode must be 6 digits (current: ${pincode.length} digits)`);
      return;
    }
    const phone = "+91" + rawPhone;

    const token = localStorage.getItem("customer-user-token");
    if (!token) {
      showToast("Error: Missing user authentication token!");
      return;
    }

    showToast("Updating address...");
    const res = await fetch(`/api/user/addresses/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ label, name, phone, house_no, area, landmark, city, state, pincode, is_default })
    });

    if (res.ok) {
      showToast("Address updated successfully");
      window.closeAddressModal();
      await loadAddressesFromApi();
      if (state.view === "checkout") renderCheckout();
      if (state.view === "addresses") renderAddresses();
    } else {
      const data = await res.json();
      showToast(data.message || "Failed to update address");
    }
  } catch (e) {
    showToast("Error reading form data: " + e.message);
    console.error(e);
  }
};

async function loadPayoutMethodsFromApi() {
  const token = localStorage.getItem("customer-user-token");
  if (!token) {
    payoutMethods = [];
    return;
  }
  try {
    const res = await fetch('/api/user/payout-methods', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    if (res.ok) {
      payoutMethods = await res.json();
    }
  } catch (e) {
    console.error("Failed to load payout methods", e);
  }
}

async function handlePayoutQRUpload(e, isEdit) {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const url = await uploadUserQrImage(file);
    if (isEdit) {
      payoutEditQrBase64 = url;
    } else {
      payoutQrBase64 = url;
    }
    renderPayout();
  } catch (err) {
    showToast("Error uploading QR image");
  }
}

async function setPayoutDefault(id) {
  const token = localStorage.getItem("customer-user-token");
  try {
    const res = await fetch(`/api/user/payout-methods/${id}/default`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      showToast("Default payout method updated");
      await loadPayoutMethodsFromApi();
      renderPayout();
    } else {
      showToast("Failed to update default method");
    }
  } catch (e) {
    showToast("Network error");
  }
}

async function deletePayoutMethod(id) {
  if (!confirm("Are you sure you want to delete this payout method?")) return;
  const token = localStorage.getItem("customer-user-token");
  try {
    const res = await fetch(`/api/user/payout-methods/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      showToast("Payout method deleted");
      await loadPayoutMethodsFromApi();
      payoutViewMode = 'list';
      renderPayout();
    } else {
      showToast("Failed to delete payout method");
    }
  } catch (e) {
    showToast("Network error");
  }
}

function editPayoutMethod(id) {
  const m = payoutMethods.find(x => x.id === id);
  if (m) {
    payoutEditingMethod = m;
    payoutEditQrBase64 = m.method === 'upi' ? (m.upi_qr_code || '') : '';
    payoutViewMode = 'edit';
    renderPayout();
  }
}

async function saveNewPayoutMethod(e) {
  e.preventDefault();
  const token = localStorage.getItem("customer-user-token");
  let body = {};
  if (payoutCurrentTab === 'bank') {
    const bankName = document.getElementById('pm-bank-name')?.value.trim();
    const accountName = document.getElementById('pm-account-name')?.value.trim();
    const accountNumber = document.getElementById('pm-account-number')?.value.trim();
    const ifsc = document.getElementById('pm-ifsc')?.value.trim();
    if (!bankName || !accountName || !accountNumber || !ifsc) return showToast("Please fill all bank details");
    body = { method: 'bank', bank_name: bankName, account_name: accountName, account_number: accountNumber, ifsc_code: ifsc };
  } else {
    const upiId = document.getElementById('pm-upi-id')?.value.trim();
    if (!upiId && !payoutQrBase64) return showToast("Please enter a UPI ID or upload a QR image");
    body = { method: 'upi', upi_id: upiId || undefined, upi_qr_code: payoutQrBase64 || undefined };
  }
  try {
    const res = await fetch('/api/user/payout-methods', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      showToast("Payout method saved!");
      payoutQrBase64 = '';
      payoutViewMode = 'list';
      await loadPayoutMethodsFromApi();
      renderPayout();
    } else {
      const d = await res.json();
      showToast(d.message || "Failed to save");
    }
  } catch (e) {
    showToast("Network error");
  }
}

async function saveEditPayoutMethod(e) {
  e.preventDefault();
  const token = localStorage.getItem("customer-user-token");
  let body = { method: payoutEditingMethod.method };
  if (payoutEditingMethod.method === 'bank') {
    body.bank_name = document.getElementById('pm-edit-bank-name')?.value.trim();
    body.account_name = document.getElementById('pm-edit-account-name')?.value.trim();
    body.account_number = document.getElementById('pm-edit-account-number')?.value.trim();
    body.ifsc_code = document.getElementById('pm-edit-ifsc')?.value.trim();
    if (!body.bank_name || !body.account_name || !body.account_number || !body.ifsc_code) return showToast("Please fill all bank details");
  } else {
    body.upi_id = document.getElementById('pm-edit-upi-id')?.value.trim() || undefined;
    body.upi_qr_code = payoutEditQrBase64 || undefined;
    if (!body.upi_id && !body.upi_qr_code) return showToast("Please enter a UPI ID or upload a QR image");
  }
  try {
    const res = await fetch(`/api/user/payout-methods/${payoutEditingMethod.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      showToast("Payout profile updated!");
      payoutEditingMethod = null;
      payoutEditQrBase64 = '';
      payoutViewMode = 'list';
      await loadPayoutMethodsFromApi();
      renderPayout();
    } else {
      const d = await res.json();
      showToast(d.message || "Failed to update");
    }
  } catch (e) {
    showToast("Network error");
  }
}

function renderPayout() {
  const container = views.payout;
  if (!container) return;

  let content = "";
  if (payoutViewMode === 'list') {
    content = `
      <div class="payout-header-row">
        <h2>Saved Payout Methods</h2>
        <button class="primary-btn" onclick="payoutViewMode='add'; payoutCurrentTab='bank'; renderPayout();">
          ${icon("plus")} Add New Payout Method
        </button>
      </div>
      <div class="payout-methods-list">
        ${payoutMethods.length === 0 ? `
          <div class="payout-empty-state">
            <span class="round-icon">${icon("bank")}</span>
            <p>No payout methods saved yet. Add a bank account or UPI ID to withdraw your earnings.</p>
          </div>
        ` : payoutMethods.map(m => `
          <div class="payout-method-card ${m.is_default ? 'is-default' : ''}">
            <div class="pm-type-icon">${m.method === 'bank' ? icon("bank") : icon("spark")}</div>
            <div class="pm-details">
              <div class="pm-title">
                ${m.method === 'bank' ? `${m.bank_name} •••• ${m.account_number.slice(-4)}` : (m.upi_id || 'UPI QR Code')}
                ${m.is_default ? '<span class="status-pill delivered" style="margin-left:8px;">Default</span>' : ''}
              </div>
              <div class="pm-subtitle">
                ${m.method === 'bank' ? m.account_name : 'UPI Payout'}
              </div>
              ${m.method === 'upi' && m.upi_qr_code ? `
                <div class="pm-qr-link" onclick="window.pmViewQr('${m.upi_qr_code}')">
                  <img src="${m.upi_qr_code}" alt="QR Code">
                  <span>View QR Code</span>
                </div>
              ` : ''}
            </div>
            <div class="pm-actions">
              ${!m.is_default ? `<button class="link-btn" onclick="setPayoutDefault(${m.id})" style="font-size:12px;margin-right:8px;">Set Default</button>` : ''}
              <button class="secondary-btn icon-only" onclick="editPayoutMethod(${m.id})" aria-label="Edit">${icon("edit")}</button>
              <button class="secondary-btn icon-only danger" onclick="deletePayoutMethod(${m.id})" aria-label="Delete">${icon("trash")}</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (payoutViewMode === 'add') {
    content = `
      <div class="payout-header-row">
        <h2>Add Payout Method</h2>
        <button class="link-btn" onclick="payoutViewMode='list'; renderPayout();">← Back to List</button>
      </div>
      <div class="payout-tab-bar">
        <button class="payout-tab ${payoutCurrentTab === 'bank' ? 'is-active' : ''}" onclick="payoutCurrentTab='bank'; renderPayout();">${icon("bank")} Bank Transfer</button>
        <button class="payout-tab ${payoutCurrentTab === 'upi' ? 'is-active' : ''}" onclick="payoutCurrentTab='upi'; renderPayout();">${icon("spark")} UPI / QR Code</button>
      </div>
      <form class="payout-form" onsubmit="saveNewPayoutMethod(event)">
        ${payoutCurrentTab === 'bank' ? `
          <div class="form-grid">
            <div class="form-group"><label>Bank Name</label><input type="text" id="pm-bank-name" required placeholder="e.g. SBI, HDFC, ICICI"></div>
            <div class="form-group"><label>Account Holder Name</label><input type="text" id="pm-account-name" required placeholder="Name as in bank record"></div>
            <div class="form-group"><label>Account Number</label><input type="text" id="pm-account-number" required placeholder="Enter bank account number"></div>
            <div class="form-group"><label>IFSC Code</label><input type="text" id="pm-ifsc" required placeholder="e.g. SBIN0001234"></div>
          </div>
        ` : `
          <div class="form-grid">
            <div class="form-group">
              <label>UPI ID</label>
              <input type="text" id="pm-upi-id" placeholder="e.g. name@upi">
              <small>Or upload a QR code image below (at least one is required)</small>
            </div>
            <div class="form-group">
              <label>UPI QR Code Image</label>
              <div id="pm-qr-dropzone" class="qr-dropzone">
                <input type="file" id="pm-qr-file" accept="image/*" style="display:none;" onchange="handlePayoutQRUpload(event, false)">
                <div id="pm-qr-text" style="display:${payoutQrBase64 ? 'none' : 'flex'}; flex-direction:column; align-items:center; gap:8px;">
                  <span>📤</span>
                  <span>Tap to browse or drag &amp; drop QR Code</span>
                </div>
                <div id="pm-qr-preview" style="display:${payoutQrBase64 ? 'flex' : 'none'}; flex-direction:column; align-items:center; gap:8px;">
                  <img src="${payoutQrBase64}" style="max-height:100px; border-radius:6px; border:2px solid white; background:white; padding:2px;">
                  <button type="button" class="secondary-btn danger" onclick="event.stopPropagation(); payoutQrBase64=''; renderPayout();">Remove QR</button>
                </div>
              </div>
            </div>
          </div>
        `}
        <button class="primary-btn full" type="submit" style="margin-top:20px;">Save Payout Method</button>
      </form>
    `;
  } else if (payoutViewMode === 'edit') {
    content = `
      <div class="payout-header-row">
        <h2>Edit Payout Method</h2>
        <button class="link-btn" onclick="payoutViewMode='list'; payoutEditingMethod=null; renderPayout();">← Cancel</button>
      </div>
      <form class="payout-form" onsubmit="saveEditPayoutMethod(event)">
        ${payoutEditingMethod.method === 'bank' ? `
          <div class="form-grid">
            <div class="form-group"><label>Bank Name</label><input type="text" id="pm-edit-bank-name" required value="${payoutEditingMethod.bank_name || ''}"></div>
            <div class="form-group"><label>Account Holder Name</label><input type="text" id="pm-edit-account-name" required value="${payoutEditingMethod.account_name || ''}"></div>
            <div class="form-group"><label>Account Number</label><input type="text" id="pm-edit-account-number" required value="${payoutEditingMethod.account_number || ''}"></div>
            <div class="form-group"><label>IFSC Code</label><input type="text" id="pm-edit-ifsc" required value="${payoutEditingMethod.ifsc_code || ''}"></div>
          </div>
        ` : `
          <div class="form-grid">
            <div class="form-group">
              <label>UPI ID</label>
              <input type="text" id="pm-edit-upi-id" value="${payoutEditingMethod.upi_id || ''}" placeholder="e.g. name@upi">
            </div>
            <div class="form-group">
              <label>UPI QR Code Image</label>
              <div id="pm-qr-dropzone-edit" class="qr-dropzone">
                <input type="file" id="pm-qr-file-edit" accept="image/*" style="display:none;" onchange="handlePayoutQRUpload(event, true)">
                <div id="pm-qr-text-edit" style="display:${payoutEditQrBase64 ? 'none' : 'flex'}; flex-direction:column; align-items:center; gap:8px;">
                  <span>📤</span>
                  <span>Tap to browse or drag &amp; drop QR Code</span>
                </div>
                <div id="pm-qr-preview-edit" style="display:${payoutEditQrBase64 ? 'flex' : 'none'}; flex-direction:column; align-items:center; gap:8px;">
                  <img src="${payoutEditQrBase64}" style="max-height:100px; border-radius:6px; border:2px solid white; background:white; padding:2px;">
                  <button type="button" class="secondary-btn danger" onclick="event.stopPropagation(); payoutEditQrBase64=''; renderPayout();">Remove QR</button>
                </div>
              </div>
            </div>
          </div>
        `}
        <button class="primary-btn full" type="submit" style="margin-top:20px;">Save Changes</button>
      </form>
    `;
  }

  container.innerHTML = `
    ${renderBackBar("Payout Methods")}
    <div class="payout-view-container">
      <div class="payout-left-panel">
        ${content}
      </div>
      <div class="payout-right-panel">
        <div class="payout-info-card">
          <h3>Supported Methods</h3>
          <p>We support secure withdrawals directly to your Bank Account or UPI ID / QR code.</p>
          <div class="payout-method-badge">
            <span class="badge-icon">${icon("bank")}</span>
            <div>
              <strong>Bank Transfer</strong>
              <span>Takes 1-2 business days to settle</span>
            </div>
          </div>
          <div class="payout-method-badge">
            <span class="badge-icon">${icon("spark")}</span>
            <div>
              <strong>UPI Payout</strong>
              <span>Instant settlement to active UPI IDs</span>
            </div>
          </div>
          <div class="payout-info-notes">
            <strong>Important Notes:</strong>
            <ul>
              <li>Minimum withdrawal amount is ₹10.</li>
              <li>Please double check your account details before saving.</li>
              <li>Only one payout method can be active as default at a time.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach drag-drop events for dropzones
  const dropzone = document.getElementById("pm-qr-dropzone");
  if (dropzone) {
    const fileInput = document.getElementById("pm-qr-file");
    dropzone.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
    dropzone.addEventListener("dragleave", () => { dropzone.classList.remove("dragover"); });
    dropzone.addEventListener("drop", async (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      if (e.dataTransfer.files[0]) {
        try {
          payoutQrBase64 = await uploadUserQrImage(e.dataTransfer.files[0]);
          renderPayout();
        } catch (err) {
          showToast("Error uploading QR image");
        }
      }
    });
  }

  const dropzoneEdit = document.getElementById("pm-qr-dropzone-edit");
  if (dropzoneEdit) {
    const fileInputEdit = document.getElementById("pm-qr-file-edit");
    dropzoneEdit.addEventListener("click", () => fileInputEdit.click());
    dropzoneEdit.addEventListener("dragover", (e) => { e.preventDefault(); dropzoneEdit.classList.add("dragover"); });
    dropzoneEdit.addEventListener("dragleave", () => { dropzoneEdit.classList.remove("dragover"); });
    dropzoneEdit.addEventListener("drop", async (e) => {
      e.preventDefault();
      dropzoneEdit.classList.remove("dragover");
      if (e.dataTransfer.files[0]) {
        try {
          payoutEditQrBase64 = await uploadUserQrImage(e.dataTransfer.files[0]);
          renderPayout();
        } catch (err) {
          showToast("Error uploading QR image");
        }
      }
    });
  }
}

function renderAddresses() {
  views.addresses.innerHTML = `
    ${renderBackBar("My Addresses")}
    <h2>Saved Addresses</h2>
    <div class="address-list">
      ${getAddresses().length === 0 ? `
        <div style="padding: 40px; text-align: center; color: var(--muted); font-size: 14px;">
          No saved addresses found. Add a new address below!
        </div>
      ` : getAddresses().map((address) => `
        <article class="address-card">
          <div class="address-head">
            <span class="radio-dot ${address.is_default ? "checked" : ""}" onclick="setDefaultAddress(${address.id})"></span>
            <strong>${address.label}</strong>
            ${address.is_default ? '<span class="status-pill delivered">Default</span>' : ""}
          </div>
          <p><strong>${address.name}</strong><br>${address.phone}<br>${address.line}<br>India</p>
          <div class="address-actions">
            <button class="secondary-btn" onclick="setDefaultAddress(${address.id})">${icon("shield")} Set Default</button>
            <button class="secondary-btn" onclick="window.showEditAddressModal(${JSON.stringify(address).replace(/"/g, '&quot;')})">${icon("edit")} Edit</button>
            <button class="secondary-btn" onclick="deleteAddress(${address.id})">${icon("trash")} Remove</button>
          </div>
        </article>
      `).join("")}
    </div>
    <button class="primary-btn full" onclick="showAddAddressModal()">${icon("plus")} Add New Address</button>
  `;
}

function renderWishlist() {
  const list = wishlistIds.map(getProduct).filter(Boolean);
  views.wishlist.innerHTML = `
    ${renderBackBar("Wishlist")}
    <div class="section-head">
      <h2>${list.length} Saved Items</h2>
      <button class="link-btn" data-nav="categories">Shop more ${icon("arrow")}</button>
    </div>
    ${list.length > 0 ? `
    <div class="product-grid">${list.map(productCard).join("")}</div>
    ` : emptyState("heart", "Your wishlist is empty", "Save products to see them here.")}
  `;
}

function renderRecent() {
  const list = recentIds.map(getProduct);
  views.recent.innerHTML = `
    ${renderBackBar("Recently Viewed", `<button class="icon-btn" aria-label="Clear history">${icon("trash")}</button>`)}
    <div class="recent-list">
      ${list.map((product) => `
        <article class="recent-card" data-open-product="${product.id}">
          <img src="${product.image}" alt="${product.name}">
          <div>
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <strong>${money(product.price)}</strong>
          </div>
          <button class="mini-cart" data-open-drawer="${product.id}" aria-label="Select options for ${product.name}">${icon("cart")}</button>
        </article>
      `).join("")}
    </div>
    <button class="secondary-btn full">${icon("trash")} Clear All History</button>
  `;
}

function renderSettings() {
  const name = userProfile?.name || localStorage.getItem("user-name") || "";
  const email = userProfile?.email || localStorage.getItem("user-email") || "";
  const phone = userProfile?.phone || localStorage.getItem("user-phone") || "";

  views.settings.innerHTML = `
    ${renderBackBar("Account Settings")}
    <div style="padding: 20px; max-width: 500px; margin: 0 auto;">
      <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 20px; color: var(--text);">Profile & Security</h2>
      
      <form id="settings-profile-form" onsubmit="event.preventDefault(); window.submitCustomerProfileUpdate();" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group" style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7);">Full Name</label>
          <input type="text" id="settings-name" value="${name}" required style="width: 100%; height: 44px; padding: 0 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: white; font-size: 14px;">
        </div>
        
        <div class="form-group" style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7);">Email Address</label>
          <input type="email" id="settings-email" value="${email}" required style="width: 100%; height: 44px; padding: 0 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: white; font-size: 14px;">
        </div>
        
        <div class="form-group" style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7);">Phone Number</label>
          <input type="text" id="settings-phone" value="${phone}" readonly style="width: 100%; height: 44px; padding: 0 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.5); font-size: 14px; cursor: not-allowed;" title="Phone Number cannot be modified.">
        </div>
        
        <div class="form-group" style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7);">New Password (leave blank to keep current)</label>
          <input type="password" id="settings-password" placeholder="••••••••" style="width: 100%; height: 44px; padding: 0 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: white; font-size: 14px;">
        </div>
        
        <button type="submit" class="primary-btn full" style="height: 44px; font-weight: 600; margin-top: 10px;">Save Changes</button>
      </form>
      
      <div style="margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;">
        <button type="button" class="secondary-btn full" onclick="window.customerLogout()" style="height: 44px; color: #ef4444; border-color: rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.05); font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px;">
          ${icon("back")} Log Out
        </button>
      </div>
    </div>
  `;
}

window.submitCustomerProfileUpdate = async function() {
  const token = localStorage.getItem("customer-user-token");
  if (!token) return;

  const name = document.getElementById("settings-name").value.trim();
  const email = document.getElementById("settings-email").value.trim();
  const phone = document.getElementById("settings-phone").value.trim();
  const password = document.getElementById("settings-password").value;

  const bodyObj = { name, phone };
  if (email) bodyObj.email = email;
  if (password) bodyObj.password = password;

  try {
    const res = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bodyObj)
    });

    if (res.ok) {
      showToast("Profile updated successfully");
      await loadUserProfile();
      renderAll();
    } else {
      const err = await res.json();
      showToast(err.message || "Failed to update profile");
    }
  } catch (e) {
    showToast("Error updating profile");
  }
};

window.customerLogout = function() {
  localStorage.removeItem("customer-user-token");
  localStorage.setItem("user-authenticated", "false");
  localStorage.removeItem("user-name");
  localStorage.removeItem("user-email");
  localStorage.removeItem("user-phone");
  localStorage.removeItem("user-referral-code");
  localStorage.removeItem("user-wallet-balance");
  userProfile = null;
  loadWishlist();
  showToast("Logged out successfully");
  setView("home");
};

function formatThankYouDate(dateString) {
  let date = new Date();
  if (dateString) {
    const isoString = dateString.replace(' ', 'T');
    const parsed = new Date(isoString);
    if (!isNaN(parsed.getTime())) {
      date = parsed;
    }
  }
  const day = date.getDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${day} ${monthName} ${year}, ${hours}:${minutes} ${ampm}`;
}

window.copyReferralCode = function(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast("Referral code copied!");
  }).catch(() => {
    const el = document.createElement('textarea');
    el.value = code;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast("Referral code copied!");
  });
};

window.copyReferralLink = function(link) {
  navigator.clipboard.writeText(link).then(() => {
    showToast("Referral link copied!");
  }).catch(() => {
    const el = document.createElement('textarea');
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast("Referral link copied!");
  });
};

window.shareOnWhatsApp = function(code, link) {
  const message = `Use my referral ${code} ${link}`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
};

window.shareOnInstagram = function(link) {
  navigator.clipboard.writeText(link).then(() => {
    showToast("Link copied! Share it on your Instagram Story or Bio.");
  }).catch(() => {
    showToast("Failed to copy link");
  });
};

window.shareMore = function(code, link) {
  const message = `Use my referral ${code}`;
  if (navigator.share) {
    navigator.share({
      title: 'ZappDeal Referral',
      text: message,
      url: link
    }).catch(err => {
      window.copyReferralLink(link);
    });
  } else {
    window.copyReferralLink(link);
  }
};

function renderThankyou() {
  const order = state.lastPlacedOrder;
  if (!order) {
    views.thankyou.innerHTML = `
      <div style="padding:48px; text-align:center;">
        <h2>No Order Placed Yet</h2>
        <button class="primary-btn" onclick="setView('home')" style="margin-top:16px;">Go Home</button>
      </div>
    `;
    return;
  }

  const code = localStorage.getItem("user-referral-code") || "SAVE20";
  const visualLink = `${getAppBaseUrl()}ref/${code}`;
  const actualLink = `${getAppBaseUrl()}?ref=${code}`;
  
  const orderDate = new Date(order.created_at || Date.now());
  orderDate.setDate(orderDate.getDate() + 3);
  const deliveryDateStr = orderDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  
  const savedAmount = order.discount_amount || 0;

  views.thankyou.innerHTML = `
    <style>
      .thankyou-container {
        padding: 24px 16px;
        text-align: center;
        max-width: 500px;
        margin: 0 auto;
        font-family: var(--font-family, inherit);
        color: white;
      }
      .order-details-grid-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 16px;
        padding: 20px;
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .detail-row {
        display: flex;
        justify-content: space-between;
        gap: 16px;
      }
      .detail-item {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 12px;
        text-align: left;
      }
      .detail-icon-wrapper {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: rgba(139, 92, 246, 0.12);
        color: #a78bfa;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .detail-icon-wrapper svg {
        width: 18px;
        height: 18px;
      }
      .detail-label {
        color: rgba(255, 255, 255, 0.4);
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        display: block;
        margin-bottom: 2px;
      }
      .detail-val {
        color: white;
        font-size: 13px;
        font-weight: 700;
        display: block;
      }
      .detail-val.text-cyan {
        color: #00d2ff;
        font-size: 15px;
      }
      .secure-payment-bar {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        padding: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        text-align: left;
      }
      .secure-shield-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(16, 185, 129, 0.12);
        color: #10b981;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .secure-shield-icon svg {
        width: 16px;
        height: 16px;
      }
      .secure-payment-title {
        color: #10b981;
        font-size: 11px;
        font-weight: 700;
        margin-bottom: 1px;
      }
      .secure-payment-subtitle {
        color: rgba(255, 255, 255, 0.5);
        font-size: 10px;
      }
      .estimated-delivery-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 16px;
        padding: 20px;
        margin-bottom: 16px;
        text-align: left;
      }
      .delivery-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }
      .delivery-icon-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(139, 92, 246, 0.15);
        color: #a78bfa;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .delivery-icon-circle svg {
        width: 20px;
        height: 20px;
      }
      .delivery-title {
        color: white;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 2px;
      }
      .delivery-subtitle {
        color: rgba(255, 255, 255, 0.5);
        font-size: 11px;
      }
      .delivery-date-badge {
        background: rgba(139, 92, 246, 0.15);
        color: #a78bfa;
        font-size: 11px;
        font-weight: 700;
        padding: 6px 12px;
        border-radius: 20px;
      }
      .delivery-progress-container {
        position: relative;
        padding: 10px 0;
        margin-top: 10px;
      }
      .progress-line-background {
        position: absolute;
        top: 25px;
        left: 20px;
        right: 20px;
        height: 3px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 2px;
        z-index: 1;
      }
      .progress-line-fill {
        position: absolute;
        top: 25px;
        left: 20px;
        height: 3px;
        background: linear-gradient(90deg, #a78bfa, #8B5CF6);
        border-radius: 2px;
        z-index: 1;
      }
      .progress-steps {
        position: relative;
        display: flex;
        justify-content: space-between;
        z-index: 2;
      }
      .step-node {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 60px;
      }
      .step-dot {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #111827;
        border: 2px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
        transition: all 0.3s;
      }
      .step-dot svg {
        width: 14px;
        height: 14px;
      }
      .step-node.active .step-dot {
        background: #a78bfa;
        border-color: #a78bfa;
        color: white;
        box-shadow: 0 0 10px rgba(167, 139, 250, 0.5);
      }
      .step-label {
        font-size: 8.5px;
        color: rgba(255, 255, 255, 0.4);
        text-align: center;
        font-weight: 600;
        white-space: nowrap;
      }
      .step-node.active .step-label {
        color: white;
      }
      .referral-gradient-card {
        position: relative;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 16px;
        padding: 20px;
        margin-bottom: 16px;
        overflow: hidden;
      }
      .referral-header-block {
        display: flex;
        gap: 16px;
        align-items: flex-start;
        margin-bottom: 20px;
        text-align: left;
      }
      .referral-gift-wrapper {
        width: 54px;
        height: 54px;
        border-radius: 12px;
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2));
        color: #a78bfa;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.15);
      }
      .referral-gift-wrapper svg {
        width: 28px;
        height: 28px;
      }
      .referral-title {
        color: white;
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 4px;
      }
      .referral-desc {
        color: rgba(255, 255, 255, 0.6);
        font-size: 11px;
        line-height: 1.4;
      }
      .code-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(139, 92, 246, 0.05);
        border: 1px dashed rgba(139, 92, 246, 0.35);
        border-radius: 10px;
        padding: 12px 14px;
        margin-bottom: 16px;
      }
      .link-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(6, 182, 212, 0.05);
        border: 1px dashed rgba(6, 182, 212, 0.35);
        border-radius: 10px;
        padding: 12px 14px;
      }
      .referral-label-text {
        text-align: left;
        font-size: 10.5px;
        color: rgba(255, 255, 255, 0.4);
        display: block;
        margin-bottom: 6px;
        font-weight: 600;
      }
      .saved-discount-banner {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 14px;
        padding: 14px 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
        cursor: pointer;
      }
      .discount-tag-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(219, 39, 119, 0.15);
        color: #db2777;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .discount-tag-icon svg {
        width: 16px;
        height: 16px;
      }
      .saved-title {
        color: #10b981;
        font-size: 11.5px;
        font-weight: 700;
        margin-bottom: 2px;
      }
      .saved-subtitle {
        color: rgba(255, 255, 255, 0.4);
        font-size: 10px;
      }
      .arrow-right-icon {
        color: rgba(255, 255, 255, 0.3);
        display: flex;
        align-items: center;
        margin-left: auto;
      }
      .success-btn-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-top: 10px;
      }
      .success-btn-outline {
        border: 1px solid rgba(139, 92, 246, 0.4);
        background: transparent;
        color: #a78bfa;
        font-weight: 700;
        height: 48px;
        border-radius: 12px;
        cursor: pointer;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s;
      }
      .success-btn-outline:hover {
        background: rgba(139, 92, 246, 0.05);
      }
      .success-btn-filled {
        background: #8B5CF6;
        color: white;
        border: none;
        font-weight: 700;
        height: 48px;
        border-radius: 12px;
        cursor: pointer;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        transition: all 0.2s;
      }
      .success-btn-filled:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }
      .success-btn-outline svg, .success-btn-filled svg {
        width: 16px;
        height: 16px;
      }
    </style>
    <div class="thankyou-container">
      <!-- Confetti & Checkmark -->
      <div class="checkmark-animation-container" style="position: relative; width: 120px; height: 120px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
        <svg style="position: absolute; width: 120px; height: 120px; pointer-events: none;" viewBox="0 0 120 120">
          <circle cx="35" cy="25" r="2.5" fill="#fbbf24" />
          <circle cx="85" cy="22" r="2.5" fill="#22c55e" />
          <path d="M88 35 Q93 33 91 28" stroke="#A855F7" stroke-width="1.8" fill="none" stroke-linecap="round" />
          <path d="M22 55 Q25 48 30 51" stroke="#fbbf24" stroke-width="1.8" fill="none" stroke-linecap="round" />
          <path d="M32 88 Q38 92 35 96" stroke="#22c55e" stroke-width="1.8" fill="none" stroke-linecap="round" />
          <circle cx="92" cy="85" r="2" fill="#A855F7" />
          <path d="M80 98 L85 95" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round" />
          <circle cx="22" cy="38" r="1.5" fill="#22c55e" />
          <circle cx="98" cy="48" r="2" fill="#fbbf24" />
        </svg>
        <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #a855f7, #6366f1); display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 0 24px rgba(168, 85, 247, 0.45); z-index: 2;">
          <svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>

      <h1 style="font-size: 26px; font-weight: 800; margin: 16px 0 6px; color: white; letter-spacing: -0.02em;">Order <span style="color:#a78bfa;">Successful!</span></h1>
      <p style="color: rgba(255,255,255,0.6); font-size: 13.5px; margin: 0; padding: 0 10px; line-height: 1.45;">Thank you for your purchase. Your order has been placed successfully.</p>
      <div style="width: 40px; height: 3px; background: #8B5CF6; margin: 12px auto 24px auto; border-radius: 2px;"></div>
      
      <!-- Order Info Card -->
      <div class="order-details-grid-card">
        <div class="detail-row">
          <div class="detail-item">
            <div class="detail-icon-wrapper">${icon("file")}</div>
            <div>
              <span class="detail-label">Order ID</span>
              <strong class="detail-val">#ORD${String(order.id).padStart(6, '0')}</strong>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon-wrapper">${icon("calendar")}</div>
            <div>
              <span class="detail-label">Order Date</span>
              <strong class="detail-val">${formatThankYouDate(order.created_at)}</strong>
            </div>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <div class="detail-icon-wrapper">${icon("tag")}</div>
            <div>
              <span class="detail-label">Total Amount</span>
              <strong class="detail-val text-cyan">₹${Number(order.total).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon-wrapper">${icon("credit-card")}</div>
            <div>
              <span class="detail-label">Payment Method</span>
              <strong class="detail-val">${order.payment_method === 'COD' ? 'COD' : 'Online'}</strong>
            </div>
          </div>
        </div>
        
        <!-- 100% Secure Payment Bar -->
        <div class="secure-payment-bar">
          <div class="secure-shield-icon">${icon("shield")}</div>
          <div>
            <div class="secure-payment-title">100% Secure Payment</div>
            <div class="secure-payment-subtitle">Your payment is safe and secure with us.</div>
          </div>
        </div>
      </div>
      
      <!-- Estimated Delivery Card -->
      <div class="estimated-delivery-card">
        <div class="delivery-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="delivery-icon-circle">${icon("truck")}</div>
            <div>
              <div class="delivery-title">Estimated Delivery</div>
              <div class="delivery-subtitle">Your order will be delivered by</div>
            </div>
          </div>
          <span class="delivery-date-badge">${deliveryDateStr}</span>
        </div>
        
        <!-- Progress Steps -->
        <div class="delivery-progress-container">
          <div class="progress-line-background"></div>
          <div class="progress-line-fill" style="width: 25%;"></div>
          <div class="progress-steps">
            <div class="step-node active">
              <div class="step-dot">${icon("check")}</div>
              <span class="step-label">Order Placed</span>
            </div>
            <div class="step-node active">
              <div class="step-dot">${icon("check")}</div>
              <span class="step-label">Confirmed</span>
            </div>
            <div class="step-node">
              <div class="step-dot">${icon("truck")}</div>
              <span class="step-label">Shipped</span>
            </div>
            <div class="step-node">
              <div class="step-dot">${icon("truck")}</div>
              <span class="step-label">Out for Delivery</span>
            </div>
            <div class="step-node">
              <div class="step-dot">${icon("box")}</div>
              <span class="step-label">Delivered</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Referral Rewards Card -->
      <div class="referral-gradient-card">
        <div class="referral-header-block">
          <div class="referral-gift-wrapper">
            ${icon("gift")}
          </div>
          <div>
            <div class="referral-title">Share & Earn Rewards!</div>
            <div class="referral-desc">Share your referral link with friends and earn exciting rewards on their purchases.</div>
          </div>
        </div>
        
        <div style="text-align: left;">
          <span class="referral-label-text">Your Referral Code</span>
          <div class="code-container">
            <span style="font-family: monospace; font-size: 16px; font-weight: 700; color: #8B5CF6; letter-spacing: 1px;">${code}</span>
            <button onclick="window.copyReferralCode('${code}')" style="background: transparent; border: none; color: rgba(255,255,255,0.6); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 4px; transition: color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>
          
          <span class="referral-label-text">Your Referral Link</span>
          <div class="link-container">
            <span style="font-size: 12.5px; color: #00d2ff; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; flex: 1; margin-right: 8px;">${visualLink}</span>
            <button onclick="window.copyReferralLink('${actualLink}')" style="background: transparent; border: none; color: rgba(255,255,255,0.6); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 4px; transition: color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- You saved banner -->
      ${savedAmount > 0 ? `
        <div class="saved-discount-banner" onclick="setView('referral')">
          <div class="discount-tag-icon">${icon("tag")}</div>
          <div style="flex: 1; text-align: left;">
            <div class="saved-title">You saved ₹${savedAmount} on this order!</div>
            <div class="saved-subtitle">Thanks for shopping with ZappDeal.</div>
          </div>
          <div class="arrow-right-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      ` : ""}
      
      <!-- Action Buttons -->
      <div class="success-btn-row">
        <button class="success-btn-outline" onclick="setView('orders'); showToast('Tracking information will be updated as the order ships.');">
          ${icon("box")}
          <span>Track Order</span>
        </button>
        <button class="success-btn-filled" onclick="setView('home')">
          ${icon("cart")}
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  `;
}

function triggerCelebration() {
  // Canvas-based confetti party popper effect
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const colors = [
    '#8B5CF6', '#a855f7', '#f59e0b', '#22c55e', '#ef4444',
    '#A855F7', '#f97316', '#ec4899', '#fbbf24', '#10b981'
  ];

  const particles = [];
  const shapes = ['rect', 'circle', 'ribbon'];

  // Fire from two cannons (bottom-left and bottom-right)
  const cannons = [
    { x: canvas.width * 0.15, y: canvas.height, angle: -70 },
    { x: canvas.width * 0.85, y: canvas.height, angle: -110 },
    { x: canvas.width * 0.5, y: canvas.height * 0.5, angle: -90 }
  ];

  cannons.forEach(cannon => {
    for (let i = 0; i < 55; i++) {
      const spread = 35;
      const angleDeg = cannon.angle + (Math.random() - 0.5) * spread;
      const angleRad = (angleDeg * Math.PI) / 180;
      const speed = 8 + Math.random() * 14;
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      particles.push({
        x: cannon.x,
        y: cannon.y,
        vx: Math.cos(angleRad) * speed,
        vy: Math.sin(angleRad) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: shape === 'ribbon' ? (2 + Math.random() * 3) : (5 + Math.random() * 7),
        length: shape === 'ribbon' ? (12 + Math.random() * 16) : 0,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.3,
        opacity: 1,
        gravity: 0.25 + Math.random() * 0.15,
        shape: shape,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.05 + Math.random() * 0.08
      });
    }
  });

  let frame = 0;
  const maxFrames = 160;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.rotation += p.rotSpeed;
      p.wobble += p.wobbleSpeed;
      p.opacity = Math.max(0, 1 - (frame / maxFrames) * 1.1);

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.strokeStyle = p.color;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'ribbon') {
        // Wavy ribbon
        ctx.lineWidth = p.size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          p.length * 0.3, Math.sin(p.wobble) * 6,
          p.length * 0.7, Math.cos(p.wobble) * 6,
          p.length, 0
        );
        ctx.stroke();
      }
      ctx.restore();
    });

    if (frame < maxFrames) {
      requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  };

  requestAnimationFrame(draw);
}

function renderSupport() {
  const token = localStorage.getItem("customer-user-token");
  const isAuthenticated = localStorage.getItem("user-authenticated") === "true" && token && token !== "null" && token !== "undefined";
  const name = isAuthenticated ? (userProfile?.name || localStorage.getItem("user-name") || "Guest") : "Guest";
  const firstName = name.split(" ")[0] || "Guest";

  views.support.innerHTML = `
    ${renderBackBar("Help & Support")}
    <section class="support-hero">
      <h1>Hi ${firstName}!</h1>
      <p>How can we help you today?</p>
      <div class="search-row">
        <label class="search-box">
          ${icon("search")}
          <input type="search" placeholder="Search help topics...">
        </label>
      </div>
    </section>
    <h2>Quick Help</h2>
    <div class="support-grid" style="margin-top:12px">
      <article class="support-card"><span class="round-icon">${icon("box")}</span><h3>Order Issues</h3><p>Track, return or cancel orders</p></article>
      <article class="support-card"><span class="round-icon">${icon("wallet")}</span><h3>Payment Issues</h3><p>Payment failed or refund related</p></article>
      <article class="support-card"><span class="round-icon">${icon("truck")}</span><h3>Shipping</h3><p>Delivery status and shipping info</p></article>
      <article class="support-card"><span class="round-icon">${icon("refresh")}</span><h3>Returns</h3><p>Return products and refunds</p></article>
    </div>
    <div class="section-head"><h2>Support</h2></div>
    <div class="list-panel">
      ${accountRow("support", "Chat with us", "Online help from our team", getSupportUrl())}
      ${accountRow("mail", "Email Support", "We will respond within 24 hours", getSupportUrl())}
      ${accountRow("phone", "Call Us", "Mon - Sat, 10AM - 7PM", getSupportUrl())}
      ${accountRow("shield", "FAQs", "Find answers to common questions", getSupportUrl())}
    </div>
    <button class="primary-btn full" id="raise-ticket-btn">${icon("plus")} Raise a Ticket</button>
  `;

  // Meta Pixel: Lead — fires when user taps Raise a Ticket (contact intent)
  const raiseTicketBtn = views.support.querySelector('#raise-ticket-btn');
  if (raiseTicketBtn) {
    raiseTicketBtn.addEventListener('click', () => {
      if (typeof fbq === "function") {
        fbq('track', 'Lead');
      }
    });
  }
}

function getPolicyContent(tab) {
  switch (tab) {
    case "terms":
      return `
        <h1>Terms & Conditions</h1>
        <p class="subtitle">Welcome to ZappDeal</p>
        <section>
          <p>These Terms & Conditions govern your access and use of ZappDeal (“Platform”, “we”, “our”, “us”).</p>
          <p>By accessing, browsing, registering, or placing an order on ZappDeal, you agree to these Terms.</p>
        </section>
        <section>
          <h2>Eligibility</h2>
          <p>You must be at least 18 years old or use the website under supervision of a parent/legal guardian.</p>
        </section>
        <section>
          <h2>Account Registration</h2>
          <p>Users may create an account to place orders and access platform features.</p>
          <p>You agree:</p>
          <ul>
            <li>To provide accurate information</li>
            <li>To keep login credentials secure</li>
            <li>To update details if changed</li>
            <li>Not to create fraudulent accounts</li>
          </ul>
        </section>
        <section>
          <h2>Orders</h2>
          <p>All orders are subject to confirmation and availability.</p>
          <p>We reserve the right to accept or reject orders.</p>
          <p>Product images are for representation purposes and actual appearance may vary slightly.</p>
        </section>
        <section>
          <h2>Pricing</h2>
          <p>Prices displayed are inclusive/exclusive of taxes as applicable.</p>
          <p>Prices may change without prior notice.</p>
        </section>
        <section>
          <h2>Payments</h2>
          <p>Orders are processed after successful payment confirmation.</p>
        </section>
        <section>
          <h2>User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the website illegally</li>
            <li>Abuse referral programs</li>
            <li>Submit false information</li>
            <li>Attempt unauthorized access</li>
          </ul>
        </section>
        <section>
          <h2>Intellectual Property</h2>
          <p>All logos, graphics, designs, text, and content belong to ZappDeal.</p>
        </section>
        <section>
          <h2>Limitation of Liability</h2>
          <p>ZappDeal shall not be liable for indirect, incidental, or consequential damages arising from use of the platform.</p>
        </section>
        <section>
          <h2>Modification</h2>
          <p>We may modify these Terms anytime without prior notice.</p>
        </section>
        <section>
          <h2>Governing Law</h2>
          <p>These Terms shall be governed under the laws of India.</p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>Email: <a href="mailto:support@zappdeal.com">support@zappdeal.com</a></p>
        </section>
      `;
    case "privacy":
      return `
        <h1>Privacy Policy</h1>
        <p class="subtitle">At ZappDeal, we respect your privacy.</p>
        <section>
          <h2>Information We Collect</h2>
          <h3>Personal Information:</h3>
          <ul>
            <li>Name</li>
            <li>Mobile number</li>
            <li>Email</li>
            <li>Billing address</li>
            <li>Shipping address</li>
          </ul>
          <h3>Technical Information:</h3>
          <ul>
            <li>Device information</li>
            <li>Browser type</li>
            <li>IP address</li>
            <li>Cookies</li>
          </ul>
          <h3>Transaction Information:</h3>
          <ul>
            <li>Payment details (processed securely)</li>
            <li>Order history</li>
          </ul>
        </section>
        <section>
          <h2>How We Use Information</h2>
          <ul>
            <li>Process orders</li>
            <li>Deliver products</li>
            <li>Customer support</li>
            <li>Improve website</li>
            <li>Fraud prevention</li>
            <li>Marketing communications</li>
          </ul>
        </section>
        <section>
          <h2>Data Sharing</h2>
          <p>We may share data with:</p>
          <ul>
            <li>Payment providers</li>
            <li>Shipping partners</li>
            <li>Legal authorities when required</li>
          </ul>
        </section>
        <section>
          <h2>Data Protection</h2>
          <p>We implement commercially reasonable security measures.</p>
        </section>
        <section>
          <h2>Cookies</h2>
          <p>We use cookies for:</p>
          <ul>
            <li>Login sessions</li>
            <li>Website analytics</li>
            <li>Shopping cart experience</li>
          </ul>
        </section>
        <section>
          <h2>User Rights</h2>
          <p>You may request access, correction, or deletion of your data.</p>
          <p>Email: <a href="mailto:support@zappdeal.com">support@zappdeal.com</a></p>
        </section>
      `;
    case "shipping":
      return `
        <h1>Shipping Policy</h1>
        <p class="subtitle">Delivery and timelines</p>
        <section>
          <h2>Processing Time</h2>
          <p>Orders are generally processed within 1–3 business days.</p>
        </section>
        <section>
          <h2>Delivery Timeline</h2>
          <p>Estimated delivery:</p>
          <ul>
            <li><strong>Metro Cities:</strong> 2–7 business days</li>
            <li><strong>Other Areas:</strong> 3–10 business days</li>
          </ul>
          <p>Delivery timelines may vary.</p>
        </section>
        <section>
          <h2>Tracking</h2>
          <p>Tracking details will be provided after dispatch.</p>
        </section>
        <section>
          <h2>Failed Deliveries</h2>
          <p>If delivery fails due to incorrect address/contact information, additional shipping charges may apply.</p>
        </section>
        <section>
          <h2>Delays</h2>
          <p>Unexpected delays caused by courier, weather, or external events may occur.</p>
        </section>
        <section>
          <h2>Support</h2>
          <p>Email: <a href="mailto:support@zappdeal.com">support@zappdeal.com</a></p>
        </section>
      `;
    case "returns":
      return `
        <h1>Return & Replacement Policy</h1>
        <p class="subtitle">At ZappDeal, we maintain strict quality standards.</p>
        <section>
          <h2>No Return Policy</h2>
          <p>Products sold are non-returnable and non-refundable except under approved replacement conditions.</p>
        </section>
        <section>
          <h2>Eligible Cases (Replacement Only)</h2>
          <p>Replacement requests are accepted only if:</p>
          <ul>
            <li>Wrong product delivered</li>
            <li>Product delivered significantly different from order</li>
          </ul>
        </section>
        <section>
          <h2>Replacement Conditions</h2>
          <p>Customer must raise a request within 48 hours of delivery and provide:</p>
          <ul>
            <li>Order ID</li>
            <li>Photos/videos of received product</li>
            <li>Description of issue</li>
          </ul>
          <p>Email: <a href="mailto:support@zappdeal.com">support@zappdeal.com</a></p>
        </section>
        <section>
          <h2>Non-Eligible Cases</h2>
          <p>Replacement will NOT be approved for:</p>
          <ul>
            <li>Change of mind or ordered by mistake</li>
            <li>Color preference or minor packaging damage</li>
            <li>Used products or delays in delivery</li>
          </ul>
        </section>
        <section>
          <h2>Inspection</h2>
          <p>Replacement requests are subject to verification.</p>
        </section>
        <section>
          <h2>Replacement Resolution</h2>
          <p>Approved cases may receive a replacement product, or store credit if a replacement is unavailable. No cash refunds unless legally required.</p>
        </section>
      `;
    case "cancellation":
      return `
        <h1>Cancellation Policy</h1>
        <p class="subtitle">Order cancellation rules</p>
        <section>
          <p>Orders once placed cannot be cancelled.</p>
        </section>
        <section>
          <h2>Exceptions</h2>
          <ul>
            <li>Duplicate payment</li>
            <li>Stock unavailable</li>
            <li>Technical payment failure</li>
          </ul>
          <p>If cancellation is approved, refund timelines depend on payment providers.</p>
        </section>
        <section>
          <h2>Support</h2>
          <p>Email: <a href="mailto:support@zappdeal.com">support@zappdeal.com</a></p>
        </section>
      `;
    case "referral":
      return `
        <h1>Referral Program Policy</h1>
        <p class="subtitle">ZappDeal offers referral rewards</p>
        <section>
          <h2>Eligibility</h2>
          <p>Registered users may participate.</p>
        </section>
        <section>
          <h2>Referral Rules</h2>
          <ul>
            <li>Share your referral code/link.</li>
            <li>Rewards apply only after successful order completion.</li>
            <li>Self-referrals are prohibited.</li>
          </ul>
        </section>
        <section>
          <h2>Reward Conditions</h2>
          <p>Referral rewards are promotional, cannot be transferred, and cannot be exchanged for cash unless specified.</p>
        </section>
        <section>
          <h2>Fraud Prevention</h2>
          <p>ZappDeal may suspend rewards if detecting fake accounts, self-orders, payment manipulation, bulk account creation, or abnormal activity.</p>
        </section>
        <section>
          <h2>Expiry</h2>
          <p>Referral rewards may expire as displayed in your user account.</p>
        </section>
        <section>
          <h2>Right to Modify</h2>
          <p>ZappDeal reserves the right to modify or discontinue referral programs.</p>
        </section>
        <section>
          <h2>Support</h2>
          <p>Email: <a href="mailto:support@zappdeal.com">support@zappdeal.com</a></p>
        </section>
      `;
    case "refund":
      return `
        <h1>Refund Policy</h1>
        <p class="subtitle">Refund terms and timelines</p>
        <section>
          <p>ZappDeal generally operates under a <strong>No Refund Policy</strong>.</p>
          <p>Refunds may only be processed in cases of duplicate payment, failed transactions, or order cancellations initiated by ZappDeal.</p>
          <p>Approved refunds are processed to the original payment method.</p>
          <p><strong>Processing time:</strong> 5–10 business days depending on payment provider.</p>
        </section>
      `;
    case "payment":
      return `
        <h1>Payment Policy</h1>
        <p class="subtitle">Accepted payment methods and security</p>
        <section>
          <p>We accept secure online payments.</p>
          <p>Available methods may include UPI, Credit Cards, Debit Cards, Net Banking, and Wallets.</p>
        </section>
        <section>
          <h2>Payment Security</h2>
          <p>Payment information is processed through secure payment providers.</p>
        </section>
        <section>
          <h2>Failed Transactions</h2>
          <p>If payment is deducted but order not confirmed, please wait up to 24 hours. Contact support if unresolved: <a href="mailto:support@zappdeal.com">support@zappdeal.com</a></p>
        </section>
      `;
    case "contact":
      return `
        <h1>Contact Us</h1>
        <p class="subtitle">Get in touch with our team</p>
        <div class="contact-details-card">
          <div class="contact-row">
            <strong>Business Name:</strong> ZappDeal
          </div>
          <div class="contact-row">
            <strong>Support Email:</strong> <a href="mailto:support@zappdeal.com">support@zappdeal.com</a>
          </div>
          <div class="contact-row">
            <strong>Website:</strong> <a href="https://zappdeal.com" target="_blank">https://zappdeal.com</a>
          </div>
          <div class="contact-row">
            <strong>Support Hours:</strong><br>
            Monday – Saturday<br>
            10:00 AM – 7:00 PM (IST)
          </div>
        </div>
      `;
    case "faq":
      return `
        <h1>Frequently Asked Questions (FAQs)</h1>
        <p class="subtitle">Find quick answers</p>
        <div class="faq-accordion">
          <div class="faq-item">
            <h3>Can I cancel my order?</h3>
            <p>No, once placed orders cannot be cancelled except approved cases.</p>
          </div>
          <div class="faq-item">
            <h3>Can I return products?</h3>
            <p>Only if delivered product differs from ordered product.</p>
          </div>
          <div class="faq-item">
            <h3>How do I request replacement?</h3>
            <p>Email support@zappdeal.com within 48 hours.</p>
          </div>
          <div class="faq-item">
            <h3>How do referral rewards work?</h3>
            <p>Rewards are credited after successful order completion.</p>
          </div>
        </div>
      `;
    default:
      return "";
  }
}

function renderPolicy() {
  const tabs = [
    { id: "terms", name: "Terms & Conditions", icon: "file" },
    { id: "privacy", name: "Privacy Policy", icon: "shield" },
    { id: "shipping", name: "Shipping Policy", icon: "truck" },
    { id: "returns", name: "Return & Replacement", icon: "refresh" },
    { id: "cancellation", name: "Cancellation Policy", icon: "slash" },
    { id: "referral", name: "Referral Policy", icon: "gift" },
    { id: "refund", name: "Refund Policy", icon: "wallet" },
    { id: "payment", name: "Payment Policy", icon: "credit-card" },
    { id: "contact", name: "Contact Us", icon: "mail" },
    { id: "faq", name: "FAQs", icon: "help" }
  ];

  if (!state.policyTab) {
    state.policyTab = "terms";
  }

  const mobileTabsHtml = tabs.map(t => `
    <button class="policy-mobile-tab-btn ${state.policyTab === t.id ? 'active' : ''}" onclick="window.selectPolicyTab('${t.id}')">
      ${t.name}
    </button>
  `).join("");

  const desktopTabsHtml = tabs.map(t => `
    <button class="policy-desktop-tab-btn ${state.policyTab === t.id ? 'active' : ''}" onclick="window.selectPolicyTab('${t.id}')">
      <span class="tab-icon">${icon(t.icon)}</span>
      <span class="tab-label">${t.name}</span>
      <span class="tab-chevron">${icon("arrow")}</span>
    </button>
  `).join("");

  const contentHtml = getPolicyContent(state.policyTab);

  views.policy.innerHTML = `
    ${renderBackBar("Legal & Policies")}
    <div class="policy-container">
      <div class="policy-mobile-tabs">
        ${mobileTabsHtml}
      </div>
      
      <div class="policy-layout-grid">
        <aside class="policy-sidebar">
          <div class="policy-sidebar-inner">
            <h2 class="policy-sidebar-title">Documents</h2>
            <nav class="policy-desktop-nav">
              ${desktopTabsHtml}
            </nav>
          </div>
        </aside>

        <main class="policy-content-panel">
          <article class="policy-article">
            ${contentHtml}
          </article>
        </main>
      </div>
    </div>
  `;
}

window.selectPolicyTab = function(tabId) {
  state.policyTab = tabId;
  history.replaceState(null, "", canonicalUrlForView("policy"));
  renderPolicy();
};

window.applyCouponCode = async function() {
  const codeEl = document.getElementById("coupon-input-code");
  if (!codeEl) return;
  const code = codeEl.value.trim().toUpperCase();
  if (!code) return showToast("Please enter a coupon code");

  const token = localStorage.getItem("customer-user-token");
  if (!token) return showToast("Please login first");

  try {
    const subtotal = cartTotal();
    const res = await fetch(`/api/coupons/validate?code=${code}&subtotal=${subtotal}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (res.ok) {
      state.appliedCoupon = data;
      state.couponError = null;
      showToast("Coupon applied successfully!");
      renderCheckout();
    } else {
      state.couponError = data.message || "Invalid coupon code";
      state.appliedCoupon = null;
      renderCheckout();
    }
  } catch(e) {
    showToast("Error validating coupon");
  }
};

window.removeAppliedCoupon = function() {
  state.appliedCoupon = null;
  state.couponError = null;
  showToast("Coupon removed");
  renderCheckout();
};

window.selectCheckoutAddress = function(val) {
  state.selectedAddressId = val;
  renderCheckout();
};

window.selectPaymentMethod = function(val) {
  state.paymentMethod = val;
  renderCheckout();
};

window.handleCheckoutBack = function() {
  if (state.checkoutStep === 2) {
    state.checkoutStep = 1;
    window.scrollTo(0, 0);
    renderCheckout();
  } else {
    showExitConfirmationModal();
  }
};

window.continueToPayment = function() {
  const checkoutEmailInput = document.getElementById("checkout-email");
  const checkoutEmail = checkoutEmailInput ? checkoutEmailInput.value.trim() : "";

  // Verify address is selected
  let selectedAddressId = state.selectedAddressId;
  if (!selectedAddressId) {
    const defaultAddr = addresses.find(a => a.is_default) || addresses[0];
    if (defaultAddr) {
      selectedAddressId = defaultAddr.id;
      state.selectedAddressId = defaultAddr.id;
    }
  }

  if (state.selectedAddressId && !addresses.find(a => a.id === state.selectedAddressId)) {
    state.selectedAddressId = null;
    selectedAddressId = null;
  }

  if (!selectedAddressId) {
    return showToast("Please add a shipping address to continue");
  }

  // Email validation if first order
  const isFirstOrder = (orders.length === 0);
  if (isFirstOrder && !checkoutEmail) {
    return showToast("Please enter your email address");
  }

  // Save email to localStorage
  if (checkoutEmailInput) {
    localStorage.setItem("user-email", checkoutEmail);
  }

  state.checkoutStep = 2;
  window.scrollTo(0, 0);
  renderCheckout();
};

function renderCheckout() {
  const items = cartItems();
  if (items.length === 0) {
    setView("cart");
    return;
  }

  const subtotal = cartTotal();
  const generalDiscount = subtotal ? Math.min(3600, Math.round(subtotal * 0.08)) : 0;
  
  let couponDiscount = 0;
  if (state.appliedCoupon) {
    if (state.appliedCoupon.discount_type === 'percentage') {
      couponDiscount = Math.round(subtotal * (state.appliedCoupon.discount_value / 100));
    } else {
      couponDiscount = state.appliedCoupon.discount_value;
    }
    couponDiscount = Math.min(couponDiscount, subtotal - generalDiscount);
  }

  const baseTotal = subtotal - generalDiscount - couponDiscount;
  
  const walletBalance = userProfile ? (userProfile.wallet_balance || 0) : parseInt(localStorage.getItem("user-wallet-balance") || "0");
  const useWalletChecked = state.useWallet === true;
  let walletDeduction = 0;
  if (useWalletChecked && walletBalance > 0) {
    walletDeduction = Math.min(walletBalance, baseTotal);
  }
  const finalTotal = baseTotal - walletDeduction;

  const savedEmail = localStorage.getItem("user-email") || "";

  // Set default checkout address ID if not already selected or if current selection is invalid
  if (state.selectedAddressId && !addresses.find(a => a.id === state.selectedAddressId)) {
    state.selectedAddressId = null;
  }
  const defaultAddr = addresses.find(a => a.is_default) || addresses[0];
  if (!state.selectedAddressId && defaultAddr) {
    state.selectedAddressId = defaultAddr.id;
  }

  // Ensure default payment method is set
  if (!state.paymentMethod) {
    state.paymentMethod = "Online";
  }

  // Define payment methods list
  const AVAILABLE_PAYMENT_METHODS = [
    {
      id: "Online",
      title: "Pay Online",
      desc: "Pay securely using UPI, Cards, Netbanking & more",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`
    },
    {
      id: "COD",
      title: "Cash on Delivery (COD)",
      desc: "Pay when you receive your order",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`
    }
  ];

  // Address HTML
  let addressSelectionHtml = '';
  if (addresses.length > 0) {
    addressSelectionHtml = `
      <div class="address-grid-checkout" style="display:grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 12px;">
        ${addresses.map((addr) => {
          const isSelected = state.selectedAddressId === addr.id;
          return `
            <div class="checkout-address-card ${isSelected ? 'is-selected' : ''}" 
                 onclick="window.selectCheckoutAddress(${addr.id})"
                 style="background: ${isSelected ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255,255,255,0.02)'}; 
                        border: 1px solid ${isSelected ? '#a78bfa' : 'rgba(255,255,255,0.08)'}; 
                        border-radius: 14px; padding: 14px; cursor: pointer; transition: all 0.2s; position: relative;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="payment-method-radio" style="border-color: ${isSelected ? '#a78bfa' : 'rgba(255,255,255,0.3)'}; background:${isSelected ? '#a78bfa' : 'transparent'};">
                    ${isSelected ? '<span class="payment-method-radio-dot"></span>' : ''}
                  </span>
                  <strong style="color: white; font-size: 13px;">${addr.label}</strong>
                  ${addr.is_default ? '<span style="background: rgba(168, 85, 247, 0.15); color: #c084fc; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 600;">Default</span>' : ''}
                </div>
                <button onclick="event.stopPropagation(); window.showEditAddressModal(${JSON.stringify(addr).replace(/"/g, '&quot;')})" 
                        style="background: transparent; border: none; color: #a78bfa; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 4px; border-radius: 4px; transition: background 0.2s;"
                        aria-label="Edit Address">
                  ${icon("edit")}
                </button>
              </div>
              <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.7); line-height: 1.4;">
                <strong>${addr.name}</strong> • ${addr.phone}<br>
                ${addr.line}
              </p>
            </div>
          `;
        }).join("")}
      </div>
      <button onclick="window.showAddAddressModal()" class="secondary-btn" style="width:100%; padding:12px; border-radius:10px; background:rgba(255,255,255,0.04); color:white; border:1px solid rgba(255,255,255,0.08); font-weight:700; font-size:13px; cursor:pointer; margin-bottom:4px; display:flex; align-items:center; justify-content:center; gap:6px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.04)'">
        ${icon("plus")} Add New Address
      </button>
    `;
  } else {
    addressSelectionHtml = `
      <div style="padding: 20px; border: 1px dashed rgba(255,255,255,0.15); border-radius: 12px; text-align: center; color: rgba(255,255,255,0.6); font-size: 13px; margin-bottom: 12px;">
        No saved addresses found. Please add a shipping address.
      </div>
      <button onclick="window.showAddAddressModal()" class="secondary-btn" style="width:100%; padding:12px; border-radius:10px; background:rgba(255,255,255,0.04); color:white; border:1px solid rgba(255,255,255,0.08); font-weight:700; font-size:13px; cursor:pointer; margin-bottom:4px; display:flex; align-items:center; justify-content:center; gap:6px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.04)'">
        ${icon("plus")} Add New Address
      </button>
    `;
  }

  // Header HTML
  const headerHtml = `
    <div class="detail-bar">
      <button class="icon-btn" onclick="window.handleCheckoutBack()" aria-label="Back">${icon("back")}</button>
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; text-align: center;">
        <h2 style="margin: 0; font-size: 18px; font-weight: 800; color: #fff;">${state.checkoutStep === 2 ? 'Payment' : 'Checkout'}</h2>
        <div style="display: flex; align-items: center; gap: 5px; margin-top: 4px; color: #a78bfa; fill: none;">
          <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 13px; height: 13px; display: block; flex-shrink: 0; color: #a78bfa; fill: none;">
            <path d="M12 3 5 6v5c0 5 3.5 8.5 7 10 3.5-1.5 7-5 7-10V6z"/>
            <path d="m9 12 2 2 4-5"/>
          </svg>
          <span style="font-size: 11px; font-weight: 700; color: #a78bfa; letter-spacing: 0.2px;">
            ${state.checkoutStep === 2 ? '100% Secure Payment' : 'Secure Checkout'}
          </span>
        </div>
      </div>
      <div style="width: 40px;"></div>
    </div>
  `;

  // Ordered Product Summary HTML
  const productSummaryHtml = `
    <div class="checkout-premium-card">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
        <span style="width:30px; height:30px; border-radius:50%; background:rgba(168,85,247,0.15); border:1px solid rgba(168,85,247,0.3); display:flex; align-items:center; justify-content:center; color:#a78bfa; flex-shrink:0;">
          ${icon("box")}
        </span>
        <h3 style="margin:0; font-size:14px; font-weight:700; color:#fff;">Order Items</h3>
      </div>
      <div class="checkout-product-list">
        ${items.map(item => {
          const imgUrl = window.getProductSelectedVariantImage(item, item.selectedColor, item.selectedModel);
          return `
            <div class="checkout-product-item">
              <img class="checkout-product-img" src="${imgUrl}" alt="${item.name}">
              <div class="checkout-product-details">
                <h4 class="checkout-product-name">${item.name}</h4>
                <div class="checkout-product-meta">
                  ${item.selectedModel ? `<span>Model: <strong>${item.selectedModel}</strong></span>` : ''}
                  ${item.selectedColor ? `<span>Color: <strong>${item.selectedColor}</strong></span>` : ''}
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                  <span class="checkout-product-price">${money(item.price)}</span>
                  <!-- Quantity Selector -->
                  <div class="checkout-qty-control">
                    <button class="checkout-qty-btn" data-cart-dec="${item.cartKey}">-</button>
                    <span class="checkout-qty-val">${item.qty}</span>
                    <button class="checkout-qty-btn" data-cart-inc="${item.cartKey}">+</button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  // Delivery Address Card HTML (Step 1)
  const deliveryCardHtml = `
    <div class="checkout-premium-card">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
        <span style="width:30px; height:30px; border-radius:50%; background:rgba(168,85,247,0.15); border:1px solid rgba(168,85,247,0.3); display:flex; align-items:center; justify-content:center; color:#a78bfa; flex-shrink:0;">
          ${icon("pin")}
        </span>
        <h3 style="margin:0; font-size:14px; font-weight:700; color:#fff;">Delivery Details</h3>
      </div>
      
      <!-- Email Address Always Visible to edit -->
      <div style="margin-bottom: 16px;">
        <label style="font-size:11px; font-weight:700; color:rgba(255,255,255,0.4); letter-spacing:1px; display:block; margin-bottom:6px; text-transform:uppercase;">Email Address</label>
        <input type="email" id="checkout-email" placeholder="name@domain.com" required value="${savedEmail}"
          style="width:100%; padding:12px 14px; border-radius:10px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.03); color:white; outline:none; box-sizing:border-box; font-family:inherit; font-size:13px;">
      </div>

      ${addressSelectionHtml}
    </div>
  `;

  // Coupon Card HTML (Step 1)
  const couponCardHtml = `
    <div class="checkout-premium-card">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
        <span style="width:30px; height:30px; border-radius:50%; background:rgba(168,85,247,0.15); border:1px solid rgba(168,85,247,0.3); display:flex; align-items:center; justify-content:center; color:#a78bfa; flex-shrink:0;">
          ${icon("gift")}
        </span>
        <h3 style="margin:0; font-size:14px; font-weight:700; color:#fff;">Apply Coupon</h3>
      </div>
      ${state.appliedCoupon ? `
        <div style="background:rgba(168,85,247,0.08); border:1.5px dashed #a78bfa; border-radius:10px; padding:12px; display:flex; align-items:center; justify-content:space-between; transition: all 0.2s;">
          <div>
            <strong style="color:#c084fc; font-size:13px; display:block;">${state.appliedCoupon.code} Applied!</strong>
            <small style="color:rgba(255,255,255,0.6); font-size:11px;">Discount: ${state.appliedCoupon.discount_type === 'percentage' ? `${state.appliedCoupon.discount_value}%` : `₹${state.appliedCoupon.discount_value}`} Off</small>
          </div>
          <button onclick="window.removeAppliedCoupon()" style="background:transparent; border:none; color:#f87171; font-weight:700; cursor:pointer; font-size:12px; transition: color 0.2s;" onmouseover="this.style.color='#f87171'" onmouseout="this.style.color='#ef4444'">Remove</button>
        </div>
      ` : `
        <div style="display:flex; gap:8px;">
          <input type="text" id="coupon-input-code" placeholder="ENTER COUPON CODE" style="flex:1; padding:12px 14px; border-radius:10px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.03); color:white; outline:none; font-family:inherit; font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">
          <button onclick="window.applyCouponCode()" style="padding:12px 20px; border-radius:10px; background:#8b5cf6; color:white; border:none; font-weight:700; font-size:13px; cursor:pointer; transition: background 0.2s;" onmouseover="this.style.background='#7c3aed'" onmouseout="this.style.background='#8b5cf6'">Apply</button>
        </div>
        ${state.couponError ? `<small style="color:#f87171; display:block; margin-top:6px; font-weight:500;">⚠️ ${state.couponError}</small>` : ''}
      `}
    </div>
  `;

  // Order Summary Card HTML (Step 1 & Step 2)
  const orderSummaryCardHtml = `
    <div class="checkout-premium-card">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
        <span style="width:30px; height:30px; border-radius:50%; background:rgba(168,85,247,0.15); border:1px solid rgba(168,85,247,0.3); display:flex; align-items:center; justify-content:center; color:#a78bfa; flex-shrink:0;">
          ${icon("spark")}
        </span>
        <h3 style="margin:0; font-size:14px; font-weight:700; color:#fff;">Order Summary</h3>
      </div>
      <div style="display:flex; flex-direction:column; gap:10px;">
        <div style="display:flex; justify-content:space-between; font-size:13px; color:rgba(255,255,255,0.65);">
          <span>Item Subtotal</span>
          <span style="color:#fff; font-weight:600;">${money(subtotal)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:13px; color:rgba(255,255,255,0.65);">
          <span>Shipping</span>
          <span style="color:#22c55e; font-weight:600;">Free</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:13px; color:rgba(255,255,255,0.65);">
          <span>Discount (8%)</span>
          <span style="color:#22c55e; font-weight:600;">- ${money(generalDiscount)}</span>
        </div>
        ${couponDiscount > 0 ? `
        <div style="display:flex; justify-content:space-between; font-size:13px; color:rgba(255,255,255,0.65);">
          <span>Coupon Discount</span>
          <span style="color:#22c55e; font-weight:600;">- ${money(couponDiscount)}</span>
        </div>` : ''}
        ${walletDeduction > 0 ? `
        <div style="display:flex; justify-content:space-between; font-size:13px; color:rgba(255,255,255,0.65);">
          <span>Wallet Deduction</span>
          <span style="color:#22c55e; font-weight:600;">- ${money(walletDeduction)}</span>
        </div>` : ''}
        <hr style="border:0; border-top:1px solid rgba(255,255,255,0.06); margin:4px 0;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:14px; font-weight:700; color:#fff;">Total Amount</span>
          <span style="font-size:20px; color:#c084fc; font-weight:800;">${money(finalTotal)}</span>
        </div>
      </div>
    </div>
  `;
  // Step 1 CTA

  // Step 1 CTA
  const step1CtaHtml = `
    <button onclick="window.continueToPayment()" class="primary-btn full" style="width:100%; padding:16px; border-radius:12px; background:#8b5cf6; color:white; border:none; font-weight:700; font-size:15px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 4px 24px rgba(139,92,246,0.35); transition: background-color 0.2s;" onmouseover="this.style.background='#7c3aed'" onmouseout="this.style.background='#8b5cf6'">
      Continue to Payment ${icon("arrow")}
    </button>
  `;

  // Payment Method Card HTML (Step 2)
  const paymentCardHtml = `
    <div class="checkout-premium-card">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
        <span style="width:30px; height:30px; border-radius:50%; background:rgba(168,85,247,0.15); border:1px solid rgba(168,85,247,0.3); display:flex; align-items:center; justify-content:center; color:#a78bfa; flex-shrink:0;">
          ${icon("wallet")}
        </span>
        <h3 style="margin:0; font-size:14px; font-weight:700; color:#fff;">Payment Method</h3>
      </div>
      <p style="margin:-4px 0 16px 0; font-size:12px; color:rgba(255,255,255,0.5);">Choose your preferred payment option</p>
      
      <div class="payment-methods-grid" style="display:flex; flex-direction:column; gap:10px;">
        ${AVAILABLE_PAYMENT_METHODS.map(method => {
          const isSelected = state.paymentMethod === method.id;
          return `
            <div class="payment-method-card ${isSelected ? 'is-selected' : ''}" 
                 onclick="window.selectPaymentMethod('${method.id}')"
                 style="background: ${isSelected ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255,255,255,0.02)'};
                        border: 1.5px solid ${isSelected ? '#8b5cf6' : 'rgba(255,255,255,0.08)'};
                        border-radius: 14px; padding: 14px; cursor: pointer; transition: all 0.2s; display:flex; align-items:center; gap:12px;">
              <span class="payment-method-radio" style="border-color: ${isSelected ? '#8b5cf6' : 'rgba(255,255,255,0.3)'}; background:${isSelected ? '#8b5cf6' : 'transparent'};">
                ${isSelected ? '<span class="payment-method-radio-dot"></span>' : ''}
              </span>
              <span class="payment-method-icon">${method.icon}</span>
              <div class="payment-method-info">
                <strong>${method.title}</strong>
                <p style="margin:2px 0 0 0; font-size:10px; color:rgba(255,255,255,0.45);">${method.desc}</p>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  // Wallet deduction option (Step 2)
  let walletHtml = '';
  if (walletBalance > 0) {
    walletHtml = `
      <div class="checkout-premium-card" style="background:rgba(139, 92, 246, 0.05); border-color:rgba(139, 92, 246, 0.2);">
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="color:#a78bfa; display:flex;">${icon("wallet")}</span>
            <div>
              <strong style="display:block; font-size:13px; color:#fff;">Use Wallet Balance</strong>
              <small style="color:rgba(255,255,255,0.5);">Available: ${money(walletBalance)}</small>
            </div>
          </div>
          <input type="checkbox" id="use-wallet-checkbox" ${useWalletChecked ? "checked" : ""} style="width:20px; height:20px; accent-color:#8b5cf6; cursor:pointer;">
        </div>
      </div>
    `;
  }

  // Step 2 Place Order CTA
  const step2CtaHtml = `
    <button class="primary-btn full" data-place-order
      style="width:100%; padding:16px; border-radius:12px; background:#8b5cf6; color:white; border:none; font-weight:700; font-size:15px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 4px 24px rgba(139,92,246,0.35); transition: background-color 0.2s;"
      onmouseover="this.style.background='#7c3aed'"
      onmouseout="this.style.background='#8b5cf6'">
      ${icon("lock")} Place Order &nbsp;•&nbsp; Pay ${money(finalTotal)}
    </button>
  `;

  // Inject HTML into view
  views.checkout.innerHTML = `
    ${headerHtml}
    
    <div class="checkout-page-wrap">
      <div class="checkout-viewport">
        <div class="checkout-slider ${state.checkoutStep === 2 ? 'step-2-active' : 'step-1-active'}" style="transform: translateX(${state.checkoutStep === 2 ? '-50%' : '0%'});">
          
          <!-- STEP 1 PANE -->
          <div class="checkout-step-pane">
            ${productSummaryHtml}
            ${deliveryCardHtml}
            ${couponCardHtml}
            ${orderSummaryCardHtml}
            <div style="height: 80px;"></div>
          </div>
          
          <!-- STEP 2 PANE -->
          <div class="checkout-step-pane">
            ${productSummaryHtml}
            ${paymentCardHtml}
            ${walletHtml}
            ${orderSummaryCardHtml}
            <div style="height: 80px;"></div>
          </div>
          
        </div>
      </div>
    </div>

    <!-- Sticky bottom CTA bar -->
    <div class="checkout-sticky-cta">
      ${state.checkoutStep === 2 ? step2CtaHtml : step1CtaHtml}
    </div>
  `;

  // Attach use wallet change listener
  const checkbox = document.getElementById("use-wallet-checkbox");
  if (checkbox) {
    checkbox.addEventListener("change", (e) => {
      state.useWallet = e.target.checked;
      renderCheckout();
    });
  }
}

function paymentText(method) {
  return {
    UPI: "Pay using any UPI app",
    "Credit / Debit Card": "Visa, Mastercard, Rupay and more",
    "Net Banking": "Pay using your bank",
    Wallet: "Pay using wallet balance",
    "Cash on Delivery": "Pay when you receive"
  }[method];
}

function emptyState(iconName, title, subtitle) {
  return `
    <section class="empty-state">
      <span class="round-icon">${icon(iconName)}</span>
      <h2>${title}</h2>
      <p>${subtitle}</p>
      <button class="primary-btn" data-nav="categories" style="margin-top:16px">Start Shopping</button>
    </section>
  `;
}

function updateNavButtons() {
  const token = localStorage.getItem("customer-user-token");
  const isAuthenticated = localStorage.getItem("user-authenticated") === "true" && token && token !== "null" && token !== "undefined";
  const hasNoOrders = !isAuthenticated || !orders || orders.length === 0;

  // 1. Mobile Bottom Navigation
  const ordersBtn = document.querySelector('.bottom-nav .nav-btn[data-nav="orders"]') || 
                    document.querySelector('.bottom-nav .nav-btn[data-nav="cart"]:not(.nav-btn-earn)');
  
  if (ordersBtn) {
    if (hasNoOrders) {
      ordersBtn.setAttribute('data-nav', 'cart');
      ordersBtn.setAttribute('aria-label', 'Cart');
      ordersBtn.innerHTML = `${icon("cart")}<small>Cart</small>`;
    } else {
      ordersBtn.setAttribute('data-nav', 'orders');
      ordersBtn.setAttribute('aria-label', 'Orders');
      ordersBtn.innerHTML = `${icon("box")}<small>Orders</small>`;
    }
  }

  // 2. Desktop Navigation
  const desktopOrdersLink = document.querySelector('.desktop-nav a[href="#orders"]') || 
                            document.querySelector('.desktop-nav a[href="#cart"]');
  if (desktopOrdersLink) {
    if (hasNoOrders) {
      desktopOrdersLink.setAttribute('href', '#cart');
      desktopOrdersLink.textContent = 'Cart';
    } else {
      desktopOrdersLink.setAttribute('href', '#orders');
      desktopOrdersLink.textContent = 'Orders';
    }
  }
}

function clearSearchInputs() {
  console.log("clearSearchInputs called! Current search query:", state.search);
  state.search = "";
  const inputs = document.querySelectorAll("[data-search-input]");
  console.log("Found search inputs to clear:", inputs.length);
  inputs.forEach(input => {
    input.value = "";
  });
  if (window.searchSuggestionsManager) {
    window.searchSuggestionsManager.hide();
  }
}

function appPath(path) {
  const base = (window.APP_BASE_PATH || "/").replace(/\/+$/, "");
  const suffix = path === "/" ? "" : "/" + String(path).replace(/^\/+/, "");
  return (base + suffix) || "/";
}

function categoryToSlug(category) {
  if (!category || String(category).toLowerCase() === "all") return "all";
  if (String(category).toLowerCase() === "mobile") return "iphone-covers";
  return slugify(category);
}

function canonicalUrlForView(view) {
  const routes = {
    home: "/", login: "/login", signup: "/signup", cart: "/cart", checkout: "/checkout",
    support: "/support", account: "/account", orders: "/account/orders",
    addresses: "/account/addresses", wishlist: "/account/wishlist", wallet: "/account/wallet",
    referral: "/account/referrals", payout: "/account/payout", recent: "/account/recent",
    settings: "/account/settings", thankyou: "/order-confirmation"
  };
  if (view === "categories") return appPath(`/collections/${categoryToSlug(state.selectedCategory)}`);
  if (view === "product") {
    const product = products.find(item => String(item.id) === String(state.productId));
    return product ? appPath(`/product/${slugify(product.name)}`) : appPath("/collections/all");
  }
  if (view === "search") {
    const query = state.search ? `?q=${encodeURIComponent(state.search)}` : "";
    return appPath("/search") + query;
  }
  if (view === "policy") return appPath(`/policies/${state.policyTab || "terms"}`);
  return appPath(routes[view] || "/");
}

function setView(view, fromHashChange = false) {
  if (view === "home" || view === "product") {
    clearSearchInputs();
  }
  updateNavButtons();
  // Check customer authentication status
  const token = localStorage.getItem("customer-user-token");
  const isAuthenticated = localStorage.getItem("user-authenticated") === "true" && token && token !== "null" && token !== "undefined";
  
  const protectedViews = ["checkout", "account", "orders", "addresses", "wallet", "referral", "settings", "thankyou", "payout"];
  if (!isAuthenticated && protectedViews.includes(view)) {
    if (view === "checkout") {
      localStorage.setItem("checkout-redirect", "true");
    }
    view = "login";
  } else if (isAuthenticated && (view === "login" || view === "signup")) {
    if (localStorage.getItem("checkout-redirect") === "true") {
      localStorage.removeItem("checkout-redirect");
      view = "checkout";
    } else {
      view = "home";
    }
  }

  if (view !== "checkout" && view !== "login" && view !== "signup") {
    localStorage.removeItem("checkout-redirect");
  }

  const previousView = state.view;
  state.view = view;
  if (view === "checkout") {
    state.checkoutStep = 1;
  }

  if (view === "cart" && previousView && previousView !== "cart") {
    const prevEl = views[previousView];
    const cartEl = views.cart;
    if (prevEl && cartEl) {
      cartEl.classList.add("sliding-in");
      cartEl.classList.add("is-active");
      prevEl.classList.add("is-active");
      setTimeout(() => {
        cartEl.classList.remove("sliding-in");
        prevEl.classList.remove("is-active");
      }, 370);
      Object.entries(views).forEach(([key, el]) => {
        if (key !== "cart" && key !== previousView) {
          el.classList.remove("is-active");
        }
      });
    } else {
      Object.entries(views).forEach(([key, el]) => el.classList.toggle("is-active", key === view));
    }
  } else if (previousView === "cart" && view !== "cart") {
    const cartEl = views.cart;
    const nextEl = views[view];
    if (cartEl && nextEl) {
      cartEl.classList.add("sliding-out");
      nextEl.classList.add("is-active");
      setTimeout(() => {
        cartEl.classList.remove("is-active", "sliding-out");
      }, 315);
      Object.entries(views).forEach(([key, el]) => {
        if (key !== "cart" && key !== view) {
          el.classList.remove("is-active");
        }
      });
    } else {
      Object.entries(views).forEach(([key, el]) => el.classList.toggle("is-active", key === view));
    }
  } else {
    Object.entries(views).forEach(([key, el]) => el.classList.toggle("is-active", key === view));
  }
  
  // Toggle auth-mode layout override class
  const isAuthView = view === "login" || view === "signup";
  document.body.classList.toggle("auth-mode", isAuthView);

  // Toggle cart-page-active so the app-frame + body background
  // matches the cart page dark gradient under the navbar
  document.body.classList.toggle("cart-page-active", view === "cart");

  const accountViews = ["account", "referral", "wallet", "orders", "addresses", "payout", "wishlist", "recent", "settings", "support"];
  const isAccountView = accountViews.includes(view);
  document.body.classList.toggle("account-mode", isAccountView);
  document.body.classList.toggle("checkout-mode", view === "checkout" || view === "cart");

  let navView = view;
  if (["wallet", "addresses", "payout", "wishlist", "recent", "settings", "support"].includes(view)) {
    navView = "account";
  } else if (view === "checkout") {
    navView = "checkout";
  } else if (view === "product" || view === "categories") {
    navView = "home";
  }
  const desktopView = view === "orders" ? "orders" : view === "categories" || view === "product" ? "categories" : view === "support" ? "support" : view === "home" ? "home" : "";

  // Swap the earn button: show 'Buy Now' on product page, 'Earn ₹' everywhere else
  const earnBtn = document.querySelector('.nav-btn-earn');
  if (earnBtn) {
    if (view === 'product' && state.productId) {
      // Change to Buy Now
      earnBtn.setAttribute('data-nav', '__buynow__');
      earnBtn.setAttribute('aria-label', 'Buy Now');
      earnBtn.innerHTML = `
        <span data-icon="cart" style="display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke:white;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </span>
        <small style="color:white;font-size:10px;font-weight:700;margin-top:1px;text-shadow:0 1px 3px rgba(0,0,0,0.5);">Buy Now</small>
      `;
      earnBtn.onclick = function(e) {
        e.stopPropagation();
        if (state.productId) {
          window.handleProductAddToCart(state.productId, state.productQty || 1, true);
        }
      };
    } else if (view === 'cart' || view === 'checkout') {
      const label = view === 'checkout' ? 'Buy' : 'Checkout';
      earnBtn.setAttribute('data-nav', 'checkout');
      earnBtn.setAttribute('aria-label', label);
      earnBtn.innerHTML = `
        <span style="display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke:white;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>
        <small style="color:white;font-size:10px;font-weight:700;margin-top:1px;text-shadow:0 1px 3px rgba(0,0,0,0.5);">${label}</small>
      `;
      earnBtn.onclick = function(e) {
        e.stopPropagation();
        if (view === 'checkout') {
          const placeOrderBtn = document.querySelector('button[data-place-order]');
          if (placeOrderBtn) {
            placeOrderBtn.click();
          }
        } else {
          setView('checkout');
        }
      };
    } else {
      // Restore earn button
      earnBtn.setAttribute('data-nav', 'referral');
      earnBtn.setAttribute('aria-label', 'Earn');
      earnBtn.onclick = null; // let the global data-nav handler work
      // Directly inject gift SVG and label
      earnBtn.innerHTML = `${icon('gift')}<small>Earn ₹</small>`;
    }
  }

  // Update active navigation buttons state
  document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.nav === navView));
  document.querySelectorAll('.desktop-nav a').forEach((link) => link.classList.toggle("is-active", link.dataset.nav === desktopView));

  if (isAccountView) {
    renderAccountSidebar();
    if (view === "account") renderAccount();
    else if (view === "referral") renderReferral();
    else if (view === "wallet") renderWallet();
    else if (view === "addresses") renderAddresses();
    else if (view === "payout") renderPayout();
    else if (view === "orders") renderOrders();
    else if (view === "wishlist") renderWishlist();
    else if (view === "recent") renderRecent();
    else if (view === "settings") renderSettings();
    else if (view === "support") renderSupport();
  }

  if (view === "login") renderLogin();
  else if (view === "signup") renderSignup();
  else if (view === "policy") renderPolicy();

  if (isAuthenticated && isAccountView) {
    if (view === "addresses" || view === "checkout") {
      loadAddressesFromApi();
    }
    if (view === "wallet" || view === "payout") {
      loadUserReferralsFromApi();
      loadUserWithdrawalsFromApi();
      loadPayoutMethodsFromApi().then(() => {
        if (state.view === "payout") renderPayout();
      });
    }
    if (view === "orders") {
      loadOrdersFromApi();
    }
    loadUserProfile().then(() => {
      renderAccountSidebar();
      if (state.view === "account") renderAccount();
      else if (state.view === "referral") renderReferral();
      else if (state.view === "wallet") renderWallet();
    });
  } else if (isAuthenticated && view === "checkout") {
    loadAddressesFromApi();
    loadUserProfile().then(() => {
      if (state.view === "checkout") renderCheckout();
    });
  }

  if (view === "checkout") {
    if (typeof fbq === "function") {
      fbq('track', 'InitiateCheckout', {
        value: cartTotal(),
        currency: 'INR'
      });
    }
  }

  if ((view === "search" || view === "categories") && state.search) {
    if (typeof fbq === "function") {
      fbq('track', 'Search', {
        search_string: state.search
      });
    }
  }

  if (view === "product" && state.productId) {
    const product = products.find(p => p.id === state.productId);
    if (product && typeof fbq === "function") {
      fbq('track', 'ViewContent', {
        content_name: product.name,
        content_category: product.category,
        content_ids: [product.id.toString()],
        content_type: 'product',
        value: product.price,
        currency: 'INR'
      });
    }
    loadReviewsForProduct(state.productId).then(() => {
      renderProduct();
    });
  }

  if (!fromHashChange) {
    const canonicalUrl = canonicalUrlForView(view);
    const currentUrl = window.location.pathname + window.location.search;
    if (currentUrl !== canonicalUrl || window.location.hash) {
      history.pushState(null, "", canonicalUrl);
    }
  }
  if (window.searchSuggestionsManager) {
    const activeEl = document.activeElement;
    const isDesktopSearch = activeEl && activeEl.matches("[data-search-input]") && activeEl.closest(".desktop-header");
    if (!isDesktopSearch) {
      window.searchSuggestionsManager.hide();
    }
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function backTarget() {
  if (["referral", "wallet", "orders", "addresses", "wishlist", "recent", "settings", "support"].includes(state.view)) return "account";
  if (state.view === "product") return "categories";
  if (state.view === "checkout") return "cart";
  if (state.view === "cart" || state.view === "categories" || state.view === "search") return "home";
  return "home";
}

function showExitConfirmationModal() {
  const existing = document.getElementById('exit-confirm-modal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'exit-confirm-modal';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.65); display: flex; align-items: center;
    justify-content: center; z-index: 999999; backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    background: #0b0e1a; border: 1.5px solid rgba(239, 68, 68, 0.3);
    border-radius: 20px; padding: 24px; width: 90%; max-width: 380px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5); position: relative;
    color: #fff; font-family: sans-serif; text-align: center;
    animation: modalScaleIn 0.2s ease-out;
  `;

  content.innerHTML = `
    <style>
      @keyframes modalScaleIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    </style>
    <div style="font-size: 40px; margin-bottom: 12px;">⚠️</div>
    <h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 800; color: #fff;">Exit Checkout?</h3>
    <p style="font-size: 14px; color: rgba(255, 255, 255, 0.7); line-height: 1.5; margin: 0 0 24px 0;">Are you sure you want to exit? Your item is saved in your cart, and you can complete the purchase anytime.</p>
    
    <div style="display: flex; gap: 12px; justify-content: center;">
      <button onclick="document.getElementById('exit-confirm-modal').remove(); setView('cart');" style="flex: 1; height: 44px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: #fff; font-weight: 700; cursor: pointer; font-size: 14px; transition: background 0.2s;">Yes, Exit</button>
      <button onclick="document.getElementById('exit-confirm-modal').remove();" style="flex: 1; height: 44px; border-radius: 10px; border: none; background: #8B5CF6; color: #0b0e1a; font-weight: 700; cursor: pointer; font-size: 14px; transition: opacity 0.2s;">No, Stay</button>
    </div>
  `;

  overlay.appendChild(content);
  document.body.appendChild(overlay);
}

function renderAll() {
  renderLogin();
  renderSignup();
  renderHome();
  renderCategories();
  renderSearch();
  renderProduct();
  renderCart();
  if (document.body.classList.contains("account-mode")) {
    renderAccountSidebar();
  }
  renderAccount();
  renderReferral();
  renderWallet();
  renderOrders();
  renderAddresses();
  renderPayout();
  renderWishlist();
  renderRecent();
  renderSettings();
  renderSupport();
  renderCheckout();
  renderThankyou();
  renderPolicy();
  const count = cartCount();
  const mobileBadge = document.getElementById("cart-badge");
  if (mobileBadge) {
    mobileBadge.textContent = count;
    mobileBadge.style.display = count > 0 ? "flex" : "none";
  }
  const backbarBadge = document.getElementById("backbar-cart-badge");
  if (backbarBadge) {
    backbarBadge.textContent = count;
    backbarBadge.style.display = count > 0 ? "flex" : "none";
  }
  const desktopBadge = document.getElementById("desktop-cart-badge");
  if (desktopBadge) {
    desktopBadge.textContent = count;
    desktopBadge.style.display = count > 0 ? "flex" : "none";
  }
  const wishCount = wishlistIds.length;
  const desktopWishBadge = document.getElementById("desktop-wishlist-badge");
  if (desktopWishBadge) {
    desktopWishBadge.textContent = wishCount;
    desktopWishBadge.style.display = wishCount > 0 ? "flex" : "none";
  }
  document.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = icon(el.dataset.icon);
  });
}

function restoreSearchFocus() {
  if (!["home", "categories", "search"].includes(state.view)) return;
  requestAnimationFrame(() => {
    const input = views[state.view]?.querySelector("[data-search-input]");
    if (!input) return;
    input.focus({ preventScroll: true });
    input.setSelectionRange(input.value.length, input.value.length);
    
    // Automatically trigger search suggestions update
    if (window.searchSuggestionsManager) {
      window.searchSuggestionsManager.activeInput = input;
      window.searchSuggestionsManager.showSuggestions();
    }
  });
}

function addToCart(productId, qty = 1, color = state.selectedColor, model = state.selectedModel) {
  const key = `${productId}:${color || ""}:${model || ""}`;
  state.cart[key] = (state.cart[key] || 0) + qty;
  persistCart();
  renderAll();

  // Find product name
  const product = products.find(p => p.id === productId);
  const name = product ? product.name : "Product";
  
  const checkIcon = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="#10b981" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; display:inline-block; vertical-align:middle; margin-right:6px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  
  showToast(`
    <div style="display:flex; align-items:center; justify-content:center; gap:4px; font-weight:700;">
      ${checkIcon}
      <span>Added to Cart!</span>
    </div>
  `);
}

document.addEventListener("click", async (event) => {
  // Expand closest to also capture divs with data-open-product (e.g. order-product row)
  const target = event.target.closest("button, article, a, [data-open-product]");
  if (!target) return;

  if (target.matches('a[href^="mailto:"]')) {
    event.preventDefault();
    window.location.href = target.href;
    return;
  }

  if (target.matches('a[href^="#"]')) {
    const next = target.getAttribute("href").slice(1);
    if (views[next]) {
      event.preventDefault();
      setView(next);
      return;
    }
  }

  if (target.dataset.nav) {
    event.preventDefault();
    const dest = target.dataset.nav;
    if (dest.startsWith("mailto:") || dest.startsWith("tel:") || dest.startsWith("https://") || dest.startsWith("http://")) {
      window.location.href = dest;
    } else {
      setView(dest);
    }
    return;
  }

  if (target.dataset.policy) {
    event.preventDefault();
    state.policyTab = target.dataset.policy;
    setView("policy");
    return;
  }

  if (target.dataset.back !== undefined) {
    if (state.view === "checkout") {
      showExitConfirmationModal();
    } else {
      setView(backTarget());
    }
    return;
  }

  if (target.dataset.category) {
    event.preventDefault();
    state.selectedCategory = target.dataset.category;
    renderAll();
    setView("categories");
    return;
  }

  if (target.dataset.openProduct) {
    state.productId = target.dataset.openProduct;
    if (target.id === "purchase-notification-widget" || target.closest("#purchase-notification-widget")) {
      if (typeof recentPurchasePopupManager !== "undefined") {
        recentPurchasePopupManager.close();
      }
    }
    clearSearchInputs();
    renderAll();
    setView("product");
    return;
  }

  if (target.dataset.shareProduct) {
    event.stopPropagation();
    window.shareProduct(target.dataset.shareProduct, target.dataset.shareName || "Product");
    return;
  }

  if (target.dataset.toggleWishlist) {
    event.stopPropagation();
    toggleWishlist(target.dataset.toggleWishlist);
    return;
  }

  if (target.dataset.openDrawer) {
    event.stopPropagation();
    window.openOptionsDrawer(target.dataset.openDrawer);
    return;
  }

  if (target.dataset.addCart) {
    event.stopPropagation();
    addToCart(target.dataset.addCart);
    return;
  }

  if (target.dataset.buyNow) {
    addToCart(target.dataset.buyNow);
    setView("checkout");
    return;
  }

  if (target.dataset.cartInc) {
    state.cart[target.dataset.cartInc] += 1;
    persistCart();
    renderAll();
    return;
  }

  if (target.dataset.cartDec) {
    const id = target.dataset.cartDec;
    state.cart[id] = Math.max(0, state.cart[id] - 1);
    if (!state.cart[id]) delete state.cart[id];
    persistCart();
    renderAll();
    return;
  }

  if (target.dataset.cartRemove) {
    delete state.cart[target.dataset.cartRemove];
    persistCart();
    renderAll();
    return;
  }

  if (target.dataset.clearCart !== undefined) {
    state.cart = {};
    persistCart();
    renderAll();
    return;
  }

  if (target.dataset.copyCode !== undefined) {
    showToast("Referral code copied");
    return;
  }

  if (target.dataset.placeOrder !== undefined) {
    // Do not submit a product restored from localStorage until the live catalog
    // has finished loading. A product may have been removed since the cart was
    // saved, which would otherwise violate the orders foreign key.
    await initialProductsLoadPromise;

    const currentCartItems = cartItems();
    if (!currentCartItems.length) {
      state.cart = {};
      persistCart();
      renderAll();
      return showToast("This product is no longer available. Please add an available product to your cart.");
    }

    const firstCartItem = currentCartItems[0];
    const firstProductId = firstCartItem.id;
    const selectedColorVal = firstCartItem.selectedColor || "";
    const selectedModelVal = firstCartItem.selectedModel || "";
    const firstProductQty = firstCartItem.qty || 1;
    
    const token = localStorage.getItem("customer-user-token");
    if (!token) return showToast("Please login to place an order");

    const checkoutEmailInput = document.getElementById("checkout-email");
    const checkoutEmail = checkoutEmailInput ? checkoutEmailInput.value.trim() : "";

    // Determine address details
    let selectedAddressId = state.selectedAddressId;
    if (!selectedAddressId) {
      const defaultAddr = addresses.find(a => a.is_default) || addresses[0];
      if (defaultAddr) {
        selectedAddressId = defaultAddr.id;
      }
    }

    // Verify the resolved address ID actually exists in the current (fresh) addresses list.
    // A stale state.selectedAddressId can survive after the user deletes all addresses.
    if (selectedAddressId && !addresses.find(a => a.id === selectedAddressId)) {
      selectedAddressId = null;
      state.selectedAddressId = null;
    }

    if (!selectedAddressId) {
      return showToast("Please add a shipping address to continue");
    }
    
    // Email is required on the first order
    const isFirstOrder = (orders.length === 0);
    if (isFirstOrder && !checkoutEmail) {
      return showToast("Please enter your email address");
    }
    
    try {
        // ── Show purchase loading overlay ──
        const placeOrderBtn = document.querySelector('button[data-place-order]');
        const loadingOverlay = document.getElementById('purchase-loading-overlay');
        if (placeOrderBtn) placeOrderBtn.disabled = true;
        if (loadingOverlay) loadingOverlay.classList.add('active');
 
        const hideLoading = () => {
          if (loadingOverlay) loadingOverlay.classList.remove('active');
          if (placeOrderBtn) placeOrderBtn.disabled = false;
        };
 
        const bodyObj = {
            product_id: firstProductId,
            quantity: firstProductQty,
            total_amount: cartTotal(),
            email: checkoutEmail || undefined,
            use_wallet: state.useWallet === true,
            address_id: selectedAddressId,
            color: selectedColorVal ? (selectedModelVal ? `${selectedColorVal} (${selectedModelVal})` : selectedColorVal) : (selectedModelVal ? `(${selectedModelVal})` : undefined),
            payment_method: state.paymentMethod || 'COD'
        };
        if (state.appliedCoupon) {
            bodyObj.coupon_code = state.appliedCoupon.code;
        }

        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bodyObj)
        });
        
        if (res.ok) {
            const placedOrder = await res.json();

            // Handle Cashfree Online Payment Gateway Redirect
            if (placedOrder.status === 'payment_pending' && placedOrder.payment_session_id) {
                hideLoading();
                const cashfree = Cashfree({ mode: placedOrder.mode || "production" });
                await cashfree.checkout({
                    paymentSessionId: placedOrder.payment_session_id
                });
                return;
            }

            state.lastPlacedOrder = placedOrder;

            if (checkoutEmail) {
                localStorage.setItem("user-email", checkoutEmail);
            }
            // Clear checkout states
            state.appliedCoupon = null;
            state.couponError = null;
            state.selectedAddressId = null;
            state.useWallet = false;

            await loadAddressesFromApi();
            await loadOrdersFromApi();
            state.cart = {};
            persistCart();
            hideLoading();
            renderAll();
            if (typeof fbq === "function") {
                fbq('track', 'Purchase', {
                    content_ids: [placedOrder.product_id ? placedOrder.product_id.toString() : ''],
                    content_type: 'product',
                    value: placedOrder.total,
                    currency: 'INR'
                }, { eventID: 'ord_' + placedOrder.id });
            }
            setView("thankyou");
            triggerCelebration();
            showToast("Order placed successfully");
        } else {
            const errData = await res.json();
            hideLoading();
            showToast(errData.message || "Failed to place order");
        }
    } catch (e) {
        const loadingOverlay = document.getElementById('purchase-loading-overlay');
        if (loadingOverlay) loadingOverlay.classList.remove('active');
        const placeOrderBtn = document.querySelector('button[data-place-order]');
        if (placeOrderBtn) placeOrderBtn.disabled = false;
        showToast("Error placing order");
    }
  }
});

document.addEventListener("input", (event) => {
  if (!event.target.matches("[data-search-input]")) return;
  const fromDesktopHeader = Boolean(event.target.closest(".desktop-header"));
  state.search = event.target.value;

  if (fromDesktopHeader) {
    // Desktop header search — full render + navigate is fine
    renderAll();
    setView("categories");
  } else {
    // Mobile / search page — only update the product grid in-place
    // so the keyboard never loses focus and doesn't glitch
    const grid = views[state.view]?.querySelector(".product-grid");
    if (grid) {
      grid.innerHTML = filteredProducts().map(productCard).join("");
      // Re-inject data-icon SVGs that are rendered as attributes
      grid.querySelectorAll("[data-icon]").forEach(el => {
        el.innerHTML = icon(el.dataset.icon);
      });
    }
    // Also update category chips if present (filter row)
    const chips = views[state.view]?.querySelector(".category-chips");
    if (chips) {
      chips.outerHTML = categoryChips();
    }
    // Show suggestions without re-render
    if (window.searchSuggestionsManager) {
      window.searchSuggestionsManager.activeInput = event.target;
      window.searchSuggestionsManager.showSuggestions();
    }
  }
});
// Subscription form handler removed

function renderLogin() {
  views.login.innerHTML = `
    <div class="auth-view-container">
      <article class="auth-card">
        <button class="auth-back-btn" onclick="setView(backTarget())" aria-label="Back" style="position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 6px 14px; display: inline-flex; align-items: center; gap: 8px; color: white; cursor: pointer; transition: all 0.2s; z-index: 10; font-size: 13px; font-weight: 600;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.06)'">
          <span style="display: flex; align-items: center; width: 14px; height: 14px;">${icon("back")}</span>
          <span>Back</span>
        </button>
        <div class="auth-card-scrollable">
          <div class="auth-logo" style="display: flex; justify-content: center; margin-bottom: 20px;">
            <img src="/assets/logo.png" alt="ZappDeal Logo" style="height: 44px; display: block; object-fit: contain;">
          </div>
          <h2>Welcome Back</h2>
          <p>Log in with your phone number to access premium mobile covers</p>
          
          <form onsubmit="event.preventDefault(); handleCustomerLogin();">
            <div class="auth-input-group">
              <label for="login-phone">Phone Number</label>
              <div style="display: flex; gap: 0; align-items: stretch; margin-top: 6px;">
                <span style="display: flex; align-items: center; padding: 0 14px; background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.15); border-radius: 8px 0 0 8px; color: #fff; font-size: 14.5px; font-weight: 700; border-right: none;">+91</span>
                <input type="tel" id="login-phone" placeholder="9876543210" required style="border-radius: 0 8px 8px 0; flex: 1; margin: 0; height: 44px; padding: 0 12px; border: 1.5px solid rgba(255,255,255,0.15); background: rgba(0, 0, 0, 0.2); color: white; font-size: 14.5px; outline: none;" value="">
              </div>
            </div>
            
            <button type="submit" class="auth-btn" disabled>Log In & Send OTP</button>
          </form>
          
          <div class="auth-switch">
            Don't have an account? <a href="#signup" onclick="event.preventDefault(); setView('signup');">Sign Up</a>
          </div>
        </div>
      </article>
    </div>
  `;
  restrictPhoneInput(document.getElementById("login-phone"));
}

function renderSignup() {
  const referralVal = cleanReferralCode(state.urlReferralCode || "");
  const displayStyle = "block";
  const prefilledPhone = state.enteredPhone || "";

  views.signup.innerHTML = `
    <div class="auth-view-container">
      <article class="auth-card">
        <button class="auth-back-btn" onclick="setView(backTarget())" aria-label="Back" style="position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 6px 14px; display: inline-flex; align-items: center; gap: 8px; color: white; cursor: pointer; transition: all 0.2s; z-index: 10; font-size: 13px; font-weight: 600;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.06)'">
          <span style="display: flex; align-items: center; width: 14px; height: 14px;">${icon("back")}</span>
          <span>Back</span>
        </button>
        <div class="auth-card-scrollable">
          <div class="auth-logo" style="display: flex; justify-content: center; margin-bottom: 20px;">
            <img src="/assets/logo.png" alt="ZappDeal Logo" style="height: 44px; display: block; object-fit: contain;">
          </div>
          <h2>Create Account</h2>
          <p>Sign up with your phone number to shop premium covers</p>
          
          <form onsubmit="event.preventDefault(); handleCustomerSignup();">
            <div class="auth-input-group">
              <label for="signup-name">Full Name</label>
              <input type="text" id="signup-name" placeholder="John Doe" required>
            </div>

            <div class="auth-input-group">
              <label for="signup-email">Email Address</label>
              <input type="email" id="signup-email" placeholder="john.doe@example.com" required>
            </div>

            <div class="auth-input-group">
              <label for="signup-phone">Phone Number</label>
              <div style="display: flex; gap: 0; align-items: stretch; margin-top: 6px;">
                <span style="display: flex; align-items: center; padding: 0 14px; background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.15); border-radius: 8px 0 0 8px; color: #fff; font-size: 14.5px; font-weight: 700; border-right: none;">+91</span>
                <input type="tel" id="signup-phone" placeholder="9876543210" value="${prefilledPhone}" required style="border-radius: 0 8px 8px 0; flex: 1; margin: 0; height: 44px; padding: 0 12px; border: 1.5px solid rgba(255,255,255,0.15); background: rgba(0, 0, 0, 0.2); color: white; font-size: 14.5px; outline: none;">
              </div>
            </div>
            
            <div class="auth-input-group" style="display: ${displayStyle}">
              <label for="signup-referral">Referral Code (Optional)</label>
              <input type="text" id="signup-referral" placeholder="Optional Code" value="${referralVal}">
            </div>
            
            <button type="submit" class="auth-btn" disabled>Sign Up & Send OTP</button>
          </form>
          
          <div class="auth-switch">
            Already have an account? <a href="#login" onclick="event.preventDefault(); setView('login');">Log In</a>
          </div>
        </div>
      </article>
    </div>
  `;
  restrictPhoneInput(document.getElementById("signup-phone"));
  
  const referralInput = document.getElementById("signup-referral");
  if (referralInput) {
    referralInput.addEventListener("paste", (e) => {
      setTimeout(() => {
        referralInput.value = cleanReferralCode(referralInput.value);
      }, 0);
    });
    referralInput.addEventListener("blur", () => {
      referralInput.value = cleanReferralCode(referralInput.value);
    });
  }
}

function renderOTPVerification(targetView, details, verifyCallback, resendCallback) {
  const container = targetView === 'signup' ? views.signup : views.login;
  container.innerHTML = `
    <div class="auth-view-container">
      <article class="auth-card" style="animation: fadeIn 0.3s ease-in-out;">
        <div class="auth-logo" style="display: flex; justify-content: center; margin-bottom: 20px;">
          <img src="/assets/logo.png" alt="ZappDeal Logo" style="height: 44px; display: block; object-fit: contain;">
        </div>
        <h2>Verify Phone Number</h2>
        <p style="margin-bottom: 24px; font-size: 14px; color: #64748b; line-height: 1.5;">
          We have sent a 6-digit OTP to your registered phone number:<br>
          <strong style="color: #ffffff; font-size: 15px;">${details.phone}</strong>
        </p>

        <form id="otp-verification-form" onsubmit="event.preventDefault();">
          <div class="auth-input-group" style="margin-bottom: 24px;">
            <label for="otp-code" style="font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 8px; display: block; text-align: left;">Verification Code</label>
            <input type="text" id="otp-code" placeholder="••••••" maxlength="6" required autocomplete="one-time-code" inputmode="numeric"
                   style="text-align: center; font-size: 24px; letter-spacing: 6px; font-weight: 700; font-family: monospace; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; width: 100%; box-sizing: border-box; transition: border-color 0.2s;"
                   oninput="this.value = this.value.replace(/\D/g,'');">
          </div>
          
          <button type="submit" class="auth-btn" style="width: 100%; padding: 12px; background: #6366f1; color: white; border: none; border-radius: 10px; font-weight: 600; font-size: 15px; cursor: pointer;">Verify & Proceed</button>
        </form>
        
        <div class="auth-switch" style="margin-top: 24px; text-align: center; font-size: 13px; color: #64748b;">
          Didn't receive the OTP? <a href="#" id="otp-resend-btn" style="color: #6366f1; font-weight: 600; text-decoration: none;">Resend OTP</a>
          <br><br>
          <a href="#" id="otp-cancel-btn" style="color: #94a3b8; text-decoration: none;">← Go Back</a>
        </div>
      </article>
    </div>
  `;

  document.getElementById("otp-verification-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const otp = document.getElementById("otp-code").value.trim();
    if (otp.length !== 6) {
      return showToast("Please enter a 6-digit OTP");
    }
    verifyCallback(otp);
  });

  document.getElementById("otp-resend-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const otpInput = document.getElementById("otp-code");
    if (otpInput) otpInput.value = "";
    resendCallback();
  });

  document.getElementById("otp-cancel-btn").addEventListener("click", (e) => {
    e.preventDefault();
    if (targetView === 'signup') {
      renderSignup();
    } else {
      renderLogin();
    }
  });
}

function postAuthRedirect() {
  if (localStorage.getItem("checkout-redirect") === "true") {
    localStorage.removeItem("checkout-redirect");
    setView("checkout");
  } else {
    setView("home");
  }
}

async function handleCustomerLogin() {
  const phoneInput = document.getElementById("login-phone");
  let rawPhone;
  if (phoneInput) {
    rawPhone = phoneInput.value.trim();
    state.tempPhone = rawPhone;
  } else if (state.tempPhone) {
    rawPhone = state.tempPhone;
  } else {
    return;
  }
  if (!rawPhone) return showToast("Please enter phone number");
  if (rawPhone.length !== 10) return showToast("Please enter a valid 10-digit phone number");
  const phone = "+91" + rawPhone;

  try {
      const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({ phone })
      });
      const data = await res.json();
      
      if (!res.ok) {
          if (res.status === 404) {
              state.enteredPhone = rawPhone;
              showToast("Phone number not registered. Redirecting to Registration...");
              setView('signup');
              return;
          }
          return showToast(data.message || "Invalid credentials");
      }
      
      if (data.user && data.user.is_admin) {
          return showToast("Admin accounts cannot log in here");
      }

      if (data.requires_otp) {
          showToast("OTP sent to your registered phone number!");
          renderOTPVerification('login', { phone: data.phone_raw || phone }, async (otp) => {
              try {
                  const verifyRes = await fetch('/api/login/verify-otp', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                      },
                      body: JSON.stringify({ phone: data.phone_raw || phone, otp })
                  });
                  const verifyData = await verifyRes.json();
                  if (!verifyRes.ok) {
                      return showToast(verifyData.message || "OTP Verification failed");
                  }
                  
                  localStorage.setItem("user-authenticated", "true");
                  localStorage.setItem("user-name", verifyData.user.name);
                  localStorage.setItem("user-email", verifyData.user.email || "");
                  localStorage.setItem("user-phone", verifyData.user.phone || "");
                  localStorage.setItem("customer-user-token", verifyData.access_token);
                  localStorage.setItem("user-referral-code", verifyData.user.referral_code || "");
                  mergeGuestWishlist(verifyData.user.phone || "authenticated");
                  loadWishlist();
                  if (typeof fbq === "function") {
                    fbq('track', 'Login');
                  }
                  showToast("Logged in successfully!");
                  await loadAddressesFromApi();
                  await loadOrdersFromApi();
                  renderAll();
                  postAuthRedirect();
              } catch (err) {
                  showToast("Verification failed. Check connection.");
              }
          }, () => {
              handleCustomerLogin();
          });
          return;
      }

      localStorage.setItem("user-authenticated", "true");
      localStorage.setItem("user-name", data.user.name);
      localStorage.setItem("user-email", data.user.email || "");
      localStorage.setItem("user-phone", data.user.phone || "");
      localStorage.setItem("customer-user-token", data.access_token);
      localStorage.setItem("user-referral-code", data.user.referral_code || "");
      mergeGuestWishlist(data.user.phone || "authenticated");
      loadWishlist();
      showToast("Logged in successfully!");
      await loadAddressesFromApi();
      await loadOrdersFromApi();
      renderAll();
      postAuthRedirect();
  } catch (err) {
      showToast("Login failed. Check connection.");
  }
}

async function handleCustomerSignup() {
  const nameEl = document.getElementById("signup-name");
  let name, email, rawPhone, referralCode;
  if (nameEl) {
    name = nameEl.value.trim();
    email = document.getElementById("signup-email").value.trim();
    rawPhone = document.getElementById("signup-phone").value.trim();
    referralCode = document.getElementById("signup-referral").value.trim();
    state.tempSignup = { name, email, rawPhone, referralCode };
  } else if (state.tempSignup) {
    name = state.tempSignup.name;
    email = state.tempSignup.email;
    rawPhone = state.tempSignup.rawPhone;
    referralCode = state.tempSignup.referralCode;
  } else {
    return;
  }
  if (!name || !email || !rawPhone) return showToast("Please fill all details");
  if (rawPhone.length !== 10) return showToast("Please enter a valid 10-digit phone number");
  const phone = "+91" + rawPhone;

  try {
      const res = await fetch('/api/register/send-otp', {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({ name, email, phone, referral_code: referralCode || null })
      });
      const data = await res.json();
      
      if (!res.ok) {
          return showToast(data.message || "Signup failed");
      }

      showToast("OTP sent to your phone number!");
      renderOTPVerification('signup', { phone }, async (otp) => {
          try {
              const verifyRes = await fetch('/api/register/verify-otp', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                  },
                  body: JSON.stringify({ phone, otp })
              });
              const verifyData = await verifyRes.json();
              if (!verifyRes.ok) {
                  return showToast(verifyData.message || "OTP Verification failed");
              }

              localStorage.setItem("user-authenticated", "true");
              localStorage.setItem("user-name", verifyData.user.name);
              localStorage.setItem("user-email", verifyData.user.email || "");
              localStorage.setItem("user-phone", verifyData.user.phone || "");
              localStorage.setItem("customer-user-token", verifyData.access_token);
              localStorage.setItem("user-referral-code", verifyData.user.referral_code || "");
              state.enteredPhone = ""; // Clear prefilled phone
              mergeGuestWishlist(verifyData.user.phone || "authenticated");
              loadWishlist();
              if (typeof fbq === "function") {
                fbq('track', 'CompleteRegistration');
              }
              showToast("Account created successfully!");
              await loadAddressesFromApi();
              await loadOrdersFromApi();
              renderAll();
              postAuthRedirect();
          } catch (err) {
              showToast("Verification failed. Check connection.");
          }
      }, () => {
          handleCustomerSignup();
      });
  } catch (err) {
      showToast("Signup failed. Check connection.");
  }
}

async function handleCustomerSocial(platform) {
  localStorage.setItem("user-authenticated", "true");
  localStorage.setItem("user-email", "social@domain.com");
  localStorage.setItem("user-name", "Guest User");
  localStorage.setItem("user-phone", "social");
  mergeGuestWishlist("social");
  loadWishlist();
  showToast(`Authenticated via ${platform}!`);
  await loadAddressesFromApi();
  await loadOrdersFromApi();
  renderAll();
  postAuthRedirect();
}

// Global hook for logout interception in general clicks
document.addEventListener("click", (event) => {
  const btn = event.target.closest("button, a");
  if (!btn) return;
  const txt = btn.textContent.trim().toLowerCase();
  if (txt.includes("log out") || txt === "sign out") {
    event.preventDefault();
    localStorage.removeItem("user-authenticated");
    localStorage.removeItem("user-email");
    localStorage.removeItem("user-name");
    localStorage.removeItem("user-phone");
    localStorage.removeItem("customer-user-token");
    localStorage.removeItem("user-referral-code");
    localStorage.removeItem("iselectrics-orders");
    localStorage.removeItem("iselectrics-cart");
    localStorage.removeItem("checkout-redirect");
    orders = [];
    state.cart = {};
    loadWishlist();
    showToast("Logged out successfully");
    renderAll();
    setView("home");
  }
});

window.handleCustomerLogin = handleCustomerLogin;
window.handleCustomerSignup = handleCustomerSignup;
window.handleCustomerSocial = handleCustomerSocial;
window.renderLogin = renderLogin;
window.renderSignup = renderSignup;
window.renderOTPVerification = renderOTPVerification;

renderAll();

const urlParams = new URLSearchParams(window.location.search);
const refPathMatch = window.location.pathname.match(/\/ref\/([^/?]+)/i);
const refCode = urlParams.get('ref') || urlParams.get('referral') || (refPathMatch ? decodeURIComponent(refPathMatch[1]) : null);
if (refCode) {
  state.urlReferralCode = cleanReferralCode(refCode);
}

// Cashfree Payment Callback Handler
const cfPaymentStatus = urlParams.get('payment');
if (cfPaymentStatus === 'success') {
  const purchaseValue = cartTotal() || 199;
  const orderId = urlParams.get('order_id');
  if (typeof fbq === "function" && orderId) {
    fbq('track', 'Purchase', {
      value: purchaseValue,
      currency: 'INR'
    }, { eventID: 'ord_' + orderId });
  }
  state.cart = {};
  persistCart();
  setTimeout(() => {
    showToast("Order placed successfully");
    triggerCelebration();
  }, 100);
  window.history.replaceState({}, document.title, appPath("/order-confirmation"));
  setView("thankyou", true);
} else if (cfPaymentStatus === 'failed') {
  setTimeout(() => {
    showToast("Payment failed or cancelled. Please try again.");
  }, 100);
  window.history.replaceState({}, document.title, appPath("/checkout"));
  setView("checkout", true);
}

function resolvePathRoute() {
  const baseDir = window.APP_BASE_PATH || "/";
  let path = window.location.pathname;
  if (path.startsWith(baseDir)) {
    path = "/" + path.substring(baseDir.length);
  }
  path = path.replace(/\/+$/, "") || "/";
  const staticRoutes = {
    "/": "home", "/index.php": "home", "/login": "login", "/signup": "signup",
    "/cart": "cart", "/checkout": "checkout", "/support": "support", "/account": "account",
    "/account/orders": "orders", "/account/addresses": "addresses", "/account/wishlist": "wishlist",
    "/account/wallet": "wallet", "/account/referrals": "referral", "/account/payout": "payout",
    "/account/recent": "recent", "/account/settings": "settings", "/order-confirmation": "thankyou"
  };
  if (staticRoutes[path]) return staticRoutes[path];

  const parts = path.split('/').filter(Boolean);
  if (parts[0] === "collections" && parts.length === 2) {
    const slug = parts[1].toLowerCase();
    if (slug === "all") state.selectedCategory = "All";
    else if (["iphone-covers", "iphone-cases", "mobile"].includes(slug)) state.selectedCategory = "Mobile";
    else {
      const category = categories.find(item => slugify(item) === slug);
      state.selectedCategory = category || "All";
      if (!category) history.replaceState(null, "", appPath("/collections/all"));
    }
    return "categories";
  }
  if (parts[0] === "product" && parts.length === 2) {
    const productSlug = parts[1];
    const matched = products.find(p => slugify(p.name) === productSlug || String(p.id) === productSlug);
    if (matched) {
      state.productId = matched.id;
      return "product";
    }
    if (!productsApiLoaded) return null;
    if (products.length) {
      state.selectedCategory = "All";
      history.replaceState(null, "", appPath("/collections/all"));
      return "categories";
    }
    return null;
  }
  if (parts[0] === "search" && parts.length === 1) {
    state.search = new URLSearchParams(window.location.search).get("q") || "";
    return "search";
  }
  if (parts[0] === "policies" && parts.length === 2) {
    state.policyTab = parts[1];
    return "policy";
  }
  // Legacy clean product route: /category/product-slug
  if (parts.length === 2) {
    const matched = products.find(p => slugify(p.name) === parts[1] || String(p.id) === parts[1]);
    if (matched) {
      state.productId = matched.id;
      history.replaceState(null, "", appPath(`/product/${slugify(matched.name)}`));
      return "product";
    }
  }
  return null;
}

function parseHashView() {
  let next = location.hash.slice(1);
  let params = {};
  if (next.includes("?")) {
    const parts = next.split("?");
    next = parts[0];
    const query = parts[1];
    query.split("&").forEach(pair => {
      const [k, v] = pair.split("=");
      if (k) params[k] = decodeURIComponent(v || "");
    });
  }
  
  if (params.ref || params.referral) {
    state.urlReferralCode = cleanReferralCode(params.ref || params.referral);
  }
  
  if (next === "product" && params.id) {
    state.productId = params.id;
  } else if (next === "categories" && params.category) {
    state.selectedCategory = params.category;
  } else if (next === "policy" && params.tab) {
    state.policyTab = params.tab;
  }
  return next;
}

const token = localStorage.getItem("customer-user-token");
const userIsAuth = localStorage.getItem("user-authenticated") === "true" && token && token !== "null" && token !== "undefined";
if (state.urlReferralCode && !userIsAuth) {
  setView("signup", true);
} else {
  const pathView = resolvePathRoute();
  if (pathView) {
    setView(pathView, true);
  } else {
    const initialView = parseHashView();
    if (initialView && views[initialView]) {
      // Avoid landing on empty cart/checkout pages on startup
      const cartItemsCount = Object.keys(state.cart || {}).length;
      if ((initialView === "cart" || initialView === "checkout") && cartItemsCount === 0) {
        setView("home");
      } else if (initialView === "product" && !productsApiLoaded && !products.some(product => String(product.id) === String(state.productId))) {
        setView("home", true);
      } else {
        setView(initialView, true);
        history.replaceState(null, "", canonicalUrlForView(state.view));
      }
    } else {
      const relativePath = window.location.pathname.substring((window.APP_BASE_PATH || "/").replace(/\/$/, "").length) || "/";
      const waitingForProductData = !productsApiLoaded && (/^\/product\/[^/]+\/?$/.test(relativePath) || /^\/(?!account\/|policies\/|collections\/)[^/]+\/[^/]+\/?$/.test(relativePath));
      setView("home", true);
      if (!waitingForProductData && (window.location.pathname !== appPath("/") || window.location.hash)) history.replaceState(null, "", appPath("/"));
    }
  }
}

window.addEventListener("popstate", () => {
  if (window.location.search.includes("payment=")) {
    window.location.replace(appPath("/"));
    return;
  }

  if (state.view === "thankyou") {
    history.replaceState(null, "", appPath("/"));
    setView("home", true);
    return;
  }

  if (state.view === "checkout") {
    showExitConfirmationModal();
    history.pushState(null, "", appPath("/checkout"));
    return;
  }

  const pathView = resolvePathRoute();
  if (pathView) {
    setView(pathView, true);
  } else {
    const next = parseHashView();
    if (views[next]) setView(next, true);
  }
});

window.addEventListener("resize", () => {
  if (state.view === "home") {
    renderHome();
  }
});

window.addEventListener("storage", (event) => {
  if (["iselectrics-products", "iselectrics-home-banner", "iselectrics-product-display-meta"].includes(event.key)) {
    products = JSON.parse(localStorage.getItem("iselectrics-products") || "[]");
    if (state.view === "home" || state.view === "categories" || state.view === "search" || state.view === "product") {
      renderAll();
    }
  }
});

// Poll APIs for fresh data every 5 seconds to keep the storefront perfectly synchronized with the database in real-time
setInterval(() => {
  loadProductsFromApi();
  if (localStorage.getItem("customer-user-token")) {
    loadOrdersFromApi();
  }
}, 5000);

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

// ==========================================================================
// DYNAMIC OPTIONS SIDEBAR DRAWER LOGIC
// ==========================================================================

function renderDrawerBody() {
  const product = products.find(p => p.id === state.drawerProductId);
  const body = document.getElementById("options-drawer-body");
  if (!product || !body) return;

  const drawerColors = getProductColorsForModel(product, state.drawerSelectedModel);
  const hasColors = drawerColors && drawerColors.length > 0;
  const isMobile = isMobileProduct(product);
  const models = normalizeProductModels(product);
  const hasModels = models && models.length > 0;

  let colorsHtml = "";
  if (hasColors) {
    colorsHtml = `
      <div class="drawer-option-section">
        <span class="drawer-option-label">Color: <strong style="color: var(--cyan); font-weight:700;">${state.drawerSelectedColor || "None"}</strong></span>
        <div class="drawer-colors-row">
          ${drawerColors.map(colorStr => {
            const { name: colorName, hex: colorHex } = getColorNameAndHex(colorStr);
            const isActive = state.drawerSelectedColor.toLowerCase() === colorName.toLowerCase();
            return `
              <button class="drawer-color-circle ${isActive ? 'is-active' : ''}" 
                      style="background-color: ${colorHex};" 
                      onclick="window.selectDrawerColor('${colorName.replace(/'/g, "\\'")}')"
                      title="${colorName}">
                ${isActive ? `
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 1.5px 2px rgba(0,0,0,0.85));">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ` : ''}
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  let modelsHtml = "";
  if (hasModels) {
    modelsHtml = `
      <div class="drawer-option-section">
        <span class="drawer-option-label">${isMobile ? "Select iPhone Model" : "Select Version"}</span>
        <select class="drawer-models-select" onchange="window.selectDrawerModel(this.value)">
          <option value="" ${!state.drawerSelectedModel ? 'selected' : ''}>-- Choose option --</option>
          ${models.map(model => `
            <option value="${model}" ${state.drawerSelectedModel === model ? 'selected' : ''}>${model}</option>
          `).join("")}
        </select>
      </div>
    `;
  }

    // Buttons moved here inside the drawer content flow
    const isLocked = (hasColors && !state.drawerSelectedColor) || (hasModels && !state.drawerSelectedModel);
    
    // Gather all images for lightbox
    const allSlides = getProductSlides(product, state.drawerSelectedColor, state.drawerSelectedModel)
      .filter(s => s.type === 'image').map(s => s.url);

    body.innerHTML = `
      <div class="drawer-product-summary">
        <button class="drawer-img-btn" onclick="window.openDrawerImageLightbox()" aria-label="View all images" title="Click to view images">
          <img src="${window.getProductSelectedVariantImage(product, state.drawerSelectedColor, state.drawerSelectedModel)}" alt="${product.name}">
        </button>
        <div class="drawer-product-info">
          <h4>${product.name}</h4>
          <span class="drawer-price">${money(product.price)}</span>
        </div>
      </div>

      ${colorsHtml}
      ${modelsHtml}

      <div class="drawer-option-section">
        <span class="drawer-option-label">Quantity</span>
        <div class="drawer-qty-control">
          <button onclick="window.changeDrawerQty(-1)">-</button>
          <span id="drawer-qty-val">${state.drawerQty}</span>
          <button onclick="window.changeDrawerQty(1)">+</button>
        </div>
      </div>

      ${isLocked ? `
        <div style="font-size: 11px; font-weight: 700; color: #ff8a17; margin-top: 25px; text-align: center;">
          Select Model & Color
        </div>
      ` : ""}

      <div class="drawer-action-dock" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: ${isLocked ? '15px' : '40px'};">
        <button class="secondary-btn full" onclick="window.submitDrawerAddToCart(false)" ${isLocked ? 'disabled' : ''} style="height: 48px; border-radius: 12px; font-weight: 700; cursor: ${isLocked ? 'not-allowed' : 'pointer'}; opacity: ${isLocked ? 0.5 : 1}; pointer-events: ${isLocked ? 'none' : 'auto'};">Add to Cart</button>
        <button class="primary-btn full" onclick="window.submitDrawerAddToCart(true)" ${isLocked ? 'disabled' : ''} style="height: 48px; border-radius: 12px; font-weight: 700; cursor: ${isLocked ? 'not-allowed' : 'pointer'}; opacity: ${isLocked ? 0.5 : 1}; pointer-events: ${isLocked ? 'none' : 'auto'};">Buy Now</button>
      </div>
    `;
}

window.openOptionsDrawer = function(productId) {
  state.drawerProductId = productId;
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Initialize selections (do not set default color, force user choice)
  state.drawerSelectedColor = "";
  state.drawerSelectedModel = "";
  state.drawerQty = 1;

  // Render contents
  renderDrawerBody();

  // Show drawer
  const drawer = document.getElementById("options-drawer");
  if (drawer) {
    drawer.classList.add("is-active");
    drawer.setAttribute("aria-hidden", "false");
  }
};

window.closeOptionsDrawer = function() {
  const drawer = document.getElementById("options-drawer");
  if (drawer) {
    drawer.classList.remove("is-active");
    drawer.setAttribute("aria-hidden", "true");
  }
  // Also close lightbox when drawer is dismissed
  window.closeDrawerImageLightbox();
};

// ==========================================================================
// PDP FULLSCREEN IMAGE VIEWER (opens on product detail page image tap/click)
// ==========================================================================

(function initPdpFullscreen() {
  let _images = [];
  let _index  = 0;
  let _touchStartX = 0;

  function getOrCreate() {
    let el = document.getElementById('pdp-fullscreen-lb');
    if (el) return el;

    el = document.createElement('div');
    el.id = 'pdp-fullscreen-lb';
    el.className = 'pdp-fullscreen-lb';
    el.innerHTML = `
      <button class="pdp-fs-close" id="pdp-fs-close" aria-label="Close">&times;</button>
      <div class="pdp-fs-stage">
        <img id="pdp-fs-img" src="" alt="Product image" draggable="false">
      </div>
      <div class="pdp-fs-nav">
        <button class="pdp-fs-arrow" id="pdp-fs-prev" aria-label="Previous">&#8592;</button>
        <span class="pdp-fs-counter" id="pdp-fs-counter">1 / 1</span>
        <button class="pdp-fs-arrow" id="pdp-fs-next" aria-label="Next">&#8594;</button>
      </div>
      <div class="pdp-fs-dots" id="pdp-fs-dots"></div>
    `;

    // Close on backdrop
    el.addEventListener('click', (e) => {
      if (e.target === el) closePdpFullscreen();
    });

    // Swipe support
    el.addEventListener('touchstart', (e) => { _touchStartX = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - _touchStartX;
      if (Math.abs(dx) > 50) dx < 0 ? goNext() : goPrev();
    });

    document.body.appendChild(el);

    document.getElementById('pdp-fs-close').addEventListener('click', closePdpFullscreen);
    document.getElementById('pdp-fs-prev').addEventListener('click', goPrev);
    document.getElementById('pdp-fs-next').addEventListener('click', goNext);

    return el;
  }

  function render() {
    const img     = document.getElementById('pdp-fs-img');
    const counter = document.getElementById('pdp-fs-counter');
    const prev    = document.getElementById('pdp-fs-prev');
    const next    = document.getElementById('pdp-fs-next');
    const dots    = document.getElementById('pdp-fs-dots');
    if (!img) return;

    img.classList.add('pdp-fs-fade');
    setTimeout(() => {
      img.src = _images[_index] || '';
      img.classList.remove('pdp-fs-fade');
    }, 140);

    counter.textContent = `${_index + 1} / ${_images.length}`;
    prev.disabled = _index === 0;
    next.disabled = _index === _images.length - 1;

    dots.innerHTML = _images.length > 1
      ? _images.map((_, i) =>
          `<button class="pdp-fs-dot ${i === _index ? 'is-active' : ''}" onclick="window._pdpFsGoto(${i})" aria-label="Image ${i+1}"></button>`
        ).join('')
      : '';
  }

  function goPrev() { if (_index > 0) { _index--; render(); } }
  function goNext() { if (_index < _images.length - 1) { _index++; render(); } }
  function closePdpFullscreen() {
    const el = document.getElementById('pdp-fullscreen-lb');
    if (el) { el.classList.remove('is-open'); document.body.style.overflow = ''; }
  }

  window.openPdpFullscreen = function(startIndex = 0) {
    const product = products.find(p => p.id === state.productId);
    if (!product) return;

    const slides = getProductSlides(product, state.selectedColor, state.selectedModel)
      .filter(s => s.type === 'image');
    _images = slides.map(s => s.url);
    if (!_images.length) return;

    _index = Math.min(startIndex, _images.length - 1);

    const el = getOrCreate();
    render();
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  window._pdpFsGoto = function(idx) { _index = idx; render(); };

  document.addEventListener('keydown', (e) => {
    const el = document.getElementById('pdp-fullscreen-lb');
    if (!el || !el.classList.contains('is-open')) return;
    if (e.key === 'ArrowLeft')  goPrev();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'Escape')     closePdpFullscreen();
  });
})();

// ==========================================================================
// DRAWER IMAGE LIGHTBOX
// ==========================================================================

(function initDrawerLightbox() {
  let _images = [];
  let _index  = 0;

  function render() {
    const img     = document.getElementById('img-lightbox-img');
    const counter = document.getElementById('img-lightbox-counter');
    const prev    = document.getElementById('img-lightbox-prev');
    const next    = document.getElementById('img-lightbox-next');
    const dotsEl  = document.getElementById('img-lightbox-dots');
    if (!img) return;

    // Fade transition
    img.classList.add('fade-out');
    setTimeout(() => {
      img.src = _images[_index] || '';
      img.classList.remove('fade-out');
    }, 150);

    counter.textContent = `${_index + 1} / ${_images.length}`;
    prev.disabled = (_index === 0);
    next.disabled = (_index === _images.length - 1);

    // Dots
    dotsEl.innerHTML = _images.length > 1
      ? _images.map((_, i) =>
          `<button class="img-lightbox-dot ${i === _index ? 'is-active' : ''}" aria-label="Image ${i+1}" onclick="window._lightboxGoto(${i})"></button>`
        ).join('')
      : '';
  }

  window.openProductImageLightbox = function(startIndex = 0, isFromDrawer = false) {
    const prodId = isFromDrawer ? state.drawerProductId : state.productId;
    const color = isFromDrawer ? state.drawerSelectedColor : state.selectedColor;
    const model = isFromDrawer ? state.drawerSelectedModel : state.selectedModel;

    const product = products.find(p => p.id === prodId);
    if (!product) return;

    const slides = getProductSlides(product, color, model)
      .filter(s => s.type === 'image');
    _images = slides.map(s => s.url);
    if (!_images.length) return; // nothing to show

    _index = Math.min(startIndex, _images.length - 1);
    render();

    const lb = document.getElementById('img-lightbox');
    if (lb) lb.classList.add('is-open');
  };

  window.openDrawerImageLightbox = function(startIndex = 0) {
    window.openProductImageLightbox(startIndex, true);
  };

  window.closeDrawerImageLightbox = function() {
    const lb = document.getElementById('img-lightbox');
    if (lb) lb.classList.remove('is-open');
  };

  window._lightboxGoto = function(idx) {
    _index = idx;
    render();
  };

  // Wire up static buttons after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('img-lightbox-close');
    const prevBtn  = document.getElementById('img-lightbox-prev');
    const nextBtn  = document.getElementById('img-lightbox-next');
    const lb = document.getElementById('img-lightbox');

    if (closeBtn) closeBtn.addEventListener('click', window.closeDrawerImageLightbox);
    if (prevBtn)  prevBtn.addEventListener('click',  () => { if (_index > 0)              { _index--; render(); } });
    if (nextBtn)  nextBtn.addEventListener('click',  () => { if (_index < _images.length-1) { _index++; render(); } });

    // Close lightbox on backdrop click
    if (lb) {
      lb.addEventListener('click', (e) => {
        if (e.target === lb) window.closeDrawerImageLightbox();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const lb = document.getElementById('img-lightbox');
      if (!lb || !lb.classList.contains('is-open')) return;
      if (e.key === 'ArrowLeft'  && _index > 0)               { _index--; render(); }
      if (e.key === 'ArrowRight' && _index < _images.length-1){ _index++; render(); }
      if (e.key === 'Escape') window.closeDrawerImageLightbox();
    });
  });
})();

window.selectDrawerColor = function(color) {
  state.drawerSelectedColor = color;
  renderDrawerBody();
};

window.selectDrawerModel = function(model) {
  state.drawerSelectedModel = model;

  const product = products.find(p => p.id === state.drawerProductId);
  if (product) {
    const availableColors = getProductColorsForModel(product, model);
    if (availableColors.length === 1) {
      const cleanColor = getColorNameAndHex(availableColors[0]).name;
      state.drawerSelectedColor = cleanColor;
    } else {
      const cleanAvailableColors = availableColors.map(c => getColorNameAndHex(c).name.toLowerCase());
      if (state.drawerSelectedColor && !cleanAvailableColors.includes(state.drawerSelectedColor.toLowerCase())) {
        state.drawerSelectedColor = "";
      }
    }
  }

  renderDrawerBody();
};

window.changeDrawerQty = function(delta) {
  state.drawerQty = Math.max(1, state.drawerQty + delta);
  const valSpan = document.getElementById("drawer-qty-val");
  if (valSpan) {
    valSpan.textContent = state.drawerQty;
  }
};

window.submitDrawerAddToCart = function(isBuyNow = false) {
  const product = products.find(p => p.id === state.drawerProductId);
  if (!product) return;

  const isMobile = isMobileProduct(product);
  const models = normalizeProductModels(product);

  // Validate inputs
  if (isMobile && models.length > 0 && !state.drawerSelectedModel) {
    showToast("Please select a model first");
    return;
  }
  if (product.colors && product.colors.length > 0 && !state.drawerSelectedColor) {
    showToast("Please select a color first");
    return;
  }

  // Sync to checkout/order state
  state.selectedColor = state.drawerSelectedColor;
  state.selectedModel = state.drawerSelectedModel;
  state.productQty = state.drawerQty;

  // Add to cart
  addToCart(state.drawerProductId, state.drawerQty);

  // Close
  window.closeOptionsDrawer();

  // If Buy Now, skip the cart page and continue directly to checkout.
  if (isBuyNow) {
    setView('checkout');
  }
};

// Bind buttons inside drawer
document.getElementById("drawer-add-to-cart-btn")?.addEventListener("click", () => {
  window.submitDrawerAddToCart(false);
});

document.getElementById("drawer-buy-now-btn")?.addEventListener("click", () => {
  window.submitDrawerAddToCart(true);
});

// Bind close events
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-close-drawer]")) {
    window.closeOptionsDrawer();
  }
});

// Sticky header scroll effect to make header transparent at the top
const handleHeaderScroll = () => {
  const desktopHeader = document.querySelector(".desktop-header");
  if (desktopHeader) {
    if (window.scrollY > 10) {
      desktopHeader.classList.add("is-scrolled");
    } else {
      desktopHeader.classList.remove("is-scrolled");
    }
  }
};
window.addEventListener("scroll", handleHeaderScroll);
document.addEventListener("DOMContentLoaded", handleHeaderScroll);
handleHeaderScroll();

// Recent Purchase Popups Manager
const recentPurchasePopupManager = {
  names: ["Rahul", "Aarav", "Priya", "Amit", "Neha", "Vikram", "Sneha", "Anil", "Deepika", "Rajesh", "Karan", "Simran", "Rohan", "Tanvi", "Siddharth"],
  cities: ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Goa"],
  autoCloseTimeout: null,
  nextPopupTimeout: null,
  initialized: false,
  
  init() {
    if (this.initialized) return;
    this.initialized = true;

    // Create the container element dynamically (only once)
    if (!document.getElementById("purchase-notification-widget")) {
      const popupEl = document.createElement("div");
      popupEl.id = "purchase-notification-widget";
      popupEl.className = "purchase-notification";
      document.body.appendChild(popupEl);
    }
    
    // Show the first purchase notification two minutes after page load.
    this.scheduleNext(2 * 60 * 1000);
  },

  scheduleNext(ms) {
    if (this.nextPopupTimeout) {
      clearTimeout(this.nextPopupTimeout);
    }
    this.nextPopupTimeout = setTimeout(() => {
      this.showRandomPurchase();
    }, ms);
  },
  
  getProducts() {
    if (typeof products !== "undefined" && Array.isArray(products) && products.length > 0) {
      return products;
    }
    if (typeof defaultProducts !== "undefined" && Array.isArray(defaultProducts) && defaultProducts.length > 0) {
      return defaultProducts;
    }
    return null;
  },
  
  showRandomPurchase() {
    const popupEl = document.getElementById("purchase-notification-widget");
    if (!popupEl) return;
    
    const productList = this.getProducts();
    if (!productList) {
      this.scheduleNext(5000); // Retry in 5 seconds
      return;
    }
    
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
      this.autoCloseTimeout = null;
    }
    popupEl.classList.remove("is-active");
    
    const randomProduct = productList[Math.floor(Math.random() * productList.length)];
    const name = this.names[Math.floor(Math.random() * this.names.length)];
    const city = this.cities[Math.floor(Math.random() * this.cities.length)];
    
    const randomMinutes = Math.floor(Math.random() * 29) + 31;
    let timeString = `${randomMinutes} min ago`;
    if (Math.random() > 0.7) {
      const randomHours = Math.floor(Math.random() * 3) + 1;
      timeString = `${randomHours} hour${randomHours > 1 ? 's' : ''} ago`;
    }
    
    const imgSrc = randomProduct.image || "assets/dell-laptop.png";
    
    popupEl.dataset.openProduct = randomProduct.id;
    popupEl.innerHTML = `
      <div class="purchase-notification-image-wrap">
        <img class="purchase-notification-image" src="${imgSrc}" alt="${randomProduct.name}" onerror="this.src='assets/dell-laptop.png'">
      </div>
      <div class="purchase-notification-content">
        <p class="purchase-notification-user"><strong>${name}</strong> from <span class="city">${city}</span></p>
        <p class="purchase-notification-label">Purchased</p>
        <p class="purchase-notification-product">${randomProduct.name}</p>
        <p class="purchase-notification-time">${timeString}</p>
      </div>
      <button class="purchase-notification-close" onclick="event.stopPropagation(); recentPurchasePopupManager.close(true)" aria-label="Close notification">&times;</button>
      <div class="purchase-notification-progress"></div>
    `;
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        popupEl.classList.add("is-active");
      });
    });
    
    // Auto-close after 30 seconds
    this.autoCloseTimeout = setTimeout(() => {
      this.close(false);
    }, 30000);
  },
  
  close(byUser = false) {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
      this.autoCloseTimeout = null;
    }
    const popupEl = document.getElementById("purchase-notification-widget");
    if (popupEl) {
      popupEl.classList.remove("is-active");
      setTimeout(() => {
        popupEl.style.animation = "none";
        void popupEl.offsetWidth;
        popupEl.style.animation = "";
      }, 450);
    }
    
    // Repeat purchase notifications 30 minutes after the previous one closes.
    this.scheduleNext(30 * 60 * 1000);
  }
};

// Start the popup manager on load
window.recentPurchasePopupManager = recentPurchasePopupManager;

// Search Suggestions Dropdown Manager
const searchSuggestionsManager = {
  dropdownEl: null,
  activeInput: null,
  
  // List of pre-defined models to guarantee matches even if DB is loading
  commonModels: [
    "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
    "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
    "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
    "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13 Mini", "iPhone 13",
    "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12 Mini", "iPhone 12",
    "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11"
  ],

  init() {
    // Listen for focus, input, and click events on any data-search-input
    document.addEventListener("focusin", (e) => {
      if (e.target.matches("[data-search-input]")) {
        this.activeInput = e.target;
        this.showSuggestions();
      }
    });

    document.addEventListener("input", (e) => {
      if (e.target.matches("[data-search-input]")) {
        this.activeInput = e.target;
        this.showSuggestions();
      }
    });

    // Dismiss when clicking outside
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-search-input]")) {
        this.activeInput = e.target;
        this.showSuggestions();
        return;
      }
      if (this.dropdownEl && !e.target.closest("#search-suggestions-dropdown")) {
        this.hide();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.target.matches("[data-search-input]") && e.key === "Enter") {
        this.hide();
      }
    });

    // Listen for window resize/scroll to reposition
    window.addEventListener("resize", () => this.reposition());
    window.addEventListener("scroll", () => this.reposition(), true);
  },

  getAllModels() {
    const list = new Set(this.commonModels);
    
    // Add models from the products database
    if (typeof products !== "undefined" && Array.isArray(products)) {
      products.forEach(p => {
        if (p.models && Array.isArray(p.models)) {
          p.models.forEach(m => {
            if (typeof m === "string" && m.trim().length > 0) {
              list.add(m.trim());
            }
          });
        }
      });
    }
    
    // Add models from getIphoneModels()
    if (typeof getIphoneModels === "function") {
      const dbModels = getIphoneModels();
      if (Array.isArray(dbModels)) {
        dbModels.forEach(m => {
          if (m && m.name) {
            list.add(m.name.trim());
          }
        });
      }
    }
    
    return Array.from(list);
  },

  getSuggestionsList() {
    const results = [];

    // 1. Actual product names from products array
    if (typeof products !== "undefined" && Array.isArray(products)) {
      products.forEach(p => {
        results.push({
          type: "product",
          id: p.id,
          display: p.name,
          search: p.name,
          image: p.image || null,
          price: p.price || null,
          category: p.category || null
        });
      });
    }

    // 2. iPhone model quick searches
    this.getAllModels().forEach(m => {
      results.push({
        type: "model",
        display: `${m} Cover`,
        search: m,
        image: null,
        price: null,
        category: "Model Search"
      });
    });

    // 3. Generic style quick searches
    ["Transparent", "Silicone", "Leather", "Rugged", "Clear"].forEach(style => {
      results.push({
        type: "style",
        display: `${style} Cover`,
        search: style,
        image: null,
        price: null,
        category: "Style Search"
      });
    });

    return results;
  },

  highlightMatch(text, query) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return text.slice(0, idx)
      + `<strong>${text.slice(idx, idx + query.length)}</strong>`
      + text.slice(idx + query.length);
  },

  showSuggestions() {
    const activeEl = document.activeElement;
    if (activeEl && activeEl.matches("[data-search-input]")) {
      this.activeInput = activeEl;
    }
    if (!this.activeInput) return;

    const query = this.activeInput.value.trim();
    if (query.length === 0) { this.hide(); return; }

    const q = query.toLowerCase();
    const allSuggestions = this.getSuggestionsList();

    // Products first (exact name match), then model/style suggestions
    const productMatches = allSuggestions.filter(item =>
      item.type === "product" &&
      (item.display.toLowerCase().includes(q) || item.search.toLowerCase().includes(q))
    ).slice(0, 6);

    const otherMatches = allSuggestions.filter(item =>
      item.type !== "product" &&
      (item.display.toLowerCase().includes(q) || item.search.toLowerCase().includes(q))
    ).slice(0, 3);

    const matches = [...productMatches, ...otherMatches];

    if (matches.length === 0) { this.hide(); return; }

    if (!this.dropdownEl) {
      this.dropdownEl = document.createElement("div");
      this.dropdownEl.id = "search-suggestions-dropdown";
      this.dropdownEl.className = "search-suggestions-dropdown";
      document.body.appendChild(this.dropdownEl);
    }

    this.dropdownEl.innerHTML = [
      ...matches.map((item, idx) => {
        const isProduct = item.type === "product";
        const imgHtml = isProduct && item.image
          ? `<img class="suggestion-product-img" src="${item.image}" alt="" onerror="this.style.display='none'">`
          : `<span class="suggestion-icon-wrap">${icon("search")}</span>`;
        const priceHtml = isProduct && item.price
          ? `<span class="suggestion-price">₹${Number(item.price).toLocaleString("en-IN")}</span>` : "";
        const catHtml = item.category
          ? `<span class="suggestion-category">${item.category}</span>` : "";
        return `
          <div class="search-suggestion-item ${isProduct ? 'is-product' : 'is-quick'}" 
               data-search-term="${item.search.replace(/"/g, '&quot;')}"
               data-product-id="${item.id || ''}"
               data-idx="${idx}">
            <span class="suggestion-thumb">${imgHtml}</span>
            <span class="suggestion-body">
              <span class="suggestion-text">${this.highlightMatch(item.display, query)}</span>
              <span class="suggestion-meta">${catHtml}${priceHtml}</span>
            </span>
          </div>`;
      }),
      `<div class="search-suggestion-all" data-search-term="${query.replace(/"/g, '&quot;')}">
        ${icon("search")} See all results for <strong>"${query}"</strong>
      </div>`
    ].join("");

    this.dropdownEl.querySelectorAll(".search-suggestion-item, .search-suggestion-all").forEach(el => {
      el.addEventListener("mousedown", (e) => {
        e.preventDefault();
        const productId = el.getAttribute("data-product-id");
        const searchTerm = el.getAttribute("data-search-term");
        if (productId) {
          this.hide();
          state.productId = productId;
          clearSearchInputs();
          renderAll();
          setView("product");
        } else {
          this.selectSuggestion(searchTerm);
        }
      });
    });

    this.reposition();
    this.dropdownEl.classList.add("is-visible");
  },

  reposition() {
    if (!this.dropdownEl || !this.activeInput) return;
    
    const rect = this.activeInput.getBoundingClientRect();
    
    // Style position right below the input element
    this.dropdownEl.style.top = `${rect.bottom + window.scrollY + 6}px`;
    this.dropdownEl.style.left = `${rect.left + window.scrollX}px`;
    this.dropdownEl.style.width = `${rect.width}px`;
  },

  selectSuggestion(searchTerm) {
    state.search = searchTerm;
    document.querySelectorAll("[data-search-input]").forEach(input => {
      input.value = searchTerm;
    });
    this.hide();
    setView("search");
    renderAll();
  },

  hide() {
    if (this.dropdownEl) {
      this.dropdownEl.classList.remove("is-visible");
    }
  }
};

window.searchSuggestionsManager = searchSuggestionsManager;

if (document.readyState === "complete" || document.readyState === "interactive") {
  recentPurchasePopupManager.init();
  searchSuggestionsManager.init();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    recentPurchasePopupManager.init();
    searchSuggestionsManager.init();
  });
}
