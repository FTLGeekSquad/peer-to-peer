import React, { useState, useEffect } from "react";
import "./Spaces.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faStar } from "@fortawesome/free-solid-svg-icons";
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
    avgRating = 0 // Default to 0 if not provided

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
        `https://peer-to-peer-59rz.onrender.com/users/${userData.userId}/saved-listings/${listingId}`
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
        `https://peer-to-peer-59rz.onrender.com/users/${userData.userId}/saved-listings/${listingId}`
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

  const renderStars = (rating) => {
		const fullStars = Math.floor(rating); // Number of full stars
		const halfStar = rating % 1 >= 0.5;  // Whether to show a half star

		return (
			<div className="star-rating">
				{[...Array(5)].map((_, index) => {
					if (index < fullStars) {
						return <FontAwesomeIcon key={index} icon={faStar} className="star filled" />;
					} else if (index === fullStars && halfStar) {
						return <FontAwesomeIcon key={index} icon={faStar} className="star half" />;
					} else {
						return <FontAwesomeIcon key={index} icon={faStar} className="star empty" />;
					}
				})}
			</div>
		);
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
          <div className="rating">
					  {renderStars(avgRating)}
				</div>
        </div>
      </div>
    </div>
  );
}

export default Spaces;
