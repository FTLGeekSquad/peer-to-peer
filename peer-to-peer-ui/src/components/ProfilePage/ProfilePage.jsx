import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import logo from "../../assets/logo.png";
import profileImg from "../../assets/profile.png";
import placeHolderListing from "../../assets/placeholderListing.png";
import ListingModal from "../ListingModal/ListingModal";

const ProfilePage = () => {
	const [selectedListing, setSelectedListing] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(()=>{},[])

	const handleCardClick = (listing) => {
		setSelectedListing(listing);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedListing(null);
	};

	const listings = [
		{
			title: "Canon Camera for Rent",
			description: "A high-quality Canon DSLR camera available for rent.",
			category: "Equipment",
			subCategory: "Cameras",
			priceHourly: 25.0,
			photo: placeHolderListing,
			location: "New York",
		},
		// Add more listings here...
	];

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
						{listings.map((listing, index) => (
							<div
								className="listing-card"
								key={index}
								onClick={() => handleCardClick(listing)}
							>
								<img src={listing.photo} alt="Listing" />
								<div className="listing-details">
									<p>{listing.title}</p>
									<p>{listing.location}</p>
									<p>${listing.priceHourly}/hour</p>
									<button className="contact-button">Mark as Contacted</button>
								</div>
							</div>
						))}
					</div>
				</section>
			</main>
			{selectedListing && (
				<ListingModal
					listing={selectedListing}
					isOpen={isModalOpen}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};

export default ProfilePage;

// import React from "react";
// import "./ProfilePage.css";
// import logo from "../../assets/logo.png";
// import profileImg from "../../assets/profile.png";
// import placeHolderListing from "../../assets/placeholderListing.png";

// const ProfilePage = () => {
// 	return (
// 		<div className="profile-page">
// 			<header className="header">
// 				<div className="logo">
// 					<img src={logo} alt="Peer2Peer Logo" />
// 				</div>
// 				<nav className="navigation">
// 					<button className="nav-button active">Rent</button>
// 					<button className="nav-button">List</button>
// 				</nav>
// 				<div className="profile">
// 					<img src={profileImg} alt="Profile Icon" />
// 					<span>Scarlet</span>
// 				</div>
// 			</header>
// 			<main className="main-content">
// 				<section className="profile-info">
// 					<div className="profile-picture">
// 						<img src={profileImg} alt="Profile" />
// 					</div>
// 					<div className="profile-details">
// 						<h2>First Last</h2>
// 						<p>Member since ...</p>
// 						<div className="contact-info">
// 							<p>Email</p>
// 							<p>Phone Number</p>
// 							<p>Location</p>
// 						</div>
// 						<button className="edit-button">Edit Account Details</button>
// 					</div>
// 				</section>
// 				<section className="listings">
// 					<div className="tabs">
// 						<button className="tab active">Saved</button>
// 						<button className="tab">Contacted</button>
// 					</div>
// 					<div className="listings-grid">
// 						<div className="listing-card">
// 							<img src={placeHolderListing} alt="Listing" />
// 							<div className="listing-details">
// 								<p>Title</p>
// 								<p>Location</p>
// 								<p>Price</p>
// 								<button className="contact-button">Mark as Contacted</button>
// 							</div>
// 						</div>
// 						<div className="listing-card">
// 							<img src={placeHolderListing} alt="Listing" />
// 							<div className="listing-details">
// 								<p>Title</p>
// 								<p>Location</p>
// 								<p>Price</p>
// 								<button className="contact-button">Mark as Contacted</button>
// 							</div>
// 						</div>
// 						<div className="listing-card">
// 							<img src={placeHolderListing} alt="Listing" />
// 							<div className="listing-details">
// 								<p>Title</p>
// 								<p>Location</p>
// 								<p>Price</p>
// 								<button className="contact-button">Mark as Contacted</button>
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 			</main>
// 		</div>
// 	);
// };

// export default ProfilePage;
