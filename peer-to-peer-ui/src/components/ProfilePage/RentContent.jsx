import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import profileImg from "../../assets/profile.png";
import placeHolderListing from "../../assets/placeholderListing.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SavedListingsProvider } from "../../contexts/SavedListingsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "../GeneralModal/GeneralModal";


const RentContent = ({ savedListings, removeListing, userInfo }) => {

	const [selectedEquipment, setSelectedEquipment] = useState(null);

	const [user, setUser] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		location: "",
		createdAt: "",
		userId: 0,
	});

	const navigate = useNavigate(); // Get the navigate function from useNavigate

	const handleLogout = () => {
		console.log("Logging out");
		localStorage.removeItem("token");
		navigate("/home");
	};

	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (userInfo) {
			const fetchUserData = async () => {
				console.log("Fetching user data...");
				try {
					const response = await axios.get(
						`http://localhost:3000/users/email/${userInfo.email}`
					);
					console.log("Response data:", response.data);
					setUser({
						name: response.data.name || "",
						email: response.data.email || "",
						phoneNumber: response.data.phoneNumber || "",
						location: response.data.location || "",
						createdAt: response.data.createdAt || "",
						userId: response.data.userId || 0,

					});

				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			};

			fetchUserData();
		}
	}, [userInfo]);

	const handleEdit = async (event) => {
		event.preventDefault();
		try {
			console.log(user.userId);
			await axios.put(`http://localhost:3000/users/${user.userId}`, user); // Adjust the URL based on your API endpoint
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating user data:", error);
		}
	};

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
    console.log("Fetched userId before provider:", user.userId);
	return (

		<SavedListingsProvider userId={user.userId}>
			<section className="profile-info">
				<div className="profile-picture">
					<img src={profileImg} alt="Profile" />
				</div>
				<div className="profile-details">
					<h2>{user.name}</h2>
					<p>
						Member since{" "}
						{user.createdAt ? formatDate(user.createdAt) : "Loading..."}
					</p>
					<div className="contact-info">
						<p>Email: {user.email}</p>
						<p>Phone Number: {user.phoneNumber}</p>
						<p>Location: {user.location}</p>
					</div>
					<button className="edit-button" onClick={() => setIsEditing(true)}>
						Edit Account Details
					</button>
					<button className='logout' onClick={handleLogout}>Log out</button>
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
								value={user.phoneNumber || ""} // Default to empty string if undefined
								onChange={handleChange}
							/>
						</label>
						<label>
							Location:
							<input
								type="text"
								name="location"
								value={user.location || ""} // Default to empty string if undefined
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
            <div 
              key={listing.listingId} 
              className="listing-card" 
              onClick={() => setSelectedEquipment(listing)} // Set selectedEquipment on click
            >
              <img 
                src={listing.photo || placeHolderListing} 
                alt="Listing" 
              />
              <div className="listing-details">
                <div className="titleBookmark">
                  <p className="listing-title">{listing.title}</p>
                  <button
                    className="bookmark-button active" // Initially active to show pink icon
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal from opening
                      removeListing(listing.listingId);
                    }}
                  >
                    <FontAwesomeIcon icon={faBookmark} />
                  </button>
                </div>
                <p className="listing-location">{listing.location}</p>
                <p className="listing-price">
                  ${listing.priceHourly} per hour
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No saved listings.</p>
        )}
      </div>

      {selectedEquipment && (
        <Modal show={selectedEquipment !== null} onClose={() => setSelectedEquipment(null)}>
          <h2 className="modalHeader">{selectedEquipment.title}</h2>
          <img className="modal-img" src={selectedEquipment.photo} alt={selectedEquipment.title} />
          <div className="modalWords">
            <div className="upperWords">
              <h2 className="lowerTitle">{selectedEquipment.title}</h2>
              <p className="locationText">
                <strong>Location:</strong> {selectedEquipment.location}
              </p>
            </div>
            <p>{selectedEquipment.description}</p>
			<p className="price">${selectedEquipment.priceHourly} per hour</p>

            <div className="userInfo">
              {selectedEquipment.user && (
                <>
                  <p><strong>Posted by:</strong> {selectedEquipment.user.name}</p>
                  <p><strong>Contact:</strong> {selectedEquipment.user.phoneNumber}</p>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </section>
            </SavedListingsProvider>

	);
};

export default RentContent;