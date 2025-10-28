import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./Header.css";

const Header = ({ user, onLogout }) => {
  console.log('Header received user:', user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/menu');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-toggle')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, mobileMenuOpen]);

  return (
    <>
      <header className="header">
        {/* Logo section */}
        <div className="logo-section" onClick={handleLogoClick}>
          <Logo size="medium" showText={true} />
        </div>

        {/* Desktop Navigation - Horizontal */}
        <nav className="header-actions desktop-nav">
          {/* Cart Button */}
          <button 
            className="nav-btn cart-btn"
            onClick={() => handleMenuClick('/cart')}
            title="View Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 18C8.1 18 9 18.9 9 20C9 21.1 8.1 22 7 22C5.9 22 5 21.1 5 20C5 18.9 5.9 18 7 18ZM1 2H2L4 12H20L22 5H6L5 7H20L19 11H5L4 2H1Z" fill="currentColor"/>
            </svg>
            <span>Cart</span>
          </button>

          {/* Menu Button */}
          <button 
            className="nav-btn menu-btn"
            onClick={() => handleMenuClick('/menu')}
            title="View Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z" fill="currentColor"/>
            </svg>
            <span>Menu</span>
          </button>

          {/* Account Dropdown */}
          <div className="account-menu-wrapper" ref={dropdownRef}>
            <button 
              className="nav-btn account-btn"
              onClick={toggleDropdown}
              title="Account"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
              </svg>
              <span>Account</span>
              <svg className="chevron-down" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>

            {/* Desktop Dropdown Menu */}
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
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          title="Menu"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {mobileMenuOpen ? (
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="white"/>
            ) : (
              <path d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z" fill="white"/>
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown" ref={mobileMenuRef}>
          <div className="mobile-dropdown-content">
            {/* User Info Section */}
            {user && (
              <div className="mobile-user-info">
                <div className="mobile-user-avatar">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                    <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="mobile-user-details">
                  <p className="mobile-user-name">Welcome back, {user.name}</p>
                  <p className="mobile-user-email">{user.email}</p>
                  <div className="mobile-user-status">
                    <div className="status-dot"></div>
                    <span>ACTIVE</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Menu Items */}
            <div className="mobile-menu-items">
              <div className="mobile-menu-item" onClick={() => handleMenuClick('/cart')}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C8.1 18 9 18.9 9 20C9 21.1 8.1 22 7 22C5.9 22 5 21.1 5 20C5 18.9 5.9 18 7 18ZM1 2H2L4 12H20L22 5H6L5 7H20L19 11H5L4 2H1Z" fill="currentColor"/>
                </svg>
                <span>Cart</span>
              </div>

              <div className="mobile-menu-item" onClick={() => handleMenuClick('/menu')}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z" fill="currentColor"/>
                </svg>
                <span>Menu</span>
              </div>

              <div className="mobile-menu-item" onClick={() => handleMenuClick('/my-account')}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
                </svg>
                <span>My Account</span>
              </div>

              <div className="mobile-menu-item" onClick={() => handleMenuClick('/privacy-policy')}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" fill="currentColor"/>
                </svg>
                <span>Privacy Policy</span>
              </div>

              <div className="mobile-menu-item" onClick={() => handleMenuClick('/terms-of-service')}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor"/>
                </svg>
                <span>Terms of Service</span>
              </div>

              <div className="mobile-menu-divider"></div>

              {user && (
                <div className="mobile-menu-item logout" onClick={onLogout}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7Z" fill="currentColor"/>
                    <path d="M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="currentColor"/>
                  </svg>
                  <span>Logout</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
