import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
// import SearchBar from "../SearchBar/SearchBar";
import "./HeaderHomePage.css";
import logo from "/src/assets/logo.png";
import profileImg from "/src/assets/profile.png";
import googleButton from "/src/assets/web_light_rd_SI.svg";
import headerLogo from "/src/assets/header_logo.png";
import CreateListing from "../CreateListingModal/CreateListing";
import { Link } from "react-router-dom";

const HeaderHomePage = ({ handleSubmit }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showCreateListing, setShowCreateListing] = useState(false);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogin = () => {
		window.location.href = "https://peer-to-peer-59rz.onrender.com/auth/login";
	};
	
	return (
		<div>
			{/* <h1 className="bigTitle">Peer2Peer</h1> */}
			<img className="header-logo" src={headerLogo} />
			<header className="header">
				<Link to="/home">
					<img src={logo} alt="Logo" className="logo" />
				</Link>
				<div className="headerBottom">
					{/* <SearchBar handleSubmit={handleSubmit} /> */}
					<NavBar />
				</div>

				
				{isLoggedIn ? (
					<Link to="/profile">
						<img src={profileImg} style={{ height: "50px" }} />
					</Link>
				) : (
					<img
						className="google-signin-button-icon"
						onClick={handleLogin}
						src={googleButton}
						alt="Google icon"
					/>
				)}
			</header>
		</div>
	);
};

export default HeaderHomePage;
