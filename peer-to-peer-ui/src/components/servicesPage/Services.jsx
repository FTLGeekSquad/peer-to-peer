import React, { useState } from "react";
import "./Services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function Services({ onClick, listing, onSave }) {
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
		// Prevent event propagation to stop modal from opening
		event.stopPropagation();
		setIsSaved(!isSaved);
		onSave(listing);
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
