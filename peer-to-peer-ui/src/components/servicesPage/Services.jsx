// import React, { useContext } from "react";
// import "./Services.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBookmark } from "@fortawesome/free-solid-svg-icons";

// function Services({ onClick, listing, onSave }) {
// 	// const { listingId, title, priceHourly, location } = listing;

// 	const {
// 		//instead of listing every param
// 		listingId,
// 		title,
// 		description,
// 		category,
// 		subCategory,
// 		priceHourly,
// 		photo,
// 		location,
// 		//availability
// 	} = listing;

// 	return (
// 		<div className="servicesCard">
// 			<div onClick={() => onClick(listing)}>
// 				{/* <img src={`https://picsum.photos/200?random=${listingId}`} alt={title} /> */}
// 				<img src={photo} alt={title} />
// 				<h3 className="servicesCardTitle">{title}</h3>
// 				<div className="paragraph">
// 					<p className="price">${priceHourly} per hour</p>
// 					<p className="location">{location}</p>
// 				</div>
// 			</div>
// 			<button className="bookmark-button" onClick={() => onSave(listing)}>
// 				<FontAwesomeIcon icon={faBookmark} />
// 			</button>
// 		</div>
// 	);
// }

// export default Services;

import React, { useState } from "react";
import "./Services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function Services({ onClick, listing, onSave }) {
	const [isSaved, setIsSaved] = useState(false); // State to track if the item is saved

	const handleSave = () => {
		setIsSaved(!isSaved); // Toggle the saved state
		onSave(listing); // Call the onSave function passed as a prop
	};

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

	return (
		<div className="servicesCard">
			<div onClick={() => onClick(listing)}>
				<img src={photo} alt={title} />
				<h3 className="servicesCardTitle">{title}</h3>
				<div className="paragraph">
					<p className="price">${priceHourly} per hour</p>
					<p className="location">{location}</p>
				</div>
			</div>
			<button
				className={`bookmark-button ${isSaved ? "active" : ""}`}
				onClick={handleSave}
			>
				<FontAwesomeIcon icon={faBookmark} />
			</button>
		</div>
	);
}

export default Services;
