import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './supporting/style/NavBar.css';

const NavBar = ({ greenBackground }) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar__container ${greenBackground ? 'navbar__green' : 'navbar__main'} ${scrolled ? 'navbar__scrolled' : ''}`}>
      <div className="navbar__container-title">VASANT SHOBHA FOUNDATION</div>
      <ul className="navbar__container-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/youth">Youth Classes</Link></li>
        <li><Link to="/adult">Adult Classes</Link></li>
        <li><Link to="/team">Our Team</Link></li>
        <li><Link to="/involved">Get Involved</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
