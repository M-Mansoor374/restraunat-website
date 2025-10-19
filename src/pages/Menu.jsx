import React, { useState } from "react";
import "./Menu.css";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Debug log to check if component is rendering
  console.log("Menu component is rendering");

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
      price: 12.99,
      category: "appetizers",
      image: "linear-gradient(135deg, #10b981, #059669)",
      popular: true
    },
    {
      id: 2,
      name: "Buffalo Wings",
      description: "Crispy chicken wings tossed in our spicy buffalo sauce, served with ranch dip",
      price: 15.99,
      category: "appetizers",
      image: "linear-gradient(135deg, #dc2626, #b91c1c)"
    },
    {
      id: 3,
      name: "Mozzarella Sticks",
      description: "Golden fried mozzarella sticks served with marinara sauce",
      price: 9.99,
      category: "appetizers",
      image: "linear-gradient(135deg, #f59e0b, #d97706)"
    },
    {
      id: 4,
      name: "Bruschetta",
      description: "Toasted bread topped with fresh tomatoes, basil, and garlic",
      price: 11.99,
      category: "appetizers",
      image: "linear-gradient(135deg, #8b5cf6, #7c3aed)"
    },

    // Main Courses
    {
      id: 5,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon, served with seasonal vegetables",
      price: 24.99,
      category: "mains",
      image: "linear-gradient(135deg, #06b6d4, #0891b2)",
      popular: true
    },
    {
      id: 6,
      name: "Beef Steak",
      description: "Premium Angus beef steak cooked to your preference with our signature marinade and sides",
      price: 32.99,
      category: "mains",
      image: "linear-gradient(135deg, #dc2626, #b91c1c)",
      popular: true
    },
    {
      id: 7,
      name: "Pasta Carbonara",
      description: "Authentic Italian pasta with creamy sauce, pancetta, and parmesan cheese",
      price: 18.99,
      category: "mains",
      image: "linear-gradient(135deg, #059669, #047857)"
    },
    {
      id: 8,
      name: "Chicken Parmesan",
      description: "Breaded chicken breast topped with marinara sauce and melted mozzarella, served with pasta",
      price: 22.99,
      category: "mains",
      image: "linear-gradient(135deg, #f59e0b, #d97706)"
    },
    {
      id: 9,
      name: "Vegetarian Risotto",
      description: "Creamy arborio rice with seasonal vegetables and parmesan cheese",
      price: 19.99,
      category: "mains",
      image: "linear-gradient(135deg, #10b981, #059669)"
    },

    // Desserts
    {
      id: 10,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center, served with vanilla ice cream",
      price: 8.99,
      category: "desserts",
      image: "linear-gradient(135deg, #7c2d12, #92400e)",
      popular: true
    },
    {
      id: 11,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
      price: 7.99,
      category: "desserts",
      image: "linear-gradient(135deg, #8b5cf6, #7c3aed)"
    },
    {
      id: 12,
      name: "Cheesecake",
      description: "New York style cheesecake with berry compote",
      price: 6.99,
      category: "desserts",
      image: "linear-gradient(135deg, #f59e0b, #d97706)"
    },

    // Beverages
    {
      id: 13,
      name: "Fresh Lemonade",
      description: "House-made lemonade with fresh lemons and mint",
      price: 4.99,
      category: "beverages",
      image: "linear-gradient(135deg, #fbbf24, #f59e0b)"
    },
    {
      id: 14,
      name: "Craft Beer",
      description: "Selection of local craft beers on tap",
      price: 6.99,
      category: "beverages",
      image: "linear-gradient(135deg, #92400e, #78350f)"
    },
    {
      id: 15,
      name: "Wine Selection",
      description: "Curated selection of red and white wines",
      price: 8.99,
      category: "beverages",
      image: "linear-gradient(135deg, #dc2626, #b91c1c)"
    }
  ];

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
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
                <div className="menu-item-image" style={{backgroundImage: item.image}}>
                  {item.popular && (
                    <div className="popular-badge">Popular</div>
                  )}
                </div>
                <div className="menu-item-content">
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className="menu-item-price">${item.price}</span>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                  <button className="menu-item-btn">Add to Order</button>
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
              <div className="offer-card">
                <div className="offer-icon">🍽️</div>
                <h3 className="offer-title">Family Dinner</h3>
                <p className="offer-description">Get 20% off when you order for 4 or more people</p>
                <span className="offer-code">Code: FAMILY20</span>
              </div>
              <div className="offer-card">
                <div className="offer-icon">🍷</div>
                <h3 className="offer-title">Wine Wednesday</h3>
                <p className="offer-description">50% off all wine bottles every Wednesday</p>
                <span className="offer-code">Code: WINE50</span>
              </div>
              <div className="offer-card">
                <div className="offer-icon">🎂</div>
                <h3 className="offer-title">Dessert Combo</h3>
                <p className="offer-description">Buy 2 desserts and get 1 free</p>
                <span className="offer-code">Code: DESSERT3</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
