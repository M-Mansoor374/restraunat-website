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
          console.log('Cart length:', cartData.length);
          console.log('Setting cart state to:', cartData);
          setCart(cartData);
          console.log('Cart state updated successfully');
          
          // Force a re-render by logging current state
          setTimeout(() => {
            console.log('Current cart state after update:', cart);
          }, 100);
        } catch (error) {
          console.error('Error parsing updated cart:', error);
        }
      } else {
        console.log('No cart data found in localStorage');
        setCart([]);
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
    console.log('Cart state changed, saving to localStorage:', cart);
    localStorage.setItem('restaurantCart', JSON.stringify(cart));
  }, [cart]);

  // Force refresh cart from localStorage every 2 seconds (for debugging)
  useEffect(() => {
    const interval = setInterval(() => {
      const savedCart = localStorage.getItem('restaurantCart');
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart);
          if (JSON.stringify(cartData) !== JSON.stringify(cart)) {
            console.log('Cart mismatch detected, refreshing from localStorage');
            console.log('localStorage cart:', cartData);
            console.log('Current cart state:', cart);
            setCart(cartData);
          }
        } catch (error) {
          console.error('Error refreshing cart from localStorage:', error);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
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
    
    // Track order when printing receipt
    if (orderData) {
      trackOrder({
        totalAmount: orderData.total,
        items: orderData.items || cart,
        orderId: orderData.orderId,
        timestamp: orderData.timestamp
      });
    }
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - APEXIUMS TECHNOLOGIES</title>
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
        alert('Receipt printed successfully! Order tracked in dashboard.');
      }, 500);
    };
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Manual refresh function for debugging
  const refreshCart = () => {
    console.log('=== MANUAL CART REFRESH ===');
    const savedCart = localStorage.getItem('restaurantCart');
    console.log('localStorage cart:', savedCart);
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        console.log('Setting cart to:', cartData);
        setCart(cartData);
      } catch (error) {
        console.error('Error refreshing cart:', error);
      }
    }
  };

  // Debug: Log current cart state on every render
  console.log('=== CART RENDER DEBUG ===');
  console.log('Current cart state:', cart);
  console.log('Cart length:', cart.length);
  console.log('Cart items:', cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })));
  console.log('=== END CART RENDER DEBUG ===');

  return (
    <div className="restaurant-app">
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
