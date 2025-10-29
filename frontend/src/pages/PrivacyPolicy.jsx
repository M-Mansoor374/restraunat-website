import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const location = useLocation();

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

  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: October 20, 2025</p>
        </div>

        <div className="policy-content">
          <section className="policy-section">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you create an account, 
              place an order, or communicate with us. This may include:
            </p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Delivery address and billing information</li>
              <li>Payment card details</li>
              <li>Order history and preferences</li>
              <li>Communication history with our customer service</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Send you promotional communications (with your consent)</li>
              <li>Improve our services and develop new features</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information to third parties. We may share your 
              information with:
            </p>
            <ul>
              <li>Service providers who help us operate our business</li>
              <li>Payment processors to complete transactions</li>
              <li>Delivery partners to fulfill your orders</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or 
              destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="policy-section">
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience, 
              analyze usage patterns, and deliver personalized content. You can control cookie 
              settings through your browser preferences.
            </p>
          </section>

          <section className="policy-section">
            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13 years of age. We do not 
              knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="policy-section">
            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="policy-section">
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us at:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> privacy@restaurant.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Restaurant Street, Food City, FC 12345</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

