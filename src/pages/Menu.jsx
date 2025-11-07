import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [notification, setNotification] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());
  
  // Scroll to top when component mounts or route changes
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      // Also try scrollTo on document element for better compatibility
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    });
  }, [location.pathname]);

  // Function to add item to cart and navigate to cart page
  const addToCart = (item) => {
    // Ensure item has all required properties
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image || '🍽️',
      description: item.description || 'Delicious item',
      category: item.category || 'Menu Item'
    };
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('restaurantCart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('restaurantCart', JSON.stringify(existingCart));
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    // Show success notification
    setNotification(`✓ ${item.name} added to cart!`);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const menuCategories = [
    { id: "all", name: "All Items" },
    { id: "appetizers", name: "Appetizers" },
    { id: "mains", name: "Main Courses" },
    { id: "desserts", name: "Desserts" },
    { id: "beverages", name: "Beverages" }
  ];

  const menuItems = [
    // Appetizers
    {
      id: 1,
      name: "Caesar Salad",
      description: "Fresh romaine lettuce, parmesan cheese, croutons, and our signature Caesar dressing",
      price: 3640,
      category: "appetizers",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      popular: true
    },
    {
      id: 2,
      name: "Buffalo Wings",
      description: "Crispy chicken wings tossed in our spicy buffalo sauce, served with ranch dip",
      price: 4480,
      category: "appetizers",
      image: "https://images.pexels.com/photos/4106488/pexels-photo-4106488.jpeg?auto=compress&cs=tinysrgb&w=800",
      popular: true
    },
    {
      id: 3,
      name: "Mozzarella Sticks",
      description: "Golden fried mozzarella sticks served with marinara sauce",
      price: 2800,
      category: "appetizers",
      image: "https://images.pexels.com/photos/7084862/pexels-photo-7084862.jpeg?auto=compress&cs=tinysrgb&w=800",
      popular: true
    },
    {
      id: 4,
      name: "Bruschetta",
      description: "Toasted bread topped with fresh tomatoes, basil, and garlic",
      price: 3360,
      category: "appetizers",
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
      popular: true
    },

    // Main Courses
    {
      id: 5,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon, served with seasonal vegetables",
      price: 7000,
      category: "mains",
      image: "https://images.pexels.com/photos/3298637/pexels-photo-3298637.jpeg?auto=compress&cs=tinysrgb&w=800",
      popular: true
    },
    {
      id: 6,
      name: "Beef Steak",
      description: "Premium Angus beef steak cooked to your preference with our signature marinade and sides",
      price: 9240,
      category: "mains",
      image: "https://images.pexels.com/photos/4106483/pexels-photo-4106483.jpeg?auto=compress&cs=tinysrgb&w=800",
      popular: true
    },
    {
      id: 7,
      name: "Pasta Carbonara",
      description: "Authentic Italian pasta with creamy sauce, pancetta, and parmesan cheese",
      price: 5320,
      category: "mains",
      image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 8,
      name: "Chicken Parmesan",
      description: "Breaded chicken breast topped with marinara sauce and melted mozzarella, served with pasta",
      price: 6440,
      category: "mains",
      image: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 9,
      name: "Vegetarian Risotto",
      description: "Creamy arborio rice with seasonal vegetables and parmesan cheese",
      price: 5600,
      category: "mains",
      image: "https://images.pexels.com/photos/58723/pexels-photo-58723.jpeg?auto=compress&cs=tinysrgb&w=800"
    },

    // Desserts
    {
      id: 10,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center, served with vanilla ice cream",
      price: 2520,
      category: "desserts",
      image: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=800",
      popular: true
    },
    {
      id: 11,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
      price: 2240,
      category: "desserts",
      image: "https://images.pexels.com/photos/4110005/pexels-photo-4110005.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 12,
      name: "Cheesecake",
      description: "New York style cheesecake with berry compote",
      price: 1960,
      category: "desserts",
      image: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=800"
    },

    // Beverages
    {
      id: 13,
      name: "Fresh Lemonade",
      description: "House-made lemonade with fresh lemons and mint",
      price: 1400,
      category: "beverages",
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 14,
      name: "Signature Coffee",
      description: "Freshly brewed Arabica coffee with optional flavors and cream",
      price: 1600,
      category: "beverages",
      image: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 15,
      name: "Artisan Tea",
      description: "Premium loose-leaf teas with herbal and classic blends",
      price: 1500,
      category: "beverages",
      image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Function to handle image load errors
  const handleImageError = (itemId) => {
    setImageErrors(prev => new Set([...prev, itemId]));
  };

  return (
    <main className="menu-page">
      {/* Success Notification */}
      {notification && (
        <div className="cart-notification">
          {notification}
        </div>
      )}

      {/* Hero Section */}
      <section className="menu-hero">
        <div className="container">
          <div className="menu-hero-content">
            <h1 className="menu-hero-title">Our Menu</h1>
            <p className="menu-hero-subtitle">
              Discover our carefully crafted dishes made with the finest ingredients
            </p>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="menu-categories-section">
        <div className="container">
          <div className="menu-categories">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="menu-items-section">
        <div className="container">
          <div className="menu-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="menu-item-card">
                <div 
                  className={`menu-item-image ${imageErrors.has(item.id) ? 'error' : ''}`}
                >
                  {!imageErrors.has(item.id) && (
                    <img 
                      src={(item.image || '').replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')}
                      alt={item.name}
                      onError={() => handleImageError(item.id)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  )}
                  {imageErrors.has(item.id) && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      fontSize: '3rem',
                      opacity: 0.5
                    }}>
                      🍽️
                    </div>
                  )}
                  {item.popular && (
                    <div className="popular-badge">Popular</div>
                  )}
                </div>
                <div className="menu-item-content">
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className="menu-item-price">PKR {item.price.toLocaleString()}</span>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                  <button 
                    className="menu-item-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(item);
                    }}
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="special-offers-section">
        <div className="container">
          <div className="special-offers-content">
            <h2 className="special-offers-title">Special Offers</h2>
            <div className="offers-grid">
              <div className="offer-card family-offer">
                <div className="offer-image"></div>
                <div className="offer-content">
                  <div className="offer-icon">🍽️</div>
                  <h3 className="offer-title">Family Dinner</h3>
                  <p className="offer-description">Get 20% off when you order for 4 or more people</p>
                  <span className="offer-code">Code: FAMILY20</span>
                </div>
              </div>
              <div className="offer-card wine-offer">
                <div className="offer-image"></div>
                <div className="offer-content">
                  <div className="offer-icon">🍷</div>
                  <h3 className="offer-title">Wine Wednesday</h3>
                  <p className="offer-description">50% off all wine bottles every Wednesday</p>
                  <span className="offer-code">Code: WINE50</span>
                </div>
              </div>
              <div className="offer-card dessert-offer">
                <div className="offer-image"></div>
                <div className="offer-content">
                  <div className="offer-icon">🎂</div>
                  <h3 className="offer-title">Dessert Combo</h3>
                  <p className="offer-description">Buy 2 desserts and get 1 free</p>
                  <span className="offer-code">Code: DESSERT3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Menu;
