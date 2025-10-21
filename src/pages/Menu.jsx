import React, { useState } from "react";
import "./Menu.css";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [notification, setNotification] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());
  
  // Debug log to check if component is rendering
  console.log("Menu component is rendering");

  // Function to add item to cart and navigate to cart page
  const addToCart = (item) => {
    console.log('=== ADD TO CART DEBUG ===');
    console.log('Adding item to cart:', item);
    
    // Ensure item has all required properties
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image || '🍽️',
      description: item.description || 'Delicious item'
    };
    
    console.log('Processed cart item:', cartItem);
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('restaurantCart') || '[]');
    console.log('Existing cart before update:', existingCart);
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);
    
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
    console.log('Cart updated and saved to localStorage:', existingCart);
    
    // Verify localStorage was saved
    const verifyCart = localStorage.getItem('restaurantCart');
    console.log('Verification - localStorage contains:', verifyCart);
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    console.log('Cart update event dispatched');
    
    // Show success notification
    setNotification(`✓ ${item.name} added to cart!`);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    
    console.log('=== END ADD TO CART DEBUG ===');
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
      image: "url('https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
      popular: true
    },
    {
      id: 2,
      name: "Buffalo Wings",
      description: "Crispy chicken wings tossed in our spicy buffalo sauce, served with ranch dip",
      price: 4480,
      category: "appetizers",
      image: "url('https://images.unsplash.com/photo-1567620832904-9fe5cf23db13?w=1000&h=600&fit=crop&crop=center')",
      popular: true
    },
    {
      id: 3,
      name: "Mozzarella Sticks",
      description: "Golden fried mozzarella sticks served with marinara sauce",
      price: 2800,
      category: "appetizers",
      image: "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1000&h=600&fit=crop&crop=center')",
      popular: true
    },
    {
      id: 4,
      name: "Bruschetta",
      description: "Toasted bread topped with fresh tomatoes, basil, and garlic",
      price: 3360,
      category: "appetizers",
      image: "url('https://images.unsplash.com/photo-1572441713132-51c75654db73?w=1000&h=600&fit=crop&crop=center')",
      popular: true
    },

    // Main Courses
    {
      id: 5,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon, served with seasonal vegetables",
      price: 7000,
      category: "mains",
      image: "url('https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
      popular: true
    },
    {
      id: 6,
      name: "Beef Steak",
      description: "Premium Angus beef steak cooked to your preference with our signature marinade and sides",
      price: 9240,
      category: "mains",
      image: "url('https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
      popular: true
    },
    {
      id: 7,
      name: "Pasta Carbonara",
      description: "Authentic Italian pasta with creamy sauce, pancetta, and parmesan cheese",
      price: 5320,
      category: "mains",
      image: "url('https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=1000&h=600&fit=crop&crop=center')"
    },
    {
      id: 8,
      name: "Chicken Parmesan",
      description: "Breaded chicken breast topped with marinara sauce and melted mozzarella, served with pasta",
      price: 6440,
      category: "mains",
      image: "url('https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
    },
    {
      id: 9,
      name: "Vegetarian Risotto",
      description: "Creamy arborio rice with seasonal vegetables and parmesan cheese",
      price: 5600,
      category: "mains",
      image: "url('https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
    },

    // Desserts
    {
      id: 10,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center, served with vanilla ice cream",
      price: 2520,
      category: "desserts",
      image: "url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
      popular: true
    },
    {
      id: 11,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
      price: 2240,
      category: "desserts",
      image: "url('https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
    },
    {
      id: 12,
      name: "Cheesecake",
      description: "New York style cheesecake with berry compote",
      price: 1960,
      category: "desserts",
      image: "url('https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
    },

    // Beverages
    {
      id: 13,
      name: "Fresh Lemonade",
      description: "House-made lemonade with fresh lemons and mint",
      price: 1400,
      category: "beverages",
      image: "url('https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
    },
    {
      id: 14,
      name: "Craft Beer",
      description: "Selection of local craft beers on tap",
      price: 1960,
      category: "beverages",
      image: "url('https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
    },
    {
      id: 15,
      name: "Wine Selection",
      description: "Curated selection of red and white wines",
      price: 2520,
      category: "beverages",
      image: "url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
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
    <div className="menu-page-container">
      {/* Success Notification */}
      {notification && (
        <div className="cart-notification">
          {notification}
        </div>
      )}

      {/* Hero Section */}
      <section className="menu-hero">
        <div className="menu-hero-content">
          <h1 className="menu-hero-title">Our Menu</h1>
          <p className="menu-hero-subtitle">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
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
                  style={{
                    backgroundImage: imageErrors.has(item.id) ? 'none' : item.image,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
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
                      console.log('Button clicked for:', item.name);
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
    </div>
  );
};

export default Menu;
