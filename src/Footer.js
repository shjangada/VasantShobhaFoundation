import React from 'react';
import { Link } from 'react-router-dom';
import './supporting/style/Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer__container">
      <div className="footer__content">
        <Link to="/" className="footer__logo-text">
          VASANT SHOBHA FOUNDATION
        </Link>
        <div className="footer__links">
          <div>
            <h2 className="footer__heading">INFORMATION</h2>
            <ul className="footer__list">
              <li><Link to="/team" className="footer__link">Team</Link></li>
              <li><Link to="/classes" className="footer__link">Classes</Link></li>
              <li><Link to="/events" className="footer__link">Events</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="footer__heading">GET INVOLVED</h2>
            <ul className="footer__list">
              <li><Link to="/involved" className="footer__link">Contact</Link></li>
              <li>
                <a href="mailto:info@vasantshobhafoundation.org" className="footer__link">
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="footer__divider" />
      <div className="footer__copyright">
        <span className="footer__copyright-text">
          © {year}{' '}
          <Link to="/" className="footer__copyright-link">
            Vasant Shobha Foundation
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
