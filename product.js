document.addEventListener('DOMContentLoaded', () => {
  console.log('product.js loaded');

  const sizeButtons = document.querySelectorAll('.size-btn');

  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const addToCartBtn = document.querySelector('.cta-button');

  if (!addToCartBtn) return;

  addToCartBtn.addEventListener('click', () => {
    const activeSize = document.querySelector('.size-btn.active');

    if (!activeSize) {
      alert('Please select a size');
      return;
    }

    const size = activeSize.textContent.trim();
    const quantity = parseInt(document.querySelector('.quantity-input').value) || 1;

    const product = {
      id: new URLSearchParams(window.location.search).get('id') || '1',
      name: document.querySelector('.product-title').textContent,
      price: parseInt(document.querySelector('.product-price').textContent.replace(/[^\d]/g, '')),
      size: size,
      quantity: quantity,
      customName: document.querySelectorAll('.custom-input')[0]?.value || '',
      customNumber: document.querySelectorAll('.custom-input')[1]?.value || ''
    };

    addToCart(product);
    window.location.href = 'cart.html';
  });
});