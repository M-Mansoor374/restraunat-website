import React, { useEffect, useState } from 'react';
import './Splash.css';

const Splash = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  return (
    <div className={`splash-container ${isVisible ? 'is-visible' : ''}`}>
      <div className="splash-background" />

      <div className="decorative-elements">
        <div className="decorative-circle circle-1" />
        <div className="decorative-circle circle-2" />
        <div className="decorative-circle circle-3" />
      </div>

      <div className={`splash-card ${isVisible ? 'card-in' : ''}`}>
        <img
          src="/logo.jpg"
          alt="Apexiums Technologies logo"
          className="splash-logo-img"
        />

        <span className="splash-preheading">Welcome to</span>
        <h1 className="splash-title">Apexiums Restaurant</h1>
        <p className="splash-subtitle">
          Premium POS dining experiences crafted by Apexiums Technologies. Seamless service,
          curated menus, and intelligent insights for modern hospitality teams.
        </p>

        <div className="splash-divider" />

        <div className="splash-meta">
          <div className="meta-item">
            <span className="meta-label">Experience</span>
            <span className="meta-value">Since 2012</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Coverage</span>
            <span className="meta-value">Global Kitchens</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Speciality</span>
            <span className="meta-value">Fine Dining &amp; POS</span>
          </div>
        </div>

        <div className="splash-progress">
          <span className="progress-bar" />
          <span className="progress-caption">Preparing your experience…</span>
        </div>
      </div>
    </div>
  );
};

export default Splash;
