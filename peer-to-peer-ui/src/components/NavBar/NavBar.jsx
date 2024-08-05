import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className={isActive('/home') ? 'active-link' : ''}>
          <Link to="/home">Home</Link>
        </li>
        <li className={isActive('/equipment') ? 'active-link' : ''}>
          <Link to="/equipment">Equipment</Link>
        </li>
        <li className={isActive('/spaces') ? 'active-link' : ''}>
          <Link to="/spaces">Spaces</Link>
        </li>
        <li className={isActive('/services') ? 'active-link' : ''}>
          <Link to="/services">Services</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;





