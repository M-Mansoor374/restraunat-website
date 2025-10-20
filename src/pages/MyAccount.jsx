import React, { useState } from 'react';
import './MyAccount.css';

const MyAccount = ({ user }) => {
  const [activeTab, setActiveTab] = useState('daily');

  // Sample sales data - you can replace this with real data from your backend
  const dailySales = [
    { date: '2025-10-20', orders: 45, revenue: 350140 },
    { date: '2025-10-19', orders: 52, revenue: 406210 },
    { date: '2025-10-18', orders: 38, revenue: 274470 },
    { date: '2025-10-17', orders: 61, revenue: 470400 },
    { date: '2025-10-16', orders: 55, revenue: 425740 },
    { date: '2025-10-15', orders: 48, revenue: 375270 },
    { date: '2025-10-14', orders: 42, revenue: 322210 }
  ];

  const monthlySales = [
    { month: 'October 2025', orders: 1245, revenue: 9917740 },
    { month: 'September 2025', orders: 1180, revenue: 9310210 },
    { month: 'August 2025', orders: 1320, revenue: 10609270 },
    { month: 'July 2025', orders: 1410, revenue: 11235000 },
    { month: 'June 2025', orders: 1290, revenue: 10287340 },
    { month: 'May 2025', orders: 1350, revenue: 10796870 }
  ];

  // Calculate totals
  const dailyTotal = dailySales.reduce((sum, day) => sum + day.revenue, 0);
  const monthlyTotal = monthlySales.reduce((sum, month) => sum + month.revenue, 0);
  const totalOrders = activeTab === 'daily' 
    ? dailySales.reduce((sum, day) => sum + day.orders, 0)
    : monthlySales.reduce((sum, month) => sum + month.orders, 0);

  return (
    <div className="my-account-page">
      <div className="account-container">
        {/* Header Section */}
        <div className="account-header">
          <div className="user-profile">
            <div className="user-avatar-large">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <h1>Welcome, {user ? user.name : 'Guest'}</h1>
              <p>{user ? user.email : 'guest@example.com'}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon revenue">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-details">
              <p className="stat-label">Total Revenue</p>
              <h2 className="stat-value">PKR {(activeTab === 'daily' ? dailyTotal : monthlyTotal).toLocaleString()}</h2>
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
              <h2 className="stat-value">{totalOrders}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon average">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-details">
              <p className="stat-label">Average Order</p>
              <h2 className="stat-value">PKR {(activeTab === 'daily' ? (dailyTotal / totalOrders) : (monthlyTotal / totalOrders)).toLocaleString()}</h2>
            </div>
          </div>
        </div>

        {/* Sales Tabs */}
        <div className="sales-section">
          <div className="sales-header">
            <h2>Sales Report</h2>
            <div className="tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
                onClick={() => setActiveTab('daily')}
              >
                Daily Sales
              </button>
              <button 
                className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
                onClick={() => setActiveTab('monthly')}
              >
                Monthly Sales
              </button>
            </div>
          </div>

          {/* Sales Table */}
          <div className="sales-table-container">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>{activeTab === 'daily' ? 'Date' : 'Month'}</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                  <th>Avg/Order</th>
                </tr>
              </thead>
              <tbody>
                {activeTab === 'daily' 
                  ? dailySales.map((day, index) => (
                      <tr key={index}>
                        <td className="date-cell">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td className="orders-cell">{day.orders}</td>
                        <td className="revenue-cell">PKR {day.revenue.toLocaleString()}</td>
                        <td className="avg-cell">PKR {(day.revenue / day.orders).toLocaleString()}</td>
                      </tr>
                    ))
                  : monthlySales.map((month, index) => (
                      <tr key={index}>
                        <td className="date-cell">{month.month}</td>
                        <td className="orders-cell">{month.orders}</td>
                        <td className="revenue-cell">PKR {month.revenue.toLocaleString()}</td>
                        <td className="avg-cell">PKR {(month.revenue / month.orders).toLocaleString()}</td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

