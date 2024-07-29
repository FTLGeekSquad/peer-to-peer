import React, { useState, useEffect } from "react";
import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context
import "./ProfilePage.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import RentContent from "./RentContent";
import ListContent from "./ListContent";

const ProfilePage = () => {
	const [activeTab, setActiveTab] = useState("rent");
	const [showCreateListing, setShowCreateListing] = useState(false);
	const { savedListings, removeListing } = useSavedListings(); // Use the context
	const [userInfo, setUserInfo] = useState(null);

	const token = localStorage.getItem("token");
	// get the user from the token and get the user info from the DB using the backend
	useEffect(() => {
		if (token) {
			// setToken(localStorage.getItem("token"))
			setUserInfo(jwtDecode(token));
		}
	}, []);

	return (
		<div className="profile-page">
			<Link to="/home">
				<img src={logo} alt="Logo" className="logo" />
			</Link>
			<header className="header">
				<nav className="navigation">
					<button
						className={`nav-button ${activeTab === "rent" ? "active" : ""}`}
						onClick={() => setActiveTab("rent")}
					>
						Rent
					</button>
					<button
						className={`nav-button ${activeTab === "list" ? "active" : ""}`}
						onClick={() => setActiveTab("list")}
					>
						List
					</button>
				</nav>
			</header>
			<main className="main-content">
				{activeTab === "rent" ? (
					
					<RentContent
						userInfo={userInfo}
						savedListings={savedListings}
						removeListing={removeListing}
					/>
				) : (
					<ListContent
						userInfo={userInfo}
						//showCreateListing={showCreateListing} may need to uncomment this, unsure right now
						setShowCreateListing={setShowCreateListing}
					/>
				)}
			</main>
		</div>
	);
};




export default ProfilePage;