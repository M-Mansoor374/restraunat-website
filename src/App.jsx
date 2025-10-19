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
  // State to control splash screen visibility
  const [showSplash, setShowSplash] = useState(true);

  // Effect to hide splash screen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Show splash screen for first 3 seconds
  if (showSplash) {
    return <Splash />;
  }

  // Main app after splash screen
  return (
    <>
      <Header /> {/* ✅ Now it's outside <Routes> */}
     
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      
      <BottomNav /> {/* ✅ Bottom navigation for all pages */}
    </>
  );
}

export default App;
