import React, { useState, useEffect } from 'react';
import CartComponent from './CartComponent';
import Checkout from './Checkout';
import Receipt from './Receipt';
import { trackOrder } from '../../utils/orderTracking';

const RestaurantApp = () => {
  const [currentView, setCurrentView] = useState('cart'); // Always start with cart view
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState(null);

  // Load cart from localStorage on component mount
  useEffect(() => {
    console.log('=== CART COMPONENT MOUNTING ===');
    console.log('RestaurantApp mounting, checking localStorage...');
    const savedCart = localStorage.getItem('restaurantCart');
    console.log('Raw localStorage data on mount:', savedCart);
    
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        console.log('Loading cart from localStorage:', cartData);
        console.log('Setting initial cart state to:', cartData);
        setCart(cartData);
        console.log('Initial cart state set successfully');
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCart([]);
      }
    } else {
      console.log('No cart data in localStorage, starting with empty cart');
      setCart([]);
    }

    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      console.log('=== CART UPDATE EVENT RECEIVED ===');
      console.log('Cart update event received, reloading cart...');
      const updatedCart = localStorage.getItem('restaurantCart');
      console.log('Raw localStorage data received:', updatedCart);
      
      if (updatedCart) {
        try {
          const cartData = JSON.parse(updatedCart);
          console.log('Parsed cart data:', cartData);
          console.log('Setting cart state to:', cartData);
          setCart(cartData);
          console.log('Cart state updated successfully');
        } catch (error) {
          console.error('Error parsing updated cart:', error);
        }
      } else {
        console.log('No cart data found in localStorage');
      }
      console.log('=== END CART UPDATE EVENT ===');
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('restaurantCart', JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (itemId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('restaurantCart');
  };

  const proceedToCheckout = () => {
    setCurrentView('checkout');
  };

  const backToCart = () => {
    setCurrentView('cart');
  };

  const completeOrder = (orderInfo) => {
    setOrderData(orderInfo);
    setCurrentView('receipt');
    
    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
    existingOrders.push(orderInfo);
    localStorage.setItem('restaurantOrders', JSON.stringify(existingOrders));
    
    // Track order for MyAccount analytics
    trackOrder({
      totalAmount: orderInfo.total,
      items: orderInfo.items || cart,
      orderId: orderInfo.orderId,
      timestamp: orderInfo.timestamp
    });
    
    // Clear cart after successful order
    setCart([]);
    localStorage.removeItem('restaurantCart');
  };

  const printReceipt = () => {
    const printContent = document.getElementById('receipt');
    if (!printContent) {
      alert('Receipt not found. Please try again.');
      return;
    }
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - GreenLeaf Bistro</title>
          <style>
            body { 
              font-family: 'Courier New', monospace; 
              margin: 0; 
              padding: 20px; 
              background: white;
              color: black;
            }
            .receipt { 
              max-width: 400px; 
              margin: 0 auto; 
              border: 2px solid #000; 
              padding: 20px; 
              background: white;
            }
            .receipt-header { text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #000; }
            .restaurant-name { font-size: 1.8rem; font-weight: bold; color: #000; margin: 10px 0; }
            .receipt-info { margin-bottom: 20px; }
            .receipt-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem; }
            .receipt-divider { height: 1px; background: #000; margin: 15px 0; }
            .receipt-items-header { display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #000; }
            .receipt-item { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem; }
            .receipt-totals { margin-bottom: 20px; }
            .receipt-total-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
            .final-total { font-size: 1.1rem; font-weight: bold; padding-top: 10px; border-top: 2px solid #000; }
            .receipt-footer { text-align: center; }
            .thank-you { font-size: 1.1rem; font-weight: bold; margin: 15px 0; }
            .restaurant-info { font-size: 0.8rem; line-height: 1.4; margin: 10px 0; }
            @media print { body { margin: 0; padding: 0; } }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load then print
    printWindow.onload = function() {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        alert('Receipt printed successfully!');
      }, 500);
    };
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="restaurant-app">
      {/* Navigation Header */}
      <div className="app-header">
        <div className="header-content">
          <h1 className="app-title">Your Cart</h1>
          <div className="header-summary">
            <div className="summary-badge">
              <span className="summary-label">Items</span>
              <span className="summary-value">{getCartItemCount()}</span>
            </div>
            <div className="summary-badge">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">PKR {getSubtotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="app-content">
        {currentView === 'cart' && (
          <CartComponent 
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onClearCart={clearCart}
            onProceedToCheckout={proceedToCheckout}
          />
        )}
        
        {currentView === 'checkout' && (
          <Checkout 
            cart={cart}
            onBackToCart={backToCart}
            onCompleteOrder={completeOrder}
          />
        )}
        
        {currentView === 'receipt' && orderData && (
          <Receipt 
            orderData={orderData}
            onPrintReceipt={printReceipt}
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantApp;
