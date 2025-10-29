// Order tracking utility for MyAccount page
// This function should be called whenever an order is placed

export const trackOrder = (orderData) => {
  try {
    const { totalAmount, items } = orderData;
    
    console.log('=== TRACKING ORDER ===');
    console.log('Order data received:', orderData);
    console.log('Total amount:', totalAmount);
    console.log('Items:', items);
    
    // Dispatch custom event for MyAccount to listen to
    const orderEvent = new CustomEvent('orderPlaced', {
      detail: {
        orderAmount: totalAmount || 0,
        items: items || [],
        timestamp: new Date().toISOString()
      }
    });
    
    console.log('Dispatching orderPlaced event with orderAmount:', totalAmount || 0);
    window.dispatchEvent(orderEvent);
    console.log('=== ORDER TRACKED SUCCESSFULLY ===');
  } catch (error) {
    console.error('Error tracking order:', error);
  }
};

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
