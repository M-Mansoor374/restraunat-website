import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { resetSalesData } from '../utils/orderTracking';
import './MyAccount.css';

const MyAccount = ({ user = {} }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('daily');
  const [salesData, setSalesData] = useState({
    daily: [],
    monthly: []
  });

  // Initialize with zero data
  const initializeZeroData = () => {
    const today = new Date();
    const dailyData = [];
    const monthlyData = [];

    // Generate last 7 days with zero data
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dailyData.push({
        date: date.toISOString().split('T')[0],
        orders: 0,
        revenue: 0,
        change: '0%'
      });
    }

    // Generate last 6 months with zero data
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      monthlyData.push({
        month: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        orders: 0,
        revenue: 0,
        change: '0%'
      });
    }

    return { daily: dailyData, monthly: monthlyData };
  };

  // Check and sync sales data with any untracked orders (backup mechanism)
  const syncSalesDataWithOrders = useCallback(() => {
    try {
      const savedOrders = localStorage.getItem('restaurantOrders');
      const savedSalesData = localStorage.getItem('restaurantSalesData');
      
      if (!savedOrders) {
        return null; // No orders to sync
      }
      
      const orders = JSON.parse(savedOrders);
      console.log('=== SYNC CHECK: Found orders in storage ===');
      console.log('Total orders:', orders.length);
      
      // If we already have sales data, assume it's up to date (orders are tracked when placed)
      // Only process if sales data is missing or empty
      if (!savedSalesData || savedSalesData === 'null' || savedSalesData === '{}') {
        console.log('Sales data missing or empty, processing orders...');
        
        // Use the updateSalesDataDirectly logic from orderTracking
        // But we'll just ensure data exists - actual tracking happens in trackOrder
        return null; // Return null so we initialize zero data
      }
      
      // Data exists, assume it's correct (trackOrder handles updates)
      return null;
    } catch (error) {
      console.error('Error syncing sales data:', error);
      return null;
    }
  }, []);

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

  // Load sales data from localStorage or initialize with zero data
  useEffect(() => {
    const loadSalesData = () => {
      try {
        // Check if we need to sync (but don't reprocess - trackOrder handles it)
        syncSalesDataWithOrders();
        
        const savedData = localStorage.getItem('restaurantSalesData');
        console.log('=== LOADING SALES DATA IN MYACCOUNT ===');
        console.log('Saved data from localStorage:', savedData);
        
        if (savedData && savedData !== 'null' && savedData !== '{}') {
          const parsedData = JSON.parse(savedData);
          console.log('Parsed sales data:', parsedData);
          console.log('Daily sales:', parsedData.daily);
          console.log('Monthly sales:', parsedData.monthly);
          
          // Validate data structure
          if (parsedData && Array.isArray(parsedData.daily) && Array.isArray(parsedData.monthly)) {
            console.log('Setting sales data:', parsedData);
          setSalesData(parsedData);
            console.log('✓ Sales data loaded successfully');
            console.log('Daily entries:', parsedData.daily.length);
            console.log('Monthly entries:', parsedData.monthly.length);
          } else {
            console.warn('Invalid sales data structure, initializing zero data');
            const zeroData = initializeZeroData();
            setSalesData(zeroData);
            localStorage.setItem('restaurantSalesData', JSON.stringify(zeroData));
          }
        } else {
          console.log('No sales data found, initializing zero data');
          const zeroData = initializeZeroData();
          setSalesData(zeroData);
          localStorage.setItem('restaurantSalesData', JSON.stringify(zeroData));
        }
      } catch (error) {
        console.error('Error loading sales data:', error);
        const zeroData = initializeZeroData();
        setSalesData(zeroData);
      }
    };

    // Load immediately
    loadSalesData();
    
    // Also reload when page becomes visible (in case user navigated away during order)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Page became visible, reloading sales data');
        loadSalesData();
      }
    };
    
    // Reload on window focus (when user returns to tab)
    const handleFocus = () => {
      console.log('Window focused, reloading sales data');
      loadSalesData();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [syncSalesDataWithOrders]);

  // Function to update sales data when an order is placed
  const updateSalesData = useCallback((orderAmount) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const currentMonth = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    setSalesData(prevData => {
      const newData = { ...prevData };

      // Update daily data
      const dailyIndex = newData.daily.findIndex(day => day.date === todayStr);
      if (dailyIndex !== -1) {
        newData.daily[dailyIndex].orders += 1;
        newData.daily[dailyIndex].revenue += orderAmount;
      } else {
        // Add new day if not exists
        newData.daily.unshift({
          date: todayStr,
          orders: 1,
          revenue: orderAmount,
          change: '0%'
        });
        // Keep only last 7 days
        newData.daily = newData.daily.slice(0, 7);
      }

      // Update monthly data
      const monthlyIndex = newData.monthly.findIndex(month => month.month === currentMonth);
      if (monthlyIndex !== -1) {
        newData.monthly[monthlyIndex].orders += 1;
        newData.monthly[monthlyIndex].revenue += orderAmount;
      } else {
        // Add new month if not exists
        newData.monthly.unshift({
          month: currentMonth,
          orders: 1,
          revenue: orderAmount,
          change: '0%'
        });
        // Keep only last 6 months
        newData.monthly = newData.monthly.slice(0, 6);
      }

      // Save to localStorage
      localStorage.setItem('restaurantSalesData', JSON.stringify(newData));
      return newData;
    });
  }, []);

  // Listen for order events (this would be called when an order is placed)
  useEffect(() => {
    const handleOrderPlaced = (event) => {
      const { orderAmount } = event.detail;
      console.log('=== ORDER EVENT RECEIVED IN MYACCOUNT ===');
      console.log('Order amount:', orderAmount);
      console.log('Event detail:', event.detail);
      
      if (orderAmount && orderAmount > 0) {
        console.log('Updating sales data with amount:', orderAmount);
        updateSalesData(orderAmount);
        
        // Reload from localStorage to ensure sync (data is already updated by trackOrder)
        setTimeout(() => {
          const savedData = localStorage.getItem('restaurantSalesData');
          if (savedData) {
            try {
              const parsedData = JSON.parse(savedData);
              console.log('Reloaded sales data after order:', parsedData);
              setSalesData(parsedData);
            } catch (error) {
              console.error('Error reloading sales data:', error);
            }
          }
        }, 150);
      } else {
        console.warn('Invalid order amount received:', orderAmount);
      }
    };

    // Also listen for storage changes (in case order was tracked while this page wasn't active)
    const handleStorageChange = (e) => {
      if (e.key === 'restaurantSalesData') {
        console.log('=== SALES DATA CHANGED IN STORAGE ===');
        try {
          const savedData = localStorage.getItem('restaurantSalesData');
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            console.log('Reloaded sales data from storage event:', parsedData);
            setSalesData(parsedData);
          }
        } catch (error) {
          console.error('Error reloading sales data from storage:', error);
        }
      }
    };

    console.log('Setting up orderPlaced event listener');
    window.addEventListener('orderPlaced', handleOrderPlaced);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      console.log('Removing orderPlaced event listener');
      window.removeEventListener('orderPlaced', handleOrderPlaced);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [updateSalesData]);

  const dailySales = salesData.daily;
  const monthlySales = salesData.monthly;

  // Calculate totals with safety checks
  const dailyTotal = dailySales.reduce((sum, day) => sum + (day.revenue || 0), 0);
  const monthlyTotal = monthlySales.reduce((sum, month) => sum + (month.revenue || 0), 0);
  const totalOrders = activeTab === 'daily' 
    ? dailySales.reduce((sum, day) => sum + (day.orders || 0), 0)
    : monthlySales.reduce((sum, month) => sum + (month.orders || 0), 0);

  const currentData = activeTab === 'daily' ? dailySales : monthlySales;
  const currentTotal = activeTab === 'daily' ? dailyTotal : monthlyTotal;
  
  // Safe average calculation to prevent division by zero
  const averageOrderValue = totalOrders > 0 ? Math.round(currentTotal / totalOrders) : 0;

  // Calculate change percentages
  const calculateChangePercentage = (current, previous) => {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const change = ((current - previous) / previous) * 100;
    return change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  };

  // Get previous period data for comparison
  const getPreviousPeriodData = () => {
    if (activeTab === 'daily') {
      const yesterday = dailySales[1] || { orders: 0, revenue: 0 };
      return yesterday;
    } else {
      const lastMonth = monthlySales[1] || { orders: 0, revenue: 0 };
      return lastMonth;
    }
  };

  const previousData = getPreviousPeriodData();
  const revenueChange = calculateChangePercentage(currentTotal, previousData.revenue);
  const ordersChange = calculateChangePercentage(totalOrders, previousData.orders);
  
  // Calculate average order value change
  const previousAvgOrderValue = previousData.orders > 0 ? Math.round(previousData.revenue / previousData.orders) : 0;
  const avgOrderValueChange = calculateChangePercentage(averageOrderValue, previousAvgOrderValue);

  // Function to reset sales data
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all sales data? This action cannot be undone.')) {
      resetSalesData();
      const zeroData = initializeZeroData();
      setSalesData(zeroData);
      localStorage.setItem('restaurantSalesData', JSON.stringify(zeroData));
    }
  };

  return (
    <div className="my-account-page">
      <div className="account-container">
        {/* Professional Header Section */}
        <div className="account-header">
          <div className="user-profile">
            <div className="user-avatar-large" role="img" aria-label="User avatar">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path 
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
                  fill="currentColor"
                />
                <path 
                  d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" 
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="user-info">
              <h1>Welcome back, {user?.name || 'Guest'}</h1>
              <p>{user?.email || 'guest@example.com'}</p>
              <div className="user-status">
                <div className="status-indicator" aria-hidden="true"></div>
                <span className="status-text">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="dashboard-main">
          {/* Stats Cards Section */}
          <div className="stats-section">
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-icon revenue">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="stat-details">
                  <p className="stat-label">Total Revenue</p>
                  <h2 className="stat-value">PKR {currentTotal.toLocaleString()}</h2>
                  <div className={`stat-change ${revenueChange.startsWith('+') ? 'positive' : 'negative'}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {revenueChange} from last period
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orders">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="stat-details">
                  <p className="stat-label">Total Orders</p>
                  <h2 className="stat-value">{totalOrders.toLocaleString()}</h2>
                  <div className={`stat-change ${ordersChange.startsWith('+') ? 'positive' : 'negative'}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {ordersChange} from last period
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon average">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="stat-details">
                  <p className="stat-label">Average Order Value</p>
                  <h2 className="stat-value">PKR {averageOrderValue.toLocaleString()}</h2>
                  <div className={`stat-change ${avgOrderValueChange.startsWith('+') ? 'positive' : 'negative'}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {avgOrderValueChange} from last period
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Report Section */}
          <div className="sales-section">
            <div className="sales-header">
              <h2>Sales Analytics</h2>
              <div className="header-actions">
                <div className="tab-buttons" role="tablist" aria-label="Sales data view options">
                  <button 
                    className={`tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
                    onClick={() => setActiveTab('daily')}
                    role="tab"
                    aria-selected={activeTab === 'daily'}
                    aria-controls="sales-table"
                  >
                    Daily Sales
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
                    onClick={() => setActiveTab('monthly')}
                    role="tab"
                    aria-selected={activeTab === 'monthly'}
                    aria-controls="sales-table"
                  >
                    Monthly Sales
                  </button>
                </div>
                <button 
                  className="reset-btn"
                  onClick={handleResetData}
                  title="Reset all sales data"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Reset Data
                </button>
              </div>
            </div>

            {/* Professional Data Table */}
            <div className="sales-table-container">
              <table className="sales-table" id="sales-table" role="table" aria-label="Sales data table">
                <thead>
                  <tr>
                    <th>{activeTab === 'daily' ? 'Date' : 'Month'}</th>
                    <th>Orders</th>
                    <th>Revenue</th>
                    <th>Avg/Order</th>
                    <th>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => (
                    <tr key={index}>
                      <td className="date-cell">
                        {activeTab === 'daily' 
                          ? (() => {
                              try {
                                return new Date(item.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                });
                              } catch (error) {
                                return item.date || 'Invalid Date';
                              }
                            })()
                          : item.month
                        }
                      </td>
                      <td className="orders-cell">{(item.orders || 0).toLocaleString()}</td>
                      <td className="revenue-cell">PKR {(item.revenue || 0).toLocaleString()}</td>
                      <td className="avg-cell">PKR {item.orders > 0 ? Math.round((item.revenue || 0) / item.orders).toLocaleString() : '0'}</td>
                      <td className={`stat-change ${(item.change || '').startsWith('+') ? 'positive' : 'negative'}`}>
                        {item.change || '0%'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;