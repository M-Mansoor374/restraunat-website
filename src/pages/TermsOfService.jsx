import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <div className="terms-header">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last Updated: October 20, 2025</p>
        </div>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using our restaurant services, you accept and agree to be bound 
              by these Terms of Service. If you do not agree to these terms, please do not use 
              our services.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Service Description</h2>
            <p>
              We provide online food ordering and delivery services. Our menu items, prices, 
              and availability are subject to change without notice. We reserve the right to 
              refuse service to anyone for any reason at any time.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. User Accounts</h2>
            <p>
              To use certain features of our service, you must create an account. You are 
              responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Providing accurate and current information</li>
              <li>Being at least 18 years old or having parental consent</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>4. Orders and Payments</h2>
            <p>
              By placing an order, you agree that:
            </p>
            <ul>
              <li>All orders are subject to acceptance and availability</li>
              <li>Prices are as listed at the time of order confirmation</li>
              <li>You will pay the total amount including taxes and delivery fees</li>
              <li>Payment must be made using approved payment methods</li>
              <li>We reserve the right to cancel orders in case of pricing errors</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>5. Delivery</h2>
            <p>
              Delivery terms include:
            </p>
            <ul>
              <li>Estimated delivery times are approximate and not guaranteed</li>
              <li>Delivery is only available within our service areas</li>
              <li>Someone must be present to receive the order</li>
              <li>We are not responsible for delays due to circumstances beyond our control</li>
              <li>Minimum order values may apply for delivery</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>6. Cancellations and Refunds</h2>
            <p>
              Our cancellation and refund policy:
            </p>
            <ul>
              <li>Orders can be cancelled within 5 minutes of placement</li>
              <li>Refunds are processed within 5-7 business days</li>
              <li>No refunds for orders that have been prepared or dispatched</li>
              <li>Quality issues must be reported within 30 minutes of delivery</li>
              <li>Refund decisions are at our sole discretion</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>7. Food Allergies and Dietary Requirements</h2>
            <p>
              While we make efforts to accommodate dietary requirements, we cannot guarantee 
              that our food is free from allergens. If you have severe allergies, please 
              consult with our staff before ordering.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Intellectual Property</h2>
            <p>
              All content on our platform, including text, graphics, logos, and images, is 
              our property or licensed to us. You may not use, reproduce, or distribute any 
              content without our written permission.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, 
              incidental, special, or consequential damages arising from your use of our services.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. User Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Use our services for any unlawful purpose</li>
              <li>Harass, abuse, or harm our staff or delivery partners</li>
              <li>Provide false or misleading information</li>
              <li>Attempt to hack or disrupt our services</li>
              <li>Use automated systems to access our platform</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>11. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting. Your continued use of our services constitutes acceptance 
              of the modified terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of 
              the jurisdiction in which we operate, without regard to conflict of law principles.
            </p>
          </section>

          <section className="terms-section">
            <h2>13. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> legal@restaurant.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Restaurant Street, Food City, FC 12345</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

