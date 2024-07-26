import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            We are a peer-to-peer photography rental platform, connecting
            photographers with the best equipment, spaces, and services.
          </p>
        </div>
        <div className="footer-section links">
          {/* Add any additional footer links here */}
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: info@peer2peer.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Photography Rentals | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
