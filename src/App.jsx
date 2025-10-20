import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/contact.jsx";
import Auth from "./pages/Auth.jsx";
import Orders from "./pages/Orders.jsx";
import Header from "./components/shared/Header.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Splash from "./components/Splash/Splash.jsx";

function App() {
  // State to control authentication status - check localStorage on initial load
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('restaurantAuth');
    console.log('Initial auth check - savedAuth:', savedAuth);
    const authState = savedAuth ? JSON.parse(savedAuth).isAuthenticated : false;
    console.log('Initial auth state:', authState);
    return authState;
  });
  
  // State to store user data - load from localStorage on initial load
  const [user, setUser] = useState(() => {
    const savedAuth = localStorage.getItem('restaurantAuth');
    console.log('Initial user check - savedAuth:', savedAuth);
    const userData = savedAuth ? JSON.parse(savedAuth).user : null;
    console.log('Initial user data:', userData);
    return userData;
  });

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

  // Temporary debug function to test localStorage
  useEffect(() => {
    // Check if there's any auth data in localStorage
    const authData = localStorage.getItem('restaurantAuth');
    console.log('Current localStorage auth data:', authData);
    
    // If no auth data, create a test user for debugging
    if (!authData && !isAuthenticated) {
      console.log('No auth data found, creating test user for debugging...');
      const testUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        loginTime: new Date().toISOString(),
        isLogin: true
      };
      
      const testAuthData = {
        isAuthenticated: true,
        user: testUser,
        loginTime: new Date().toISOString()
      };
      
      // Uncomment the line below to enable test user for debugging
      // localStorage.setItem('restaurantAuth', JSON.stringify(testAuthData));
      console.log('Test auth data prepared:', testAuthData);
    }
  }, []);

  // Always show split screen with splash and auth (authentication required every time)
  if (!isAuthenticated) {
    console.log("Showing split screen - user not authenticated");
    return (
      <div className="permanent-split-screen">
        <div className="splash-half-permanent">
          <Splash />
        </div>
        <div className="auth-half-permanent">
          <Auth onAuthSuccess={handleAuthSuccess} />
        </div>
      </div>
    );
  }

  // Main app after authentication (only accessible after login)
  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <BottomNav />
    </>
  );
}

export default App;
