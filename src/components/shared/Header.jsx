import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/images/logo.png";


const Header = () => {
  // State to store cart items count
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Load cart data from localStorage when component mounts
  useEffect(() => {
    const loadCartCount = () => {
      const savedCart = localStorage.getItem('restaurantCart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemsCount(totalItems);
      }
    };

    // Load initial count
    loadCartCount();

    // Listen for storage changes (when cart is updated from other tabs/components)
    const handleStorageChange = (e) => {
      if (e.key === 'restaurantCart') {
        loadCartCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom cart update events
    const handleCartUpdate = () => {
      loadCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <header className="header">
      {/* Logo section */}
      <div className="logo-section">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Restaurant</h1>
      </div>

      {/* Navigation links */}
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Search bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search for dishes..." />
        <button>Search</button>
      </div>

      {/* Cart Button */}
      <Link to="/cart" className="cart-button">
        <div className="cart-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {cartItemsCount > 0 && (
            <span className="cart-badge">{cartItemsCount}</span>
          )}
        </div>
        <span className="cart-text">Cart</span>
      </Link>

      {/* Logged-in user details */}
      <div className="user-info">
        {/* Profile Picture */}
        <div className="user-avatar">
          <svg 
            className="user-avatar-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
              fill="white"
            />
            <path 
              d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" 
              fill="white"
            />
          </svg>
        </div>
        
        <div className="user-details">
          <p className="user-name">Muhammad Mansoor</p>
          <p className="user-role">Admin</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
