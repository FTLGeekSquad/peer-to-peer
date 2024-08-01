import React from "react";
import { useState, useEffect } from "react";
import "./Equipment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useSavedListings } from "../../contexts/SavedListingsContext";
import googleButton from "/src/assets/web_light_rd_SI.svg";
import Modal from "../GeneralModal/GeneralModal";

function Equipment({ onClick, listing, onSave, setShowModal, isLoggedIn }) {
	// const { listingId, title, priceHourly, location } = listing;
	const { saveListing } = useSavedListings(); // Get saveListing from context

	const {
		//instead of listing every param
		listingId,
		title,
		description,
		category,
		subCategory,
		priceHourly,
		photo,
		location,
		//availability
	} = listing;

	const [isSaved, setIsSaved] = useState(false); // State to track if the item is saved




	  const handleSave = (event) => {
		event.stopPropagation();
		if (isLoggedIn) {
		  setIsSaved(!isSaved); // Toggle the saved state, will prolly have to change when jazz is done
		  onSave(listing); // Call the onSave function passed as a prop
		} else {
		  setShowModal(true); // Show the modal if the user is not logged in
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
					// Ensure bookmark button click does not propagate
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
