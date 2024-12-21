import React from 'react';
import './AboutContact.css'; 
const AboutContact = () => {
  return (
    <div className="about-contact-page">
      {/* About Section */}
      <section className="about-section">
        <h2>About APIzza</h2>
        <p>
          APIzza is your ultimate online destination for ordering fresh and delicious
          pizzas. Whether you're craving a classic Margherita, a loaded Meat Lover’s,
          or a custom creation, APIzza makes it easy to browse, customize, and buy your favorite pizzas with just a few clicks.
        </p>
        <div className="about-info">
          <p>
            <strong>Our Mission:</strong> To bring authentic Italian flavors and
            convenient online ordering to pizza lovers everywhere.
          </p>
          <p>
            <strong>Why Choose APIzza:</strong> 
            - Wide variety of pizzas to suit every taste. 
            - Easy online ordering system. 
            - Fresh ingredients and top-notch quality guaranteed.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>
          We’d love to hear from you! If you have any questions, feedback, or concerns,
          feel free to reach out to us:
        </p>
        <div className="contact-info">
          <p>📞 <strong>Phone:</strong> (555) 123-4567</p>
          <p>✉️ <strong>Email:</strong> info@apizza.com</p>
          <p>📍 <strong>Address:</strong> 123 Pizza St., Food City</p>
        </div>
        <p>
          Visit our website to explore our menu, customize your pizza, and place your
          order today. APIzza is here to make your pizza cravings a delicious reality!
        </p>
      </section>
    </div>
  );
};

export default AboutContact;
