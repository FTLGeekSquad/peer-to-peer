import React, { useState } from "react";
import "./Services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function Services({ onClick, listing, onSave, setShowModal, isLoggedIn }) {
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

	const [isSaved, setIsSaved] = useState(false);

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
		<div className="servicesCard" onClick={() => onClick(listing)}>
			<img src={photo} alt={title} />
			<div className="titleBookmark">
				<h3 className="servicesCardTitle">{title}</h3>
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
	);
}

export default Services;

// made chat do a lot bc the modal kept opening on the click of the bookmark
