import React, { useEffect, useState } from 'react';
import './Splash.css';
import logo from '../../assets/images/logo.png';

const Splash = () => {
  // State to control animation visibility
  const [isVisible, setIsVisible] = useState(false);

  // useEffect hook runs when component mounts
  useEffect(() => {
    // Show animation after a small delay (50ms) to ensure smooth start
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    // Cleanup function to clear timer if component unmounts
    return () => {
      clearTimeout(showTimer);
    };
  }, []); // Empty dependency array - runs once on mount

  return (
    <div className="splash-container">
      {/* Background overlay for elegant effect */}
      <div className="splash-background"></div>
      
      {/* Main content container */}
      <div className="splash-content">
        {/* Logo container with animation */}
        <div className={`logo-container ${isVisible ? 'animate' : ''}`}>
          <img 
            src={logo} 
            alt="Restaurant Logo" 
            className="splash-logo"
          />
        </div>
        
        {/* Tagline with fade-in animation */}
        <div className={`tagline-container ${isVisible ? 'animate' : ''}`}>
          <h1 className="splash-tagline">Fine Dining. Redefined.</h1>
          <div className="tagline-underline"></div>
        </div>
        
        {/* Loading indicator */}
        <div className={`loading-container ${isVisible ? 'animate' : ''}`}>
          <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="decorative-elements">
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
        <div className="decorative-circle circle-3"></div>
      </div>
    </div>
  );
};

export default Splash;
