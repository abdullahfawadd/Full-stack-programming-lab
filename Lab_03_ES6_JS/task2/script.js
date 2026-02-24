const initialProducts = [
  { name: 'Wireless Mouse', price: 29.99 },
  { name: 'Mechanical Keyboard', price: 89.99 },
  { name: 'USB-C Hub', price: 45.00 },
  { name: 'Monitor Stand', price: 34.50 }
];

let cart = [...initialProducts];

function addToCart(...items) {
  cart.push(...items);
}

function renderCart() {
  const [firstItem, ...remaining] = cart;

  const firstItemContent = document.querySelector('#firstItemCard .card-content');
  firstItemContent.innerHTML = `
    <p class="item-detail"><span>Name:</span> ${firstItem.name}</p>
    <p class="item-detail"><span>Price:</span> <span class="price">$${firstItem.price.toFixed(2)}</span></p>
  `;

  const remainingContent = document.querySelector('#remainingCard .card-content');
  if (remaining.length === 0) {
    remainingContent.innerHTML = '<p class="item-detail">No remaining items.</p>';
  } else {
    remainingContent.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${remaining.map(item => `
            <tr>
              <td>${item.name}</td>
              <td><span class="price">$${item.price.toFixed(2)}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  const summaryContent = document.querySelector('#summaryCard .card-content');
  summaryContent.innerHTML = `
    <p class="summary-text">Total items in cart: ${cart.length}</p>
  `;
}

document.getElementById('addBtn').addEventListener('click', () => {
  addToCart(
    { name: 'Webcam HD', price: 59.99 },
    { name: 'Desk Lamp', price: 24.99 }
  );
  renderCart();
});

renderCart();
