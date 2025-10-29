import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Menu from "./pages/Menu.jsx";
import Auth from "./components/forms/Auth.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import Header from "./components/layout/Header.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Splash from "./components/ui/Splash/Splash.jsx";
import "./App.css";

function App() {
  // State to control splash screen visibility
  const [showSplash, setShowSplash] = useState(true);
  const [splashFadeOut, setSplashFadeOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // State to control authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // State to store user data
  const [user, setUser] = useState(null);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedAuth = localStorage.getItem('restaurantAuth');
        if (savedAuth) {
          const authData = JSON.parse(savedAuth);
          if (authData.isAuthenticated && authData.user) {
            console.log('Restored authentication from localStorage:', authData);
            setIsAuthenticated(true);
            setUser(authData.user);
            setShowSplash(false);
          }
        }
      } catch (error) {
        console.error('Error restoring authentication:', error);
        localStorage.removeItem('restaurantAuth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show splash screen for 3 seconds when user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setShowSplash(true);
      setSplashFadeOut(false);
      
      // Start fade out at 2.5 seconds
      const fadeOutTimer = setTimeout(() => {
        setSplashFadeOut(true);
      }, 2500);
      
      // Hide splash completely at 3 seconds
      const splashTimer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(splashTimer);
      };
    } else {
      setShowSplash(false);
    }
  }, [isAuthenticated]);

  // Function to handle successful authentication
  const handleAuthSuccess = (userData) => {
    console.log('Auth success - userData:', userData);
    // Update state and persist to localStorage
    setIsAuthenticated(true);
    setUser(userData);
    
    // Save authentication state to localStorage
    const authData = {
      isAuthenticated: true,
      user: userData,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('restaurantAuth', JSON.stringify(authData));
    console.log('Auth data saved to localStorage:', authData);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Reset authentication state and clear localStorage
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('restaurantAuth');
  };

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log('App state changed - isAuthenticated:', isAuthenticated, 'user:', user);
  }, [isAuthenticated, user]);

  // Show loading state while checking authentication
  if (isLoading) {
    return null; // Or a loading spinner
  }

  // Show splash screen for 3 seconds, then show auth page (only on first visit)
  if (!isAuthenticated) {
    if (showSplash) {
      console.log("Showing splash screen");
      return (
        <div className={`splash-wrapper ${splashFadeOut ? 'fade-out' : ''}`}>
          <Splash />
        </div>
      );
    }
    
    console.log("Showing auth page");
    return (
      <div className="auth-fade-in">
        <Auth onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  // Main app after authentication (only accessible after login)
  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/menu" replace />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/my-account" element={<MyAccount user={user} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
