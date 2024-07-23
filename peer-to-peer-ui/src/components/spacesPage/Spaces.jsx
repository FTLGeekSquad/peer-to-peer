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

function Spaces({ listing, onSave }) {
	// const { listingId, title, priceHourly, location } = listing;

	const { //instead of listing every param
        listingId,
        title,
        description,
        category,
        subCategory,
        priceHourly,
        photo,
        location
        //availability 
      } = listing;

	return (
		<div className="spacesCard">
			{/* <img src={`https://picsum.photos/200?random=${listingId}`} alt={title} /> */}
			<img src={photo} alt={title} />

			<h3 className="spacesCardTitle">{title}</h3>
			<div className="paragraph">
				<p className="price">${priceHourly} per hour</p>
				<p className="location">{location}</p>
				<button onClick={() => onSave(listing)}>Save</button>
			</div>
		</div>
	);
}

export default Spaces;
