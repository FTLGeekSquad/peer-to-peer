import React from "react";
import { useState } from "react";
import "./Equipment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useSavedListings } from "../../contexts/SavedListingsContext";
import axios from "axios";
function Equipment({ onClick, listing }) {
	const { userData, setUserData } = useSavedListings();
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

	const saveListing = async (listingId) => {
		try {
			const response = await axios.post(
				`http://localhost:3000/users/${userData.userId}/saved-listings/${listingId}`
			);
			setSavedListings([...savedListings, response.data]);
			setUserData(userData); //maybe
		} catch (error) {
			console.error("Error saving listing:", error);
		}
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

	const handleSave = (event) => {
        event.stopPropagation();
        if (isSaved) {
            removeListing(listingId);
        } else {
            saveListing(listingId);
        }
        setIsSaved(!isSaved);
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
					// Ensure bookmark button click does not propagate
					onMouseDown={(e) => e.preventDefault()}
				>
					<FontAwesomeIcon icon={faBookmark} />
					</button>
				</div>
				<div className="paragraph">
					<p className="price">${priceHourly} / hr</p>
					<p className="location">{location}</p>
					{/* <button onClick={() => onSave(listing)}>Save</button> */}
				</div>
			</div>
		</div>
	);
}

export default Equipment;
