import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import profileImg from "../../assets/profile.png";
import placeHolderListing from "../../assets/placeholderListing.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSavedListings } from "../../contexts/SavedListingsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "../GeneralModal/GeneralModal";


const RentContent = () => {
    const { userData, setUserData } = useSavedListings();
    const [savedListings, setSavedListings] = useState(null);
    const navigate = useNavigate(); 
    const [isEditing, setIsEditing] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [showUserDeleteConfirmation, setShowUserDeleteConfirmation] = useState(false);


	console.log("userData, ", userData)
    useEffect(() => {
        setSavedListings(userData.savedListings);
    }, [userData]);


	
    const handleLogout = () => {
        console.log("Logging out");
        localStorage.removeItem("token");
        navigate("/home");
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3000/users/${userData.userId}`, {
                phoneNumber: userData.phoneNumber,
                location: userData.location,
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

	

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };
	
	const removeListing = async (listingId) => {
		try {
			const response = await axios.delete(
				`http://localhost:3000/users/${userData.userId}/saved-listings/${listingId}`
			);
			setSavedListings(savedListings.filter((listing)=>listing.listingId !== listingId));
			//sets it to listings that do not have the removed listingId
			setUserData(userData); //maybe
		} catch (error) {
			console.error("Error removing listing:", error);
		}
	};


    //delete account button 
    const deleteUser = async (userId) => {
		try {
			const response = await axios.delete(
				`http://localhost:3000/users/${userData.userId}`
			);
            handleLogout();
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

    const handleDeleteAccountClick = () => {
        setShowUserDeleteConfirmation(true);
    };

    const handleUserConfirmedDelete = async () => {
        await deleteUser();
        setShowUserDeleteConfirmation(false);
    };

    return (
        <>
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
                                value={userData.phoneNumber || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Location:
                            <input
                                type="text"
                                name="location"
                                value={userData.location || ""}
                                onChange={handleChange}
                            />
                            <button type="submit" className="delete-button" onClick={handleDeleteAccountClick}>Delete Account</button>
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
                            <div key={listing.listingId} className="listing-card" onClick={() => setSelectedEquipment(listing)}>
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
                                        <p><strong>Posted by:</strong> {selectedEquipment.userData.name}</p>
                                        <p><strong>Contact:</strong> {selectedEquipment.userData.phoneNumber}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </Modal>
                )}
                {showUserDeleteConfirmation && (
                    <Modal show={showUserDeleteConfirmation} onClose={() => setShowUserDeleteConfirmation(false)}>
                        <h2>Are you sure you want to delete your account?</h2>
                        <button className="confirmDeleteButton" onClick={handleUserConfirmedDelete}>Yes, Delete</button>
                        <button className="cancelDeleteButton" onClick={() => setShowUserDeleteConfirmation(false)}>Cancel</button>
                    </Modal>
                )}
            </section>
        </>
    );
};

export default RentContent;
