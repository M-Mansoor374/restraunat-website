import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cart, onBackToCart, onCompleteOrder }) => {
  const location = useLocation();
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phoneNumber: '',
    orderType: 'Dine-in',
    tableNumber: ''
  });
  const [errors, setErrors] = useState({});

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      // Also try scrollTo on document element for better compatibility
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    });
  }, [location.pathname]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + tax + serviceFee;

  const validateForm = () => {
    const newErrors = {};

    // Only validate name and phone for delivery orders
    if (customerInfo.orderType === 'Delivery') {
      if (!customerInfo.fullName.trim()) {
        newErrors.fullName = 'Full name is required for delivery orders';
      }

      if (!customerInfo.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Phone number is required for delivery orders';
      } else if (!/^\+?[\d\s\-()]{10,}$/.test(customerInfo.phoneNumber)) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    }

    // Validate table number for dine-in orders
    if (customerInfo.orderType === 'Dine-in' && !customerInfo.tableNumber.trim()) {
      newErrors.tableNumber = 'Table number is required for dine-in orders';
    } else if (customerInfo.orderType === 'Dine-in' && customerInfo.tableNumber.trim() && !/^\d+$/.test(customerInfo.tableNumber.trim())) {
      newErrors.tableNumber = 'Please enter a valid table number';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const orderData = {
      customerInfo,
      items: cart,
      subtotal,
      tax,
      serviceFee,
      total,
      orderId: `GLB-${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    onCompleteOrder(orderData);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-hero">
          <span className="hero-badge">Step 02 of 03</span>
          <h1 className="hero-title">Secure Checkout</h1>
          <p className="hero-subtitle">Confirm your details so our team can craft your experience perfectly.</p>
        </div>

        <button className="back-btn" onClick={onBackToCart}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back to Cart</span>
        </button>

        <div className="merged-checkout-card">
          <div className="professional-customer-section">
            <div className="section-header-pro">
              <div className="header-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="header-text">
                <h3>Customer Information</h3>
                <p>Please provide your details to complete the order</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} id="checkout-form">
                {/* Only show name and phone fields for delivery orders */}
                {customerInfo.orderType === 'Delivery' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="fullName">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={customerInfo.fullName}
                        onChange={handleInputChange}
                        className={errors.fullName ? 'error' : ''}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <span className="error-message">⚠️ {errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phoneNumber">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 16.92V19.92C22 20.4728 21.5523 20.92 21 20.92C9.40202 20.92 0 11.518 0 0C0 -0.552285 0.447715 -1 1 -1H4C4.55228 -1 5 -0.552285 5 0C5 2.25 5.5 4.5 6.5 6.5L5 8C7 12 12 17 16 19L17.5 17.5C19.5 18.5 21.75 19 24 19C24.5523 19 25 19.4477 25 20V23Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={customerInfo.phoneNumber}
                        onChange={handleInputChange}
                        className={errors.phoneNumber ? 'error' : ''}
                        placeholder="Enter your phone number"
                      />
                      {errors.phoneNumber && <span className="error-message">⚠️ {errors.phoneNumber}</span>}
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label htmlFor="orderType">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Order Type *
                  </label>
                  <select
                    id="orderType"
                    name="orderType"
                    value={customerInfo.orderType}
                    onChange={handleInputChange}
                  >
                    <option value="Dine-in">🍽️ Dine-in</option>
                    <option value="Delivery">🚚 Delivery</option>
                    <option value="Takeout">🥡 Takeout</option>
                  </select>
                </div>

                {customerInfo.orderType === 'Dine-in' && (
                  <div className="form-group table-number-group">
                    <label htmlFor="tableNumber">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12h18M3 6h18M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Table Number *
                    </label>
                    <input
                      type="text"
                      id="tableNumber"
                      name="tableNumber"
                      value={customerInfo.tableNumber}
                      onChange={handleInputChange}
                      className={errors.tableNumber ? 'error' : ''}
                      placeholder="Enter table number (e.g., 5)"
                    />
                    {errors.tableNumber && <span className="error-message">⚠️ {errors.tableNumber}</span>}
                  </div>
                )}
              </form>
              
              {/* Complete Order Button - Now inside form section, not sticky */}
              <button type="submit" form="checkout-form" className="complete-order-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Complete Order</span>
                <span className="button-total">PKR {total.toLocaleString()}</span>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
