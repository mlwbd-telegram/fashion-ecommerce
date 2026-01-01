// Global Cart Management for EKETAR
let cart = [];

// Initialize cart on page load
function initCart() {
  try {
    const savedCart = localStorage.getItem('eketar_cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    } else {
      cart = [];
    }
  } catch (error) {
    cart = [];
  }
  updateCartCount();
}

// Get current cart
function getCart() {
  return cart;
}

// Save cart to localStorage
function saveCart(newCart) {
  try {
    cart = newCart;
    localStorage.setItem('eketar_cart', JSON.stringify(cart));
    updateCartCount();
  } catch (error) {
    console.warn('Failed to save cart to localStorage');
  }
}

// Add product to cart
function addToCart(product) {
  const existingItem = cart.find(item => 
    item.id === product.id && item.size === product.size
  );
  
  if (existingItem) {
    existingItem.quantity += product.quantity || 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      size: product.size,
      quantity: product.quantity || 1,
      customName: product.customName || '',
      customNumber: product.customNumber || ''
    });
  }
  
  saveCart(cart);
}

// Remove item from cart
function removeFromCart(productId, size) {
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart(cart);
}

// Update item quantity
function updateQuantity(productId, size, newQty) {
  if (newQty <= 0) {
    removeFromCart(productId, size);
    return;
  }
  
  const item = cart.find(item => item.id === productId && item.size === size);
  if (item) {
    item.quantity = newQty;
    saveCart(cart);
  }
}

// Clear entire cart
function clearCart() {
  cart = [];
  saveCart(cart);
}

// Update cart count display
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.querySelector('.cart-count');
  
  if (cartCountElement) {
    if (count > 0) {
      cartCountElement.textContent = count;
      cartCountElement.style.display = 'block';
    } else {
      cartCountElement.style.display = 'none';
    }
  }
}

// Format price with currency
function formatPrice(price) {
  return '৳' + price.toLocaleString();
}

// Initialize cart when script loads
initCart();