import React, { useState } from 'react';
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
            onClick={() => window.location.href = '/menu'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Professional Header */}
      <div className="cart-header">
        <div className="header-main">
          <div className="header-title-section">
            <h1 className="cart-title">Shopping Cart</h1>
            <p className="cart-subtitle">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <div className="header-actions">
            <button 
              className="back-to-home-btn"
              onClick={() => window.location.href = '/menu'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Continue Shopping
            </button>
            {cart.length > 0 && (
              <button 
                className="clear-cart-btn"
                onClick={() => setShowClearConfirm(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cart Items Section */}
      <div className="cart-items-section">
        <div className="section-header">
          <h2 className="section-title">Order Items</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item" style={{ animationDelay: `${cart.indexOf(item) * 0.1}s` }}>
              <div className="item-image-container">
                <div className="item-image">
                  {item.image && (item.image.startsWith('http://') || item.image.startsWith('https://') || item.image.startsWith('/')) ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => {
                        console.error('Image failed to load:', item.image);
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : item.image ? (
                    <div className="item-placeholder">
                      <span className="item-emoji">{item.image}</span>
                    </div>
                  ) : (
                    <div className="item-placeholder">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="item-content">
                <div className="item-header">
                  <h3 className="item-name">{item.name}</h3>
                  <button 
                    className="remove-btn"
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove item"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                
                <p className="item-category">{item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'Menu Item'}</p>
                
                <div className="item-footer">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn decrease"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn increase"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="item-pricing">
                    <div className="unit-price">PKR {item.price.toLocaleString()} each</div>
                    <div className="total-price">PKR {(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discount Section */}
      <div className="discount-section">
        <div className="section-header">
          <h2 className="section-title">Promo Code</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="discount-card">
          <div className="discount-input-group">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11L12 2L3 11V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11L12 16L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Enter promo code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="discount-input"
              />
            </div>
            <button 
              className="apply-discount-btn"
              onClick={applyDiscount}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Apply
            </button>
          </div>
          
          {discount > 0 && (
            <div className="discount-applied">
              <div className="discount-info">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="discount-text">Discount applied: -PKR {discount.toLocaleString()}</span>
              </div>
              <button 
                className="remove-discount-btn"
                onClick={() => {
                  setDiscount(0);
                  setDiscountCode('');
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="order-summary-section">
        <div className="section-header">
          <h2 className="section-title">Order Summary</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="summary-card">
          <div className="summary-rows">
            <div className="summary-row">
              <span className="label">Subtotal ({cart.length} items)</span>
              <span className="value">PKR {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span className="label">Tax (8%)</span>
              <span className="value">PKR {tax.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row discount-row">
                <span className="label">Discount</span>
                <span className="value discount-value">-PKR {discount.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="total-row">
            <span className="total-label">Total</span>
            <span className="total-value">PKR {total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="checkout-section">
        <button 
          className="checkout-btn"
          onClick={onProceedToCheckout}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Proceed to Checkout</span>
          <div className="checkout-price">PKR {total.toLocaleString()}</div>
        </button>
      </div>

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
