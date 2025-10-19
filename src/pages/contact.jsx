import React, { useState } from "react";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Address",
      details: ["123 Restaurant Street", "Food City, FC 12345", "United States"]
    },
    {
      icon: "📞",
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"]
    },
    {
      icon: "✉️",
      title: "Email",
      details: ["info@restaurant.com", "reservations@restaurant.com"]
    },
    {
      icon: "🕒",
      title: "Hours",
      details: ["Mon-Thu: 11:00 AM - 10:00 PM", "Fri-Sat: 11:00 AM - 11:00 PM", "Sun: 12:00 PM - 9:00 PM"]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "📘", url: "#" },
    { name: "Instagram", icon: "📷", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "Yelp", icon: "⭐", url: "#" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            We'd love to hear from you. Get in touch with us for reservations, questions, or feedback.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="contact-info-icon">{info.icon}</div>
                <h3 className="contact-info-title">{info.title}</h3>
                <div className="contact-info-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="contact-info-detail">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="main-contact-section">
        <div className="container">
          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <h2 className="form-title">Send us a Message</h2>
                <p className="form-subtitle">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.name ? 'error' : ''}`}
                      placeholder="Your full name"
                    />
                    {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.email ? 'error' : ''}`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`form-select ${formErrors.subject ? 'error' : ''}`}
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="catering">Catering Services</option>
                      <option value="feedback">Feedback</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`form-textarea ${formErrors.message ? 'error' : ''}`}
                    placeholder="Tell us how we can help you..."
                    rows="5"
                  ></textarea>
                  {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                </div>
                
                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="contact-sidebar">
              <div className="map-container">
                <div className="map-placeholder">
                  <div className="map-icon">🗺️</div>
                  <h3 className="map-title">Find Us</h3>
                  <p className="map-address">123 Restaurant Street, Food City, FC 12345</p>
                  <button className="map-btn">Get Directions</button>
                </div>
              </div>
              
              <div className="social-section">
                <h3 className="social-title">Follow Us</h3>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.url} className="social-link">
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-name">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="quick-contact">
                <h3 className="quick-contact-title">Quick Contact</h3>
                <div className="quick-contact-item">
                  <span className="quick-contact-label">Call Now:</span>
                  <a href="tel:+15551234567" className="quick-contact-value">+1 (555) 123-4567</a>
                </div>
                <div className="quick-contact-item">
                  <span className="quick-contact-label">Email:</span>
                  <a href="mailto:info@restaurant.com" className="quick-contact-value">info@restaurant.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Quick answers to common questions about our restaurant
            </p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">Do you take reservations?</h3>
              <p className="faq-answer">
                Yes, we accept reservations for parties of 2 or more. You can call us at (555) 123-4567 or use our online reservation system.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-question">Do you offer catering services?</h3>
              <p className="faq-answer">
                Absolutely! We provide full catering services for events, parties, and corporate functions. Contact us for a custom quote.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-question">Is there parking available?</h3>
              <p className="faq-answer">
                Yes, we have complimentary valet parking available, as well as street parking and a nearby public parking garage.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-question">Do you accommodate dietary restrictions?</h3>
              <p className="faq-answer">
                Yes, we offer vegetarian, vegan, and gluten-free options. Please inform us of any allergies or dietary restrictions when making your reservation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
