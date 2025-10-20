import React, { useState, useEffect } from 'react';
import './Cart.css';

const CartComponent = ({ cart, onUpdateQuantity, onRemoveItem, onClearCart, onProceedToCheckout }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + tax - discount;

  const applyDiscount = () => {
    if (discountCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1);
    } else if (discountCode.toLowerCase() === 'welcome') {
      setDiscount(5);
    } else {
      setDiscount(0);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      onRemoveItem(itemId);
    } else {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const handleClearCart = () => {
    onClearCart();
    setShowClearConfirm(false);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart</h2>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious items from our menu!</p>
          <button 
            className="back-to-home-btn"
            onClick={() => window.location.href = '/'}
            style={{
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '20px',
              transition: 'all 0.3s ease'
            }}
          >
            ← Back to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Cart ({cart.length} items)</h2>
        <div className="cart-header-buttons">
          <button 
            className="back-to-home-btn"
            onClick={() => window.location.href = '/'}
            style={{
              background: '#666',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            ← Back to Home
          </button>
          {cart.length > 0 && (
            <button 
              className="clear-cart-btn"
              onClick={() => setShowClearConfirm(true)}
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item" style={{ animationDelay: `${cart.indexOf(item) * 0.1}s` }}>
            <div className="item-image">
              <span className="item-emoji">{item.image}</span>
            </div>
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-category">{item.category}</p>
              <div className="item-controls">
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-price">
                  PKR {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            </div>
            <button 
              className="remove-btn"
              onClick={() => onRemoveItem(item.id)}
              title="Remove item"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="discount-section">
        <div className="discount-input-group">
          <input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="discount-input"
          />
          <button 
            className="apply-discount-btn"
            onClick={applyDiscount}
          >
            Apply
          </button>
        </div>
        {discount > 0 && (
          <div className="discount-applied">
            <span className="discount-text">Discount applied: -PKR {discount.toLocaleString()}</span>
            <button 
              className="remove-discount-btn"
              onClick={() => {
                setDiscount(0);
                setDiscountCode('');
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>PKR {subtotal.toLocaleString()}</span>
        </div>
        <div className="summary-row">
          <span>Tax (8%):</span>
          <span>PKR {tax.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="summary-row discount-row">
            <span>Discount:</span>
            <span>-PKR {discount.toLocaleString()}</span>
          </div>
        )}
        <div className="summary-row total-row">
          <span>Total:</span>
          <span>PKR {total.toLocaleString()}</span>
        </div>
      </div>

      <button 
        className="checkout-btn"
        onClick={onProceedToCheckout}
      >
        Proceed to Checkout
      </button>

      {showClearConfirm && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>Clear Cart?</h3>
            <p>Are you sure you want to remove all items from your cart?</p>
            <div className="modal-buttons">
              <button 
                className="cancel-btn"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
