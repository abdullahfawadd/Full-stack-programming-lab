/* ═══════════════════════════════════════════════════
   Task 2 — Online Shopping Cart  |  Production JS
   ES6: Rest, Spread, Destructuring
   ═══════════════════════════════════════════════════ */

// ── SVG Icons per category (professional, no emojis) ──
const ICONS = {
  Peripherals: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  Accessories: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/></svg>`,
  Furniture: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3"/><path d="M2 11v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-2-2H4a2 2 0 00-2 2z"/><line x1="6" y1="18" x2="6" y2="21"/><line x1="18" y1="18" x2="18" y2="21"/></svg>`,
  Electronics: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
  Audio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z"/></svg>`
};

const CART_ICON_SM = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>`;

// ── Product data ──
const initialProducts = [
  { id: 1, name: 'Wireless Mouse',        price: 29.99,  category: 'Peripherals' },
  { id: 2, name: 'Mechanical Keyboard',   price: 89.99,  category: 'Peripherals' },
  { id: 3, name: 'USB-C Hub',             price: 45.00,  category: 'Accessories' },
  { id: 4, name: 'Monitor Stand',         price: 34.50,  category: 'Furniture' },
  { id: 5, name: 'Webcam HD',             price: 59.99,  category: 'Electronics' },
  { id: 6, name: 'Desk Lamp',             price: 24.99,  category: 'Furniture' },
  { id: 7, name: 'Laptop Sleeve',         price: 19.99,  category: 'Accessories' },
  { id: 8, name: 'AirPods Pro',           price: 249.00, category: 'Audio' },
];

// Spread to clone catalog
const products = [...initialProducts];

let cart = [];

// ── DOM refs ──
const productGrid  = document.getElementById('productGrid');
const itemCountEl  = document.getElementById('itemCount');
const cartBadge    = document.getElementById('cartBadge');
const cartList     = document.getElementById('cartList');
const cartEmptyEl  = document.getElementById('cartEmpty');
const cartFooter   = document.getElementById('cartFooter');
const filterChips  = document.getElementById('filterChips');

let activeFilter = 'all';

// ── Build filter chips ──
function buildFilters() {
  const cats = [...new Set(products.map(p => p.category))];
  filterChips.innerHTML = `<button class="chip active" data-cat="all">All</button>` +
    cats.map(c => `<button class="chip" data-cat="${c}">${c}</button>`).join('');
}

// ── Render products ──
function renderProducts() {
  const filtered = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

  itemCountEl.textContent = `${filtered.length} item${filtered.length !== 1 ? 's' : ''}`;

  productGrid.innerHTML = filtered.map(({ id, name, price, category }, i) => `
    <div class="product-card" data-cat="${category}" style="--d:${i * .04}s">
      <div class="product-visual">
        <span class="product-cat">${category}</span>
        ${ICONS[category] || ''}
      </div>
      <div class="product-body">
        <div class="product-name">${name}</div>
        <div class="product-price">$${price.toFixed(2)}</div>
      </div>
      <div class="product-actions">
        <button class="btn-add" data-id="${id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// ── Add to cart (Rest params) ──
function addToCart(...items) {
  items.forEach(item => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      // Spread to clone + add qty
      cart.push({ ...item, qty: 1 });
    }
  });
  renderCart();
  bumpBadge();
  showToast('Added to cart');
}

function updateQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== id);
  }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
  showToast('Removed from cart');
}

// ── Render cart ──
function renderCart() {
  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  cartBadge.textContent = totalItems;

  if (cart.length === 0) {
    cartList.innerHTML = '';
    cartEmptyEl.style.display = 'flex';
    cartFooter.style.display = 'none';
    return;
  }

  cartEmptyEl.style.display = 'none';
  cartFooter.style.display = 'block';

  // Destructuring in .map
  cartList.innerHTML = cart.map(({ id, name, price, category, qty }) => `
    <div class="cart-item">
      <div class="cart-item-icon" data-cat="${category}">${ICONS[category] || ''}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${name}</div>
        <div class="cart-item-meta">$${price.toFixed(2)} &times; ${qty}</div>
      </div>
      <div class="cart-item-right">
        <div class="cart-item-total">$${(price * qty).toFixed(2)}</div>
        <div style="display:flex;gap:4px;align-items:center">
          <div class="qty-row">
            <button class="qty-btn" data-id="${id}" data-act="dec">&minus;</button>
            <div class="qty-val">${qty}</div>
            <button class="qty-btn" data-id="${id}" data-act="inc">+</button>
          </div>
          <button class="remove-btn" data-id="${id}" title="Remove">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Destructuring in reduce
  const subtotal = cart.reduce((sum, { price, qty }) => sum + price * qty, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// ── Badge bounce ──
function bumpBadge() {
  cartBadge.classList.add('bump');
  setTimeout(() => cartBadge.classList.remove('bump'), 300);
}

// ── Toast ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ── Events: Product grid ──
productGrid.addEventListener('click', e => {
  const btn = e.target.closest('.btn-add');
  if (!btn) return;
  const id = parseInt(btn.dataset.id);
  const product = products.find(p => p.id === id);
  if (product) addToCart(product);
});

// ── Events: Filter chips ──
filterChips.addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  activeFilter = chip.dataset.cat;
  filterChips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  renderProducts();
});

// ── Events: Cart item actions ──
document.getElementById('cartList').addEventListener('click', e => {
  const qBtn = e.target.closest('.qty-btn');
  const rBtn = e.target.closest('.remove-btn');
  if (qBtn) {
    const id = parseInt(qBtn.dataset.id);
    updateQty(id, qBtn.dataset.act === 'inc' ? 1 : -1);
  }
  if (rBtn) {
    removeFromCart(parseInt(rBtn.dataset.id));
  }
});

// ── Clear cart ──
document.getElementById('clearBtn').addEventListener('click', () => {
  cart = [];
  renderCart();
  showToast('Cart cleared');
});

// ── Checkout ──
document.getElementById('checkoutBtn').addEventListener('click', () => {
  const { subtotal, tax, total } = (() => {
    const sub = cart.reduce((s, { price, qty }) => s + price * qty, 0);
    return { subtotal: sub, tax: sub * 0.05, total: sub * 1.05 };
  })();
  showToast(`Order placed! Total: $${total.toFixed(2)}`);
  cart = [];
  renderCart();
});

// ── Mobile cart toggle ──
const cartSidebar = document.getElementById('cartSidebar');
const cartToggle  = document.getElementById('cartToggle');

// Create overlay for mobile
const overlay = document.createElement('div');
overlay.className = 'cart-overlay';
document.body.appendChild(overlay);

function toggleMobileCart() {
  const isOpen = cartSidebar.classList.toggle('open');
  overlay.classList.toggle('show', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

cartToggle.addEventListener('click', () => {
  if (window.innerWidth <= 960) toggleMobileCart();
});
overlay.addEventListener('click', toggleMobileCart);

// ── Init ──
buildFilters();
renderProducts();
renderCart();

console.log('%c Task 2 — Shopping Cart ', 'background:#0071e3;color:#fff;padding:4px 12px;border-radius:4px;font-weight:600');
