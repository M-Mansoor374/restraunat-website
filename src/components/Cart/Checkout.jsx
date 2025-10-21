import React, { useState } from 'react';
import './Checkout.css';

const Checkout = ({ cart, onBackToCart, onCompleteOrder }) => {
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phoneNumber: '',
    orderType: 'Dine-in',
    tableNumber: ''
  });
  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const validateForm = () => {
    const newErrors = {};

    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!customerInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(customerInfo.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
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
      total,
      orderId: `GLB-${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    onCompleteOrder(orderData);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button className="back-btn" onClick={onBackToCart}>
          ← Back to Cart
        </button>
        <h2>Checkout</h2>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <div className="form-card">
            <h3>Customer Information</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={customerInfo.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={customerInfo.phoneNumber}
                  onChange={handleInputChange}
                  className={errors.phoneNumber ? 'error' : ''}
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="orderType">Order Type *</label>
                <select
                  id="orderType"
                  name="orderType"
                  value={customerInfo.orderType}
                  onChange={handleInputChange}
                >
                  <option value="Dine-in">Dine-in</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Takeout">Takeout</option>
                </select>
              </div>

              {customerInfo.orderType === 'Dine-in' && (
                <div className="form-group">
                  <label htmlFor="tableNumber">Table Number *</label>
                  <input
                    type="text"
                    id="tableNumber"
                    name="tableNumber"
                    value={customerInfo.tableNumber}
                    onChange={handleInputChange}
                    className={errors.tableNumber ? 'error' : ''}
                    placeholder="Enter table number (e.g., 5)"
                  />
                  {errors.tableNumber && <span className="error-message">{errors.tableNumber}</span>}
                </div>
              )}

              <button type="submit" className="complete-order-btn">
                Complete Order
              </button>
            </form>
          </div>
        </div>

        <div className="order-summary-section">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="order-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  <span className="item-price">PKR {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="total-row">
                <span>Tax (8%):</span>
                <span>PKR {tax.toLocaleString()}</span>
              </div>
              <div className="total-row final-total">
                <span>Total:</span>
                <span>PKR {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="order-type-info">
              <p><strong>Order Type:</strong> {customerInfo.orderType}</p>
              {customerInfo.orderType === 'Dine-in' && customerInfo.tableNumber && (
                <p><strong>Table Number:</strong> {customerInfo.tableNumber}</p>
              )}
              {customerInfo.orderType === 'Delivery' && (
                <p className="delivery-note">
                  <em>Delivery charges may apply. Please confirm with restaurant.</em>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
