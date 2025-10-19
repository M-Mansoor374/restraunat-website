import React, { useState, useEffect } from "react";
import "./Home.css";

// Dummy product data - same as in Cart component
const DUMMY_PRODUCTS = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, image: '🍕' },
  { id: 2, name: 'Caesar Salad', price: 8.99, image: '🥗' },
  { id: 3, name: 'Chicken Burger', price: 14.99, image: '🍔' },
  { id: 4, name: 'Pasta Carbonara', price: 16.99, image: '🍝' },
  { id: 5, name: 'Fish & Chips', price: 13.99, image: '🐟' },
  { id: 6, name: 'Chocolate Cake', price: 6.99, image: '🍰' }
];

const Home = () => {
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('restaurantCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart data to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('restaurantCart', JSON.stringify(cartItems));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }, [cartItems]);

  // Function to add item to cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Calculate total items count
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="text-yellow-400">Restaurant</span>
          </h1>
          <p className="hero-subtitle">
            Experience culinary excellence with our signature dishes crafted with passion and fresh ingredients
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">
              View Menu
            </button>
            <button className="btn-secondary">
              Make Reservation
            </button>
          </div>
        </div>
        
        {/* Cart Badge */}
        {totalItems > 0 && (
          <div className="cart-badge">
            <span className="cart-count">{totalItems}</span>
            <span className="cart-text">items in cart</span>
          </div>
        )}
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator"></div>
      </section>

      {/* Featured Dishes Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Dishes</h2>
            <p className="section-subtitle">
              Discover our most popular and signature dishes that keep our customers coming back
            </p>
          </div>
          
          <div className="responsive-grid">
            {DUMMY_PRODUCTS.map(product => (
              <div key={product.id} className="professional-card">
                <div className="card-image">
                  <div className="product-emoji">{product.image}</div>
                  <div className="card-price">${product.price.toFixed(2)}</div>
              </div>
              <div className="card-content">
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-subtitle">Fresh & Delicious</p>
                <p className="card-description">
                    A delicious dish made with fresh ingredients and traditional cooking methods.
                  </p>
                  <button 
                    className="btn-primary w-full"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                </button>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="about-content">
            <div>
              <h2 className="section-title text-left">Our Story</h2>
              <p className="about-text">
                For over two decades, we've been serving exceptional cuisine that brings people together. 
                Our passion for food and commitment to quality has made us a beloved destination for 
                food lovers in the community.
              </p>
              <p className="about-text">
                Every dish is crafted with love, using the freshest ingredients and traditional cooking 
                methods passed down through generations. We believe that great food creates lasting memories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary">
                  Learn More
                </button>
                <button className="btn-secondary" style={{color: '#f59e0b', borderColor: '#f59e0b'}}>
                  Visit Us
                </button>
              </div>
            </div>
            <div className="about-image">
              <div>
                <div className="about-image-content">🍽️</div>
                <h3 className="about-image-title">Culinary Excellence</h3>
                <p className="about-image-subtitle">Since 2000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title text-white">Why Choose Us</h2>
            <p className="section-subtitle text-gray-300">Numbers that speak for our excellence</p>
          </div>
          
          <div className="stats-grid">
            <div className="stats-card">
              <span className="stat-number">500+</span>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stats-card">
              <span className="stat-number">50+</span>
              <div className="stat-label">Menu Items</div>
            </div>
            <div className="stats-card">
              <span className="stat-number">20+</span>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stats-card">
              <span className="stat-number">24/7</span>
              <div className="stat-label">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Experience Great Food?</h2>
          <p className="cta-subtitle">
            Book your table today and join thousands of satisfied customers who trust us with their dining experience.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary" style={{background: 'white', color: '#1e3a8a'}}>
              Make Reservation
            </button>
            <button className="btn-secondary">
              Call Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;