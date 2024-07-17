import React from "react";
import NavBar from "../NavBar/NavBar";
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar"
import "./Header.css"
import logo from "/src/assets/logo.png";

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
