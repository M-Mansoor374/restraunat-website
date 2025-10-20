import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/images/logo.png";


const Header = ({ user, onLogout }) => {
  console.log('Header received user:', user);

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
          <p className="user-name">{user ? user.name : 'Guest'}</p>
          <p className="user-role">{user ? user.email : 'Not logged in'}</p>
        </div>
        
        {/* Logout Button */}
        {user && (
          <button 
            className="logout-btn"
            onClick={onLogout}
            title="Logout"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" 
                fill="white"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
