import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// Dummy product data - matching Menu.jsx structure
const DUMMY_PRODUCTS = [
  { id: 1, name: 'Caesar Salad', price: 12.99, image: '🥗', description: 'Fresh romaine lettuce, parmesan cheese, croutons, and our signature Caesar dressing' },
  { id: 2, name: 'Buffalo Wings', price: 15.99, image: '🍗', description: 'Crispy chicken wings tossed in our spicy buffalo sauce, served with ranch dip' },
  { id: 3, name: 'Mozzarella Sticks', price: 11.99, image: '🧀', description: 'Golden fried mozzarella sticks served with marinara sauce' },
  { id: 4, name: 'Grilled Salmon', price: 24.99, image: '🐟', description: 'Fresh Atlantic salmon grilled to perfection with herbs and lemon butter' },
  { id: 5, name: 'Chocolate Cake', price: 8.99, image: '🍰', description: 'Rich chocolate cake with vanilla ice cream' },
  { id: 6, name: 'Fresh Lemonade', price: 4.99, image: '🧃', description: 'House-made lemonade with fresh lemons and mint' }
];

const Home = () => {
  const navigate = useNavigate();

  // Function to add item to cart and navigate to cart page
  const addToCart = (product) => {
    console.log('=== HOME ADD TO CART DEBUG ===');
    console.log('Adding product to cart:', product);
    
    // Ensure product has all required properties
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || '🍽️',
      description: product.description || 'Delicious item'
    };
    
    console.log('Processed cart item:', cartItem);
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('restaurantCart') || '[]');
    console.log('Existing cart before update:', existingCart);
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Item exists, increase quantity
      existingCart[existingItemIndex].quantity += 1;
      console.log('Item exists, increasing quantity to:', existingCart[existingItemIndex].quantity);
    } else {
      // Item doesn't exist, add new item with quantity 1
      existingCart.push(cartItem);
      console.log('New item added to cart:', cartItem);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('restaurantCart', JSON.stringify(existingCart));
    console.log('Cart updated and saved:', existingCart);
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    console.log('Cart update event dispatched');
    
    // Navigate to cart page with a small delay to ensure localStorage is saved
    console.log('Navigating to cart page...');
    setTimeout(() => {
      navigate('/cart');
      console.log('=== END HOME ADD TO CART DEBUG ===');
    }, 100);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="highlight-text">Restaurant</span>
          </h1>
          <p className="hero-subtitle">
            Experience culinary excellence with our signature dishes crafted with passion and fresh ingredients
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary"
              onClick={() => navigate('/menu')}
            >
              View Menu
            </button>
            <button 
              className="btn-secondary"
              onClick={() => navigate('/contact')}
            >
              Make Reservation
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator"></div>
      </section>

      {/* Featured Dishes Section */}
      <section className="section-padding featured-section">
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
                    className="btn-primary full-width"
                    onClick={() => addToCart(product)}
                  >
                    Add to Order
                  </button>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding about-section">
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
              <div className="about-buttons">
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
      <section className="section-padding stats-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title white-text">Why Choose Us</h2>
            <p className="section-subtitle light-text">Numbers that speak for our excellence</p>
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
            <button 
              className="btn-primary" 
              style={{background: 'white', color: '#1e3a8a'}}
              onClick={() => navigate('/contact')}
            >
              Make Reservation
            </button>
            <button 
              className="btn-secondary"
              onClick={() => window.open('tel:+1234567890', '_self')}
            >
              Call Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;