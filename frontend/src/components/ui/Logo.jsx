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
        <img 
          src="/logo.jpg" 
          alt="APEXIUMS TECHNOLOGIES Logo"
          className="logo-img"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain',
            display: 'block'
          }}
          onError={(e) => {
            console.error('Image failed to load:', e.target.src);
            console.error('Error details:', e);
            e.target.style.display = 'none';
            // Show fallback text
            const fallback = document.createElement('div');
            fallback.textContent = 'LOGO';
            fallback.style.cssText = 'color: #20B2AA; font-weight: bold; font-size: 12px;';
            e.target.parentNode.appendChild(fallback);
          }}
          onLoad={() => {
            console.log('APEXIUMS logo loaded successfully');
          }}
        />
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
