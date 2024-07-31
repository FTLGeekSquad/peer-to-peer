import React, { useState, useEffect, useContext } from "react";
import "./ProfilePage.css";
import profileImg from "../../assets/profile.png";
import placeHolderListing from "../../assets/placeholderListing.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSavedListings } from "../../contexts/SavedListingsContext";



const RentContent = () => {
	const { userData } = useSavedListings();

	console.log('user info', userData)
	//const { savedListings, removeListing } = useSavedListings(); // Use the context
	const [savedListings, setSavedListings] = useState(null);
	const navigate = useNavigate(); // Get the navigate function from useNavigate

	const handleLogout = () => {
		console.log("Logging out");
		localStorage.removeItem("token");
		navigate("/home");
	};

	const [isEditing, setIsEditing] = useState(false);
	
	useEffect(() => {
		setSavedListings(userData.savedListings);
}, []);
	
	console.log("Rent Content Page", userData)


	const handleEdit = async (event) => {
		event.preventDefault();
		try {
			console.log(userData.userId);
			await axios.put(`http://localhost:3000/users/${userData.userId}`, userData); // Adjust the URL based on your API endpoint
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating user data:", error);
		}
	};
//do I need this? 
	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser((prevUser) => ({
			...prevUser,
			[name]: value,
		}));
	};

	// Function to format the date
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		const date = new Date(dateString);
		return date.toLocaleDateString(undefined, options);
	};

	// const {savedListings, removeListing} = useSavedListings();
    //console.log("Fetched userId before provider:", userData.userId);
	return (
        <>
		{/* //<SavedListingsProvider userId={user.userId}> */}
			<section className="profile-info">
				<div className="profile-picture">
					<img src={profileImg} alt="Profile" />
				</div>
				<div className="profile-details">
					<h2>{userData.name}</h2>
					<p>
						Member since{" "}
						{userData.createdAt ? formatDate(userData.createdAt) : "Loading..."}
					</p>
					<div className="contact-info">
						<p>Email: {userData.email}</p>
						<p>Phone Number: {userData.phoneNumber}</p>
						<p>Location: {userData.location}</p>
					</div>
					<button className="edit-button" onClick={() => setIsEditing(true)}>
						Edit Account Details
					</button>
					<button onClick={handleLogout}>Log out</button>
				</div>
			</section>

			{isEditing && (
				<div className="modal">
					<form onSubmit={handleEdit}>
						<label>
							Phone Number:
							<input
								type="text"
								name="phoneNumber"
								value={userData.phoneNumber || ""} // Default to empty string if undefined
								onChange={handleChange}
							/>
						</label>
						<label>
							Location:
							<input
								type="text"
								name="location"
								value={userData.location || ""} // Default to empty string if undefined
								onChange={handleChange}
							/>
						</label>
						<button type="submit">Save</button>
						<button type="button" onClick={() => setIsEditing(false)}>
							Cancel
						</button>
					</form>
				</div>
			)}

			<section className="listings">
				<div className="tabs">
					<button className="tab active">Saved</button>
				</div>
				<div className="listings-grid">
					{Array.isArray(savedListings) && savedListings.length > 0 ? (
						savedListings.map((listing) => (
							<div key={listing.listingId} className="listing-card">
								<img src={listing.photo || placeHolderListing} alt="Listing" />
								<div className="listing-details">
									<p className="listing-title">{listing.title}</p>
									<p className="listing-location">{listing.location}</p>
									<p className="listing-price">
										${listing.priceHourly} per hour
									</p>
								</div>
								<button
									className="contact-button"
									onClick={() => removeListing(listing.listingId)}
								>
									Remove
								</button>
							</div>
						))
					) : (
						<p>No saved listings.</p>
					)}
				</div>
			</section>
            {/* </SavedListingsProvider> */}
			</>
		
	);
};

export default RentContent;