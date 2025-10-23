import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium', showText = true, className = '' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'logo-small';
      case 'large':
        return 'logo-large';
      default:
        return 'logo-medium';
    }
  };

  return (
    <div className={`logo-container ${getSizeClasses()} ${className}`}>
      {/* Logo Icon */}
      <div className="logo-icon">
        <svg 
          viewBox="0 0 60 60" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="logo-svg"
        >
          {/* Main geometric A shape with circuit board aesthetic */}
          <path 
            d="M30 5L15 25H25V35H35V25H45L30 5Z" 
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="1"
          />
          {/* Circuit board lines */}
          <path 
            d="M20 20L25 15M35 15L40 20M25 30L30 25M30 25L35 30" 
            stroke="#ffffff" 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
          {/* Circuit dots */}
          <circle cx="25" cy="20" r="2" fill="#ffffff"/>
          <circle cx="35" cy="20" r="2" fill="#ffffff"/>
          <circle cx="30" cy="30" r="2" fill="#ffffff"/>
          {/* Additional tech elements */}
          <rect x="22" y="40" width="16" height="2" rx="1" fill="#ffffff" opacity="0.8"/>
          <rect x="25" y="45" width="10" height="1.5" rx="0.75" fill="#ffffff" opacity="0.6"/>
        </svg>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="logo-text">
          <div className="company-name">
            <span className="apex">APEXI</span>
            <span className="ums">UMS</span>
          </div>
          <div className="technologies">
            <span className="tech">TECHN</span>
            <span className="ologies">OLOGIES</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
