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
			<img src={logo} className="logo" />
			<div className="headerBottom">
				<SearchBar handleSubmit={handleSubmit} />
				<NavBar />
			</div>
			<Link to="/profile">
				<img src={profileImg} style={{ height: "50px" }} />
			</Link>
		</header>
	);
};

export default Header;
