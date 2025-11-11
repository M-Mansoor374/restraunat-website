import React, { useState } from 'react';
import './Menu.css';

const Menu = ({ onAddToCart }) => {
  const [menuItems] = useState([
    {
      id: 1,
      name: "Classic Burger",
      category: "Burgers",
      price: 12.99,
      image: "🍔",
      description: "Juicy beef patty with fresh lettuce, tomato, and special sauce"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 15.99,
      image: "🍕",
      description: "Fresh mozzarella, tomato sauce, and basil on thin crust"
    },
    {
      id: 3,
      name: "Caesar Salad",
      category: "Salads",
      price: 9.99,
      image: "🥗",
      description: "Crisp romaine lettuce with parmesan cheese and croutons"
    },
    {
      id: 4,
      name: "Fresh Orange Juice",
      category: "Beverages",
      price: 4.99,
      image: "🧃",
      description: "Freshly squeezed orange juice, no added sugar"
    },
    {
      id: 5,
      name: "Chocolate Cake",
      category: "Desserts",
      price: 6.99,
      image: "🍰",
      description: "Rich chocolate cake with vanilla ice cream"
    },
    {
      id: 6,
      name: "Grilled Salmon",
      category: "Main Courses",
      price: 18.99,
      image: "🐟",
      description: "Fresh Atlantic salmon with herbs and lemon butter"
    },
    {
      id: 7,
      name: "Chicken Wings",
      category: "Appetizers",
      price: 8.99,
      image: "🍗",
      description: "Spicy buffalo wings with blue cheese dip"
    },
    {
      id: 8,
      name: "Iced Coffee",
      category: "Beverages",
      price: 3.99,
      image: "☕",
      description: "Cold brew coffee with a hint of vanilla"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Burgers', 'Pizza', 'Salads', 'Beverages', 'Desserts', 'Main Courses', 'Appetizers'];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="restaurant-name">GreenLeaf Bistro</h1>
        <p className="restaurant-subtitle">Fresh • Healthy • Delicious</p>
      </div>

      <div className="menu-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-grid">
        {filteredItems.map((item, index) => (
          <div key={item.id} className="menu-item" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="item-image">
              <span className="item-emoji">{item.image}</span>
            </div>
            <div className="item-content">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <div className="item-footer">
                <span className="item-price">PKR {item.price.toLocaleString()}</span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(item)}
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-items">
          <p>No items found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
