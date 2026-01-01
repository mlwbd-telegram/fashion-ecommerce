document.addEventListener('DOMContentLoaded', function() {
  // Handle size selection
  const sizeButtons = document.querySelectorAll('.size-btn');
  sizeButtons.forEach(button => {
    button.addEventListener('click', function() {
      sizeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Handle add to cart
  const addToCartButton = document.querySelector('.cta-button');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', function() {
      // Get product data from DOM
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
      
      const name = document.querySelector('.product-title')?.textContent;
      const priceText = document.querySelector('.product-price')?.textContent;
      const price = parseInt(priceText?.replace(/[^\d]/g, '')) || 0;
      
      const selectedSize = document.querySelector('.size-btn.active');
      if (!selectedSize) {
        alert('Please select a size');
        return;
      }
      
      const size = selectedSize.textContent;
      const quantityInput = document.querySelector('.quantity-input');
      const quantity = parseInt(quantityInput?.value) || 1;
      
      if (quantity < 1) {
        alert('Quantity must be at least 1');
        return;
      }
      
      // Get customization inputs
      const customInputs = document.querySelectorAll('.custom-input');
      const customName = customInputs[0] ? customInputs[0].value : '';
      const customNumber = customInputs[1] ? customInputs[1].value : '';
      
      // Create product object
      const product = {
        id: productId,
        name: name,
        price: price,
        size: size,
        quantity: quantity,
        customName: customName,
        customNumber: customNumber
      };
      
      // Add to cart
      addToCart(product);
      
      // Redirect to cart
      window.location.href = 'cart.html';
    });
  }
});