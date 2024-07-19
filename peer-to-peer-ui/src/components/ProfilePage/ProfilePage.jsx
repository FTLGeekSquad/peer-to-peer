// import React, { useState, useEffect } from "react";
// import "./ProfilePage.css";
// import logo from "../../assets/logo.png";
// import profileImg from "../../assets/profile.png";
// import placeHolderListing from "../../assets/placeholderListing.png";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Equipment from "../EquipmentPage/Equipment";
// import Spaces from "../SpacesPage/Spaces";
// import Services from "../ServicesPage/Services";

// const ProfilePage = () => {
// 	const [activeTab, setActiveTab] = useState("rent");
// 	const [savedListings, setSavedListings] = useState([]);

// 	const handleSaveListing = (listing) => {
// 		setSavedListings((prevListings) => [...prevListings, listing]);
// 	};

// 	return (
// 		<div className="profile-page">
// 			<header className="header">
// 				<Link to="/home">
// 					<img src={logo} alt="Logo" className="pLogo" />
// 				</Link>
// 				<nav className="navigation">
// 					<button
// 						className={`nav-button ${activeTab === "rent" ? "active" : ""}`}
// 						onClick={() => setActiveTab("rent")}
// 					>
// 						Rent
// 					</button>
// 					<button
// 						className={`nav-button ${activeTab === "list" ? "active" : ""}`}
// 						onClick={() => setActiveTab("list")}
// 					>
// 						List
// 					</button>
// 				</nav>
// 				<div className="profile">
// 					<img src={profileImg} alt="Profile Icon" />
// 					<span>Scarlet</span>
// 				</div>
// 			</header>
// 			<main className="main-content">
// 				{activeTab === "rent" ? (
// 					<RentContent savedListings={savedListings} />
// 				) : (
// 					<ListContent onSaveListing={handleSaveListing} />
// 				)}
// 			</main>
// 		</div>
// 	);
// };

// const RentContent = ({ savedListings }) => (
// 	<>
// 		<section className="profile-info">
// 			<div className="profile-picture">
// 				<img src={profileImg} alt="Profile" />
// 			</div>
// 			<div className="profile-details">
// 				<h2>First Last</h2>
// 				<p>Member since ...</p>
// 				<div className="contact-info">
// 					<p>Email</p>
// 					<p>Phone Number</p>
// 					<p>Location</p>
// 				</div>
// 				<button className="edit-button">Edit Account Details</button>
// 			</div>
// 		</section>
// 		<section className="listings">
// 			<div className="tabs">
// 				<button className="tab active">Saved</button>
// 			</div>
// 			<div className="listings-grid">
// 				{savedListings.map((listing, index) => (
// 					<div className="listing-card" key={index}>
// 						<img
// 							src={`https://picsum.photos/200?random=${listing.listingId}`}
// 							alt={listing.title}
// 						/>
// 						<div className="listing-details">
// 							<p>{listing.title}</p>
// 							<p>{listing.location}</p>
// 							<p>${listing.priceHourly} per hour</p>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</section>
// 	</>
// );

// const ListContent = ({ onSaveListing }) => {
// 	const [listings, setListings] = useState([]);

// 	useEffect(() => {
// 		// Fetch listings from the backend
// 		axios
// 			.get("/api/listings")
// 			.then((response) => setListings(response.data))
// 			.catch((error) => console.error("Error fetching listings:", error));
// 	}, []);

// 	return (
// 		<>
// 			<section className="profile-info">
// 				<div className="profile-picture">
// 					<img src={profileImg} alt="Profile" />
// 				</div>
// 				<div className="profile-details">
// 					<h2>First Last</h2>
// 					<p>Member since ...</p>
// 					<div className="contact-info">
// 						<p>Email</p>
// 						<p>Phone Number</p>
// 						<p>Location</p>
// 					</div>
// 					<button className="edit-button">Edit Account Details</button>
// 				</div>
// 			</section>
// 			<section className="listings">
// 				<div className="tabs">
// 					<button className="tab active">All</button>
// 				</div>
// 				<div className="listings-grid">
// 					{listings.map((listing) =>
// 						listing.category === "equipment" ? (
// 							<Equipment
// 								key={listing.listingId}
// 								listing={listing}
// 								onSave={onSaveListing}
// 							/>
// 						) : listing.category === "spaces" ? (
// 							<Spaces
// 								key={listing.listingId}
// 								listing={listing}
// 								onSave={onSaveListing}
// 							/>
// 						) : (
// 							<Services
// 								key={listing.listingId}
// 								listing={listing}
// 								onSave={onSaveListing}
// 							/>
// 						)
// 					)}
// 				</div>
// 			</section>
// 		</>
// 	);
// };

// export default ProfilePage;

import React, { useState } from 'react';
import './ProfilePage.css';
import logo from '../../assets/logo.png';
import profileImg from '../../assets/profile.png';
import placeHolderListing from '../../assets/placeholderListing.png';
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('rent');

  return (
    <div className="profile-page">
      <header className="header">
      <Link to="/home">
                    <img src={logo} alt="Logo" className="pLogo" />
                </Link>
        <nav className="navigation">
          <button
            className={`nav-button ${activeTab === 'rent' ? 'active' : ''}`}
            onClick={() => setActiveTab('rent')}
          >
            Rent
          </button>
          <button
            className={`nav-button ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            List
          </button>
        </nav>
        <div className="profile">
          <img src={profileImg} alt="Profile Icon" />
          <span>Scarlet</span>
        </div>
      </header>
      <main className="main-content">
        {activeTab === 'rent' ? (
          <RentContent />
        ) : (
          <ListContent />
        )}
      </main>
    </div>
  );
};

const RentContent = () => (
  <>
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
        {/* <button className="tab">Contacted</button> */}
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
  </>
);

const ListContent = () => (
  <>
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
        {/* <button className="tab active">Saved</button> */}
        <button className="tab active">All</button>
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
  </>
);

export default ProfilePage;
