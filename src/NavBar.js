import React from 'react';
import { Link } from 'react-router-dom';
import './style/NavBar.css'; // CSS file for styling the navigation bar

const NavBar = () => (
  <nav className="navbar">
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/youth">Youth Classes</Link></li>
      <li><Link to="/adult">Adult Classes</Link></li>
      <li><Link to="/team">Our Team</Link></li>
      <li><Link to="/involved">Get Involved</Link></li>
    </ul>
  </nav>
);

export default NavBar;
