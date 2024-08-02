// import React, { useContext } from "react";
// import { useState } from "react";

// import "./Spaces.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBookmark } from "@fortawesome/free-solid-svg-icons";
// import Footer from "../Footer/Footer";
// import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context
// import axios from "axios";

// function Spaces({ onClick, listing, onSave, setShowModal, isLoggedIn }) {
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
// 			//setUserData(user);
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
// 			//onSave(listing); // Call the onSave function passed as a prop
//         }
//         setIsSaved(!isSaved);
// 	} else {
// 		setShowModal(true); // Show the modal if the user is not logged in
// 	}
//     };

// 	return (
// 		<div className="spacesCard">
// 			<div onClick={() => onClick(listing)}>
// 				<img src={photo} alt={title} />
// 				<div className="titleBookmark">
// 					<h3 className="spacesCardTitle">{title}</h3>

// 					<button
// 					className={`bookmark-button ${isSaved ? "active" : ""}`}
// 					onClick={handleSave}
// 					// Ensure bookmark button click does not propagate
// 					onMouseDown={(e) => e.preventDefault()}
// 				>
// 					<FontAwesomeIcon icon={faBookmark} />
// 				</button>
// 				</div>
// 				<div className="paragraph">
// 					<p className="price">${priceHourly} / hr</p>
// 					<p className="location">{location}</p>
// 				</div>
// 			</div>
			
// 		</div>

// 	);
// }

// export default Spaces;


import React, { useState, useEffect } from "react";
import "./Spaces.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context

function Spaces({ onClick, listing, setShowModal, isLoggedIn }) {
  const { userData, setUserData } = useSavedListings();
  const [isSaved, setIsSaved] = useState(false);

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

  useEffect(() => {
    if (userData && userData.savedListings) {
      const isListingSaved = userData.savedListings.some(
        (savedListing) => savedListing.listingId === listingId
      );
      setIsSaved(isListingSaved);
    }
  }, [userData, listingId]);

  const saveListing = async (listingId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/users/${userData.userId}/saved-listings/${listingId}`
      );
      setUserData({
        ...userData,
        savedListings: [...userData.savedListings, response.data],
      });
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving listing:", error);
    }
  };

  const removeListing = async (listingId) => {
    try {
      await axios.delete(
        `http://localhost:3000/users/${userData.userId}/saved-listings/${listingId}`
      );
      setUserData({
        ...userData,
        savedListings: userData.savedListings.filter(
          (listing) => listing.listingId !== listingId
        ),
      });
      setIsSaved(false);
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
    } else {
      setShowModal(true); // Show the login modal if not logged in
    }
  };

  return (
    <div className="spacesCard">
      <div onClick={() => onClick(listing)}>
        <img src={photo} alt={title} />
        <div className="titleBookmark">
          <h3 className="spacesCardTitle">{title}</h3>
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
    </div>
  );
}

export default Spaces;
