import React from "react";
import "./ProfilePage.css";
import logo from "../../assets/logo.png";
import profileImg from "../../assets/profile.png";
import placeHolderListing from "../../assets/placeholderListing.png";

const ProfilePage = () => {
	return (
		<div className="profile-page">
			<header className="header">
				<div className="logo">
					<img src={logo} alt="Peer2Peer Logo" />
				</div>
				<nav className="navigation">
					<button className="nav-button active">Rent</button>
					<button className="nav-button">List</button>
				</nav>
				<div className="profile">
					<img src={profileImg} alt="Profile Icon" />
					<span>Scarlet</span>
				</div>
			</header>
			<main className="main-content">
				<section className="profile-info">
					<div className="profile-picture">
						<img src={profileImg} alt="Profile" />
					</div>
					<div className="profile-details">
						<h2>First Last</h2>
						<p>Member since ...</p>
						<div className="contact-info">
							<p>Email</p>
							<p>Phone Number</p>
							<p>Location</p>
						</div>
						<button className="edit-button">Edit Account Details</button>
					</div>
				</section>
				<section className="listings">
					<div className="tabs">
						<button className="tab active">Saved</button>
						<button className="tab">Contacted</button>
					</div>
					<div className="listings-grid">
						<div className="listing-card">
							<img src={placeHolderListing} alt="Listing" />
							<div className="listing-details">
								<p>Title</p>
								<p>Location</p>
								<p>Price</p>
								<button className="contact-button">Mark as Contacted</button>
							</div>
						</div>
						<div className="listing-card">
							<img src={placeHolderListing} alt="Listing" />
							<div className="listing-details">
								<p>Title</p>
								<p>Location</p>
								<p>Price</p>
								<button className="contact-button">Mark as Contacted</button>
							</div>
						</div>
						<div className="listing-card">
							<img src={placeHolderListing} alt="Listing" />
							<div className="listing-details">
								<p>Title</p>
								<p>Location</p>
								<p>Price</p>
								<button className="contact-button">Mark as Contacted</button>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default ProfilePage;
