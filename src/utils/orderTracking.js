// Order tracking utility for MyAccount page
// This function should be called whenever an order is placed

export const trackOrder = (orderData) => {
  try {
    const { totalAmount, items } = orderData;
    // Ensure orderAmount is a valid number
    let orderAmount = 0;
    if (typeof totalAmount === 'number') {
      orderAmount = totalAmount;
    } else if (typeof totalAmount === 'string') {
      orderAmount = parseFloat(totalAmount) || 0;
    } else {
      orderAmount = 0;
    }
    
    // Validate orderAmount
    if (orderAmount <= 0 || !isFinite(orderAmount)) {
      console.error('Invalid order amount:', totalAmount, '->', orderAmount);
      return; // Don't track invalid orders
    }
    
    console.log('=== TRACKING ORDER ===');
    console.log('Order data received:', orderData);
    console.log('Total amount:', orderAmount);
    console.log('Items:', items);
    
    // CRITICAL: Update localStorage directly FIRST (in case MyAccount isn't mounted)
    updateSalesDataDirectly(orderAmount);
    
    // THEN dispatch custom event for MyAccount to listen to (if mounted)
    const orderEvent = new CustomEvent('orderPlaced', {
      detail: {
        orderAmount: orderAmount,
        items: items || [],
        timestamp: new Date().toISOString()
      }
    });
    
    console.log('Dispatching orderPlaced event with orderAmount:', orderAmount);
    window.dispatchEvent(orderEvent);
    console.log('=== ORDER TRACKED SUCCESSFULLY ===');
  } catch (error) {
    console.error('Error tracking order:', error);
  }
};

// Direct function to update sales data in localStorage (works even if MyAccount isn't mounted)
function updateSalesDataDirectly(orderAmount) {
  try {
    console.log('=== UPDATING SALES DATA DIRECTLY ===');
    console.log('Order amount to add:', orderAmount);
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const currentMonth = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    // Load existing sales data
    let salesData = { daily: [], monthly: [] };
    const savedData = localStorage.getItem('restaurantSalesData');
    
    if (savedData) {
      try {
        salesData = JSON.parse(savedData);
        console.log('Loaded existing sales data:', salesData);
      } catch (error) {
        console.error('Error parsing existing sales data:', error);
        salesData = { daily: [], monthly: [] };
      }
    }
    
    // Initialize if empty
    if (!salesData.daily || salesData.daily.length === 0) {
      salesData.daily = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        salesData.daily.push({
          date: date.toISOString().split('T')[0],
          orders: 0,
          revenue: 0,
          change: '0%'
        });
      }
    }
    
    if (!salesData.monthly || salesData.monthly.length === 0) {
      salesData.monthly = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date(today);
        date.setMonth(date.getMonth() - i);
        salesData.monthly.push({
          month: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          orders: 0,
          revenue: 0,
          change: '0%'
        });
      }
    }
    
    // Update daily data
    const dailyIndex = salesData.daily.findIndex(day => day.date === todayStr);
    if (dailyIndex !== -1) {
      salesData.daily[dailyIndex].orders += 1;
      salesData.daily[dailyIndex].revenue += orderAmount;
      console.log('Updated daily entry:', salesData.daily[dailyIndex]);
    } else {
      // Add new day if not exists
      salesData.daily.unshift({
        date: todayStr,
        orders: 1,
        revenue: orderAmount,
        change: '0%'
      });
      // Keep only last 7 days
      salesData.daily = salesData.daily.slice(0, 7);
    }
    
    // Update monthly data
    const monthlyIndex = salesData.monthly.findIndex(month => month.month === currentMonth);
    if (monthlyIndex !== -1) {
      salesData.monthly[monthlyIndex].orders += 1;
      salesData.monthly[monthlyIndex].revenue += orderAmount;
      console.log('Updated monthly entry:', salesData.monthly[monthlyIndex]);
    } else {
      // Add new month if not exists
      salesData.monthly.unshift({
        month: currentMonth,
        orders: 1,
        revenue: orderAmount,
        change: '0%'
      });
      // Keep only last 6 months
      salesData.monthly = salesData.monthly.slice(0, 6);
    }
    
    // Save to localStorage
    localStorage.setItem('restaurantSalesData', JSON.stringify(salesData));
    console.log('Sales data saved to localStorage:', salesData);
    console.log('=== SALES DATA UPDATED DIRECTLY ===');
    
  } catch (error) {
    console.error('Error updating sales data directly:', error);
  }
}

// Function to reset all sales data (useful for testing or admin purposes)
export const resetSalesData = () => {
  try {
    localStorage.removeItem('restaurantSalesData');
    console.log('Sales data reset successfully');
  } catch (error) {
    console.error('Error resetting sales data:', error);
  }
};

// Function to get current sales data (useful for debugging)
export const getSalesData = () => {
  try {
    const data = localStorage.getItem('restaurantSalesData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting sales data:', error);
    return null;
  }
};
