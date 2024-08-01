import React, { useContext } from "react";
import { useState } from "react";

import "./Spaces.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer/Footer";

function Spaces({ onClick, listing, onSave, setShowModal, isLoggedIn }) {
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

	return (
		<div className="spacesCard">
			<div onClick={() => onClick(listing)}>
				{/* <img src={`https://picsum.photos/200?random=${listingId}`} alt={title} /> */}
				<img src={photo} alt={title} />
				<div className="titleBookmark">
					<h3 className="spacesCardTitle">{title}</h3>

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

export default Spaces;
