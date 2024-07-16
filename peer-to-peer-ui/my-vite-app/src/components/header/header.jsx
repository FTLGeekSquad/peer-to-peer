import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/src/assets/logo.png'
import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';
import './Header.css';

const Header = ({ handleSubmit }) => {
  return (
    <header className="header">
      <Link to="/home">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className='headerBottom'>
        <SearchBar handleSubmit={handleSubmit} />
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
