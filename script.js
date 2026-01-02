// EKETAR Cart Engine
// Global cart management system using localStorage

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', initCart);

/**
 * Initialize cart system
 */
function initCart() {
    let cart = localStorage.getItem('eketar_cart');
    if (!cart) {
        localStorage.setItem('eketar_cart', JSON.stringify([]));
    } else {
        try {
            JSON.parse(cart);
        } catch (e) {
            localStorage.setItem('eketar_cart', JSON.stringify([]));
        }
    }
    updateCartCountUI();
}

/**
 * Get current cart from localStorage
 * @returns {Array} Cart items array
 */
function getCart() {
    const cart = localStorage.getItem('eketar_cart');
    if (!cart) {
        return [];
    }
    try {
        return JSON.parse(cart);
    } catch (e) {
        console.error('Error parsing cart data:', e);
        localStorage.setItem('eketar_cart', JSON.stringify([]));
        return [];
    }
}

/**
 * Save cart to localStorage
 * @param {Array} cart - Cart items array
 */
function saveCart(cart) {
    try {
        localStorage.setItem('eketar_cart', JSON.stringify(cart));
        updateCartCountUI();
    } catch (e) {
        console.error('Error saving cart:', e);
    }
}

/**
 * Add product to cart
 * @param {Object} product - Product object with id, name, price, etc.
 */
function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id && item.size === product.size);
    
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            size: product.size,
            quantity: product.quantity || 1,
            customName: product.customName || '',
            customNumber: product.customNumber || ''
        };
        cart.push(newItem);
    }
    
    saveCart(cart);
}

/**
 * Remove item from cart
 * @param {string|number} id - Product ID
 * @param {string} size - Product size
 */
function removeFromCart(id, size) {
    const cart = getCart();
    const updatedCart = cart.filter(item => !(item.id === id && item.size === size));
    saveCart(updatedCart);
}

/**
 * Update item quantity in cart
 * @param {string|number} id - Product ID
 * @param {string} size - Product size
 * @param {number} quantity - New quantity
 */
function updateQuantity(id, size, quantity) {
    if (quantity < 1) quantity = 1;
    
    const cart = getCart();
    const item = cart.find(item => item.id === id && item.size === size);
    
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
}

/**
 * Clear entire cart
 */
function clearCart() {
    localStorage.setItem('eketar_cart', JSON.stringify([]));
    updateCartCountUI();
}

/**
 * Get total cart count (sum of all quantities)
 * @returns {number} Total items in cart
 */
function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Update cart count UI elements
 */
function updateCartCountUI() {
    const count = getCartCount();
    const cartCountElements = document.querySelectorAll('.navbar__cart-count');
    
    cartCountElements.forEach(element => {
        if (count > 0) {
            element.textContent = count;
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}