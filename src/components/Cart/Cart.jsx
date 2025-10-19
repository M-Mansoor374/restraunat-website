import React, { useState, useEffect } from 'react';
import './Cart.css';

// Dummy product data - in a real app, this would come from an API
const DUMMY_PRODUCTS = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, image: '🍕' },
  { id: 2, name: 'Caesar Salad', price: 8.99, image: '🥗' },
  { id: 3, name: 'Chicken Burger', price: 14.99, image: '🍔' },
  { id: 4, name: 'Pasta Carbonara', price: 16.99, image: '🍝' },
  { id: 5, name: 'Fish & Chips', price: 13.99, image: '🐟' },
  { id: 6, name: 'Chocolate Cake', price: 6.99, image: '🍰' }
];

const Cart = () => {
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('restaurantCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart data to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('restaurantCart', JSON.stringify(cartItems));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }, [cartItems]);

  // Function to add item to cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to increase item quantity
  const increaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Function to decrease item quantity
  const decreaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      ).filter(item => item.quantity > 0) // Remove items with quantity 0
    );
  };

  // Function to remove item completely from cart
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Function to clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Function to handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    // Create order summary
    const orderSummary = {
      items: cartItems,
      subtotal: subtotal,
      tax: tax,
      total: total,
      orderId: `ORD-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
    existingOrders.push(orderSummary);
    localStorage.setItem('restaurantOrders', JSON.stringify(existingOrders));
    
    // Clear cart after successful checkout
    setCartItems([]);
    
    // Show success message
    alert(`Order placed successfully!\nOrder ID: ${orderSummary.orderId}\nTotal: $${total.toFixed(2)}\n\nThank you for your order!`);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Calculate total items count
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>🛒 Your Cart</h2>
        <div className="cart-summary">
          <span className="item-count">{totalItems} items</span>
          {totalItems > 0 && (
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          )}
        </div>
      </div>

      {/* Product Selection Section */}
      <div className="product-selection">
        <h3>Add Items to Cart</h3>
        <div className="product-grid">
          {DUMMY_PRODUCTS.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.image}</div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Items Section */}
      <div className="cart-items-section">
        <h3>Cart Items</h3>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <p>Add some delicious items from above!</p>
          </div>
        ) : (
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">{item.image}</div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">${item.price.toFixed(2)} each</p>
                </div>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Total Section */}
      {cartItems.length > 0 && (
        <div className="cart-total">
          <div className="total-details">
            <div className="total-line">
              <span>Subtotal ({totalItems} items):</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="total-line">
              <span>Tax (8%):</span>
              <span>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>
            <div className="total-line total-final">
              <span>Total:</span>
              <span>${(totalPrice * 1.08).toFixed(2)}</span>
            </div>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
