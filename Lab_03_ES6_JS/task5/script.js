/* ── Task 5: Product Catalog with Map — Production JS ── */

// ── State (Map) ──
const productMap = new Map();
const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
];
const emojis = ['💻', '🎧', '🪑', '⌨️', '🖥️', '📱', '⌚', '📷', '🖱️', '💡'];

// Seed data
const seed = [
  { id: 'P001', name: 'Laptop Pro', category: 'Electronics', price: 1299.99 },
  { id: 'P002', name: 'Wireless Earbuds', category: 'Audio', price: 79.99 },
  { id: 'P003', name: 'Standing Desk', category: 'Furniture', price: 449.00 },
  { id: 'P004', name: 'Mechanical Keyboard', category: 'Peripherals', price: 129.99 },
  { id: 'P005', name: 'USB-C Monitor', category: 'Displays', price: 599.99 },
];
seed.forEach((p, i) => productMap.set(p.id, { ...p, emoji: emojis[i], gradient: gradients[i] }));

let editingId = null;
let deletingId = null;
let activeFilter = 'all';

// ── DOM ──
const productGrid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');
const filterBar = document.getElementById('filterBar');
const searchInput = document.getElementById('searchInput');
const totalProductsEl = document.getElementById('totalProducts');
const totalCategoriesEl = document.getElementById('totalCategories');
const avgPriceEl = document.getElementById('avgPrice');
const totalValueEl = document.getElementById('totalValue');

const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const productForm = document.getElementById('productForm');
const pidInput = document.getElementById('pidInput');
const pnameInput = document.getElementById('pnameInput');
const pcatInput = document.getElementById('pcatInput');
const ppriceInput = document.getElementById('ppriceInput');
const submitBtn = document.getElementById('submitBtn');

const deleteOverlay = document.getElementById('deleteOverlay');
const deleteName = document.getElementById('deleteName');

// ── Render ──
function render() {
  const search = searchInput.value.toLowerCase();
  const products = [...productMap.values()].filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search) || p.id.toLowerCase().includes(search) || p.category.toLowerCase().includes(search);
    const matchCat = activeFilter === 'all' || p.category === activeFilter;
    return matchSearch && matchCat;
  });

  // Stats
  const allProducts = [...productMap.values()];
  totalProductsEl.textContent = productMap.size;
  const cats = new Set(allProducts.map(p => p.category));
  totalCategoriesEl.textContent = cats.size;
  const avg = allProducts.length ? allProducts.reduce((s, p) => s + p.price, 0) / allProducts.length : 0;
  avgPriceEl.textContent = `$${avg.toFixed(0)}`;
  const total = allProducts.reduce((s, p) => s + p.price, 0);
  totalValueEl.textContent = `$${total.toFixed(0)}`;

  // Filter chips
  const categories = ['all', ...new Set(allProducts.map(p => p.category))];
  filterBar.innerHTML = categories.map(c =>
    `<button class="filter-chip ${c === activeFilter ? 'active' : ''}" data-cat="${c}">${c === 'all' ? 'All' : c}</button>`
  ).join('');

  // Grid
  if (products.length === 0) {
    productGrid.innerHTML = '';
    productGrid.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    productGrid.style.display = 'grid';
    productGrid.innerHTML = products.map((p, i) => `
      <div class="product-card animate-in" style="animation-delay:${i * 0.05}s">
        <div class="product-card-img" style="background:${p.gradient || gradients[i % gradients.length]}">
          <span style="font-size:48px">${p.emoji || emojis[i % emojis.length]}</span>
          <div class="product-card-id">${p.id}</div>
        </div>
        <div class="product-card-body">
          <div class="product-card-cat">${p.category}</div>
          <div class="product-card-name">${p.name}</div>
          <div class="product-card-price">$${p.price.toFixed(2)}</div>
          <div class="product-card-actions">
            <button class="btn-icon edit" data-id="${p.id}" title="Edit">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5a1.76 1.76 0 012.5 2.5L5.5 13.5 2 14l.5-3.5 9-9z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="btn-icon delete" data-id="${p.id}" title="Delete">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M6 4V3a1 1 0 011-1h2a1 1 0 011 1v1M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// ── Modal ──
function openModal(edit = false, product = null) {
  editingId = edit && product ? product.id : null;
  modalTitle.textContent = edit ? 'Edit Product' : 'Add Product';
  submitBtn.textContent = edit ? 'Save Changes' : 'Add Product';
  pidInput.value = product ? product.id : '';
  pnameInput.value = product ? product.name : '';
  pcatInput.value = product ? product.category : '';
  ppriceInput.value = product ? product.price : '';
  pidInput.disabled = edit;
  modalOverlay.classList.add('active');
  setTimeout(() => (edit ? pnameInput : pidInput).focus(), 200);
}

function closeModal() { modalOverlay.classList.remove('active'); editingId = null; productForm.reset(); pidInput.disabled = false; }
function openDeleteModal(id) { deletingId = id; deleteName.textContent = productMap.get(id)?.name || ''; deleteOverlay.classList.add('active'); }
function closeDeleteModal() { deleteOverlay.classList.remove('active'); deletingId = null; }

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ── Events ──
document.getElementById('addBtn').addEventListener('click', () => openModal());
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('cancelBtn').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

document.getElementById('deleteClose').addEventListener('click', closeDeleteModal);
document.getElementById('deleteCancelBtn').addEventListener('click', closeDeleteModal);
deleteOverlay.addEventListener('click', e => { if (e.target === deleteOverlay) closeDeleteModal(); });

document.getElementById('deleteConfirmBtn').addEventListener('click', () => {
  productMap.delete(deletingId);
  closeDeleteModal(); render(); showToast('Product deleted');
});

productForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = pidInput.value.trim();
  const name = pnameInput.value.trim();
  const category = pcatInput.value.trim();
  const price = parseFloat(ppriceInput.value);
  if (!id || !name || !category || isNaN(price)) return;

  if (editingId) {
    const existing = productMap.get(editingId);
    productMap.set(editingId, { ...existing, name, category, price });
    showToast('Product updated');
  } else {
    if (productMap.has(id)) { showToast('Product ID already exists'); return; }
    const idx = productMap.size;
    productMap.set(id, { id, name, category, price, emoji: emojis[idx % emojis.length], gradient: gradients[idx % gradients.length] });
    showToast('Product added');
  }
  closeModal(); render();
});

productGrid.addEventListener('click', e => {
  const editBtn = e.target.closest('.btn-icon.edit');
  const deleteBtn = e.target.closest('.btn-icon.delete');
  if (editBtn) { const p = productMap.get(editBtn.dataset.id); if (p) openModal(true, p); }
  if (deleteBtn) openDeleteModal(deleteBtn.dataset.id);
});

filterBar.addEventListener('click', e => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;
  activeFilter = chip.dataset.cat;
  render();
});

searchInput.addEventListener('input', render);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeDeleteModal(); }
});

// ── Init ──
render();
