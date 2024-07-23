// import React, { useState } from 'react';
// import './ProfilePage.css';
// import logo from '../../assets/logo.png';
// import profileImg from '../../assets/profile.png';
// import placeHolderListing from '../../assets/placeholderListing.png';
// import { Link } from "react-router-dom";

// const ProfilePage = () => {
//   const [activeTab, setActiveTab] = useState('rent');

//   return (
//     <div className="profile-page">
//       <header className="header">
//       <Link to="/home">
//                     <img src={logo} alt="Logo" className="pLogo" />
//                 </Link>
//         <nav className="navigation">
//           <button
//             className={`nav-button ${activeTab === 'rent' ? 'active' : ''}`}
//             onClick={() => setActiveTab('rent')}
//           >
//             Rent
//           </button>
//           <button
//             className={`nav-button ${activeTab === 'list' ? 'active' : ''}`}
//             onClick={() => setActiveTab('list')}
//           >
//             List
//           </button>
//         </nav>
//         <div className="profile">
//           <img src={profileImg} alt="Profile Icon" />
//           <span>Scarlet</span>
//         </div>
//       </header>
//       <main className="main-content">
//         {activeTab === 'rent' ? (
//           <RentContent />
//         ) : (
//           <ListContent />
//         )}
//       </main>
//     </div>
//   );
// };

// const RentContent = () => (
//   <>
//     <section className="profile-info">
//       <div className="profile-picture">
//         <img src={profileImg} alt="Profile" />
//       </div>
//       <div className="profile-details">
//         <h2>First Last</h2>
//         <p>Member since ...</p>
//         <div className="contact-info">
//           <p>Email</p>
//           <p>Phone Number</p>
//           <p>Location</p>
//         </div>
//         <button className="edit-button">Edit Account Details</button>
//       </div>
//     </section>
//     <section className="listings">
//       <div className="tabs">
//         <button className="tab active">Saved</button>
//         {/* <button className="tab">Contacted</button> */}
//       </div>
//       <div className="listings-grid">
//         <div className="listing-card">
//           <img src={placeHolderListing} alt="Listing" />
//           <div className="listing-details">
//             <p>Title</p>
//             <p>Location</p>
//             <p>Price</p>
//             <button className="contact-button">Mark as Contacted</button>
//           </div>
//         </div>
//         <div className="listing-card">
//           <img src={placeHolderListing} alt="Listing" />
//           <div className="listing-details">
//             <p>Title</p>
//             <p>Location</p>
//             <p>Price</p>
//             <button className="contact-button">Mark as Contacted</button>
//           </div>
//         </div>
//         <div className="listing-card">
//           <img src={placeHolderListing} alt="Listing" />
//           <div className="listing-details">
//             <p>Title</p>
//             <p>Location</p>
//             <p>Price</p>
//             <button className="contact-button">Mark as Contacted</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   </>
// );

// const ListContent = () => (
//   <>
//     <section className="profile-info">
//       <div className="profile-picture">
//         <img src={profileImg} alt="Profile" />
//       </div>
//       <div className="profile-details">
//         <h2>First Last</h2>
//         <p>Member since ...</p>
//         <div className="contact-info">
//           <p>Email</p>
//           <p>Phone Number</p>
//           <p>Location</p>
//         </div>
//         <button className="edit-button">Edit Account Details</button>
//       </div>
//     </section>
//     <section className="listings">
//       <div className="tabs">
//         {/* <button className="tab active">Saved</button> */}
//         <button className="tab active">All</button>
//       </div>
//       <div className="listings-grid">
//         <div className="listing-card">
//           <img src={placeHolderListing} alt="Listing" />
//           <div className="listing-details">
//             <p>Title</p>
//             <p>Location</p>
//             <p>Price</p>
//             <button className="contact-button">Mark as Contacted</button>
//           </div>
//         </div>
//         <div className="listing-card">
//           <img src={placeHolderListing} alt="Listing" />
//           <div className="listing-details">
//             <p>Title</p>
//             <p>Location</p>
//             <p>Price</p>
//             <button className="contact-button">Mark as Contacted</button>
//           </div>
//         </div>
//         <div className="listing-card">
//           <img src={placeHolderListing} alt="Listing" />
//           <div className="listing-details">
//             <p>Title</p>
//             <p>Location</p>
//             <p>Price</p>
//             <button className="contact-button">Mark as Contacted</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   </>
// );

// export default ProfilePage;

// ProfilePage.jsx
import React, { useState } from "react";
import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context
import "./ProfilePage.css";
import logo from "../../assets/logo.png";
import profileImg from "../../assets/profile.png";
import placeHolderListing from "../../assets/placeholderListing.png";
import { Link } from "react-router-dom";

const ProfilePage = () => {
	const [activeTab, setActiveTab] = useState("rent");
	const { savedListings, removeListing } = useSavedListings(); // Use the context

	return (
		<div className="profile-page">
			<header className="header">
				<Link to="/home">
					<img src={logo} alt="Logo" className="pLogo" />
				</Link>
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
				<div className="profile">
					<img src={profileImg} alt="Profile Icon" />
					<span>Scarlet</span>
				</div>
			</header>
			<main className="main-content">
				{activeTab === "rent" ? (
					<RentContent
						savedListings={savedListings}
						removeListing={removeListing}
					/>
				) : (
					<ListContent />
				)}
			</main>
		</div>
	);
};

const RentContent = ({ savedListings, removeListing }) => (
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
			</div>
			<div className="listings-grid">
				{savedListings.map((listing) => (
					<div key={listing.listingId} className="listing-card">
						<img src={listing.photo || placeHolderListing} alt="Listing" />
						<div className="listing-details">
							<p>{listing.title}</p>
							<p>{listing.location}</p>
							<p>${listing.priceHourly} per hour</p>
							<button
								className="contact-button"
								onClick={() => removeListing(listing.listingId)}
							>
								Remove
							</button>
						</div>
					</div>
				))}
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
