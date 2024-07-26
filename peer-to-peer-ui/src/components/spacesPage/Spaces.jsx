// //will display the image title location and price on the card..
// //^ and description and lister information and click to see calendar availability will be located on the modal
// //contains an image placeholder right now
// return(
//     <>
//         <div className="spacesCard">
//         <img src={`https://picsum.photos/200?random=${listingId}`} alt={title} />
//         <h3 className="spacesCardTitle">{title}</h3>
//         <div className="paragraph">
//         <p className="price">${priceHourly} per hour</p>
//         <p className="location">{location}</p>

//         </div>

//         </div>

//     </>

// )

// }
// export default Spaces;

import React, { useContext } from "react";
import "./Spaces.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function Spaces({ onClick, listing, onSave }) {
	// const { listingId, title, priceHourly, location } = listing;

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
				<h3 className="spacesCardTitle">{title}</h3>
				<div className="paragraph">
					<p className="price">${priceHourly} per hour</p>
					<p className="location">{location}</p>
				</div>
			</div>
			<button className="bookmark-button" onClick={() => onSave(listing)}>
				<FontAwesomeIcon icon={faBookmark} />
			</button>
		</div>
	);
}

export default Spaces;
