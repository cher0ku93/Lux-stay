import React from 'react';
import './footer.styles.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section principale */}
        <div className="footer-section">
          <h3>Lux&Stay</h3>
          <p>© 2024 Lux&Stay Inc. All Rights Reserved</p>
        </div>

        {/* Navigation Footer */}
        <div className="footer-links">
          <ul>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#policy">Policy</a></li>
            <li><a href="#social">Social Networks</a></li>
            <li><a href="#newsletter">Newsletter</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
