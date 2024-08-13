import React from 'react';
import './supporting/style/Footer.css';


const Footer = () => {
  return (
    <footer className="footer__container">
      <div className="footer__content">
        <li><a href="./" className="footer__logo-text">VASANT SHOBHA FOUNDATION</a></li>
        <div className="footer__links">
          <div>
            <h2 className="footer__heading">INFORMATION</h2>
            <ul className="footer__list">
              <li><a href="./youth" className="footer__link">Youth</a></li>
              <li><a href="./adult" className="footer__link">Adult</a></li>
              <li><a href="./team" className="footer__link">Teachers</a></li>
            </ul>
          </div>
          <div>
            <h2 className="footer__heading">GET INVOLVED</h2>
            <ul className="footer__list">
              <li><a href="./involved" className="footer__link">Locations</a></li>
              <li><a href="mailto:info@vasantshobhafoundation.org" className="footer__link">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="footer__divider" />
      <div className="footer__copyright">
        <span className="footer__copyright-text">© 2024 <a href="./" className="footer__copyright-link">Vasant Shobha Foundation</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
