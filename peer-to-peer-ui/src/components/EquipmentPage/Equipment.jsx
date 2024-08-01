
import React, { useState, useEffect } from "react";
import "./Equipment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Equipment({ onClick, listing, isLoggedIn, setShowLoginModal, userData, setUserData }) {
	const [isSaved, setIsSaved] = useState(false);
	const [savedListings, setSavedListings] = useState([]);
	const {
		listingId,
		title,
		description,
		category,
		subCategory,
		priceHourly,
		photo,
		location,
	} = listing;

	useEffect(() => {
		if (userData && userData.savedListings) {
			const isListingSaved = userData.savedListings.some(
				(savedListing) => savedListing.listingId === listingId
			);
			setIsSaved(isListingSaved);
		}
	}, [userData, listingId]);

	const saveListing = async (listingId) => {
		try {
			const response = await axios.post(
				`http://localhost:3000/users/${userData.userId}/saved-listings/${listingId}`
			);
			setSavedListings([...savedListings, response.data]);
			setUserData({
				...userData,
				savedListings: [...userData.savedListings, response.data],
			});
		} catch (error) {
			console.error("Error saving listing:", error);
		}
	};

	const removeListing = async (listingId) => {
		try {
			await axios.delete(
				`http://localhost:3000/users/${userData.userId}/saved-listings/${listingId}`
			);
			setSavedListings(savedListings.filter((listing) => listing.listingId !== listingId));
			setUserData({
				...userData,
				savedListings: userData.savedListings.filter(
					(listing) => listing.listingId !== listingId
				),
			});
		} catch (error) {
			console.error("Error removing listing:", error);
		}
	};

	const handleSave = (event) => {
		event.stopPropagation();
		if (isLoggedIn) {
			if (isSaved) {
				removeListing(listingId);
			} else {
				saveListing(listingId);
			}
			setIsSaved(!isSaved);
		} else {
			setShowLoginModal(true);
		}
	};

	return (
		<div className="equipmentCard">
			<div onClick={() => onClick(listing)}>
				<img src={photo} alt={title} />
				<div className="titleBookmark">
					<h3 className="equipmentCardTitle">{title}</h3>
					<button
						className={`bookmark-button ${isSaved ? "active" : ""}`}
						onClick={handleSave}
						onMouseDown={(e) => e.preventDefault()}
					>
						<FontAwesomeIcon icon={faBookmark} />
					</button>
				</div>
				<div className="paragraph">
					<p className="price">${priceHourly} / hr</p>
					<p className="location">{location}</p>
				</div>
			</div>
		</div>
	);
}

export default Equipment;
