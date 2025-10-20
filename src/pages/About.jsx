import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const About = () => {
  const navigate = useNavigate();
  const teamMembers = [
    {
      id: 1,
      name: "Chef Maria Rodriguez",
      role: "Head Chef",
      experience: "15+ years",
      specialty: "Italian Cuisine",
      image: "linear-gradient(135deg, #f59e0b, #d97706)",
      description: "Passionate about creating authentic Italian dishes with a modern twist."
    },
    {
      id: 2,
      name: "Chef James Wilson",
      role: "Sous Chef",
      experience: "10+ years",
      specialty: "French Techniques",
      image: "linear-gradient(135deg, #06b6d4, #0891b2)",
      description: "Expert in French culinary techniques and farm-to-table cooking."
    },
    {
      id: 3,
      name: "Sarah Chen",
      role: "Pastry Chef",
      experience: "8+ years",
      specialty: "Artisan Desserts",
      image: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      description: "Creates beautiful and delicious desserts that are works of art."
    },
    {
      id: 4,
      name: "Michael Thompson",
      role: "Restaurant Manager",
      experience: "12+ years",
      specialty: "Operations",
      image: "linear-gradient(135deg, #10b981, #059669)",
      description: "Ensures every guest has an exceptional dining experience."
    }
  ];

  const values = [
    {
      icon: "🌱",
      title: "Fresh Ingredients",
      description: "We source only the freshest, locally-sourced ingredients for all our dishes."
    },
    {
      icon: "👨‍🍳",
      title: "Expert Chefs",
      description: "Our talented team of chefs brings years of experience and passion to every dish."
    },
    {
      icon: "❤️",
      title: "Passion for Food",
      description: "We believe great food brings people together and creates lasting memories."
    },
    {
      icon: "🏆",
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service and cuisine."
    }
  ];

  const timeline = [
    {
      year: "2000",
      title: "Restaurant Founded",
      description: "Started as a small family restaurant with a dream to serve exceptional food."
    },
    {
      year: "2005",
      title: "First Award",
      description: "Received our first culinary award for outstanding Italian cuisine."
    },
    {
      year: "2010",
      title: "Expansion",
      description: "Expanded to a larger location to accommodate growing customer base."
    },
    {
      year: "2015",
      title: "Chef Maria Joins",
      description: "Head Chef Maria Rodriguez joined, bringing authentic Italian expertise."
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description: "Launched online ordering and delivery services during challenging times."
    },
    {
      year: "2024",
      title: "Present Day",
      description: "Continuing to serve our community with passion and excellence."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Our Restaurant</h1>
          <p className="about-hero-subtitle">
            Discover the story behind our passion for exceptional cuisine and warm hospitality
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2 className="section-title">Our Story</h2>
              <p className="story-description">
                Founded in 2000, our restaurant began as a small family business with a simple mission: 
                to serve exceptional food that brings people together. What started as a modest kitchen 
                has grown into a beloved community institution, but our core values remain unchanged.
              </p>
              <p className="story-description">
                For over two decades, we've been committed to using only the freshest ingredients, 
                traditional cooking methods, and a genuine passion for culinary excellence. Every dish 
                tells a story, and every meal is an opportunity to create lasting memories.
              </p>
              <p className="story-description">
                Today, we continue to honor our founding principles while embracing innovation and 
                growth. Our team of talented chefs, led by Head Chef Maria Rodriguez, brings together 
                diverse culinary traditions to create a unique and memorable dining experience.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <div className="image-icon">🍽️</div>
                <h3 className="image-title">Culinary Excellence</h3>
                <p className="image-subtitle">Since 2000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The talented individuals who make our restaurant special
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-image" style={{backgroundImage: member.image}}>
                  <div className="team-overlay">
                    <div className="team-experience">{member.experience}</div>
                  </div>
                </div>
                <div className="team-content">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-specialty">{member.specialty}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              Key milestones in our restaurant's history
            </p>
          </div>
          <div className="timeline">
            {timeline.map((event, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-year">{event.year}</div>
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">24+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Awards Won</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Fresh Ingredients</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Experience Our Story</h2>
            <p className="cta-subtitle">
              Join us for an unforgettable dining experience that celebrates our rich history and culinary passion
            </p>
            <div className="cta-buttons">
              <button 
                className="btn-primary"
                onClick={() => navigate('/contact')}
              >
                Make a Reservation
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate('/menu')}
              >
                View Our Menu
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
