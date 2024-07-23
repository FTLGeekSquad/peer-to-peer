// import React from "react";
// import "./Equipment.css";

// function Equipment(listing) {
// 	const {
// 		listingId,
// 		title,
// 		description,
// 		category,
// 		subCategory,
// 		priceHourly,
// 		photo,
// 		location,
// 	} = listing;

// 	const handleSave = () => {
// 		onSave(listing);
// 	};

// 	return (
// 		<div className="equipmentCard">
// 			<img src={`https://picsum.photos/200?random=${listingId}`} alt={title} />
// 			<div className="equipmentCardTitle">{title}</div>
// 			<div className="paragraph">
// 				<p className="price">${priceHourly} per hour</p>
// 				<p className="location">{location}</p>
// 			</div>
// 		</div>
// 	);
// }

// export default Equipment;

import React from "react";
import "./Equipment.css";

function Equipment({ listing, onSave }) {
	const { listingId, title, priceHourly, location } = listing;

	return (
		<div className="equipmentCard">
			<img src={`https://picsum.photos/200?random=${listingId}`} alt={title} />
			<div className="equipmentCardTitle">{title}</div>
			<div className="paragraph">
				<p className="price">${priceHourly} per hour</p>
				<p className="location">{location}</p>
				<button onClick={() => onSave(listing)}>Save</button>
			</div>
		</div>
	);
}

export default Equipment;
