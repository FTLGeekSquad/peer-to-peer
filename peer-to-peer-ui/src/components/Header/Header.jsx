import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";
import logo from "/src/assets/logo.png";
import profileImg from "/src/assets/profile.png";
import googleButton from "/src/assets/web_light_rd_SI.svg";
import headerLogo from "/src/assets/header_logo.png";
import CreateListing from "../CreateListingModal/CreateListing";
import Modal from "../GeneralModal/GeneralModal";

import { Link } from "react-router-dom";

const Header = ({ handleSubmit }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showCreateListing, setShowCreateListing] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogin = () => {
		window.location.href = "http://localhost:3000/auth/login";
	};

	// const handleOpenModal = () => {
    //     setShowCreateListing(true);
    // };
	const handleOpenModal = () => {
        if (isLoggedIn) {
            setShowCreateListing(true);
        } else {
            setShowLoginModal(true);
        }
    };
	return (
		<div>
			{/* <h1 className="bigTitle">Peer2Peer</h1> */}
			<img className='header-logo' src={headerLogo} />
			<header className="header">
			

				<Link to="/home">
					<img src={logo} alt="Logo" className="logo" />
				</Link>
				<div className="headerBottom">
					<SearchBar handleSubmit={handleSubmit} />
					<NavBar />
				</div>
				<button className="create-listing-button" onClick={handleOpenModal}>
                    Create Listing
                </button>
                <CreateListing
                    showCreateListing={showCreateListing}
                    setShowCreateListing={setShowCreateListing}
                />
				{isLoggedIn ? (
					<Link to="/profile">
						<img src={profileImg} style={{ height: "50px" }} />
					</Link>
			// add the create listing button...  

				) : (
					<img
						className="google-signin-button-icon"
						onClick={handleLogin}
						src={googleButton}
						alt="Google icon"
					/>
				)}
			</header>
			<Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
                <div className="modal-content">
                    <h3>Please log in to create a listing</h3>
                    <img
                        src={googleButton}
                        alt="Google Sign-In"
                        className="google-sign-in-button"
                        onClick={handleLogin}
                    />
                </div>
            </Modal>
		</div>
	);
};

export default Header;
