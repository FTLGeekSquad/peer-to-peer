// import React from "react";
// import "./Services.css";

// function Services({ listing, onSave }) {
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
// 		<div className="servicesCard">
// 			<img src={`https://picsum.photos/200?random=${listingId}`} alt={title} />
// 			<div className="servicesCardTitle">{title}</div>
// 			<div className="paragraph">
// 				<p className="price">${priceHourly} per hour</p>
// 				<p className="location">{location}</p>
// 			</div>
// 			<button onClick={handleSave} className="save-button">
// 				🔖 Save
// 			</button>
// 		</div>
// 	);
// }

// export default Services;

//this will serve as an individual services "card" that will be populated on the equipment grid
//this will serve as an individual spaces "card" that will be populated on the equipment grid
//this will serve as an individual equipment "card" that will be populated on the equipment grid
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Services (listing) {
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
//figure out how to do calendar element

//create a new listing

//edit a listing

//add availabiliy

//delete a listing... provide warning button

//will display the image title location and price on the card..
//^ and description and lister information and click to see calendar availability will be located on the modal
//contains an image placeholder right now
return(
    <>
        <div className="spacesCard">
        <img src={`https://picsum.photos/200?random=${listingId}`} alt={title} />
        <h3 className="servicesCardTitle">{title}</h3>
        <div className="paragraph">
        <p className="price">${priceHourly} per hour</p>
        <p className="location">{location}</p>
        </div>

        </div>

    </>

)

}
export default Services;
