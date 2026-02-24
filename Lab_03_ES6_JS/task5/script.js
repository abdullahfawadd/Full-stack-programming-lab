let productMap = new Map();
productMap.set('P001', { name: 'Laptop Pro', category: 'Electronics', price: 1299.99 });
productMap.set('P002', { name: 'Wireless Earbuds', category: 'Audio', price: 79.99 });
productMap.set('P003', { name: 'Standing Desk', category: 'Furniture', price: 449.00 });
productMap.set('P004', { name: 'Mechanical Keyboard', category: 'Peripherals', price: 129.99 });
productMap.set('P005', { name: 'USB-C Monitor', category: 'Displays', price: 599.99 });

function renderProducts() {
  const productStat = document.getElementById('productStat');
  productStat.textContent = `Total products: ${productMap.size}`;

  const tbody = document.querySelector('#productTable tbody');
  tbody.innerHTML = '';

  for (const [id, product] of productMap) {
    tbody.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td><button class="btn-danger" data-id="${id}">Delete</button></td>
      </tr>
    `;
  }

  const deleteButtons = document.querySelectorAll('.btn-danger');
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      deleteProduct(btn.getAttribute('data-id'));
    });
  });
}

function deleteProduct(id) {
  productMap.delete(id);
  renderProducts();
}

function searchProduct() {
  const input = document.getElementById('searchInput');
  const searchResult = document.getElementById('searchResult');
  const value = input.value.trim();

  if (!value) {
    searchResult.innerHTML = '<p class="msg-error">Please enter a product ID.</p>';
    return;
  }

  if (productMap.has(value)) {
    const product = productMap.get(value);
    searchResult.innerHTML = `
      <div class="result-card">
        <div>
          <div class="result-card-label">Name</div>
          <div class="result-card-value">${product.name}</div>
        </div>
        <div>
          <div class="result-card-label">Category</div>
          <div class="result-card-value">${product.category}</div>
        </div>
        <div>
          <div class="result-card-label">Price</div>
          <div class="result-card-value">$${product.price.toFixed(2)}</div>
        </div>
      </div>
    `;
  } else {
    searchResult.innerHTML = '<p class="msg-error">No product found.</p>';
  }
}

document.getElementById('searchBtn').addEventListener('click', searchProduct);

renderProducts();
