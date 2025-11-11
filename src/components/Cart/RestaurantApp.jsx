import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import CartComponent from './CartComponent';
import Checkout from './Checkout';
import Receipt from './Receipt';
import { trackOrder } from '../../utils/orderTracking';

const RestaurantApp = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState('cart'); // Always start with cart view
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const isLoadingFromStorage = useRef(false);

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

  // Function to load cart from localStorage
  const loadCartFromStorage = React.useCallback(() => {
    isLoadingFromStorage.current = true;
    try {
      const savedCart = localStorage.getItem('restaurantCart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
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
    // Initial load
    loadCartFromStorage();

    // Listen for cart updates from other components (Menu page)
    const handleCartUpdate = () => {
      // Small delay to ensure localStorage is written
      setTimeout(() => {
        loadCartFromStorage();
      }, 50);
    };

    // Listen for window focus (when user returns to cart tab)
    const handleWindowFocus = () => {
      loadCartFromStorage();
    };

    // Listen for storage events (cross-tab updates)
    const handleStorageChange = (e) => {
      if (e.key === 'restaurantCart') {
        loadCartFromStorage();
      }
    };

    // Listen for visibility changes (tab becomes visible)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
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
    // Create a new window for printing (better mobile support)
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print the receipt.');
      return;
    }
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Receipt - APEXIUMS TECHNOLOGIES</title>
          <style>
            @page {
              size: auto;
              margin: 10mm;
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              box-sizing: border-box;
            }
            
            body { 
              font-family: 'Courier New', monospace; 
              margin: 0; 
              padding: 0; 
              background: white;
              color: black;
              font-size: 12px;
            }
            
            .receipt { 
              max-width: 100%; 
              width: 100%;
              margin: 0 auto; 
              border: 2px solid #000; 
              padding: 15px; 
              background: white;
              page-break-inside: avoid;
            }
            
            .receipt-header { 
              text-align: center; 
              margin-bottom: 15px; 
              padding-bottom: 12px; 
              border-bottom: 2px solid #000; 
            }
            
            .restaurant-logo {
              margin-bottom: 10px;
            }
            
            .logo-emoji {
              font-size: 2rem;
            }
            
            .restaurant-name { 
              font-size: 1.4rem; 
              font-weight: bold; 
              color: #000; 
              margin: 8px 0; 
              font-family: 'Poppins', Arial, sans-serif;
            }
            
            .restaurant-tagline {
              font-size: 0.85rem;
              color: #333;
              margin: 0;
            }
            
            .receipt-info { 
              margin-bottom: 15px; 
            }
            
            .receipt-row { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 4px; 
              font-size: 0.85rem;
              word-break: break-word;
            }
            
            .receipt-divider { 
              height: 1px; 
              background: #000; 
              margin: 12px 0; 
              border: none;
            }
            
            .receipt-items-header { 
              display: flex; 
              justify-content: space-between; 
              font-weight: bold; 
              margin-bottom: 8px; 
              padding-bottom: 4px; 
              border-bottom: 1px solid #000;
              font-size: 0.9rem;
            }
            
            .item-column { flex: 2; }
            .qty-column { flex: 1; text-align: center; }
            .price-column { flex: 1; text-align: right; }
            
            .receipt-item { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 6px; 
              font-size: 0.8rem;
              align-items: flex-start;
            }
            
            .item-details {
              flex: 2;
              display: flex;
              flex-direction: column;
            }
            
            .item-name {
              font-weight: 600;
              margin-bottom: 2px;
            }
            
            .item-category {
              font-size: 0.7rem;
              color: #666;
              font-style: italic;
            }
            
            .item-qty {
              flex: 1;
              text-align: center;
            }
            
            .item-price {
              flex: 1;
              text-align: right;
              font-weight: 600;
            }
            
            .receipt-totals { 
              margin-bottom: 15px; 
            }
            
            .receipt-total-row { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 4px;
              font-size: 0.85rem;
            }
            
            .final-total { 
              font-size: 1rem; 
              font-weight: bold; 
              padding-top: 8px; 
              border-top: 2px solid #000;
              margin-top: 10px;
            }
            
            .receipt-footer { 
              text-align: center; 
            }
            
            .thank-you { 
              font-size: 1rem; 
              font-weight: bold; 
              margin: 12px 0; 
              color: #000;
              font-family: 'Poppins', Arial, sans-serif;
            }
            
            .restaurant-info { 
              font-size: 0.75rem; 
              line-height: 1.4; 
              margin: 10px 0;
              color: #333;
            }
            
            .receipt-note {
              font-size: 0.7rem;
              color: #666;
              font-style: italic;
              margin: 10px 0 0 0;
            }
            
            @media print {
              body { 
                margin: 0; 
                padding: 0; 
              }
              
              .receipt {
                border: 2px solid #000 !important;
                box-shadow: none !important;
              }
              
              @page {
                margin: 5mm;
              }
              
              /* Mobile print styles */
              @media print and (max-width: 600px) {
                .receipt {
                  padding: 12px !important;
                  font-size: 11px !important;
                }
                
                .restaurant-name {
                  font-size: 1.2rem !important;
                }
                
                .receipt-row,
                .receipt-total-row {
                  font-size: 0.75rem !important;
                }
                
                .receipt-item {
                  font-size: 0.7rem !important;
                }
              }
            }
            
            @media screen and (max-width: 600px) {
              body {
                padding: 10px;
              }
              
              .receipt {
                padding: 12px;
                font-size: 11px;
              }
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load then print (longer timeout for mobile)
      setTimeout(() => {
      try {
        printWindow.print();
        // Don't close immediately on mobile - let user cancel print if needed
        setTimeout(() => {
        printWindow.close();
        }, 1000);
      } catch (error) {
        console.error('Print error:', error);
        alert('Print dialog could not be opened. Please check your browser settings.');
      }
    }, 800);
  };

  // Helper functions (commented out but kept for potential future use)
  // const getCartItemCount = () => {
  //   return cart.reduce((total, item) => total + item.quantity, 0);
  // };

  // const getSubtotal = () => {
  //   return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // };

  // Manual refresh function for debugging (commented out but kept for potential future use)
  // const refreshCart = () => {
  //   console.log('=== MANUAL CART REFRESH ===');
  //   const savedCart = localStorage.getItem('restaurantCart');
  //   console.log('localStorage cart:', savedCart);
  //   if (savedCart) {
  //     try {
  //       const cartData = JSON.parse(savedCart);
  //       console.log('Setting cart to:', cartData);
  //       setCart(cartData);
  //     } catch (error) {
  //       console.error('Error refreshing cart:', error);
  //     }
  //   }
  // };

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
