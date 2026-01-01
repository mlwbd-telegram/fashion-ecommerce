// script.js
// Global Configuration
const CONFIG = {
  API_BASE_URL: 'http://localhost:3000/api', // Placeholder for future API integration
  VERSION: '1.0.0'
};

// Navigation Helpers
const Navigation = {
  /**
   * Navigate to a specific page
   * @param {string} page - Page name (e.g., 'shop', 'product', 'cart')
   * @param {Object} params - Query parameters
   */
  goToPage: function(page, params = {}) {
    let url = `/${page}.html`;
    const queryString = new URLSearchParams(params).toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    window.location.href = url;
  },

  /**
   * Get URL query parameters
   * @returns {Object} Query parameters as key-value pairs
   */
  getQueryParams: function() {
    const params = {};
    const queryString = window.location.search.substring(1);
    if (queryString) {
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        if (key) {
          params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        }
      });
    }
    return params;
  },

  /**
   * Get current page name from URL
   * @returns {string} Current page name
   */
  getCurrentPage: function() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page;
  }
};

// Cart Management (Placeholder)
const Cart = {
  /**
   * Get cart count from localStorage
   * @returns {number} Current cart count
   */
  getCartCount: function() {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      return cart.reduce((total, item) => total + (item.quantity || 1), 0);
    } catch (error) {
      console.error('Error getting cart count:', error);
      return 0;
    }
  },

  /**
   * Update cart badge display
   */
  updateCartBadge: function() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      const count = this.getCartCount();
      cartCountElement.textContent = count > 0 ? count : '';
      cartCountElement.style.display = count > 0 ? 'flex' : 'none';
    }
  },

  /**
   * Add item to cart (placeholder)
   * @param {Object} item - Product item to add
   */
  addItem: function(item) {
    try {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + (item.quantity || 1);
      } else {
        cart.push({
          ...item,
          quantity: item.quantity || 1
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      this.updateCartBadge();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  },

  /**
   * Get all cart items
   * @returns {Array} Array of cart items
   */
  getCartItems: function() {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (error) {
      console.error('Error getting cart items:', error);
      return [];
    }
  }
};

// Event Utilities
const Events = {
  /**
   * Safe query selector helper
   * @param {string} selector - CSS selector
   * @param {Element} parent - Parent element (optional)
   * @returns {Element|null} Found element or null
   */
  $: function(selector, parent = document) {
    try {
      return parent.querySelector(selector);
    } catch (error) {
      console.error('Query selector error:', error);
      return null;
    }
  },

  /**
   * Safe query selector all helper
   * @param {string} selector - CSS selector
   * @param {Element} parent - Parent element (optional)
   * @returns {NodeList} Found elements
   */
  $$: function(selector, parent = document) {
    try {
      return parent.querySelectorAll(selector);
    } catch (error) {
      console.error('Query selector all error:', error);
      return [];
    }
  },

  /**
   * Wait for DOM to be ready
   * @param {Function} callback - Function to execute when DOM is ready
   */
  onReady: function(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  },

  /**
   * Add event listener with error handling
   * @param {Element} element - Element to add listener to
   * @param {string} event - Event type
   * @param {Function} handler - Event handler function
   */
  addListener: function(element, event, handler) {
    if (element) {
      element.addEventListener(event, handler);
    }
  }
};

// Mobile Menu Toggle
const MobileMenu = {
  init: function() {
    const menuToggle = Events.$('.menu-toggle');
    const navLinks = Events.$('.nav-links');
    
    if (menuToggle && navLinks) {
      Events.addListener(menuToggle, 'click', function(e) {
        e.preventDefault();
        navLinks.classList.toggle('active');
      });

      // Close menu when clicking outside
      Events.addListener(document, 'click', function(e) {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('active');
        }
      });
    }
  }
};

// Form Validation Utilities
const Forms = {
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} Whether email is valid
   */
  isValidEmail: function(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate required field
   * @param {string} value - Value to validate
   * @returns {boolean} Whether value is not empty
   */
  isRequired: function(value) {
    return value && value.trim().length > 0;
  },

  /**
   * Show form error message
   * @param {Element} input - Input element
   * @param {string} message - Error message
   */
  showError: function(input, message) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = message;
    } else {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      errorDiv.style.color = 'var(--error-color)';
      errorDiv.style.fontSize = 'var(--font-size-sm)';
      errorDiv.style.marginTop = 'var(--spacing-xs)';
      input.parentNode.appendChild(errorDiv);
    }
  },

  /**
   * Clear form error message
   * @param {Element} input - Input element
   */
  clearError: function(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }
};

// Global Initialization
const GlobalInit = {
  init: function() {
    // Update cart badge on page load
    Cart.updateCartBadge();
    
    // Initialize mobile menu
    MobileMenu.init();
    
    // Add any other global initialization here
    console.log(`Fashion E-commerce Platform v${CONFIG.VERSION} initialized`);
  }
};

// Initialize when DOM is ready
Events.onReady(() => {
  GlobalInit.init();
});

// Export for use in other modules (if needed)
if (typeof window !== 'undefined') {
  window.FashionEcommerce = {
    CONFIG,
    Navigation,
    Cart,
    Events,
    Forms,
    MobileMenu
  };
}