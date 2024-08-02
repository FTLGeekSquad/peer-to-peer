// import React, { useState } from "react";
// import "./Services.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBookmark } from "@fortawesome/free-solid-svg-icons";
// import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context
// import axios from "axios";
// function Services({ onClick, listing, setShowModal, isLoggedIn }) {
// 	const { userData, setUserData } = useSavedListings();
// 	const [isSaved, setIsSaved] = useState(false);
// 	const [savedListings, setSavedListings] = useState([]);
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

// 	const saveListing = async (listingId) => {
// 		try {
// 			const response = await axios.post(
// 				`http://localhost:3000/users/${userData.userId}/saved-listings/${listingId}`
// 			);
// 			setSavedListings([...savedListings, response.data]);
// 			setUserData(userData);
// 		} catch (error) {
// 			console.error("Error saving listing:", error);
// 		}
// 	};

// 	const removeListing = async (listingId) => {
// 		try {
// 			const response = await axios.delete(
// 				`http://localhost:3000/users/${userData.userId}/saved-listings/${listingId}`
// 			);
// 			setSavedListings(savedListings.filter((listing)=>listing.listingId !== listingId));
// 			//sets it to listings that do not have the removed listingId
// 			//setUserData(user);
// 		} catch (error) {
// 			console.error("Error removing listing:", error);
// 		}
// 	};

// 	// not sure if this is right
// 	const handleSave = (event) => {
// 		if(isLoggedIn) {

		
//         event.stopPropagation();
//         if (isSaved) {
//             removeListing(listingId);
//         } else {
//             saveListing(listingId);
// 			onSave(listing); // Call the onSave function passed as a prop
//         }
//         setIsSaved(!isSaved);
// 	} else {
// 		setShowModal(true); // Show the modal if the user is not logged in
// 	}
//     };

// 	return (
// 		<div className="servicesCard" onClick={() => onClick(listing)}>
// 			<img src={photo} alt={title} />
// 			<div className="titleBookmark">
// 				<h3 className="servicesCardTitle">{title}</h3>
// 				<button
// 					className={`bookmark-button ${isSaved ? "active" : ""}`}
// 					onClick={handleSave}
// 					// Ensure bookmark button click does not propagate
// 					onMouseDown={(e) => e.preventDefault()}
// 				>
// 					<FontAwesomeIcon icon={faBookmark} />
// 				</button>
// 			</div>
// 			<div className="paragraph">
// 				<p className="price">${priceHourly} / hr</p>
// 				<p className="location">{location}</p>
// 			</div>
// 		</div>
// 	);
// }

// export default Services;

// // made chat do a lot bc the modal kept opening on the click of the bookmark


import React, { useState } from "react";
import "./Services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context
import axios from "axios";

function Services({ onClick, listing, setShowModal, isLoggedIn }) {
	const { userData, setUserData } = useSavedListings();
	const [isSaved, setIsSaved] = useState(false);
	const [savedListings, setSavedListings] = useState([]);
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

	const saveListing = async (listingId) => {
		try {
			const response = await axios.post(
				`http://localhost:3000/users/${userData.userId}/saved-listings/${listingId}`
			);
			setSavedListings([...savedListings, response.data]);
			setUserData(userData);
		} catch (error) {
			console.error("Error saving listing:", error);
		}
	};

	const removeListing = async (listingId) => {
		try {
			const response = await axios.delete(
				`http://localhost:3000/users/${userData.userId}/saved-listings/${listingId}`
			);
			setSavedListings(savedListings.filter((listing) => listing.listingId !== listingId));
		} catch (error) {
			console.error("Error removing listing:", error);
		}
	};

	const handleSave = (event) => {
		event.stopPropagation();

		if (isLoggedIn) {
			if (isSaved) {
				removeListing(listingId);
			} else {
				saveListing(listingId);
			}
			setIsSaved(!isSaved);
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
