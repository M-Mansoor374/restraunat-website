import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./Header.css";


const Header = ({ user, onLogout }) => {
  console.log('Header received user:', user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="header">
      {/* Logo section */}
      <div className="logo-section" onClick={handleLogoClick}>
        <Logo size="medium" showText={true} />
      </div>

      {/* Header Actions */}
      <div className="header-actions">
        {/* Cart Button */}
        <button 
          className="cart-btn"
          onClick={() => navigate('/cart')}
          title="View Cart"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" 
              fill="white"
            />
            <path 
              d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z" 
              fill="white"
            />
          </svg>
          <span>Cart</span>
        </button>

        {/* Menu Page Button (with text) */}
        <button 
          className="menu-page-btn"
          onClick={() => navigate('/menu')}
          title="View Menu"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z" 
              fill="white"
            />
          </svg>
          <span>Menu</span>
        </button>

        {/* Account Dropdown Button (Icon only - Masterpiece) */}
        <div className="account-menu-wrapper" ref={dropdownRef}>
          <button 
            className="account-dropdown-btn"
            onClick={toggleDropdown}
            title="Account & Settings"
          >
            <div className="btn-inner">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" 
                  fill="white"
                />
              </svg>
              <div className="pulse-ring"></div>
            </div>
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              {/* User Info Section */}
              {user && (
                <div className="user-info-section">
                  <div className="user-avatar-small">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                      <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="user-details-small">
                    <p className="user-name-small">Welcome back, {user.name}</p>
                    <p className="user-email-small">{user.email}</p>
                    <div className="user-status-small">
                      <div className="status-dot"></div>
                      <span>ACTIVE</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="dropdown-item" onClick={() => handleMenuClick('/my-account')}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
                </svg>
                <span>My Account</span>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuClick('/privacy-policy')}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
                </svg>
                <span>Privacy Policy</span>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuClick('/terms-of-service')}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="currentColor"/>
                </svg>
                <span>Terms of Service</span>
              </div>
              
              {/* Logout Button */}
              {user && (
                <div className="dropdown-item logout-item" onClick={onLogout}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="currentColor"/>
                  </svg>
                  <span>Logout</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </header>
  );
};

export default Header;
