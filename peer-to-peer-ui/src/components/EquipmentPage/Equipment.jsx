import React from "react";
import { useState } from "react";
import "./Equipment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function Equipment({ onClick, listing, onSave }) {
	

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
		setIsSaved(!isSaved); // Toggle the saved state
		onSave(listing); // Call the onSave function passed as a prop
	};

	return (
		<div className="equipmentCard">
			<div onClick={() => onClick(listing)}>
				{/* <img src={`https://picsum.photos/200?random=${listingId}`} alt={title} /> */}
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
					<p className="price">${priceHourly} per hour</p>
					<p className="location">{location}</p>
					{/* <button onClick={() => onSave(listing)}>Save</button> */}
				</div>
			</div>
			
		</div>
	);
}

export default Equipment;
