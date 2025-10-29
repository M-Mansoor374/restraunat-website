import React, { useState, useEffect, useRef } from 'react';
import CartComponent from './CartComponent';
import Checkout from './Checkout';
import Receipt from './Receipt';
import { trackOrder } from '../../utils/orderTracking';

const RestaurantApp = () => {
  const [currentView, setCurrentView] = useState('cart'); // Always start with cart view
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const isLoadingFromStorage = useRef(false);

  // Function to load cart from localStorage
  const loadCartFromStorage = React.useCallback(() => {
    isLoadingFromStorage.current = true;
    try {
      const savedCart = localStorage.getItem('restaurantCart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        console.log('Loaded cart from localStorage:', cartData);
        if (Array.isArray(cartData)) {
          setCart(cartData);
          setTimeout(() => {
            isLoadingFromStorage.current = false;
          }, 100);
          return cartData;
        }
      }
      // If no saved cart, set empty array
      setCart([]);
      setTimeout(() => {
        isLoadingFromStorage.current = false;
      }, 100);
      return [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCart([]);
      setTimeout(() => {
        isLoadingFromStorage.current = false;
      }, 100);
      return [];
    }
  }, []);

  // Load cart from localStorage on component mount AND when window gains focus
  useEffect(() => {
    console.log('=== RESTAURANT APP MOUNTING ===');
    
    // Initial load
    loadCartFromStorage();

    // Listen for cart updates from other components (Menu page)
    const handleCartUpdate = () => {
      console.log('=== CART UPDATE EVENT RECEIVED ===');
      // Small delay to ensure localStorage is written
      setTimeout(() => {
        loadCartFromStorage();
      }, 50);
    };

    // Listen for window focus (when user returns to cart tab)
    const handleWindowFocus = () => {
      console.log('Window focused - checking for cart updates');
      loadCartFromStorage();
    };

    // Listen for storage events (cross-tab updates)
    const handleStorageChange = (e) => {
      if (e.key === 'restaurantCart') {
        console.log('localStorage changed - reloading cart');
        loadCartFromStorage();
      }
    };

    // Listen for visibility changes (tab becomes visible)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Tab became visible - checking cart');
        loadCartFromStorage();
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadCartFromStorage]);

  // Save cart to localStorage whenever cart changes (but prevent save loops during loading)
  useEffect(() => {
    // Don't save if we're currently loading from storage (prevents race conditions)
    if (isLoadingFromStorage.current) {
      return;
    }
    
    // Always save, even if empty
    try {
      const cartString = JSON.stringify(cart);
      const existingCart = localStorage.getItem('restaurantCart');
      
      // Only save if different to prevent unnecessary writes
      if (cartString !== existingCart) {
        localStorage.setItem('restaurantCart', cartString);
        console.log('Cart saved to localStorage:', cart);
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
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
    console.log('=== COMPLETE ORDER CALLED ===');
    console.log('Order Info:', orderInfo);
    console.log('Cart:', cart);
    
    // Validate order info
    if (!orderInfo || !orderInfo.total) {
      console.error('Invalid order info:', orderInfo);
      alert('Error: Invalid order information. Please try again.');
      return;
    }
    
    setOrderData(orderInfo);
    setCurrentView('receipt');
    
    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
    existingOrders.push(orderInfo);
    localStorage.setItem('restaurantOrders', JSON.stringify(existingOrders));
    
    // Track order for MyAccount analytics - Use orderInfo.total for the amount
    const orderAmount = Number(orderInfo.total) || 0;
    console.log('=== TRACKING ORDER FOR ANALYTICS ===');
    console.log('Order amount to track:', orderAmount);
    console.log('Order ID:', orderInfo.orderId);
    
    // CRITICAL: Track order immediately when completed (not when printed)
    trackOrder({
      totalAmount: orderAmount,
      items: orderInfo.items || cart,
      orderId: orderInfo.orderId,
      timestamp: orderInfo.timestamp
    });
    
    // Clear cart after successful order
    setCart([]);
    localStorage.removeItem('restaurantCart');
    
    console.log('=== ORDER COMPLETED AND TRACKED ===');
    
    // Force a storage event to notify MyAccount if it's open in another tab
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'restaurantSalesData',
      newValue: localStorage.getItem('restaurantSalesData')
    }));
  };

  const printReceipt = () => {
    const printContent = document.getElementById('receipt');
    if (!printContent) {
      alert('Receipt not found. Please try again.');
      return;
    }
    
    // Note: Order is already tracked when completeOrder is called
    // No need to track again when printing (would cause double counting)
    console.log('Printing receipt for order:', orderData?.orderId);
    
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
