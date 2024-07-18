import React from "react";
import NavBar from "../NavBar/NavBar";

import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";
import logo from "/src/assets/logo.png";
import profileImg from "/src/assets/profile.png";
import { Link } from "react-router-dom";

const Header = ({ handleSubmit }) => {
	return (
	  <header className="header">
		<Link to="/home">
		  <img src={logo} alt="Logo" className="logo" />
		</Link>
		<div className='headerBottom'>
		  <NavBar />
		  <SearchBar handleSubmit={handleSubmit} />

		</div>
		<Link to="/profile">
			<img src={profileImg} style={{ height: "50px" }} />
		</Link>
		{/* <SearchBar handleSubmit={handleSubmit} /> */}

	  </header>
	  

	  
	);
  };




export default Header;
