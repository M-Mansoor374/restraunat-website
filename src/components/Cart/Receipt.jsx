import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Receipt.css';

const Receipt = ({ orderData, onBackToMenu, onPrintReceipt }) => {
  const location = useLocation();
  
  // Debug: Log order data to console
  console.log('Receipt orderData:', orderData);

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
  
  if (!orderData || !orderData.items) {
    return (
      <div className="receipt-container">
        <div className="receipt-actions">
          <button className="back-to-menu-btn" onClick={onBackToMenu}>
            ← Back to Menu
          </button>
        </div>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>No Order Data Found</h2>
          <p>Please complete an order first to generate a receipt.</p>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="receipt-container">
      <div className="receipt-actions">
        <button className="back-to-menu-btn" onClick={onBackToMenu}>
          ← Back to Menu
        </button>
        <button className="print-receipt-btn" onClick={onPrintReceipt}>
          🖨️ Print Receipt
        </button>
      </div>

      <div className="receipt" id="receipt">
        <div className="receipt-header">
          <div className="restaurant-logo">
            <span className="logo-emoji">🌿</span>
          </div>
          <h1 className="restaurant-name">APEXIUMS TECHNOLOGIES</h1>
          <p className="restaurant-tagline">Fresh • Healthy • Delicious</p>
        </div>

        <div className="receipt-info">
          <div className="receipt-row">
            <span className="label">Order ID:</span>
            <span className="value">{orderData.orderId}</span>
          </div>
          <div className="receipt-row">
            <span className="label">Date:</span>
            <span className="value">{formatDate(orderData.timestamp)}</span>
          </div>
          <div className="receipt-row">
            <span className="label">Time:</span>
            <span className="value">{formatTime(orderData.timestamp)}</span>
          </div>
          <div className="receipt-row">
            <span className="label">Customer:</span>
            <span className="value">{orderData.customerInfo?.fullName || 'N/A'}</span>
          </div>
          <div className="receipt-row">
            <span className="label">Phone:</span>
            <span className="value">{orderData.customerInfo?.phoneNumber || 'N/A'}</span>
          </div>
          <div className="receipt-row">
            <span className="label">Order Type:</span>
            <span className="value">{orderData.customerInfo?.orderType || 'N/A'}</span>
          </div>
          {orderData.customerInfo?.tableNumber && (
            <div className="receipt-row">
              <span className="label">Table Number:</span>
              <span className="value">{orderData.customerInfo.tableNumber}</span>
            </div>
          )}
        </div>

        <div className="receipt-divider"></div>

        <div className="receipt-items">
          <div className="receipt-items-header">
            <span className="item-column">Item</span>
            <span className="qty-column">Qty</span>
            <span className="price-column">Price</span>
          </div>
          
          {orderData.items.map(item => (
            <div key={item.id} className="receipt-item">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-category">{item.category}</span>
              </div>
              <span className="item-qty">{item.quantity}</span>
              <span className="item-price">PKR {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="receipt-divider"></div>

        <div className="receipt-totals">
          <div className="receipt-total-row">
            <span className="label">Subtotal:</span>
            <span className="value">PKR {orderData.subtotal.toLocaleString()}</span>
          </div>
          <div className="receipt-total-row">
            <span className="label">Tax (8%):</span>
            <span className="value CAPS">PKR {orderData.tax.toLocaleString()}</span>
          </div>
          <div className="receipt-total-row final-total">
            <span className="label">TOTAL:</span>
            <span className="value">PKR {orderData.total.toLocaleString()}</span>
          </div>
        </div>

        <div className="receipt-footer">
          <div className="receipt-divider"></div>
          <p className="thank-you">Thank you for your order!</p>
          <p className="restaurant-info">
            <strong>A system by APEXIUMS TECHNOLOGIES</strong><br />
            <strong>03405542097</strong>
          </p>
          <div className="receipt-divider"></div>
          <p className="receipt-note">
            Please keep this receipt for your records
          </p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
