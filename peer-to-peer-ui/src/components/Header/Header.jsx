import React from "react";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../searchBar/SearchBar";
import "./Header.css";
import logo from "/src/assets/logo.png";

const Header = ({ handleSubmit }) => {
	return (
		<header className="header">
			<img src={logo} className="logo" />
			<div className="headerBottom">
				<SearchBar handleSubmit={handleSubmit} />
				<NavBar />
			</div>
		</header>
	);
};

export default Header;
