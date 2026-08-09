import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './supporting/style/NavBar.css';
import Logo from './supporting/newlogo.png';

const NavBar = ({ greenBackground }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/team', label: 'Team' },
    { to: '/classes', label: 'Classes' },
    { to: '/events', label: 'Events' },
    { to: '/involved', label: 'Contact' },
  ];

  return (
    <nav className={`navbar__container ${greenBackground ? 'navbar__green' : 'navbar__main'} ${scrolled ? 'navbar__scrolled' : ''}`}>
      <Link to="/" className="navbar__container-logo" aria-label="Home">
        <img src={Logo} alt="Logo" />
      </Link>
      <ul className="navbar__container-links">
        {links.map((link) => {
          const isActive =
            link.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(link.to);
          return (
            <li key={link.to}>
              <Link to={link.to} className={isActive ? 'is-active' : undefined}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
